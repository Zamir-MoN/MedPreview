import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { animateFadeUp } from '../animations/gsap';

export default function About() {
  useEffect(() => {
    animateFadeUp('.fade-up-item', 0.2);
  }, []);

  const timeline = [
    { year: '2010', title: 'Graduated Medical School', desc: 'Harvard Medical School with Honors' },
    { year: '2015', title: 'Completed Residency', desc: 'Johns Hopkins Hospital' },
    { year: '2018', title: 'Fellowship in Neurology', desc: 'Mayo Clinic' },
    { year: '2023', title: 'Chief of Medicine', desc: 'Mount Sinai Health System' },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20">
      <Helmet>
        <title>About Dr. Jonathan</title>
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-up-item">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">Behind the <span className="text-gradient">Stethoscope</span></h1>
          <p className="text-gray-600 text-lg">A dedication to lifelong learning and compassionate patient care.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="fade-up-item relative">
            <div className="absolute inset-0 bg-primary/10 -rotate-6 rounded-3xl -z-10" />
            <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop" alt="Dr. Jonathan Clinic" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
          </div>
          <div className="fade-up-item">
            <h2 className="text-3xl font-bold text-dark mb-6">My Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              "To provide the highest standard of medical care through innovation, empathy, and personalized treatment plans. Every patient is a partner in their own health journey."
            </p>
            <div className="glass p-6 rounded-2xl border-l-4 border-l-primary mt-8">
              <h4 className="font-bold text-dark mb-2">Qualifications</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>MD, Harvard Medical School</li>
                <li>Board Certified in Internal Medicine</li>
                <li>Fellow of the American College of Physicians</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-dark mb-12 fade-up-item">Career Timeline</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active fade-up-item`}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-2xl">
                  <span className="text-primary font-bold text-sm mb-1 block">{item.year}</span>
                  <h3 className="font-bold text-dark text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
