import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, Paperclip, User, FileText, Loader2, CheckCircle, AlertCircle, Car, Phone, MapPin, Briefcase, Wrench, CreditCard } from 'lucide-react';
// Zorg dat dit pad klopt naar jouw logo
import Logo from '../assets/AutoglasPRO-logo-2.png';

export const Intake: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{success: boolean, message: string} | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  // State voor dynamische velden
  const [jobType, setJobType] = useState<string>("");
  const [billingType, setBillingType] = useState<string>("");

  // --- CUSTOM ICON LOGICA ---
// --- CUSTOM ICON LOGICA ---
  useEffect(() => {
    const changeIcon = (iconName: string) => {
      const appleIcon = document.getElementById('app-icon') as HTMLLinkElement;
      const favIcon = document.getElementById('fav-icon') as HTMLLinkElement;
      
      if (appleIcon) appleIcon.href = iconName;
      if (favIcon) favIcon.href = iconName;
    };

    // 1. Zet icoon op intakelogo bij binnenkomst
    changeIcon('/intakelogo.png'); 

    // 2. Zet terug naar een standaard logo bij verlaten (bijv. Logo5 of een andere)
    // Als je geen standaard hebt, kun je deze regels weglaten of naar intakelogo laten wijzen.
    return () => {
      changeIcon('/Logo5.png'); // Pas dit aan naar je algemene logo (dat ook in public staat)
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);

    const formData = new FormData(e.currentTarget);
    
    // --- VALIDATIE: Kenteken OF Chassisnummer verplicht ---
    const kenteken = formData.get("Kenteken")?.toString().trim();
    const chassis = formData.get("Chassis")?.toString().trim();

    if (!kenteken && !chassis) {
      setResult({ 
        success: false, 
        message: "Vul minimaal een Kenteken OF een Chassisnummer in." 
      });
      // Scroll naar boven
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // We sturen een nieuw type werk mee zodat de API weet dat dit het uitgebreide formulier is
    formData.append("Type_Werk", "Intake_Nieuw"); 

    try {
      const response = await fetch("https://autoglasproapi.timosteen22.workers.dev", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult({ success: true, message: "Intake succesvol verzonden!" });
        formRef.current?.reset();
        setFiles([]);
        setJobType("");
        setBillingType("");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setResult({ success: false, message: data.message || "Fout bij verzenden." });
      }
    } catch (error: any) {
      setResult({ success: false, message: "Netwerkfout: " + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#005CAB] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#E30613]"></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block mb-4 shadow-sm border border-white/20">
            <img src={Logo} alt="Autoglas Pro Logo" className="h-12 md:h-14 w-auto object-contain" />
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <FileText className="text-[#E30613]" /> Nieuwe Opdracht / Intake
          </h1>
        </div>

        <form ref={formRef} onSubmit={onSubmit} className="p-8 space-y-8">
          
          {/* Status Melding */}
          {result && (
            <div className={`p-4 rounded-lg flex items-center gap-3 border ${result.success ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {result.success ? <CheckCircle className="shrink-0" /> : <AlertCircle className="shrink-0" />}
              <span className="font-medium">{result.message}</span>
            </div>
          )}

          {/* 1. VOERTUIG GEGEVENS */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[#005CAB] flex items-center gap-2 border-b pb-2">
              <Car size={20} /> Voertuig Gegevens
              <span className="text-xs font-normal text-gray-500 ml-auto">(Vul minstens 1 van de 2 in)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Kenteken</label>
                <input type="text" name="Kenteken" placeholder="X-123-XX" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB] uppercase" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Chassisnummer (VIN)</label>
                <input type="text" name="Chassis" placeholder="Volledig chassisnummer" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB] uppercase" />
              </div>
            </div>
          </section>

          {/* 2. CONTACT GEGEVENS */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[#005CAB] flex items-center gap-2 border-b pb-2">
              <User size={20} /> Contactgegevens Klant
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Volledige Naam</label>
                <input type="text" name="Naam" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">E-mailadres</label>
                   <div className="relative">
                     <Mail size={18} className="absolute top-3.5 left-3 text-gray-400" />
                     <input type="email" name="Email_Klant" className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB]" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Telefoonnummer</label>
                   <div className="relative">
                     <Phone size={18} className="absolute top-3.5 left-3 text-gray-400" />
                     <input type="tel" name="Telefoon" className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB]" />
                   </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                 <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Postcode</label>
                    <input type="text" name="Postcode" placeholder="1234 AB" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB]" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Huisnr.</label>
                    <input type="text" name="Huisnummer" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB]" />
                 </div>
              </div>
            </div>
          </section>

          {/* 3. TYPE OPDRACHT */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[#005CAB] flex items-center gap-2 border-b pb-2">
              <Wrench size={20} /> Type Opdracht
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
               {['Ster', 'Vervangen', 'Tinten', 'Polijsten'].map((type) => (
                 <label key={type} className={`cursor-pointer border-2 rounded-xl p-3 text-center transition-all ${jobType === type ? 'border-[#E30613] bg-red-50 text-[#E30613] font-bold' : 'border-gray-200 hover:border-gray-300'}`}>
                   <input type="radio" name="Opdracht_Type" value={type} className="hidden" onChange={(e) => setJobType(e.target.value)} />
                   {type}
                 </label>
               ))}
            </div>

            {/* Conditionele Velden Opdracht */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4 animate-in fade-in slide-in-from-top-2">
              
              {jobType === 'Ster' && (
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Aantal Sterren</label>
                   <select name="Aantal_Sterren" className="w-full p-3 border border-gray-300 rounded-lg">
                     <option value="1">1 Ster</option>
                     <option value="2">2 Sterren</option>
                     <option value="3">3 Sterren</option>
                   </select>
                </div>
              )}

              {(jobType === 'Ster' || jobType === 'Vervangen') && (
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Schadedatum</label>
                   <input type="date" name="Schadedatum" className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
              )}
              
              {(jobType === 'Tinten' || jobType === 'Polijsten') && (
                <p className="text-sm text-gray-500 italic">Voor {jobType.toLowerCase()} zijn geen extra details vereist.</p>
              )}
               
               {jobType === "" && <p className="text-sm text-gray-400 italic">Selecteer eerst een type opdracht.</p>}
            </div>
          </section>

          {/* 4. FACTURATIE */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[#005CAB] flex items-center gap-2 border-b pb-2">
              <CreditCard size={20} /> Facturatie
            </h2>
            
            <select 
              name="Facturatie_Type" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB]"
              onChange={(e) => setBillingType(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Kies facturatie methode...</option>
              <option value="Lease">Leasemaatschappij</option>
              <option value="Verzekeraar">Verzekeraar</option>
              <option value="Garage">Garagebedrijf</option>
              <option value="Particulier">Particulier</option>
            </select>

            {/* Conditionele Velden Facturatie */}
            {billingType && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4 animate-in fade-in slide-in-from-top-2">
                
                {billingType === 'Lease' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Naam Leasemaatschappij</label>
                    <input type="text" name="Leasemaatschappij" required className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>
                )}

                {billingType === 'Verzekeraar' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Naam Verzekeraar</label>
                      <input type="text" name="Verzekeraar_Naam" required className="w-full p-3 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Polisnummer</label>
                      <input type="text" name="Polisnummer" required className="w-full p-3 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                )}

                {billingType === 'Garage' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Naam Garagebedrijf <span className="text-red-500">*</span></label>
                    <input type="text" name="Garage_Naam" required className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>
                )}

                {billingType === 'Particulier' && (
                  <p className="text-sm text-gray-500 italic">Factuur wordt op naam van de klant gezet.</p>
                )}
              </div>
            )}
          </section>

          {/* 5. BESTANDEN & OPMERKINGEN */}
          <section className="space-y-4">
             <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Extra Opmerkingen</label>
              <textarea name="Opmerkingen" rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB]"></textarea>
             </div>

             <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-blue-50 transition-all text-center cursor-pointer relative group">
              <input type="file" name="attachment" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="flex flex-col items-center">
                <Paperclip className="text-gray-400 group-hover:text-[#005CAB] mb-2" />
                <span className="text-gray-700 font-bold">{files.length > 0 ? `${files.length} bestand(en)` : "Foto's / Bijlagen toevoegen"}</span>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E30613] hover:bg-red-700 hover:-translate-y-1'}`}
          >
            {isSubmitting ? <><Loader2 className="animate-spin" /> Verwerken...</> : <><Send size={20} /> Opdracht Versturen</>}
          </button>

        </form>
      </div>
    </div>
  );
};