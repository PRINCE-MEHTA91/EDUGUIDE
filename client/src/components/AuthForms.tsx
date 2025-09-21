import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Lock, 
  User, 
  Github, 
  Chrome,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AuthFormsProps {
  onLogin?: (credentials: { email: string; password: string }) => void;
  onSignup?: (data: { name: string; email: string; password: string }) => void;
  onForgotPassword?: (email: string) => void;
  onSocialLogin?: (provider: 'google' | 'github') => void;
}

export default function AuthForms({ onLogin, onSignup, onForgotPassword, onSocialLogin }: AuthFormsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [forgotEmail, setForgotEmail] = useState('');
  const [showForgotForm, setShowForgotForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onLogin) {
        onLogin(loginData);
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (signupData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSignup) {
        onSignup({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password
        });
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onForgotPassword) {
        onForgotPassword(forgotEmail);
      }
      
      setShowForgotForm(false);
      alert('Password reset instructions sent to your email!');
    } catch (err) {
      setError('An error occurred while sending reset instructions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSocialLogin) {
        onSocialLogin(provider);
      }
    } catch (err) {
      setError(`Error signing in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password: string) => {
    if (password.length < 8) return { score: 0, text: 'Too short' };
    if (password.length < 12) return { score: 1, text: 'Weak' };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { score: 1, text: 'Weak' };
    if (!/(?=.*[!@#$%^&*])/.test(password)) return { score: 2, text: 'Good' };
    return { score: 3, text: 'Strong' };
  };

  const strength = passwordStrength(signupData.password);

  if (showForgotForm) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="forgot-email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                    data-testid="input-forgot-email"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || !forgotEmail}
                  data-testid="button-reset-password"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
                
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setShowForgotForm(false)}
                  data-testid="button-back-to-login"
                >
                  Back to Sign In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CP</span>
          </div>
          <span className="font-bold text-xl text-foreground">CareerPath</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Welcome to CareerPath</h1>
        <p className="text-muted-foreground">Your journey to career success starts here</p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Welcome back! Please sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Social Login */}
              <div className="space-y-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  data-testid="button-google-login"
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isLoading}
                  data-testid="button-github-login"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Continue with GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                      data-testid="input-login-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      required
                      data-testid="input-login-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    className="px-0 font-normal"
                    onClick={() => setShowForgotForm(true)}
                    data-testid="button-forgot-password"
                  >
                    Forgot password?
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || !loginData.email || !loginData.password}
                  data-testid="button-sign-in"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Join thousands of professionals advancing their careers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Social Login */}
              <div className="space-y-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  data-testid="button-google-signup"
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Sign up with Google
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isLoading}
                  data-testid="button-github-signup"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Sign up with GitHub
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or create account with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      value={signupData.name}
                      onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="pl-10"
                      required
                      data-testid="input-signup-name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                      data-testid="input-signup-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={signupData.password}
                      onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      required
                      data-testid="input-signup-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {signupData.password && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Password strength:</span>
                        <span className={`font-medium ${
                          strength.score === 0 ? 'text-destructive' :
                          strength.score === 1 ? 'text-orange-500' :
                          strength.score === 2 ? 'text-yellow-500' :
                          'text-green-500'
                        }`}>
                          {strength.text}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`h-1 flex-1 rounded ${
                              step <= strength.score + 1
                                ? strength.score === 0 ? 'bg-destructive' :
                                  strength.score === 1 ? 'bg-orange-500' :
                                  strength.score === 2 ? 'bg-yellow-500' :
                                  'bg-green-500'
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      required
                      data-testid="input-confirm-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    {signupData.confirmPassword && (
                      <div className="absolute right-10 top-3">
                        {signupData.password === signupData.confirmPassword ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || !signupData.name || !signupData.email || !signupData.password || signupData.password !== signupData.confirmPassword}
                  data-testid="button-create-account"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <p className="text-xs text-center text-muted-foreground">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}