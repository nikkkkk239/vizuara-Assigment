import React, { useState } from 'react';
import { Trophy, Target, CheckCircle, XCircle, Zap } from 'lucide-react';

interface FinalChallengeProps {
  onNext: () => void;
}

const challenges = [
  {
    message: "I absolutely love this new video game! It's so much fun and the graphics are amazing!",
    options: ["Very Positive", "Positive", "Neutral", "Negative"],
    correct: 0,
    explanation: "Words like 'absolutely love', 'fun', and 'amazing' show very strong positive emotions!"
  },
  {
    message: "The weather today is cloudy with a chance of rain later",
    options: ["Positive", "Neutral", "Negative", "Very Negative"],
    correct: 1,
    explanation: "This is just sharing information about weather - no emotional words present."
  },
  {
    message: "I'm so disappointed and frustrated with this broken app",
    options: ["Positive", "Neutral", "Negative", "Very Negative"],
    correct: 2,
    explanation: "Words like 'disappointed', 'frustrated', and 'broken' clearly express negative feelings."
  },
  {
    message: "This pizza is good but I wish it had more cheese",
    options: ["Very Positive", "Positive", "Mixed/Neutral", "Negative"],
    correct: 2,
    explanation: "Contains both positive ('good') and negative ('wish it had more') elements, making it mixed."
  },
  {
    message: "Thank you so much! Your help was wonderful and I really appreciate it!",
    options: ["Positive", "Very Positive", "Neutral", "Mixed"],
    correct: 1,
    explanation: "Multiple strong positive words: 'thank you', 'wonderful', 'appreciate' show very positive sentiment."
  }
];

const FinalChallenge: React.FC<FinalChallengeProps> = ({ onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowResult(true);
    
    if (answerIndex === challenges[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < challenges.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  };

  const restartChallenge = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / challenges.length) * 100);
    
    return (
      <div className="p-4 md:p-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Trophy className="h-24 w-24 text-yellow-500 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Challenge Complete!</h1>
            
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-2xl mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Your Score: {score}/{challenges.length} ({percentage}%)
              </h2>
              
              {percentage === 100 ? (
                <div className="text-green-600">
                  <p className="text-xl font-bold mb-2">🏆 PERFECT SCORE! 🏆</p>
                  <p className="text-lg">You're now a certified Emotion Detective! Robo and Aida are so proud of you!</p>
                </div>
              ) : percentage >= 80 ? (
                <div className="text-blue-600">
                  <p className="text-xl font-bold mb-2">🌟 EXCELLENT WORK! 🌟</p>
                  <p className="text-lg">You've mastered sentiment analysis! You're ready to help AI understand emotions!</p>
                </div>
              ) : percentage >= 60 ? (
                <div className="text-orange-600">
                  <p className="text-xl font-bold mb-2">💪 GREAT EFFORT! 💪</p>
                  <p className="text-lg">You understand the basics well! With more practice, you'll be an expert!</p>
                </div>
              ) : (
                <div className="text-purple-600">
                  <p className="text-xl font-bold mb-2">🎯 KEEP LEARNING! 🎯</p>
                  <p className="text-lg">Sentiment analysis takes practice! You're on the right track!</p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-600 mb-2">🤖 Robo says:</h3>
                <p className="text-gray-700">"Thank you for teaching me about emotions! Now I can help humans better by understanding how they feel!"</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-lg font-bold text-purple-600 mb-2">💜 Aida says:</h3>
                <p className="text-gray-700">"You've learned both rule-based and word-scoring methods! You're ready to build your own emotion detectors!"</p>
              </div>
            </div>

            <div className="space-x-4">
              <button
                onClick={restartChallenge}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-200"
              >
                Try Again
              </button>
              <button
                onClick={onNext}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Celebrate Your Success! 🎉
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center">
              <Trophy className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Final Challenge: Emotion Detective Test! 🕵️‍♀️</h1>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
            <p className="text-lg text-gray-700">
              Time to show off your skills! Help Robo and Aida by analyzing these tricky messages. 
              Use everything you've learned about detecting emotions in text!
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-gray-800">
              Question {currentQuestion + 1} of {challenges.length}
            </span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / challenges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <Target className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Analyze this message:
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
              <p className="text-xl text-gray-800 font-medium leading-relaxed">
                "{challenges[currentQuestion].message}"
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {challenges[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              const isCorrect = showResult && index === challenges[currentQuestion].correct;
              const isWrong = showResult && isSelected && index !== challenges[currentQuestion].correct;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`p-6 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${
                    isCorrect
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : isWrong
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : isSelected
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-orange-400 hover:bg-orange-50'
                  } ${!showResult ? 'cursor-pointer transform hover:scale-105' : 'cursor-default'}`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{option}</span>
                    {isCorrect && <CheckCircle className="h-6 w-6 text-green-500" />}
                    {isWrong && <XCircle className="h-6 w-6 text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Result and Explanation */}
          {showResult && (
            <div className="space-y-6">
              <div className={`p-6 rounded-xl border-2 ${
                selectedAnswers[currentQuestion] === challenges[currentQuestion].correct
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              }`}>
                <div className="text-center">
                  {selectedAnswers[currentQuestion] === challenges[currentQuestion].correct ? (
                    <div className="text-green-600">
                      <CheckCircle className="h-12 w-12 mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-2">Correct! 🎉</h3>
                      <p>You're getting really good at this!</p>
                    </div>
                  ) : (
                    <div className="text-red-600">
                      <XCircle className="h-12 w-12 mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-2">Not quite right 🤔</h3>
                      <p>That's okay! Sentiment analysis can be tricky sometimes!</p>
                    </div>
                  )}
                </div>
              </div>

              {!showExplanation ? (
                <div className="text-center">
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-200"
                  >
                    Show Explanation 🔍
                  </button>
                </div>
              ) : (
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-600 mb-3">💡 Explanation:</h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {challenges[currentQuestion].explanation}
                  </p>
                  <div className="text-center">
                    <button
                      onClick={nextQuestion}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transform hover:scale-105 transition-all duration-200"
                    >
                      {currentQuestion < challenges.length - 1 ? 'Next Question!' : 'See Final Results!'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalChallenge;