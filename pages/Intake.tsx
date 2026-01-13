import React, { useState } from 'react';
import { Mail, Send, Paperclip, User, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
// Importeer je PNG logo (pad gebaseerd op je screenshot)
import Logo from '../assets/AutoglasPRO-logo-2.png';

export const Intake: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{success: boolean, message: string} | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Voeg instellingen toe voor de Worker
    formData.append("Type_Werk", "Vrije_Email"); 

    try {
      const response = await fetch("https://autoglasproapi.timosteen22.workers.dev", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult({ success: true, message: "E-mail succesvol verzonden naar de klant!" });
        form.reset();
        setFiles([]);
        // Scroll naar boven zodat je het succesbericht ziet
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error(data);
        setResult({ success: false, message: data.message || "Fout bij verzenden." });
      }
    } catch (error: any) {
      setResult({ success: false, message: "Netwerkfout: " + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header met Logo */}
        <div className="bg-[#005CAB] p-8 text-white text-center relative overflow-hidden">
          {/* Decoratieve rode streep (Autoglas huisstijl) */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#E30613]"></div>
          
          {/* Logo Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block mb-4 shadow-sm border border-white/20">
            <img 
              src={Logo} 
              alt="Autoglas Pro Logo" 
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <Mail className="text-[#E30613]" /> Klant Intake & Mail
          </h1>
          <p className="text-blue-100 text-sm mt-2 opacity-90">Stuur direct een bevestiging of offerte naar de klant</p>
        </div>

        <form onSubmit={onSubmit} className="p-8 space-y-6">
          
          {/* Resultaat Message (Bovenaan voor duidelijkheid) */}
          {result && (
            <div className={`p-4 rounded-lg flex items-center gap-3 border ${result.success ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {result.success ? <CheckCircle className="shrink-0" /> : <AlertCircle className="shrink-0" />}
              <span className="font-medium">{result.message}</span>
            </div>
          )}

          {/* Ontvanger */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Naar E-mailadres (Klant)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#005CAB] transition-colors">
                <User size={18} />
              </div>
              <input 
                type="email" 
                name="Email_To" 
                required 
                placeholder="klant@email.nl" 
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB] focus:border-[#005CAB] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Onderwerp */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Onderwerp</label>
            <input 
              type="text" 
              name="Onderwerp" 
              required 
              placeholder="Bijv: Offerte Ruitvervanging of Afspraakbevestiging" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB] focus:border-[#005CAB] focus:outline-none font-medium transition-all"
            />
          </div>

          {/* Bericht */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Bericht</label>
            <textarea 
              name="Bericht" 
              required 
              rows={8} 
              placeholder="Beste klant,&#10;&#10;Hierbij ontvangt u..." 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB] focus:border-[#005CAB] focus:outline-none transition-all"
            ></textarea>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
              Dit bericht wordt automatisch in de officiële Autoglas Pro huisstijl gezet.
            </p>
          </div>

          {/* Bestanden */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Bijlagen (PDF, Foto's, etc.)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-blue-50 hover:border-blue-300 transition-all text-center cursor-pointer relative group">
              <input 
                type="file" 
                name="attachment" 
                multiple 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
                <div className="bg-gray-100 p-3 rounded-full mb-3 group-hover:bg-white group-hover:shadow-md transition-all">
                   <Paperclip className="text-gray-500 group-hover:text-[#005CAB]" />
                </div>
                <span className="text-gray-700 font-bold">
                  {files.length > 0 ? `${files.length} bestand(en) geselecteerd` : "Klik om bestanden toe te voegen"}
                </span>
                <span className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 40MB totaal)</span>
              </div>
            </div>
            
            {/* Bestanden lijst */}
            {files.length > 0 && (
              <div className="mt-3 bg-gray-50 rounded-lg border border-gray-200 divide-y divide-gray-200">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 text-sm text-gray-700">
                    <FileText size={16} className="text-[#005CAB]" />
                    <span className="truncate flex-1">{f.name}</span>
                    <span className="text-xs text-gray-400">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`
              w-full text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg transition-all transform
              ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#E30613] hover:bg-red-700 hover:-translate-y-1 shadow-red-200'
              }
            `}
          >
            {isSubmitting ? <><Loader2 className="animate-spin" /> Versturen...</> : <><Send size={20} /> Verstuur E-mail</>}
          </button>

        </form>
      </div>
      
      <p className="text-center text-gray-400 mt-8 text-sm">Autoglas Pro Intern Systeem</p>
    </div>
  );
};