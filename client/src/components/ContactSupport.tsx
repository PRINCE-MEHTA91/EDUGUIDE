import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin,
  HelpCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface ContactSupportProps {
  onSubmitMessage?: (message: any) => void;
}

export default function ContactSupport({ onSubmitMessage }: ContactSupportProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@careerpath.com',
      responseTime: '24 hours'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      responseTime: 'Instant'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with a career advisor',
      contact: '+1 (555) 123-4567',
      responseTime: 'Business hours'
    }
  ];

  const faqItems = [
    {
      question: 'How accurate are the career recommendations?',
      answer: 'Our career recommendations are based on validated assessment tools and industry data. The accuracy improves as you complete more assessments and provide feedback. We typically see 85-90% satisfaction with our recommendations.'
    },
    {
      question: 'Are the courses really free?',
      answer: 'Yes! We offer many completely free courses. Some advanced courses may have a fee, but we clearly mark all pricing. Our free courses include full content, certificates, and support.'
    },
    {
      question: 'How long does the career assessment take?',
      answer: 'The comprehensive career assessment typically takes 15-20 minutes to complete. You can save your progress and return to it later if needed.'
    },
    {
      question: 'Can I change my career preferences after completing the assessment?',
      answer: 'Absolutely! Your preferences and goals may evolve over time. You can retake the assessment or update your preferences in your profile settings at any time.'
    },
    {
      question: 'Do you offer career counseling sessions?',
      answer: 'Yes, we offer one-on-one career counseling sessions with certified career advisors. These can be scheduled through your dashboard or by contacting our support team.'
    },
    {
      question: 'How do I track my learning progress?',
      answer: 'Your learning progress is automatically tracked in your dashboard. You can see completed courses, skills gained, certificates earned, and recommended next steps.'
    },
    {
      question: 'Are the resume templates ATS-friendly?',
      answer: 'Yes! All our resume templates are designed to pass through Applicant Tracking Systems (ATS). They use standard formatting and industry-approved layouts.'
    },
    {
      question: 'What if I\'m not satisfied with my career recommendations?',
      answer: 'If you\'re not satisfied, you can provide feedback to improve future recommendations, retake the assessment, or schedule a consultation with one of our career advisors.'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onSubmitMessage) {
      onSubmitMessage(formData);
    }
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Contact & Support</h1>
        <p className="text-muted-foreground">We're here to help you succeed in your career journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Have a question or need help? We'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="career">Career Guidance</SelectItem>
                      <SelectItem value="courses">Course Related</SelectItem>
                      <SelectItem value="billing">Billing & Account</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description of your inquiry"
                    required
                    data-testid="input-subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Please provide details about your question or issue..."
                    rows={5}
                    required
                    data-testid="textarea-message"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={!isFormValid || isSubmitting}
                  data-testid="button-submit-message"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="grid gap-4">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <method.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <p className="text-sm font-medium text-primary">{method.contact}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {method.responseTime}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Office Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Our Office
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-2">CareerPath Advisor Headquarters</h3>
              <p className="text-muted-foreground mb-4">
                123 Innovation Drive<br />
                San Francisco, CA 94105<br />
                United States
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM PST
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}