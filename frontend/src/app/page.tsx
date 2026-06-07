'use client';

import { analyticsAPI } from '@/lib/api';
import { learnerPillars, spotlightTools } from '@/lib/site-data';
import { ArrowRight, CheckCircle2, Sparkles, BookOpen, Terminal, Shield, ChevronRight, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ErrorBoundary, HomePageSkeleton } from '@/components/ui';

type LandingStats = {
  courses: number;
  students: number;
  credentials: number;
};

const defaultStats: LandingStats = {
  courses: 12,
  students: 1250,
  credentials: 450,
};

export default function HomePage() {
  const [stats, setStats] = useState<LandingStats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const data = (await analyticsAPI.getGlobalStats()) as any;
        const summary = data?.summary || [];
        const studentStat = summary.find((item: any) => item.metricType === 'USER_STAT');
        const enrollmentStat = summary.find((item: any) => item.metricType === 'ENROLLMENT_STAT');
        const courseStat = summary.find((item: any) => item.metricType === 'COURSE_STAT');

        if (!mounted) return;
        setStats({
          courses: courseStat?._count?._all || defaultStats.courses,
          students: studentStat?._count?._all || defaultStats.students,
          credentials: enrollmentStat?._count?._all || defaultStats.credentials,
        });
      } catch {
        if (mounted) setStats(defaultStats);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-black overflow-hidden font-mono selection:bg-red-500/30" aria-busy={loading}>
        {/* Abstract Background Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.15),transparent_70%)] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(240,100,45,0.12),transparent_70%)] blur-[120px] pointer-events-none" />
        <div className="absolute top-[30%] left-[50%] translate-x-[-50%] w-[100%] h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-black tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open-Source Blockchain Education</span>
            </div>
            
            <h1 className="max-w-5xl text-5xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl leading-[1.05] mb-8">
              MASTER <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">WEB3</span> &<br />
              SMART CONTRACTS
            </h1>
            
            <p className="max-w-2xl text-lg sm:text-xl text-gray-400 font-light leading-relaxed mb-12">
              The ultimate launchpad for university students. Move from Web3 curiosity to shipped hackathon projects with guided modules, Soroban IDE integration, and verifiable on-chain credentials.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/courses"
                className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-8 py-5 text-xs font-black text-white uppercase tracking-widest overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.5)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
                <span className="relative z-10 flex items-center gap-2">
                  Start Building <Rocket className="w-4 h-4" />
                </span>
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-5 text-xs font-black text-white uppercase tracking-widest transition-all hover:bg-white/10 hover:border-white/40 backdrop-blur-md"
              >
                Verify Credentials <CheckCircle2 className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Dynamic Stats Bar */}
          <section className="py-10 border-y border-white/10 relative overflow-hidden bg-white/[0.02]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
              <div className="px-4 hover:scale-110 transition-transform">
                <p className="text-4xl font-black text-white drop-shadow-md">{stats.students}+</p>
                <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.2em] mt-2">Active Learners</p>
              </div>
              <div className="px-4 hover:scale-110 transition-transform">
                <p className="text-4xl font-black text-white drop-shadow-md">{stats.courses}</p>
                <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.2em] mt-2">Core Modules</p>
              </div>
              <div className="px-4 hover:scale-110 transition-transform">
                <p className="text-4xl font-black text-white drop-shadow-md">{stats.credentials}+</p>
                <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.2em] mt-2">On-Chain Certs</p>
              </div>
              <div className="px-4 flex flex-col items-center justify-center">
                <div className="flex -space-x-3 mb-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border border-black bg-zinc-800 flex items-center justify-center shadow-lg`}>
                      <span className="text-[10px] text-gray-500 font-bold">{i}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">Global Network</p>
              </div>
            </div>
          </section>

          {/* How it Works / Learning Path */}
          <section className="py-32 relative">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase mb-4">
                The Path to <span className="text-red-500">Mastery</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed tracking-wide">A structured, hands-on journey designed to take you from blockchain fundamentals to deploying production-ready smart contracts.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-red-600/0 via-red-600/30 to-red-600/0" />
              
              {[
                { step: '01', title: 'Learn the Theory', desc: 'Dive into blockchain architecture, cryptography, and consensus mechanisms through interactive and visual modules.', icon: BookOpen },
                { step: '02', title: 'Write Contracts', desc: 'Use our in-browser Soroban Playground to write, compile, and deploy robust Rust-based smart contracts.', icon: Terminal },
                { step: '03', title: 'Earn & Verify', desc: 'Receive verifiable NFT certificates on the Stellar network to cryptographically prove your expertise to employers.', icon: Shield }
              ].map((item, idx) => (
                <div key={item.step} className="relative bg-zinc-950/60 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-md group hover:border-red-500/50 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-black border border-red-500/50 rounded-xl flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[120px] absolute right-4 top-4 font-black text-white/[0.02] pointer-events-none select-none leading-none">{item.step}</div>
                  <h3 className="text-lg font-black text-white mt-8 mb-4 uppercase tracking-[0.15em]">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-loose">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Deep Dive / Spotlight Tools */}
          <section className="py-24 border-t border-white/5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-16">
              <div>
                <span className="text-red-500 text-[10px] font-black tracking-[0.2em] uppercase mb-3 block">Platform Arsenal</span>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase">
                  Developer <span className="text-zinc-600">Toolkit</span>
                </h2>
              </div>
              <p className="max-w-md text-sm text-gray-400 leading-relaxed border-l-2 border-red-500/50 pl-5">
                Everything you need to accelerate your Web3 learning. From browser-based IDEs to algorithmic idea generation and on-chain verification.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {spotlightTools.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group relative overflow-hidden bg-zinc-900/30 border border-white/5 p-8 rounded-[2rem] transition-all hover:bg-zinc-900/60 hover:border-red-500/40"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                      <Icon className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(220,38,38,0.1)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-black text-white mb-3 uppercase tracking-widest">{tool.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed mb-8 font-light">{tool.summary}</p>
                      
                      <div className="inline-flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">
                        Launch Module <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Pillars Section with Faux IDE */}
          <section className="py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/5 to-transparent rounded-[4rem] -z-10" />
            <div className="grid lg:grid-cols-2 gap-16 items-center p-4 lg:p-16">
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase mb-8 leading-[1.1]">
                  Built for the <br /><span className="text-red-500">Next Generation</span>
                </h2>
                <p className="text-gray-400 mb-10 leading-relaxed font-light text-sm sm:text-base">
                  We bridge the critical gap between academic theory and practical software engineering. Our curriculum is specifically tailored to mimic real-world open-source Web3 contributions.
                </p>
                <div className="space-y-8">
                  {learnerPillars.map((pillar) => (
                    <div key={pillar.title} className="flex gap-5 group">
                      <div className="mt-1">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-red-500" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-black tracking-[0.1em] uppercase text-sm mb-2">{pillar.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">{pillar.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Premium Faux IDE Graphic */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-[2.5rem] blur opacity-20 animate-pulse" />
                <div className="aspect-[4/3] rounded-[2.5rem] bg-[#0c0c0c] border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  <div className="relative z-10 w-[85%] h-[80%] border border-white/10 rounded-2xl bg-black/80 backdrop-blur-xl flex flex-col shadow-2xl overflow-hidden">
                    {/* IDE Header */}
                    <div className="bg-zinc-900/80 px-4 py-3 flex items-center border-b border-white/5">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="mx-auto text-[10px] text-gray-500 font-black tracking-widest uppercase">soroban-contract.rs</div>
                    </div>
                    {/* IDE Body */}
                    <div className="flex-1 p-6 font-mono text-xs sm:text-sm overflow-hidden">
                      <div className="text-gray-600 mb-2">{"// Initialize Smart Contract Environment"}</div>
                      <div className="text-purple-400 mb-1"><span className="text-red-400">#![no_std]</span></div>
                      <div className="text-purple-400 mb-4">use <span className="text-green-400">soroban_sdk</span>::<span className="text-white">{'{'}</span>contractimpl, Env, Symbol<span className="text-white">{'}'}</span>;</div>
                      
                      <div className="text-purple-400 mb-1"><span className="text-red-400">#[contract]</span></div>
                      <div className="text-blue-400 mb-2">pub struct <span className="text-yellow-200">Web3StudentLab</span>;</div>
                      
                      <div className="text-purple-400 mb-1"><span className="text-red-400">#[contractimpl]</span></div>
                      <div className="text-blue-400 mb-1">impl <span className="text-yellow-200">Web3StudentLab</span> <span className="text-white">{'{'}</span></div>
                      <div className="text-purple-400 pl-4 mb-1">pub fn <span className="text-blue-300">verify_student</span><span className="text-white">(env: Env, id: Symbol) {'{'}</span></div>
                      <div className="text-gray-600 pl-8 mb-1">{"// Mint on-chain certificate"}</div>
                      <div className="text-white pl-8">env.events().publish((id, <span className="text-green-400">"Verified"</span>), ());</div>
                      <div className="text-white pl-4">{'}'}</div>
                      <div className="text-white">{'}'}</div>
                      
                      <div className="mt-8 pt-4 border-t border-white/5 flex items-center text-[10px] font-black uppercase tracking-widest text-green-500">
                        <ChevronRight className="w-4 h-4 mr-1" /> Build Success (0.12s) - Ready to Deploy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Footer */}
          <section className="py-32 text-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1),transparent_50%)] pointer-events-none" />
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-white uppercase mb-6 drop-shadow-lg">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600">Build?</span>
            </h2>
            <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg font-light">
              Join thousands of students learning Web3 development the right way. Start your first interactive module today.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-12 py-6 text-sm font-black text-black uppercase tracking-[0.2em] transition-all hover:scale-105 hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
            >
              Access Modules <ArrowRight className="w-5 h-5" />
            </Link>
          </section>

        </div>
      </div>
    </ErrorBoundary>
  );
}
