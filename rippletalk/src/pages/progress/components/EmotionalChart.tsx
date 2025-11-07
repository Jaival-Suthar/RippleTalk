import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface MoodTrendsData {
  date: string;
  high: number;
  low: number;
  total: number;
}

interface EmotionalChartProps {
  data: MoodTrendsData;
}

export default function EmotionalChart({ data }: EmotionalChartProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-orb {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-pulse-orb {
          animation: pulse-orb 4s ease-in-out infinite;
        }
        .animate-pulse-orb-delay {
          animation: pulse-orb 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse-orb"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse-orb-delay"></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-2xl w-full">
        {/* Swirling container */}
        <div className="relative group">
          {/* Rotating border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-full opacity-75 blur animate-spin-slow"></div>
          
          {/* Content card */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-12 shadow-2xl">
            <div className="text-center space-y-8">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 rounded-full animate-bounce-slow">
                  <BarChart3 className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Date */}
              <div className="text-purple-200 text-sm font-medium tracking-wider">
                {new Date(data.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>

              {/* Main stats */}
              <div className="space-y-6">
                {/* High */}
                <div className="flex items-center justify-center gap-4">
                  <TrendingUp className="w-8 h-8 text-green-400 animate-pulse" />
                  <div>
                    <div className="text-white/60 text-sm uppercase tracking-wide">High</div>
                    <div className="text-5xl font-bold text-white">{data.high}</div>
                  </div>
                </div>

                {/* Low */}
                <div className="flex items-center justify-center gap-4">
                  <TrendingDown className="w-8 h-8 text-red-400 animate-pulse" />
                  <div>
                    <div className="text-white/60 text-sm uppercase tracking-wide">Low</div>
                    <div className="text-5xl font-bold text-white">{data.low}</div>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-6 border-t border-white/20">
                  <div className="text-white/60 text-sm uppercase tracking-wide mb-2">Total Entries</div>
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {data.total}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
