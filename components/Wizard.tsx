import React, { useState } from 'react';
import { QUESTIONS } from '../data';
import { Question, Option } from '../types';
import TextWithTooltip from './TextWithTooltip';

interface WizardProps {
  onComplete: (answers: Record<string, string>) => void;
}

const Wizard: React.FC<WizardProps> = ({ onComplete }) => {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(QUESTIONS[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<string[]>([]);
  const [isGuideOpen, setIsGuideOpen] = useState(false); // State for guide accordion

  const currentQuestion = QUESTIONS.find((q) => q.id === currentQuestionId);

  // Reset guide state when changing questions
  React.useEffect(() => {
    setIsGuideOpen(false);
  }, [currentQuestionId]);

  const handleOptionSelect = (option: Option) => {
    const newAnswers = { ...answers, [currentQuestionId]: option.id };
    setAnswers(newAnswers);

    if (option.nextQuestionId) {
      setHistory([...history, currentQuestionId]);
      setCurrentQuestionId(option.nextQuestionId);
    } else {
      // Finished
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    const prevQuestionId = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    setCurrentQuestionId(prevQuestionId);
  };

  if (!currentQuestion) return null;

  // Calculate progress
  const currentStepIndex = QUESTIONS.findIndex(q => q.id === currentQuestionId);
  const totalSteps = QUESTIONS.length;
  const progress = Math.min(((currentStepIndex + 1) / totalSteps) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            質問 {currentStepIndex + 1}
          </span>
          <h2 className="text-2xl font-bold text-gray-900 leading-snug text-jp-fix">
            <TextWithTooltip text={currentQuestion.text} />
          </h2>
        </div>

        {/* Guide / Accordion Section */}
        {(currentQuestion.guide || currentQuestion.referenceUrl) && (
          <div className="mb-8">
            <button
              onClick={() => setIsGuideOpen(!isGuideOpen)}
              className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 focus:outline-none transition-colors w-full text-left py-2 p-2 -ml-2 rounded-lg hover:bg-gray-50"
            >
              <svg
                className={`w-4 h-4 mr-1 transition-transform ${isGuideOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {isGuideOpen ? 'ガイドを閉じる' : 'この質問の対象かわからない場合'}
            </button>
            
            {isGuideOpen && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700 animate-fade-in">
                {currentQuestion.guide && (
                  <div className="mb-3 leading-relaxed text-jp-fix">
                    <span className="font-bold text-gray-900 block mb-1">💡 チェックポイント</span>
                    <TextWithTooltip text={currentQuestion.guide} />
                  </div>
                )}
                {currentQuestion.referenceUrl && (
                  <a
                    href={currentQuestion.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline mt-1 p-1 -ml-1"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {currentQuestion.referenceLabel || '公式情報を確認する（国税庁など）'}
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className="w-full text-left px-6 py-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group flex items-center justify-between active:bg-blue-100"
            >
              <span className="text-lg font-medium text-gray-700 group-hover:text-blue-700">
                {option.label}
              </span>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {history.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleBack}
              className="text-gray-500 hover:text-gray-700 font-medium flex items-center p-2 -ml-2"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              前の質問に戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wizard;