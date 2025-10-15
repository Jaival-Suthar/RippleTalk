import { EmotionalChart } from './components/EmotionalChart';
import { useChartData } from './hooks/useChartData';

export const ProgressPage = () => {
  const { data, loading } = useChartData();

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-56px)] bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-200 text-base">Loading progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-white-950 py-2 px-1 flex flex-col items-center justify-start">
      <div className="w-full max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2 mt-1 text-white">
          <span className="bg-gradient-to-br from-orange-400 to-pink-500 text-2xl w-9 h-9 flex items-center justify-center rounded-full shadow">📊</span>
          <h1 className="text-xl text-black font-bold">Mood Trends</h1>
        </div>
        <p className="text-xs text-gray-400 mb-2 pl-1">Track your emotional journey</p>
        {/* Chart */}
        <EmotionalChart data={data} />
        {/* Guide: tightly packed 2-row, 4-col grid */}
        <div className="mt-2 grid grid-cols-4 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2 bg-gray-800 rounded-lg p-2">
            <span className="text-xl">😊</span>
            <div>
              <div className="font-semibold text-green-300 text-xs">7-10 High</div>
              <div className="text-xs text-gray-300 leading-tight">Positive days</div>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-gray-800 rounded-lg p-2">
            <span className="text-xl">😐</span>
            <div>
              <div className="font-semibold text-yellow-200 text-xs">4-6 Medium</div>
              <div className="text-xs text-gray-300 leading-tight">Mixed or flat days</div>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-gray-800 rounded-lg p-2">
            <span className="text-xl">😔</span>
            <div>
              <div className="font-semibold text-blue-200 text-xs">1-3 Low</div>
              <div className="text-xs text-gray-300 leading-tight">Difficult moments</div>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-gray-800 rounded-lg p-2">
            <span className="text-xl">📈</span>
            <div>
              <div className="font-semibold text-orange-300 text-xs">Patterns</div>
              <div className="text-xs text-gray-300 leading-tight">Spot trends</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
