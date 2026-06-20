interface TerminalWindowProps {
  children: React.ReactNode
  className?: string
  title?: string
  borderColor?: string
  glow?: boolean
}

export default function TerminalWindow({
  children,
  className = '',
  title,
  borderColor = '#2a2a38',
  glow = true,
}: TerminalWindowProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{
        border: `1px solid ${borderColor}`,
        boxShadow: glow
          ? '0 0 0 1px rgba(166,227,161,0.04), 0 0 40px rgba(166,227,161,0.06), 0 25px 60px rgba(0,0,0,0.7)'
          : '0 25px 60px rgba(0,0,0,0.7)',
      }}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a22] border-b border-[#2a2a38]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57] block" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e] block" />
        <span className="w-3 h-3 rounded-full bg-[#28c840] block" />
        {title && (
          <span className="ml-auto text-xs text-[#585b70] font-mono tracking-wide">{title}</span>
        )}
      </div>

      {/* Body with scanlines */}
      <div className="relative bg-[#111116]">
        {/* Subtle scanline texture */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
          }}
        />
        <div className="relative z-0 p-6 font-mono text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
