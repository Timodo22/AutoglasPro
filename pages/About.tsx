import React from 'react';
import { Shield, Star, Users, Award, PenTool, ThumbsUp } from 'lucide-react';
import { Stripes, AngledStripes } from '../components/Stripes';

export const About: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Creative Hero */}
      <div className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-slate-800 skew-x-12 translate-x-20 opacity-50"></div>
        <div className="absolute top-10 left-10 animate-bounce duration-[3000ms]">
            <div className="w-4 h-4 bg-agp-red rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 right-20 animate-pulse">
            <div className="w-32 h-32 border-4 border-agp-blue/30 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
             <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold text-agp-red uppercase tracking-wider mb-2">
                Sinds 2005
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
               Meer dan alleen <span className="text-transparent bg-clip-text bg-gradient-to-r from-agp-blue to-white">glas.</span>
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
               Autoglas Pro Uden is uw lokale specialist. Wij combineren ouderwets vakmanschap met de nieuwste technieken.
             </p>
          </div>
          <div className="md:w-1/2 relative">
             <div className="relative z-10 grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600&auto=format&fit=crop" 
                  alt="Garage" 
                  className="rounded-2xl shadow-2xl transform translate-y-8 hover:scale-105 transition duration-500"
                />
                <img 
                  src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=600&auto=format&fit=crop" 
                  alt="Detail work" 
                  className="rounded-2xl shadow-2xl transform -translate-y-8 hover:scale-105 transition duration-500"
                />
             </div>
             {/* Decorative Stripes behind images */}
             <div className="absolute -inset-4 z-0 flex justify-center items-center opacity-30 rotate-12 scale-150">
                <Stripes className="w-96 h-96 opacity-50 blur-xl" vertical />
             </div>
          </div>
        </div>
      </div>

      {/* Story Section with Creative Lines */}
      <div className="max-w-7xl mx-auto px-4 py-24 relative">
        {/* Vertical line running through */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden lg:block"></div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="absolute -left-10 top-10 w-20 h-full bg-gray-50 -z-10 rounded-l-3xl"></div>
             <div className="prose prose-lg text-gray-600">
                <h2 className="text-4xl font-black text-slate-900 mb-6 relative inline-block">
                  Ons Verhaal
                  <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-agp-red"></div>
                </h2>
                <p className="lead text-xl text-slate-700 font-medium">
                  Autoglas Pro is ontstaan uit passie voor auto's en techniek. Wij geloven dat ruitschade geen hoofdpijn hoeft te zijn.
                </p>
                <p>
                  Gevestigd aan de Oostwijk 1C in Uden, staan wij klaar voor zowel particuliere als zakelijke klanten. 
                  Met ons kleine, hechte team van specialisten zorgen wij voor persoonlijke aandacht en een perfect resultaat.
                </p>
                <p>
                  In tegenstelling tot grote ketens bent u bij ons geen nummer; wij kennen onze klanten en hun auto's. Kwaliteit staat bij ons op nummer één.
                </p>
             </div>
          </div>
          
          <div className="order-1 lg:order-2 relative group perspective-1000">
             {/* Image with decorative background stripes */}
             <div className="absolute -top-6 -right-6 w-full h-full border-2 border-agp-red rounded-3xl z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
             <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-agp-blue rounded-3xl z-0 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"></div>
             
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1597404294361-9cbaa449872a?q=80&w=1000&auto=format&fit=crop" 
                 alt="Professional mechanic" 
                 className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
               />
               
               {/* Floating Badge */}
               <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-[bounce_3s_infinite]">
                  <div className="bg-green-100 p-2 rounded-full">
                    <ThumbsUp className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Klanttevredenheid</p>
                    <p className="text-xl font-black text-slate-900">9.8/10</p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Values Grid with Hover Effects */}
      <div className="bg-gray-50 py-20 relative overflow-hidden">
        {/* Diagonal Stripe Background */}
        <div className="absolute inset-0 opacity-5">
           {[...Array(20)].map((_, i) => (
             <div key={i} className="absolute h-px bg-slate-900 w-[200%]" style={{ top: `${i * 5}%`, left: '-50%', transform: 'rotate(-12deg)' }}></div>
           ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900">Waar wij voor staan</h2>
            <div className="flex justify-center mt-4">
              <Stripes className="h-1.5 w-24 rounded-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Levenslange Garantie", text: "Wij staan 100% achter ons werk. Daarom krijgt u garantie op montage en waterdichtheid zolang u de auto bezit.", color: "text-agp-red" },
              { icon: Users, title: "Persoonlijk Contact", text: "Direct contact met de specialist die aan uw auto werkt. Korte lijnen, duidelijke afspraken en een kop koffie.", color: "text-agp-blue" },
              { icon: Award, title: "OEM Kwaliteit", text: "Wij gebruiken uitsluitend ruiten en materialen van dezelfde kwaliteit als de fabrikant gebruikt. Geen compromissen.", color: "text-yellow-500" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border-t-4 border-transparent hover:border-agp-blue">
                <div className={`w-16 h-16 ${item.color} bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300`}>
                  <item.icon size={32} />
                </div>
                <h3 className="font-bold text-xl mb-4 text-slate-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team CTA */}
      <div className="py-20 text-center">
         <div className="max-w-3xl mx-auto px-4">
           <h2 className="text-3xl font-black mb-6">Kom eens langs in Uden</h2>
           <p className="text-xl text-gray-600 mb-8">
             Of u nu schade heeft of gewoon advies wilt, de koffie staat altijd klaar aan de Oostwijk 1C.
           </p>
           <AngledStripes className="h-8 justify-center opacity-50 mb-8" />
         </div>
      </div>
    </div>
  );
};