import ResumePrep from '../ResumePrep';

export default function ResumePrepExample() {
  return (
    <div className="p-6 bg-background">
      <ResumePrep 
        onDownloadTemplate={(templateId) => console.log('Download template:', templateId)}
      />
    </div>
  );
}