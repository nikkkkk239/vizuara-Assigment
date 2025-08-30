import React from 'react';
import { Trophy, Star, Medal, Sparkles, Heart, Brain } from 'lucide-react';

interface CompletionProps {
  onNext: () => void;
}

const achievements = [
  { icon: Brain, title: "Emotion Expert", description: "You understand how emotions work in text!" },
  { icon: Star, title: "Rule Detective", description: "You mastered the word list technique!" },
  { icon: Sparkles, title: "Word Explorer", description: "You learned advanced word scoring!" },
  { icon: Medal, title: "Real-World Hero", description: "You see how sentiment analysis helps everyone!" }
];

const Completion: React.FC<CompletionProps> = ({ onNext }) => {
  return (
    <div className="p-4 md:p-8 text-center">
      <div className="max-w-5xl mx-auto">
        {/* Celebration Header */}
        <div className="mb-8">
          <div className="flex justify-center mb-6 space-x-4">
            <div className="bg-yellow-500 w-24 h-24 rounded-full flex items-center justify-center animate-bounce">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-3xl">🤖</span>
            </div>
            <div className="bg-purple-500 w-20 h-20 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-3xl">💜</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Congratulations, Emotion Detective! 🎉
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            You've successfully completed the Sentiment Analysis Adventure!
          </p>
        </div>

        {/* Character Messages */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-2xl">
            <div className="bg-blue-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">Robo's Message</h3>
            <p className="text-gray-700 leading-relaxed">
              "Thank you for teaching me about emotions! Now I can help humans better by understanding 
              if they're happy, sad, or need extra help. You're an amazing teacher! 🎓"
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-8 rounded-2xl">
            <div className="bg-purple-500 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">💜</span>
            </div>
            <h3 className="text-xl font-bold text-purple-800 mb-3">Aida's Message</h3>
            <p className="text-gray-700 leading-relaxed">
              "You've learned both simple and advanced techniques! Now you know the secrets behind 
              how AI understands human emotions. You could build your own sentiment analyzer! 🚀"
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Achievements 🏆</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center">
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What You Learned */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What You've Mastered 📚</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-lg font-bold text-green-600 mb-3">Concepts</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>What sentiment analysis is</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  <span>How computers read emotions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Real-world applications</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-600 mb-3">Techniques</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                  <span>Rule-based word counting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
                  <span>Advanced word scoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                  <span>Practical implementation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Fun Facts About Sentiment Analysis! 🔥</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🌐</div>
              <h3 className="font-bold text-gray-800 mb-2">5 Billion</h3>
              <p className="text-sm text-gray-600">Social media posts analyzed for sentiment every day!</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">0.1 Seconds</h3>
              <p className="text-sm text-gray-600">How fast AI can analyze a message's emotion!</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">85% Accurate</h3>
              <p className="text-sm text-gray-600">How accurate modern sentiment analysis can be!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completion;