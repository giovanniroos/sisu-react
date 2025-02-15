import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, X, Divide } from 'lucide-react';
import { getUserProfile } from '../utils/user';

function HomePage() {
  const navigate = useNavigate();
  const userProfile = getUserProfile();

  // Redirect to onboarding if no user profile exists
  React.useEffect(() => {
    if (!userProfile) {
      navigate('/');
    }
  }, [navigate]);

  if (!userProfile) {
    return null;
  }

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <div className="max-w-md mx-auto pt-8 flex-grow">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Hi, <span className="text-purple-600">{userProfile.displayName}</span>
        </h1>
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Pick Your Math Adventure! 🚀
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <button
              onClick={() => navigate('/multiplication-home')}
              className="w-full bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <X className="w-12 h-12 mx-auto text-purple-600" />
            </button>
          </div>
          <div>
            <button
              disabled
              className="w-full bg-white/50 rounded-xl p-8 shadow-lg cursor-not-allowed"
            >
              <Divide className="w-12 h-12 mx-auto text-gray-400" />
            </button>
          </div>
          <div>
            <button
              disabled
              className="w-full bg-white/50 rounded-xl p-8 shadow-lg cursor-not-allowed"
            >
              <Plus className="w-12 h-12 mx-auto text-gray-400" />
            </button>
          </div>
          <div>
            <button
              disabled
              className="w-full bg-white/50 rounded-xl p-8 shadow-lg cursor-not-allowed"
            >
              <Minus className="w-12 h-12 mx-auto text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      <div className="text-center text-white/50 text-xs mt-8">
        v0.4.0
      </div>
    </div>
  );
}

export default HomePage;