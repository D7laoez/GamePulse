import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface GameCardProps {
  game: {
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
  };
}

export function GameCard({ game }: GameCardProps) {
  const discountedPrice = game.price && game.discountPercentage 
    ? game.price * (1 - game.discountPercentage / 100) 
    : game.price;

  return (
    <Link href={`/games/${game.slug}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
        <div className="relative aspect-video overflow-hidden">
          {game.bannerImage ? (
            <Image src={game.bannerImage} alt={game.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <span className="text-gray-400">{game.title}</span>
            </div>
          )}
          {game.discountPercentage && game.discountPercentage > 0 && (
            <div className="absolute top-4 left-4"><Badge variant="destructive">-{game.discountPercentage}%</Badge></div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{game.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{game.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {game.genres.slice(0, 3).map((genre, i) => (<Badge key={i} variant="secondary" className="text-xs">{genre}</Badge>))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {game.overallRating && (<div className="flex items-center space-x-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-medium">{game.overallRating.toFixed(1)}</span></div>)}
            </div>
            {discountedPrice !== undefined && (<div className="font-bold">${discountedPrice.toFixed(2)}</div>)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
