// PatientDetailView - Detailed view of patient progress with charts
// Owner: Member 5

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Activity, Mail, Phone } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import NavHeader from '../../../shared/components/NavHeader';
import SessionReport from '../../patient/components/SessionReport';
import { onAuthChange } from '../../auth/services/authService';
import { getPatientDetails, getPatientSessions } from '../services/doctorService';

const PatientDetailView = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth listener - Get doctor profile
  useEffect(() => {
    const unsubscribe = onAuthChange((authData) => {
      if (authData && authData.userData) {
        if (authData.userData.userType === 'doctor') {
          setDoctorProfile({
            id: authData.user.uid,
            name: authData.userData.name || 'Doctor',
            email: authData.userData.email,
            specialization: authData.userData.specialization || 'Physiotherapist',
            photoURL: authData.userData.photoURL || null,
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch patient data
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Try to fetch real patient data
        // const patientData = await getPatientDetails(patientId);
        // setPatient(patientData);
        
        // For now, use mock data
        setPatient({
          id: patientId,
          name: 'Rajesh Kumar',
          condition: 'Post-Knee Surgery Rehab',
          adherenceRate: 87,
          completedSessions: 24,
          totalSessions: 30,
          lastActive: '2 hours ago',
          progressLevel: 'Good',
          email: 'rajesh.kumar@example.com',
          phoneNumber: '+91 98765 43210',
        });
        setLoading(false);
      } catch (error) {
        console.error('[PatientDetailView] Error fetching patient:', error);
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  // Mock ROM (Range of Motion) trend data
  const romData = [
    { date: 'Week 1', knee: 45, hip: 60, ankle: 30 },
    { date: 'Week 2', knee: 65, hip: 75, ankle: 40 },
    { date: 'Week 3', knee: 85, hip: 85, ankle: 50 },
    { date: 'Week 4', knee: 105, hip: 95, ankle: 60 },
    { date: 'Week 5', knee: 120, hip: 100, ankle: 65 },
  ];

  // Mock Quality Score trend data
  const qualityData = [
    { date: 'Mon', score: 65 },
    { date: 'Tue', score: 72 },
    { date: 'Wed', score: 78 },
    { date: 'Thu', score: 85 },
    { date: 'Fri', score: 82 },
    { date: 'Sat', score: 88 },
    { date: 'Sun', score: 87 },
  ];

  // Mock recent sessions
  const recentSessions = [
    {
      exerciseName: 'Knee Bends',
      date: '2 hours ago',
      reps: 30,
      quality: 85,
      rangeOfMotion: 120,
      duration: '12 min',
    },
    {
      exerciseName: 'Leg Raises',
      date: '1 day ago',
      reps: 20,
      quality: 82,
      rangeOfMotion: 95,
      duration: '8 min',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavHeader userType="doctor" doctorProfile={doctorProfile} />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading patient details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavHeader userType="doctor" doctorProfile={doctorProfile} />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/doctor-dashboard')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Patients</span>
          </button>
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">Patient not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader userType="doctor" doctorProfile={doctorProfile} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/doctor-dashboard')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Patients</span>
        </button>

        {/* Patient Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {patient.name}
                </h1>
                <p className="text-lg text-gray-600 mt-1">{patient.condition}</p>
                
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {patient.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{patient.email}</span>
                    </div>
                  )}
                  {patient.phoneNumber && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{patient.phoneNumber}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Last active: {patient.lastActive}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-4 h-4" />
                    <span>
                      Sessions: {patient.completedSessions}/{patient.totalSessions}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Adherence Badge */}
            <div className="text-center bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <div className="text-4xl font-bold text-green-600">
                {patient.adherenceRate}%
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">Adherence Rate</p>
              <p className="text-xs text-gray-500 mt-1">{patient.progressLevel}</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Range of Motion Trend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Range of Motion Progress
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={romData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Degrees', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="knee"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Knee"
                />
                <Line
                  type="monotone"
                  dataKey="hip"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Hip"
                />
                <Line
                  type="monotone"
                  dataKey="ankle"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Ankle"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quality Score Trend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Weekly Quality Score
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={qualityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Score %', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                  name="Quality Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Sessions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentSessions.map((session, index) => (
              <SessionReport key={index} sessionData={session} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailView;
