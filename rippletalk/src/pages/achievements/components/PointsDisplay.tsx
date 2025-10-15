export const PointsDisplay = ({ total }: { total: number }) => (
  <div className="bg-gradient-to-r from-yellow-200 via-yellow-50 to-green-50 rounded-2xl shadow-lg p-6 text-center flex flex-col items-center mb-6">
    <div className="bg-yellow-400 text-white rounded-full p-3 mb-2 shadow-lg text-3xl flex items-center justify-center">
      🏆
    </div>
    <h2 className="text-xl font-bold text-gray-800 mb-1 tracking-wider">Total Points</h2>
    <p className="text-5xl font-extrabold text-green-600 mb-0">{total}</p>
    <div className="text-xs text-gray-500 mt-1 font-medium">Keep growing your streak!</div>
  </div>
)
