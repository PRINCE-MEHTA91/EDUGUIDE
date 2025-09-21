import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Star,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface RecommendationsDisplayProps {
  onEnrollCourse?: (courseId: string) => void;
  onViewCareerPath?: (pathId: string) => void;
}

export default function RecommendationsDisplay({ onEnrollCourse, onViewCareerPath }: RecommendationsDisplayProps) {
  // todo: remove mock data
  const careerPaths = [
    {
      id: '1',
      title: 'Full Stack Developer',
      description: 'Build end-to-end web applications using modern technologies',
      matchPercentage: 95,
      salaryRange: '$70k - $120k',
      growthRate: 'High (22%)',
      skills: ['JavaScript', 'React', 'Node.js', 'Databases'],
      timeToEntry: '6-12 months'
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      description: 'Create intuitive and beautiful user experiences',
      matchPercentage: 88,
      salaryRange: '$60k - $100k',
      growthRate: 'Medium (13%)',
      skills: ['Figma', 'User Research', 'Prototyping', 'Visual Design'],
      timeToEntry: '4-8 months'
    },
    {
      id: '3',
      title: 'Data Analyst',
      description: 'Transform data into actionable business insights',
      matchPercentage: 82,
      salaryRange: '$55k - $90k',
      growthRate: 'High (25%)',
      skills: ['SQL', 'Python', 'Excel', 'Tableau'],
      timeToEntry: '3-6 months'
    }
  ];

  const recommendedCourses = [
    {
      id: '1',
      title: 'Complete JavaScript Bootcamp',
      provider: 'TechAcademy',
      duration: '12 weeks',
      level: 'Beginner',
      rating: 4.8,
      price: 'Free',
      skills: ['JavaScript', 'ES6+', 'DOM Manipulation'],
      completedBy: 15420
    },
    {
      id: '2',
      title: 'React - The Complete Guide',
      provider: 'CodeMaster',
      duration: '8 weeks',
      level: 'Intermediate',
      rating: 4.9,
      price: '$49',
      skills: ['React', 'Hooks', 'Redux'],
      completedBy: 8930
    },
    {
      id: '3',
      title: 'Node.js Backend Development',
      provider: 'DevCourse',
      duration: '10 weeks',
      level: 'Intermediate',
      rating: 4.7,
      price: '$39',
      skills: ['Node.js', 'Express', 'MongoDB'],
      completedBy: 6250
    }
  ];

  const skillsToImprove = [
    { name: 'JavaScript', current: 65, target: 85 },
    { name: 'React', current: 40, target: 80 },
    { name: 'Node.js', current: 20, target: 75 },
    { name: 'Database Management', current: 30, target: 70 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Personalized Recommendations</h1>
        <p className="text-muted-foreground">Based on your assessment, here are the best paths for your career growth</p>
      </div>

      {/* Career Paths */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <Briefcase className="mr-2 h-6 w-6" />
          Recommended Career Paths
        </h2>
        <div className="grid gap-6">
          {careerPaths.map((path) => (
            <Card key={path.id} className="hover-elevate" data-testid={`card-career-${path.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    <CardDescription className="mt-1">{path.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    {path.matchPercentage}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Salary Range:</span>
                    <div className="font-medium">{path.salaryRange}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Growth Rate:</span>
                    <div className="font-medium text-green-600">{path.growthRate}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time to Entry:</span>
                    <div className="font-medium">{path.timeToEntry}</div>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Key Skills:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {path.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => onViewCareerPath?.(path.id)}
                  className="w-full"
                  data-testid={`button-view-path-${path.id}`}
                >
                  View Career Path Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <BookOpen className="mr-2 h-6 w-6" />
          Recommended Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="hover-elevate" data-testid={`card-course-${course.id}`}>
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.provider}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <Badge variant="outline">{course.level}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <div className="text-lg font-bold text-primary">{course.price}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Skills you'll learn:</div>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {course.completedBy.toLocaleString()} students completed
                </div>

                <Button 
                  onClick={() => onEnrollCourse?.(course.id)}
                  className="w-full"
                  data-testid={`button-enroll-${course.id}`}
                >
                  {course.price === 'Free' ? 'Start Free Course' : 'Enroll Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Skills to Improve */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <TrendingUp className="mr-2 h-6 w-6" />
          Skills Development Tracker
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Your Skill Progress</CardTitle>
            <CardDescription>
              Track your progress towards your target skill levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {skillsToImprove.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <div className="text-sm text-muted-foreground">
                      {skill.current}% → {skill.target}%
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={skill.current} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current Level</span>
                      <span>Target Level</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}