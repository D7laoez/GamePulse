import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card text-card-foreground border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GP</span>
              </div>
              <span className="text-xl font-bold">GamePulse</span>
            </div>
            <p className="text-muted-foreground text-sm">Your ultimate gaming destination.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/games" className="hover:text-foreground">Games</Link></li>
              <li><Link href="/news" className="hover:text-foreground">News</Link></li>
              <li><Link href="/reviews" className="hover:text-foreground">Reviews</Link></li>
              <li><Link href="/deals" className="hover:text-foreground">Deals</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/action" className="hover:text-foreground">Action</Link></li>
              <li><Link href="/category/rpg" className="hover:text-foreground">RPG</Link></li>
              <li><Link href="/category/adventure" className="hover:text-foreground">Adventure</Link></li>
              <li><Link href="/category/strategy" className="hover:text-foreground">Strategy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Youtube className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Github className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {currentYear} GamePulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
