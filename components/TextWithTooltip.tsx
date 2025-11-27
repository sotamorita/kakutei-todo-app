import React, { useState, useRef, useEffect } from 'react';
import { GLOSSARY } from '../data';

interface TooltipProps {
  term: string;
  description: string;
}

const Tooltip: React.FC<TooltipProps> = ({ term, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close tooltip if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const toggleTooltip = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent event bubbling to avoid immediate closing or other side effects
    e.stopPropagation();
    // On mobile, this allows tapping the text to toggle
    setIsOpen(!isOpen);
  };

  return (
    <span
      className="inline-flex items-center group relative align-text-bottom cursor-pointer"
      ref={tooltipRef}
      onClick={toggleTooltip}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`${term}の解説を表示`}
    >
      <span className="font-semibold text-gray-800 border-b border-gray-300 border-dashed mr-1 transition-colors group-hover:border-blue-500 group-hover:text-blue-700">
        {term}
      </span>
      <span
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-gray-500 group-hover:bg-blue-500 group-hover:text-white transition-colors focus:outline-none"
      >
        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>

      {/* Tooltip Popup */}
      {isOpen && (
        <div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[90vw] md:max-w-xs p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50 text-left leading-relaxed animate-fade-in"
          style={{ minWidth: '200px', width: 'max-content' }}
          onClick={(e) => e.stopPropagation()} 
        >
          <div className="font-bold mb-1 text-blue-300">{term}とは？</div>
          <div className="whitespace-normal">{description}</div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </span>
  );
};

interface TextWithTooltipProps {
  text: string;
}

const TextWithTooltip: React.FC<TextWithTooltipProps> = ({ text }) => {
  // Sort keys by length (descending) to match longest terms first
  const keys = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  
  // Create regex that matches any key. Use 'g' for multiple occurrences.
  const regex = new RegExp(`(${keys.join('|')})`, 'g');

  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        if (GLOSSARY[part]) {
          return <Tooltip key={index} term={part} description={GLOSSARY[part]} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

export default TextWithTooltip;