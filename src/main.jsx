import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
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
          <span className="concept-chip">Frontend concepts</span>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <span><b>ALEFANTVERSE</b> · Frontend Demo Suite</span>
        <span>Concepts are fictional demonstrations; NovaFit is completed work.</span>
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
        {cards.map(c => (c.path === "/admin" || c.path === "/connect") ? <div className="demo-card" key={c.path} aria-disabled="true" style={{cursor:"default"}}>
          <div className={`demo-icon ${c.accent}`}><c.icon size={23}/></div>
          <span className="card-kicker">{c.type}</span><h3>{c.name}</h3><p>{c.desc}</p>
          <span className="text-link" style={{opacity:.55}}>Demo preview</span>
        </div> : <Link to={c.path} className="demo-card" key={c.path}>
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

function Eduvera() {
  const [modal, setModal] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [contacted, setContacted] = useState(false);
  return <div className="eduvera">
    <section className="edu-hero">
      <div className="edu-hero-content">
        <span className="eyebrow light">EDUVERA · INSTITUTIONAL CONCEPT</span>
        <h1>Learning with purpose.<br/><em>Growing with confidence.</em></h1>
        <p>A fictional institutional website concept showing how a modern school can bring its community, admissions and academic story together in one digital experience.</p>
        <div className="hero-actions"><button className="btn btn-light" onClick={() => setModal(true)}>Explore admissions <ArrowRight size={17}/></button><button className="btn btn-ghost-light" onClick={() => setContacted(true)}><MessageCircle size={17}/> {contacted ? "Message ready" : "Talk to Eduvera"}</button></div>
        <div className="edu-stats"><div><strong>1,280+</strong><span>Learners</span></div><div><strong>94%</strong><span>Progress rate</span></div><div><strong>18</strong><span>Learning studios</span></div><div><strong>26</strong><span>Years of impact</span></div></div>
      </div>
      <div className="edu-orbit"><div className="orbit-core"><GraduationCap size={48}/><span>EDUVERA</span></div><div className="orbit-label ol1">Academic excellence</div><div className="orbit-label ol2">Future-ready skills</div><div className="orbit-label ol3">Whole-child growth</div></div>
    </section>
    <section className="section edu-about"><div className="split"><div><span className="eyebrow">OUR APPROACH</span><h2>A school experience designed around the learner.</h2><p>Eduvera is a fictional premium school concept where strong foundations meet curiosity, collaboration and practical learning. The experience is designed to make essential information easy to discover for families.</p><div className="check-list"><span><Check size={15}/>Small-group learning</span><span><Check size={15}/>Technology-rich classrooms</span><span><Check size={15}/>Arts, sport and leadership</span></div></div><div className="feature-panel"><div className="feature-number">01</div><h3>Learning beyond the classroom</h3><p>Purpose-built studios, outdoor spaces and project-based programmes give students room to explore ideas in meaningful contexts.</p><button className="text-button">Discover school life <ArrowRight size={15}/></button></div></div></section>
    <section className="section muted"><SectionTitle eyebrow="ACADEMICS" title="A connected pathway from foundation to future" text="Clear pathways, visible progress and opportunities to discover individual strengths."/><div className="academic-grid">{["Early Years","Primary School","Secondary School"].map((x,i)=><div className="academic-card" key={x}><span>0{i+1}</span><h3>{x}</h3><p>{["Confidence, language, play and discovery.","Core knowledge, curiosity and independent thinking.","Depth, leadership and preparation for higher study."][i]}</p><a href="#contact">Explore pathway <ArrowRight size={15}/></a></div>)}</div></section>
    <section className="section"><SectionTitle eyebrow="SCHOOL LIFE" title="A place to belong, contribute and thrive"/><div className="life-grid"><div className="life-large"><span>01 · FACILITIES</span><h3>Spaces that invite discovery.</h3><p>Science labs, creative studios, performance spaces, sports facilities and collaborative learning hubs.</p></div><div className="life-small"><span>02 · COMMUNITY</span><h3>Clubs & leadership</h3><p>Debate, robotics, music, enterprise and service programmes.</p></div><div className="life-small"><span>03 · WELLBEING</span><h3>Student support</h3><p>Pastoral care and a culture where every learner is known.</p></div></div></section>
    <section className="section muted"><SectionTitle eyebrow="NEWS & EVENTS" title="What's happening at Eduvera"/><div className="news-grid">{eduNews.map(n=><article className="news-card" key={n[0]}><span>{n[0]}</span><h3>{n[1]}</h3><p>{n[2]}</p><a href="#contact">Read update <ArrowRight size={14}/></a></article>)}</div></section>
    <section className="section contact-band" id="contact"><div><span className="eyebrow light">READY TO CONNECT?</span><h2>Start a conversation with Eduvera.</h2><p>Demonstration interaction only—production forms would connect to the institution's admissions and communications APIs.</p></div><div className="hero-actions"><button className="btn btn-light" onClick={() => setModal(true)}>Begin application</button><button className="btn btn-ghost-light" onClick={() => setContacted(true)}><MessageCircle size={17}/> WhatsApp</button></div></section>
    {modal && <Modal title="Eduvera admissions" onClose={() => setModal(false)}><p className="modal-lead">This is a frontend concept. In production, this flow would create an application record through the platform API.</p><label>Parent / guardian name<input placeholder="Jordan Adeyemi"/></label><label>Email address<input placeholder="jordan@example.com"/></label><label>Entry year<select><option>2027 Academic Year</option><option>2028 Academic Year</option></select></label><button className="btn btn-primary" onClick={() => { setModal(false); setApplicationSuccess(true); }}>Submit application <Check size={16}/></button></Modal>}
    {applicationSuccess && <Modal title="Application submitted successfully" onClose={() => setApplicationSuccess(false)}><div className="success-message"><div className="success-icon"><Check size={28}/></div><p>Your Eduvera application has been received successfully.</p><button className="btn btn-primary" onClick={() => setApplicationSuccess(false)}>Done</button></div></Modal>}
  </div>
}

function Modal({title,onClose,children}) { return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={18}/></button><span className="eyebrow">FRONTEND DEMONSTRATION</span><h2>{title}</h2>{children}</div></div> }

const adminSections = ["Overview","Admissions","Content management","Events","Gallery","Settings"];
const applications = [
  ["EV-2027-041","Amara Okafor","Secondary 1","18 Sep 2026","Review"],
  ["EV-2027-040","David Mensah","Primary 5","17 Sep 2026","Interview"],
  ["EV-2027-039","Zainab Bello","Secondary 3","16 Sep 2026","Accepted"],
  ["EV-2027-038","Noah Williams","Primary 2","15 Sep 2026","Review"],
  ["EV-2027-037","Maya Chen","Secondary 2","13 Sep 2026","Accepted"]
];

function DashboardFrame({title,subtitle,active,setActive,children, notifications=false}) {
  const [mobile, setMobile] = useState(false);
  return <div className="dashboard-frame">
    <aside className={`dash-sidebar ${mobile ? "show" : ""}`}>
      <div className="dash-logo"><span className="brand-mark">N</span><div><b>NEXORA</b><small>ADMIN CONSOLE</small></div></div>
      <nav>{adminSections.map(s=><button className={active===s?"selected":""} key={s} onClick={()=>{setActive(s);setMobile(false)}}>{({Overview:LayoutDashboard,Admissions:ClipboardList,"Content management":FileText,Events:CalendarDays,Gallery:ImageIcon,Settings:Settings}[s])({size:17})}<span>{s}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="profile-mini"><span>EA</span><div><b>Emeka A.</b><small>Administrator</small></div><MoreHorizontal size={16}/></div></div>
    </aside>
    {mobile && <div className="sidebar-overlay" onClick={()=>setMobile(false)}/>}
    <div className="dash-main">
      <header className="dash-topbar"><button className="dash-menu" onClick={()=>setMobile(v=>!v)}><Menu size={19}/></button><div><h1>{title}</h1><p>{subtitle}</p></div><div className="dash-top-actions"><button><Search size={18}/></button><button className={notifications?"has-dot":""}><Bell size={18}/></button><span className="avatar">EA</span></div></header>
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
    if(active==="Settings") return <ContentPanel title="Settings" items={["Institution profile","User roles & permissions","Notifications","Application workflow","Integrations"]}/>;
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
  const tabs=["Overview","Profile","Attendance","Results","Fees","Timetable","Announcements"];
  const attendance=[{m:"Apr",v:94},{m:"May",v:96},{m:"Jun",v:91},{m:"Jul",v:97},{m:"Aug",v:95},{m:"Sep",v:98}];
  return <div className="portal">
    <header className="portal-head"><Link className="brand" to="/"><span className="brand-mark">A</span><span>{studioName}</span></Link><div className="portal-product"><span>EDUVERA</span> CONNECT</div><div className="portal-user"><Bell size={18}/><span className="avatar teal">JA</span><div><b>Jordan Adeyemi</b><small>Parent account</small></div></div></header>
    <div className="portal-layout"><aside className="portal-side"><div className="student-mini"><span className="student-avatar">AD</span><div><b>Amara Adeyemi</b><small>Grade 10 · Cedar House</small></div></div>{tabs.map(t=><button key={t} className={tab===t?"selected":""} onClick={()=>setTab(t)}>{({Overview:LayoutDashboard,Profile:UserRound,Attendance:Activity,Results:BookOpen,Fees:CreditCard,Timetable:Clock3,Announcements:Bell}[t])({size:17})}<span>{t}</span></button>)}<div className="portal-note"><Sparkles size={17}/><b>Frontend concept</b><span>Student records and notifications would be API-driven in production.</span></div></aside>
      <main className="portal-main"><div className="portal-title"><div><span className="eyebrow">EDUVERA CONNECT · 2026/27</span><h1>{tab === "Overview" ? "Welcome back, Jordan." : tab}</h1><p>{tab === "Overview" ? "Here’s a quick view of Amara’s academic journey." : "Fictional student information for the live frontend demonstration."}</p></div><button className="btn btn-secondary btn-sm" onClick={()=>setNotice("Report download prepared for demonstration.")}><FileText size={15}/> {notice || "Download report"}</button></div>
      {tab==="Overview" ? <><div className="metrics-grid four portal-metrics"><MetricCard icon={HeartPulse} label="Attendance" value="95.2%" trend="+1.8% this term" tone="green"/><MetricCard icon={TrendingUp} label="Average result" value="86.4%" trend="+4.2% this term" tone="blue"/><MetricCard icon={CircleDollarSign} label="Fee balance" value="₦185,000" trend="Due 30 Sep" tone="orange"/><MetricCard icon={Clock3} label="Next class" value="10:30 AM" trend="Mathematics · Room 4" tone="violet"/></div>
        <div className="portal-grid"><div className="portal-chart card-surface"><div className="card-head"><div><h3>Academic performance</h3><p>Average assessment score by term</p></div><span className="tiny-badge">2026/27</span></div><div className="chart-wrap tall"><ResponsiveContainer width="100%" height="100%"><LineChart data={[{t:"T1",v:78},{t:"T2",v:82},{t:"T3",v:86},{t:"T4",v:86.4}]}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="t" axisLine={false} tickLine={false}/><YAxis domain={[60,100]} axisLine={false} tickLine={false}/><Tooltip/><Line type="monotone" dataKey="v" strokeWidth={3} dot={{r:4}}/></LineChart></ResponsiveContainer></div></div><div className="attendance-card card-surface"><div className="card-head"><div><h3>Attendance trend</h3><p>Monthly attendance</p></div></div><div className="chart-wrap small"><ResponsiveContainer width="100%" height="100%"><BarChart data={attendance}><XAxis dataKey="m" axisLine={false} tickLine={false}/><YAxis domain={[80,100]} hide/><Tooltip/><Bar dataKey="v" radius={[5,5,0,0]} /></BarChart></ResponsiveContainer></div><div className="attendance-big"><strong>95.2%</strong><span>Excellent attendance</span></div></div></div>
        <div className="portal-grid lower"><div className="card-surface"><div className="card-head"><div><h3>Upcoming timetable</h3><p>Today · Friday 19 September</p></div><button className="text-button" onClick={()=>setTab("Timetable")}>Full timetable <ArrowRight size={14}/></button></div>{[["10:30","Mathematics","Room 4","Mr. Cole"],["12:00","Biology","Lab 2","Ms. Ibrahim"],["14:15","Design & Technology","Studio 1","Mr. Adewale"]].map(x=><div className="schedule-row" key={x[0]}><time>{x[0]}</time><div><b>{x[1]}</b><span>{x[2]} · {x[3]}</span></div><ChevronDown size={16}/></div>)}</div><div className="card-surface"><div className="card-head"><div><h3>Announcements</h3><p>Recent school updates</p></div><button className="text-button" onClick={()=>setTab("Announcements")}>See all <ArrowRight size={14}/></button></div>{["Open Day registration is now open","Assessment week begins 28 September","Robotics club applications close Friday"].map((x,i)=><div className="announcement" key={x}><span>{i+1}</span><div><b>{x}</b><small>{i+1} day{i?"s":""} ago</small></div></div>)}</div></div>
      </> : <PortalTab tab={tab}/>}
      </main></div>
  </div>
}
function PortalTab({tab}) {
  const content={Profile:["Amara Adeyemi","Grade 10 · Cedar House","Student ID: EV-10-2841","Form tutor: Mrs. T. Ibrahim"],Attendance:["Attendance overview","95.2% overall attendance","3 late arrivals this term","No unexplained absences"],Results:["Academic results","86.4% average","Mathematics · 91%","Biology · 88%","English · 84%"],Fees:["Fee account","₦185,000 outstanding","Next payment due: 30 Sep 2026","Last payment: ₦320,000"],Timetable:["Weekly timetable","Monday–Friday schedule","10:30 Mathematics · Room 4","12:00 Biology · Lab 2"],Announcements:["School announcements","Open Day registration is now open","Assessment week begins 28 September","Robotics club applications close Friday"]}[tab] || [];
  return <div className="portal-tab-grid">{content.map((x,i)=><div className={`portal-info ${i===0?"primary":""}`} key={x}><span>{i===0?"EDUVERA CONNECT":"DETAIL"}</span><h3>{x}</h3>{i>0 && <p>Fictional sample data · frontend demonstration</p>}</div>)}</div>
}

const products=[
  {id:1,name:"Aster Carryall",category:"Bags",price:68000,tag:"New",desc:"Structured everyday carry with a clean, adaptable silhouette.",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85"},
  {id:2,name:"Form Desk Lamp",category:"Home",price:42000,tag:"Studio pick",desc:"Warm ambient lighting for focused workspaces.",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85"},
  {id:3,name:"Arc Ceramic Set",category:"Home",price:35000,tag:"Popular",desc:"Minimal tableware designed for everyday rituals.",image:"https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85"},
  {id:4,name:"Field Runner",category:"Footwear",price:89000,tag:"Limited",desc:"Lightweight city runner with a responsive everyday sole.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"},
  {id:5,name:"Mono Travel Case",category:"Accessories",price:76000,tag:"New",desc:"Compact organizer for modern travel essentials.",image:"https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&w=900&q=85"},
  {id:6,name:"Signal Notebook",category:"Stationery",price:12500,tag:"Everyday",desc:"Hardcover notebook with premium paper and grid pages.",image:"https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=85"},
  {id:7,name:"Linea Bottle",category:"Accessories",price:18500,tag:"Popular",desc:"Insulated bottle with a refined matte finish.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85"},
  {id:8,name:"Cove Overshirt",category:"Apparel",price:72000,tag:"New",desc:"Relaxed overshirt cut for versatile daily layering.",image:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85"}
];
const naira = n => "₦"+n.toLocaleString("en-NG");

function Shopora() {
  const [query,setQuery]=useState(""); const [cat,setCat]=useState("All"); const [cart,setCart]=useState([]); const [drawer,setDrawer]=useState(false);
  const cats=["All",...new Set(products.map(p=>p.category))];
  const filtered=useMemo(()=>products.filter(p=>(cat==="All"||p.category===cat)&&(p.name+" "+p.desc).toLowerCase().includes(query.toLowerCase())),[query,cat]);
  const count=cart.reduce((a,b)=>a+b.qty,0), total=cart.reduce((a,b)=>a+b.qty*b.price,0);
  const add=p=>setCart(c=>{const found=c.find(x=>x.id===p.id);return found?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}]});
  return <div className="shopora"><header className="shop-head"><Link className="brand" to="/"><span className="brand-mark">A</span><span>{studioName}</span></Link><div className="shop-brand"><span>SHOPORA</span><small>MODERN GOODS</small></div><nav><a href="#shop">Shop</a><a href="#story">Our story</a><a href="#contact">Contact</a></nav><button className="shop-cart" onClick={()=>setDrawer(true)}><ShoppingCart size={18}/><span>Cart</span><b>{count}</b></button></header>
    <section className="shop-hero"><div><span className="eyebrow">SHOPORA · E-COMMERCE CONCEPT</span><h1>Objects for a<br/><em>better everyday.</em></h1><p>A fictional storefront demonstrating search, category discovery, product cards and a working cart experience.</p><a className="btn btn-dark" href="#shop">Explore collection <ArrowRight size={16}/></a></div><div className="shop-orb"><ShoppingBag size={70}/><span>CURATED<br/>GOODS</span></div></section>
    <section className="shop-section" id="shop"><div className="shop-toolbar"><div><span className="eyebrow">THE COLLECTION</span><h2>Designed for everyday use</h2></div><div className="searchbox"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products"/></div></div><div className="cat-row">{cats.map(c=><button className={cat===c?"selected":""} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div><div className="product-grid">{filtered.map(p=><article className="product-card" key={p.id}><div className="product-visual" style={{backgroundImage:`url(${p.image})`,backgroundSize:"cover",backgroundPosition:"center"}}><span>{p.tag}</span></div><div className="product-info"><div><span>{p.category}</span><h3>{p.name}</h3></div><strong>{naira(p.price)}</strong></div><p>{p.desc}</p><button className="add-btn" onClick={()=>add(p)}><Plus size={16}/> Add to cart</button></article>)}</div>{filtered.length===0&&<div className="empty-state"><Search size={28}/><h3>No products found</h3><p>Try another search or category.</p></div>}</section>
    <section className="shop-banner" id="story"><div><span className="eyebrow light">SHOPORA CONCEPT</span><h2>A storefront that feels considered.</h2><p>In production, product, inventory, customer and payment states would be connected to backend services.</p></div><div className="banner-stat"><strong>8</strong><span>fictional products</span></div></section>
    {drawer&&<div className="drawer-backdrop" onMouseDown={()=>setDrawer(false)}><aside className="cart-drawer" onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><h2>Your cart</h2><button onClick={()=>setDrawer(false)}><X size={18}/></button></div>{cart.length?<>{cart.map(p=><div className="cart-item" key={p.id}><div className="cart-thumb"><ShoppingBag size={19}/></div><div><b>{p.name}</b><span>{p.qty} × {naira(p.price)}</span></div><strong>{naira(p.qty*p.price)}</strong></div>)}<div className="cart-total"><span>Subtotal</span><strong>{naira(total)}</strong></div><button className="btn btn-dark full" onClick={()=>setDrawer(false)}>Continue to checkout <ArrowRight size={16}/></button></>:<div className="empty-cart"><ShoppingCart size={34}/><h3>Your cart is empty</h3><p>Add a product to see the cart interaction.</p></div>}</aside></div>}
  </div>
}

function Insights() {
  const [period,setPeriod]=useState("6 months"); const [exported,setExported]=useState(false);
  const revenue=[{m:"Apr",v:320},{m:"May",v:368},{m:"Jun",v:342},{m:"Jul",v:412},{m:"Aug",v:458},{m:"Sep",v:510}];
  const channels=[{n:"Organic search",v:38},{n:"Paid social",v:24},{n:"Direct",v:21},{n:"Referral",v:17}];
  return <div className="insights"><header className="insights-head"><div className="insight-brand"><span className="brand-mark">N</span><div><b>NEXORA</b><small>INSIGHTS</small></div></div><nav><Link to="/">Suite</Link><a href="#overview">Overview</a><a href="#traffic">Traffic</a><a href="#reports">Reports</a></nav><div className="insight-user"><button><Bell size={18}/></button><span className="avatar purple">MK</span></div></header>
    <main className="insight-main"><div className="insight-title"><div><span className="eyebrow">NEXORA INSIGHTS · ANALYTICS CONCEPT</span><h1>Business overview</h1><p>Fictional performance data for a SaaS analytics frontend demonstration.</p></div><div className="insight-actions"><select value={period} onChange={e=>setPeriod(e.target.value)}><option>6 months</option><option>12 months</option><option>30 days</option></select><button className="btn btn-dark btn-sm" onClick={()=>setExported(true)}><FileText size={15}/> {exported?"Report ready":"Export report"}</button></div></div>
    <div className="metrics-grid four insight-metrics"><MetricCard icon={CircleDollarSign} label="Revenue" value="₦2.41M" trend="+18.6% vs previous" tone="blue"/><MetricCard icon={Users} label="Active customers" value="8,426" trend="+9.4% this period" tone="violet"/><MetricCard icon={TrendingUp} label="Conversion rate" value="4.82%" trend="+0.62 pts" tone="green"/><MetricCard icon={ShoppingCart} label="Average order value" value="₦28,640" trend="+6.8%" tone="orange"/></div>
    <div className="insight-grid"><div className="insight-chart card-surface" id="overview"><div className="card-head"><div><h3>Revenue trend</h3><p>Gross revenue · fictional sample data</p></div><span className="chart-value">₦510K <small>September</small></span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenue}><defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopOpacity=".22"/><stop offset="100%" stopOpacity=".02"/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="m" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip formatter={(v)=>["₦"+v+"K","Revenue"]}/><Area type="monotone" dataKey="v" strokeWidth={3} fill="url(#rev)" stroke="currentColor"/></AreaChart></ResponsiveContainer></div></div>
      <div className="channel-card card-surface" id="traffic"><div className="card-head"><div><h3>Traffic channels</h3><p>Share of sessions</p></div></div><div className="donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={channels} dataKey="v" nameKey="n" innerRadius={55} outerRadius={78} paddingAngle={3}>{channels.map((_,i)=><Cell key={i}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div><strong>48.2K</strong><span>Total sessions</span></div></div>{channels.map((c,i)=><div className="channel-row" key={c.n}><span className={`channel-dot c${i}`}></span><span>{c.n}</span><b>{c.v}%</b></div>)}</div></div>
    <div className="insight-grid lower"><div className="insights-list card-surface"><div className="card-head"><div><h3>Key insights</h3><p>Signals surfaced from fictional business data</p></div></div>{[["Revenue momentum","September revenue is 18.6% above the previous comparison period.","up"],["Customer growth","Active customers increased steadily across the reporting window.","up"],["Conversion opportunity","Paid social has strong traffic volume with room for conversion improvement.","focus"]].map(x=><div className="insight-row" key={x[0]}><span className={`insight-badge ${x[2]}`}>{x[2]==="up"?<TrendingUp size={16}/>:<Activity size={16}/>}</span><div><b>{x[0]}</b><p>{x[1]}</p></div><ArrowRight size={16}/></div>)}</div><div className="quick-stats card-surface" id="reports"><div className="card-head"><div><h3>Report snapshot</h3><p>Current workspace totals</p></div></div>{[["Orders","8,920"],["Returning customers","61.4%"],["Refund rate","1.2%"],["Net revenue","₦2.18M"]].map(x=><div className="quick-row" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}<button className="btn btn-secondary full" onClick={()=>setExported(true)}><FileText size={15}/> {exported?"Export prepared":"Generate report"}</button></div></div>
    </main></div>
}

function App() {
  const [cartCount,setCartCount]=useState(0);
  // Cart count is primarily local to Shopora; Shell remains consistent across demos.
  return <Shell cartCount={cartCount}><Routes><Route path="/" element={<SuiteHome/>}/><Route path="/eduvera" element={<Eduvera/>}/><Route path="/admin" element={<Admin/>}/><Route path="/connect" element={<Connect/>}/><Route path="/shopora" element={<Shopora/>}/><Route path="/insights" element={<Insights/>}/></Routes></Shell>;
}

createRoot(document.getElementById("root")).render(<BrowserRouter basename={import.meta.env.BASE_URL}><App/></BrowserRouter>);