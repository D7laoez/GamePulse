'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, Search, User, ShoppingCart, Heart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Games', href: '/games' },
    { title: 'News', href: '/news' },
    { title: 'Reviews', href: '/reviews' },
    { title: 'Deals', href: '/deals' },
    { title: 'Free Games', href: '/free-games' },
    { title: 'Calendar', href: '/calendar' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">GP</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              GamePulse
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                size="sm"
                asChild
                className="capitalize"
              >
                <Link href={item.href}>{item.title}</Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Button key={item.href} variant={pathname === item.href ? 'secondary' : 'ghost'} asChild className="w-full justify-start">
                      <Link href={item.href}>{item.title}</Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon" asChild><Link href="/wishlist"><Heart className="h-5 w-5" /></Link></Button>
            <Button variant="ghost" size="icon" asChild><Link href="/profile"><Avatar className="h-8 w-8"><AvatarFallback>U</AvatarFallback></Avatar></Link></Button>
          </div>
        </div>
      </div>
    </header>
  );
}
