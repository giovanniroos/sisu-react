import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Timer, Zap } from 'lucide-react';
import { getUserProfile } from '../utils/user';
import { getHighScore } from '../utils/scores';

function MultiplicationHome() {
  const navigate = useNavigate();
  const countdownHighScore = getHighScore('multiplication_count_down');
  const flashHighScore = getHighScore('multiplication_flash');

  // Redirect to onboarding if no user profile exists
  React.useEffect(() => {
    const userProfile = getUserProfile();
    if (!userProfile) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <div className="h-[100dvh] bg-gradient-to-b from-blue-400 to-purple-500 flex flex-col">
      {/* Fixed Header */}
      <div className="bg-white shadow-lg relative">
        <button
          onClick={() => navigate('/home')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center px-4 pt-16">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Pick Your Multiplication Adventure! ✨ 
        </h1>
        
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2">
            <button
              onClick={() => navigate('/multiplication')}
              className="w-full bg-white text-purple-600 rounded-lg px-6 py-4 font-bold hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center space-x-3"
            >
              <Timer className="w-6 h-6" />
              <span>Count down challenge</span>
            </button>
            <div className="text-center text-white/90 text-sm">
              High Score: {countdownHighScore}
            </div>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => navigate('/multiplication-flash')}
              className="w-full bg-white text-purple-600 rounded-lg px-6 py-4 font-bold hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center space-x-3"
            >
              <Zap className="w-6 h-6" />
              <span>Flash challenge</span>
            </button>
            <div className="text-center text-white/90 text-sm">
              High Score: {flashHighScore}
            </div>
          </div>
          
          <button
            disabled
            className="w-full bg-white/50 text-gray-400 rounded-lg px-6 py-4 font-bold cursor-not-allowed invisible"
          >
            More challenges coming soon...
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultiplicationHome;