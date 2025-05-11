import React, { useState } from 'react';
import { X, Mail, Lock, UserCircle2 } from 'lucide-react';
import { User, MOCK_USERS } from '../types';

interface AuthModalProps {
  type: 'signin' | 'signup';
  onClose: () => void;
  onSwitch: (type: 'signin' | 'signup') => void;
  onAuthSuccess: (user: User) => void;
}

export function AuthModal({ type, onClose, onSwitch, onAuthSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'customer'>('customer');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (type === 'signin') {
      // Simulate login - in a real app, this would be an API call
      const user = MOCK_USERS.find(u => u.email === email);
      if (user && password === 'password') { // In a real app, use proper password hashing
        onAuthSuccess(user);
        onClose();
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Simulate registration - in a real app, this would be an API call
      const newUser: User = {
        id: Math.random().toString(),
        name,
        email,
        role
      };
      onAuthSuccess(newUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {type === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'signup' && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="customer"
                        checked={role === 'customer'}
                        onChange={(e) => setRole('customer')}
                        className="mr-2"
                      />
                      Customer
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="admin"
                        checked={role === 'admin'}
                        onChange={(e) => setRole('admin')}
                        className="mr-2"
                      />
                      Admin
                    </label>
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {type === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            {type === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => onSwitch('signup')}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => onSwitch('signin')}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          {type === 'signin' && (
            <div className="mt-6 border-t pt-6">
              <p className="text-sm text-gray-500 mb-4">Demo Accounts:</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Admin: admin@propmanager.com</p>
                <p>Customer: john@example.com</p>
                <p className="text-gray-400">(Use password: "password" for both)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}