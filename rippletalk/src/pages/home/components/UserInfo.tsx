import { useAuth } from '../../../context';

export const UserInfo = () => {
  const { user } = useAuth();
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  return (
  <div className="bg-gray-900 border-l-4 border-green-400 rounded-xl shadow-lg px-5 py-4 mb-4 text-white flex items-center gap-3 max-w-lg mx-auto">
    {/* Avatar */}
    <div className="w-12 h-12 bg-green-700 text-green-100 flex items-center justify-center rounded-full font-bold text-xl shadow">
      {getInitials(user.name)}
    </div>
    
    {/* Info vertical stack */}
    <div className="flex-1">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-semibold text-green-300">{getGreeting()},</span>
        <span className="text-md font-bold">{user.name}</span>
        <span className="ml-2 text-base opacity-40 hidden sm:inline">👋</span>
      </div>
      <div className="flex items-center gap-1 mt-1 text-xs text-gray-300">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>{user.email}</span>
      </div>
    </div>
  </div>
);

};