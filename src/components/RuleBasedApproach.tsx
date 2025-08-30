import React, { useState } from 'react';
import { Search, Plus, Trash2, CheckCircle } from 'lucide-react';

interface RuleBasedApproachProps {
  onNext: () => void;
}

const defaultRules = {
  positive: ['love', 'amazing', 'awesome', 'great', 'wonderful', 'happy', 'excited', 'fantastic'],
  negative: ['hate', 'terrible', 'awful', 'sad', 'angry', 'disappointed', 'horrible', 'worst'],
};

const testMessages = [
  "This game is absolutely amazing!",
  "I hate doing homework on weekends",
  "The weather is sunny today",
  "My dog is the most wonderful pet ever",
  "This movie was terrible and boring"
];

const RuleBasedApproach: React.FC<RuleBasedApproachProps> = ({ onNext }) => {
  const [rules, setRules] = useState(defaultRules);
  const [newWord, setNewWord] = useState('');
  const [selectedType, setSelectedType] = useState<'positive' | 'negative'>('positive');
  const [analyzedMessages, setAnalyzedMessages] = useState<{[key: number]: any}>({});
  const [showAnalysis, setShowAnalysis] = useState(false);

  const addWord = () => {
    if (newWord.trim()) {
      setRules(prev => ({
        ...prev,
        [selectedType]: [...prev[selectedType], newWord.trim().toLowerCase()]
      }));
      setNewWord('');
    }
  };

  const removeWord = (type: 'positive' | 'negative', index: number) => {
    setRules(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const analyzeMessage = (message: string) => {
    const words = message.toLowerCase().split(/\s+/);
    const foundPositive = words.filter(word => rules.positive.includes(word));
    const foundNegative = words.filter(word => rules.negative.includes(word));
    
    let sentiment = 'Neutral 😐';
    let score = foundPositive.length - foundNegative.length;
    let clueWords = [...foundPositive, ...foundNegative];
    
    if (score > 0) sentiment = 'Positive 😊';
    else if (score < 0) sentiment = 'Negative 😢';
    
    return { sentiment, foundPositive, foundNegative, clueWords, score };
  };

  const analyzeAllMessages = () => {
    const results: {[key: number]: any} = {};
    testMessages.forEach((message, index) => {
      results[index] = analyzeMessage(message);
    });
    setAnalyzedMessages(results);
    setShowAnalysis(true);
  };

  const resetAnalysis = () => {
    setAnalyzedMessages({});
    setShowAnalysis(false);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">The Rule Detective Method</h1>
          <div className="bg-blue-50 p-6 rounded-xl">
            <p className="text-lg text-gray-700">
              <strong className="text-blue-600">Robo:</strong> "I've learned my first technique! I create lists of 
              happy words and sad words, then I count them in messages. Want to help me build my word lists 
              and test them? 🕵️‍♂️"
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-8">
          {/* Word Lists */}
          <div className="space-y-6 w-full">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Robo's Word Lists 📝</h2>
            
            {/* Add New Word */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Words</h3>
              <div className="flex flex-wrap gap-4 mb-4">
                <input
                  type="text"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="Enter a word..."
                  className="flex-1 px-2 md:px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && addWord()}
                />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as 'positive' | 'negative')}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="positive">Happy Words</option>
                  <option value="negative">Sad Words</option>
                </select>
                <button
                  onClick={addWord}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Positive Words */}
            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center">
                <span className="mr-2">😊</span>
                Happy Words ({rules.positive.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {rules.positive.map((word, index) => (
                  <div
                    key={index}
                    className="bg-green-100 border border-green-300 px-3 py-1 rounded-full flex items-center space-x-2"
                  >
                    <span className="text-green-700">{word}</span>
                    <button
                      onClick={() => removeWord('positive', index)}
                      className="text-green-500 hover:text-green-700 transition-colors duration-200"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Negative Words */}
            <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
              <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center">
                <span className="mr-2">😢</span>
                Sad Words ({rules.negative.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {rules.negative.map((word, index) => (
                  <div
                    key={index}
                    className="bg-red-100 border border-red-300 px-3 py-1 rounded-full flex items-center space-x-2"
                  >
                    <span className="text-red-700">{word}</span>
                    <button
                      onClick={() => removeWord('negative', index)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testing Area */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Test Robo's Skills! 🎯</h2>
            
            <div className="bg-white p-3 md:p-6 rounded-xl shadow-lg">
              <div className="space-y-4 mb-6">
                {testMessages.map((message, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-gray-800 font-medium">"{message}"</p>
                    </div>
                    
                    {showAnalysis && analyzedMessages[index] && (
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {message.split(' ').map((word, wordIndex) => {
                            const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
                            const isPositive = rules.positive.includes(cleanWord);
                            const isNegative = rules.negative.includes(cleanWord);
                            
                            return (
                              <span
                                key={wordIndex}
                                className={`px-2 py-1 rounded ${
                                  isPositive
                                    ? 'bg-green-200 border border-green-400 text-green-800'
                                    : isNegative
                                    ? 'bg-red-200 border border-red-400 text-red-800'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </div>
                        
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">
                            Happy words found: {analyzedMessages[index].foundPositive.length > 0 
                              ? analyzedMessages[index].foundPositive.join(', ') 
                              : 'none'}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            Sad words found: {analyzedMessages[index].foundNegative.length > 0 
                              ? analyzedMessages[index].foundNegative.join(', ') 
                              : 'none'}
                          </p>
                          <p className="text-lg font-bold text-center">
                            Result: {analyzedMessages[index].sentiment}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center space-y-4">
                {!showAnalysis ? (
                  <button
                    onClick={analyzeAllMessages}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <Search className="h-5 w-5" />
                    <span>Analyze All Messages!</span>
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={resetAnalysis}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium mr-4 transition-colors duration-200"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={onNext}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Learn Advanced Technique! 🎓
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showAnalysis && (
          <div className="mt-8 bg-blue-50 p-6 rounded-xl">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">You've mastered the Rule Detective method!</h3>
              <p className="text-gray-600">
                This technique works by counting positive and negative words. Simple but effective! 
                Ready to learn an even smarter approach?
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RuleBasedApproach;