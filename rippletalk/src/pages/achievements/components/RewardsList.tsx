export const RewardsList = ({
  history,
}: {
  history: { action: string; points: number; date: Date }[];
}) => (
  <div className="mt-2">
    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
      <span className="text-yellow-400">🎉</span>Recent Achievements
    </h3>
    <div className="space-y-2">
      {history.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center bg-white rounded-xl shadow border-l-4 border-green-300 px-4 py-3"
        >
          <div className="flex flex-col min-w-[90px] mr-4 text-left">
            <span className="text-xs text-gray-400 font-mono">{new Date(item.date).toLocaleDateString()}</span>
            <span className="text-sm text-gray-700">{item.action}</span>
          </div>
          <div className="flex-1 text-right">
            <span className="text-green-600 font-bold text-lg">+{item.points} pts</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)
