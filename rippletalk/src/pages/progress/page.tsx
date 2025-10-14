import { EmotionalChart } from './components/EmotionalChart';
import { useChartData } from './hooks/useChartData';

export const ProgressPage = () => {
  const { data, loading } = useChartData();


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mb-4 shadow-lg">
            <span className="text-3xl">📊</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Your Progress</h1>
          <p className="text-gray-600 text-lg">Visualize your emotional journey</p>
        </div>

        {data.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-gray-300 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No data yet</h3>
            <p className="text-gray-500 mb-6">Start logging your mood to see your progress over time</p>
            <a
              href="/new"
              className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
            >
              Create Your First Entry
            </a>
          </div>
        ) : (
          <>
           

            {/* Chart */}
            <EmotionalChart data={data} />

            {/* Interpretation Guide */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">💡</span>
                Understanding Your Chart
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-2xl">😊</span>
                  <div>
                    <p className="font-semibold text-gray-700">High Scores (7-10)</p>
                    <p className="text-gray-600">Days with positive experiences and emotions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-2xl">😐</span>
                  <div>
                    <p className="font-semibold text-gray-700">Medium Scores (4-6)</p>
                    <p className="text-gray-600">Neutral or mixed emotional days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-2xl">😔</span>
                  <div>
                    <p className="font-semibold text-gray-700">Low Scores (1-3)</p>
                    <p className="text-gray-600">Challenging days that need reflection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <span className="text-2xl">📈</span>
                  <div>
                    <p className="font-semibold text-gray-700">Look for Patterns</p>
                    <p className="text-gray-600">Notice trends to understand your emotional cycles</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
