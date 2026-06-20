import TerminalWindow from '../components/TerminalWindow'

const projects = [
  {
    name: 'BSG',
    fullName: 'Binary Search Gang',
    description:
      'Collaborative coding interview platform recreating binarysearch.io. Users create rooms to practice problems together in real time.',
    tech: ['TypeScript', 'Go', 'Docker', 'WebSockets'],
    status: 'active',
    github: 'https://github.com/acmutd/bsg',
    permissions: 'drwxrwxr-x',
    highlight: 'Microservices: central, RTC, and worker services',
  },
  {
    name: 'HerHope',
    fullName: 'HerHope RAG Q&A System',
    description:
      'Hackathon AI project — RAG system for answering breast cancer questions using Gemini, FAISS vector search, and multi-source data.',
    tech: ['Python', 'TypeScript', 'Gemini API', 'FAISS', 'BeautifulSoup'],
    status: 'deployed',
    github: 'https://github.com/deeksha5334/HerHope-RAG-Q-A-System',
    permissions: 'drwxr-xr-x',
    highlight: 'Deployed on Vercel · Semantic search with source attribution',
  },
  {
    name: 'YOLO',
    fullName: 'Visual Navigation for the Visually Impaired',
    description:
      'Assistive tech system using fine-tuned Llama 2 + scene graph reasoning (STTran) to help visually impaired individuals navigate environments.',
    tech: ['Python', 'PyTorch', 'Llama 2', 'CUDA', 'Hugging Face'],
    status: 'research',
    github: 'https://github.com/anishalle/YOLO',
    permissions: 'drwxr-xr-x',
    highlight: 'Trained on 2×H100 GPUs · G-Retriever RAG architecture',
  },
  {
    name: 'HeadAI',
    fullName: 'HeadAI — Multi-Model Orchestration',
    description:
      'Hierarchical AI system that routes queries to specialized sub-models and aggregates responses via average embeddings. Won 1st place at Scale-AI Hackathon.',
    tech: ['Python', 'LLMs', 'Embeddings'],
    status: 'hackathon',
    github: 'https://github.com/RiyanMak/HeadAI',
    permissions: 'drwxrwxr-x',
    highlight: '🥇 1st Place — Scale-AI Hackathon',
  },
]

const statusStyle: Record<string, { label: string; color: string }> = {
  active:    { label: 'active',    color: '#a6e3a1' },
  deployed:  { label: 'deployed',  color: '#89b4fa' },
  research:  { label: 'research',  color: '#cba6f7' },
  hackathon: { label: 'hackathon', color: '#f9e2af' },
}

export default function Projects() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        <TerminalWindow title="~/projects">
          {/* ls header */}
          <div className="mb-5">
            <span className="t-prompt">riyan$: </span>
            <span className="t-cmd">ls</span>
            <span className="t-flag"> -la </span>
            <span className="t-cmd">projects/</span>
          </div>

          <div className="space-y-5">
            {projects.map((project) => {
              const s = statusStyle[project.status]
              return (
                <div
                  key={project.name}
                  className="border border-[#1e2030] rounded-lg p-4 hover:border-[#313244] transition-colors"
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="t-muted text-xs">{project.permissions}&nbsp;&nbsp;</span>
                      <span className="font-semibold" style={{ color: '#89dceb' }}>
                        {project.name}/
                      </span>
                      <span className="t-muted text-xs ml-2">{project.fullName}</span>
                    </div>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded shrink-0"
                      style={{ color: s.color, border: `1px solid ${s.color}` }}
                    >
                      {s.label}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="pl-4 mb-2">
                    <span className="t-key">description: </span>
                    <span className="t-str">&quot;{project.description}&quot;</span>
                  </div>

                  {/* Highlight */}
                  <div className="pl-4 mb-2">
                    <span className="t-key">note: </span>
                    <span className="t-highlight">{project.highlight}</span>
                  </div>

                  {/* Tech */}
                  <div className="pl-4 mb-2">
                    <span className="t-key">tech: </span>
                    <span className="t-output">[</span>
                    {project.tech.map((t, i) => (
                      <span key={t}>
                        <span className="t-val">{t}</span>
                        {i < project.tech.length - 1 && (
                          <span className="t-muted">, </span>
                        )}
                      </span>
                    ))}
                    <span className="t-output">]</span>
                  </div>

                  {/* GitHub */}
                  <div className="pl-4">
                    <span className="t-key">github: </span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t-link"
                    >
                      {project.github.replace('https://github.com/', 'github.com/')}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cursor */}
          <div className="mt-6">
            <span className="t-prompt">riyan$: </span>
            <span className="inline-block w-2 h-4 bg-[#a6e3a1] animate-pulse align-middle" />
          </div>
        </TerminalWindow>
      </div>
    </div>
  )
}
