import LearningHub from '../LearningHub';

export default function LearningHubExample() {
  return (
    <div className="p-6 bg-background">
      <LearningHub 
        onEnrollCourse={(courseId) => console.log('Enroll in course:', courseId)}
      />
    </div>
  );
}