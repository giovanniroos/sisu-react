import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import MultiplicationHome from './pages/MultiplicationHome';
import MultiplicationCountDownChallenge from './pages/MultiplicationCountDownChallenge';
import MultiplicationFlashChallenge from './pages/MultiplicationFlashChallenge';
import ScorePage from './pages/ScorePage';
import AboutPage from './pages/AboutPage';
import HistoryPage from './pages/HistoryPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/multiplication-home" element={<MultiplicationHome />} />
          <Route path="/multiplication" element={<MultiplicationCountDownChallenge />} />
          <Route path="/multiplication-flash" element={<MultiplicationFlashChallenge />} />
          <Route path="/score/:score/:isNewHighScore" element={<ScorePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;