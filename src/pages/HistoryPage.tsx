import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { getScoresByType } from '../utils/scores';
import { getUserProfile } from '../utils/user';
import { Score } from '../types';

type ChallengeType = 'multiplication' | 'division' | 'addition' | 'subtraction';

const CHALLENGE_TYPES: ChallengeType[] = ['multiplication', 'division', 'addition', 'subtraction'];

const CHALLENGE_NAMES: Record<ChallengeType, string> = {
  multiplication: 'Multiplication',
  division: 'Division',
  addition: 'Addition',
  subtraction: 'Subtraction'
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${hours}:${minutes}`;
}

function HistoryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ChallengeType>('multiplication');

  // Redirect to onboarding if no user profile exists
  React.useEffect(() => {
    const userProfile = getUserProfile();
    if (!userProfile) {
      navigate('/');
    }
  }, [navigate]);
  
  const scores = getScoresByType(activeTab)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(score => ({
      ...score,
      formattedDate: formatDate(score.date)
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600">{data.formattedDate}</p>
          <p className="text-sm font-bold text-purple-600">
            Score: {data.score}
          </p>
          <p className="text-xs text-gray-500">
            Attempt #{data.index}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pt-8">
      <div className="relative bg-white/90 backdrop-blur rounded-xl shadow-xl">
        <button
          onClick={() => navigate('/home')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-6 pb-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Progress History</h1>
          
          {/* Scrollable Tabs Container */}
          <div className="overflow-x-auto">
            <div className="min-w-max bg-gray-100 p-1 rounded-lg mb-6">
              <div className="flex space-x-1">
                {CHALLENGE_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`py-2 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap
                      ${activeTab === type
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {CHALLENGE_NAMES[type]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Graph Container */}
        <div className="p-6 pt-0">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {scores.length > 0 ? (
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={scores}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="formattedDate"
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={70}
                        interval={0}
                        padding={{ left: 0, right: 0 }}
                      />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="score"
                        fill="#8B5CF6"
                        isAnimationActive={false}
                        barSize={8}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No scores recorded for {CHALLENGE_NAMES[activeTab]} yet.
                  {activeTab !== 'multiplication' && (
                    <p className="mt-2 text-sm">This challenge is coming soon!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;