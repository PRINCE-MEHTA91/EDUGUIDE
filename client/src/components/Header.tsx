import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: { name: string; avatar?: string };
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function Header({ isAuthenticated = false, user, onLogin, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/assessment', label: 'Assessment' },
    { path: '/recommendations', label: 'Recommendations' },
    { path: '/learning', label: 'Learning Hub' },
    { path: '/resume-prep', label: 'Resume Prep' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" data-testid="link-home">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CP</span>
            </div>
            <span className="font-bold text-xl text-foreground">CareerPath</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}>
              <span className={`text-sm font-medium transition-colors hover:text-primary ${
                location === item.path ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="button-user-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem data-testid="button-profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} data-testid="button-logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={onLogin} data-testid="button-login">
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                  location === item.path ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </div>
              </Link>
            ))}
            <div className="pt-4 border-t">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={onLogout} className="w-full">
                    Log out
                  </Button>
                </div>
              ) : (
                <Button onClick={onLogin} className="w-full">
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}