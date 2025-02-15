import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { saveUserProfile, getUserProfile } from '../utils/user';

function OnboardingPage() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  // Redirect to home if user profile exists
  React.useEffect(() => {
    const userProfile = getUserProfile();
    if (userProfile) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName.trim()) {
      setError('Please enter a display name');
      return;
    }

    saveUserProfile({
      displayName: displayName.trim(),
      dateJoined: new Date().toISOString()
    });

    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <Brain className="w-16 h-16 text-purple-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
            Welcome to Sisu
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Your journey to mastering mathematics starts here.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="displayName" className="block text-lg font-semibold text-gray-700 mb-2">
              Choose your display name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                setError('');
              }}
              maxLength={20}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
              placeholder="Enter your display name"
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white rounded-lg px-6 py-3 font-bold hover:bg-purple-700 transition-colors shadow-lg flex items-center justify-center"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnboardingPage;