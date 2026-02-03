
// NavHeader Component - Navigation header with Auth integration
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Activity, LayoutDashboard, LogOut, User, Settings, Zap, Compass, Sparkles } from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';

const NavHeader = ({ userType = 'patient', doctorProfile = null, onSettingsClick = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, userData } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Determine which profile to show
  const profile = userData || doctorProfile;

  return (
    <header className="bg-white/70 backdrop-blur-2xl sticky top-0 z-50 border-b border-slate-100/50">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="relative">
              <div className="w-12 h-12 bg-slate-900 rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-slate-200 group-hover:scale-105 transition-transform duration-500">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-white fill-current" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                GATI<span className="text-blue-600">REHAB</span>
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Intelligence Lab</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100/50">
              {userType === 'patient' ? (
                <>
                  <NavButton
                    active={isActive('/') || isActive('/patient-dashboard')}
                    onClick={() => navigate('/patient-dashboard')}
                    icon={<Compass className="w-4 h-4" />}
                    label="Nexus"
                  />
                  <NavButton
                    active={isActive('/workout')}
                    onClick={() => navigate('/workout')}
                    icon={<Activity className="w-4 h-4" />}
                    label="Recovery"
                  />
                </>
              ) : (
                <>
                  <NavButton
                    active={isActive('/doctor-dashboard')}
                    onClick={() => navigate('/doctor-dashboard')}
                    icon={<LayoutDashboard className="w-4 h-4" />}
                    label="Command Center"
                  />
                  <NavButton
                    active={isActive('/analytics')}
                    onClick={() => navigate('/doctor-dashboard')}
                    icon={<Sparkles className="w-4 h-4" />}
                    label="AI Insights"
                  />
                </>
              )}
            </div>

            {/* Profile & Logout */}
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200/60">
              <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-black text-slate-900 leading-tight">
                    {profile?.name?.split(' ')[0] || (userType === 'patient' ? 'Patient' : 'Doctor')}
                  </p>
                  <p className="text-[9px] text-blue-500 uppercase tracking-widest font-black">
                    {userType}
                  </p>
                </div>
              </div>

              {onSettingsClick && (
                <button
                  onClick={onSettingsClick}
                  className="p-3 text-slate-400 hover:text-slate-900 bg-slate-50 border border-slate-100 rounded-xl transition-all hover:shadow-lg"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={handleLogout}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all transform active:scale-95 group shadow-sm hover:shadow-rose-100"
              >
                <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

const NavButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${active
      ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
      }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default NavHeader;
