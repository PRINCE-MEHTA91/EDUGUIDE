import RecommendationsDisplay from '../RecommendationsDisplay';

export default function RecommendationsDisplayExample() {
  return (
    <div className="p-6 bg-background">
      <RecommendationsDisplay 
        onEnrollCourse={(courseId) => console.log('Enroll in course:', courseId)}
        onViewCareerPath={(pathId) => console.log('View career path:', pathId)}
      />
    </div>
  );
}