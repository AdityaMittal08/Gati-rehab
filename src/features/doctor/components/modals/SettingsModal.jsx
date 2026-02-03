// SettingsModal - Comprehensive settings interface for doctors
// Features: Profile editing, notifications, preferences, adherence thresholds

import { useState, useEffect } from 'react';
import { X, User, Bell, Sliders, Save, Camera } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, doctorProfile, onSave }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    phoneNumber: '',
    clinic: '',
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    adherenceAlerts: true,
    // Adherence thresholds
    highAdherenceThreshold: 80,
    mediumAdherenceThreshold: 60,
    lowAdherenceThreshold: 40,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load doctor profile data
  useEffect(() => {
    if (doctorProfile) {
      setFormData((prev) => ({
        ...prev,
        name: doctorProfile.name || '',
        email: doctorProfile.email || '',
        specialization: doctorProfile.specialization || '',
        phoneNumber: doctorProfile.phoneNumber || '',
        clinic: doctorProfile.clinic || '',
      }));
    }
  }, [doctorProfile]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      // Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (onSave) {
        await onSave(formData);
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('[SettingsModal] Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex h-[calc(90vh-140px)]">
            {/* Sidebar Tabs */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Notifications</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'preferences'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Sliders className="w-5 h-5" />
                  <span className="font-medium">Preferences</span>
                </button>
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Doctor Profile
                    </h3>
                    
                    {/* Profile Photo */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Photo
                      </label>
                      <div className="flex items-center gap-4">
                        {doctorProfile?.photoURL ? (
                          <img
                            src={doctorProfile.photoURL}
                            alt={formData.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-10 h-10 text-blue-600" />
                          </div>
                        )}
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Camera className="w-4 h-4" />
                          <span className="text-sm font-medium">Change Photo</span>
                        </button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Dr. John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="doctor@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Specialization
                        </label>
                        <input
                          type="text"
                          value={formData.specialization}
                          onChange={(e) => handleInputChange('specialization', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Physiotherapist"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+91 9999999999"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Clinic/Hospital
                        </label>
                        <input
                          type="text"
                          value={formData.clinic}
                          onChange={(e) => handleInputChange('clinic', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="City Hospital Rehabilitation Center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Notification Preferences
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Choose how you want to receive notifications about your patients
                    </p>

                    <div className="space-y-4">
                      {/* Email Notifications */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.emailNotifications}
                            onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* Push Notifications */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Push Notifications</p>
                          <p className="text-sm text-gray-600">Browser push notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.pushNotifications}
                            onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* SMS Notifications */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">SMS Notifications</p>
                          <p className="text-sm text-gray-600">Receive text messages</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.smsNotifications}
                            onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* Weekly Reports */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Weekly Reports</p>
                          <p className="text-sm text-gray-600">Summary of patient progress</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.weeklyReports}
                            onChange={(e) => handleInputChange('weeklyReports', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* Adherence Alerts */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Adherence Alerts</p>
                          <p className="text-sm text-gray-600">Alert when patient adherence drops</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.adherenceAlerts}
                            onChange={(e) => handleInputChange('adherenceAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Adherence Thresholds
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Set custom thresholds for patient adherence classification
                    </p>

                    <div className="space-y-6">
                      {/* High Adherence */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          High Adherence Threshold (%)
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="60"
                            max="100"
                            value={formData.highAdherenceThreshold}
                            onChange={(e) => handleInputChange('highAdherenceThreshold', parseInt(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-lg font-semibold text-green-600 w-16 text-right">
                            {formData.highAdherenceThreshold}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Patients above this threshold are considered to have high adherence
                        </p>
                      </div>

                      {/* Medium Adherence */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Medium Adherence Threshold (%)
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="40"
                            max="80"
                            value={formData.mediumAdherenceThreshold}
                            onChange={(e) => handleInputChange('mediumAdherenceThreshold', parseInt(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-lg font-semibold text-yellow-600 w-16 text-right">
                            {formData.mediumAdherenceThreshold}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Patients above this threshold but below high threshold need monitoring
                        </p>
                      </div>

                      {/* Low Adherence */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Low Adherence Warning (%)
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="60"
                            value={formData.lowAdherenceThreshold}
                            onChange={(e) => handleInputChange('lowAdherenceThreshold', parseInt(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-lg font-semibold text-red-600 w-16 text-right">
                            {formData.lowAdherenceThreshold}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Patients below this threshold need urgent attention
                        </p>
                      </div>

                      {/* Visual Preview */}
                      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-3">Threshold Preview</p>
                        <div className="relative h-12 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg">
                          <div 
                            className="absolute h-full w-1 bg-white border-2 border-gray-700"
                            style={{ left: `${formData.mediumAdherenceThreshold}%` }}
                          >
                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold whitespace-nowrap">
                              {formData.mediumAdherenceThreshold}%
                            </span>
                          </div>
                          <div 
                            className="absolute h-full w-1 bg-white border-2 border-gray-700"
                            style={{ left: `${formData.highAdherenceThreshold}%` }}
                          >
                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold whitespace-nowrap">
                              {formData.highAdherenceThreshold}%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between mt-3 text-xs text-gray-600">
                          <span>Low (&lt;{formData.mediumAdherenceThreshold}%)</span>
                          <span>Medium ({formData.mediumAdherenceThreshold}-{formData.highAdherenceThreshold}%)</span>
                          <span>High (≥{formData.highAdherenceThreshold}%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div>
              {saveSuccess && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ Settings saved successfully!
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
