import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { animateFadeUp } from '../animations/gsap';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', age: '', gender: '', date: '', time: '', reason: '', message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  useEffect(() => {
    animateFadeUp('.fade-up-item', 0.1);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    
    try {
      // In a real app, this would hit the backend
      // await axios.post('http://localhost:8400/api/appointments', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', phone: '', age: '', gender: '', date: '', time: '', reason: '', message: '' });
    } catch (error) {
      setStatus({ loading: false, success: false, error: 'Failed to book appointment. Please try again.' });
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20">
      <Helmet>
        <title>Contact & Appointment | Dr. Jonathan</title>
      </Helmet>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-up-item">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">Book an <span className="text-gradient">Appointment</span></h1>
          <p className="text-gray-600 text-lg">Take the first step towards better health. Schedule your visit with our specialists today.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6 fade-up-item">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-dark mb-6">Contact Information</h3>
              <ul className="space-y-6 text-gray-600">
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-fit"><MapPin className="text-primary w-6 h-6" /></div>
                  <div>
                    <strong className="block text-dark mb-1">Clinic Address</strong>
                    123 Medical Center Drive, Suite 500<br />New York, NY 10001
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-fit"><Phone className="text-primary w-6 h-6" /></div>
                  <div>
                    <strong className="block text-dark mb-1">Phone Number</strong>
                    +1 (555) 123-4567<br />Emergency: 911
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-fit"><Mail className="text-primary w-6 h-6" /></div>
                  <div>
                    <strong className="block text-dark mb-1">Email Address</strong>
                    contact@drjonathan.com
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-fit"><Clock className="text-primary w-6 h-6" /></div>
                  <div>
                    <strong className="block text-dark mb-1">Working Hours</strong>
                    Mon - Fri: 8:00 AM - 8:00 PM<br />Sat: 9:00 AM - 2:00 PM
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Embedded Map Placeholder */}
            <div className="h-64 bg-gray-200 rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">Interactive Map</div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-3 fade-up-item">
            <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-3xl shadow-lg border border-white/50">
              <h3 className="text-2xl font-bold text-dark mb-8">Patient Details</h3>
              
              {status.success && (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200">
                  Appointment request sent successfully! We will contact you shortly to confirm.
                </div>
              )}
              {status.error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
                  {status.error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date *</label>
                  <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Time</label>
                  <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Department / Reason *</label>
                <select required name="reason" value={formData.reason} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                  <option value="">Select a reason</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="general">General Checkup</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-2">Additional Message</label>
                <textarea data-lenis-prevent rows={4} name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status.loading}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:bg-blue-700 transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {status.loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Confirm Appointment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
