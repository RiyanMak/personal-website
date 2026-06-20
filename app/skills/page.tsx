'use client'
import { useState } from 'react'
import TerminalWindow from '../components/TerminalWindow'
import {
  SiPython, SiCplusplus, SiJavascript, SiTypescript,
  SiReact, SiFigma, SiHtml5, SiCss,
  SiGit, SiGithub, SiDocker, SiFlask,
  SiJupyter,
} from 'react-icons/si'
import { FaJava, FaAws } from 'react-icons/fa'

interface Skill {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  experience: string
  story: { about: string; applied: string }
  recent_projects: string[]
}

const skills: Skill[] = [
  {
    id: 'python',
    name: 'Python',
    icon: <SiPython size={32} />,
    color: '#3776ab',
    experience: '3 years',
    story: {
      about: 'Python was the first language I learned in my programming journey. It opened the door to everything and made coding feel approachable.',
      applied: 'I applied Python in various ML projects like YOLO object detection, and data analysis.',
    },
    recent_projects: ['Neurocam', 'YOLO Object Detection'],
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: <SiCplusplus size={32} />,
    color: '#00599c',
    experience: '2 years',
    story: {
      about: 'C++ sharpened my understanding of memory management and performance-critical systems.',
      applied: 'Used in competitive programming, data structures coursework, and system-level projects.',
    },
    recent_projects: ['DSA coursework', 'Competitive Programming'],
  },
  {
    id: 'java',
    name: 'Java',
    icon: <FaJava size={32} />,
    color: '#f89820',
    experience: '2 years',
    story: {
      about: 'Java gave me a strong foundation in OOP principles and enterprise-level design patterns.',
      applied: 'Used in backend services and university coursework covering algorithms and data structures.',
    },
    recent_projects: ['Backend API', 'OOP Projects'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: <SiJavascript size={32} />,
    color: '#f7df1e',
    experience: '2 years',
    story: {
      about: 'JavaScript unlocked full-stack development for me and powers most of my web projects.',
      applied: 'Built interactive frontends and REST API integrations across several projects.',
    },
    recent_projects: ['CodeEvolve', 'Personal Website'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: <SiTypescript size={32} />,
    color: '#3178c6',
    experience: '1 year',
    story: {
      about: 'TypeScript brought type safety and confidence to my JavaScript projects at scale.',
      applied: 'Used it in Next.js projects including this portfolio.',
    },
    recent_projects: ['Personal Website', 'CodeEvolve'],
  },
  {
    id: 'react',
    name: 'React',
    icon: <SiReact size={32} />,
    color: '#61dafb',
    experience: '1.5 years',
    story: {
      about: 'React transformed how I think about UI — composable, reactive, and declarative.',
      applied: 'Built component-driven frontends with hooks, context, and server components.',
    },
    recent_projects: ['CodeEvolve', 'Personal Website'],
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: <SiFigma size={32} />,
    color: '#f24e1e',
    experience: '1 year',
    story: {
      about: 'Figma bridged the gap between design and development for me.',
      applied: 'Designed wireframes and high-fidelity mockups before writing any code.',
    },
    recent_projects: ['Neurocam UI', 'Hackathon Designs'],
  },
  {
    id: 'bash',
    name: 'Bash',
    icon: <span style={{ fontSize: 28, fontWeight: 700, color: '#4eaa25' }}>$_</span>,
    color: '#4eaa25',
    experience: '2 years',
    story: {
      about: 'Bash became my daily driver for automating repetitive dev tasks.',
      applied: 'Wrote scripts for build automation, file processing, and environment setup.',
    },
    recent_projects: ['Dev Automation Scripts'],
  },
  {
    id: 'html5',
    name: 'HTML5',
    icon: <SiHtml5 size={32} />,
    color: '#e34f26',
    experience: '3 years',
    story: {
      about: 'HTML5 is where it all started on the web. Semantic markup is an art.',
      applied: 'Used in every web project for structure and accessibility.',
    },
    recent_projects: ['All Web Projects'],
  },
  {
    id: 'css3',
    name: 'CSS3',
    icon: <SiCss size={32} />,
    color: '#1572b6',
    experience: '3 years',
    story: {
      about: 'CSS3 let me bring designs to life with animations, layouts, and responsive design.',
      applied: 'Used Tailwind CSS and vanilla CSS for styling across all my projects.',
    },
    recent_projects: ['Personal Website', 'CodeEvolve'],
  },
  {
    id: 'git',
    name: 'Git',
    icon: <SiGit size={32} />,
    color: '#f05032',
    experience: '3 years',
    story: {
      about: 'Git is fundamental to how I collaborate and version my code.',
      applied: 'Managed branches, PRs, and team workflows across all projects.',
    },
    recent_projects: ['All Projects'],
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: <SiGithub size={32} />,
    color: '#ffffff',
    experience: '3 years',
    story: {
      about: 'GitHub is my home for open source and collaboration.',
      applied: 'Hosted projects, contributed to open source, and managed CI/CD pipelines.',
    },
    recent_projects: ['All Projects'],
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: <SiDocker size={32} />,
    color: '#2496ed',
    experience: '1 year',
    story: {
      about: 'Docker made "it works on my machine" a problem of the past.',
      applied: 'Containerized services for consistent dev and deployment environments.',
    },
    recent_projects: ['Neurocam', 'Backend Services'],
  },
  {
    id: 'flask',
    name: 'Flask',
    icon: <SiFlask size={32} />,
    color: '#ffffff',
    experience: '1.5 years',
    story: {
      about: 'Flask is my go-to for lightweight, fast Python web APIs.',
      applied: 'Built REST APIs and ML model serving endpoints.',
    },
    recent_projects: ['Neurocam API', 'YOLO API'],
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: <FaAws size={32} />,
    color: '#ff9900',
    experience: '1 year',
    story: {
      about: 'AWS gave me a window into cloud infrastructure and scalable deployments.',
      applied: 'Used S3, EC2, and Lambda for deploying and hosting projects.',
    },
    recent_projects: ['Neurocam Deployment'],
  },
  {
    id: 'jupyter',
    name: 'Jupyter',
    icon: <SiJupyter size={32} />,
    color: '#f37626',
    experience: '2 years',
    story: {
      about: 'Jupyter notebooks are my lab for experimenting with ML models and data.',
      applied: 'Used for exploratory data analysis, model training, and research.',
    },
    recent_projects: ['ML Research', 'Data Analysis'],
  },
]

export default function Skills() {
  const [selected, setSelected] = useState<Skill>(skills[0])

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <h2 className="text-center t-muted font-mono text-sm mb-6 tracking-widest uppercase">
          My Skills
        </h2>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: icon grid */}
          <div className="lg:w-1/2">
            <TerminalWindow title="skills/" borderColor="#3d59a1">
              <div className="grid grid-cols-5 gap-4">
                {skills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => setSelected(skill)}
                    title={skill.name}
                    className={`flex items-center justify-center p-3 rounded-lg transition-all cursor-pointer border ${
                      selected.id === skill.id
                        ? 'border-[#89b4fa] bg-[#1e2030]'
                        : 'border-transparent hover:border-[#313244] hover:bg-[#1e2030]'
                    }`}
                    style={{ color: skill.color }}
                  >
                    {skill.icon}
                  </button>
                ))}
              </div>
            </TerminalWindow>
          </div>

          {/* Right: YAML detail */}
          <div className="lg:w-1/2">
            <TerminalWindow title={`skills/${selected.id}.yml`} borderColor="#3d59a1">
              <div className="space-y-1">
                <div>
                  <span className="t-prompt">riyan$: </span>
                  <span className="t-cmd">cat </span>
                  <span className="t-str">skills/{selected.id}.yml</span>
                </div>
                <div className="t-muted">---</div>
                <div>
                  <span className="t-key">name: </span>
                  <span className="t-output">{selected.name}</span>
                </div>
                <div className="pt-1">
                  <span className="t-key">story:</span>
                </div>
                <div className="pl-4">
                  <div className="mb-2">
                    <span className="t-highlight">about: </span>
                    <span className="t-str">&quot;{selected.story.about}&quot;</span>
                  </div>
                  <div>
                    <span className="t-highlight">applied: </span>
                    <span className="t-str">&quot;{selected.story.applied}&quot;</span>
                  </div>
                </div>
                <div className="pt-1">
                  <span className="t-key">experience: </span>
                  <span className="t-output">{selected.experience}</span>
                </div>
                <div className="pt-1">
                  <span className="t-key">recent_projects:</span>
                </div>
                <div className="pl-4">
                  {selected.recent_projects.map((p) => (
                    <div key={p}>
                      <span className="t-muted">- </span>
                      <span className="t-output">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </div>
  )
}
