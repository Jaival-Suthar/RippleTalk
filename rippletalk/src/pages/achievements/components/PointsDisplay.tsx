export const PointsDisplay = ({ total }: { total: number }) => {
  return (
    <div className="p-8 bg-green-500 text-white rounded-lg text-center">
      <h2 className="text-2xl font-semibold mb-2">Total Points</h2>
      <p className="text-5xl font-bold m-0">{total}</p>
    </div>
  );
};