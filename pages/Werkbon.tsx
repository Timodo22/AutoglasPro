import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Car, CheckCircle, AlertCircle, Send, Star, 
  Camera, Trash2, Building2, Shield, Loader2, Check, FileBarChart, Calendar 
} from 'lucide-react';
import imageCompression from 'browser-image-compression';

// --- HELPER: FORMATTEER BYTES ---
const formatBytes = (bytes: number, decimals = 1) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// --- HELPER: DATUM/TIJD IN BRANDEN ---
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

export const Werkbon: React.FC = () => {
  // --- STATE ---
  const [kenteken, setKenteken] = useState('');
  const [stars, setStars] = useState(0);
  const [workType, setWorkType] = useState(''); 
  const [customerType, setCustomerType] = useState('B2B');
  const [remarks, setRemarks] = useState('');
  
  // Nieuwe state voor Datum (standaard op vandaag)
  const [workDate, setWorkDate] = useState(new Date().toISOString().split('T')[0]);
  
  // File state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // --- CUSTOM ICON LOGICA ---
// --- CUSTOM ICON LOGICA ---
  useEffect(() => {
    const changeIcon = (iconName: string) => {
      const appleIcon = document.getElementById('app-icon') as HTMLLinkElement;
      const favIcon = document.getElementById('fav-icon') as HTMLLinkElement;
      
      if (appleIcon) appleIcon.href = iconName;
      if (favIcon) favIcon.href = iconName;
    };

    // 1. Zet icoon op werkbonlogo bij binnenkomst
    changeIcon('/werkbonlogo.png'); 

    // 2. Zet terug naar standaard bij verlaten
    return () => {
      changeIcon('/Logo5.png'); // Pas aan naar je standaard logo
    };
  }, []);

  // --- CALCULATIES ---
  const totalOriginalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
  
  const estimatedCompressedSize = selectedFiles.reduce((acc, file) => {
    const targetSize = 0.3 * 1024 * 1024; // 0.3 MB
    return acc + Math.min(file.size, targetSize);
  }, 0);

  // --- HANDLERS ---
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
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  // --- VERZEND LOGICA ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData();

    formData.append("Klant_Type", customerType);
    formData.append("Kenteken", kenteken.toUpperCase());
    formData.append("Type_Werk", workType);
    formData.append("Datum", workDate); // Datum toevoegen aan form data
    
    if (workType === 'Reparatie' && stars > 0) {
        formData.append("Aantal_Sterren", stars.toString());
    }
    
    formData.append("Opmerkingen", remarks);

    const formElement = e.currentTarget;
    const checkboxes = formElement.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
      formData.append((checkbox as HTMLInputElement).name, "Ja");
    });

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
          const compressedBlob = await imageCompression(file, options);
          
          const fileWithOriginalTime = new File([compressedBlob], file.name, {
             type: compressedBlob.type,
             lastModified: file.lastModified 
          });

          const stampedFile = await addTimestampToImage(fileWithOriginalTime);
          
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
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error("API Error Message:", data.message);
        setErrorMessage(data.message || "Er is iets misgegaan bij de server.");
      }

    } catch (error: any) {
      console.error("Technische Fout:", error);
      setErrorMessage(`Er is een technische fout opgetreden: ${error.message || error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-2">Werkbon Verstuurd!</h2>
          <p className="text-gray-500 mb-8">De werkbon en {selectedFiles.length} foto's zijn succesvol verkleind en verzonden.</p>
          <button onClick={() => window.location.reload()} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition">
            Nieuwe Werkbon Starten
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 text-white rounded-xl mb-4 shadow-lg">
            <ClipboardList size={32} />
          </div>
          <h1 className="text-4xl font-black text-blue-900 uppercase tracking-tight">Digitale Werkbon aanpassen</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            
            {/* KLANT TYPE */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 uppercase mb-3 ml-1">Type Opdrachtgever</label>
              <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 rounded-xl">
                <button type="button" onClick={() => setCustomerType('B2B')} className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all font-bold text-lg ${customerType === 'B2B' ? 'bg-white text-blue-900 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}>
                  <Building2 size={20} /> B2B
                </button>
                <button type="button" onClick={() => setCustomerType('Verzekering')} className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all font-bold text-lg ${customerType === 'Verzekering' ? 'bg-white text-green-700 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}>
                  <Shield size={20} /> Verzekering
                </button>
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            {/* KENTEKEN */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2 ml-1">Kenteken</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><Car size={20} /></div>
                <input type="text" required placeholder="XX-000-X" value={kenteken} onChange={(e) => setKenteken(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-yellow-400 border-2 border-black text-black font-black text-2xl rounded-lg focus:ring-4 focus:ring-blue-200 outline-none uppercase placeholder:text-yellow-700/50" />
              </div>
            </div>

            {/* TYPE WERK */}
            <div className="mb-8 space-y-4">
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2 ml-1">Type Werkzaamheid</label>
              
              <label className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition ${workType === 'Reparatie' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                <input type="radio" name="Type_Werk" value="Ruit Reparatie" required onChange={() => setWorkType('Reparatie')} className="w-6 h-6 text-blue-600" />
                <div className="ml-4">
                  <span className="block font-black text-xl text-gray-800 uppercase">Ruit Reparatie</span>
                  <span className="text-sm text-gray-500">Sterretje(s) herstellen</span>
                </div>
              </label>

              {workType === 'Reparatie' && (
                <div className="ml-4 md:ml-10 p-6 bg-white border-2 border-dashed border-blue-200 rounded-2xl animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-blue-900 uppercase mb-4 text-center">Aantal sterren</p>
                  <div className="flex justify-center items-center gap-6">
                    {[1, 2, 3, 4].map((num) => (
                      <button key={num} type="button" onClick={() => setStars(num)} className="focus:outline-none transition-transform active:scale-90">
                        <Star size={44} className={`transition-colors ${num <= stars ? 'fill-yellow-400 text-yellow-500' : 'text-gray-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <label className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition ${workType === 'Vervanging' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                <input type="radio" name="Type_Werk" value="Ruit Vervanging" onChange={() => { setWorkType('Vervanging'); setStars(0); }} className="w-6 h-6 text-blue-600" />
                <div className="ml-4">
                  <span className="block font-black text-xl text-gray-800 uppercase">Ruit Vervangen</span>
                </div>
              </label>
            </div>

            {/* NIEUW: DATUM VELD */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2 ml-1">Datum Uitvoering</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Calendar size={20} />
                </div>
                <input 
                  type="date" 
                  required 
                  value={workDate} 
                  onChange={(e) => setWorkDate(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 text-gray-800 font-bold text-lg rounded-lg focus:border-blue-600 outline-none" 
                />
              </div>
            </div>

            <hr className="my-8 border-gray-100" />

            {/* CHECKLIST */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2"><CheckCircle size={20} className="text-green-500" /> Onderdelen & Service</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Regen_Sensor', 'Clips', 'Boven_Lijst', 'Driekwart_Lijst', 'Statische_Calibratie', 'Dynamische_Calibratie'].map((item) => (
                  <label key={item} className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-blue-50 cursor-pointer group">
                    <input type="checkbox" name={item} className="w-5 h-5 text-blue-600 rounded" />
                    <span className="ml-3 font-semibold text-gray-700 group-hover:text-blue-900">{item.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <style>
              {`
                .fixed.bottom-6.right-6.z-50.group {
                  display: none !important;
                }
              `}
            </style>

            {/* FOTO UPLOAD */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2 ml-1">
                <label className="block text-sm font-bold text-gray-700 uppercase flex items-center gap-2">
                  <Camera size={18} /> Foto's ({selectedFiles.length})
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition text-center group relative">
                <input type="file" id="file-upload" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                <label htmlFor="file-upload" className="cursor-pointer block w-full h-full">
                  <div className="mb-3 flex justify-center">
                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition"><Camera className="text-blue-600" size={24} /></div>
                  </div>
                  <span className="block font-bold text-blue-900">Klik om foto's toe te voegen</span>
                  <span className="block text-xs text-gray-400 mt-1">Met datumstempel & max compressie</span>
                </label>
              </div>

              {/* DATA GEBRUIK BALKJE */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between text-xs md:text-sm text-blue-800">
                   <div className="flex items-center gap-2">
                      <FileBarChart size={16} />
                      <span className="font-bold">Org:</span> {formatBytes(totalOriginalSize)}
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="font-bold text-green-700">Geschat:</span> ~{formatBytes(estimatedCompressedSize)}
                   </div>
                </div>
              )}

              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {previews.map((src, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                      <img src={src} alt="Preview" className="w-full h-full object-cover" />
                      
                      {/* Grootte per foto overlay */}
                      <div className="absolute bottom-0 left-0 bg-black/60 text-white text-[10px] px-2 py-1 rounded-tr-lg">
                        {formatBytes(selectedFiles[index].size)}
                      </div>

                      <button type="button" onClick={() => removePhoto(index)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="text-white w-8 h-8" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* OPMERKINGEN */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 uppercase mb-2 ml-1">Opmerkingen</label>
              <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={4} placeholder="Bijzonderheden..." className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 outline-none"></textarea>
            </div>

            {/* ERROR */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
                <AlertCircle size={24} className="shrink-0" />
                <div><h4 className="font-bold">Er is iets misgegaan:</h4><p className="text-sm">{errorMessage}</p></div>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className={`w-full text-white font-black py-5 rounded-xl shadow-lg flex items-center justify-center gap-3 text-xl transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 shadow-red-200 transform hover:-translate-y-1'}`}>
              {isSubmitting ? <><Loader2 size={24} className="animate-spin" /> Comprimeren & Versturen...</> : <>Werkbon Versturen <Send size={24} /></>}
            </button>
          </form>
        </div>
        <p className="text-center text-gray-400 mt-8 text-sm">Autoglas Pro Digitaal &copy; 2024</p>
      </div>
    </div>
  );
};

export default Werkbon;