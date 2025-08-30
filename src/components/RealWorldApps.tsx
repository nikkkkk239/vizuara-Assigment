import React, { useState } from 'react';
import { MessageCircle, ShoppingCart, Star, TrendingUp, Users, Globe } from 'lucide-react';

interface RealWorldAppsProps {
  onNext: () => void;
}

const applications = [
  {
    icon: MessageCircle,
    title: "Social Media Monitoring",
    description: "Companies check if people like their products by reading social media comments",
    example: "Reading Twitter comments about a new video game to see if players are happy or frustrated",
    color: "blue"
  },
  {
    icon: ShoppingCart,
    title: "Online Reviews",
    description: "Websites automatically sort product reviews to show the most helpful ones first",
    example: "Amazon uses sentiment analysis to highlight positive reviews and identify fake ones",
    color: "green"
  },
  {
    icon: Star,
    title: "Customer Service",
    description: "Companies prioritize urgent customer messages by detecting frustrated customers",
    example: "If someone writes 'I'm very angry about my order', the system alerts customer service immediately",
    color: "orange"
  },
  {
    icon: Users,
    title: "Mental Health Apps",
    description: "Apps that help people track their mood by analyzing their journal entries",
    example: "A diary app that notices when someone writes sad entries and suggests helpful resources",
    color: "purple"
  }
];

const interactiveDemo = {
  socialMedia: [
    { text: "This new iPhone is absolutely incredible! Best phone ever! 🔥", sentiment: "Very Positive", score: 5 },
    { text: "The battery life is terrible, phone dies so quickly 😞", sentiment: "Negative", score: -3 },
    { text: "Phone arrived today, looks exactly like the pictures", sentiment: "Neutral", score: 0 },
    { text: "Amazing camera quality! My photos look professional now! 📸✨", sentiment: "Very Positive", score: 4 }
  ],
  reviews: [
    { text: "Outstanding service! The staff was friendly and the food was delicious", sentiment: "Positive", score: 4 },
    { text: "Worst experience ever. Rude staff and cold food", sentiment: "Very Negative", score: -5 },
    { text: "Food was okay, nothing special but not bad either", sentiment: "Neutral", score: 0 },
    { text: "Great atmosphere but the music was too loud", sentiment: "Mixed", score: 1 }
  ]
};

const RealWorldApps: React.FC<RealWorldAppsProps> = ({ onNext }) => {
  const [selectedApp, setSelectedApp] = useState<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [demoType, setDemoType] = useState<'socialMedia' | 'reviews'>('socialMedia');

  const handleAppSelect = (index: number) => {
    setSelectedApp(index);
    if (index === 0) {
      setDemoType('socialMedia');
      setShowDemo(true);
    } else if (index === 1) {
      setDemoType('reviews');
      setShowDemo(true);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment.includes('Positive')) return 'text-green-600 bg-green-50';
    if (sentiment.includes('Negative')) return 'text-red-600 bg-red-50';
    if (sentiment === 'Mixed') return 'text-orange-600 bg-orange-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 space-x-4">
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center">
              <span className="text-2xl">💜</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Sentiment Analysis in the Real World</h1>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
            <p className="text-lg text-gray-700">
              <strong className="text-blue-600">Robo & Aida:</strong> "Now that you've taught us both techniques, 
              let's see how companies and websites use sentiment analysis every day to make the world better! 🌍"
            </p>
          </div>
        </div>

        {!showDemo ? (
          /* Applications Grid */
          <div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              Where is Sentiment Analysis Used? 🤔
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {applications.map((app, index) => (
                <div
                  key={index}
                  onClick={() => handleAppSelect(index)}
                  className={`bg-white p-6 rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                    index <= 1 
                      ? 'border-gray-200 hover:border-purple-400 hover:shadow-xl transform hover:scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-${app.color}-500`}>
                      <app.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{app.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{app.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 italic">"{app.example}"</p>
                    </div>
                    {index <= 1 && (
                      <div className="mt-4">
                        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                          Click to explore! 👆
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-100 p-6 rounded-xl text-center">
              <Globe className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-yellow-700 mb-2">Why This Matters</h3>
              <p className="text-lg text-yellow-700 leading-relaxed">
                Sentiment analysis helps make the internet a better place by understanding how people feel 
                and responding appropriately. It's like giving computers emotional intelligence! 🧠💝
              </p>
            </div>
          </div>
        ) : (
          /* Interactive Demo */
          <div>
            <div className="text-center mb-6">
              <button
                onClick={() => setShowDemo(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium mb-4 transition-colors duration-200"
              >
                ← Back to Applications
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                {demoType === 'socialMedia' ? 'Social Media Monitor' : 'Review Analyzer'}
              </h2>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Live {demoType === 'socialMedia' ? 'Social Media' : 'Review'} Analysis 📊
              </h3>
              
              <div className="space-y-4">
                {interactiveDemo[demoType].map((item, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-gray-800 font-medium">"{item.text}"</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className={`px-4 py-2 rounded-full font-bold ${getSentimentColor(item.sentiment)}`}>
                        {item.sentiment}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Score:</span>
                        <span className={`font-bold text-lg ${getScoreColor(item.score)}`}>
                          {item.score > 0 ? '+' : ''}{item.score}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-blue-600 mb-3">What happens next?</h4>
                <p className="text-gray-700 leading-relaxed">
                  {demoType === 'socialMedia' 
                    ? "The company sees that most people love the phone but some have battery concerns. They can now improve the battery in the next version!"
                    : "The restaurant owner sees the feedback patterns and knows to train staff on customer service and check the kitchen equipment."
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {!showDemo && (
          <div className="text-center mt-8">
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 md:px-8 md:py-4 py-2 rounded-xl font-bold text-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Ready for Your Final Challenge! 🏆
            </button>
          </div>
        )}
      </div>
    </div>
  );

  function getScoreColor(score: number): string {
    if (score > 0) return 'text-green-600';
    if (score < 0) return 'text-red-600';
    return 'text-gray-600';
  }
};

export default RealWorldApps;