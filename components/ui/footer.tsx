"use client";
import React from 'react';
import { Twitter, Github, MessageSquare, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black/90 border-t border-green-500/30 mt-auto">
      <div className="container mx-auto px-8 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Partners Section */}
          <div>
            <h3 className="text-green-400 font-mono text-lg mb-6">PARTNERS</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Solana
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Crynux
                </a>
              </li>
            </ul>
          </div>

          {/* Center Logo and Links */}
          <div className="text-center">
            <div className="mb-8">
              <div className="text-4xl font-bold relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text">
                  MEMEX_
                </span>
                <span className="absolute top-0 left-0.5 text-red-500/20">MEMEX_</span>
                <span className="absolute top-0 -left-0.5 text-blue-500/20">MEMEX_</span>
              </div>
            </div>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://github.com/0xnehasingh" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-green-400 transition-colors inline-flex items-center gap-2"
                >
                  GitHub
                  <Github className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/0xnehasingh" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-green-400 transition-colors inline-flex items-center gap-2"
                >
                  X/Twitter
                  <Twitter className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div className="text-right">
            <h3 className="text-green-400 font-mono text-lg mb-6">COMMUNITY</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors inline-flex items-center justify-end gap-2">
                  Telegram
                  <MessageSquare className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-green-500/30 flex justify-between items-center">
          <div className="text-gray-400 font-mono text-sm">
            COPYRIGHT ©2024 MEMEX ALL RIGHTS RESERVED.
          </div>
          <button 
            onClick={scrollToTop}
            className="bg-green-500/20  rounded hover:bg-green-500/30 transition-colors"
          >
            <ArrowUp className="w-6 h-6 text-green-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};


export default Footer ;
