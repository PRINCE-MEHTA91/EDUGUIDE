import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  MessageSquare, 
  Star,
  Clock,
  User
} from 'lucide-react';

interface ResumePrepProps {
  onDownloadTemplate?: (templateId: string) => void;
}

export default function ResumePrep({ onDownloadTemplate }: ResumePrepProps) {
  // todo: remove mock data
  const resumeTemplates = [
    {
      id: '1',
      name: 'Professional Modern',
      description: 'Clean, ATS-friendly design perfect for corporate roles',
      category: 'Corporate',
      downloads: 15420,
      rating: 4.8,
      preview: '/api/placeholder/300/400'
    },
    {
      id: '2',
      name: 'Creative Portfolio',
      description: 'Eye-catching layout ideal for design and creative positions',
      category: 'Creative',
      downloads: 8930,
      rating: 4.9,
      preview: '/api/placeholder/300/400'
    },
    {
      id: '3',
      name: 'Tech Developer',
      description: 'Streamlined format highlighting technical skills and projects',
      category: 'Technology',
      downloads: 12750,
      rating: 4.7,
      preview: '/api/placeholder/300/400'
    },
    {
      id: '4',
      name: 'Entry Level',
      description: 'Perfect for new graduates and career changers',
      category: 'Beginner',
      downloads: 9840,
      rating: 4.6,
      preview: '/api/placeholder/300/400'
    }
  ];

  const resumeTips = [
    {
      category: 'Content',
      tips: [
        'Use action verbs to start bullet points (e.g., "Developed", "Implemented", "Led")',
        'Quantify achievements with specific numbers and metrics',
        'Tailor your resume to each job application',
        'Keep it to 1-2 pages maximum',
        'Include relevant keywords from the job description'
      ]
    },
    {
      category: 'Formatting',
      tips: [
        'Use a clean, professional font (Arial, Calibri, or Times New Roman)',
        'Maintain consistent formatting throughout',
        'Use bullet points instead of paragraphs',
        'Leave sufficient white space for readability',
        'Save as PDF to preserve formatting'
      ]
    },
    {
      category: 'ATS Optimization',
      tips: [
        'Use standard section headers (Experience, Education, Skills)',
        'Avoid graphics, charts, and fancy formatting',
        'Use standard bullet points (•) not special characters',
        'Include both acronyms and full terms (e.g., "AI (Artificial Intelligence)")',
        'Test your resume through ATS checkers'
      ]
    }
  ];

  const interviewQuestions = [
    {
      category: 'General',
      questions: [
        {
          question: 'Tell me about yourself',
          tips: 'Focus on your professional journey, key achievements, and why you\'re interested in this role. Keep it to 2-3 minutes.',
          answer: 'Structure your response using the present-past-future format: what you do now, relevant past experience, and future goals.'
        },
        {
          question: 'Why do you want to work here?',
          tips: 'Research the company thoroughly. Mention specific aspects of their mission, culture, or recent achievements.',
          answer: 'Connect your values and career goals with the company\'s mission and show genuine enthusiasm for their work.'
        },
        {
          question: 'What are your strengths and weaknesses?',
          tips: 'Choose strengths relevant to the job. For weaknesses, mention real areas for improvement and how you\'re working on them.',
          answer: 'Be honest but strategic. Show self-awareness and commitment to growth.'
        }
      ]
    },
    {
      category: 'Behavioral',
      questions: [
        {
          question: 'Describe a challenging situation you faced at work',
          tips: 'Use the STAR method: Situation, Task, Action, Result. Focus on your problem-solving skills.',
          answer: 'Choose a specific example that demonstrates relevant skills and shows positive outcomes.'
        },
        {
          question: 'Tell me about a time you worked in a team',
          tips: 'Highlight your collaboration skills, communication, and how you contributed to team success.',
          answer: 'Show how you can work effectively with others and contribute to group objectives.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'How do you stay updated with industry trends?',
          tips: 'Mention specific resources, publications, conferences, or online courses you use.',
          answer: 'Show that you\'re proactive about learning and staying current in your field.'
        },
        {
          question: 'Describe your experience with [specific technology/skill]',
          tips: 'Be honest about your experience level and provide concrete examples of how you\'ve used it.',
          answer: 'Give specific examples and mention any projects or achievements related to the technology.'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Resume & Interview Prep</h1>
        <p className="text-muted-foreground">Professional tools and guidance to land your dream job</p>
      </div>

      <Tabs defaultValue="resume" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resume">Resume Builder</TabsTrigger>
          <TabsTrigger value="interview">Interview Prep</TabsTrigger>
        </TabsList>

        <TabsContent value="resume" className="space-y-6">
          {/* Resume Templates */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <FileText className="mr-2 h-6 w-6" />
              Professional Resume Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resumeTemplates.map((template) => (
                <Card key={template.id} className="hover-elevate" data-testid={`card-template-${template.id}`}>
                  <CardHeader>
                    <div className="aspect-[3/4] bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{template.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{template.rating}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {template.downloads.toLocaleString()} downloads
                    </div>

                    <Button 
                      onClick={() => onDownloadTemplate?.(template.id)}
                      className="w-full"
                      data-testid={`button-download-${template.id}`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Free
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Resume Tips */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <CheckCircle2 className="mr-2 h-6 w-6" />
              Resume Writing Tips
            </h2>
            <div className="grid gap-6">
              {resumeTips.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interview" className="space-y-6">
          {/* Interview Questions */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <MessageSquare className="mr-2 h-6 w-6" />
              Common Interview Questions
            </h2>
            <div className="space-y-6">
              {interviewQuestions.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category.category} Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {category.questions.map((item, qIndex) => (
                        <div key={qIndex} className="border-l-4 border-primary pl-4 space-y-2">
                          <h4 className="font-medium text-foreground">{item.question}</h4>
                          <p className="text-sm text-muted-foreground">
                            <strong>Tips:</strong> {item.tips}
                          </p>
                          <p className="text-sm text-foreground">
                            <strong>How to answer:</strong> {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Interview Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Before, During & After Interview Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Before the Interview</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Research the company thoroughly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Practice your answers out loud</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Prepare questions for the interviewer</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Plan your outfit and route</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">During the Interview</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Arrive 10-15 minutes early</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Maintain good eye contact</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Use the STAR method for examples</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Show enthusiasm and ask questions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">After the Interview</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Send a thank-you email within 24 hours</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Reflect on what went well</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Follow up politely if no response</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Continue your job search</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}