export const RewardsList = ({ history }: { history: { action: string; points: number; date: Date }[] }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
      {history.map((item, idx) => (
        <div key={idx} className="p-2 bg-gray-100 mb-2 rounded">
          {item.action} - +{item.points} pts
        </div>
      ))}
    </div>
  );
};