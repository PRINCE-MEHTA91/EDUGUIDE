import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection 
      onGetStarted={() => console.log('Get started clicked')}
      onTakeAssessment={() => console.log('Take assessment clicked')}
    />
  );
}