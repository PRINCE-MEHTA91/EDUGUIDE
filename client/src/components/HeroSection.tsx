import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, TrendingUp } from 'lucide-react';
import heroImage from '@assets/generated_images/Hero_section_career_professionals_ef4ce8fc.png';

interface HeroSectionProps {
  onGetStarted?: () => void;
  onTakeAssessment?: () => void;
}

export default function HeroSection({ onGetStarted, onTakeAssessment }: HeroSectionProps) {
  const stats = [
    { icon: Users, label: 'Users Guided', value: '50,000+' },
    { icon: BookOpen, label: 'Courses Available', value: '1,200+' },
    { icon: TrendingUp, label: 'Success Rate', value: '94%' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Hero Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Discover Your
            <span className="text-primary block">Perfect Career Path</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Get personalized career guidance, skill assessments, and learning recommendations 
            tailored to your unique goals and interests. Start your professional journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              data-testid="button-get-started"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onTakeAssessment}
              className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent"
              data-testid="button-take-assessment"
            >
              Take Career Assessment
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-3 bg-card/80 backdrop-blur-sm rounded-lg p-4">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-card-foreground" data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}