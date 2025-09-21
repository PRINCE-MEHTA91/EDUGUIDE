import AuthForms from '../AuthForms';

export default function AuthFormsExample() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <AuthForms 
        onLogin={(credentials) => console.log('Login:', credentials)}
        onSignup={(data) => console.log('Signup:', data)}
        onForgotPassword={(email) => console.log('Forgot password:', email)}
        onSocialLogin={(provider) => console.log('Social login:', provider)}
      />
    </div>
  );
}