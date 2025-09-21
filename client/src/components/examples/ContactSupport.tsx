import ContactSupport from '../ContactSupport';

export default function ContactSupportExample() {
  return (
    <div className="p-6 bg-background">
      <ContactSupport 
        onSubmitMessage={(message) => console.log('Message submitted:', message)}
      />
    </div>
  );
}