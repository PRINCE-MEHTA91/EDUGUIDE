import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      isAuthenticated={true}
      user={{ name: "Sarah Johnson", avatar: undefined }}
      onLogin={() => console.log('Login triggered')}
      onLogout={() => console.log('Logout triggered')}
    />
  );
}