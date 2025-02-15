import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { getUserProfile } from '../utils/user';

function AboutPage() {
  const navigate = useNavigate();

  // Redirect to onboarding if no user profile exists
  React.useEffect(() => {
    const userProfile = getUserProfile();
    if (!userProfile) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="relative bg-white/90 backdrop-blur rounded-xl shadow-xl p-8">
        <button
          onClick={() => navigate('/home')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Sisu</h1>
        
        <div className="prose prose-lg">
          <p className="text-xl text-gray-700 mb-6">
            🌟 What is Sisu? 🌟
          </p>
          
          <p className="text-gray-600">
            Sisu is like having a superpower! It's when you face something really, really tough, and instead of giving up, you say, "I've got this!" 💪 It's all about being brave, never giving up, and staying strong no matter what.

Sisu is a special word from Finland that means having grit, courage, and a big heart full of determination. It's like being a superhero of perseverance! 🦸‍♀️🦸‍♂️

So, next time things feel hard, remember your Sisu power—you're tougher than you think! 🌈✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage