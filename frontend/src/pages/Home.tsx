import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowRight, Activity, Heart, Shield } from 'lucide-react';
import { animateFadeUp, animateScale } from '../animations/gsap';

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    animateFadeUp('.fade-up-item', 0.2);
    animateScale('.scale-item');
  }, []);

  return (
    <div ref={containerRef} className="pt-24 md:pt-32">
      <Helmet>
        <title>Dr. Jonathan | Premium Medical Care</title>
        <meta name="description" content="Premium luxury medical portfolio for Dr. Jonathan, offering cutting-edge treatments." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 -z-10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1.5 px-4 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide mb-6 border border-primary/20">
                BOARD CERTIFIED SPECIALIST
              </span>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-dark">
                Premium Healthcare <br />
                <span className="text-gradient">Redefined.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Experience world-class medical expertise blended with luxurious patient care. Your journey to exceptional health starts here.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all duration-300">
                  Book Appointment
                </button>
                <button className="bg-white text-dark border border-gray-200 px-8 py-4 rounded-full font-bold shadow-md hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 group">
                  Watch Introduction
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="relative hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              {/* Using a placeholder for Doctor Image */}
              <div className="w-full h-[600px] bg-gradient-to-b from-gray-200 to-gray-300 rounded-[2rem] overflow-hidden shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" alt="Dr. Jonathan" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              </div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-12 top-24 glass p-4 rounded-2xl flex items-center gap-4 z-20"
            >
              <div className="bg-green-100 p-3 rounded-full"><Activity className="text-green-600 w-6 h-6" /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Success Rate</p>
                <p className="text-xl font-bold text-dark">99.8%</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-32 glass p-4 rounded-2xl flex items-center gap-4 z-20"
            >
              <div className="bg-red-100 p-3 rounded-full"><Heart className="text-red-600 w-6 h-6" /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Happy Patients</p>
                <p className="text-xl font-bold text-dark">
                  <CountUp end={15000} suffix="+" duration={3} />
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Years Experience', value: 15, suffix: '+' },
              { label: 'Successful Surgeries', value: 5000, suffix: '+' },
              { label: 'Awards Won', value: 45, suffix: '' },
              { label: 'Clinic Locations', value: 3, suffix: '' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center fade-up-item">
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <CountUp end={stat.value} duration={3} enableScrollSpy />{stat.suffix}
                </h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Preview */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 fade-up-item">
            <h2 className="text-4xl font-bold text-dark mb-4">World-Class <span className="text-gradient">Services</span></h2>
            <p className="text-gray-600">Comprehensive medical care tailored to your unique needs, utilizing the latest in medical technology.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Advanced Cardiology', icon: Heart, desc: 'State-of-the-art heart care, diagnostics, and surgical interventions.' },
              { title: 'Neurology', icon: Activity, desc: 'Expert diagnosis and treatment of disorders of the nervous system.' },
              { title: 'General Practice', icon: Shield, desc: 'Comprehensive healthcare for individuals and families.' },
            ].map((service, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 scale-item group">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <a href="/services" className="text-primary font-medium flex items-center gap-2 group/link">
                  Learn more <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
