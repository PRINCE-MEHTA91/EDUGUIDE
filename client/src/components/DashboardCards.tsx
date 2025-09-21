import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardCheck, 
  Target, 
  BookOpen, 
  FileText, 
  TrendingUp,
  ArrowRight,
  Clock
} from 'lucide-react';

interface DashboardCardsProps {
  onTakeAssessment?: () => void;
  onViewRecommendations?: () => void;
  onExploreCourses?: () => void;
  onResumePrep?: () => void;
}

export default function DashboardCards({ 
  onTakeAssessment, 
  onViewRecommendations, 
  onExploreCourses, 
  onResumePrep 
}: DashboardCardsProps) {
  const assessmentProgress = 75; // todo: remove mock data
  const coursesCompleted = 8; // todo: remove mock data
  const totalCourses = 12; // todo: remove mock data

  const quickActions = [
    {
      title: 'Career Assessment',
      description: 'Complete your personalized career evaluation',
      icon: ClipboardCheck,
      action: onTakeAssessment,
      buttonText: 'Continue Assessment',
      progress: assessmentProgress,
      testId: 'card-career-assessment'
    },
    {
      title: 'View Recommendations',
      description: 'See your personalized career and course suggestions',
      icon: Target,
      action: onViewRecommendations,
      buttonText: 'View Recommendations',
      badge: 'Updated',
      testId: 'card-recommendations'
    },
    {
      title: 'Explore Courses',
      description: 'Browse our extensive learning catalog',
      icon: BookOpen,
      action: onExploreCourses,
      buttonText: 'Browse Courses',
      stats: `${coursesCompleted}/${totalCourses} completed`,
      testId: 'card-courses'
    },
    {
      title: 'Resume & Interview Prep',
      description: 'Perfect your resume and interview skills',
      icon: FileText,
      action: onResumePrep,
      buttonText: 'Improve Resume',
      testId: 'card-resume-prep'
    },
  ];

  const recentActivity = [
    { action: 'Completed Python Fundamentals', time: '2 hours ago', type: 'course' },
    { action: 'Updated career preferences', time: '1 day ago', type: 'assessment' },
    { action: 'Downloaded resume template', time: '3 days ago', type: 'resource' },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((item, index) => (
            <Card key={index} className="hover-elevate cursor-pointer" data-testid={item.testId}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <item.icon className="h-6 w-6 text-primary" />
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className="text-sm">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {item.progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                )}
                {item.stats && (
                  <div className="text-sm text-muted-foreground">
                    {item.stats}
                  </div>
                )}
                <Button 
                  className="w-full" 
                  variant="outline" 
                  onClick={item.action}
                  data-testid={`button-${item.buttonText.toLowerCase().replace(' ', '-')}`}
                >
                  {item.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Your Progress
            </CardTitle>
            <CardDescription>
              Track your recent learning activities and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}