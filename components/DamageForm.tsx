import React, { useState } from 'react';
import { Camera, Send, FileUp } from 'lucide-react';

export const DamageForm: React.FC = () => {
  const [result, setResult] = useState<string>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Verzenden....");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY_HERE"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Bedankt! Uw melding is succesvol ontvangen. Wij nemen spoedig contact op.");
        (event.target as HTMLFormElement).reset();
      } else {
        console.error("Error", data);
        setResult("Er ging iets mis. Probeer het later opnieuw of bel ons direct.");
      }
    } catch (error) {
      console.error(error);
      setResult("Er is een fout opgetreden. Controleer uw verbinding.");
    }
  };

  return (
    <div id="schade-melden" className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 relative">
      <div className="bg-agp-red h-2 w-full"></div>
      
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-50 rounded-full">
            <Camera className="w-8 h-8 text-agp-red" />
          </div>
          <h2 className="text-3xl font-extrabold text-agp-blue">Online Schade Melden</h2>
        </div>
        
        <p className="text-gray-600 mb-8">
          Heeft u ruitschade? Vul het formulier in en wij beoordelen direct of reparatie mogelijk is of dat vervanging noodzakelijk is.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <input type="hidden" name="subject" value="Nieuwe Schademelding via Website" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kenteken</label>
              <div className="relative flex items-stretch w-full h-[52px] bg-[#ffcc00] border-2 border-black rounded-md overflow-hidden shadow-sm">
                <div className="bg-[#003399] w-10 flex flex-col items-center justify-between py-1 shrink-0 z-10">
                   <div className="border border-white/80 rounded-full w-5 h-5 flex items-center justify-center">
                     <svg viewBox="0 0 12 12" className="w-3 h-3 fill-white">
                       <path d="M6 0.5l0.5 1.5h1.5l-1.2 0.9 0.5 1.5-1.3-0.9-1.3 0.9 0.5-1.5-1.2-0.9h1.5z"/>
                     </svg>
                   </div>
                   <span className="text-white font-bold text-[10px]">NL</span>
                </div>
                <input 
                  type="text" 
                  name="license_plate" 
                  required
                  placeholder="X-999-XX"
                  className="w-full bg-transparent border-none text-black font-mono text-center font-bold text-xl uppercase placeholder-black/30 focus:ring-0 focus:outline-none h-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Telefoonnummer</label>
              <input 
                type="tel" 
                name="phone" 
                required
                placeholder="06 12345678"
                className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-agp-blue focus:border-agp-blue focus:outline-none transition h-[52px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Naam</label>
              <input 
                type="text" 
                name="name" 
                required
                placeholder="Uw volledige naam"
                className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-agp-blue focus:border-agp-blue focus:outline-none transition"
              />
            </div>
             <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">E-mailadres</label>
              <input 
                type="email" 
                name="email" 
                required
                placeholder="uw@email.nl"
                className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-agp-blue focus:border-agp-blue focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Foto's uploaden (optioneel)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer relative group">
              <input 
                type="file" 
                name="attachment" 
                accept="image/*" 
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <FileUp className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-agp-blue transition" />
              <p className="text-sm text-gray-500 group-hover:text-agp-blue transition">Klik om foto's van de schade te selecteren</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Opmerkingen</label>
            <textarea 
              name="message" 
              rows={4}
              placeholder="Vertel ons kort wat er is gebeurd..."
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-agp-blue focus:border-agp-blue focus:outline-none transition"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 px-6 bg-agp-red text-white font-bold text-lg rounded-lg shadow-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2 group border-b-4 border-red-800 active:border-b-0 active:translate-y-1"
          >
            <span>Verstuur Melding</span>
            <Send className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>

          {result && (
            <div className={`p-4 rounded-lg text-center font-medium ${result.includes("Bedankt") ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
              {result}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};