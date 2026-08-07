import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { animateFadeUp } from '../animations/gsap';
import { Activity, Heart, Brain, Bone, Shield, Syringe } from 'lucide-react';

export default function Services() {
  useEffect(() => {
    animateFadeUp('.fade-up-item', 0.1);
  }, []);

  const services = [
    { title: 'Cardiology', icon: Heart, desc: 'Advanced diagnostics and treatments for heart conditions.', price: '$200' },
    { title: 'Neurology', icon: Brain, desc: 'Expert care for neurological disorders and brain health.', price: '$250' },
    { title: 'Orthopedics', icon: Bone, desc: 'Surgical and non-surgical treatments for musculoskeletal issues.', price: '$180' },
    { title: 'General Medicine', icon: Shield, desc: 'Comprehensive checkups and preventative healthcare.', price: '$100' },
    { title: 'Diagnostics', icon: Activity, desc: 'State-of-the-art imaging and laboratory testing.', price: '$150' },
    { title: 'Vaccinations', icon: Syringe, desc: 'Immunizations for travel, seasonal, and general health.', price: '$50' },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20">
      <Helmet>
        <title>Services | Dr. Jonathan</title>
      </Helmet>
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-up-item">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">Specialized <span className="text-gradient">Treatments</span></h1>
          <p className="text-gray-600 text-lg">Offering a wide range of medical services tailored to your individual needs.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="glass p-8 rounded-3xl hover:luxury-shadow transition-all duration-300 group fade-up-item border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <service.icon className="w-24 h-24 text-primary transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-3 relative z-10">{service.title}</h3>
              <p className="text-gray-600 mb-6 relative z-10">{service.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 relative z-10">
                <span className="text-xl font-bold text-dark">{service.price}</span>
                <button className="text-sm font-bold text-primary hover:text-secondary transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
