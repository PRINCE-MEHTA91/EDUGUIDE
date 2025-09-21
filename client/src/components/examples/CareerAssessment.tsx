import CareerAssessment from '../CareerAssessment';

export default function CareerAssessmentExample() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Career Assessment</h1>
          <p className="text-muted-foreground">Let's discover your ideal career path together</p>
        </div>
        <CareerAssessment 
          onComplete={(results) => console.log('Assessment completed:', results)}
          onBack={() => console.log('Back clicked')}
        />
      </div>
    </div>
  );
}