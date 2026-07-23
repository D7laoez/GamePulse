'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GameCard } from '@/components/games/game-card';
import { Skeleton } from '@/components/ui/skeleton';

interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  bannerImage?: string;
  logoImage?: string;
  releaseDate?: Date;
  price?: number;
  discountPercentage?: number;
  overallRating?: number;
  ratingCount: number;
  genres: string[];
  platforms: string[];
}

export function GamesSection() {
  const [activeTab, setActiveTab] = useState('latest');
  const [gamesData, setGamesData] = useState({
    latest: [] as Game[],
    trending: [] as Game[],
    upcoming: [] as Game[],
    popular: [] as Game[],
    editorsChoice: [] as Game[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGamesData();
  }, []);

  async function fetchGamesData() {
    try {
      const mockGames: Game[] = [
        {
          id: '1',
          title: 'Cyberpunk 2077: Phantom Liberty',
          slug: 'cyberpunk-2077-phantom-liberty',
          description: 'The major expansion to Cyberpunk 2077 featuring Idris Elba',
          bannerImage: '/images/cyberpunk-banner.jpg',
          logoImage: '/images/cyberpunk-logo.png',
          releaseDate: new Date('2023-09-26'),
          price: 59.99,
          discountPercentage: 20,
          overallRating: 8.5,
          ratingCount: 1245,
          genres: ['RPG', 'Action', 'Open World'],
          platforms: ['PC', 'PS5', 'Xbox Series X'],
        },
        {
          id: '2',
          title: 'The Legend of Zelda: Tears of the Kingdom',
          slug: 'zelda-tears-of-the-kingdom',
          description: 'The sequel to Breath of the Wild with expanded exploration',
          bannerImage: '/images/zelda-banner.jpg',
          logoImage: '/images/zelda-logo.png',
          releaseDate: new Date('2023-05-12'),
          price: 69.99,
          discountPercentage: 0,
          overallRating: 9.8,
          ratingCount: 2890,
          genres: ['Adventure', 'Action', 'Open World'],
          platforms: ['Nintendo Switch'],
        },
        {
          id: '3',
          title: 'Hogwarts Legacy',
          slug: 'hogwarts-legacy',
          description: 'Experience Hogwarts in the 1800s as a student with dark magic powers',
          bannerImage: '/images/hogwarts-banner.jpg',
          logoImage: '/images/hogwarts-logo.png',
          releaseDate: new Date('2023-02-10'),
          price: 59.99,
          discountPercentage: 15,
          overallRating: 8.2,
          ratingCount: 3567,
          genres: ['RPG', 'Adventure', 'Fantasy'],
          platforms: ['PC', 'PS5', 'Xbox Series X', 'PS4', 'Xbox One', 'Switch'],
        },
        {
          id: '4',
          title: 'Resident Evil 4 Remake',
          slug: 'resident-evil-4-remake',
          description: 'A complete remake of the classic survival horror game',
          bannerImage: '/images/re4-banner.jpg',
          logoImage: '/images/re4-logo.png',
          releaseDate: new Date('2023-03-24'),
          price: 59.99,
          discountPercentage: 0,
          overallRating: 9.0,
          ratingCount: 1876,
          genres: ['Horror', 'Action', 'Survival'],
          platforms: ['PC', 'PS5', 'Xbox Series X'],
        },
        {
          id: '5',
          title: "Baldur's Gate 3",
          slug: 'baldurs-gate-3',
          description: "The critically acclaimed RPG based on D&D 5e rules",
          bannerImage: '/images/bg3-banner.jpg',
          logoImage: '/images/bg3-logo.png',
          releaseDate: new Date('2023-08-03'),
          price: 59.99,
          discountPercentage: 0,
          overallRating: 9.5,
          ratingCount: 4231,
          genres: ['RPG', 'Adventure', 'Turn-Based'],
          platforms: ['PC', 'PS5'],
        },
        {
          id: '6',
          title: 'Starfield',
          slug: 'starfield',
          description: "Bethesda's first new IP in 25 years, an RPG set in space",
          bannerImage: '/images/starfield-banner.jpg',
          logoImage: '/images/starfield-logo.png',
          releaseDate: new Date('2023-09-06'),
          price: 69.99,
          discountPercentage: 10,
          overallRating: 7.8,
          ratingCount: 2156,
          genres: ['RPG', 'Action', 'Open World'],
          platforms: ['PC', 'Xbox Series X'],
        },
      ];

      setGamesData({
        latest: mockGames.slice(0, 6),
        trending: [...mockGames].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 6),
        upcoming: mockGames.filter(g => g.releaseDate && g.releaseDate > new Date()).slice(0, 6),
        popular: [...mockGames].sort((a, b) => (b.overallRating || 0) - (a.overallRating || 0)).slice(0, 6),
        editorsChoice: mockGames.slice(0, 6),
      });
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-64 mb-8 mx-auto" />
          <Tabs defaultValue="latest" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {['latest', 'trending', 'upcoming', 'popular', 'editors-choice'].map((tab) => (
                <TabsTrigger key={tab} value={tab} disabled>
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                </TabsTrigger>
              ))}
            </TabsList>
            {['latest', 'trending', 'upcoming', 'popular', 'editors-choice'].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-96 rounded-lg" />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Discover Amazing Games
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="editors-choice">Editor's Choice</TabsTrigger>
          </TabsList>

          <TabsContent value="latest">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamesData.latest.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamesData.trending.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamesData.upcoming.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamesData.popular.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="editors-choice">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamesData.editorsChoice.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
