import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { DamageForm } from '../components/DamageForm';

export const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black text-slate-900 mb-12 text-center">Contact opnemen</h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Gegevens</h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-agp-blue/10 text-agp-blue rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Adres</h3>
                    <p className="text-gray-600">Oostwijk 1C</p>
                    <p className="text-gray-600">5406 XT Uden</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-agp-blue/10 text-agp-blue rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Telefoon</h3>
                    <a href="tel:0413331619" className="text-gray-600 hover:text-agp-red transition">0413 331 619</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-agp-blue/10 text-agp-blue rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">E-mail</h3>
                    <a href="mailto:info@autoglaspro.nl" className="text-gray-600 hover:text-agp-red transition">info@autoglaspro.nl</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-agp-blue/10 text-agp-blue rounded-full flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Openingstijden</h3>
                    <p className="text-gray-600">Maandag - Vrijdag: 08:30 - 17:30</p>
                    <p className="text-gray-600">Zaterdag: Op afspraak</p>
                    <p className="text-gray-600">Zondag: Gesloten</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Map Embed Placeholder */}
            <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.3486588647037!2d5.6247949!3d51.6166549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c71a3964177239%3A0xe5a3c2678f8c471a!2sOostwijk+1c%2C+5406+XT+Uden!5e0!3m2!1sen!2snl!4v1563287654321!5m2!1sen!2snl" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen 
                 loading="lazy" 
                 title="Google Maps"
               ></iframe>
            </div>
          </div>

          {/* Form */}
          <div>
            <DamageForm />
          </div>
        </div>
      </div>
    </div>
  );
};