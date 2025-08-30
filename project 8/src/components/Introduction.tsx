import React from 'react';
import { Zap, Heart, Frown, Smile } from 'lucide-react';

interface IntroductionProps {
  onNext: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onNext }) => {
  return (
    <div className="p-8 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-full animate-pulse">
                <Zap className="h-16 w-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full animate-bounce">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to the Sentiment Analysis Adventure!
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Meet your AI friends who need your help learning about human emotions
          </p>
        </div>

        {/* Characters */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
            <div className="bg-blue-500 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Robo</h3>
            <p className="text-gray-700 leading-relaxed">
              A curious robot who wants to understand human emotions but gets confused by words and feelings. 
              Robo needs your help to learn how to detect if someone is happy, sad, or angry just by reading their messages!
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
            <div className="bg-purple-500 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-purple-800 mb-2">Aida</h3>
            <p className="text-gray-700 leading-relaxed">
              An AI assistant who's learning to be more helpful by understanding emotions in text. 
              Aida wants to know if a message is positive, negative, or neutral so she can respond appropriately!
            </p>
          </div>
        </div>

        {/* Story Setup */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <span className="mr-3">🌟</span>
            The Mission
            <span className="ml-3">🌟</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Robo and Aida have received thousands of messages from humans, but they can't tell if people are 
            happy, sad, or angry! They need your help to learn <strong className="text-orange-600">Sentiment Analysis</strong> - 
            the special skill of understanding emotions in text.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Together, we'll go on an adventure to teach them different ways to detect feelings in messages. 
            Are you ready to become an Emotion Detective? 🕵️‍♀️
          </p>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">What You'll Learn:</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
              <Smile className="h-8 w-8 text-green-500" />
              <span className="font-medium text-gray-700">Detect Happy Messages</span>
            </div>
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
              <Frown className="h-8 w-8 text-red-500" />
              <span className="font-medium text-gray-700">Spot Sad Messages</span>
            </div>
            <div className="flex items-center space-x-3 bg-white p-4 rounded-lg">
              <Zap className="h-8 w-8 text-blue-500" />
              <span className="font-medium text-gray-700">Build AI Helpers</span>
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-4 rounded-full text-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Start the Adventure! 🚀
        </button>
      </div>
    </div>
  );
};

export default Introduction;