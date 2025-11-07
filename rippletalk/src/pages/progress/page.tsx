import EmotionalChart from './components/EmotionalChart';
import useChartData  from './hooks/useChartData';

export default function ProgressPage() {
  const { moodTrends, loading, error } = useChartData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDelay: '150ms'}}></div>
          <div className="absolute inset-4 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-3xl p-8 text-white max-w-md">
          <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
          <p className="text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!moodTrends) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-white">
          <p className="text-xl">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Section */}
      <div className="bg-gray-900 border-b border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-gradient-to-br from-orange-400 to-pink-500 text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow-lg">
              📊
            </span>
            <h1 className="text-2xl text-white font-bold">Mood Trends</h1>
          </div>
          <p className="text-sm text-gray-400 ml-13">Track your emotional journey</p>
        </div>
      </div>

      {/* Emotional Chart - Full screen view */}
      <EmotionalChart data={moodTrends} />
      
      {/* Guide Section */}
      <div className="bg-gray-900 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg text-white font-semibold mb-4">Understanding Your Mood Scale</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3 bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
              <span className="text-2xl">😊</span>
              <div>
                <div className="font-semibold text-green-300 text-sm mb-1">7-10 High</div>
                <div className="text-xs text-gray-300 leading-relaxed">Positive days with great energy and mood</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
              <span className="text-2xl">😐</span>
              <div>
                <div className="font-semibold text-yellow-200 text-sm mb-1">4-6 Medium</div>
                <div className="text-xs text-gray-300 leading-relaxed">Mixed or neutral emotional state</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
              <span className="text-2xl">😔</span>
              <div>
                <div className="font-semibold text-blue-200 text-sm mb-1">1-3 Low</div>
                <div className="text-xs text-gray-300 leading-relaxed">Difficult moments that need attention</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
              <span className="text-2xl">📈</span>
              <div>
                <div className="font-semibold text-orange-300 text-sm mb-1">Track Patterns</div>
                <div className="text-xs text-gray-300 leading-relaxed">Identify trends over time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}