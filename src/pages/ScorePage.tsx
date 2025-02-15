import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trophy, RotateCcw, X, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getHighScore } from '../utils/scores';

function ScorePage() {
  const navigate = useNavigate();
  const { score, isNewHighScore } = useParams();
  const finalScore = parseInt(score || '0', 10);
  const previousHighScore = React.useRef(getHighScore('multiplication'));
  const isHighScore = isNewHighScore === 'true';

  useEffect(() => {
    if (isHighScore) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isHighScore]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl p-8 text-center max-w-sm w-full">
        <button
          onClick={() => navigate('/home')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        
        {isHighScore ? (
          <div className="relative">
            <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
            <Crown className="w-8 h-8 text-yellow-500 absolute top-0 right-1/3 animate-bounce" />
          </div>
        ) : (
          <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
        )}
        
        <h1 className="text-4xl font-bold mb-2">Time's Up!</h1>
        
        <div className="space-y-2 mb-6">
          {isHighScore ? (
            <div className="text-green-600 font-semibold">
              <p className="text-2xl mb-2">Congratulations! You have a new high score!</p>
              <p className="text-xl">
                Your Score: <span className="text-purple-600 font-bold">{finalScore}</span>
              </p>
            </div>
          ) : (
            <>
              <p className="text-2xl">
                Your Score: <span className="text-purple-600 font-bold">{finalScore}</span>
              </p>
              <p className="text-sm text-gray-600">
                High Score: {previousHighScore.current}
              </p>
            </>
          )}
        </div>

        <button
          onClick={() => navigate('/multiplication')}
          className="bg-purple-600 text-white rounded-lg px-6 py-3 font-bold flex items-center justify-center w-full hover:bg-purple-700"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </button>
      </div>
    </div>
  );
}

export default ScorePage;