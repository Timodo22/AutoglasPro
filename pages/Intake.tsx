import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, Send, User, FileText, Loader2, CheckCircle, AlertCircle, 
  Car, Phone, MapPin, Briefcase, Wrench, CreditCard, 
  Camera, Trash2, FileBarChart 
} from 'lucide-react';
import imageCompression from 'browser-image-compression';
// Zorg dat dit pad klopt naar jouw logo
import Logo from '../assets/AutoglasPRO-logo-2.png';

// --- HELPER: FORMATTEER BYTES (Overgenomen uit Werkbon) ---
const formatBytes = (bytes: number, decimals = 1) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// --- HELPER: DATUM/TIJD IN BRANDEN (Overgenomen uit Werkbon) ---
const addTimestampToImage = async (imageFile: File): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(imageFile);

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      // Tekst instellingen
      const fontSize = Math.floor(canvas.width * 0.03); 
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = '#FFD700'; 
      ctx.strokeStyle = 'black'; 
      ctx.lineWidth = Math.floor(fontSize / 6);
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'right';

      const dateObj = new Date(imageFile.lastModified);
      const dateStr = dateObj.toLocaleDateString('nl-NL');
      const timeStr = dateObj.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
      const text = `${dateStr} ${timeStr}`;

      const margin = Math.floor(canvas.width * 0.02);
      const x = canvas.width - margin;
      const y = canvas.height - margin;

      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);

      canvas.toBlob((blob) => {
        if (blob) {
          const newFile = new File([blob], imageFile.name, {
            type: 'image/jpeg',
            lastModified: dateObj.getTime(),
          });
          resolve(newFile);
        } else {
          resolve(imageFile);
        }
      }, 'image/jpeg', 0.60); 
    };

    img.onerror = () => resolve(imageFile);
  });
};

export const Intake: React.FC = () => {
  // --- STATE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{success: boolean, message: string} | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // State voor dynamische velden
  const [jobType, setJobType] = useState<string>("");
  const [billingType, setBillingType] = useState<string>("");

  // State voor bestanden (Nieuw)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // --- CALCULATIES ---
  const totalOriginalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
  
  const estimatedCompressedSize = selectedFiles.reduce((acc, file) => {
    const targetSize = 0.3 * 1024 * 1024; // 0.3 MB per foto doel
    return acc + Math.min(file.size, targetSize);
  }, 0);

  // --- CUSTOM ICON LOGICA ---
  useEffect(() => {
    const changeIcon = (iconName: string) => {
      const appleIcon = document.getElementById('app-icon') as HTMLLinkElement;
      const favIcon = document.getElementById('fav-icon') as HTMLLinkElement;
      
      if (appleIcon) appleIcon.href = iconName;
      if (favIcon) favIcon.href = iconName;
    };

    changeIcon('/intakelogo.png'); 

    return () => {
      changeIcon('/Logo5.png'); 
    };
  }, []);

  // --- BESTAND HANDLERS ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removePhoto = (index: number) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    
    // Revoke object URL om geheugen vrij te maken
    URL.revokeObjectURL(newPreviews[index]);

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  // --- SUBMIT HANDLER ---
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);

    const formData = new FormData(e.currentTarget);
    
    // Validatie: Kenteken OF Chassis
    const kenteken = formData.get("Kenteken")?.toString().trim();
    const chassis = formData.get("Chassis")?.toString().trim();

    if (!kenteken && !chassis) {
      setResult({ 
        success: false, 
        message: "Vul minimaal een Kenteken OF een Chassisnummer in." 
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Standaard velden
    formData.append("Type_Werk", "Intake_Nieuw"); 
    
    // Verwijder eventuele lege bestand-inputs die HTML standaard meegeeft
    formData.delete("attachment");

    // --- FOTO VERWERKING (Uit Werkbon) ---
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      fileType: "image/jpeg"
    };

    try {
      if (selectedFiles.length > 0) {
        console.log(`Start verwerken van ${selectedFiles.length} foto's...`);
        
        for (const file of selectedFiles) {
          // 1. Comprimeren
          const compressedBlob = await imageCompression(file, options);
          
          const fileWithOriginalTime = new File([compressedBlob], file.name, {
             type: compressedBlob.type,
             lastModified: file.lastModified 
          });

          // 2. Datumstempel toevoegen
          const stampedFile = await addTimestampToImage(fileWithOriginalTime);
          
          // 3. Toevoegen aan FormData
          formData.append("attachment", stampedFile, file.name);
        }
      }

      console.log("Uploaden naar Cloudflare Worker...");

      const response = await fetch("https://autoglasproapi.timosteen22.workers.dev", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult({ success: true, message: "Intake succesvol verzonden!" });
        formRef.current?.reset();
        setSelectedFiles([]);
        setPreviews([]);
        setJobType("");
        setBillingType("");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setResult({ success: false, message: data.message || "Fout bij verzenden." });
      }
    } catch (error: any) {
      setResult({ success: false, message: "Netwerkfout: " + error.message });
      console.error(error);
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

          {/* 5. BESTANDEN & OPMERKINGEN (GEUPDATE MET PREVIEWS) */}
          <section className="space-y-4">
             <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Extra Opmerkingen</label>
              <textarea name="Opmerkingen" rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005CAB]"></textarea>
             </div>

             <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
               <Camera size={18} /> Foto's & Bijlagen
             </label>

             {/* Nieuwe Upload UI */}
             <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition text-center group relative">
                <input type="file" id="file-upload" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                <label htmlFor="file-upload" className="cursor-pointer block w-full h-full">
                  <div className="mb-3 flex justify-center">
                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition">
                        <Camera className="text-[#005CAB]" size={24} />
                    </div>
                  </div>
                  <span className="block font-bold text-[#005CAB]">Klik om foto's toe te voegen</span>
                  <span className="block text-xs text-gray-400 mt-1">Meerdere selectie mogelijk • Auto-compressie</span>
                </label>
             </div>

             {/* DATA GEBRUIK BALKJE */}
             {selectedFiles.length > 0 && (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between text-xs md:text-sm text-blue-800">
                   <div className="flex items-center gap-2">
                      <FileBarChart size={16} />
                      <span className="font-bold">Org:</span> {formatBytes(totalOriginalSize)}
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="font-bold text-green-700">Geschat:</span> ~{formatBytes(estimatedCompressedSize)}
                   </div>
                </div>
             )}

             {/* PREVIEWS */}
             {previews.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                   {previews.map((src, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group shadow-sm">
                         <img src={src} alt="Preview" className="w-full h-full object-cover" />
                         
                         {/* Grootte overlay */}
                         <div className="absolute bottom-0 left-0 bg-black/60 text-white text-[10px] px-2 py-1 rounded-tr-lg">
                            {formatBytes(selectedFiles[index].size)}
                         </div>

                         {/* Verwijder knop */}
                         <button type="button" onClick={() => removePhoto(index)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="text-white w-8 h-8" />
                         </button>
                      </div>
                   ))}
                </div>
             )}
          </section>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E30613] hover:bg-red-700 hover:-translate-y-1'}`}
          >
            {isSubmitting ? <><Loader2 className="animate-spin" /> Verwerken & Versturen...</> : <><Send size={20} /> Opdracht Versturen</>}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Intake;