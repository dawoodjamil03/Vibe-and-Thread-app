import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state, or default to home
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate(from, { replace: true });
  };

  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-[120px] flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-[480px] bg-surface-container-low p-xl border border-outline-variant rounded-sm">
        <h1 className="text-style-headline-lg text-primary text-center mb-sm">Welcome Back</h1>
        <p className="text-style-body-md text-on-surface-variant text-center mb-xl">
          Please enter your details to sign in.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label className="text-style-label-caps text-primary" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface-container border border-outline-variant py-sm px-md focus:outline-none focus:border-primary text-primary transition-colors"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="text-style-label-caps text-primary" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-surface-container border border-outline-variant py-sm px-md focus:outline-none focus:border-primary text-primary transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-md">
            <label className="flex items-center gap-xs cursor-pointer">
              <input type="checkbox" className="accent-primary" />
              <span className="text-style-body-sm text-on-surface-variant">Remember me</span>
            </label>
            <a href="#" className="text-style-body-sm text-primary underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-md bg-primary text-on-primary text-style-button hover:bg-primary-container transition-colors duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-lg text-style-body-sm text-on-surface-variant">
          Don&apos;t have an account?{' '}
          <Link to="#" className="text-primary underline font-medium">Create one</Link>
        </p>
      </div>
    </section>
  );
}
