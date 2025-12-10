import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { DamageForm } from '../components/DamageForm';
import { Stripes } from '../components/Stripes';
import { ArrowRight, Wrench, ShieldCheck, Sun, Car, Sparkles, Droplets, CheckCircle, Briefcase } from 'lucide-react';
import { Service } from '../types';

// Afbeeldingen
import Daan2 from '../assets/Daan2.jpg';
import Daan3 from '../assets/Daan3.jpg';
import Daan4 from '../assets/Daan4.jpg';
import Daan5 from '../assets/Daan5.jpg';
import Daan6 from '../assets/Daan6.jpg';
import Daan7 from '../assets/Daan7.jpg';
import Glass from '../assets/Glass.jpg';

// Partner Logo's (1 t/m 9)
import logo1 from '../assets/Logo1.png';
import logo2 from '../assets/Logo2.png';
import logo3 from '../assets/Logo3.png';
import logo4 from '../assets/Logo4.png';
import logo5 from '../assets/Logo5.png';
import logo6 from '../assets/Logo6.png';
import logo7 from '../assets/Logo7.png';
import logo8 from '../assets/Logo8.png';
import logo9 from '../assets/Logo9.png';

// Geluid
import breakSound from "../assets/GlassBreakingSound.mp3";

// --- GLOBALE VARIABELE ---
let hasGlassBrokenSession = false;

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
    image: Daan2
  },
  { 
    icon: ShieldCheck, 
    title: "Autoruit Vervangen", 
    description: "Vakkundige vervanging met fabrieksgarantie.",
    longDescription: "Als een ruit niet meer te repareren is, vervangen wij deze vakkundig. Wij gebruiken uitsluitend autoruiten van OEM-kwaliteit (Original Equipment Manufacturer), dezelfde kwaliteit als de ruit waarmee uw auto uit de fabriek kwam. Wij nemen de volledige afhandeling met uw verzekeraar uit handen.",
    image: Daan3
  },
  { 
    icon: Sun, 
    title: "Tinten & Blinderen", 
    description: "Meer privacy en warmtewering.",
    longDescription: "Geef uw auto een strakke uitstraling en verhoog het comfort. Onze tintfolies houden tot 99% van de schadelijke UV-straling tegen en zorgen voor een koeler interieur. Daarnaast biedt het privacy voor uw passagiers en spullen op de achterbank. Wij werken volgens de wettelijke normen.",
    image: Daan4
  },
  { 
    icon: Sparkles, 
    title: "Koplamp Renovatie", 
    description: "Doffe koplampen weer helder maken.",
    longDescription: "Doffe of verweerde koplampen verminderen uw zicht in het donker en kunnen leiden tot APK-afkeur. Vervangen is duur en vaak onnodig. Wij polijsten uw koplampen en brengen een nieuwe UV-werende coating aan, zodat ze er weer als nieuw uitzien en u weer veilig de weg op kunt.",
    image: Daan5
  },
  { 
    icon: Droplets, 
    title: "Ruiten Polijsten", 
    description: "Verwijder krassen en aanslag.",
    longDescription: "Heeft u last van hinderlijke krassen door ruitenwissers of hardnekkige kalkaanslag die uw zicht belemmeren? Met onze speciale polijsttechniek maken wij uw autoruit weer kristalhelder. Dit verbetert niet alleen het zicht, maar voorkomt ook verblinding door tegenliggers in het donker.",
    image: Daan7
  },
  { 
    icon: Car, 
    title: "Ruitenwissers & Reiniging", 
    description: "Topkwaliteit ruitenwissers.",
    longDescription: "Goede ruitenwissers zijn essentieel voor veilig zicht. Strepen of piepende wissers? Wij hebben A-merk ruitenwissers op voorraad voor vrijwel elk type auto en monteren deze direct. Combineer dit met onze professionele glasreiniging voor een streeploos resultaat.",
    image: Daan6
  }
];

// De partners array
const partners = [
  { name: "LeasePlan", logo: logo1 },
  { name: "Athlon", logo: logo2 },
  { name: "Unigarant", logo: logo3 },
  { name: "Achmea", logo: logo4 },
  { name: "Allianz", logo: logo5 },
  { name: "Interpolis", logo: logo6 },
  { name: "Univé", logo: logo7 },
  { name: "Centraal Beheer", logo: logo8 },
  { name: "a.s.r.", logo: logo9 },
];

export const Home: React.FC = () => {
  const { hash } = useLocation();
  
  const [broken, setBroken] = useState(hasGlassBrokenSession);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (!window.breakGlassAudio) {
      // @ts-ignore
      window.breakGlassAudio = new Audio(breakSound);
      // @ts-ignore
      window.breakGlassAudio.volume = 0.8;
      // @ts-ignore
      window.breakGlassAudio.preload = 'auto';
    }
  }, []);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenEmergencyPopup');
    if (!hasSeenPopup) {
      setShowEmergencyModal(true);
      sessionStorage.setItem('hasSeenEmergencyPopup', 'true');
    }
  }, []);

  const unlockAudio = () => {
    // @ts-ignore
    const audio = window.breakGlassAudio;
    if (audio) {
      audio.load();
    }
    setShowEmergencyModal(false);
  };

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        
{/* ACHTERGROND MET DIAGONALE SCHEIDING & FOTO */}
<div className="absolute inset-0 z-0 overflow-hidden">
  {/* Wrapper die groter is dan het scherm en die we verschuiven */}
  <div
    className="
      absolute
      w-[140%] h-[140%]
      transform
      translate-x-[0%] translate-y-[15%]           /* mobiel: iets naar rechts & beneden */
      md:translate-x-[5%] md:translate-y-[10%]     /* tablet: anders positioneren */
      lg:translate-x-[0%] lg:translate-y-[0%]    /* desktop: nog iets verder naar rechts/onder */
    "
  >
    <img
      src={Glass}
      alt="Monteur vervangt autoruit"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Masker voor de gedraaide gradient blijft erboven */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute -inset-32"
      style={{
        background: `radial-gradient(circle at -4% -8%,
          white 0%,
          white 45%,
          #d9204f 45%,
          #d9204f 48%,
          white 48%,
          white 49%,
          #3D56AE 49%,
          #3D56AE 53%,
          transparent 53%
        )`,
        transform: 'rotate(5deg)',
        transformOrigin: 'center',
      }}
    />
  </div>
</div>



{/* CONTENT HERO */}
<div className="max-w-8xl mx-auto px-4 relative z-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-10">
  
  {/* Linkerkant tekst */}
  {/* AANPASSING 1: Ik heb 'flex flex-col' toegevoegd om de spacing makkelijker te maken op mobiel */}
  <div className="relative animate-fade-in-up flex flex-col -mt-10 md:mt-[-6px] lg:mt-[-300px] lg:pl-9 lg:block">
    
    {/* Titel Sectie */}
    {/* AANPASSING 2: '-mt-32' trekt de titel fors omhoog op mobiel. Pas dit getal aan (bv -20 of -40) */}
    <h1 className="leading-tight relative z-10 flex flex-col items-start -mt-49 md:mt-0">
      <span className="text-[#3D56AE] font-bold text-3xl uppercase tracking-wider mb-2 md:text-5xl md:font-black md:normal-case md:tracking-normal md:mb-0">
        SCHADE AAN UW
      </span>
      <span className="bg-clip-text text-transparent bg-[#d9204f] whitespace-nowrap font-black text-4xl md:text-7xl">
        AUTORUIT?
      </span>
    </h1>

    {/* Tekst verbergen op mobiel (ongewijzigd) */}
    <p className="hidden md:block text-xl text-[#3D56AE] max-w-lg leading-relaxed font-medium relative z-10 mt-6">
      Wij helpen u snel weer veilig op weg. Erkend door alle verzekeraars en specialist in regio Uden.
    </p>

    {/* Knoppen Sectie */}
    {/* AANPASSING 3: 'mt-36' duwt de knoppen fors naar beneden op mobiel. Pas dit aan naar wens. */}
    <div className="flex flex-col sm:flex-row gap-4 relative z-20 mt-[300px] md:mt-8 lg:mt-8">
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
        className="px-8 py-4 bg-agp-blue text-white text-lg font-bold rounded-lg shadow-lg hover:bg-blue-800 transition duration-300 text-center"
      >
        Plan Route
      </a>
    </div>
  </div>

  {/* Rechterkant formulier (ongewijzigd voor desktop) */}
  <div className="hidden lg:block relative z-30 transform hover:scale-[1.01] transition duration-500 max-w-lg ml-auto">
    <div id="schade-melden" className="absolute -top-32" />
    <div className="absolute -inset-1 bg-gradient-to-r from-agp-red via-white to-agp-blue rounded-xl blur opacity-30 animate-pulse" />
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

      {/* --- PERSONEEL / VACATURES BANNER --- */}
      <section className="py-10 bg-white relative overflow-hidden font-sans">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3D56AE 1px, transparent 0)', backgroundSize: '24px 24px' }}
            />
            <div className="flex items-center gap-5 relative z-10">
              <div className="hidden md:flex bg-blue-50 p-4 rounded-full border border-blue-100 text-agp-blue">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">Kom werken bij ons team!</h2>
                <p className="text-gray-500 text-base">Wij zijn op zoek naar enthousiaste vakmensen.</p>
              </div>
            </div>
            <Link 
              to="/career" 
              className="group relative z-10 px-8 py-3 bg-agp-blue text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>Bekijk Vacatures</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="diensten" className="py-20 bg-gray-50 scroll-mt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-agp-red font-bold uppercase text-sm">Onze Expertise</span>
            <h2 className="text-4xl md:text-5xl font-black text-agp-blue mt-2 mb-4">Onze Diensten</h2>
          </div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2 relative group">
                  <div className="
                    absolute 
                    top-2 left-1 lg:top-4 lg:left-4 
                    w-full h-full 
                    transform 
                    translate-x-1 translate-y-1 
                    lg:translate-x-3 lg:translate-y-3 
                    lg:group-hover:translate-x-5 lg:group-hover:translate-y-5 
                    transition duration-500 
                    rounded-2xl 
                    border-[5px] lg:border-[10px] 
                    border-[#3D56AE] 
                    bg-white p-1
                  ">
                    <div className="w-full h-full rounded-xl border-[5px] lg:border-[10px] border-[#d9204f] bg-gray-50" />
                  </div>

                  <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-[4/3] scale-[0.94] lg:scale-95 origin-center -translate-x-2 lg:translate-x-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform lg:group-hover:scale-110 transition duration-700"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{service.title}</h3>
                  <div className={`h-1 w-20 ${index % 2 === 0 ? 'bg-agp-red' : 'bg-agp-blue'}`} />
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS - INFINITE SCROLL */}
      <section className="py-16 bg-slate-900 text-white overflow-hidden">
        <style>{`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Wij werken samen met</h2>
          <p className="text-gray-400">Erkend door vrijwel alle verzekeraars en leasemaatschappijen.</p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-slate-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-slate-900 to-transparent z-10" />

          <div className="flex animate-infinite-scroll w-max items-center py-4">
            <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16">
              {partners.map((partner, i) => (
                <img 
                  key={`p1-${i}`}
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-20 md:h-32 w-auto object-contain max-w-none"
                />
              ))}
            </div>

            <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16">
              {partners.map((partner, i) => (
                <img 
                  key={`p2-${i}`}
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-20 md:h-32 w-auto object-contain max-w-none"
                />
              ))}
            </div>
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
