import fs from 'node:fs/promises';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { pool } from './db.js';
dotenv.config();

const schema = await fs.readFile(new URL('./schema.sql', import.meta.url), 'utf8');
await pool.query(schema);
const email = process.env.ADMIN_EMAIL || 'admin@bestresultsacademy.edu.ng';
const password = process.env.ADMIN_PASSWORD || 'ChangeMeBeforeProduction';
const hash = await bcrypt.hash(password, 12);
await pool.query(`INSERT INTO users (full_name,email,password_hash,role) VALUES ($1,$2,$3,'admin') ON CONFLICT (email) DO NOTHING`, ['System Administrator', email, hash]);
console.log(`Database initialized. Admin: ${email}`);
await pool.end();
