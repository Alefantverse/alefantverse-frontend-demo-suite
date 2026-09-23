import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { query } from './db.js';
dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);
const jwtSecret = process.env.JWT_SECRET || 'development-only-secret-change-me';

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',').map(x=>x.trim()) || true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, standardHeaders: 'draft-8', legacyHeaders: false }));

const asyncRoute = fn => (req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
const requireAuth = (roles=[]) => (req,res,next)=>{
  const token = req.headers.authorization?.replace(/^Bearer\s+/i,'');
  if(!token) return res.status(401).json({ok:false,error:'Authentication required'});
  try {
    const user = jwt.verify(token, jwtSecret);
    if(roles.length && !roles.includes(user.role)) return res.status(403).json({ok:false,error:'Insufficient permissions'});
    req.user = user; next();
  } catch { return res.status(401).json({ok:false,error:'Invalid or expired token'}); }
};
const required = (body, fields) => fields.filter(f => body[f] === undefined || body[f] === null || String(body[f]).trim() === '');

app.get('/api/health', asyncRoute(async (_req,res)=>{
  await query('SELECT 1');
  res.json({ok:true,service:'best-results-academy-api',database:'connected',time:new Date().toISOString()});
}));

app.post('/api/auth/login', asyncRoute(async (req,res)=>{
  const missing=required(req.body,['email','password']); if(missing.length) return res.status(400).json({ok:false,error:`Missing: ${missing.join(', ')}`});
  const {rows}=await query('SELECT id,full_name,email,password_hash,role FROM users WHERE LOWER(email)=LOWER($1)',[req.body.email]);
  if(!rows[0] || !(await bcrypt.compare(req.body.password,rows[0].password_hash))) return res.status(401).json({ok:false,error:'Invalid credentials'});
  const user={id:rows[0].id,name:rows[0].full_name,email:rows[0].email,role:rows[0].role};
  const token=jwt.sign(user,jwtSecret,{expiresIn:'8h'});
  res.json({ok:true,token,user});
}));

app.get('/api/site', asyncRoute(async (_req,res)=>{
  const content=await query('SELECT key,value FROM site_content ORDER BY key');
  const news=await query(`SELECT id,type,title,summary,event_date,location FROM news_events WHERE published=true ORDER BY COALESCE(event_date,created_at) DESC`);
  const gallery=await query('SELECT id,title,category,image_url,alt_text FROM gallery_items WHERE published=true ORDER BY created_at DESC');
  const announcements=await query('SELECT id,title,category,body,published_at FROM announcements WHERE published=true ORDER BY published_at DESC LIMIT 20');
  res.json({ok:true,content:Object.fromEntries(content.rows.map(x=>[x.key,x.value])),news:news.rows,gallery:gallery.rows,announcements:announcements.rows});
}));

app.post('/api/admissions', asyncRoute(async (req,res)=>{
  const missing=required(req.body,['name','phone','email','childAge','classLevel','year']); if(missing.length) return res.status(400).json({ok:false,error:`Missing: ${missing.join(', ')}`});
  const age=Number(req.body.childAge); if(!Number.isInteger(age)||age<2||age>20) return res.status(400).json({ok:false,error:'Invalid child age'});
  const {rows}=await query(`INSERT INTO admissions(name,phone,email,child_age,class_level,academic_year) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,name,status,created_at`,[req.body.name.trim(),req.body.phone.trim(),req.body.email.trim(),age,req.body.classLevel,req.body.year]);
  res.status(201).json({ok:true,application:rows[0]});
}));
app.get('/api/admissions',requireAuth(['admin','staff']),asyncRoute(async (_req,res)=>{const {rows}=await query('SELECT * FROM admissions ORDER BY created_at DESC');res.json({ok:true,items:rows});}));
app.patch('/api/admissions/:id/status',requireAuth(['admin','staff']),asyncRoute(async(req,res)=>{const {rows}=await query('UPDATE admissions SET status=$1 WHERE id=$2 RETURNING *',[req.body.status,req.params.id]);if(!rows[0])return res.status(404).json({ok:false,error:'Application not found'});res.json({ok:true,application:rows[0]});}));

app.post('/api/visits', asyncRoute(async(req,res)=>{
  const missing=required(req.body,['name','phone','email','childAge','classLevel','preferredDate','preferredTime','visitorCount']); if(missing.length)return res.status(400).json({ok:false,error:`Missing: ${missing.join(', ')}`});
  const {rows}=await query(`INSERT INTO school_visits(name,phone,email,child_age,class_level,preferred_date,preferred_time,visitor_count) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id,name,status,preferred_date,preferred_time`,[req.body.name,req.body.phone,req.body.email,Number(req.body.childAge),req.body.classLevel,req.body.preferredDate,req.body.preferredTime,Number(req.body.visitorCount)]);
  res.status(201).json({ok:true,visit:rows[0]});
}));
app.get('/api/visits',requireAuth(['admin','staff']),asyncRoute(async(_req,res)=>{const {rows}=await query('SELECT * FROM school_visits ORDER BY preferred_date,preferred_time');res.json({ok:true,items:rows});}));

app.get('/api/portal/students/:studentCode',requireAuth(['admin','staff','parent','student']),asyncRoute(async(req,res)=>{
  const {rows}=await query('SELECT id,student_code,full_name,class_level,house,academic_year,guardian_name,guardian_email FROM students WHERE student_code=$1',[req.params.studentCode]);
  if(!rows[0])return res.status(404).json({ok:false,error:'Student not found'}); res.json({ok:true,student:rows[0]});
}));
app.get('/api/portal/students/:studentCode/attendance',requireAuth(['admin','staff','parent','student']),asyncRoute(async(req,res)=>{const {rows}=await query('SELECT month_label,attendance_percent FROM attendance a JOIN students s ON s.id=a.student_id WHERE s.student_code=$1 ORDER BY a.id',[req.params.studentCode]);res.json({ok:true,items:rows});}));
app.get('/api/portal/students/:studentCode/results',requireAuth(['admin','staff','parent','student']),asyncRoute(async(req,res)=>{const {rows}=await query('SELECT subject,score,term FROM results r JOIN students s ON s.id=r.student_id WHERE s.student_code=$1 ORDER BY subject',[req.params.studentCode]);res.json({ok:true,items:rows});}));
app.get('/api/portal/students/:studentCode/fees',requireAuth(['admin','staff','parent','student']),asyncRoute(async(req,res)=>{const {rows}=await query('SELECT label,amount,paid,due_date FROM fees f JOIN students s ON s.id=f.student_id WHERE s.student_code=$1 ORDER BY label',[req.params.studentCode]);res.json({ok:true,items:rows});}));
app.get('/api/portal/students/:studentCode/timetable',requireAuth(['admin','staff','parent','student']),asyncRoute(async(req,res)=>{const {rows}=await query('SELECT day_name,start_time,subject,venue,teacher FROM timetable WHERE class_level=(SELECT class_level FROM students WHERE student_code=$1) ORDER BY CASE day_name WHEN \'Monday\' THEN 1 WHEN \'Tuesday\' THEN 2 WHEN \'Wednesday\' THEN 3 WHEN \'Thursday\' THEN 4 WHEN \'Friday\' THEN 5 ELSE 6 END,start_time',[req.params.studentCode]);res.json({ok:true,items:rows});}));
app.get('/api/portal/announcements',requireAuth(['admin','staff','parent','student']),asyncRoute(async(_req,res)=>{const {rows}=await query('SELECT id,title,category,body,published_at FROM announcements WHERE published=true ORDER BY published_at DESC LIMIT 30');res.json({ok:true,items:rows});}));

app.post('/api/payments/intents',requireAuth(['admin','staff','parent','student']),asyncRoute(async(req,res)=>{
  const amount=Number(req.body.amount); if(!Number.isFinite(amount)||amount<=0)return res.status(400).json({ok:false,error:'Invalid amount'});
  const reference=`BRA-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  const {rows}=await query(`INSERT INTO payments(reference,user_id,student_id,amount,purpose,provider) VALUES($1,$2,$3,$4,$5,$6) RETURNING reference,amount,purpose,status,created_at`,[reference,req.user.id,req.body.studentId||null,amount,req.body.purpose||'School fees','gateway-pending']);
  res.status(201).json({ok:true,payment:rows[0],message:'Payment intent created. Connect Paystack/Flutterwave before accepting live money.'});
}));

app.get('/api/admin/dashboard',requireAuth(['admin','staff']),asyncRoute(async(_req,res)=>{
  const [students,applications,visits,news]=await Promise.all([
    query('SELECT COUNT(*)::int count FROM students'),query("SELECT COUNT(*)::int count FROM admissions WHERE created_at >= NOW()-INTERVAL '30 days'"),query("SELECT COUNT(*)::int count FROM school_visits WHERE created_at >= NOW()-INTERVAL '30 days'"),query('SELECT COUNT(*)::int count FROM news_events WHERE published=true')
  ]);
  res.json({ok:true,metrics:{students:students.rows[0].count,newApplications:applications.rows[0].count,visitRequests:visits.rows[0].count,publishedContent:news.rows[0].count}});
}));

app.use((req,res)=>res.status(404).json({ok:false,error:'Route not found'}));
app.use((err,_req,res,_next)=>{console.error(err);res.status(500).json({ok:false,error:'Internal server error'});});
app.listen(port,()=>console.log(`Best Results Academy API listening on http://localhost:${port}`));
