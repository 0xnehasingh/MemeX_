"use client";
import { motion } from "framer-motion";
import { Menu, Home, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar({ 
  homeSectionRef,
}: { 
  homeSectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const router = useRouter();
  const [notifications] = useState(3);

  const scrollToHome = () => {
    homeSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-green-500/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={scrollToHome}
          >
            <div className="text-green-400 font-mono font-bold text-xl relative">
              <span className="relative z-10">DefiAI_</span>
              <span className="absolute top-0 left-0.5 text-red-500/50 animate-pulse z-0">
                DefiAI_
              </span>
              <span className="absolute top-0 -left-0.5 text-blue-500/50 animate-pulse z-0">
                DefiAI_
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { icon: Home, label: "HOME", onClick: scrollToHome },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex items-center gap-2 px-3 py-2 text-green-400/70 hover:text-green-400 transition-colors font-mono"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2">
              <Bell className="w-5 h-5 text-green-400/70 hover:text-green-400 transition-colors" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 text-black text-xs flex items-center justify-center rounded-full font-mono">
                  {notifications}
                </span>
              )}
            </button>

            {/* Start Chat Button */}
            <button
              onClick={() => router.push('/chat')}
              className="bg-white/10 text-green-400 hover:bg-white/20 px-4 py-2 rounded-full text-sm border border-green-500/30 transition-all duration-300 font-mono"
            >
              Chat & Memegents
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <Menu className="w-5 h-5 text-green-400/70 hover:text-green-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}