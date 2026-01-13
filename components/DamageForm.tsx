import React, { useState } from 'react';
import { Camera, Send, FileUp, Star, Loader2, Check, AlertCircle } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export const DamageForm: React.FC = () => {
  // --- STATE ---
  const [stars, setStars] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{success: boolean, message: string} | null>(null);

  // --- HANDLERS ---
  
  // Foto's selecteren
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  // Formulier versturen
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null); // Reset vorige resultaten

    const form = event.currentTarget;
    const rawData = new FormData(form);
    const apiData = new FormData();

    // 1. DATA KOPPELEN (Frontend velden -> API velden)
    // De namen links ("Kenteken") moeten precies matchen met wat je in Worker.js gebruikt
    apiData.append("Kenteken", (rawData.get("license_plate") as string).toUpperCase());
    apiData.append("Naam", rawData.get("name") as string);
    apiData.append("Email", rawData.get("email") as string);
    apiData.append("Telefoon", rawData.get("phone") as string);
    apiData.append("Opmerkingen", rawData.get("message") as string);
    
    // Vaste waarden voor dit formulier
    apiData.append("Klant_Type", "Particulier / Website");
    apiData.append("Type_Werk", "Online Schademelding");
    
    // Alleen sterren meesturen als er daadwerkelijk sterren zijn gekozen
    if (stars > 0) {
      apiData.append("Aantal_Sterren", stars.toString());
    }

    // 2. FOTO COMPRESSIE
    const compressionOptions = {
      maxSizeMB: 0.8,          // Max 0.8 MB per foto
      maxWidthOrHeight: 1920,  // Max Full HD resolutie
      useWebWorker: true,
    };

    try {
      if (selectedFiles.length > 0) {
        // Loop door alle bestanden
        for (const file of selectedFiles) {
          try {
            // Probeer te verkleinen
            const compressedFile = await imageCompression(file, compressionOptions);
            apiData.append("attachment", compressedFile, file.name);
          } catch (error) {
            console.warn("Compressie mislukt voor 1 foto, origineel wordt verstuurd:", error);
            // Als verkleinen mislukt, stuur dan het origineel
            apiData.append("attachment", file, file.name);
          }
        }
      }

      // 3. VERSTUREN NAAR JE CLOUDFLARE WORKER
      const response = await fetch("https://autoglasproapi.timosteen22.workers.dev", {
        method: "POST",
        body: apiData
      });

      const data = await response.json();

      if (data.success) {
        // SUCCES
        setResult({ success: true, message: "Bedankt! Uw melding is succesvol ontvangen." });
        form.reset();
        setStars(0);
        setSelectedFiles([]);
      } else {
        // FOUT BIJ API (Bijv. Resend error of Code error)
        console.error("API Fout details:", data);
        setResult({ 
          success: false, 
          // Hier tonen we de échte foutmelding van de server
          message: data.message || "Er ging iets mis bij de server. Probeer het later opnieuw." 
        });
      }

    } catch (error: any) {
      // FOUT BIJ VERBINDING (Bijv. geen internet of URL fout)
      console.error("Netwerk fout:", error);
      setResult({ 
        success: false, 
        message: `Er is een verbindingsfout opgetreden: ${error.message || error}` 
      });
    } finally {
      setIsSubmitting(false);
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
          
          {/* Kenteken & Telefoon */}
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

          {/* Naam & Email */}
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

          {/* STERREN SECTIE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Aantal sterren (indien van toepassing)</label>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-center items-center gap-4 mb-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setStars(num)}
                    className="focus:outline-none transition-transform active:scale-90"
                  >
                    <Star 
                      size={42} 
                      className={`transition-colors ${
                        num <= stars 
                        ? 'fill-yellow-400 text-yellow-500 drop-shadow-sm' 
                        : 'text-gray-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-gray-500 text-sm font-medium tracking-wide">
                {stars > 0 ? `${stars} ${stars === 1 ? 'ster' : 'sterren'} geselecteerd` : 'Tik op de sterren om te selecteren'}
              </p>
            </div>
          </div>

          {/* Foto upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Foto's uploaden {selectedFiles.length > 0 && <span className="text-agp-blue">({selectedFiles.length} geselecteerd)</span>}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer relative group">
              <input 
                type="file" 
                name="attachment" 
                accept="image/*" 
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <FileUp className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-agp-blue transition" />
              <p className="text-sm text-gray-500 group-hover:text-agp-blue transition">
                {selectedFiles.length > 0 
                  ? "Klik om foto's te wijzigen of toe te voegen" 
                  : "Klik om foto's van de schade te selecteren"
                }
              </p>
            </div>
          </div>

          {/* Opmerkingen */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Opmerkingen</label>
            <textarea 
              name="message" 
              rows={4}
              placeholder="Vertel ons kort wat er is gebeurd..."
              className="w-full border-gray-300 border p-3 rounded-lg focus:ring-2 focus:ring-agp-blue focus:border-agp-blue focus:outline-none transition"
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`
              w-full py-4 px-6 text-white font-bold text-lg rounded-lg shadow-lg flex items-center justify-center gap-2 transition duration-300
              ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-agp-red hover:bg-red-700 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 group'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Verwerken...
              </>
            ) : (
              <>
                <span>Verstuur Melding</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition" />
              </>
            )}
          </button>

          {/* RESULT MESSAGE (Toont nu de echte foutmelding!) */}
          {result && (
            <div className={`p-4 rounded-lg flex items-start gap-3 mt-4 ${result.success ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
              {result.success ? <Check className="shrink-0" /> : <AlertCircle className="shrink-0" />}
              <span className="font-medium">{result.message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};