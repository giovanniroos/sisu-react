import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Trophy, X } from 'lucide-react';
import { saveScore, getHighScore } from '../utils/scores';
import { getUserProfile } from '../utils/user';
import { useRef } from 'react';

const TOTAL_PROBLEMS = 10;
const TIME_PER_PROBLEM = 5;
const MIN_NUMBER = 2;
const MAX_NUMBER = 12;

function MultiplicationFlashChallenge() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(TIME_PER_PROBLEM);
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ num1: 0, num2: 0 });
  const [answer, setAnswer] = useState('');
  const [problemCount, setProblemCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const usedProblems = useRef<Set<string>>(new Set());
  const timerRef = useRef<number>();

  // Redirect to onboarding if no user profile exists
  React.useEffect(() => {
    const userProfile = getUserProfile();
    if (!userProfile) {
      navigate('/');
    }
  }, [navigate]);

  const generateProblem = useCallback(() => {
    if (problemCount >= TOTAL_PROBLEMS) return;
    
    let num1, num2, problemKey;
    do {
      num1 = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
      num2 = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
      problemKey = `${num1}x${num2}`;
    } while (usedProblems.current.has(problemKey));

    usedProblems.current.add(problemKey);
    setCurrentProblem({ num1, num2 });
    setTimeLeft(TIME_PER_PROBLEM);
    setAnswer('');
  }, []);

  useEffect(() => {
    if (problemCount >= TOTAL_PROBLEMS) {
      setGameOver(true);
      const isNewHighScore = saveScore('multiplication_flash', score);
      navigate(`/score/${score}/${isNewHighScore}`, { state: { from: 'flash' } });
    } else {
      generateProblem();
    }
  }, [problemCount, generateProblem, navigate, score]);

  useEffect(() => {
    if (problemCount < TOTAL_PROBLEMS && !gameOver) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setProblemCount(count => count + 1);
            return TIME_PER_PROBLEM;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) window.clearInterval(timerRef.current);
      };
    }
  }, [problemCount, gameOver]);

  const handleNumberClick = useCallback((num: string) => {
    setTimeout(() => {
      setAnswer(prev => {
        if (prev.length < 3) {
          return prev + num;
        }
        return prev;
      });
    }, 0);
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
      // Use setTimeout to prevent state updates during render
      setTimeout(() => {
        setScore(prev => prev + 1);
        setProblemCount(count => count + 1);
        setAnswer('');
      }, 0);
    }
  }, [answer, currentProblem.num1, currentProblem.num2]);

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
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
          {problemCount + 1}/{TOTAL_PROBLEMS}
        </div>
        <button
          onClick={() => navigate('/multiplication-home')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-0 bg-gray-200 invisible">
        <div 
          className="h-full bg-purple-600 transition-all duration-1000"
          style={{ width: `${(timeLeft / TIME_PER_PROBLEM) * 100}%` }}
        />
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

export default MultiplicationFlashChallenge