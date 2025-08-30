import React, { useState } from 'react';
import { Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface WordBasedApproachProps {
  onNext: () => void;
}

// Sentiment scores for words (simplified version)
const sentimentScores: {[key: string]: number} = {
  // Positive words
  'love': 3, 'amazing': 3, 'awesome': 3, 'wonderful': 3, 'fantastic': 3, 'excellent': 3,
  'great': 2, 'good': 2, 'happy': 2, 'nice': 2, 'beautiful': 2, 'perfect': 3,
  'like': 1, 'okay': 1, 'fine': 1,
  
  // Negative words
  'hate': -3, 'terrible': -3, 'awful': -3, 'horrible': -3, 'worst': -3,
  'bad': -2, 'sad': -2, 'angry': -2, 'disappointed': -2, 'ugly': -2,
  'dislike': -1, 'boring': -1, 'meh': -1,
  
  // Neutral words
  'the': 0, 'is': 0, 'and': 0, 'or': 0, 'but': 0, 'a': 0, 'an': 0,
};

const testSentences = [
  "I love this amazing ice cream!",
  "This homework is terrible and boring",
  "The cat is sleeping on the chair",
  "What a wonderful and beautiful day!",
  "I hate waiting in long lines"
];

const WordBasedApproach: React.FC<WordBasedApproachProps> = ({ onNext }) => {
  const [selectedSentence, setSelectedSentence] = useState<string>('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const analyzeSentence = (sentence: string) => {
    const words = sentence.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    const wordAnalysis = words.map(word => ({
      word: word,
      score: sentimentScores[word] || 0,
      type: sentimentScores[word] > 0 ? 'positive' : sentimentScores[word] < 0 ? 'negative' : 'neutral'
    }));
    
    const totalScore = wordAnalysis.reduce((sum, item) => sum + item.score, 0);
    const avgScore = totalScore / words.length;
    
    let sentiment = 'Neutral 😐';
    let confidence = 'Medium';
    
    if (totalScore > 1) {
      sentiment = 'Positive 😊';
      confidence = totalScore > 3 ? 'High' : 'Medium';
    } else if (totalScore < -1) {
      sentiment = 'Negative 😢';
      confidence = totalScore < -3 ? 'High' : 'Medium';
    }
    
    return {
      words: wordAnalysis,
      totalScore,
      avgScore: Math.round(avgScore * 100) / 100,
      sentiment,
      confidence,
      positiveWords: wordAnalysis.filter(w => w.score > 0),
      negativeWords: wordAnalysis.filter(w => w.score < 0),
      neutralWords: wordAnalysis.filter(w => w.score === 0)
    };
  };

  const handleAnalyze = (sentence: string) => {
    setSelectedSentence(sentence);
    const result = analyzeSentence(sentence);
    setAnalysis(result);
    setShowSteps(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 0) return 'text-green-600';
    if (score < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getScoreIcon = (score: number) => {
    if (score > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (score < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-500 w-20 h-20 rounded-full flex items-center justify-center">
              <span className="text-3xl">💜</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">The Word Explorer Method</h1>
          <div className="bg-purple-50 p-6 rounded-xl">
            <p className="text-lg text-gray-700">
              <strong className="text-purple-600">Aida:</strong> "I have a more advanced technique! Instead of just 
              counting words, I give each word a special number score. Happy words get positive points, 
              sad words get negative points. Then I add them all up! 🧮"
            </p>
          </div>
        </div>

        {!showSteps ? (
          /* Sentence Selection */
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Choose a sentence to analyze:</h2>
            
            <div className="grid gap-4">
              {testSentences.map((sentence, index) => (
                <button
                  key={index}
                  onClick={() => handleAnalyze(sentence)}
                  className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-purple-400 hover:shadow-xl transform hover:scale-102 transition-all duration-200 text-left"
                >
                  <p className="text-lg text-gray-800 font-medium">"{sentence}"</p>
                </button>
              ))}
            </div>

            <div className="bg-yellow-100 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-yellow-700 mb-2">How Word Scoring Works:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-green-100 p-4 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-bold text-green-700">Positive Words</p>
                  <p className="text-sm text-green-600">+1 to +3 points</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg">
                  <TrendingDown className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="font-bold text-red-700">Negative Words</p>
                  <p className="text-sm text-red-600">-1 to -3 points</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <Minus className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                  <p className="font-bold text-gray-700">Neutral Words</p>
                  <p className="text-sm text-gray-600">0 points</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Step-by-step Analysis */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Analyzing: "{selectedSentence}"</h2>
              <div className="flex justify-center space-x-4 mb-6">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      step <= currentStep
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step + 1}
                  </div>
                ))}
              </div>
            </div>

            {analysis && (
              <div className="space-y-6">
                {/* Step 1: Word Breakdown */}
                {currentStep >= 0 && (
                  <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-blue-600 mb-4">Step 1: Break into words</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {analysis.words.map((item: any, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-100 border border-blue-300 rounded-lg text-gray-800 font-medium"
                        >
                          {item.word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Assign Scores */}
                {currentStep >= 1 && (
                  <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                    <h3 className="text-xl font-bold text-yellow-600 mb-4">Step 2: Assign emotion scores</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {analysis.words.map((item: any, index: number) => (
                        <div
                          key={index}
                          className={`px-4 py-3 rounded-lg border-2 font-medium flex items-center space-x-2 ${
                            item.score > 0
                              ? 'bg-green-100 border-green-300 text-green-700'
                              : item.score < 0
                              ? 'bg-red-100 border-red-300 text-red-700'
                              : 'bg-gray-100 border-gray-300 text-gray-600'
                          }`}
                        >
                          <span>{item.word}</span>
                          <div className="flex items-center space-x-1">
                            {getScoreIcon(item.score)}
                            <span className={`font-bold ${getScoreColor(item.score)}`}>
                              {item.score > 0 ? '+' : ''}{item.score}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Calculate Total */}
                {currentStep >= 2 && (
                  <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                    <h3 className="text-xl font-bold text-green-600 mb-4">Step 3: Add up all the scores</h3>
                    <div className="text-center">
                      <div className="bg-white p-6 rounded-xl shadow-md mb-4">
                        <div className="text-3xl font-bold mb-2">
                          {analysis.positiveWords.length > 0 && (
                            <span className="text-green-600">
                              +{analysis.positiveWords.reduce((sum: number, w: any) => sum + w.score, 0)}
                            </span>
                          )}
                          {analysis.positiveWords.length > 0 && analysis.negativeWords.length > 0 && (
                            <span className="text-gray-400 mx-2">+</span>
                          )}
                          {analysis.negativeWords.length > 0 && (
                            <span className="text-red-600">
                              ({Math.abs(analysis.negativeWords.reduce((sum: number, w: any) => sum + w.score, 0))})
                            </span>
                          )}
                          <span className="text-gray-400 mx-2">=</span>
                          <span className={`${getScoreColor(analysis.totalScore)}`}>
                            {analysis.totalScore}
                          </span>
                        </div>
                        <p className="text-gray-600">Total Emotion Score</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Final Result */}
                {currentStep >= 3 && (
                  <div className="bg-purple-50 p-8 rounded-xl border-2 border-purple-200">
                    <h3 className="text-xl font-bold text-purple-600 mb-4">Step 4: Final result</h3>
                    <div className="text-center">
                      <div className="bg-white p-8 rounded-xl shadow-lg">
                        <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                        <h4 className="text-3xl font-bold text-gray-800 mb-2">
                          {analysis.sentiment}
                        </h4>
                        <p className="text-lg text-gray-600 mb-4">
                          Confidence: {analysis.confidence}
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">
                            Score: {analysis.totalScore} | Average: {analysis.avgScore}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="text-center">
                  {currentStep < 3 ? (
                    <button
                      onClick={nextStep}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-bold transform hover:scale-105 transition-all duration-200"
                    >
                      Next Step!
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-100 p-6 rounded-xl">
                        <p className="text-lg text-green-700 font-medium">
                          🎉 Excellent! You now understand how word scoring works! 
                          This method gives more detailed results than simple counting.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setAnalysis(null);
                          setShowSteps(false);
                          setSelectedSentence('');
                          setCurrentStep(0);
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium mr-4 transition-colors duration-200"
                      >
                        Try Another Sentence
                      </button>
                      <button
                        onClick={onNext}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        See Real-World Magic! ✨
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordBasedApproach;