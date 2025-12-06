import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DamageForm } from '../components/DamageForm';
import { Stripes } from '../components/Stripes';
import { ArrowRight, Wrench, ShieldCheck, Sun, Car, Sparkles, Droplets, CheckCircle } from 'lucide-react';
import { Service } from '../types';
import glass from '../assets/glass.png';

// Zorg dat dit klopt met jouw mp3 bestand
import breakSound from "../assets/GlassBreakingSound.mp3";

interface ExtendedService extends Service {
  image: string;
  longDescription: string;
}

const services: ExtendedService[] = [
  { 
    icon: Wrench, 
    title: "Autoruit Reparatie", 
    description: "Sterretje in uw ruit? Wij repareren het vaak gratis.",
    longDescription: "Een sterretje in uw voorruit lijkt onschuldig, maar kan door temperatuurwisselingen plotseling doorscheuren. Wij repareren sterretjes met geavanceerde hars-injectietechnieken. Bent u verzekerd voor ruitschade? Dan is reparatie voor u meestal helemaal gratis en heeft geen invloed op uw no-claim.",
    image: "https://images.unsplash.com/photo-1632823469860-41a459cdd496?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    icon: ShieldCheck, 
    title: "Autoruit Vervangen", 
    description: "Vakkundige vervanging met fabrieksgarantie.",
    longDescription: "Als een ruit niet meer te repareren is, vervangen wij deze vakkundig. Wij gebruiken uitsluitend autoruiten van OEM-kwaliteit (Original Equipment Manufacturer), dezelfde kwaliteit als de ruit waarmee uw auto uit de fabriek kwam. Wij nemen de volledige afhandeling met uw verzekeraar uit handen.",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    icon: Sun, 
    title: "Tinten & Blinderen", 
    description: "Meer privacy en warmtewering.",
    longDescription: "Geef uw auto een strakke uitstraling en verhoog het comfort. Onze tintfolies houden tot 99% van de schadelijke UV-straling tegen en zorgen voor een koeler interieur. Daarnaast biedt het privacy voor uw passagiers en spullen op de achterbank. Wij werken volgens de wettelijke normen.",
    image: "https://images.unsplash.com/photo-1618489726248-18c2146f8d39?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    icon: Sparkles, 
    title: "Koplamp Renovatie", 
    description: "Doffe koplampen weer helder maken.",
    longDescription: "Doffe of verweerde koplampen verminderen uw zicht in het donker en kunnen leiden tot APK-afkeur. Vervangen is duur en vaak onnodig. Wij polijsten uw koplampen en brengen een nieuwe UV-werende coating aan, zodat ze er weer als nieuw uitzien en u weer veilig de weg op kunt.",
    image: "https://images.unsplash.com/photo-1549424622-4a7b52044826?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    icon: Droplets, 
    title: "Ruiten Polijsten", 
    description: "Verwijder krassen en aanslag.",
    longDescription: "Heeft u last van hinderlijke krassen door ruitenwissers of hardnekkige kalkaanslag die uw zicht belemmeren? Met onze speciale polijsttechniek maken wij uw autoruit weer kristalhelder. Dit verbetert niet alleen het zicht, maar voorkomt ook verblinding door tegenliggers in het donker.",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    icon: Car, 
    title: "Ruitenwissers & Reiniging", 
    description: "Topkwaliteit ruitenwissers.",
    longDescription: "Goede ruitenwissers zijn essentieel voor veilig zicht. Strepen of piepende wissers? Wij hebben A-merk ruitenwissers op voorraad voor vrijwel elk type auto en monteren deze direct. Combineer dit met onze professionele glasreiniging voor een streeploos resultaat.",
    image: "https://images.unsplash.com/photo-1527445256673-c64a66a70e59?q=80&w=1200&auto=format&fit=crop"
  }
];

const partners = ["LeasePlan", "Athlon", "Unigarant", "Achmea", "Allianz", "Interpolis"];

export const Home: React.FC = () => {
  const { hash } = useLocation();
  const [broken, setBroken] = useState(false);

  // Persistent audio object
  useEffect(() => {
    // @ts-ignore
    if (!window.breakGlassAudio) {
      // @ts-ignore
      window.breakGlassAudio = new Audio(breakSound);
      // @ts-ignore
      window.breakGlassAudio.volume = 0.8;
      // Preloaden helpt soms voor snellere afspeeltijd
      // @ts-ignore
      window.breakGlassAudio.preload = 'auto';
    }
  }, []);

  // Scroll trigger: animatie + geluid
  useEffect(() => {
    const handleScroll = () => {
      if (!broken && window.scrollY > 50) {
        setBroken(true);

        // @ts-ignore
        if (window.breakGlassAudio) {
           // @ts-ignore
           window.breakGlassAudio.currentTime = 0;
           
           // PROMISE HANDLING TOEGEVOEGD
           // Dit voorkomt foutmeldingen en laat zien waarom het niet afspeelt
           // @ts-ignore
           const playPromise = window.breakGlassAudio.play();
           
           if (playPromise !== undefined) {
             playPromise.catch((error: any) => {
               console.warn("Audio afspelen geblokkeerd door browser policy (interactie nodig):", error);
             });
           }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [broken]);

  // Smooth scroll to anchors
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2048&auto=format&fit=crop" 
            alt="Monteur vervangt autoruit" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/90 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-10">
          <div className="space-y-8 relative animate-fade-in-up">

            {/* BROKEN GLASS ANIMATIE */}
            {/* AANGEPAST: -top-[250px] ipv -top-[90px] om hem hoger te zetten */}
            <div
              className={`
                absolute -top-[375px] -left-28 pointer-events-none mix-blend-screen z-[-1]
                transition-all duration-[450ms] ease-out 
                ${broken ? "opacity-80 scale-125" : "opacity-0 scale-50"}
              `}
            >
              <img 
                src={glass} 
                alt="Broken Glass Effect"
                className="w-[650px] h-[650px] object-contain rotate-[-10deg]"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[3D56AE] leading-tight drop-shadow-2xl">
              SCHADE AAN<br/>
              <span className="bg-clip-text text-transparent bg-[#d9204f]">
                UW AUTORUIT?
              </span>
            </h1>

            <p className="text-xl text-[3D56AE] max-w-lg leading-relaxed font-medium drop-shadow-md">
              Wij helpen u snel weer veilig op weg. Erkend door alle verzekeraars en specialist in regio Uden.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#schade-melden"
                className="px-8 py-4 bg-agp-red text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Nu Schade Melden
                <ArrowRight size={20} />
              </a>
              <a 
                href="https://www.google.com/maps/dir//Oostwijk+1C,+5406+XT+Uden" 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-lg font-bold rounded-lg hover:bg-white hover:text-agp-blue transition duration-300 text-center"
              >
                Plan Route
              </a>
            </div>
          </div>

          <div className="hidden lg:block relative z-30 transform hover:scale-[1.01] transition duration-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-agp-red via-white to-agp-blue rounded-xl blur opacity-30 animate-pulse"></div>
            <DamageForm />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <Stripes className="h-4 w-full shadow-2xl" />
        </div>
      </section>

      {/* MOBILE Damage Form */}
      <section className="lg:hidden py-12 px-4 bg-white -mt-2 relative z-30">
        <DamageForm />
      </section>

      {/* SERVICES */}
      <section id="diensten" className="py-20 bg-gray-50 scroll-mt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-agp-red font-bold uppercase text-sm">Onze Expertise</span>
            <h2 className="text-4xl md:text-5xl font-black text-agp-blue mt-2 mb-4">Onze Diensten</h2>
            <Stripes className="h-1.5 w-32 mx-auto rounded-full" />
          </div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2 relative group">
                  <div className={`absolute top-4 left-4 w-full h-full border-2 ${index % 2 === 0 ? 'border-agp-blue' : 'border-agp-red'} rounded-2xl transform translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition duration-500`}></div>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition duration-500 z-10"></div>
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute top-6 right-6 bg-white p-4 rounded-xl shadow-lg z-20">
                      <service.icon className={`w-8 h-8 ${index % 2 === 0 ? 'text-agp-red' : 'text-agp-blue'}`} />
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{service.title}</h3>
                  <div className={`h-1 w-20 ${index % 2 === 0 ? 'bg-agp-red' : 'bg-agp-blue'}`}></div>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    {service.longDescription}
                  </p>

                  <ul className="space-y-3">
                    {["Snel geregeld", "Erkend door verzekeraars", "Garantie op werkzaamheden"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <a 
                      href="#schade-melden" 
                      className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition transform hover:-translate-y-1 shadow-md ${index % 2 === 0 ? 'bg-agp-blue hover:bg-blue-800' : 'bg-agp-red hover:bg-red-700'}`}
                    >
                      Meld Schade
                      <ArrowRight size={18} />
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-agp-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-agp-red rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Wij werken samen met</h2>
            <p className="text-gray-400">Erkend door vrijwel alle verzekeraars en leasemaatschappijen.</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {partners.map((partner, i) => (
              <div key={i} className="text-2xl font-black text-white/50 hover:text-white transition">
                {partner}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white relative border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <h2 className="text-4xl font-black text-agp-blue mb-6">Direct geholpen worden?</h2>

          <p className="text-xl text-gray-600 mb-8">
            Wacht niet te lang met ruitschade. Een sterretje kan doorscheuren.
            Kom langs in Uden of bel ons direct.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:0413331619"
              className="px-8 py-4 bg-agp-red text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1"
            >
              Bel 0413 331 619
            </a>
            <a 
              href="https://www.google.com/maps/dir//Oostwijk+1C,+5406+XT+Uden" 
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-gray-100 text-slate-800 border-2 border-slate-200 text-lg font-bold rounded-lg hover:border-agp-red hover:text-agp-red transition"
            >
              Routebeschrijving
            </a>
          </div>

        </div>
      </section>
    </>
  );
};