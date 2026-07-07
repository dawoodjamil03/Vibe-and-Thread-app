import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const action = isSignup ? signup : login;
    const { error: authError } = await action(email, password);

    setSubmitting(false);
    if (authError) {
      setError(authError);
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const { error: authError } = await loginWithGoogle();
    if (authError) setError(authError);
    // OAuth redirects automatically — no need to navigate
  };

  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-[120px] flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[480px] bg-surface-container-low p-xl border border-outline-variant rounded-sm"
      >
        <h1 className="text-style-headline-lg text-primary text-center mb-sm">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-style-body-md text-on-surface-variant text-center mb-xl">
          {isSignup
            ? 'Sign up to start shopping with Vibe & Thread.'
            : 'Please enter your details to sign in.'}
        </p>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-sm py-sm border border-outline-variant hover:bg-surface-container transition-colors duration-200 mb-lg cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span className="text-style-button text-primary">Continue with Google</span>
        </button>

        <div className="flex items-center gap-md mb-lg">
          <div className="flex-1 h-px bg-outline-variant"></div>
          <span className="text-style-label-caps text-on-surface-variant">Or</span>
          <div className="flex-1 h-px bg-outline-variant"></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-error-container text-on-error-container p-sm mb-md text-style-body-sm rounded-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label className="text-style-label-caps text-primary" htmlFor="email">
              Email Address <span className="text-error">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface-container border border-outline-variant py-sm px-md focus:outline-none focus:border-primary text-primary transition-colors"
              placeholder="name@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-style-label-caps text-primary" htmlFor="password">
              Password <span className="text-error">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-surface-container border border-outline-variant py-sm px-md focus:outline-none focus:border-primary text-primary transition-colors"
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
            />
          </div>

          {!isSignup && (
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-xs cursor-pointer">
                <input type="checkbox" className="accent-primary" />
                <span className="text-style-body-sm text-on-surface-variant">Remember me</span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-md bg-primary text-on-primary text-style-button hover:bg-primary-container transition-colors duration-300 disabled:opacity-60 cursor-pointer"
          >
            {submitting
              ? 'Please wait...'
              : isSignup
                ? 'Create Account'
                : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-lg text-style-body-sm text-on-surface-variant">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsSignup(!isSignup); setError(''); }}
            className="text-primary underline font-medium cursor-pointer"
          >
            {isSignup ? 'Sign In' : 'Create one'}
          </button>
        </p>
      </motion.div>
    </section>
  );
}
