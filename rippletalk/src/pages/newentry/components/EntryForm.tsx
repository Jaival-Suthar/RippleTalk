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
  <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10">
    {/* Header */}
    <div className="mb-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">How are you feeling?</h2>
      <p className="text-gray-600 text-sm">Take a moment to reflect on your day</p>
    </div>

    {/* Type Selection */}
    <div className="mb-8">
      <label className="block text-lg font-bold text-gray-800 mb-4">Choose your mood</label>
      <div className="grid grid-cols-2 gap-6">
        {/* High */}
        <button
          type="button"
          onClick={() => handleTypeChange('high')}
          className={`relative p-6 rounded-2xl border-4 transition-all duration-300 flex items-center gap-6 shadow-lg select-none ${
            type === 'high'
              ? 'border-green-500 bg-green-100 scale-105 shadow-green-400/60'
              : 'border-gray-300 bg-white hover:border-green-400'
          }`}
          aria-pressed={type === 'high'}
        >
          <div className={`text-4xl ${type === 'high' ? 'scale-110' : ''}`}>😊</div>
          <div>
            <p className={`font-bold text-lg ${type === 'high' ? 'text-green-700' : 'text-gray-800'}`}>High Moment</p>
            <p className="text-xs text-gray-500">Positive vibes</p>
          </div>
          {type === 'high' && (
            <div className="absolute top-4 right-4 text-green-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>

        {/* Low */}
        <button
          type="button"
          onClick={() => handleTypeChange('low')}
          className={`relative p-6 rounded-2xl border-4 transition-all duration-300 flex items-center gap-6 shadow-lg select-none ${
            type === 'low'
              ? 'border-blue-500 bg-blue-100 scale-105 shadow-blue-400/60'
              : 'border-gray-300 bg-white hover:border-blue-400'
          }`}
          aria-pressed={type === 'low'}
        >
          <div className={`text-4xl ${type === 'low' ? 'scale-110' : ''}`}>💭</div>
          <div>
            <p className={`font-bold text-lg ${type === 'low' ? 'text-blue-700' : 'text-gray-800'}`}>Low Moment</p>
            <p className="text-xs text-gray-500">Reflective thoughts</p>
          </div>
          {type === 'low' && (
            <div className="absolute top-4 right-4 text-blue-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </button>
      </div>
    </div>

    {/* Textarea */}
    <div className="mb-6">
      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
        Your story
      </label>
      <textarea
        id="content"
        value={content}
        onChange={handleContentChange}
        placeholder={placeholder}
        required
        rows={6}
        className={`w-full px-5 py-4 border-2 rounded-xl resize-none transition-colors outline-none ${
          validationError
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : type === 'high'
            ? 'border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200'
            : 'border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
        } placeholder-gray-400 text-gray-800 font-medium`}
      />
      <div className="mt-1 text-right text-xs text-gray-500 select-none">
        {charCount} / 500
      </div>

      <div className="mt-3 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            charCount < 5
              ? 'bg-gray-300'
              : charCount > 500
              ? 'bg-red-500'
              : type === 'high'
              ? 'bg-green-500'
              : 'bg-blue-500'
          }`}
          style={{ width: `${Math.min(charCount, 500) / 5}%` }}
        />
      </div>
    </div>

    {/* Validation errors */}
    {(validationError || error) && (
      <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl flex items-center gap-3 text-red-700">
        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728" />
        </svg>
        <p className="text-sm font-semibold">{validationError || error}</p>
      </div>
    )}

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading || charCount < 5 || charCount > 500}
      className={`w-full py-4 rounded-xl font-extrabold text-white shadow-lg transition-all duration-250 ${
        loading
          ? 'bg-gradient-to-r from-orange-300 to-orange-400 cursor-wait'
          : type === 'high'
          ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 cursor-pointer'
          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 cursor-pointer'
      } disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-3">
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Saving your moment...
        </span>
      ) : (
        'Save Entry'
      )}
    </button>

    <p className="mt-4 text-center text-xs text-gray-500 select-none">
      Your entries are private and secure
    </p>
  </form>
</div>
  );
};