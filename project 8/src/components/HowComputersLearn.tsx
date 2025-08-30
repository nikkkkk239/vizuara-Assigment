import React, { useState } from 'react';
import { Brain, Search, BookOpen, Lightbulb } from 'lucide-react';

interface HowComputersLearnProps {
  onNext: () => void;
}

const steps = [
  {
    icon: BookOpen,
    title: "Reading Like Humans",
    description: "Computers read text word by word, just like you do when reading a book!",
    example: "I love ice cream",
    highlight: ["I", "love", "ice", "cream"]
  },
  {
    icon: Search,
    title: "Looking for Clues",
    description: "They search for special words that give hints about emotions",
    example: "I love ice cream",
    highlight: ["love"]
  },
  {
    icon: Brain,
    title: "Making Decisions",
    description: "Based on the clues, they decide if the message is happy, sad, or neutral",
    example: "love = happy word → message is POSITIVE! 😊",
    highlight: []
  }
];

const HowComputersLearn: React.FC<HowComputersLearnProps> = ({ onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDemo, setShowDemo] = useState(false);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowDemo(true);
    }
  };

  const demoMessages = [
    { text: "This pizza tastes amazing!", words: ["This", "pizza", "tastes", "amazing", "!"], clueWord: "amazing", result: "Positive 😊" },
    { text: "I hate waiting in long lines", words: ["I", "hate", "waiting", "in", "long", "lines"], clueWord: "hate", result: "Negative 😢" },
    { text: "The book is on the table", words: ["The", "book", "is", "on", "the", "table"], clueWord: "none", result: "Neutral 😐" }
  ];

  const [currentDemo, setCurrentDemo] = useState(0);
  const [demoStep, setDemoStep] = useState(0);

  const nextDemo = () => {
    if (currentDemo < demoMessages.length - 1) {
      setCurrentDemo(currentDemo + 1);
      setDemoStep(0);
    }
  };

  const nextDemoStep = () => {
    if (demoStep < 3) {
      setDemoStep(demoStep + 1);
    } else if (currentDemo < demoMessages.length - 1) {
      nextDemo();
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-500 w-20 h-20 rounded-full flex items-center justify-center">
              <span className="text-3xl">💜</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">How Do Computers Understand Emotions?</h1>
          <div className="bg-purple-50 p-6 rounded-xl">
            <p className="text-lg text-gray-700">
              <strong className="text-purple-600">Aida:</strong> "Great job helping Robo! Now let me show you my secret - 
              how computers like me actually read and understand emotions in text. It's like being a detective! 🕵️‍♀️"
            </p>
          </div>
        </div>

        {!showDemo ? (
          /* Learning Steps */
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-500 ${
                    index <= currentStep
                      ? 'bg-white shadow-lg scale-105 border-2 border-purple-300'
                      : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      index <= currentStep ? 'bg-purple-500' : 'bg-gray-400'
                    }`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Step Detail */}
            {currentStep < steps.length && (
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">
                  Step {currentStep + 1}: {steps[currentStep].title}
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <p className="text-center text-gray-600 mb-4">Example:</p>
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 mb-4">
                      {currentStep < 2 ? (
                        <div className="flex flex-wrap justify-center gap-2">
                          {steps[currentStep].highlight.length > 0 ? 
                            steps[currentStep].example.split(' ').map((word, i) => (
                              <span
                                key={i}
                                className={`px-3 py-2 rounded-lg ${
                                  steps[currentStep].highlight.includes(word)
                                    ? 'bg-yellow-200 border-2 border-yellow-400 font-bold'
                                    : 'bg-gray-100'
                                }`}
                              >
                                {word}
                              </span>
                            )) :
                            <span className="text-lg font-medium text-gray-800">{steps[currentStep].example}</span>
                          }
                        </div>
                      ) : (
                        <p className="text-lg text-purple-600 font-bold">{steps[currentStep].example}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={handleNextStep}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-bold transform hover:scale-105 transition-all duration-200"
                  >
                    {currentStep < steps.length - 1 ? 'Next Step!' : 'See It In Action!'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Interactive Demo */
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Watch Aida Analyze Messages! 🔍
            </h2>
            
            <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
              <div className="text-center mb-6">
                <p className="text-lg text-gray-600 mb-4">
                  Message {currentDemo + 1} of {demoMessages.length}
                </p>
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  <p className="text-xl font-medium text-gray-800">
                    "{demoMessages[currentDemo].text}"
                  </p>
                </div>
              </div>

              {/* Step-by-step demo */}
              <div className="space-y-6">
                {demoStep >= 0 && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-blue-600 mb-3">Step 1: Breaking into words</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {demoMessages[currentDemo].words.map((word, i) => (
                        <span
                          key={i}
                          className="px-3 py-2 bg-blue-100 border border-blue-300 rounded-lg text-gray-800"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {demoStep >= 1 && (
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h4 className="font-bold text-yellow-600 mb-3">Step 2: Finding emotion clues</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {demoMessages[currentDemo].words.map((word, i) => (
                        <span
                          key={i}
                          className={`px-3 py-2 rounded-lg ${
                            word === demoMessages[currentDemo].clueWord
                              ? 'bg-yellow-200 border-2 border-yellow-400 font-bold animate-pulse'
                              : 'bg-gray-100 border border-gray-300'
                          } text-gray-800`}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                    {demoMessages[currentDemo].clueWord !== "none" && (
                      <p className="text-center mt-4 text-yellow-700 font-medium">
                        Found emotion word: "{demoMessages[currentDemo].clueWord}"
                      </p>
                    )}
                  </div>
                )}

                {demoStep >= 2 && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-green-600 mb-3">Step 3: Making the decision</h4>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-700">
                        Result: {demoMessages[currentDemo].result}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center mt-8">
                {demoStep < 3 ? (
                  <button
                    onClick={nextDemoStep}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transform hover:scale-105 transition-all duration-200"
                  >
                    Next Step!
                  </button>
                ) : currentDemo < demoMessages.length - 1 ? (
                  <button
                    onClick={nextDemo}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transform hover:scale-105 transition-all duration-200"
                  >
                    Try Another Message!
                  </button>
                ) : (
                  <div>
                    <div className="bg-green-100 p-6 rounded-xl mb-6">
                      <p className="text-lg text-green-700 font-medium">
                        🎉 Amazing! Now you understand how computers analyze emotions! 
                        Ready to learn the actual techniques they use?
                      </p>
                    </div>
                    <button
                      onClick={onNext}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Learn the Techniques! 🚀
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HowComputersLearn;