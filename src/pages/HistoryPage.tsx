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

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'multiplication' ? (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Countdown Challenge Graph */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Countdown Challenge</h2>
                {getScoresByType('multiplication_count_down').length > 0 ? (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getScoresByType('multiplication_count_down')
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map(score => ({
                            ...score,
                            formattedDate: formatDate(score.date)
                          }))}
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
                    No scores recorded yet.
                  </div>
                )}
              </div>
              
              {/* Flash Challenge Graph */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Flash Challenge</h2>
                {getScoresByType('multiplication_flash').length > 0 ? (
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getScoresByType('multiplication_flash')
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map(score => ({
                            ...score,
                            formattedDate: formatDate(score.date)
                          }))}
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
                    No scores recorded yet.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Coming soon!
            </div>
          )}
        
          {activeTab !== 'multiplication' && (
            <div className="text-center text-gray-500 mt-4 invisible">
              More challenges coming soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
