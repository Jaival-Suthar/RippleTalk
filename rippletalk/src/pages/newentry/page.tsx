import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntryForm } from './components/EntryForm';
import { useEntrySubmit } from './hooks/useEntrySubmit';

export const NewEntryPage = () => {
  const { submit, loading, error } = useEntrySubmit();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (type: 'high' | 'low', content: string) => {
    const success = await submit(type, content);
    
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 py-12 px-6">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-white rounded-xl shadow-2xl p-4 flex items-center gap-3 border-l-4 border-green-500">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Entry saved!</p>
              <p className="text-sm text-gray-600">Redirecting to home...</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-1">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full mb-1 shadow-lg">
            <span className="text-3xl">✍️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-1">
            Capture Your Moment
          </h1>
          <p className="text-gray-600 text-md">
            Take a breath and reflect on your day
          </p>
        </div>

        {/* Motivational Quote Card */}
        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 mb-2 border border-orange-100 shadow-md">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💫</div>
            <div>
              <p className="text-gray-700 italic mb-1">
                "Every moment is a fresh beginning."
              </p>
              <p className="text-sm text-gray-500">- T.S. Eliot</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <EntryForm onSubmit={handleSubmit} loading={loading} error={error} />

        {/* Tips Section */}
        <div className="mt-3 bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-3 border border-orange-100">
          <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Writing Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>Be honest with yourself - this is your safe space</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>Focus on specific moments rather than generalizations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>Notice how you felt physically and emotionally</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>There's no right or wrong way to express yourself</span>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};