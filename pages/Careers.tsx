import React from 'react';
import { Mail, Briefcase, CheckCircle, Coffee, GraduationCap, DollarSign, ArrowRight } from 'lucide-react';
import { Stripes } from '../components/Stripes';

export const Careers: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white relative py-20 overflow-hidden">
        <div className="absolute inset-0">
           <img 
            src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2000&auto=format&fit=crop" 
            alt="Team meeting in workshop" 
            className="w-full h-full object-cover opacity-20"
           />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="text-agp-red font-bold tracking-widest uppercase text-sm mb-2 block">Kom werken bij Autoglas Pro</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">Word onderdeel van <br/>ons <span className="text-transparent bg-clip-text bg-gradient-to-r from-agp-red to-white">specialistenteam</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Wij groeien en zoeken vakmensen met passie voor auto's. Geen nummer, maar een gewaardeerde collega in een hecht team.
          </p>
        </div>
        
        {/* Animated Stripes Background */}
        <div className="absolute bottom-0 left-0 w-full opacity-30">
            <Stripes className="h-2 w-full" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Job Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-agp-red group hover:shadow-2xl transition duration-300">
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-agp-blue rounded-full text-sm font-bold mb-2">
                        <Briefcase size={14} /> Fulltime
                     </div>
                     <h2 className="text-3xl font-black text-slate-900">Allround Autoruit Monteur</h2>
                  </div>
                  <div className="text-right hidden md:block">
                    <span className="block text-gray-500 text-sm">Locatie</span>
                    <span className="font-bold text-slate-800">Uden</span>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none text-gray-600 mb-8">
                  <p className="lead font-medium text-slate-800">
                    Heb jij technisch inzicht, twee rechterhanden en passie voor auto's? Dan zijn wij op zoek naar jou!
                  </p>
                  <p>
                    Als monteur ben je het gezicht van Autoglas Pro. Je bent verantwoordelijk voor het vakkundig repareren en vervangen van autoruiten, zowel in onze moderne werkplaats als op locatie. Je werkt met de nieuwste technieken en gereedschappen.
                  </p>
                  
                  <h3 className="font-bold text-agp-blue text-xl mt-6 mb-4 flex items-center gap-2">
                    <CheckCircle className="text-agp-red" /> Wat wij vragen
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2 list-none pl-0">
                    {['Ervaring in de autobranche (pre)', 'Rijbewijs B', 'Klantvriendelijk & servicegericht', 'Oog voor detail', 'Woonachtig regio Uden', 'Beheersing Nederlandse taal'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                   <h3 className="font-bold text-slate-900 mb-4">Dit krijg je van ons:</h3>
                   <div className="grid sm:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg text-green-600"><DollarSign size={20}/></div>
                        <div>
                          <p className="font-bold text-slate-900">Goed Salaris</p>
                          <p className="text-sm text-gray-500">Passend bij jouw ervaring en kunnen.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><GraduationCap size={20}/></div>
                        <div>
                          <p className="font-bold text-slate-900">Opleidingen</p>
                          <p className="text-sm text-gray-500">Blijf leren en groeien in je vak.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Coffee size={20}/></div>
                        <div>
                          <p className="font-bold text-slate-900">Werksfeer</p>
                          <p className="text-sm text-gray-500">Gezellig team, goede koffie & vrijdagmiddagborrel.</p>
                        </div>
                      </div>
                   </div>
                </div>

              </div>
              
              {/* Action Bar */}
              <div className="bg-slate-900 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-white">
                  <p className="font-bold text-lg">Enthousiast geworden?</p>
                  <p className="text-slate-400 text-sm">Wacht niet langer en neem contact op.</p>
                </div>
                <a 
                  href="mailto:info@autoglaspro.nl?subject=Sollicitatie%20Monteur" 
                  className="bg-agp-red text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-red-900/50 hover:bg-white hover:text-agp-red transition-all transform hover:scale-105 flex items-center gap-2 group/btn"
                >
                  <Mail size={20} />
                  Solliciteer Direct
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition" />
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar / Image Area */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-agp-blue/10 rounded-bl-full -mr-4 -mt-4 transition duration-500 group-hover:scale-110"></div>
               <h3 className="font-bold text-xl mb-4 text-slate-800">Sfeerimpressie</h3>
               <div className="grid grid-cols-1 gap-4">
                 <img src="https://images.unsplash.com/photo-1613214292775-4087609d84f0?q=80&w=800&auto=format&fit=crop" className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition" alt="Werkplaats" />
                 <img src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=800&auto=format&fit=crop" className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition" alt="Gereedschap" />
               </div>
            </div>

            <div className="bg-agp-blue text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="font-bold text-xl mb-2">Heb je vragen?</h3>
                 <p className="text-blue-100 mb-4 text-sm">Bel ons gerust even op om kennis te maken voordat je solliciteert.</p>
                 <a href="tel:0413331619" className="font-black text-2xl hover:underline decoration-agp-red underline-offset-4">0413 331 619</a>
               </div>
               {/* Decorative Circle */}
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};