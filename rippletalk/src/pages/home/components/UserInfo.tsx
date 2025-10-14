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
    <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg p-6 mb-6 text-white">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 bg-white bg-opacity-30 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
          {getInitials(user.name)}
        </div>
        
        {/* User Info */}
        <div className="flex-1">
          <p className="text-sm opacity-90 mb-1">{getGreeting()},</p>
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{user.email}</span>
          </div>
        </div>

        {/* Decorative element */}
        <div className="hidden sm:block">
          <div className="text-6xl opacity-20">👋</div>
        </div>
      </div>
    </div>
  );
};