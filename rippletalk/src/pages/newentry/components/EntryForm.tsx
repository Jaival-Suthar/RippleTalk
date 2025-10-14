import { useState } from 'react';

interface Props {
  onSubmit: (type: 'high' | 'low', content: string) => void;
  loading: boolean;
  error: string | null;
}

export const EntryForm = ({ onSubmit, loading, error }: Props) => {
  const [type, setType] = useState<'high' | 'low'>('high');
  const [content, setContent] = useState('');
  const [validationError, setValidationError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setCharCount(value.length);
    if (validationError) setValidationError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim().length < 5) {
      setValidationError('Please write at least 5 characters to capture your moment');
      return;
    }
    
    if (content.trim().length > 500) {
      setValidationError('Please keep your entry under 500 characters');
      return;
    }

    onSubmit(type, content);
    setContent('');
    setCharCount(0);
    setValidationError('');
  };

  const prompts = {
    high: [
      'What made you smile today?',
      'Describe a moment of joy...',
      'What are you grateful for?',
      'Share your win, big or small!',
    ],
    low: [
    "What's on your mind?",
    "It's okay to not be okay...",
    "What's weighing on you?",
    "Express what you're feeling...",
  ],
  };

  const getRandomPrompt = () => {
    const promptList = prompts[type];
    return promptList[Math.floor(Math.random() * promptList.length)];
  };

  const [placeholder, setPlaceholder] = useState(getRandomPrompt());

  const handleTypeChange = (newType: 'high' | 'low') => {
    setType(newType);
    setPlaceholder(prompts[newType][Math.floor(Math.random() * prompts[newType].length)]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">How are you feeling?</h2>
          <p className="text-gray-600 text-sm">Take a moment to reflect on your day</p>
        </div>

        {/* Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose your mood
          </label>
          <div className="grid grid-cols-2 gap-4">
            {/* High Button */}
            <button
              type="button"
              onClick={() => handleTypeChange('high')}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                type === 'high'
                  ? 'border-green-400 bg-green-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`text-3xl transition-transform ${type === 'high' ? 'scale-110' : ''}`}>
                  😊
                </div>
                <div className="text-left">
                  <p className={`font-semibold ${type === 'high' ? 'text-green-700' : 'text-gray-700'}`}>
                    High Moment
                  </p>
                  <p className="text-xs text-gray-500">Positive vibes</p>
                </div>
              </div>
              {type === 'high' && (
                <div className="absolute top-2 right-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>

            {/* Low Button */}
            <button
              type="button"
              onClick={() => handleTypeChange('low')}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                type === 'low'
                  ? 'border-blue-400 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`text-3xl transition-transform ${type === 'low' ? 'scale-110' : ''}`}>
                  💭
                </div>
                <div className="text-left">
                  <p className={`font-semibold ${type === 'low' ? 'text-blue-700' : 'text-gray-700'}`}>
                    Low Moment
                  </p>
                  <p className="text-xs text-gray-500">Reflective thoughts</p>
                </div>
              </div>
              {type === 'low' && (
                <div className="absolute top-2 right-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Your story
          </label>
          <div className="relative">
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder={placeholder}
              required
              rows={6}
              className={`w-full px-4 py-3 border-2 rounded-xl resize-none focus:outline-none transition-all ${
                validationError
                  ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200'
                  : type === 'high'
                  ? 'border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                  : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
              } placeholder-gray-400 text-gray-800`}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {charCount}/500
            </div>
          </div>
          
          {/* Character count indicator */}
          <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                charCount < 5
                  ? 'bg-gray-300'
                  : charCount > 500
                  ? 'bg-red-400'
                  : type === 'high'
                  ? 'bg-green-400'
                  : 'bg-blue-400'
              }`}
              style={{ width: `${Math.min((charCount / 500) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Error Messages */}
        {(validationError || error) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{validationError || error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || charCount < 5}
          className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
            type === 'high'
              ? 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600'
              : 'bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving your moment...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Entry
            </span>
          )}
        </button>

        {/* Helper Text */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Your entries are private and secure
        </p>
      </form>
    </div>
  );
};