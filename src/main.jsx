import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Activity, ArrowRight, BarChart3, Bell, BookOpen, Building2, CalendarDays, Check,
  ChevronDown, CircleDollarSign, ClipboardList, Clock3, CreditCard, FileText,
  GraduationCap, Grid2X2, HeartPulse, Image as ImageIcon, LayoutDashboard, Menu,
  MessageCircle, MoreHorizontal, Package, PanelLeftClose, Plus, Search, Settings,
  ShoppingBag, ShoppingCart, Sparkles, TrendingUp, UserRound, Users, X, Zap
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Cell
} from "recharts";
import "./styles.css";

const studioName = "ALEFANTVERSE";
const novaFitUrl = "https://alefantverse.github.io/novafit/";

const navItems = [
  { to: "/", label: "Suite Home", icon: Grid2X2 },
  { to: "/eduvera", label: "Eduvera", icon: GraduationCap },
  { to: "/admin", label: "Nexora Admin", icon: LayoutDashboard },
  { to: "/connect", label: "Eduvera Connect", icon: Users },
  { to: "/shopora", label: "Shopora", icon: ShoppingBag },
  { to: "/insights", label: "Nexora Insights", icon: BarChart3 },
];

function Shell({ children, cartCount = 0 }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">A</span>
          <span>{studioName}</span>
        </Link>
        <button className="mobile-menu" onClick={() => setOpen(v => !v)} aria-label="Toggle navigation">
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
        <nav className={`main-nav ${open ? "open" : ""}`}>
          {navItems.map(({to,label,icon:Icon}) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}
              className={({isActive}) => isActive ? "active" : ""}>
              <Icon size={16}/><span>{label}</span>
            </NavLink>
          ))}
          <a className="nav-completed" href={novaFitUrl} target="_blank" rel="noreferrer">
            <Check size={16}/><span>NovaFit · Completed</span>
          </a>
        </nav>
        <div className="topbar-actions">
          {cartCount > 0 && <Link className="cart-mini" to="/shopora"><ShoppingCart size={17}/><b>{cartCount}</b></Link>}
          <span className="concept-chip">Alefantverse · Digital Platforms</span>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <span><b>ALEFANTVERSE</b> · Frontend Demo Suite</span>
        <span>Institutional content is fictionalized portfolio content; NovaFit is completed work.</span>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text, action }) {
  return <div className="section-title">
    <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
    {action}
  </div>
}

function MetricCard({ icon:Icon, label, value, trend, tone="" }) {
  return <div className={`metric-card ${tone}`}>
    <div className="metric-icon"><Icon size={18}/></div>
    <div><span>{label}</span><strong>{value}</strong>{trend && <small className="positive">{trend}</small>}</div>
  </div>
}

function SuiteHome() {
  const cards = [
    { path:"/eduvera", name:"Eduvera", type:"Institutional website concept", desc:"A premium public-facing school platform with admissions, academics, news, facilities and conversion-focused CTAs.", icon:GraduationCap, accent:"violet" },
    { path:"/admin", name:"Nexora Admin", type:"React admin dashboard concept", desc:"A responsive operations layer showing admissions, content, events, gallery and institutional metrics.", icon:LayoutDashboard, accent:"blue" },
    { path:"/connect", name:"Eduvera Connect", type:"Parent / student portal concept", desc:"An authenticated-style learning portal for attendance, results, fees, timetable and announcements.", icon:Users, accent:"green" },
    { path:"/shopora", name:"Shopora", type:"E-commerce frontend concept", desc:"A responsive storefront with search, product discovery, cart interactions and checkout-oriented UX.", icon:ShoppingBag, accent:"orange" },
    { path:"/insights", name:"Nexora Insights", type:"SaaS analytics concept", desc:"A business intelligence view with revenue trends, channels, customers and export-report interaction.", icon:BarChart3, accent:"cyan" },
  ];
  return <div className="home">
    <section className="home-hero">
      <div className="hero-copy">
        <span className="eyebrow">ALEFANTVERSE · FRONTEND DEMO SUITE</span>
        <h1>Digital platforms, shown as they should feel.</h1>
        <p>Explore a polished set of frontend demonstrations spanning institutional websites, dashboards, portals, commerce and SaaS analytics—built to communicate production-level UI thinking.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/eduvera">Start presentation <ArrowRight size={17}/></Link>
          <a className="btn btn-secondary" href={novaFitUrl} target="_blank" rel="noreferrer">View completed NovaFit <Check size={17}/></a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="floating-card fc-one"><span>ACTIVE PLATFORM</span><strong>5 demo systems</strong><small>One coherent design language</small></div>
        <div className="dashboard-preview">
          <div className="preview-head"><span></span><span></span><span></span></div>
          <div className="preview-grid"><div></div><div></div><div className="wide"></div><div></div></div>
        </div>
        <div className="floating-card fc-two"><Zap size={17}/><span>Production mindset</span></div>
      </div>
    </section>
    <section className="section">
      <SectionTitle eyebrow="THE SUITE" title="A portfolio built for the live demo" text="Each concept is intentionally functional on the frontend, with realistic sample data and clear production handoff points." />
      <div className="demo-grid">
        {cards.map(c => <Link to={c.path} className="demo-card" key={c.path}>
          <div className={`demo-icon ${c.accent}`}><c.icon size={23}/></div>
          <span className="card-kicker">{c.type}</span><h3>{c.name}</h3><p>{c.desc}</p>
          <span className="text-link">Open demo <ArrowRight size={15}/></span>
        </Link>)}
        <a className="demo-card completed-card" href={novaFitUrl} target="_blank" rel="noreferrer">
          <div className="demo-icon dark"><Check size={23}/></div>
          <span className="card-kicker">Completed project</span><h3>NovaFit</h3><p>Actual completed Alefantverse project. Open the live deployment without recreating it inside the suite.</p>
          <span className="text-link">Open live project <ArrowRight size={15}/></span>
        </a>
      </div>
    </section>
    <section className="section architecture">
      <SectionTitle eyebrow="PRODUCTION MAPPING" title="Designed to scale beyond the presentation" text="The visual layer demonstrates the frontend now; the proposed production architecture provides the integration path." />
      <div className="architecture-grid">
        {[
          ["01","React frontend","Component-driven interfaces, responsive layouts and reusable design patterns."],
          ["02","Node / Express API","Authentication, admissions, content, payments and business workflows would connect here."],
          ["03","Relational database","PostgreSQL or equivalent would persist users, students, applications, payments and content."],
          ["04","Production delivery","Git/GitHub, environment variables, HTTPS, authentication and production hosting complete the deployment layer."]
        ].map(x => <div className="arch-item" key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>)}
      </div>
    </section>
  </div>
}

const eduNews = [
  ["12 Sep 2026","Open Day","Meet faculty, explore studios and experience the Eduvera learning environment."],
  ["05 Sep 2026","Innovation Showcase","Student teams present practical projects across science, design and technology."],
  ["29 Aug 2026","Admissions Window","Applications for the 2027 academic year are now open."]
];

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function apiRequest(path, options = {}) {
  try {
    const response = await fetch(`${apiBase}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options
    });
    if (!response.ok) throw new Error(`API ${response.status}`);
    return await response.json();
  } catch (error) {
    return { ok: false, offline: true, error: error.message };
  }
}

const admissionRequirements = [
  "Completed online application form", "Recent passport photograph", "Previous school report / result", "Birth certificate or age declaration", "Entrance assessment", "Parent / guardian identification"
];
const academicTracks = [
  ["Nursery", "Play-based early learning, language, numeracy, social confidence and discovery."],
  ["Primary", "Strong literacy, numeracy, science, creativity, technology and independent learning."],
  ["JSS", "Broad academic foundations with practical science, ICT, clubs and leadership."],
  ["SSS", "Senior secondary preparation with WAEC, NECO, JAMB and future-study guidance."]
];
const facilityCards = [
  ["Classrooms", "Bright collaborative learning spaces designed for focused teaching."],
  ["ICT & CBT Centre", "Computer education, digital literacy and computer-based testing."],
  ["Science Laboratory", "Practical science sessions with supervised experiments."],
  ["Library", "Quiet reading, research and guided study resources."],
  ["Sports", "Football, basketball, athletics and structured physical development."],
  ["Arts & Music", "Creative expression through music, culture, performance and visual arts."],
  ["Clubs & Competitions", "Robotics, debate, enterprise, quizzes and inter-school challenges."],
  ["Security & Administration", "Structured visitor management, pastoral support and school operations."]
];
const resultHighlights = [
  ["WAEC / NECO", "Sample 2026 cohort", "Strong subject passes across core academic areas."],
  ["University pathways", "Sample destinations", "Students progressing toward universities and professional programmes."],
  ["Competitions", "STEM & creative", "Recognition through academic, technology and creative competitions."],
  ["Institutional milestone", "Established 2009", "A growing school community built around character and learning."]
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Eduvera() {
  const [modal, setModal] = useState(null);
  const [contacted, setContacted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiState, setApiState] = useState("");
  const [form, setForm] = useState({name:"",phone:"",email:"",childAge:"",classLevel:"JSS 1",preferredDate:"",preferredTime:"",visitorCount:"1",year:"2027 Academic Year"});
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [visitForm, setVisitForm] = useState({name:"",phone:"",email:"",childAge:"",classLevel:"JSS 1",preferredDate:"",preferredTime:"",visitorCount:"1"});
  const triggerContact = () => { setContacted(true); window.setTimeout(() => setContacted(false), 1800); };
  const submitAdmission = async (e) => {
    e.preventDefault(); setApiState("Submitting…");
    const result = await apiRequest("/admissions", { method:"POST", body:JSON.stringify(form) });
    setApiState(result.offline ? "Saved in demo mode — connect the API for production persistence." : "Application submitted to the admissions API.");
    try { localStorage.setItem("eduveraLatestApplication", JSON.stringify({name:form.name,email:form.email,phone:form.phone,classLevel:form.classLevel,year:form.year,submittedAt:new Date().toISOString()})); } catch {}
    setSubmitted(true);
  };
  const submitVisit = async (e) => {
    e.preventDefault(); setApiState("Booking…");
    const result = await apiRequest("/visits", { method:"POST", body:JSON.stringify(visitForm) });
    setApiState(result.offline ? "Visit request captured in demo mode." : "School visit request submitted.");
    setModal("visit-success");
  };
  const openApplication = () => { setSubmitted(false); setApiState(""); setModal("application"); };
  const gallery = [
    ["Campus", "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"],
    ["Classrooms", "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80"],
    ["ICT & CBT", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"],
    ["Laboratory", "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80"],
    ["Sports", "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80"],
    ["Projects", "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80"],
    ["Science Project", "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80"],
    ["Presentation Day", "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80"],
    ["Creative Arts", "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80"],
    ["Reading & Library", "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"],
    ["Student Collaboration", "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"],
    ["School Event", "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80"],
    ["Leadership", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"],
    ["Learning Outdoors", "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=80"],
    ["Technology Lab", "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"]
  ];
  const galleryItems = galleryFilter === "All" ? gallery : gallery.filter(x => x[0] === galleryFilter);
  return <div className="eduvera">
    <section className="edu-hero institution-hero">
      <nav className="edu-nav"><Link to="/eduvera" className="edu-nav-brand"><span className="brand-mark">A</span><b>EDUVERA ACADEMY</b></Link><div className="edu-nav-links">
        {[["top","Home"],["about","About"],["academics","Academics"],["school-life","School Life"],["admissions","Admissions"],["news","News & Events"],["gallery","Gallery"]].map(([id,label])=><a href={`#${id}`} key={id} onClick={e=>{e.preventDefault();scrollToId(id)}}>{label}</a>)}
        <a href="#contact">Contact</a><button className="edu-apply" onClick={openApplication}>Apply Now <ArrowRight size={14}/></button>
      </div></nav>
      <div className="edu-hero-content"><span className="eyebrow light">EDUVERA ACADEMY · IBADAN, OYO STATE</span>
        <h1>Building Excellent Minds.<br/><em>Developing Good Character.</em></h1>
        <p>Preparing students for the future through purposeful learning, character formation, practical skills and a strong school community.</p>
        <div className="hero-actions"><button className="btn btn-light hero-hover" onClick={openApplication}>Explore admission <ArrowRight size={17}/></button><button className="btn btn-ghost-light hero-hover" onClick={triggerContact}><MessageCircle size={17}/> {contacted ? "WhatsApp ready" : "Talk to Eduvera"}</button></div>
        {contacted&&<div className="contact-prompt"><MessageCircle size={16}/><span>WhatsApp enquiry prepared for admissions. Production mode can open the school's WhatsApp Business number.</span></div>}
        <div className="edu-stats"><div><strong>2009</strong><span>Established</span></div><div><strong>Nursery–SSS</strong><span>Academic pathway</span></div><div><strong>Ibadan</strong><span>Ibadan campus</span></div><div><strong>Learn. Lead. Serve.</strong><span>School motto</span></div></div>
      </div>
      <div className="institution-hero-image"><img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85" alt="Students learning in a modern classroom"/><div className="hero-image-card"><GraduationCap size={20}/><b>Future-ready education</b><span>Academic excellence · character · leadership</span></div></div>
    </section>

    <section className="section institutional-strip"><div className="institution-facts"><div><span>LOCATION</span><b>14 Learning Crescent, Bodija District, Ibadan, Oyo State</b></div><div><span>MOTTO</span><b>Learn. Lead. Serve.</b></div><div><span>PATHWAY</span><b>Nursery · Primary · JSS · SSS</b></div><div><span>FOCUS</span><b>Academic & character development</b></div></div></section>

    <section className="section edu-about" id="about"><SectionTitle eyebrow="ABOUT THE SCHOOL" title="A school community built around excellence and character." text="Eduvera Academy is presented here as a fictional institutional implementation based directly on the approved project proposal. The content is demonstration data until replaced with school-approved material."/><div className="split institutional-split"><div><h3>Our history</h3><p>Established in 2009, the Academy's story is represented as a journey of disciplined learning, community partnership and preparation for the next generation.</p><h3>Vision</h3><p>To develop confident, capable and responsible young people who can contribute meaningfully to their communities and the wider world.</p><h3>Mission</h3><p>To provide a safe, structured and engaging environment where academic learning, character, creativity, leadership and practical skills grow together.</p></div><div className="feature-panel leadership-panel"><span className="feature-number">01</span><span className="eyebrow">PROPRIETOR'S MESSAGE</span><h3>“We build the mind while shaping the character.”</h3><p>Every learner deserves patient teaching, clear expectations and opportunities to discover what they can become. This fictional message demonstrates how leadership content can live inside the production platform.</p><div className="check-list"><span><Check size={15}/>Excellence</span><span><Check size={15}/>Integrity</span><span><Check size={15}/>Discipline</span><span><Check size={15}/>Respect</span><span><Check size={15}/>Responsibility</span><span><Check size={15}/>Creativity & innovation</span></div></div></div></section>

    <section className="section muted" id="academics"><SectionTitle eyebrow="ACADEMICS" title="From foundation learning to senior secondary preparation" text="The platform covers the full academic journey described in the proposal."/><div className="academic-grid institution-academic-grid">{academicTracks.map((x,i)=><div className="academic-card" key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p><ul><li>Structured curriculum</li><li>Assessment & progress tracking</li><li>ICT and practical learning</li></ul></div>)}</div><div className="academic-support-grid">{["Curriculum","WAEC","NECO","JAMB preparation","ICT / Computer Education","CBT","Science / Practical Learning"].map(x=><span key={x}><Check size={15}/>{x}</span>)}</div></section>

    <section className="section" id="school-life"><SectionTitle eyebrow="SCHOOL LIFE & FACILITIES" title="Learning extends beyond the classroom" text="A production school platform can give each facility and activity its own managed content, images and updates."/><div className="facility-grid">{facilityCards.map((x,i)=><article className="facility-card" key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p><a href="#gallery" onClick={e=>{e.preventDefault();scrollToId("gallery")}}>View gallery <ArrowRight size={14}/></a></article>)}</div></section>

    <section className="section admissions-section" id="admissions"><SectionTitle eyebrow="ADMISSIONS" title="A clear journey from enquiry to resumption" text="Enquiry → Application → Entrance Assessment → Review → Offer → Registration → Resumption." action={<button className="btn btn-primary hero-hover" onClick={openApplication}>Begin application <ArrowRight size={16}/></button>}/><div className="admission-grid"><div className="admission-status card-surface"><div className="card-head"><div><h3>Admission status · 2027</h3><p>Fictional availability for the demonstration.</p></div><span className="status accepted">Open</span></div>{["Nursery","Primary","JSS","SSS"].map((x,i)=><div className="availability-row" key={x}><span>{x}</span><b>{["Open","Open","Limited","Open"][i]}</b><i><em style={{width:["72%","84%","46%","68%"][i]}}/></i></div>)}<button className="text-button" onClick={()=>setModal("requirements")}>View requirements <ArrowRight size={14}/></button></div><div className="admission-process card-surface"><h3>Application process</h3>{["Online enquiry / application","Entrance assessment","Admissions review","Offer & registration","Resumption"].map((x,i)=><div className="process-step" key={x}><span>{i+1}</span><div><b>{x}</b><small>{["Submit family and learner details.","Complete the appropriate assessment.","School reviews the application.","Accept offer and complete registration.","Join the school community."][i]}</small></div></div>)}</div></div><div className="admission-info-grid"><div><h3>Available classes</h3><p>Nursery 1–3 · Primary 1–6 · JSS 1–3 · SSS 1–3</p></div><div><h3>Fee information</h3><p>Fees vary by class and approved session. Production data would be maintained through the admin dashboard.</p></div><div><h3>Entrance examination</h3><p>Assessment may cover age-appropriate literacy, numeracy, reasoning and subject readiness.</p></div><div><h3>School visit</h3><p>Book a guided campus visit with preferred date, time and visitor count.</p><button className="text-button" onClick={()=>setModal("visit")}>Book a visit <ArrowRight size={14}/></button></div></div></section>

    <section className="section results-section"><SectionTitle eyebrow="RESULTS & ACHIEVEMENTS" title="Progress worth celebrating" text="Sample content below represents the results and achievements module in the proposal. Verified results would replace these placeholders."/><div className="results-highlight-grid">{resultHighlights.map(x=><article className="result-highlight" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p><button className="text-button" onClick={()=>alert(`${x[0]}\n\n${x[2]}\n\nProduction records would be verified and published through the administrative dashboard.`)}>View record <ArrowRight size={14}/></button></article>)}</div></section>

    <section className="section" id="news"><SectionTitle eyebrow="NEWS & EVENTS" title="Announcements, events and school notices"/><div className="news-grid">{eduNews.map(n=><article className="news-card" key={n[0]}><span>{n[0]}</span><h3>{n[1]}</h3><p>{n[2]}</p><a href="#news" onClick={e=>{e.preventDefault();alert(`${n[1]}\n\n${n[2]}\n\nProduction content would open as a full news or event record.`)}}>Read update <ArrowRight size={14}/></a></article>)}</div><div className="event-board"><div><CalendarDays size={20}/><div><b>Parent Partnership Evening</b><span>24 September 2026 · Main Hall</span></div></div><div><ClipboardList size={20}/><div><b>Assessment Week</b><span>28 September – 2 October 2026</span></div></div><div><Sparkles size={20}/><div><b>Innovation Showcase</b><span>8 October 2026 · ICT / CBT Centre</span></div></div></div></section>

    <section className="section" id="gallery"><SectionTitle eyebrow="GALLERY" title="Campus, classrooms, technology, sport and projects" text="A fuller visual library makes the institution feel like a living school rather than a landing page. These representative images are portfolio data and can be replaced from the admin gallery in production."/><div className="gallery-filter-row">{["All","Campus","Classrooms","ICT & CBT","Laboratory","Sports","Projects"].map(x=><button key={x} className={galleryFilter===x?"selected":""} onClick={()=>setGalleryFilter(x)}>{x}</button>)}</div><div className="edu-gallery institutional-gallery">{galleryItems.map(([title,img])=><figure key={title}><img loading="lazy" src={img} alt={title}/><figcaption><b>{title}</b><span>Eduvera school life</span></figcaption></figure>)}</div></section>

    <section className="section presentation-section"><SectionTitle eyebrow="PROJECTS & PRESENTATIONS" title="A place for the work students are proud to present" text="The same content model can showcase science projects, creative work, technology builds, cultural presentations and academic exhibitions."/><div className="presentation-grid"><article><img loading="lazy" src={gallery[6][1]} alt="Science project presentation"/><div><span>SCIENCE & INNOVATION</span><h3>Young minds, practical ideas</h3><p>Project records can include a title, class, student team, supervisor, presentation date and supporting media.</p></div></article><article><img loading="lazy" src={gallery[7][1]} alt="Student presentation"/><div><span>SHOWCASE</span><h3>Presentation & exhibition days</h3><p>Schools can publish highlights from exhibitions, competitions, assemblies and special presentation days.</p></div></article><article><img loading="lazy" src={gallery[8][1]} alt="Creative arts activity"/><div><span>CREATIVE ARTS</span><h3>Culture, creativity and expression</h3><p>Creative work can sit alongside academic achievements to present the whole learner and the wider school community.</p></div></article></div></section>

    <section className="section parents-section"><SectionTitle eyebrow="PARENTS & STUDENTS" title="The public site connects to the digital school experience" text="Phase 2 of the proposal introduces a secure parent/student portal; the frontend demonstration is already represented below."/><div className="bridge-grid"><Link to="/connect" className="bridge-card"><Users size={22}/><div><b>Eduvera Connect</b><span>Student profile, attendance, results, fees, assignments, timetable, exam timetable, downloads and announcements.</span></div><ArrowRight size={17}/></Link><Link to="/admin" className="bridge-card"><LayoutDashboard size={22}/><div><b>Nexora Admin</b><span>Authorized staff can manage admissions, website content, news, events, gallery and workflows.</span></div><ArrowRight size={17}/></Link></div></section>

    <section className="section platform-roadmap"><SectionTitle eyebrow="THREE-PHASE PLATFORM" title="A complete digital school ecosystem"/><div className="roadmap-grid"><article><span>PHASE 1</span><h3>Website + Admin</h3><p>Public website, admissions, visits, WhatsApp, news, events, gallery, achievements, SEO, analytics and custom dashboard.</p></article><article><span>PHASE 2</span><h3>Parent + Student Portal</h3><p>Profiles, attendance, report cards, fee statements, payment history, assignments, timetables, exam timetables and communication.</p></article><article><span>PHASE 3</span><h3>School Management</h3><p>Fees and admission payments, receipts, student/staff management, examinations, timetables, assignments, attendance and academic reports.</p></article></div></section>

    <section className="section contact-band" id="contact"><div><span className="eyebrow light">COMMUNICATION</span><h2>Ready to speak with the school?</h2><p>The Contact link remains intentionally dormant in this portfolio build. WhatsApp and admission interactions remain available for demonstration.</p></div><div className="hero-actions"><button className="btn btn-light hero-hover" onClick={openApplication}>Begin application</button><button className="btn btn-ghost-light hero-hover" onClick={triggerContact}><MessageCircle size={17}/> WhatsApp</button></div></section>

    {modal && <Modal title={modal==="application"?"Eduvera admissions":modal==="visit"?"Book a school visit":modal==="requirements"?"Admission requirements":"Request received"} onClose={()=>{setModal(null);setSubmitted(false);setApiState("")}}>
      {modal==="application" && !submitted && <form onSubmit={submitAdmission}><p className="modal-lead">Complete the admission enquiry. The form is wired to the production-ready REST endpoint and falls back to demo mode if the API is not running.</p><div className="form-grid"><label>Parent / guardian name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Emmanuel Adeyemi"/></label><label>Phone number<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="0800 000 0000"/></label><label>Email address<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="parent@example.com"/></label><label>Child's age<input required type="number" min="2" max="20" value={form.childAge} onChange={e=>setForm({...form,childAge:e.target.value})}/></label><label>Entry class<select value={form.classLevel} onChange={e=>setForm({...form,classLevel:e.target.value})}>{["Nursery 1","Nursery 2","Primary 1","Primary 4","JSS 1","JSS 3","SSS 1","SSS 3"].map(x=><option key={x}>{x}</option>)}</select></label><label>Academic year<select value={form.year} onChange={e=>setForm({...form,year:e.target.value})}><option>2027 Academic Year</option><option>2028 Academic Year</option></select></label></div>{apiState&&<div className="api-state">{apiState}</div>}<button className="btn btn-primary hero-hover" type="submit">Submit application <ArrowRight size={16}/></button></form>}
      {modal==="application" && submitted && <div className="success-state"><Check size={28}/><h3>Application submitted successfully</h3><p>{apiState} Your enquiry is now ready for admissions review. This success prompt stays open until you click Close.</p><button className="btn btn-primary hero-hover" onClick={()=>{setModal(null);setSubmitted(false);setForm({name:"",phone:"",email:"",childAge:"",classLevel:"JSS 1",preferredDate:"",preferredTime:"",visitorCount:"1",year:"2027 Academic Year"})}}>Close</button></div>}
      {modal==="visit" && <form onSubmit={submitVisit}><p className="modal-lead">Book a campus visit using the workflow specified in the proposal.</p><div className="form-grid"><label>Name<input required value={visitForm.name} onChange={e=>setVisitForm({...visitForm,name:e.target.value})}/></label><label>Phone<input required value={visitForm.phone} onChange={e=>setVisitForm({...visitForm,phone:e.target.value})}/></label><label>Email<input type="email" required value={visitForm.email} onChange={e=>setVisitForm({...visitForm,email:e.target.value})}/></label><label>Child's age<input type="number" min="2" max="20" required value={visitForm.childAge} onChange={e=>setVisitForm({...visitForm,childAge:e.target.value})}/></label><label>Class<select value={visitForm.classLevel} onChange={e=>setVisitForm({...visitForm,classLevel:e.target.value})}><option>JSS 1</option><option>Primary 4</option><option>SSS 1</option></select></label><label>Preferred date<input type="date" required value={visitForm.preferredDate} onChange={e=>setVisitForm({...visitForm,preferredDate:e.target.value})}/></label><label>Preferred time<input type="time" required value={visitForm.preferredTime} onChange={e=>setVisitForm({...visitForm,preferredTime:e.target.value})}/></label><label>Visitors<select value={visitForm.visitorCount} onChange={e=>setVisitForm({...visitForm,visitorCount:e.target.value})}><option>1</option><option>2</option><option>3</option><option>4</option></select></label></div><button className="btn btn-primary hero-hover" type="submit">Request visit <ArrowRight size={16}/></button></form>}
      {modal==="visit-success" && <div className="success-state"><Check size={28}/><h3>Visit request received</h3><p>{apiState} The school visit workflow is ready for a production calendar and admissions team.</p><button className="btn btn-primary hero-hover" onClick={()=>setModal(null)}>Close</button></div>}
      {modal==="requirements" && <div className="requirements-list">{admissionRequirements.map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b><Check size={16}/></div>)}<button className="btn btn-primary hero-hover" onClick={openApplication}>Start application <ArrowRight size={16}/></button></div>}
    </Modal>}
  </div>
}

function Modal({title,onClose,children}) { return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={18}/></button><span className="eyebrow">FRONTEND DEMONSTRATION</span><h2>{title}</h2>{children}</div></div> }

const adminSections = ["Overview","Admissions","Content management","Events","Gallery","Students","Staff","Examinations","Timetables","Assignments","Attendance","Fees & Payments","Academic reports","Workflows","Settings"];
const applications = [
  ["EV-2027-041","Amara Okafor","Secondary 1","18 Sep 2026","Review"],
  ["EV-2027-040","David Mensah","Primary 5","17 Sep 2026","Interview"],
  ["EV-2027-039","Zainab Bello","Secondary 3","16 Sep 2026","Accepted"],
  ["EV-2027-038","Noah Williams","Primary 2","15 Sep 2026","Review"],
  ["EV-2027-037","Maya Chen","Secondary 2","13 Sep 2026","Accepted"]
];

function DashboardFrame({title,subtitle,active,setActive,children, notifications=false}) {
  const [mobile,setMobile]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);
  const [noticeOpen,setNoticeOpen]=useState(false);
  const notices=["New application received from Amara Okafor","Open Day event was published","Gallery content was updated 2 hours ago"];
  return <div className="dashboard-frame" onMouseDown={e=>{if(noticeOpen && !e.target.closest(".dash-notice-panel,.dash-notice-button")) setNoticeOpen(false)}}>
    <aside className={`dash-sidebar ${mobile ? "show" : ""}`}>
      <div className="dash-logo"><span className="brand-mark">N</span><div><b>NEXORA</b><small>ADMIN CONSOLE</small></div></div>
      <nav>{adminSections.map(s=><button className={active===s?"selected":""} key={s} onClick={()=>{setActive(s);setMobile(false)}}>{(()=>{const Icon={Overview:LayoutDashboard,Admissions:ClipboardList,"Content management":FileText,Events:CalendarDays,Gallery:ImageIcon,Students:Users,Staff:UserRound,Examinations:BookOpen,Timetables:Clock3,Assignments:FileText,Attendance:Activity,"Fees & Payments":CreditCard,"Academic reports":BarChart3,Workflows:Zap,Settings:Settings}[s] || FileText; return <Icon size={17}/>})()}<span>{s}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="profile-mini"><span>EA</span><div><b>Emeka A.</b><small>Administrator</small></div><MoreHorizontal size={16}/></div></div>
    </aside>
    {mobile && <div className="sidebar-overlay" onClick={()=>setMobile(false)}/>}
    <div className="dash-main">
      <header className="dash-topbar"><button className="dash-menu" onClick={()=>setMobile(v=>!v)}><Menu size={19}/></button><div><h1>{title}</h1><p>{subtitle}</p></div><div className="dash-top-actions">
        <button className={searchOpen?"tool-active":""} aria-label="Search" onClick={()=>{setSearchOpen(v=>!v);setNoticeOpen(false)}}><Search size={18}/></button>
        <button className={`dash-notice-button ${notifications?"has-dot":""} ${noticeOpen?"tool-active":""}`} aria-label="Notifications" onClick={()=>{setNoticeOpen(v=>!v);setSearchOpen(false)}}><Bell size={18}/></button><span className="avatar">EA</span>
      </div></header>
      {searchOpen && <div className="dash-search-panel"><Search size={17}/><input autoFocus placeholder="Search admissions, content, events..."/><button onClick={()=>setSearchOpen(false)}><X size={16}/></button></div>}
      {noticeOpen && <div className="dash-notice-panel"><div className="notice-head"><b>Notifications</b><span>3 new</span></div>{notices.map((n,i)=><button key={n} onClick={()=>{setNoticeOpen(false); if(i===0)setActive("Admissions"); if(i===1)setActive("Events"); if(i===2)setActive("Gallery")}}><span className="notice-dot"></span><span><b>{n}</b><small>{i+1}h ago</small></span><ArrowRight size={14}/></button>)}</div>}
      <div className="dash-content">{children}</div>
    </div>
  </div>
}

function Admin() {
  const [active,setActive]=useState("Overview");
  const revenue=[{m:"Apr",v:48},{m:"May",v:62},{m:"Jun",v:58},{m:"Jul",v:75},{m:"Aug",v:71},{m:"Sep",v:89}];
  const renderSection = () => {
    if(active==="Admissions") return <><SectionTitle eyebrow="APPLICATIONS" title="Admissions pipeline" text="Fictional sample records for frontend demonstration." action={<button className="btn btn-primary btn-sm"><Plus size={15}/> New application</button>}/><div className="table-card"><table><thead><tr><th>Application</th><th>Applicant</th><th>Entry</th><th>Date</th><th>Status</th></tr></thead><tbody>{applications.map(r=><tr key={r[0]}>{r.map((v,i)=><td key={i}>{i===4?<Status value={v}/>:v}</td>)}</tr>)}</tbody></table></div></>;
    if(active==="Content management") return <ContentPanel title="Content management" items={["Homepage hero","About Eduvera","Academic pathways","Admissions information","School life","Contact details"]}/>;
    if(active==="Events") return <ContentPanel title="Events" items={["Eduvera Open Day · 12 Sep","Innovation Showcase · 05 Sep","Parent Partnership Evening · 24 Sep","Founders Lecture · 08 Oct"]}/>;
    if(active==="Gallery") return <ContentPanel title="Gallery" items={["Campus life · 24 images","Learning studios · 18 images","Sports & wellbeing · 31 images","Arts & performance · 16 images"]}/>;
    if(active==="Students") return <ContentPanel title="Student management" items={["Student profiles · 1,280","Admissions-to-student registration","Class / house allocation","Guardian records","Student document records"]}/>;
    if(active==="Staff") return <ContentPanel title="Staff management" items={["Teaching staff","Administrative staff","Role assignments","Leave / availability","Staff profile records"]}/>;
    if(active==="Examinations") return <ContentPanel title="Examination management" items={["Exam setup","Subject schedules","Marks entry","Result approval","Report-card publishing"]}/>;
    if(active==="Timetables") return <ContentPanel title="Timetable management" items={["Class timetable","Teacher timetable","Room allocation","Exam timetable","Conflict checks"]}/>;
    if(active==="Assignments") return <ContentPanel title="Assignment management" items={["Create assignment","Attach resources","Set due dates","Submission tracking","Teacher feedback"]}/>;
    if(active==="Attendance") return <ContentPanel title="Attendance management" items={["Daily register","Late / absence records","Class attendance","Attendance reports","Guardian notifications"]}/>;
    if(active==="Fees & Payments") return <ContentPanel title="Fees & payments" items={["Fee structures","Student balances","Payment history","Digital receipts","Payment gateway settings"]}/>;
    if(active==="Academic reports") return <ContentPanel title="Academic reports" items={["Class performance","Subject performance","Student report cards","Term summaries","WAEC / NECO / JAMB achievements"]}/>;
    if(active==="Workflows") return <ContentPanel title="Administrative workflows" items={["Admission workflow","Registration workflow","Approval queues","Notifications","Audit trail"]}/>;
    if(active==="Settings") return <ContentPanel title="Settings" items={["Institution profile","User roles & permissions","Notifications","Application workflow","Integrations","Security & backups"]}/>;
    return <><div className="welcome-row"><div><span className="eyebrow">OVERVIEW · 19 SEPTEMBER 2026</span><h2>Good morning, Emeka.</h2><p>Here’s the latest activity across your fictional Eduvera workspace.</p></div><button className="btn btn-secondary btn-sm"><CalendarDays size={15}/> This month <ChevronDown size={14}/></button></div>
      <div className="metrics-grid four"><MetricCard icon={Users} label="Total students" value="1,280" trend="+4.8% vs last term" tone="blue"/><MetricCard icon={ClipboardList} label="New applications" value="148" trend="+12.5% this month" tone="violet"/><MetricCard icon={CalendarDays} label="Upcoming events" value="12" trend="3 this week" tone="green"/><MetricCard icon={ImageIcon} label="Published assets" value="284" trend="+19 this month" tone="orange"/></div>
      <div className="dashboard-grid-main"><div className="chart-card"><div className="card-head"><div><h3>Admissions activity</h3><p>Applications received · last 6 months</p></div><button className="icon-btn"><MoreHorizontal size={18}/></button></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenue}><defs><linearGradient id="adm" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopOpacity=".24"/><stop offset="100%" stopOpacity=".02"/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="m" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="v" strokeWidth={3} fill="url(#adm)" stroke="currentColor"/></AreaChart></ResponsiveContainer></div></div><div className="activity-card"><div className="card-head"><div><h3>Recent activity</h3><p>Latest workspace updates</p></div></div>{[["18 Sep","Application received","Amara Okafor"],["18 Sep","Gallery updated","Learning studios"],["17 Sep","Event published","Open Day 2026"],["16 Sep","Application accepted","Zainab Bello"]].map(x=><div className="activity-item" key={x[0]+x[1]}><span className="activity-dot"></span><div><b>{x[1]}</b><small>{x[2]}</small></div><time>{x[0]}</time></div>)}</div></div>
      <div className="dashboard-grid-main lower"><div className="table-card"><div className="card-head"><div><h3>Latest applications</h3><p>Five most recent fictional records</p></div><button className="text-button" onClick={()=>setActive("Admissions")}>View all <ArrowRight size={14}/></button></div><table><thead><tr><th>Applicant</th><th>Entry</th><th>Status</th></tr></thead><tbody>{applications.slice(0,4).map(r=><tr key={r[0]}><td><b>{r[1]}</b><small>{r[0]}</small></td><td>{r[2]}</td><td><Status value={r[4]}/></td></tr>)}</tbody></table></div><div className="progress-card"><div className="card-head"><div><h3>Application pipeline</h3><p>Current stage distribution</p></div></div>{[["New",38,"blue"],["Review",27,"violet"],["Interview",21,"orange"],["Accepted",14,"green"]].map(x=><div className="pipeline" key={x[0]}><div><span>{x[0]}</span><b>{x[1]}%</b></div><div className={`bar ${x[2]}`}><span style={{width:x[1]+"%"}}/></div></div>)}</div></div>
    </>;
  };
  return <DashboardFrame title={active} subtitle="Eduvera institutional workspace · fictional concept" active={active} setActive={setActive} notifications>{renderSection()}</DashboardFrame>
}
function ContentPanel({title,items}) { return <div><SectionTitle eyebrow="WORKSPACE" title={title} text="Functional navigation state demonstrating a production-ready content management area."/><div className="settings-grid">{items.map((x,i)=><div className="setting-row" key={x}><div className="setting-icon"><FileText size={18}/></div><div><b>{x}</b><p>Manage this area and publish changes to the public website.</p></div><button className="icon-btn"><ArrowRight size={17}/></button></div>)}</div></div> }
function Status({value}) { return <span className={`status ${value.toLowerCase()}`}>{value}</span> }

function Connect() {
  const [tab,setTab]=useState("Overview");
  const [notice,setNotice]=useState("");
  const [selectedStudent,setSelectedStudent]=useState("Amara Adeyemi");
  const [latestApplication,setLatestApplication]=useState(null);
  const [searchOpen,setSearchOpen]=useState(false);
  const [noticeOpen,setNoticeOpen]=useState(false);

  const baseProfiles={
    "Amara Adeyemi":{
      initials:"AA",grade:"Grade 10 · Cedar House",id:"EV-10-2841",tutor:"Mrs. T. Ibrahim",house:"Cedar House",attendance:[{m:"Apr",v:94},{m:"May",v:96},{m:"Jun",v:91},{m:"Jul",v:97},{m:"Aug",v:95},{m:"Sep",v:98}],
      results:[{subject:"Mathematics",score:91},{subject:"Biology",score:88},{subject:"English Language",score:84},{subject:"Physics",score:86},{subject:"Computer Science",score:89}],
      fees:[{label:"Tuition",amount:250000},{label:"Activities",amount:45000},{label:"Transport",amount:30000},{label:"Technology",amount:25000}],paid:165000,nextClass:"10:30 AM · Mathematics",trend:"+4.2% this term"
    },
    "Daniel Adeyemi":{
      initials:"DA",grade:"Grade 8 · Maple House",id:"EV-08-1932",tutor:"Mr. K. Okoro",house:"Maple House",attendance:[{m:"Apr",v:89},{m:"May",v:92},{m:"Jun",v:90},{m:"Jul",v:94},{m:"Aug",v:91},{m:"Sep",v:93}],
      results:[{subject:"Mathematics",score:78},{subject:"Basic Science",score:83},{subject:"English Language",score:81},{subject:"Social Studies",score:87},{subject:"ICT",score:92}],
      fees:[{label:"Tuition",amount:210000},{label:"Activities",amount:35000},{label:"Technology",amount:20000}],paid:190000,nextClass:"12:00 PM · ICT",trend:"+2.6% this term"
    },
    "Zara Adeyemi":{
      initials:"ZA",grade:"Primary 5 · Cedar House",id:"EV-P5-4410",tutor:"Mrs. A. Bello",house:"Cedar House",attendance:[{m:"Apr",v:98},{m:"May",v:97},{m:"Jun",v:99},{m:"Jul",v:96},{m:"Aug",v:98},{m:"Sep",v:100}],
      results:[{subject:"English",score:94},{subject:"Mathematics",score:96},{subject:"Basic Science",score:90},{subject:"Creative Arts",score:88},{subject:"ICT",score:95}],
      fees:[{label:"Tuition",amount:185000},{label:"Activities",amount:28000},{label:"Technology",amount:18000}],paid:231000,nextClass:"08:00 AM · Mathematics",trend:"+5.1% this term"
    }
  };

  useEffect(()=>{try{const raw=localStorage.getItem("eduveraLatestApplication");if(raw)setLatestApplication(JSON.parse(raw));}catch{}},[]);
  const studentProfiles={...baseProfiles};
  if(latestApplication?.name){
    const name=latestApplication.name;
    const initials=name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase();
    const applicationProfile={
      initials:initials||"NA",grade:`Applicant · ${latestApplication.classLevel||"JSS 1"}`,id:"NEW-APP-"+(latestApplication.submittedAt?new Date(latestApplication.submittedAt).getTime().toString().slice(-5):"001"),tutor:"Admissions Office",house:"Pending placement",
      attendance:[{m:"Apr",v:0},{m:"May",v:0},{m:"Jun",v:0},{m:"Jul",v:0},{m:"Aug",v:0},{m:"Sep",v:0}],
      results:[{subject:"Entrance assessment",score:null},{subject:"Literacy readiness",score:null},{subject:"Numeracy readiness",score:null}],
      fees:[{label:"Application fee",amount:15000},{label:"Assessment",amount:10000}],paid:0,nextClass:"Placement pending",trend:"Awaiting assessment"
    };
    studentProfiles[name]=applicationProfile;
  }
  const student=studentProfiles[selectedStudent] || studentProfiles["Amara Adeyemi"];
  const attendance=student.attendance;
  const validResults=student.results.filter(x=>typeof x.score==='number');
  const resultAverage=validResults.length?Math.round(validResults.reduce((a,b)=>a+b.score,0)/validResults.length*10)/10:null;
  const feeItems=student.fees;
  const feeTotal=feeItems.reduce((a,b)=>a+b.amount,0), feePaid=student.paid, feeDue=Math.max(0,feeTotal-feePaid);
  const timetable=[
    ["08:00","English Language","Room 2","Mrs. Ibrahim"],["10:30","Mathematics","Room 4","Mr. Cole"],["12:00","Biology","Lab 2","Ms. Ibrahim"],["14:15","Design & Technology","Studio 1","Mr. Adewale"]
  ];
  const announcements=[["Open Day registration is now open","Admissions","Today"],["Assessment week begins 28 September","Academic","Yesterday"],["Robotics club applications close Friday","Clubs","2 days ago"],["Parent partnership evening · 24 Sep","Community","3 days ago"]];
  const showNotice=(msg)=>{setNotice(msg);window.setTimeout(()=>setNotice(""),1800)};
  const tabs=["Overview","Profile","Attendance","Results","Fees","Assignments","Timetable","Exam timetable","Announcements","Downloads","Messages"];
  const avgLabel=resultAverage===null?"Pending":`${resultAverage}%`;
  return <div className="portal" onMouseDown={e=>{if(noticeOpen && !e.target.closest(".portal-notice-panel,.portal-notification-button")) setNoticeOpen(false)}}>
    <header className="portal-head"><Link className="brand" to="/"><span className="brand-mark">A</span><span>{studioName}</span></Link><div className="portal-product"><span>EDUVERA</span> CONNECT</div><div className="portal-head-actions"><button className={searchOpen?"tool-active":""} aria-label="Search" onClick={()=>{setSearchOpen(v=>!v);setNoticeOpen(false)}}><Search size={18}/></button><button className={`portal-notification-button ${noticeOpen?"tool-active":""}`} aria-label="Notifications" onClick={()=>{setNoticeOpen(v=>!v);setSearchOpen(false)}}><Bell size={18}/><span className="portal-notification-dot"></span></button><span className="avatar teal">JA</span><div className="portal-user-text"><b>Jordan Adeyemi</b><small>Parent account</small></div></div></header>
    {searchOpen&&<div className="portal-search-panel"><Search size={17}/><input autoFocus placeholder="Search student records, timetable, fees..."/><button onClick={()=>setSearchOpen(false)}><X size={16}/></button></div>}
    {noticeOpen&&<div className="portal-notice-panel"><div className="notice-head"><b>Notifications</b><span>4 updates</span></div>{announcements.map((a,i)=><button key={a[0]} onClick={()=>{setTab(i===0?"Announcements":i===1?"Results":i===2?"Timetable":"Announcements");setNoticeOpen(false)}}><span className="notice-dot"></span><span><b>{a[0]}</b><small>{a[2]}</small></span><ArrowRight size={14}/></button>)}</div>}
    <div className="portal-layout"><aside className="portal-side"><div className="student-switcher"><div className="student-mini"><span className="student-avatar">{student.initials}</span><div><b>{selectedStudent}</b><small>{student.grade}</small></div></div><select aria-label="Switch student profile" value={selectedStudent} onChange={e=>{setSelectedStudent(e.target.value);setTab("Profile")}}>{Object.keys(studentProfiles).map(name=><option key={name}>{name}</option>)}</select>{latestApplication?.name===selectedStudent&&<div className="admission-sync"><Check size={14}/><span>New application linked to this profile.</span></div>}</div>{tabs.map(t=><button key={t} className={tab===t?"selected":""} onClick={()=>setTab(t)}>{(()=>{const Icon={Overview:LayoutDashboard,Profile:UserRound,Attendance:Activity,Results:BookOpen,Fees:CreditCard,Assignments:ClipboardList,Timetable:Clock3,"Exam timetable":CalendarDays,Announcements:Bell,Downloads:Package,Messages:MessageCircle}[t] || FileText; return <Icon size={17}/>})()}<span>{t}</span></button>)}<div className="portal-note"><Sparkles size={17}/><b>Connected school account</b><span>Each learner has a distinct academic, attendance and fee record. New admission enquiries appear as applicant profiles.</span></div></aside>
      <main className="portal-main"><div className="portal-title"><div><span className="eyebrow">EDUVERA CONNECT · 2026/27</span><h1>{tab === "Overview" ? `Welcome back, Jordan.` : tab}</h1>{latestApplication && <div className="admission-sync"><Check size={15}/><span>Latest admission enquiry: <b>{latestApplication.name}</b> · {latestApplication.classLevel} · {latestApplication.year}. Profile data is synchronized locally for this presentation.</span></div>}<p>{tab === "Overview" ? `Here’s a quick view of ${selectedStudent}'s academic journey.` : `Viewing ${selectedStudent}'s ${tab.toLowerCase()} record.`}</p></div><button className="btn btn-secondary btn-sm" onClick={()=>{downloadText("eduvera-connect-report.txt",`Eduvera Connect — Student Report\n\nStudent: ${selectedStudent}\nGrade: ${student.grade}\nAttendance: ${(attendance.some(x=>x.v)?Math.round(attendance.reduce((a,b)=>a+b.v,0)/attendance.length*10)/10+"%":"Pending")}\nAverage result: ${avgLabel}\nFees due: ${naira(feeDue)}\n\nFrontend demonstration report.`);showNotice("Report downloaded")}}><FileText size={15}/> {notice || "Download report"}</button></div>
      {tab==="Overview" ? <><div className="metrics-grid four portal-metrics"><MetricCard icon={HeartPulse} label="Attendance" value={attendance.some(x=>x.v)?`${Math.round(attendance.reduce((a,b)=>a+b.v,0)/attendance.length*10)/10}%`:"Pending"} trend={attendance.some(x=>x.v)?"Current term":"Awaiting attendance"} tone="green"/><MetricCard icon={TrendingUp} label="Average result" value={avgLabel} trend={student.trend} tone="blue"/><MetricCard icon={CircleDollarSign} label="Fee balance" value={naira(feeDue)} trend={feeDue?"Outstanding":"Paid"} tone="orange"/><MetricCard icon={Clock3} label="Next class" value={student.nextClass.split(" · ")[0]} trend={student.nextClass.split(" · ")[1]||"Placement pending"} tone="violet"/></div>
        <div className="portal-grid"><div className="portal-chart card-surface"><div className="card-head"><div><h3>Academic performance</h3><p>Average assessment score for {selectedStudent}</p></div><span className="tiny-badge">2026/27</span></div><div className="chart-wrap tall"><ResponsiveContainer width="100%" height="100%"><LineChart data={resultAverage===null?[{t:"T1",v:0},{t:"T2",v:0},{t:"T3",v:0},{t:"Current",v:0}]:[{t:"T1",v:Math.max(0,resultAverage-9)},{t:"T2",v:Math.max(0,resultAverage-5)},{t:"T3",v:Math.max(0,resultAverage-2)},{t:"Current",v:resultAverage}]}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="t" axisLine={false} tickLine={false}/><YAxis domain={[0,100]} axisLine={false} tickLine={false}/><Tooltip/><Line type="monotone" dataKey="v" strokeWidth={3} dot={{r:4}}/></LineChart></ResponsiveContainer></div></div><div className="attendance-card card-surface"><div className="card-head"><div><h3>Attendance trend</h3><p>Monthly attendance</p></div></div><div className="chart-wrap small"><ResponsiveContainer width="100%" height="100%"><BarChart data={attendance}><XAxis dataKey="m" axisLine={false} tickLine={false}/><YAxis domain={[0,100]} hide/><Tooltip/><Bar dataKey="v" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></div><div className="attendance-big"><strong>{attendance.some(x=>x.v)?`${Math.round(attendance.reduce((a,b)=>a+b.v,0)/attendance.length*10)/10}%`:"Pending"}</strong><span>{attendance.some(x=>x.v)?"Current attendance record":"Attendance begins after enrolment"}</span></div></div></div>
        <div className="portal-grid lower"><div className="card-surface"><div className="card-head"><div><h3>Today’s timetable</h3><p>{student.house} · current schedule</p></div><button className="text-button" onClick={()=>setTab("Timetable")}>Full timetable <ArrowRight size={14}/></button></div>{timetable.slice(0,3).map(x=><div className="schedule-row" key={x[0]}><time>{x[0]}</time><div><b>{x[1]}</b><span>{x[2]} · {x[3]}</span></div><ChevronDown size={16}/></div>)}</div><div className="card-surface"><div className="card-head"><div><h3>Latest announcements</h3><p>Recent school updates</p></div><button className="text-button" onClick={()=>setTab("Announcements")}>See all <ArrowRight size={14}/></button></div>{announcements.slice(0,3).map((x,i)=><div className="announcement" key={x[0]}><span>{i+1}</span><div><b>{x[0]}</b><small>{x[2]} · {x[1]}</small></div></div>)}</div></div>
        <div className="portal-quick-grid"><button onClick={()=>setTab("Results")}><BookOpen size={19}/><b>View results</b><span>{validResults.length} assessed subjects · {avgLabel} average</span></button><button onClick={()=>setTab("Fees")}><CreditCard size={19}/><b>Fee account</b><span>{naira(feeDue)} outstanding</span></button><button onClick={()=>setTab("Timetable")}><Clock3 size={19}/><b>Weekly timetable</b><span>5 weekdays · full schedule</span></button><button onClick={()=>setTab("Announcements")}><Bell size={19}/><b>School updates</b><span>{announcements.length} recent notices</span></button></div>
      </> : <PortalDetail tab={tab} results={student.results} resultAverage={resultAverage} feeItems={feeItems} feeTotal={feeTotal} feePaid={feePaid} feeDue={feeDue} timetable={timetable} announcements={announcements} attendance={attendance} student={student} selectedStudent={selectedStudent}/>}</main></div>
  </div>
}

function WeeklyTimetable({timetable}) {
  const [day,setDay]=useState("Monday");
  const weekly={
    Monday:[["08:00","English Language","Room 2","Mrs. Ibrahim"],["10:30","Mathematics","Room 4","Mr. Cole"],["12:00","Basic Science","Lab 1","Ms. Ibrahim"],["14:15","Creative Arts","Studio 1","Mr. Adewale"]],
    Tuesday:[["08:00","Mathematics","Room 4","Mr. Cole"],["10:30","Biology","Lab 2","Ms. Ibrahim"],["12:00","Computer Science","ICT Centre","Mr. Okoro"],["14:15","Physical Education","Sports Field","Coach Daniel"]],
    Wednesday:[["08:00","English Language","Room 2","Mrs. Ibrahim"],["10:30","Physics","Lab 2","Mr. Bello"],["12:00","Civic Education","Room 6","Mrs. Adeyemi"],["14:15","Robotics Club","Innovation Lab","Mr. Adewale"]],
    Thursday:[["08:00","Chemistry","Lab 1","Mr. Bello"],["10:30","Mathematics","Room 4","Mr. Cole"],["12:00","Literature","Room 7","Mrs. James"],["14:15","Music & Culture","Arts Studio","Ms. Grace"]],
    Friday:[["08:00","English Language","Room 2","Mrs. Ibrahim"],["10:30","Mathematics","Room 4","Mr. Cole"],["12:00","Biology","Lab 2","Ms. Ibrahim"],["14:15","Design & Technology","Studio 1","Mr. Adewale"],["15:30","House Meeting","Main Hall","Form Tutors"]]
  };
  return <div className="card-surface"><SectionTitle eyebrow="TIMETABLE" title="Weekly class schedule" text="Every weekday is accessible. Select a day to load its classes."/><div className="day-pills">{Object.keys(weekly).map(d=><button key={d} className={day===d?"selected":""} onClick={()=>setDay(d)}>{d}</button>)}</div><div className="timetable-day-label"><CalendarDays size={17}/><b>{day}</b><span>Cedar House · 2026/27</span></div><div className="timetable-grid">{weekly[day].map(x=><div className="timetable-row" key={x[0]+x[1]}><time>{x[0]}</time><div><b>{x[1]}</b><span>{x[2]} · {x[3]}</span></div><span className="class-status">Scheduled</span></div>)}</div></div>;
}

function PortalDetail({tab,results,resultAverage,feeItems,feeTotal,feePaid,feeDue,timetable,announcements,attendance,student,selectedStudent}) {
  if(tab==="Profile") return <div className="portal-detail-grid"><div className="portal-profile-card card-surface"><span className="student-avatar large">AD</span><h2>{selectedStudent}</h2><p>{student.grade}</p><div className="profile-details"><span><b>Student ID</b>{student.id}</span><span><b>Form tutor</b>{student.tutor}</span><span><b>Academic year</b>2026 / 27</span><span><b>Next review</b>12 Oct 2026</span></div></div><div className="card-surface"><div className="card-head"><div><h3>Student profile</h3><p>Frontend-only account details</p></div></div>{["Guardian contact verified","Medical information up to date","Emergency contact confirmed","Library account active"].map(x=><div className="detail-check" key={x}><Check size={16}/><span>{x}</span></div>)}</div></div>;
  if(tab==="Attendance") {const avg=Math.round(attendance.reduce((a,b)=>a+b.v,0)/attendance.length*10)/10;return <div className="portal-detail-grid"><div className="card-surface"><SectionTitle eyebrow="ATTENDANCE" title={`${avg}% attendance`} text="Monthly attendance calculated from the sample register."/><div className="attendance-list">{attendance.map(x=><div className="attendance-line" key={x.m}><span>{x.m}</span><div><i style={{width:x.v+"%"}}></i></div><b>{x.v}%</b></div>)}</div></div><div className="card-surface stat-stack"><div><span>Present</span><b>108 days</b></div><div><span>Late</span><b>2 days</b></div><div><span>Absent</span><b>3 days</b></div></div></div>}
  if(tab==="Results") return <div className="portal-detail-grid"><div className="card-surface"><SectionTitle eyebrow="RESULTS" title={`${resultAverage}% overall average`} text="Calculated live from the five sample subject scores."/><div className="result-list">{results.map(r=><div className="result-line" key={r.subject}><div><b>{r.subject}</b><span>Assessment score</span></div><strong>{r.score}%</strong><div className="result-bar"><i style={{width:r.score+"%"}}/></div></div>)}</div></div><div className="card-surface stat-stack"><div><span>Highest</span><b>Mathematics · 91%</b></div><div><span>Lowest</span><b>English · 84%</b></div><div><span>Average</span><b>{resultAverage}%</b></div></div></div>;
  if(tab==="Fees") return <div className="portal-detail-grid"><div className="card-surface"><SectionTitle eyebrow="FEES" title={naira(feeDue)+" outstanding"} text={`Total charges ${naira(feeTotal)} · Paid ${naira(feePaid)}.`}/>{feeItems.map(x=><div className="fee-line" key={x.label}><span>{x.label}</span><b>{naira(x.amount)}</b></div>)}<div className="fee-progress"><i style={{width:(feePaid/feeTotal*100)+"%"}}/></div><button className="btn btn-primary" onClick={()=>alert("Payment flow would connect to a payment gateway in production.")}>Review payment</button></div><div className="card-surface stat-stack"><div><span>Paid</span><b>{naira(feePaid)}</b></div><div><span>Outstanding</span><b>{naira(feeDue)}</b></div><div><span>Due date</span><b>30 Sep 2026</b></div></div></div>;
  if(tab==="Assignments") return <div className="portal-detail-grid"><div className="card-surface"><SectionTitle eyebrow="ASSIGNMENTS" title="Current learner tasks" text="Frontend sample assignments that would be stored and tracked through the school API."/><div className="assignment-list">{[["Mathematics problem set","Due 25 Sep","Mr. Cole","8 questions"],["Biology practical write-up","Due 26 Sep","Ms. Ibrahim","Lab report"],["ICT project brief","Due 30 Sep","Mr. Okoro","Team project"],["Literature reading journal","Due 2 Oct","Mrs. James","3 entries"]].map((x,i)=><div className="assignment-row" key={x[0]}><span>0{i+1}</span><div><b>{x[0]}</b><small>{x[1]} · {x[2]}</small></div><strong>{x[3]}</strong></div>)}</div></div><div className="card-surface stat-stack"><div><span>Open tasks</span><b>4</b></div><div><span>Submitted</span><b>7</b></div><div><span>Feedback</span><b>3 items</b></div></div></div>;
  if(tab==="Exam timetable") return <div className="card-surface"><SectionTitle eyebrow="EXAM TIMETABLE" title="Assessment week schedule" text="Sample exam schedule for the 2026/27 session."/><div className="timetable-grid">{[["28 Sep","Mathematics","09:00","Main Hall"],["29 Sep","English Language","09:00","Main Hall"],["30 Sep","Biology","10:30","Lab 2"],["01 Oct","Physics","10:30","Lab 2"],["02 Oct","Computer Science","09:00","ICT Centre"]].map(x=><div className="timetable-row" key={x[0]+x[1]}><time>{x[0]}<small>{x[2]}</small></time><div><b>{x[1]}</b><span>{x[3]} · Grade 10</span></div><span className="class-status">Scheduled</span></div>)}</div></div>;
  if(tab==="Downloads") return <div className="portal-detail-grid"><div className="card-surface"><SectionTitle eyebrow="DOWNLOADS" title="School documents" text="Frontend download controls for resources that a production portal would serve securely."/>{["2026/27 Student Handbook","Term 1 Academic Calendar","Grade 10 Curriculum Outline","Parent Partnership Guide"].map((x,i)=><button className="download-row" key={x} onClick={()=>downloadText(x.toLowerCase().replaceAll(" ","-")+".txt",`${x}

Eduvera Connect document preview.`)}><FileText size={18}/><span><b>{x}</b><small>PDF / document · sample resource</small></span><ArrowRight size={15}/></button>)}</div><div className="card-surface stat-stack"><div><span>Available</span><b>4 documents</b></div><div><span>Last updated</span><b>18 Sep 2026</b></div></div></div>;
  if(tab==="Messages") return <div className="card-surface"><SectionTitle eyebrow="PARENT COMMUNICATION" title="Messages & school communication" text="A production implementation would connect this area to secure parent-teacher messaging and WhatsApp/email notifications."/><div className="message-list">{[["Admissions Office","Open Day registration is now open.","Today"],["Form Tutor · Mrs. Ibrahim","Please review the assessment-week timetable.","Yesterday"],["ICT Department","Robotics club applications close Friday.","2 days ago"]].map((x,i)=><button key={x[0]} onClick={()=>alert(`${x[0]}

${x[1]}

${x[2]}`)}><span className="student-avatar">{i===0?"AO":i===1?"TI":"IT"}</span><div><b>{x[0]}</b><p>{x[1]}</p><small>{x[2]}</small></div><ArrowRight size={16}/></button>)}</div></div>;
  if(tab==="Timetable") return <WeeklyTimetable timetable={timetable}/>;
  if(tab==="Announcements") return <div className="card-surface"><SectionTitle eyebrow="ANNOUNCEMENTS" title="School updates" text="Open a notice to read its frontend preview."/><div className="announcement-detail-list">{announcements.map((x,i)=><button key={x[0]} onClick={()=>alert(`${x[0]}\n\n${x[1]} · ${x[2]}\n\nThis is a frontend demonstration announcement. A production system would load the full message from the school API.`)}><span className="announcement-number">0{i+1}</span><div><b>{x[0]}</b><small>{x[1]} · {x[2]}</small></div><ArrowRight size={16}/></button>)}</div></div>;
  return null;
}

const products=[
  {id:1,name:"Aster Carryall",category:"Bags",price:68000,tag:"New",desc:"Structured everyday carry with a clean, adaptable silhouette.",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"},
  {id:2,name:"Form Desk Lamp",category:"Home",price:42000,tag:"Studio pick",desc:"Warm ambient lighting for focused workspaces.",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"},
  {id:3,name:"Arc Ceramic Set",category:"Home",price:35000,tag:"Popular",desc:"Minimal tableware designed for everyday rituals.",image:"https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80"},
  {id:4,name:"Field Runner",category:"Footwear",price:89000,tag:"Limited",desc:"Lightweight city runner with a responsive everyday sole.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"},
  {id:5,name:"Mono Travel Case",category:"Accessories",price:76000,tag:"New",desc:"Compact organizer for modern travel essentials.",image:"https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=900&q=80"},
  {id:6,name:"Signal Notebook",category:"Stationery",price:12500,tag:"Everyday",desc:"Hardcover notebook with premium paper and grid pages.",image:"https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80"},
  {id:7,name:"Linea Bottle",category:"Accessories",price:18500,tag:"Popular",desc:"Insulated bottle with a refined matte finish.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80"},
  {id:8,name:"Cove Overshirt",category:"Apparel",price:72000,tag:"New",desc:"Relaxed overshirt cut for versatile daily layering.",image:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80"},
  {id:9,name:"Halo Side Table",category:"Home",price:98000,tag:"New",desc:"Compact sculptural table for reading corners and living spaces.",image:"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80"},
  {id:10,name:"Loom Tote",category:"Bags",price:54000,tag:"Popular",desc:"Soft structured tote with generous everyday capacity.",image:"https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80"},
  {id:11,name:"Terra Mug Pair",category:"Home",price:22000,tag:"Studio pick",desc:"Hand-finished ceramic mugs for slow morning rituals.",image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80"},
  {id:12,name:"Motion Trainer",category:"Footwear",price:94000,tag:"Limited",desc:"Minimal trainer built for commuting and everyday movement.",image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80"},
  {id:13,name:"Axis Watch",category:"Accessories",price:118000,tag:"New",desc:"Clean everyday watch with a restrained modern profile.",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80"},
  {id:14,name:"Studio Journal",category:"Stationery",price:18000,tag:"Everyday",desc:"Premium lined journal for notes, ideas and planning.",image:"https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80"},
  {id:15,name:"North Knit",category:"Apparel",price:65000,tag:"Popular",desc:"Soft textured knit designed for easy layering.",image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80"},
  {id:16,name:"Arc Backpack",category:"Bags",price:88000,tag:"New",desc:"Streamlined backpack for work, study and city travel.",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"},
  {id:17,name:"Mist Diffuser",category:"Home",price:46000,tag:"Wellness",desc:"Quiet ambient diffuser for calm work and rest spaces.",image:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80"},
  {id:18,name:"Everyday Cap",category:"Apparel",price:24000,tag:"New",desc:"Minimal six-panel cap with an adjustable everyday fit.",image:"https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80"},
  {id:19,name:"Carry Tech Pouch",category:"Accessories",price:32000,tag:"Studio pick",desc:"Compact organizer for chargers, cables and small essentials.",image:"https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80"},
  {id:20,name:"Daily Planner",category:"Stationery",price:15000,tag:"Everyday",desc:"Undated planner with space for priorities and weekly notes.",image:"https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=900&q=80"},
  {id:21,name:"Cloud Lounge Chair",category:"Home",price:185000,tag:"Featured",desc:"Soft sculptural seating for reading corners and calm spaces.",image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80"},
  {id:22,name:"Canvas Weekender",category:"Bags",price:79000,tag:"Travel",desc:"Roomy carryall for short trips, gym days and weekends.",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"},
  {id:23,name:"Slate Water Carafe",category:"Home",price:29000,tag:"Studio pick",desc:"Clean-lined glass carafe for everyday table settings.",image:"https://images.unsplash.com/photo-1601055903647-ddf1ee9701b7?auto=format&fit=crop&w=900&q=80"},
  {id:24,name:"Transit Sneaker",category:"Footwear",price:102000,tag:"New",desc:"Minimal everyday sneaker with a comfortable city profile.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"},
  {id:25,name:"Workday Overshirt",category:"Apparel",price:78000,tag:"Popular",desc:"Structured cotton layer designed for work and weekends.",image:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80"},
  {id:26,name:"Focus Desk Pad",category:"Stationery",price:17000,tag:"Everyday",desc:"Large writing surface for planning, notes and focused work.",image:"https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80"},
  {id:27,name:"Field Cap",category:"Apparel",price:26000,tag:"New",desc:"Relaxed cotton cap with an understated everyday finish.",image:"https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80"},
  {id:28,name:"Travel Tech Sleeve",category:"Accessories",price:39000,tag:"Travel",desc:"Protective sleeve for tablets, notebooks and chargers.",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"}
];
const naira = n => "₦"+n.toLocaleString("en-NG");
const downloadText = (filename, content) => {
  const blob = new Blob([content], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
};

function UtilityPopover({title, children, onClose}) {
  return <div className="utility-popover-backdrop" onMouseDown={onClose}><div className="utility-popover" onMouseDown={e=>e.stopPropagation()}><div className="utility-popover-head"><b>{title}</b><button onClick={onClose}><X size={16}/></button></div>{children}</div></div>
}

function Shopora() {
  const [query,setQuery]=useState(""); const [cat,setCat]=useState("All"); const [cart,setCart]=useState([]); const [drawer,setDrawer]=useState(false); const [checkoutMessage,setCheckoutMessage]=useState(""); const [addedProduct,setAddedProduct]=useState("");
  const cats=["All",...new Set(products.map(p=>p.category))];
  const filtered=useMemo(()=>products.filter(p=>(cat==="All"||p.category===cat)&&(p.name+" "+p.desc).toLowerCase().includes(query.toLowerCase())),[query,cat]);
  const count=cart.reduce((a,b)=>a+b.qty,0), total=cart.reduce((a,b)=>a+b.qty*b.price,0);
  const checkout=()=>{ if(!cart.length) return; setCheckoutMessage("Order confirmed — your demo checkout was successful."); setCart([]); window.setTimeout(()=>setCheckoutMessage(""),2200); };
  const add=p=>{setCart(c=>{const found=c.find(x=>x.id===p.id);return found?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}]});setAddedProduct(`${p.name} added to cart`);window.setTimeout(()=>setAddedProduct(""),1800)};
  return <div className="shopora"><header className="shop-head"><Link className="brand" to="/"><span className="brand-mark">A</span><span>{studioName}</span></Link><div className="shop-brand"><span>SHOPORA</span><small>MODERN GOODS</small></div><nav><a href="#shop" onClick={(e)=>{e.preventDefault();document.getElementById("shop")?.scrollIntoView({behavior:"smooth",block:"start"});}}>Shop</a><a href="#story" onClick={(e)=>{e.preventDefault();document.getElementById("story")?.scrollIntoView({behavior:"smooth",block:"start"});}}>Our story</a><a href="#contact" onClick={(e)=>{e.preventDefault();document.getElementById("contact")?.scrollIntoView({behavior:"smooth",block:"start"});}}>Contact</a></nav><button className="shop-cart" onClick={()=>setDrawer(true)}><ShoppingCart size={18}/><span>Cart</span><b>{count}</b></button></header>
    <section className="shop-hero"><div><span className="eyebrow">SHOPORA · E-COMMERCE CONCEPT</span><h1>Objects for a<br/><em>better everyday.</em></h1><p>A fictional storefront demonstrating search, category discovery, product cards and a working cart experience.</p><a className="btn btn-dark" href="#shop" onClick={(e)=>{e.preventDefault();document.getElementById("shop")?.scrollIntoView({behavior:"smooth",block:"start"});}}>Explore collection <ArrowRight size={16}/></a></div><div className="shop-orb"><ShoppingBag size={70}/><span>CURATED<br/>GOODS</span></div></section>
    <section className="shop-section" id="shop">{addedProduct&&<div className="cart-added-toast"><ShoppingCart size={17}/><span>{addedProduct}</span><button onClick={()=>setDrawer(true)}>View cart</button></div>}{checkoutMessage&&<div className="success-toast"><Check size={17}/>{checkoutMessage}</div>}<div className="shop-toolbar"><div><span className="eyebrow">THE COLLECTION</span><h2>Designed for everyday use</h2></div><div className="searchbox"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products"/></div></div><div className="cat-row">{cats.map(c=><button className={cat===c?"selected":""} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div><div className="product-grid">{filtered.map(p=><article className="product-card" key={p.id}><div className="product-visual"><span>{p.tag}</span><img className="product-image" src={p.image} alt={p.name}/></div><div className="product-info"><div><span>{p.category}</span><h3>{p.name}</h3></div><strong>{naira(p.price)}</strong></div><p>{p.desc}</p><button className="add-btn" onClick={()=>add(p)}><Plus size={16}/> Add to cart</button></article>)}</div>{filtered.length===0&&<div className="empty-state"><Search size={28}/><h3>No products found</h3><p>Try another search or category.</p></div>}</section>
    <section className="shop-banner" id="story"><div><span className="eyebrow light">SHOPORA CONCEPT</span><h2>A storefront that feels considered.</h2><p>In production, product, inventory, customer and payment states would be connected to backend services.</p></div><div className="banner-stat"><strong>20</strong><span>fictional products</span></div></section><section className="shop-contact" id="contact"><div><span className="eyebrow">CONTACT</span><h2>Questions about a product?</h2><p>This demo contact point is ready for a production email, chat or customer-service endpoint.</p></div><a className="btn btn-dark" href="mailto:hello@alefantverse.com">Email Shopora <ArrowRight size={16}/></a></section>
    {drawer&&<div className="drawer-backdrop" onMouseDown={()=>setDrawer(false)}><aside className="cart-drawer" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><h2>Your cart</h2><button onClick={()=>setDrawer(false)}><X size={18}/></button></div>{cart.length?<>{cart.map(p=><div className="cart-item" key={p.id}><div className="cart-thumb"><img src={p.image} alt=""/></div><div><b>{p.name}</b><span>{p.qty} × {naira(p.price)}</span></div><strong>{naira(p.qty*p.price)}</strong></div>)}<div className="cart-total"><span>Subtotal</span><strong>{naira(total)}</strong></div><button className="btn btn-dark full" onClick={()=>{checkout();setDrawer(false)}}>Complete checkout <ArrowRight size={16}/></button></>:<div className="empty-cart"><ShoppingCart size={34}/><h3>Your cart is empty</h3><p>Add a product to see the cart interaction.</p></div>}</aside></div>}
  </div>
}

function Insights() {
  const [period,setPeriod]=useState("6 months"); const [exported,setExported]=useState(false);
  const revenue=[{m:"Apr",v:320},{m:"May",v:368},{m:"Jun",v:342},{m:"Jul",v:412},{m:"Aug",v:458},{m:"Sep",v:510}];
  const channels=[{n:"Organic search",v:38},{n:"Paid social",v:24},{n:"Direct",v:21},{n:"Referral",v:17}];
  return <div className="insights"><header className="insights-head"><div className="insight-brand"><span className="brand-mark">N</span><div><b>NEXORA</b><small>INSIGHTS</small></div></div><nav><Link to="/">Suite</Link><a href="#overview" onClick={(e)=>{e.preventDefault();document.getElementById("overview")?.scrollIntoView({behavior:"smooth",block:"start"});}}>Overview</a><a href="#traffic" onClick={(e)=>{e.preventDefault();document.getElementById("traffic")?.scrollIntoView({behavior:"smooth",block:"start"});}}>Traffic</a><a href="#reports" onClick={(e)=>{e.preventDefault();document.getElementById("reports")?.scrollIntoView({behavior:"smooth",block:"start"});}}>Reports</a></nav><div className="insight-user"><button><Bell size={18}/></button><span className="avatar purple">MK</span></div></header>
    <main className="insight-main"><div className="insight-title"><div><span className="eyebrow">NEXORA INSIGHTS · ANALYTICS CONCEPT</span><h1>Business overview</h1><p>Fictional performance data for a SaaS analytics frontend demonstration.</p></div><div className="insight-actions"><select value={period} onChange={e=>setPeriod(e.target.value)}><option>6 months</option><option>12 months</option><option>30 days</option></select><button className="btn btn-dark btn-sm" onClick={()=>{const blob=new Blob(["Nexora Insights — Business Overview\n\nRevenue: ₦2.41M\nActive customers: 8,426\nConversion rate: 4.82%\nAverage order value: ₦28,640\n\nFrontend demonstration report."],{type:"text/plain"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="nexora-insights-report.txt";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);setExported(true)}}><FileText size={15}/> {exported?"Report downloaded":"Export report"}</button></div></div>
    <div className="metrics-grid four insight-metrics"><MetricCard icon={CircleDollarSign} label="Revenue" value="₦2.41M" trend="+18.6% vs previous" tone="blue"/><MetricCard icon={Users} label="Active customers" value="8,426" trend="+9.4% this period" tone="violet"/><MetricCard icon={TrendingUp} label="Conversion rate" value="4.82%" trend="+0.62 pts" tone="green"/><MetricCard icon={ShoppingCart} label="Average order value" value="₦28,640" trend="+6.8%" tone="orange"/></div>
    <div className="insight-grid"><div className="insight-chart card-surface" id="overview"><div className="card-head"><div><h3>Revenue trend</h3><p>Gross revenue · fictional sample data</p></div><span className="chart-value">₦510K <small>September</small></span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenue}><defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopOpacity=".22"/><stop offset="100%" stopOpacity=".02"/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="m" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip formatter={(v)=>["₦"+v+"K","Revenue"]}/><Area type="monotone" dataKey="v" strokeWidth={3} fill="url(#rev)" stroke="currentColor"/></AreaChart></ResponsiveContainer></div></div>
      <div className="channel-card card-surface" id="traffic"><div className="card-head"><div><h3>Traffic channels</h3><p>Share of sessions</p></div></div><div className="donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={channels} dataKey="v" nameKey="n" innerRadius={55} outerRadius={78} paddingAngle={3}>{channels.map((_,i)=><Cell key={i}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div><strong>48.2K</strong><span>Total sessions</span></div></div>{channels.map((c,i)=><div className="channel-row" key={c.n}><span className={`channel-dot c${i}`}></span><span>{c.n}</span><b>{c.v}%</b></div>)}</div></div>
    <div className="insight-grid lower"><div className="insights-list card-surface"><div className="card-head"><div><h3>Key insights</h3><p>Signals surfaced from fictional business data</p></div></div>{[["Revenue momentum","September revenue is 18.6% above the previous comparison period.","up"],["Customer growth","Active customers increased steadily across the reporting window.","up"],["Conversion opportunity","Paid social has strong traffic volume with room for conversion improvement.","focus"]].map(x=><div className="insight-row" key={x[0]}><span className={`insight-badge ${x[2]}`}>{x[2]==="up"?<TrendingUp size={16}/>:<Activity size={16}/>}</span><div><b>{x[0]}</b><p>{x[1]}</p></div><ArrowRight size={16}/></div>)}</div><div className="quick-stats card-surface" id="reports"><div className="card-head"><div><h3>Report snapshot</h3><p>Current workspace totals</p></div></div>{[["Orders","8,920"],["Returning customers","61.4%"],["Refund rate","1.2%"],["Net revenue","₦2.18M"]].map(x=><div className="quick-row" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}<button className="btn btn-secondary full" onClick={()=>{const blob=new Blob(["Nexora Insights — Report Snapshot\n\nOrders: 8,920\nReturning customers: 61.4%\nRefund rate: 1.2%\nNet revenue: ₦2.18M"],{type:"text/plain"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="nexora-insights-snapshot.txt";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);setExported(true)}}><FileText size={15}/> {exported?"Report downloaded":"Generate report"}</button></div></div>
    </main></div>
}

function App() {
  const routes=<Routes><Route path="/" element={<SuiteHome/>}/><Route path="/eduvera" element={<Eduvera/>}/><Route path="/admin" element={<Admin/>}/><Route path="/connect" element={<Connect/>}/><Route path="/shopora" element={<Shopora/>}/><Route path="/insights" element={<Insights/>}/><Route path="*" element={<SuiteHome/>}/></Routes>;
  return <Shell>{routes}</Shell>;
}

createRoot(document.getElementById("root")).render(<HashRouter><App/></HashRouter>);
