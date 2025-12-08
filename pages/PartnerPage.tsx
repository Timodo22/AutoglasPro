import React from 'react';
import { CheckCircle } from 'lucide-react';

export const PartnerPage: React.FC = () => {
  // De specifieke groene kleur van 123Ruit.nl (gesampled van het logo)
  const ruitGreenClass = "text-[#6c9d30]";
  const ruitGreenBgClass = "bg-[#6c9d30]";

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-slate-50 py-16 text-center border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          {/* Koppen veranderd van agp-blue naar een neutrale donkere slate kleur */}
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Trotse partner van <span className={ruitGreenClass}>123Ruit.nl</span>
          </h1>
          {/* Rode onderstreping vervangen door de groene kleur */}
          <div className={`h-1 w-24 ${ruitGreenBgClass} mx-auto rounded-full`}></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center top-section">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Samen sterk voor de beste kwaliteit</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Autoglas Pro is aangesloten bij 123Ruit.nl, een samenwerkingsverband van zelfstandige autoruitspecialisten.
            Dit betekent dat u bij ons geniet van de service van een lokale ondernemer, gecombineerd met de zekerheid van een landelijke organisatie.
          </p>
          <p className="text-slate-600 mb-8 leading-relaxed">
            123Ruit.nl staat garant voor kwaliteit, vakkennis en eerlijke prijzen. Doordat wij geen dure landelijke reclamecampagnes voeren, kunnen wij u een scherp tarief bieden zonder in te leveren op kwaliteit.
          </p>
          
          <ul className="space-y-4">
            {[
              "Landelijke dekking en garantie",
              "Erkend door verzekeraars",
              "Montage volgens fabrieksvoorschriften",
              "Uitsluitend gebruik van OEM-kwaliteit glas"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                {/* Vinkjes zijn nu groen */}
                <CheckCircle className={ruitGreenClass} size={24} />
                <span className="font-semibold text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center h-full shadow-sm relative overflow-hidden">
            {/* Een subtiele groene gloed op de achtergrond van de kaart */}
            <div className={`absolute top-0 left-0 w-full h-2 ${ruitGreenBgClass} opacity-80`}></div>

            <div className="w-60 h-60 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center mb-8 p-6 transition-transform hover:scale-105 duration-300">
                {/* HET NIEUWE LOGO */}
                <img 
                  src="https://123ruit.nl/wp-content/uploads/2023/06/Logo_123Ruit_FC_Green_Large-300x200.png" 
                  alt="123Ruit.nl Logo"
                  className="w-full h-auto object-contain"
                />
            </div>
            {/* Tekst kleur aangepast */}
            <p className="font-bold text-2xl text-slate-800">De zekerheid van een specialist.</p>
            {/* Balk onderaan is nu groen */}
            <div className={`h-2 w-32 mt-6 rounded-full ${ruitGreenBgClass}`} />
        </div>
      </div>
    </div>
  );
};