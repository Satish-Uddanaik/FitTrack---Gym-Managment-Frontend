import React from 'react';
import { ArrowRight, ShieldCheck, Users, Trophy, Activity, Zap, CheckCircle2 } from 'lucide-react';
import Navbar from './Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Navigation Integration */}
      <Navbar isAuthenticated={false} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-sm text-amber-400">
                <Zap className="h-4 w-4 fill-amber-400" />
                <span>Next-Gen Gym & Fitness Management</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
                TRANSFORM YOUR <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">BODY & GYM</span>
              </h1>
              
              <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0">
                Manage your memberships, track workouts seamlessly, and empower your fitness business with FitTrack's powerhouse gym management platform.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="/register" 
                  className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-xl font-extrabold text-lg shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                </a>
                <a 
                  href="#features" 
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  <span>Explore Platform</span>
                </a>
              </div>
            </div>

            {/* Hero Graphic / Dashboard Preview Mockup */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-b from-slate-900 to-slate-950 p-2 rounded-2xl border border-slate-800 shadow-2xl shadow-amber-500/10">
                <div className="bg-slate-900 rounded-xl p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="font-bold text-slate-200">System Activity Overview</span>
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                      <p className="text-xs text-slate-400 font-medium">Active Members</p>
                      <p className="text-2xl font-black text-amber-400 mt-1">1,420+</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80">
                      <p className="text-xs text-slate-400 font-medium">Daily Check-ins</p>
                      <p className="text-2xl font-black text-emerald-400 mt-1">318</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm bg-slate-950 p-3 rounded-lg border border-slate-800/50">
                      <span className="text-slate-300">Gold Tier Renewal</span>
                      <span className="text-emerald-400 font-bold">+ Verified</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-slate-950 p-3 rounded-lg border border-slate-800/50">
                      <span className="text-slate-300">New Member Registration</span>
                      <span className="text-amber-400 font-bold">+ Processed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="py-24 bg-slate-900/50 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Built For Modern Fitness Operations</h2>
            <p className="text-slate-400">Everything you need to run your members program efficiently, backed by a robust Spring Boot architecture.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-4 hover:border-amber-500/50 transition-colors">
              <div className="bg-amber-500/10 p-3.5 rounded-xl w-fit text-amber-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Member Management</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Seamlessly add, update, and manage member profiles, status tracking, and database synchronization via dedicated Member REST endpoints.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-4 hover:border-amber-500/50 transition-colors">
              <div className="bg-amber-500/10 p-3.5 rounded-xl w-fit text-amber-400">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Flexible Memberships</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Design custom tiered membership packages, monitor subscription expirations, and automate billing schedules securely.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-4 hover:border-amber-500/50 transition-colors">
              <div className="bg-amber-500/10 p-3.5 rounded-xl w-fit text-amber-400">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Real-time Analytics</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Instant operational insights powered by the dashboard service, giving administrators quick visual metrics on gym performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} FitTrack Gym Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}