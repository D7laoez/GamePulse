'use client';

import { motion } from 'framer-motion';
import { Play, Star, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const stats = [
    { label: 'Active Users', value: '2.5M+', icon: Users },
    { label: 'Games Reviewed', value: '15K+', icon: Star },
    { label: 'Hours Updated', value: '24/7', icon: Clock },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            GamePulse
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Your ultimate destination for the latest games, reviews, news, and deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600">
              <Play className="mr-2 h-5 w-5" /> Explore Games
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20">
              Read Reviews
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
