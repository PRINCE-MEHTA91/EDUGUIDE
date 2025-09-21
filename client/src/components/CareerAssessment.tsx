import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface CareerAssessmentProps {
  onComplete?: (results: any) => void;
  onBack?: () => void;
}

export default function CareerAssessment({ onComplete, onBack }: CareerAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const steps = [
    {
      id: 'interests',
      title: 'Your Interests',
      description: 'What activities energize and excite you?',
      type: 'multiple-choice',
      question: 'Which of these activities do you find most engaging?',
      options: [
        { value: 'problem-solving', label: 'Solving complex problems' },
        { value: 'creative-work', label: 'Creative and artistic work' },
        { value: 'helping-others', label: 'Helping and teaching others' },
        { value: 'leading-teams', label: 'Leading teams and projects' },
        { value: 'analyzing-data', label: 'Analyzing data and research' },
      ]
    },
    {
      id: 'education',
      title: 'Education Level',
      description: 'Tell us about your educational background',
      type: 'select',
      question: 'What is your current education level?',
      options: [
        { value: 'high-school', label: 'High School Diploma' },
        { value: 'some-college', label: 'Some College' },
        { value: 'associate', label: 'Associate Degree' },
        { value: 'bachelor', label: 'Bachelor\'s Degree' },
        { value: 'master', label: 'Master\'s Degree' },
        { value: 'doctoral', label: 'Doctoral Degree' },
      ]
    },
    {
      id: 'skills',
      title: 'Current Skills',
      description: 'Select the skills you currently possess',
      type: 'checkbox',
      question: 'Which skills do you have experience with?',
      options: [
        { value: 'programming', label: 'Programming/Coding' },
        { value: 'design', label: 'Graphic Design' },
        { value: 'writing', label: 'Writing & Communication' },
        { value: 'management', label: 'Project Management' },
        { value: 'sales', label: 'Sales & Marketing' },
        { value: 'finance', label: 'Finance & Accounting' },
        { value: 'healthcare', label: 'Healthcare Knowledge' },
        { value: 'education', label: 'Teaching & Training' },
      ]
    },
    {
      id: 'goals',
      title: 'Career Goals',
      description: 'What are you hoping to achieve?',
      type: 'multiple-choice',
      question: 'What is your primary career goal?',
      options: [
        { value: 'career-change', label: 'Complete career change' },
        { value: 'skill-upgrade', label: 'Upgrade skills in current field' },
        { value: 'promotion', label: 'Get promoted in current role' },
        { value: 'freelance', label: 'Start freelancing/consulting' },
        { value: 'entrepreneur', label: 'Start my own business' },
      ]
    },
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentStepData.id]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Assessment complete
      if (onComplete) {
        onComplete(answers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const isStepValid = () => {
    const answer = answers[currentStepData.id];
    if (currentStepData.type === 'checkbox') {
      return answer && answer.length > 0;
    }
    return answer !== undefined && answer !== '';
  };

  const renderQuestion = () => {
    const stepData = currentStepData;
    
    switch (stepData.type) {
      case 'multiple-choice':
        return (
          <RadioGroup 
            value={answers[stepData.id] || ''} 
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {stepData.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'select':
        return (
          <Select value={answers[stepData.id] || ''} onValueChange={handleAnswer}>
            <SelectTrigger data-testid="select-education-level">
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent>
              {stepData.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'checkbox':
        const selectedSkills = answers[stepData.id] || [];
        return (
          <div className="space-y-3">
            {stepData.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={selectedSkills.includes(option.value)}
                  onCheckedChange={(checked) => {
                    const newSkills = checked
                      ? [...selectedSkills, option.value]
                      : selectedSkills.filter((skill: string) => skill !== option.value);
                    handleAnswer(newSkills);
                  }}
                />
                <Label htmlFor={option.value} className="font-normal cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {currentStep + 1}
            </div>
            <div>
              <CardTitle>{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentStepData.question}</h3>
            {renderQuestion()}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          data-testid="button-previous"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentStep === 0 ? 'Back' : 'Previous'}
        </Button>
        
        <Button 
          onClick={handleNext} 
          disabled={!isStepValid()}
          data-testid="button-next"
        >
          {currentStep === steps.length - 1 ? (
            <>
              Complete Assessment
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}