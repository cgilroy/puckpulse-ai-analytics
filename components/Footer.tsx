import React from 'react';
import githubLogo from '../assets/github-logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 border-t border-slate-900 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-4xl mx-auto flex justify-center">
        <a href="https://cgilroy.github.io/">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 rounded-full border border-slate-800 text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]">
            <img src={githubLogo} alt="CGilroy" className="w-4 h-4" />
            <span>cgilroy.github.io</span>
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
