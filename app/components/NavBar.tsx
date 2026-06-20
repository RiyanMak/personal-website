'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'home' },
  { href: '/skills', label: 'skills' },
  { href: '/projects', label: 'projects' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center gap-6 px-8 py-4 bg-[#0d0f14]/80 backdrop-blur-sm border-b border-[#1e2030]">
      <span className="text-[#a6e3a1] font-mono text-sm">
        <span className="text-[#6c7086]">~/</span>riyan
        <span className="text-[#6c7086]"> $</span>
      </span>
      <div className="flex items-center gap-1">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded font-mono text-sm transition-colors ${
                active
                  ? 'text-[#0d0f14] bg-[#a6e3a1]'
                  : 'text-[#6c7086] hover:text-[#cdd6f4]'
              }`}
            >
              {active ? `[${link.label}]` : link.label}
            </Link>
          )
        })}
      </div>
      <span className="ml-auto text-[#313244] font-mono text-xs hidden sm:block">
        press <span className="text-[#f9e2af]">ctrl+k</span> to navigate
      </span>
    </nav>
  )
}
