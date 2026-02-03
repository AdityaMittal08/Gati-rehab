
import { User, TrendingUp, TrendingDown, AlertCircle, AlertTriangle, ChevronRight, Activity, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientCard = ({ patient, viewMode = 'grid' }) => {
  const navigate = useNavigate();

  const getAdherenceColor = (rate) => {
    if (rate >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (rate >= 60) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  const isHighRisk = patient.adherenceRate < 60;

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => navigate(`/patient/${patient.id}`)}
        className="group flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <User className="w-7 h-7 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 leading-none mb-1">{patient.name}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{patient.condition}</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Adherence</p>
            <div className={`px-3 py-1 rounded-full text-xs font-black border ${getAdherenceColor(patient.adherenceRate)}`}>
              {patient.adherenceRate}%
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Active</p>
            <p className="text-sm font-black text-slate-800">{patient.lastActive}</p>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(`/patient/${patient.id}`)}
      className={`group bg-white rounded-[2.5rem] p-8 border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-slate-200/50 ${isHighRisk
          ? 'border-rose-100 hover:border-rose-200'
          : 'border-slate-50 hover:border-blue-100'
        }`}
    >
      {/* High Risk Flag Badge */}
      {isHighRisk && (
        <div className="absolute top-4 right-4 bg-rose-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 shadow-lg shadow-rose-200 uppercase tracking-widest animate-pulse">
          <AlertTriangle className="w-3.5 h-3.5" />
          Critical Alert
        </div>
      )}

      <div className="flex items-center gap-5 mb-8">
        <div className={`w-20 h-20 rounded-[1.75rem] flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${isHighRisk ? 'bg-rose-50' : 'bg-slate-50'}`}>
          <User className={`w-10 h-10 ${isHighRisk ? 'text-rose-400' : 'text-slate-400'}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight">{patient.name}</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">{patient.condition}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 group-hover:bg-white group-hover:border-blue-100 transition-colors">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Adherence</p>
          <div className="flex items-end gap-1.5">
            <span className={`text-2xl font-black ${patient.adherenceRate < 60 ? 'text-rose-500' : 'text-slate-900'}`}>{patient.adherenceRate}%</span>
            {patient.adherenceRate >= 80 ? <TrendingUp className="w-4 h-4 text-emerald-500 mb-1.5" /> : <TrendingDown className="w-4 h-4 text-rose-500 mb-1.5" />}
          </div>
        </div>
        <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 group-hover:bg-white group-hover:border-blue-100 transition-colors">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Activity</p>
          <div className="flex items-end gap-1.5">
            <span className="text-2xl font-black text-slate-900">{patient.completedSessions}</span>
            <span className="text-xs font-bold text-slate-400 mb-1.5">Sessions</span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-slate-300" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Status</span>
        </div>
        <button className="flex items-center gap-1.5 text-blue-600 font-black text-sm hover:underline">
          View Analytics <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Hover Background Accent */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
    </div>
  );
};

export default PatientCard;
