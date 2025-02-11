import React, { ReactNode } from 'react';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MemegentDetail from '@/components/memegent-detail';

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ children, className = "" }) => (
  <div className={`relative inline-block ${className}`}>
    <span className="relative z-10">{children}</span>
    <span className="absolute top-0 left-0.5 text-red-500 opacity-50 animate-pulse z-0">{children}</span>
    <span className="absolute top-0 -left-0.5 text-blue-500 opacity-50 animate-pulse z-0">{children}</span>
  </div>
);

interface CyberLinkProps {
  href: string;
  children: ReactNode;
}

const CyberLink: React.FC<CyberLinkProps> = ({ href, children }) => (
  <Link 
    href={href}
    className="relative group inline-flex items-center text-sm text-green-400/70 hover:text-green-400 transition-colors"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
    <div className="relative">
      {children}
    </div>
  </Link>
);

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono relative">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-10 -left-40 w-80 h-80 bg-green-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-cyan-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000" />

      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <CyberLink href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </CyberLink>
          
          {/* Header */}
          <div>
            <GlitchText className="text-4xl font-bold">
              Explore Memegents
            </GlitchText>
            <MemegentDetail />
          </div>
        </div>
      </main>
    </div>
  );
}
