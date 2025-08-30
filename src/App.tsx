import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Home, Award, Brain, Heart } from 'lucide-react';
import Introduction from './components/Introduction';
import WhatAreEmotions from './components/WhatAreEmotions';
import HowComputersLearn from './components/HowComputersLearn';
import RuleBasedApproach from './components/RuleBasedApproach';
import WordBasedApproach from './components/WordBasedApproach';
import RealWorldApps from './components/RealWorldApps';
import FinalChallenge from './components/FinalChallenge';
import Completion from './components/Completion';

const lessons = [
  { id: 'intro', title: 'Meet Your AI Friends', component: Introduction },
  { id: 'emotions', title: 'What Are Emotions?', component: WhatAreEmotions },
  { id: 'computers', title: 'How Computers Learn', component: HowComputersLearn },
  { id: 'rules', title: 'The Rule Detective', component: RuleBasedApproach },
  { id: 'words', title: 'The Word Explorer', component: WordBasedApproach },
  { id: 'realworld', title: 'Real World Magic', component: RealWorldApps },
  { id: 'challenge', title: 'Final Challenge', component: FinalChallenge },
  { id: 'completion', title: 'Celebration!', component: Completion },
];

function App() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  const handleNext = () => {
    if (currentLesson < lessons.length - 1) {
      setCompletedLessons(prev => new Set([...prev, currentLesson]));
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleHome = () => {
    setCurrentLesson(0);
  };

  const CurrentComponent = lessons[currentLesson].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center  md:flex-row flex-col  space-x-3">
              <div className="bg-blue-500 p-2 rounded-full">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="md:text-2xl text-xl font-bold text-gray-800">Sentiment Analysis Adventure</h1>
                <p className="text-sm text-gray-600">Learning with AI Friends</p>
              </div>
            </div>
            <div className="flex items-center flex-col-reverse md:flex-row gap-4 space-x-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  {completedLessons.size}/{lessons.length - 1} lessons
                </span>
              </div>
              <button
                onClick={handleHome}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Lesson {currentLesson + 1} of {lessons.length}: {lessons[currentLesson].title}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentLesson + 1) / lessons.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentLesson + 1) / lessons.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
          <CurrentComponent onNext={handleNext} />
        </div>
      </main>

      {/* Navigation */}
      <footer className="bg-white border-t-4 border-blue-500 mt-8">
        <div className="max-w-7xl mx-auto px-2 md:px-4 py-6">
          <div className="flex items-center gap-1 justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentLesson === 0}
              className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentLesson === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 hover:bg-gray-600 text-white hover:shadow-lg'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {lessons.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                    index === currentLesson
                      ? 'bg-blue-500 scale-125'
                      : completedLessons.has(index)
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentLesson === lessons.length - 1}
              className={`flex items-center space-x-1 md:space-x-2  px-3 md:px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentLesson === lessons.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;