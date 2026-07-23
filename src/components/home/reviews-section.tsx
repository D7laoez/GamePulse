'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';

interface Review {
  id: string;
  slug: string;
  title: string;
  content: string;
  overallScore: number;
  isEditorial: boolean;
  publishedAt: Date;
  reviewer: { name: string };
  game: { title: string; slug: string; bannerImage?: string };
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const mockReviews: Review[] = [
        {
          id: '1',
          slug: 'cyberpunk-2077-review',
          title: 'Cyberpunk 2077: Phantom Liberty Review',
          content: 'Phantom Liberty transforms Cyberpunk 2077 into the game it always wanted to be...',
          overallScore: 9.2,
          isEditorial: true,
          publishedAt: new Date('2024-01-15T10:30:00Z'),
          reviewer: { name: 'Alex Thompson' },
          game: { title: 'Cyberpunk 2077: Phantom Liberty', slug: 'cyberpunk-2077-phantom-liberty', bannerImage: '/images/cyberpunk-banner.jpg' },
        },
        {
          id: '2',
          slug: 'baldurs-gate-3-review',
          title: "Baldur's Gate 3: A Masterpiece",
          content: 'Larian Studios has created one of the greatest RPGs of all time...',
          overallScore: 9.8,
          isEditorial: true,
          publishedAt: new Date('2024-01-14T15:45:00Z'),
          reviewer: { name: 'Sarah Miller' },
          game: { title: "Baldur's Gate 3", slug: 'baldurs-gate-3', bannerImage: '/images/bg3-banner.jpg' },
        },
        {
          id: '3',
          slug: 'starfield-review',
          title: 'Starfield: Ambitious but Flawed',
          content: "Bethesda's space RPG delivers on ambition but struggles with execution...",
          overallScore: 7.8,
          isEditorial: false,
          publishedAt: new Date('2024-01-13T09:20:00Z'),
          reviewer: { name: 'Michael Chen' },
          game: { title: 'Starfield', slug: 'starfield', bannerImage: '/images/starfield-banner.jpg' },
        },
        {
          id: '4',
          slug: 'resident-evil-4-remake-review',
          title: 'Resident Evil 4 Remake: Perfect Update',
          content: 'Capcom has delivered a masterful remake that honors the original...',
          overallScore: 9.5,
          isEditorial: true,
          publishedAt: new Date('2024-01-12T14:10:00Z'),
          reviewer: { name: 'Jessica Rodriguez' },
          game: { title: 'Resident Evil 4 Remake', slug: 'resident-evil-4-remake', bannerImage: '/images/re4-banner.jpg' },
        },
        {
          id: '5',
          slug: 'zelda-tears-of-the-kingdom-review',
          title: 'Tears of the Kingdom: A Worthy Sequel',
          content: 'Nintendo has once again raised the bar for open-world adventure games...',
          overallScore: 9.7,
          isEditorial: true,
          publishedAt: new Date('2024-01-11T11:30:00Z'),
          reviewer: { name: 'David Kim' },
          game: { title: 'The Legend of Zelda: Tears of the Kingdom', slug: 'zelda-tears-of-the-kingdom', bannerImage: '/images/zelda-banner.jpg' },
        },
        {
          id: '6',
          slug: 'hogwarts-legacy-review',
          title: 'Hogwarts Legacy: Magical Experience',
          content: 'Despite controversy, Hogwarts Legacy delivers a magical experience...',
          overallScore: 8.5,
          isEditorial: false,
          publishedAt: new Date('2024-01-10T16:45:00Z'),
          reviewer: { name: 'Emma Wilson' },
          game: { title: 'Hogwarts Legacy', slug: 'hogwarts-legacy', bannerImage: '/images/hogwarts-banner.jpg' },
        },
      ];
      setReviews(mockReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-56 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Expert Reviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/reviews/${review.slug}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    {review.game.bannerImage ? (
                      <Image src={review.game.bannerImage} alt={review.game.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <span className="text-gray-400 text-lg font-medium">Game Image</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-lg">{review.overallScore.toFixed(1)}</span>
                      </div>
                      {review.isEditorial && <Badge variant="outline" className="text-xs">Editorial</Badge>}
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{review.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-3 flex-grow">{review.content.substring(0, 150)}...</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                        <User className="h-4 w-4" />
                        <span>{review.reviewer.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(review.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
