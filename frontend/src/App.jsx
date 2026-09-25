import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [formData, setFormData] = useState({ name: '', kuId: '', email: '', department: '', year: '1st Year' });
  const [searchKuId, setSearchKuId] = useState('');
  const [profile, setProfile] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE}/announcements`)
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/students/register`, formData);
      setMessage('Registration successful!');
      setFormData({ name: '', kuId: '', email: '', department: '', year: '1st Year' });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_BASE}/students/${searchKuId}`);
      setProfile(res.data);
      setMessage('');
    } catch (err) {
      setProfile(null);
      setMessage('Student profile not found');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Student Portal & Registration System</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto flex-grow w-full p-6 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-indigo-600">Student Registration</h2>
            {message && <div className="mb-4 text-sm font-medium text-indigo-700 bg-indigo-50 p-2 rounded">{message}</div>}
            <form onSubmit={handleRegister} className="space-y-3">
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded text-sm"/>
              <input type="text" placeholder="KU ID" required value={formData.kuId} onChange={e => setFormData({...formData, kuId: e.target.value})} className="w-full p-2 border rounded text-sm"/>
              <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded text-sm"/>
              <input type="text" placeholder="Department" required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full p-2 border rounded text-sm"/>
              <select value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full p-2 border rounded text-sm">
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded text-sm hover:bg-indigo-700 transition">Register Profile</button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-indigo-600">Find Profile</h2>
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <input type="text" placeholder="Enter KU ID" required value={searchKuId} onChange={e => setSearchKuId(e.target.value)} className="flex-1 p-2 border rounded text-sm"/>
              <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900">Search</button>
            </form>
            {profile && (
              <div className="p-4 bg-gray-50 border rounded text-sm space-y-1">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>KU ID:</strong> {profile.kuId}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Department:</strong> {profile.department}</p>
                <p><strong>Year:</strong> {profile.year}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-indigo-600">Campus Announcements</h2>
            <div className="space-y-4 max-h-[450px] overflow-y-auto">
              {announcements.length === 0 ? (
                <p className="text-sm text-gray-500">No announcements available.</p>
              ) : (
                announcements.map((item) => (
                  <div key={item._id} className="p-3 border-l-4 border-indigo-500 bg-gray-50 rounded">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{item.content}</p>
                    <span className="text-[10px] text-gray-400 block mt-2">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4 text-sm mt-auto">
        <p>Student Portal & Registration System</p>
        <p className="text-gray-400 text-xs mt-1">
          Developed by: <span className="text-white font-medium">Bhuvan Gera</span> | KU ID: <span className="text-white font-medium">[YOUR KU ID HERE]</span>
        </p>
      </footer>
    </div>
  );
}