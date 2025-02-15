import { Score } from '../types';

const SCORES_KEY = 'sisu_scores';
const MAX_SCORES = 50;

export function saveScore(type: string, score: number): boolean {
  // Don't save if score is 0
  if (score === 0) {
    return false;
  }

  const scores = getScores();
  const highScore = getHighScore(type);
  const isNewHighScore = score > highScore;
  
  // Get scores for this challenge type
  const typeScores = scores.filter(s => s.type === type);
  
  // Determine the index for the new entry
  let newIndex = typeScores.length > 0 
    ? Math.max(...typeScores.map(s => s.index || 0)) + 1 
    : 0;

  // Create new score entry
  const newScore = {
    type,
    score,
    date: new Date().toISOString(),
    index: newIndex
  };

  // Remove any existing scores with the same date (to prevent duplicates)
  const uniqueScores = scores.filter(s => s.date !== newScore.date);
  
  // Add new score at the end of the array
  uniqueScores.push(newScore);
  
  // Keep only the last MAX_SCORES
  while (uniqueScores.length > MAX_SCORES) {
    uniqueScores.shift(); // Remove from the beginning to keep most recent scores
  }
  
  localStorage.setItem(SCORES_KEY, JSON.stringify(uniqueScores));
  return isNewHighScore;
}

export function getScores(): Score[] {
  try {
    const scores = localStorage.getItem(SCORES_KEY);
    return scores ? JSON.parse(scores) : [];
  } catch {
    return [];
  }
}

export function getHighScore(type: string): number {
  const scores = getScores();
  const typeScores = scores.filter(score => score.type === type);
  return typeScores.length > 0
    ? Math.max(...typeScores.map(score => score.score))
    : 0;
}

export function getScoresByType(type: string): Score[] {
  const scores = getScores();
  return scores.filter(score => score.type === type);
}