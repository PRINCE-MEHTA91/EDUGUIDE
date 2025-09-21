import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  BookOpen,
  Code,
  Briefcase,
  Palette,
  Heart,
  DollarSign
} from 'lucide-react';
import techImage from '@assets/generated_images/Tech_IT_career_illustration_9f7b10e0.png';
import businessImage from '@assets/generated_images/Business_career_illustration_991c60e2.png';
import designImage from '@assets/generated_images/Design_career_illustration_161a7625.png';

interface LearningHubProps {
  onEnrollCourse?: (courseId: string) => void;
}

export default function LearningHub({ onEnrollCourse }: LearningHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const categories = [
    { id: 'tech', name: 'Tech & IT', icon: Code, image: techImage, count: 245 },
    { id: 'business', name: 'Business', icon: Briefcase, image: businessImage, count: 189 },
    { id: 'design', name: 'Design', icon: Palette, image: designImage, count: 156 },
    { id: 'healthcare', name: 'Healthcare', icon: Heart, image: undefined, count: 98 },
    { id: 'finance', name: 'Finance', icon: DollarSign, image: undefined, count: 134 },
  ];

  // todo: remove mock data
  const courses = [
    {
      id: '1',
      title: 'Complete JavaScript Bootcamp 2024',
      description: 'Master JavaScript from basics to advanced concepts including ES6+, async programming, and modern frameworks.',
      category: 'tech',
      level: 'Beginner',
      duration: '40 hours',
      rating: 4.8,
      students: 15420,
      price: 'Free',
      instructor: 'John Smith',
      skills: ['JavaScript', 'ES6+', 'DOM', 'APIs']
    },
    {
      id: '2',
      title: 'React - The Complete Guide',
      description: 'Build modern, reactive web applications with React. Includes hooks, context, routing, and state management.',
      category: 'tech',
      level: 'Intermediate',
      duration: '35 hours',
      rating: 4.9,
      students: 8930,
      price: '$49',
      instructor: 'Sarah Johnson',
      skills: ['React', 'Hooks', 'Redux', 'Router']
    },
    {
      id: '3',
      title: 'Business Strategy Fundamentals',
      description: 'Learn essential business strategy concepts, market analysis, and competitive positioning.',
      category: 'business',
      level: 'Beginner',
      duration: '25 hours',
      rating: 4.7,
      students: 5640,
      price: '$29',
      instructor: 'Michael Brown',
      skills: ['Strategy', 'Market Analysis', 'Planning']
    },
    {
      id: '4',
      title: 'UX/UI Design Masterclass',
      description: 'Create beautiful, user-centered designs. Learn Figma, design principles, and user research methods.',
      category: 'design',
      level: 'Intermediate',
      duration: '30 hours',
      rating: 4.6,
      students: 7200,
      price: '$39',
      instructor: 'Emma Wilson',
      skills: ['Figma', 'User Research', 'Prototyping']
    },
    {
      id: '5',
      title: 'Node.js Backend Development',
      description: 'Build robust backend applications with Node.js, Express, and MongoDB. Deploy to production.',
      category: 'tech',
      level: 'Advanced',
      duration: '45 hours',
      rating: 4.8,
      students: 4350,
      price: '$69',
      instructor: 'David Chen',
      skills: ['Node.js', 'Express', 'MongoDB', 'APIs']
    },
    {
      id: '6',
      title: 'Financial Analysis & Modeling',
      description: 'Master financial modeling, valuation techniques, and investment analysis for business decisions.',
      category: 'finance',
      level: 'Intermediate',
      duration: '28 hours',
      rating: 4.5,
      students: 3890,
      price: '$45',
      instructor: 'Lisa Rodriguez',
      skills: ['Excel', 'Modeling', 'Valuation', 'Analysis']
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && course.price === 'Free') ||
                        (selectedPrice === 'paid' && course.price !== 'Free');
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  const getCategoryImage = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.image;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learning Hub</h1>
        <p className="text-muted-foreground">Discover courses that will accelerate your career growth</p>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Courses</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="hover-elevate cursor-pointer" data-testid={`card-category-${category.id}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.count} courses</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {category.image && (
                  <CardContent>
                    <div 
                      className="h-32 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Find Your Perfect Course
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                    data-testid="input-search-courses"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-40" data-testid="select-category">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-full sm:w-32" data-testid="select-level">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger className="w-full sm:w-32" data-testid="select-price">
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Found
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover-elevate" data-testid={`card-course-${course.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {course.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {course.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="text-lg font-bold text-primary">{course.price}</div>
                    </div>

                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Skills you'll learn:</div>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {course.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{course.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Instructor: {course.instructor}
                    </div>

                    <Button 
                      onClick={() => onEnrollCourse?.(course.id)}
                      className="w-full"
                      data-testid={`button-enroll-${course.id}`}
                    >
                      {course.price === 'Free' ? 'Start Free' : 'Enroll Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or browse our categories
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}