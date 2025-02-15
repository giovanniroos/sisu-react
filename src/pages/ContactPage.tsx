import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, User } from 'lucide-react';
import { getUserProfile } from '../utils/user';

function ContactPage() {
  const navigate = useNavigate();

  // Redirect to onboarding if no user profile exists
  React.useEffect(() => {
    const userProfile = getUserProfile();
    if (!userProfile) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="relative bg-white/90 backdrop-blur rounded-xl shadow-xl p-6">
        <button
          onClick={() => navigate('/home')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact</h1>
        
        <div className="space-y-4">
          <div className="bg-purple-100 rounded-lg p-4">
            <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-3 mx-auto">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-purple-600 mb-1">Name</div>
              <div className="text-lg font-semibold text-gray-900">Giovanni</div>
            </div>
          </div>
          
          <div className="bg-purple-100 rounded-lg p-4">
            <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-3 mx-auto">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-purple-600 mb-1">Email</div>
              <div className="text-base font-semibold text-gray-900">
                giovanniroos@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;