import DashboardCards from '../DashboardCards';

export default function DashboardCardsExample() {
  return (
    <div className="p-6 bg-background">
      <DashboardCards 
        onTakeAssessment={() => console.log('Take assessment clicked')}
        onViewRecommendations={() => console.log('View recommendations clicked')}
        onExploreCourses={() => console.log('Explore courses clicked')}
        onResumePrep={() => console.log('Resume prep clicked')}
      />
    </div>
  );
}