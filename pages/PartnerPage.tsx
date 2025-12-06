import React from 'react';
import { CheckCircle } from 'lucide-react';

export const PartnerPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-slate-100 py-16 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-agp-blue mb-4">Trotse partner van <span className="text-agp-red">123Ruit.nl</span></h1>
          <div className="h-1 w-20 bg-agp-red mx-auto"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-agp-blue">Samen sterk voor de beste kwaliteit</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Autoglas Pro is aangesloten bij 123Ruit.nl, een samenwerkingsverband van zelfstandige autoruitspecialisten. 
            Dit betekent dat u bij ons geniet van de service van een lokale ondernemer, gecombineerd met de zekerheid van een landelijke organisatie.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
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
                <CheckCircle className="text-agp-red" size={24} />
                <span className="font-semibold text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center h-full">
            <div className="w-48 h-48 bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
                {/* Simulated Logo Placeholder */}
                <div className="text-3xl font-black italic">
                    <span className="text-black">123</span><span className="text-agp-red">RUIT</span><span className="text-gray-400 text-sm">.nl</span>
                </div>
            </div>
            <p className="font-bold text-xl text-agp-blue">De zekerheid van een specialist.</p>
            <div className="h-2 w-32 mt-6 rounded-full bg-agp-red" />
        </div>
      </div>
    </div>
  );
};