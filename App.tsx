import React, { useState } from 'react';
import Wizard from './components/Wizard';
import ActionPlan from './components/ActionPlan';
import { QUESTIONS, TASKS } from './data';
import { Task } from './types';

function App() {
  const [step, setStep] = useState<'welcome' | 'wizard' | 'plan'>('welcome');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [myTasks, setMyTasks] = useState<Task[]>([]);

  const startWizard = () => {
    setStep('wizard');
    setAnswers({});
    setMyTasks([]);
  };

  const handleWizardComplete = (userAnswers: Record<string, string>) => {
    setAnswers(userAnswers);
    
    // Logic to generate tasks based on answers
    const selectedTaskIds = new Set<string>();

    // Iterate through questions to find selected options and their tasks
    QUESTIONS.forEach((q) => {
      const selectedOptionId = userAnswers[q.id];
      if (selectedOptionId) {
        const option = q.options.find((opt) => opt.id === selectedOptionId);
        if (option && option.addTasks) {
          option.addTasks.forEach((taskId) => selectedTaskIds.add(taskId));
        }
      }
    });

    // Map IDs to Task objects
    const generatedTasks: Task[] = Array.from(selectedTaskIds)
      .map((id) => TASKS[id])
      .filter((task) => task !== undefined); // Safety check

    setMyTasks(generatedTasks);
    setStep('plan');
  };

  const goHome = () => {
    setStep('welcome');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={goHome}
            className="flex items-center hover:opacity-80 transition-opacity focus:outline-none"
          >
            {/* Custom Logo Icon */}
            <div className="bg-blue-600 p-1.5 rounded-lg mr-3 shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              確定申告ナビ
            </h1>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 flex flex-col">
        {step === 'welcome' && (
          <div className="flex-grow flex flex-col items-center justify-center px-4 py-6 text-center">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl max-w-lg border border-gray-100 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              
              {/* Welcome Icon */}
              <div className="mb-6 relative inline-block">
                <div className="absolute inset-0 bg-blue-100 rounded-full transform scale-110"></div>
                <svg className="w-16 h-16 text-blue-600 relative z-10 p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                <span className="inline-block">あなたの確定申告、</span>
                <span className="inline-block">何から始めればいい？</span>
              </h2>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                <span className="inline-block">いくつかの質問に答えるだけで、</span>
                <span className="inline-block">AIがあなたに必要な</span>
                <span className="inline-block">作業リストを自動作成。</span>
                <br className="hidden md:inline" />
                <span className="inline-block">最新の税務情報もチェックして、</span>
                <span className="inline-block">申告漏れを防ぎましょう。</span>
              </p>
              <button
                onClick={startWizard}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl text-lg flex items-center justify-center"
              >
                <span>プランを作成する</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 'wizard' && (
          <Wizard onComplete={handleWizardComplete} />
        )}

        {step === 'plan' && (
          <ActionPlan
            tasks={myTasks}
            answers={answers}
            onRestart={() => setStep('welcome')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} 確定申告ナビ. Powered by Google Gemini.</p>
          <p className="mt-1">※本アプリは一般的な情報提供を目的としています。個別の税務判断については税務署または税理士にご相談ください。</p>
        </div>
      </footer>
    </div>
  );
}

export default App;