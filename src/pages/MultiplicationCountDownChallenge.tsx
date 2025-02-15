import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Trophy, X } from 'lucide-react';
import { saveScore, getHighScore } from '../utils/scores';
import { getUserProfile } from '../utils/user';

function MultiplicationCountDownChallenge() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(100);
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0 });
  const [answer, setAnswer] = useState('');
  const [gameOver, setGameOver] = useState(false);

  // Redirect to onboarding if no user profile exists
  React.useEffect(() => {
    const userProfile = getUserProfile();
    if (!userProfile) {
      navigate('/');
    }
  }, [navigate]);

  const generateProblem = useCallback(() => {
    // Generate numbers between 2 and 9
    const num1 = Math.floor(Math.random() * 10) + 2;
    const num2 = Math.floor(Math.random() * 10) + 2;
    setCurrentProblem({ num1, num2 });
  }, []);

  useEffect(() => {
    generateProblem();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [generateProblem]);

  useEffect(() => {
    if (gameOver) {
      // Get previous high score before saving
      const previousHighScore = getHighScore('multiplication');
      // Save score and check if it's a new high score
      const isNewHighScore = saveScore('multiplication', score);
      // Navigate with both score and high score status
      navigate(`/score/${score}/${isNewHighScore}`);
    }
  }, [gameOver, navigate, score]);

  const handleNumberClick = useCallback((num: string) => {
    setTimeout(() => {
      setAnswer(prev => {
        if (prev.length < 3) {
          return prev + num;
        }
        return prev;
      });
    }, 0);  // Delaying by 0ms to let state updates process asynchronously
  }, []);

  const handleClear = useCallback(() => {
    setAnswer('');
  }, []);

  const handleBackspace = useCallback(() => {
    setAnswer(prev => prev.slice(0, -1));
  }, []);

  useEffect(() => {
    const correctAnswer = currentProblem.num1 * currentProblem.num2;
    if (parseInt(answer) === correctAnswer) {
      setScore(prev => prev + 1);
      setAnswer('');
      generateProblem();
    }
  }, [answer, currentProblem.num1, currentProblem.num2, generateProblem]);

  return (
    <div className="h-[100dvh] bg-gradient-to-b from-blue-400 to-purple-500 flex flex-col">
      {/* Fixed Header */}
      <div className="bg-white shadow-lg py-2 px-3 flex justify-start items-center relative">
        <div className="flex items-center mr-8">
          <Timer className="w-4 h-4 text-gray-600 mr-1" />
          <span className="font-bold text-lg">{timeLeft}s</span>
        </div>
        <div className="flex items-center">
          <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="font-bold text-lg">{score}</span>
        </div>
        <button
          onClick={() => navigate('/multiplication-home')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area with flex-grow */}
      <div className="flex-grow flex flex-col">
        {/* Problem Display - Centered vertically */}
        <div className="flex-grow flex items-center justify-center pb-4">
          <div className="bg-white rounded-lg shadow-xl p-4 w-40 text-center">
            <div className="text-4xl font-bold flex flex-col items-end">
              <span className="w-full text-right mb-1">{currentProblem.num1}</span>
              <div className="w-full flex items-center justify-end mb-1">
                <span className="mr-2">×</span>
                <span>{currentProblem.num2}</span>
              </div>
              <div className="w-full border-t-2 border-gray-300 pt-1">
                <span>{answer || '\u00A0'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Number Pad - Fixed at bottom with less padding */}
        <div className="bg-gray-100 p-2 pb-4">
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onPointerDown={() => handleNumberClick(num.toString())}
                className="bg-white rounded-lg p-3 text-xl font-bold shadow hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
                type="button"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="bg-red-500 text-white rounded-lg p-3 text-sm font-bold shadow hover:bg-red-600 active:bg-red-700 touch-manipulation"
              type="button"
            >
              Clear
            </button>
            <button
              onClick={() => handleNumberClick('0')}
              className="bg-white rounded-lg p-3 text-xl font-bold shadow hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
              type="button"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="bg-gray-500 text-white rounded-lg p-3 text-sm font-bold shadow hover:bg-gray-600 active:bg-gray-700 touch-manipulation"
              type="button"
            >
              ←
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiplicationCountDownChallenge;