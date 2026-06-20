'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import BinaryBackground from './components/BinaryBackground'
import {
  SiPython, SiCplusplus, SiJavascript, SiTypescript,
  SiReact, SiFigma, SiHtml5, SiCss,
  SiGit, SiGithub, SiDocker, SiFlask, SiJupyter,
} from 'react-icons/si'
import { FaJava, FaAws } from 'react-icons/fa'

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV = ['home', 'about', 'achievements', 'skills', 'projects', 'contact']

const ACHIEVEMENTS = [
  {
    tag: 'ACM UTD · Undergraduate Research',
    period: 'Feb – May 2025',
    stat: '81.25', unit: '%',
    label: 'test accuracy',
    title: 'YOLO — Visually Impaired Navigation AI',
    desc: 'Scene graph generation using transformers + GNNs for real-time video. 92.16% reduction in training loss across 40,000+ samples.',
  },
  {
    tag: 'Artificial Intelligence Society · UTD',
    period: 'Feb – May 2025',
    stat: '75', unit: '%',
    label: 'model accuracy',
    title: 'Neurocam — Neurological Disorder Detection',
    desc: 'ML app detecting Parkinson\'s, Alzheimer\'s & MS via smartphone camera. Built with PyTorch, MediaPipe, OpenCV + Flutter.',
  },
  {
    tag: 'Scale-AI Hackathon',
    period: '2024',
    stat: '#1', unit: '',
    label: 'place',
    title: 'HeadAI — Multi-Model Orchestration',
    desc: 'Routed queries to specialized sub-models and aggregated responses via average embeddings. Won first place out of all competing teams.',
  },
  {
    tag: 'RiverHacks · ACC',
    period: 'Nov 2023 – Jun 2024',
    stat: '$5K', unit: '+',
    label: 'in sponsorships',
    title: '3rd Annual RiverHacks — Committee Chair',
    desc: 'Led 15 officers. $2,500+ in prizes, 100+ applicants, MLH partnership, judges from Visa and Amazon.',
  },
]

const SKILLS = [
  { id: 'python',  name: 'Python',     icon: <SiPython size={28} />,     color: '#3776ab', exp: '3 yrs', about: 'First language I learned — unlocked ML and scripting for me.', applied: 'YOLO object detection pipeline, Flask APIs, data analysis scripts.', projects: ['YOLO', 'HeadAI', 'Eng-Physics'] },
  { id: 'ts',      name: 'TypeScript', icon: <SiTypescript size={28} />, color: '#3178c6', exp: '1 yr',  about: 'Type safety and confidence at scale — no more runtime surprises.', applied: 'Full-stack Next.js apps, BSG microservices frontend.', projects: ['BSG', 'HerHope', 'Personal Website'] },
  { id: 'js',      name: 'JavaScript', icon: <SiJavascript size={28} />, color: '#f7df1e', exp: '2 yrs', about: 'Powers most of my web projects front to back.', applied: 'REST API integrations, interactive UIs, Node.js tooling.', projects: ['CodeEvolve', 'UTD Hackathon'] },
  { id: 'cpp',     name: 'C++',        icon: <SiCplusplus size={28} />,  color: '#00599c', exp: '2 yrs', about: 'Sharpened my understanding of memory management and performance.', applied: 'DSA coursework, competitive programming, systems-level projects.', projects: ['DSA Projects', 'UNIX Assignments'] },
  { id: 'java',    name: 'Java',       icon: <FaJava size={28} />,       color: '#f89820', exp: '2 yrs', about: 'Solid OOP foundation — design patterns clicked for me here.', applied: 'Backend services, university algorithms coursework.', projects: ['DSA Project 1', 'Backend APIs'] },
  { id: 'bash',    name: 'Bash',       icon: <span className="font-bold text-xl" style={{ color: '#4eaa25' }}>$_</span>, color: '#4eaa25', exp: '2 yrs', about: 'Daily driver for automating repetitive dev tasks.', applied: 'Build automation, file processing, environment setup scripts.', projects: ['Dev Automation', 'Server Setup'] },
  { id: 'react',   name: 'React',      icon: <SiReact size={28} />,      color: '#61dafb', exp: '1.5 yrs', about: 'Changed how I think about UI — composable and declarative.', applied: 'Component-driven frontends with hooks, context, and RSC.', projects: ['HerHope', 'Personal Website', 'CodeEvolve'] },
  { id: 'html',    name: 'HTML5',      icon: <SiHtml5 size={28} />,      color: '#e34f26', exp: '3 yrs', about: 'Semantic markup and accessibility fundamentals.', applied: 'Every web project — the foundation of all frontends I\'ve built.', projects: ['All Web Projects'] },
  { id: 'css',     name: 'CSS',        icon: <SiCss size={28} />,        color: '#1572b6', exp: '3 yrs', about: 'Layouts, animations, responsive design — the craft of presentation.', applied: 'Tailwind CSS and vanilla CSS across all my projects.', projects: ['Personal Website', 'HerHope', 'AustinCS'] },
  { id: 'figma',   name: 'Figma',      icon: <SiFigma size={28} />,      color: '#f24e1e', exp: '1 yr',  about: 'Bridges design and dev — I mock before I code.', applied: 'Wireframes and high-fidelity mockups for hackathon projects.', projects: ['Neurocam UI', 'Hackathon Designs'] },
  { id: 'flask',   name: 'Flask',      icon: <SiFlask size={28} />,      color: '#e8e8e8', exp: '1.5 yrs', about: 'My go-to for fast, lightweight Python web APIs.', applied: 'ML model serving endpoints and REST APIs.', projects: ['YOLO API', 'HeadAI', 'Area Calculator'] },
  { id: 'docker',  name: 'Docker',     icon: <SiDocker size={28} />,     color: '#2496ed', exp: '1 yr',  about: '"Works on my machine" stopped being a problem.', applied: 'Containerized microservices across dev and prod environments.', projects: ['BSG', 'YOLO'] },
  { id: 'aws',     name: 'AWS',        icon: <FaAws size={28} />,        color: '#ff9900', exp: '1 yr',  about: 'Cloud infrastructure and scalable deployments.', applied: 'S3, EC2, Lambda for hosting and deploying ML-backed apps.', projects: ['HerHope', 'Neurocam'] },
  { id: 'git',     name: 'Git',        icon: <SiGit size={28} />,        color: '#f05032', exp: '3 yrs', about: 'Fundamental to how I collaborate and version everything.', applied: 'Branch strategies, PRs, and team workflows on every project.', projects: ['All Projects'] },
  { id: 'github',  name: 'GitHub',     icon: <SiGithub size={28} />,     color: '#e8e8e8', exp: '3 yrs', about: 'Where all my work lives — open source and collaborative.', applied: 'Project hosting, CI/CD pipelines, open source contributions.', projects: ['All Projects'] },
  { id: 'jupyter', name: 'Jupyter',    icon: <SiJupyter size={28} />,    color: '#f37626', exp: '2 yrs', about: 'My lab for ML experimentation and data exploration.', applied: 'Exploratory data analysis, model training, research notebooks.', projects: ['YOLO', 'Eng-Physics', 'HeadAI'] },
]

const PROJECTS = [
  { name: 'BSG', sub: 'Binary Search Gang', desc: 'Collaborative coding interview platform with real-time rooms, microservices (central · RTC · worker), and live code execution.', tech: ['TypeScript', 'Go', 'Docker', 'WebSockets'], badge: 'active', badgeColor: '#a6e3a1', href: 'https://github.com/acmutd/bsg' },
  { name: 'HerHope', sub: 'RAG Q&A System', desc: 'Hackathon AI — breast cancer Q&A with Gemini API, FAISS vector search, and multi-source scraping. Deployed on Vercel.', tech: ['Python', 'Gemini API', 'FAISS', 'TypeScript'], badge: 'deployed', badgeColor: '#89b4fa', href: 'https://github.com/deeksha5334/HerHope-RAG-Q-A-System' },
  { name: 'YOLO', sub: 'Visual Navigation', desc: 'Assistive tech for visually impaired — fine-tuned Llama 2 + STTran scene graphs + G-Retriever RAG. Trained on 2×H100 GPUs.', tech: ['PyTorch', 'Llama 2', 'CUDA', 'Python'], badge: 'research', badgeColor: '#cba6f7', href: 'https://github.com/anishalle/YOLO' },
  { name: 'HeadAI', sub: 'Multi-Model Orchestration', desc: 'Hierarchical AI routing queries to specialized sub-models, aggregating via average embeddings for max accuracy.', tech: ['Python', 'LLMs', 'Embeddings'], badge: '🥇 Scale-AI', badgeColor: '#f9e2af', href: 'https://github.com/RiyanMak/HeadAI' },
]

// ─── Skills Section ────────────────────────────────────────────────────────────

function SkillsSection() {
  const [selected, setSelected] = useState(SKILLS[0])

  return (
    <section className="h-full flex items-center justify-center px-12" style={{ scrollSnapAlign: 'start' }}>
      <div className="w-full max-w-4xl flex gap-8">

        {/* Left: icon grid */}
        <div className="w-[38%] shrink-0">
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#C97B6E' }}>03 / skills</p>
          <div className="grid grid-cols-4 gap-2">
            {SKILLS.map(s => (
              <button key={s.id} onClick={() => setSelected(s)} title={s.name}
                className="flex items-center justify-center p-3 rounded-xl border transition-all duration-200"
                style={{
                  color: s.color,
                  background: selected.id === s.id ? '#1a1a1a' : 'transparent',
                  borderColor: selected.id === s.id ? '#ffffff' : 'transparent',
                  transform: selected.id === s.id ? 'scale(1.08)' : 'scale(1)',
                }}>
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <div className="w-px h-72" style={{ background: 'linear-gradient(to bottom, transparent, #222, transparent)' }} />
        </div>

        {/* Right: detail panel */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-5">
            <span style={{ color: selected.color, fontSize: 36 }}>{selected.icon}</span>
            <div>
              <div className="font-mono font-bold text-white text-lg">{selected.name}</div>
              <div className="font-mono text-xs" style={{ color: '#555' }}>{selected.exp} experience</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: '#a6e3a1' }}>about</div>
              <p className="font-mono text-sm leading-relaxed" style={{ color: '#aaa' }}>{selected.about}</p>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: '#a6e3a1' }}>where i applied it</div>
              <p className="font-mono text-sm leading-relaxed" style={{ color: '#aaa' }}>{selected.applied}</p>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: '#a6e3a1' }}>projects</div>
              <div className="flex flex-wrap gap-2">
                {selected.projects.map(p => (
                  <span key={p} className="font-mono text-xs px-3 py-1 rounded-full border"
                    style={{ borderColor: '#a6e3a130', color: '#a6e3a1aa', background: '#111' }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: idx * el.clientHeight, behavior: 'smooth' })
    setCurrent(idx)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); scrollTo(Math.min(current + 1, NAV.length - 1)) }
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { e.preventDefault(); scrollTo(Math.max(current - 1, 0)) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, scrollTo])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => setCurrent(Math.round(el.scrollTop / el.clientHeight))
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="h-screen flex flex-col gap-2 p-3 bg-[#C97B6E]">

      {/* ── Nav ── */}
      <nav className="flex items-center shrink-0 px-1">
        <div>
          <div className="font-mono font-bold text-[#1a0f0d] text-sm tracking-tight">Riyan Maknojia</div>
          <div className="font-mono text-[#7a3f35] text-xs">CS Student</div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#1a1212]/80 backdrop-blur-sm rounded-full px-1 py-1 flex gap-0.5">
            {NAV.map((s, i) => (
              <button key={s} onClick={() => scrollTo(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono capitalize transition-all duration-200 ${
                  current === i ? 'bg-[#C97B6E] text-[#1a0f0d] font-semibold' : 'text-white/60 hover:text-white'
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <a href="https://www.linkedin.com/in/riyan-maknojia/" target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-[#1a0f0d] hover:text-white transition-colors">LinkedIn ↗</a>
          <a href="https://github.com/RiyanMak" target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-[#1a0f0d] hover:text-white transition-colors">GitHub ↗</a>
        </div>
      </nav>

      {/* ── Dark window ── */}
      <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#0e0e0e]">
        <BinaryBackground />

        {/* Side dots */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
          {NAV.map((s, i) => (
            <button key={s} onClick={() => scrollTo(i)} title={s} className="flex items-center justify-center w-4 h-4 group">
              <span
                className={`block rounded-full transition-all duration-300 ${current === i ? 'w-2 h-2' : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50'}`}
                style={current === i ? { background: '#a6e3a1' } : {}}
              />
            </button>
          ))}
        </div>

        <div ref={scrollRef} className="h-full overflow-y-scroll no-scrollbar relative z-10"
          style={{ scrollSnapType: 'y mandatory' }}>

          {/* ── 00 HOME ── */}
          <section className="h-full flex flex-col justify-center px-16 relative" style={{ scrollSnapAlign: 'start' }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: '#a6e3a1' }}>~/riyan $</p>
            <h1 className="font-mono font-bold leading-none text-white mb-8"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}>
              I write code,<br />
              ship fast &<br />
              <span className="italic" style={{ color: '#C97B6E' }}>think in systems.</span>
            </h1>
            <p className="font-mono text-sm leading-relaxed max-w-xs" style={{ color: '#555' }}>
              CS Student at UT Dallas<br />Full-Stack Developer · ML Enthusiast
            </p>
            <button onClick={() => scrollTo(1)} className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-base transition-colors animate-bounce"
              style={{ color: '#a6e3a1', animationDuration: '2s' }}>↓</button>
          </section>

          {/* ── 01 ABOUT ── */}
          <section className="h-full flex items-center justify-center px-12" style={{ scrollSnapAlign: 'start' }}>
            <div className="w-full max-w-4xl">
              <p className="font-mono text-xs tracking-widest uppercase mb-10" style={{ color: '#C97B6E' }}>01 / about</p>
              <div className="grid grid-cols-5 gap-12 items-start">
                <div className="col-span-2">
                  <h2 className="font-mono font-bold text-white leading-none mb-4" style={{ fontSize: '2.8rem' }}>
                    Riyan<br />Maknojia
                  </h2>
                  <p className="font-mono text-sm leading-relaxed" style={{ color: '#666' }}>
                    Building at the intersection of ML, systems, and full-stack engineering. Passionate about shipping things that actually work in prod.
                  </p>
                </div>
                <div className="col-span-1 flex justify-center pt-2">
                  <div className="w-px h-52" style={{ background: 'linear-gradient(to bottom, transparent, #2a2a2a, transparent)' }} />
                </div>
                <div className="col-span-2 space-y-5">
                  {[
                    { label: 'Education',   value: 'BS Computer Science @ UT Dallas' },
                    { label: 'Focus',        value: 'AI/ML · Full-Stack · Systems' },
                    { label: 'Activities',   value: 'AIS · ACM Research · Riverhacks · ACC CS Club VP' },
                    { label: 'Looking for',  value: 'Internships & research roles' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-0.5 rounded-full shrink-0 mt-1" style={{ height: '2.2rem', background: '#C97B6E' }} />
                      <div>
                        <div className="font-mono text-xs uppercase tracking-widest mb-0.5" style={{ color: '#444' }}>{item.label}</div>
                        <div className="font-mono text-sm text-white">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── 02 ACHIEVEMENTS ── */}
          <section className="h-full flex items-center justify-center px-12" style={{ scrollSnapAlign: 'start' }}>
            <div className="w-full max-w-5xl">
              <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: '#C97B6E' }}>02 / achievements</p>
              <div className="grid grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((a, i) => (
                  <div key={i}
                    className="rounded-xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                    style={{ borderColor: '#1e1e1e', background: '#0e0e0e', minHeight: '200px' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#a6e3a155')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e1e')}>

                    {/* Tag + period */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#C97B6E' }}>{a.tag}</span>
                      <span className="font-mono text-xs" style={{ color: '#2a2a2a' }}>{a.period}</span>
                    </div>

                    {/* Big stat */}
                    <div className="flex items-end gap-1 mb-1">
                      <span className="font-mono font-bold leading-none text-white"
                        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
                        {a.stat}
                      </span>
                      {a.unit && (
                        <span className="font-mono font-bold mb-1" style={{ fontSize: '1.5rem', color: '#C97B6E' }}>
                          {a.unit}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-xs mb-4" style={{ color: '#444' }}>{a.label}</div>

                    {/* Divider */}
                    <div className="w-8 mb-4 transition-all duration-300 group-hover:w-16"
                      style={{ height: '1px', background: '#a6e3a1' }} />

                    {/* Title + desc */}
                    <div className="font-mono font-bold text-white text-sm mb-2">{a.title}</div>
                    <p className="font-mono text-xs leading-relaxed" style={{ color: '#555' }}>{a.desc}</p>

                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 03 SKILLS ── */}
          <SkillsSection />

          {/* ── 04 PROJECTS ── */}
          <section className="h-full flex items-center justify-center px-12" style={{ scrollSnapAlign: 'start' }}>
            <div className="w-full max-w-3xl">
              <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: '#C97B6E' }}>04 / projects</p>
              <div className="grid grid-cols-2 gap-4">
                {PROJECTS.map(p => (
                  <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
                    className="group block p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: '#111', borderColor: '#1e1e1e' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#C97B6E55')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e1e')}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="font-mono font-bold text-white text-base">{p.name}</span>
                        <span className="font-mono text-xs ml-2" style={{ color: '#444' }}>{p.sub}</span>
                      </div>
                      <span className="font-mono text-xs px-2 py-0.5 rounded shrink-0"
                        style={{ color: p.badgeColor, border: `1px solid ${p.badgeColor}40`, background: `${p.badgeColor}10` }}>
                        {p.badge}
                      </span>
                    </div>
                    <p className="font-mono text-xs leading-relaxed mb-4" style={{ color: '#555' }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map(t => (
                        <span key={t} className="font-mono text-xs px-2 py-0.5 rounded"
                          style={{ background: '#1a1a1a', color: '#666' }}>{t}</span>
                      ))}
                    </div>
                    <div className="mt-3 font-mono text-xs group-hover:text-[#a6e3a1] transition-colors" style={{ color: '#333' }}>
                      view repo ↗
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── 04 CONTACT ── */}
          <section className="h-full flex items-center justify-center px-12" style={{ scrollSnapAlign: 'start' }}>
            <div className="w-full max-w-lg text-center">
              <p className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: '#C97B6E' }}>05 / contact</p>
              <h2 className="font-mono font-bold text-white mb-3" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
                Get in touch.
              </h2>
              <p className="font-mono text-sm mb-10" style={{ color: '#444' }}>
                Open to internships and research opportunities.
              </p>
              <div className="flex flex-col items-center gap-3">
                {[
                  { label: 'riyanmak123@gmail.com',          href: 'mailto:riyanmak123@gmail.com' },
                  { label: 'linkedin.com/in/riyan-maknojia', href: 'https://www.linkedin.com/in/riyan-maknojia/' },
                  { label: 'github.com/RiyanMak',            href: 'https://github.com/RiyanMak' },
                ].map(c => (
                  <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-sm px-6 py-3 rounded-xl border w-full transition-all duration-200"
                    style={{ borderColor: '#1e1e1e', color: '#666', background: '#111' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#a6e3a1'; e.currentTarget.style.color = '#a6e3a1' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = '#666' }}>
                    {c.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
