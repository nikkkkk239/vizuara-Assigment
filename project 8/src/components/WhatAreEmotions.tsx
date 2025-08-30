import React, { useState } from 'react';
import { Smile, Frown, Meh, CheckCircle, XCircle } from 'lucide-react';

interface WhatAreEmotionsProps {
  onNext: () => void;
}

const emotions = [
  { emoji: '😊', name: 'Happy', color: 'green', icon: Smile, description: 'Feeling joyful and positive' },
  { emoji: '😢', name: 'Sad', color: 'red', icon: Frown, description: 'Feeling down or upset' },
  { emoji: '😐', name: 'Neutral', color: 'gray', icon: Meh, description: 'Not particularly happy or sad' },
];

const messages = [
  { text: "I love playing with my friends!", emotion: "Happy", correct: false },
  { text: "This homework is so boring.", emotion: "Sad", correct: false },
  { text: "The weather is nice today.", emotion: "Neutral", correct: false },
  { text: "I can't wait for my birthday party!", emotion: "Happy", correct: false },
  { text: "I lost my favorite toy and I'm really upset.", emotion: "Sad", correct: false },
];

const WhatAreEmotions: React.FC<WhatAreEmotionsProps> = ({ onNext }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleEmotionSelect = (messageIndex: number, emotion: string) => {
    setSelectedAnswers(prev => ({ ...prev, [messageIndex]: emotion }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    messages.forEach((message, index) => {
      if (selectedAnswers[index] === message.emotion) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const canCheck = Object.keys(selectedAnswers).length === messages.length;

  return (
    <div className="p-2 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Story Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500 w-24 h-24 rounded-full flex items-center justify-center">
              <span className="text-4xl">🤖</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Understanding Emotions</h1>
          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong className="text-blue-600">Robo:</strong> "Hello, human friend! I'm trying to understand emotions, but I'm confused. 
              When humans write messages, how can I tell if they're feeling <span className="text-green-600 font-bold">happy</span>, 
              <span className="text-red-600 font-bold">sad</span>, or just <span className="text-gray-600 font-bold">neutral</span>? 
              Can you help me practice by looking at these messages?"
            </p>
          </div>
        </div>

        {/* Emotion Guide */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {emotions.map((emotion, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
              <div className="text-center">
                <div className="text-6xl mb-3">{emotion.emoji}</div>
                <h3 className={`text-xl font-bold text-${emotion.color}-600 mb-2`}>{emotion.name}</h3>
                <p className="text-gray-600 text-sm">{emotion.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Practice Exercise */}
        <div className="bg-gray-50 pb-3 md:p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Help Robo Practice! 🎯
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Read each message and click on the emotion you think it expresses
          </p>

          <div className="space-y-6">
            {messages.map((message, messageIndex) => (
              <div key={messageIndex} className="bg-white p-6 rounded-xl shadow-md">
                <div className="mb-4">
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-lg text-gray-800 font-medium">"{message.text}"</p>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    {emotions.map((emotion, emotionIndex) => {
                      const isSelected = selectedAnswers[messageIndex] === emotion.name;
                      const isCorrect = showResults && message.emotion === emotion.name;
                      const isWrong = showResults && isSelected && message.emotion !== emotion.name;
                      
                      return (
                        <button
                          key={emotionIndex}
                          onClick={() => !showResults && handleEmotionSelect(messageIndex, emotion.name)}
                          disabled={showResults}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            isSelected && !showResults
                              ? `border-${emotion.color}-500 bg-${emotion.color}-50`
                              : isCorrect
                              ? 'border-green-500 bg-green-50'
                              : isWrong
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50'
                          } ${!showResults ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                          <div className="text-3xl mb-2">{emotion.emoji}</div>
                          <div className={`font-medium ${
                            isSelected && !showResults
                              ? `text-${emotion.color}-700`
                              : isCorrect
                              ? 'text-green-700'
                              : isWrong
                              ? 'text-red-700'
                              : 'text-gray-700'
                          }`}>
                            {emotion.name}
                          </div>
                          {showResults && isCorrect && (
                            <CheckCircle className="h-6 w-6 text-green-500 mx-auto mt-2" />
                          )}
                          {showResults && isWrong && (
                            <XCircle className="h-6 w-6 text-red-500 mx-auto mt-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-8">
            {!showResults ? (
              <button
                onClick={checkAnswers}
                disabled={!canCheck}
                className={`px-8 py-4 rounded-xl font-bold text-xl transition-all duration-200 ${
                  canCheck
                    ? 'bg-green-500 hover:bg-green-600 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Check My Answers! ✨
              </button>
            ) : (
              <div>
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Your Score: {score}/{messages.length}
                  </h3>
                  {score === messages.length ? (
                    <div className="text-green-600">
                      <p className="text-lg font-medium">🎉 Perfect! You're a natural emotion detective!</p>
                      <p className="text-sm mt-2">Robo is amazed by your skills!</p>
                    </div>
                  ) : score >= Math.ceil(messages.length * 0.6) ? (
                    <div className="text-blue-600">
                      <p className="text-lg font-medium">🌟 Great job! You're getting the hang of this!</p>
                      <p className="text-sm mt-2">Robo is learning a lot from you!</p>
                    </div>
                  ) : (
                    <div className="text-orange-600">
                      <p className="text-lg font-medium">💪 Good effort! Emotions can be tricky!</p>
                      <p className="text-sm mt-2">Don't worry, Robo needs more practice too!</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={onNext}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Continue the Adventure! 🎯
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatAreEmotions;