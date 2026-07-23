'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  author: { name: string };
  publishedAt: Date;
  category: string;
  isFeatured: boolean;
  isBreaking: boolean;
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'New Game Console Announced by Major Publisher',
          slug: 'new-game-console-announced',
          excerpt: 'Details about the highly anticipated new gaming console have been revealed.',
          featuredImage: '/images/console-news.jpg',
          author: { name: 'John Doe' },
          publishedAt: new Date('2024-01-15T10:30:00Z'),
          category: 'Industry',
          isFeatured: true,
          isBreaking: false,
        },
        {
          id: '2',
          title: 'Major Game Studio Acquired by Tech Giant',
          slug: 'major-game-studio-acquired',
          excerpt: 'The acquisition will bring significant changes to the gaming landscape.',
          featuredImage: '/images/studio-acquisition.jpg',
          author: { name: 'Jane Smith' },
          publishedAt: new Date('2024-01-14T15:45:00Z'),
          category: 'Business',
          isFeatured: false,
          isBreaking: true,
        },
        {
          id: '3',
          title: 'Upcoming Game Breaks Pre-order Records',
          slug: 'upcoming-game-breaks-preorder-records',
          excerpt: 'The highly anticipated game has already broken pre-order records.',
          featuredImage: '/images/preorder-records.jpg',
          author: { name: 'Mike Johnson' },
          publishedAt: new Date('2024-01-13T09:20:00Z'),
          category: 'Gaming',
          isFeatured: true,
          isBreaking: false,
        },
        {
          id: '4',
          title: 'Esports Tournament Announces Prize Pool',
          slug: 'esports-tournament-prize-pool',
          excerpt: 'The largest prize pool in esports history has been announced.',
          featuredImage: '/images/esports-prize.jpg',
          author: { name: 'Sarah Williams' },
          publishedAt: new Date('2024-01-12T14:10:00Z'),
          category: 'Esports',
          isFeatured: false,
          isBreaking: false,
        },
        {
          id: '5',
          title: 'Virtual Reality Gaming Reaches New Heights',
          slug: 'vr-gaming-reaches-new-heights',
          excerpt: 'New VR technology promises to revolutionize the gaming experience.',
          featuredImage: '/images/vr-gaming.jpg',
          author: { name: 'Alex Chen' },
          publishedAt: new Date('2024-01-11T11:30:00Z'),
          category: 'Technology',
          isFeatured: true,
          isBreaking: false,
        },
        {
          id: '6',
          title: 'Indie Game Developer Wins International Award',
          slug: 'indie-dev-wins-international-award',
          excerpt: 'An indie developer receives recognition for innovative gameplay.',
          featuredImage: '/images/indie-award.jpg',
          author: { name: 'Emma Davis' },
          publishedAt: new Date('2024-01-10T16:45:00Z'),
          category: 'Indie',
          isFeatured: false,
          isBreaking: false,
        },
      ];
      setNews(mockNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Latest Gaming News
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/news/${item.slug}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    {item.featuredImage ? (
                      <Image
                        src={item.featuredImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <span className="text-gray-400 text-lg font-medium">News Image</span>
                      </div>
                    )}
                    {item.isBreaking && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="destructive" className="text-xs">BREAKING</Badge>
                      </div>
                    )}
                    {item.isFeatured && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="text-xs">FEATURED</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      <div className="flex items-center space-x-1 text-muted-foreground text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-3 flex-grow">{item.excerpt}</p>
                    <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                      <User className="h-4 w-4" />
                      <span>{item.author.name}</span>
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
