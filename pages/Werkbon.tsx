import React, { useState } from 'react';
import { ClipboardList, Car, CheckCircle, AlertCircle, Send, Tool, RefreshCw } from 'lucide-react';

export const Werkbon: React.FC = () => {
  const [kenteken, setKenteken] = useState('');
  
  // Web3Forms Access Key
  const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 text-white rounded-xl mb-4 shadow-lg">
            <ClipboardList size={32} />
          </div>
          <h1 className="text-4xl font-black text-blue-900 uppercase tracking-tight">
            Digitale Werkbon
          </h1>
          <p className="text-gray-600 mt-2 font-medium">
            Vul de gegevens in voor de administratie.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form action="https://api.web3forms.com/submit" method="POST" className="p-8">
            
            {/* Hidden Web3Forms Config */}
            <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
            <input type="hidden" name="subject" value={`${kenteken ? kenteken.toUpperCase() : 'Nieuwe'} Werkbon`} />
            <input type="hidden" name="from_name" value="AGP Werkbon Systeem" />
            
            {/* KENTEKEN SECTIE */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2 ml-1">
                Kenteken
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Car size={20} />
                </div>
                <input
                  type="text"
                  name="kenteken"
                  required
                  placeholder="XX-000-X"
                  value={kenteken}
                  onChange={(e) => setKenteken(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-yellow-400 border-2 border-black text-black font-black text-2xl rounded-lg focus:ring-4 focus:ring-blue-200 outline-none uppercase placeholder:text-yellow-700/50"
                />
              </div>
            </div>

            <hr className="my-8 border-gray-100" />

            {/* TYPE WERKZAAMHEID SECTIE */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 uppercase mb-4 ml-1">
                Type Werkzaamheid
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition hover:border-blue-400 group has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 border-gray-200">
                  <input 
                    type="radio" 
                    name="type_werkzaamheid" 
                    value="Reparatie" 
                    required 
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500" 
                  />
                  <div className="ml-4">
                    <span className="block font-black text-lg text-gray-800 uppercase">Ruit Reparatie</span>
                    <span className="text-sm text-gray-500 font-medium">Sterretje herstellen</span>
                  </div>
                </label>

                <label className="relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition hover:border-blue-400 group has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 border-gray-200">
                  <input 
                    type="radio" 
                    name="type_werkzaamheid" 
                    value="Vervanging" 
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500" 
                  />
                  <div className="ml-4">
                    <span className="block font-black text-lg text-gray-800 uppercase">Ruit Vervangen</span>
                    <span className="text-sm text-gray-500 font-medium">Nieuwe ruit plaatsen</span>
                  </div>
                </label>
              </div>
            </div>

            <hr className="my-8 border-gray-100" />

            {/* CHECKLIST SECTIE */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                Gebruikte Onderdelen & Service
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'regen_sensor', label: 'Regen Sensor' },
                  { id: 'clips', label: 'Clips' },
                  { id: 'boven_lijst', label: 'Boven lijst' },
                  { id: 'driekwart_lijst', label: '3/4 Lijst' },
                  { id: 'statische_calibratie', label: 'Statische Calibratie' },
                  { id: 'dynamische_calibratie', label: 'Dynamische Calibratie' }
                ].map((item) => (
                  <label 
                    key={item.id}
                    className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition cursor-pointer group"
                  >
                    <input 
                      type="checkbox" 
                      name={item.label} 
                      value="Ja"
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 font-semibold text-gray-700 group-hover:text-blue-900">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* OPMERKINGEN SECTIE */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2 ml-1 flex items-center gap-2">
                <AlertCircle size={16} />
                Uitzonderingen of Opmerkingen
              </label>
              <textarea
                name="opmerkingen"
                rows={4}
                placeholder="Noteer hier eventuele bijzonderheden of extra werkzaamheden..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition resize-none"
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-xl shadow-lg shadow-red-200 flex items-center justify-center gap-3 text-xl transition transform hover:-translate-y-1 active:scale-[0.98]"
            >
              Werkbon Versturen
              <Send size={24} />
            </button>

          </form>
        </div>
        
        <p className="text-center text-gray-400 mt-8 text-sm">
          De ingevulde gegevens worden direct verzonden naar de administratie.
        </p>
      </div>
    </div>
  );
};

export default Werkbon;