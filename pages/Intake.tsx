import React, { useState } from 'react';
import { Mail, Send, Paperclip, User, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

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
    formData.append("Type_Werk", "Vrije_Email"); // Dit vertelt de worker dat het een Intake mail is

    try {
      // Voeg de bestanden toe (ZONDER compressie, want het kunnen PDF's zijn)
      // Als je bestanden al in de form input zitten, doet FormData dit automatisch,
      // maar we doen het voor de zekerheid expliciet als je state gebruikt.
      
      const response = await fetch("https://autoglasproapi.timosteen22.workers.dev", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult({ success: true, message: "E-mail succesvol verzonden naar de klant!" });
        form.reset();
        setFiles([]);
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
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#005CAB] p-6 text-white text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <Mail /> Klant Intake & Mail
          </h1>
          <p className="text-blue-200 text-sm mt-1">Stuur direct een bevestiging of offerte</p>
        </div>

        <form onSubmit={onSubmit} className="p-8 space-y-6">
          
          {/* Ontvanger */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Naar E-mailadres (Klant)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input 
                type="email" 
                name="Email_To" 
                required 
                placeholder="klant@email.nl" 
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
            <p className="text-xs text-gray-400 mt-1">Dit bericht wordt automatisch in de Autoglas Pro huisstijl gezet.</p>
          </div>

          {/* Bestanden */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Bijlagen (PDF, Foto's, etc.)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition text-center cursor-pointer relative">
              <input 
                type="file" 
                name="attachment" 
                multiple 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <Paperclip className="text-gray-400 mb-2" />
                <span className="text-gray-600 font-medium">
                  {files.length > 0 ? `${files.length} bestand(en) geselecteerd` : "Klik om bestanden toe te voegen"}
                </span>
                <span className="text-xs text-gray-400 mt-1">Max 40MB totaal</span>
              </div>
            </div>
            {files.length > 0 && (
              <ul className="mt-2 text-sm text-gray-600">
                {files.map((f, i) => <li key={i} className="flex items-center gap-2"><FileText size={14}/> {f.name}</li>)}
              </ul>
            )}
          </div>

          {/* Resultaat Message */}
          {result && (
            <div className={`p-4 rounded-lg flex items-center gap-3 ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {result.success ? <CheckCircle /> : <AlertCircle />}
              {result.message}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#E30613] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Verstuur E-mail</>}
          </button>

        </form>
      </div>
    </div>
  );
};