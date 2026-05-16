import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, MessageCircle, Mail, MapPin, Star, ShieldCheck, Sparkles, Eye, Smile,
  ChevronRight, Clock, Award, Wand2, Camera, MapPinned, Check, ArrowLeft, Plus, Minus, AtSign, ThumbsUp
} from 'lucide-react';

const WHATSAPP_NUMBER = '393397589380';
const PHONE = '339 7589380';
const PHONE_LINK = '+393397589380';
const EMAIL = 'rosanna.dellolio.pmu@gmail.com';
const ADDRESS = 'Corso Regina Margherita 177, Torino';
const MAP_URL = 'https://maps.app.goo.gl/fTZfDgazeAve5ksX7';
const REVIEWS_URL = "https://www.google.com/search?q=Rosanna+Dell%27Olio+trucco+permanente+Torino+recensioni";
const INSTAGRAM_URL = 'https://www.instagram.com/truccopermanentecorrettivo/';
const FACEBOOK_URL = 'https://www.facebook.com/PMUTorino/';
const EXTERNAL_LINK_PROPS = { target: '_blank', rel: 'noopener noreferrer' };

const images = {
  rosanna: '/images/rosanna-hero.jpg',
  sopracciglia: '/images/sopracciglia.jpg',
  labbra: '/images/labbra.jpg',
  occhi: '/images/occhi.jpg',
  correzione: '/images/correzione.jpg',
  areole: '/images/areola.jpg',
  tricopigmentazione: '/images/trico.jpg',
};

const treatments = [
  {
    id: 'sopracciglia', icon: Sparkles, title: 'Sopracciglia', micro: 'Forma, simmetria, effetto naturale',
    text: 'Per chi vuole uno sguardo più ordinato senza disegnare le sopracciglia ogni mattina. Si lavora su forma, colore e intensità rispettando il viso.',
    img: images.sopracciglia,
    wa: 'Ciao Rosanna, vorrei informazioni sul trucco permanente sopracciglia. Mi interessa un effetto naturale e vorrei capire cosa si può fare sul mio viso.',
  },
  {
    id: 'labbra', icon: Smile, title: 'Labbra', micro: 'Colore, definizione, armonia',
    text: 'Per labbra più definite e luminose, con un risultato elegante: dal contorno al riempimento, fino all’effetto gloss o rossetto.',
    img: images.labbra,
    wa: 'Ciao Rosanna, vorrei informazioni sul trucco permanente labbra. Vorrei un risultato naturale e più definito.',
  },
  {
    id: 'occhi', icon: Eye, title: 'Occhi', micro: 'Sguardo più intenso, senza esagerare',
    text: 'Per chi vuole valorizzare lo sguardo con eyeliner infracigliare, sfumato o più grafico, in base all’occhio e allo stile personale.',
    img: images.occhi,
    wa: 'Ciao Rosanna, vorrei informazioni sul trucco permanente occhi. Vorrei capire quale effetto può valorizzare il mio sguardo.',
  },
  {
    id: 'correzione', icon: Wand2, title: 'Correzione', micro: 'Vecchi lavori, viraggi, asimmetrie',
    text: 'Quando c’è un vecchio trattamento da valutare, prima di tutto serve capire cosa si può correggere davvero e con quale percorso.',
    img: images.correzione,
    wa: 'Ciao Rosanna, ho un vecchio trucco permanente da valutare o correggere. Vorrei capire se si può sistemare.',
  },
  {
    id: 'areole', icon: ShieldCheck, title: 'Areole mammarie', micro: 'Ricostruzione naturale e delicata',
    text: 'Dermopigmentazione areolare per ricreare un aspetto naturale e realistico dopo interventi chirurgici o mastectomia, con attenzione a sicurezza, comfort e sensibilità del percorso.',
    img: images.areole,
    wa: 'Ciao Rosanna, vorrei informazioni sulla dermopigmentazione delle areole mammarie. Vorrei capire come funziona la consulenza e se può fare al mio caso.',
  },
  {
    id: 'tricopigmentazione', icon: Camera, title: 'Tricopigmentazione', micro: 'Effetto rasato, densità e cicatrici',
    text: 'Per diradamenti, calvizie, alopecia o cicatrici da trapianto: microdepositi di pigmento per creare un effetto ottico naturale di densità o rasatura.',
    img: images.tricopigmentazione,
    wa: 'Ciao Rosanna, vorrei informazioni sulla tricopigmentazione a Torino. Vorrei valutare il mio caso per effetto rasato, densità o cicatrici.',
  },
];

const trustPoints = [
  { icon: Award, value: '25+', label: 'anni di esperienza' },
  { icon: Star, value: '500+', label: 'recensioni' },
  { icon: MapPinned, value: 'Torino', label: 'in studio' },
];

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SoftTag({ children }) {
  return <span className="inline-flex items-center rounded-full border border-[#caa15a]/25 bg-[#fff8ed]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-[#8a6425] shadow-sm backdrop-blur sm:px-3 sm:text-[11px]">{children}</span>;
}

function MagneticButton({ children, href, onClick, variant = 'dark', className = '' }) {
  const base = 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition duration-300 active:scale-[0.98] sm:px-5 sm:py-3';
  const style = variant === 'dark'
    ? 'bg-[#211714] text-white shadow-xl shadow-black/15 hover:bg-[#3b2922]'
    : variant === 'gold'
      ? 'gold-sheen text-[#211714] shadow-xl shadow-[#caa15a]/20'
      : 'border border-[#caa15a]/35 bg-white/80 text-[#211714] hover:bg-[#fff8ed]';

  if (href) return <a href={href} {...EXTERNAL_LINK_PROPS} className={`${base} ${style} ${className}`}>{children}</a>;
  return <button onClick={onClick} className={`${base} ${style} ${className}`}>{children}</button>;
}

export default function App() {
  const visualTreatments = treatments.filter((item) => ['sopracciglia', 'labbra', 'occhi', 'correzione'].includes(item.id));
  const [activeTreatment, setActiveTreatment] = useState(visualTreatments[0]);
  const [guidedStep, setGuidedStep] = useState(1);
  const [desiredEffect, setDesiredEffect] = useState('naturale');
  const [startingPoint, setStartingPoint] = useState('prima-volta');
  const [openTreatmentId, setOpenTreatmentId] = useState('sopracciglia');
  const ActiveIcon = activeTreatment.icon;

  const activeWhatsApp = useMemo(() => {
    const effectText = desiredEffect === 'naturale' ? 'un risultato molto naturale' : desiredEffect === 'definito' ? 'un risultato più definito' : 'un risultato correttivo e armonico';
    const startingText = startingPoint === 'prima-volta' ? 'non ho mai fatto un trattamento di questo tipo' : startingPoint === 'vecchio-lavoro' ? 'ho già un vecchio trattamento da valutare' : 'vorrei capire cosa si adatta meglio al mio viso';
    return whatsappLink(`Ciao Rosanna, vorrei una consulenza per ${activeTreatment.title.toLowerCase()}. Mi piacerebbe ${effectText} e ${startingText}.`);
  }, [activeTreatment, desiredEffect, startingPoint]);

  const guidedEffects = [
    { id: 'naturale', title: 'Molto naturale', text: 'Voglio vedermi più curata, ma senza effetto troppo evidente.' },
    { id: 'definito', title: 'Più definito', text: 'Vorrei un risultato visibile, ordinato e più intenso.' },
    { id: 'correttivo', title: 'Da valutare', text: 'Ho dubbi, asimmetrie o un vecchio lavoro da capire meglio.' },
  ];

  const startingPoints = [
    { id: 'prima-volta', title: 'È la prima volta', text: 'Vorrei capire bene cosa aspettarmi e scegliere con calma.' },
    { id: 'vecchio-lavoro', title: 'Ho già un vecchio lavoro', text: 'Vorrei valutare se si può correggere, alleggerire o migliorare.' },
    { id: 'non-so', title: 'Non so cosa mi valorizza', text: 'Mi piacerebbe un consiglio professionale prima di decidere.' },
  ];

  function chooseTreatment(item) { setActiveTreatment(item); setGuidedStep(2); }
  function chooseEffect(effectId) { setDesiredEffect(effectId); setGuidedStep(3); }
  function chooseStartingPoint(pointId) { setStartingPoint(pointId); setGuidedStep(4); }
  function resetGuide() { setGuidedStep(1); setActiveTreatment(visualTreatments[0]); setDesiredEffect('naturale'); setStartingPoint('prima-volta'); }
  function toggleTreatmentCard(id) { setOpenTreatmentId((current) => (current === id ? '' : id)); }

  return (
    <main className="min-h-screen scroll-smooth bg-[#fbf4ea] text-[#211714] selection:bg-[#d9b76c]/30">
      <Header />
      <Hero />
      <Method />
      <GuidedPath
        guidedStep={guidedStep}
        setGuidedStep={setGuidedStep}
        visualTreatments={visualTreatments}
        activeTreatment={activeTreatment}
        chooseTreatment={chooseTreatment}
        guidedEffects={guidedEffects}
        desiredEffect={desiredEffect}
        chooseEffect={chooseEffect}
        startingPoints={startingPoints}
        startingPoint={startingPoint}
        chooseStartingPoint={chooseStartingPoint}
        ActiveIcon={ActiveIcon}
        activeWhatsApp={activeWhatsApp}
        resetGuide={resetGuide}
      />
      <Treatments openTreatmentId={openTreatmentId} toggleTreatmentCard={toggleTreatmentCard} />
      <TrustCards />
      <Results />
      <Contacts />
      <Footer />
      <StickyCTA />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="mx-auto flex max-w-6xl items-center gap-2 rounded-full border border-white/70 bg-white/72 px-2.5 py-2 shadow-xl shadow-black/5 backdrop-blur-xl sm:px-3 md:justify-between">
        <button onClick={() => scrollToId('home')} className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full pr-1 text-left sm:pr-2">
          <div className="gold-sheen flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-[#211714] shadow-md sm:h-10 sm:w-10 sm:text-sm">RD</div>
          <div className="hidden sm:block">
            <p className="text-sm font-black leading-none">Rosanna Dell’Olio</p>
            <p className="text-[11px] text-[#7a6254]">PMU Artist · Torino</p>
          </div>
        </button>

        <nav className="hidden items-center gap-1 rounded-full bg-[#f7ecdc] p-1 text-sm font-semibold md:flex">
          {[["Metodo", "metodo"], ["Trattamenti", "trattamenti"], ["Risultati", "risultati"], ["Contatti", "contatti"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollToId(id)} className="cursor-pointer rounded-full px-4 py-2 text-[#60483d] transition hover:bg-white hover:text-[#211714]">{label}</button>
          ))}
        </nav>

        <nav className="no-scrollbar flex min-w-0 flex-1 items-center justify-end gap-1 overflow-x-auto rounded-full bg-[#f7ecdc]/80 p-1 md:hidden">
          {[["Metodo", "metodo"], ["Guida", "specchio"], ["Tratt.", "trattamenti"], ["Risult.", "risultati"], ["Contatti", "contatti"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollToId(id)} className="shrink-0 cursor-pointer rounded-full px-2 py-1.5 text-[9px] font-black uppercase tracking-[.04em] text-[#60483d] transition hover:bg-white active:scale-[0.98] min-[390px]:px-2.5 min-[390px]:text-[10px]">{label}</button>
          ))}
        </nav>

        <a href={whatsappLink('Ciao Rosanna, vorrei informazioni per una consulenza gratuita di trucco permanente a Torino.')} {...EXTERNAL_LINK_PROPS} className="hidden cursor-pointer items-center justify-center gap-2 rounded-full bg-[#211714] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#3b2922] sm:px-4 sm:py-3 sm:text-sm md:inline-flex">
          <MessageCircle className="h-4 w-4" /> <span>WhatsApp</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="paper-bg relative overflow-hidden px-3 pb-10 pt-24 sm:px-4 sm:pb-16 sm:pt-28 md:pb-24 md:pt-32">
      <div className="pointer-events-none absolute -left-16 top-32 hidden text-[10rem] font-black uppercase leading-none tracking-[-.08em] text-[#211714]/[0.035] md:block">Beauty</div>
      <div className="mx-auto grid max-w-6xl gap-5 sm:gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="relative z-10 order-2 lg:order-1">
          <div className="rounded-[1.5rem] border border-white/80 bg-white/65 p-4 shadow-2xl shadow-black/5 backdrop-blur sm:rounded-[2rem] sm:p-5 md:p-7">
            <SoftTag>Trucco permanente Torino</SoftTag>
            <h1 className="mt-4 text-[2.38rem] font-black leading-[.92] tracking-[-.055em] text-[#211714] sm:mt-5 sm:text-6xl md:text-7xl">Non cambiare viso. Valorizzalo.</h1>
            <p className="mt-4 text-[15px] leading-7 text-[#60483d] sm:mt-5 sm:text-base md:text-lg">Sopracciglia, labbra e occhi con un risultato studiato per sembrare tuo: più ordinato, più armonico, più semplice da vivere ogni giorno.</p>
            <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-7">
              {trustPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl bg-[#fbf4ea] p-2.5 text-center sm:rounded-3xl sm:p-3">
                    <Icon className="mx-auto mb-1.5 h-4 w-4 text-[#9a741e] sm:mb-2" />
                    <p className="text-base font-black leading-none sm:text-lg">{item.value}</p>
                    <p className="mt-1 text-[10px] leading-3 text-[#7a6254]">{item.label}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
              <MagneticButton href={whatsappLink('Ciao Rosanna, vorrei prenotare una consulenza gratuita per trucco permanente a Torino.')} variant="gold">Prenota consulenza <ChevronRight className="h-4 w-4" /></MagneticButton>
              <MagneticButton onClick={() => scrollToId('specchio')} variant="light">Percorso guidato</MagneticButton>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .55, delay: .06 }} className="relative order-1 lg:order-2">
          <div className="absolute -right-10 top-8 z-0 h-52 w-52 rounded-full bg-[#d9b76c]/25 blur-3xl" />
          <div className="relative z-10 grid grid-cols-[.12fr_1fr] gap-2 sm:gap-3">
            <div className="vertical-word flex items-center justify-center rounded-[1.4rem] border border-[#caa15a]/25 bg-white/45 px-2 py-4 text-[9px] font-black uppercase tracking-[.32em] text-[#8a6425] backdrop-blur sm:rounded-[2rem] sm:px-3 sm:py-6 sm:text-xs sm:tracking-[.4em]">Permanent Make Up</div>
            <div className="relative overflow-hidden rounded-[1.8rem] bg-[#211714] p-2 shadow-2xl shadow-black/20 sm:rounded-[2.5rem] sm:p-3">
              <div className="h-[390px] overflow-hidden rounded-[1.45rem] sm:h-[560px] sm:rounded-[2rem]">
                <img src={images.rosanna} alt="Rosanna Dell'Olio, trucco permanente Torino" className="mask-fade h-full w-full scale-[1.12] object-cover object-[center_18%]" />
              </div>
              <div className="absolute bottom-3 left-3 right-3 rounded-[1.25rem] border border-white/15 bg-[#211714]/78 p-3 text-white shadow-xl backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:rounded-[1.7rem] sm:p-5">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#d9b76c] sm:text-xs">Consulenza gratuita</p>
                <p className="mt-1.5 text-base font-black leading-tight sm:mt-2 sm:text-lg">Prima si valuta il viso. Poi si sceglie il trattamento.</p>
                <div className="mt-2 grid gap-1.5 text-[11px] leading-5 text-white/72 sm:mt-3 sm:gap-2 sm:text-xs">
                  <span className="flex items-center gap-2"><ChevronRight className="h-3.5 w-3.5 text-[#d9b76c]" /> Forma, colore e intensità personalizzati</span>
                  <span className="flex items-center gap-2"><ChevronRight className="h-3.5 w-3.5 text-[#d9b76c]" /> Risposta rapida su WhatsApp</span>
                </div>
                <a href={whatsappLink('Ciao Rosanna, vorrei prenotare una consulenza gratuita per trucco permanente a Torino.')} {...EXTERNAL_LINK_PROPS} className="gold-sheen mt-3 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-3.5 py-2 text-xs font-black text-[#211714] shadow-lg sm:mt-4 sm:px-4 sm:py-2.5">Scrivimi ora <MessageCircle className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="metodo" className="bg-[#211714] px-3 py-8 text-white sm:px-4 sm:py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <SoftTag>Il punto non è tatuare. È progettare.</SoftTag>
            <h2 className="mt-3 text-[1.45rem] font-black leading-tight tracking-[-.04em] sm:mt-5 sm:text-3xl md:text-5xl">Un trattamento sul viso non può essere scelto al volo.</h2>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:mt-5 sm:text-lg sm:leading-8">La parte importante succede prima: capire proporzioni, colore della pelle, vecchi trattamenti, abitudini di make-up e risultato desiderato.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { n: '01', title: 'Osservazione', text: 'Si guarda il viso, non solo la zona da trattare.' },
              { n: '02', title: 'Disegno', text: 'Forma e intensità vengono definite prima del trattamento.' },
              { n: '03', title: 'Risultato', text: 'L’obiettivo è un effetto coerente, elegante e portabile.' },
            ].map((step) => (
              <div key={step.n} className="rounded-[1.1rem] border border-white/10 bg-white/7 p-3 sm:rounded-[2rem] sm:p-5">
                <div className="flex items-start gap-3 sm:block">
                  <p className="gold-sheen flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-[#211714] sm:block sm:h-auto sm:w-auto sm:bg-none sm:text-sm sm:text-[#d9b76c]">{step.n}</p>
                  <div>
                    <h3 className="text-base font-black sm:mt-8 sm:text-xl">{step.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-white/58 sm:mt-3 sm:text-sm sm:leading-6">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GuidedPath(props) {
  const { guidedStep, setGuidedStep, visualTreatments, activeTreatment, chooseTreatment, guidedEffects, desiredEffect, chooseEffect, startingPoints, startingPoint, chooseStartingPoint, ActiveIcon, activeWhatsApp, resetGuide } = props;
  return (
    <section id="specchio" className="px-3 py-10 sm:px-4 sm:py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 grid gap-3 sm:mb-8 sm:gap-4 md:grid-cols-[.95fr_1.05fr] md:items-end">
          <div>
            <SoftTag>Percorso guidato</SoftTag>
            <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-.04em] sm:mt-4 sm:text-3xl md:text-5xl">Partiamo da quello che vorresti vedere allo specchio.</h2>
          </div>
          <p className="text-sm leading-6 text-[#60483d] sm:text-base md:text-lg">Un piccolo percorso in 4 passaggi, pensato per aiutare la cliente a riconoscere il proprio obiettivo e arrivare al contatto in modo naturale.</p>
        </div>

        <div className="overflow-hidden rounded-[1.6rem] bg-[#211714] text-white shadow-2xl shadow-black/10 sm:rounded-[2.4rem]">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative min-h-[285px] bg-[#120d0b] sm:min-h-[360px] lg:min-h-[420px]">
              <img src={activeTreatment.img} alt={activeTreatment.title} className="absolute inset-0 h-full w-full object-cover opacity-82" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211714] via-[#211714]/45 to-transparent" />
              <div className="absolute left-3 right-3 top-3 flex items-center justify-between sm:left-5 sm:right-5 sm:top-5">
                <div className="rounded-full bg-white/12 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] text-[#f4d98d] backdrop-blur sm:px-4 sm:py-2 sm:text-xs">Step {guidedStep} di 4</div>
                {guidedStep > 1 && <button onClick={() => setGuidedStep(guidedStep - 1)} className="flex cursor-pointer items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur transition hover:bg-white hover:text-[#211714] sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"><ArrowLeft className="h-3.5 w-3.5" /> Indietro</button>}
              </div>
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="mb-3 flex gap-1.5 sm:mb-5 sm:gap-2">
                  {[1, 2, 3, 4].map((step) => <div key={step} className={`h-1.5 flex-1 rounded-full sm:h-2 ${guidedStep >= step ? 'gold-sheen' : 'bg-white/18'}`} />)}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#f4d98d] sm:text-sm sm:tracking-[.18em]">{activeTreatment.title}</p>
                <h3 className="mt-1.5 text-2xl font-black tracking-[-.05em] sm:mt-2 sm:text-4xl md:text-5xl">{guidedStep === 1 ? 'Scegli la zona' : guidedStep === 2 ? "Scegli l'effetto" : guidedStep === 3 ? 'Da dove parti?' : 'Punto di partenza'}</h3>
                <p className="mt-2 max-w-md text-xs leading-5 text-white/68 sm:mt-3 sm:text-sm sm:leading-6">{guidedStep === 1 ? 'Ogni area ha proporzioni, colori e risultati diversi.' : guidedStep === 2 ? 'Naturale, più definito o da valutare.' : guidedStep === 3 ? 'La situazione di partenza cambia il percorso consigliato.' : 'La consulenza trasforma questa idea in una scelta adatta al tuo viso.'}</p>
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-8">
              {guidedStep === 1 && <StepList title="Cosa vorresti valorizzare?" items={visualTreatments} onChoose={chooseTreatment} />}
              {guidedStep === 2 && <OptionList title="Che effetto ti piacerebbe?" items={guidedEffects} activeId={desiredEffect} onChoose={chooseEffect} />}
              {guidedStep === 3 && <OptionList title="Qual è la tua situazione?" items={startingPoints} activeId={startingPoint} onChoose={chooseStartingPoint} />}
              {guidedStep === 4 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 sm:gap-5">
                  <div className="gold-sheen flex h-12 w-12 items-center justify-center rounded-xl text-[#211714] sm:h-14 sm:w-14 sm:rounded-2xl"><ActiveIcon className="h-6 w-6" /></div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[.16em] text-[#d9b76c] sm:text-sm sm:tracking-[.18em]">Il tuo punto di partenza</p>
                    <h3 className="mt-2 text-3xl font-black tracking-[-.05em] sm:text-4xl">{activeTreatment.title}</h3>
                    <p className="mt-2 text-base font-semibold text-white/85 sm:mt-3 sm:text-lg">{activeTreatment.micro}</p>
                    <p className="mt-4 text-sm leading-7 text-white/65 sm:mt-5 sm:text-base sm:leading-8">{activeTreatment.text}</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/7 p-4 sm:rounded-[1.7rem] sm:p-5">
                    <p className="text-lg font-black sm:text-xl">Vuoi capire se è adatto al tuo viso?</p>
                    <p className="mt-2 text-sm leading-6 text-white/62">Rosanna può valutare forma, colore, intensità e risultato desiderato durante una consulenza gratuita.</p>
                  </div>
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                    <MagneticButton href={activeWhatsApp} variant="gold">Chiedi una consulenza <MessageCircle className="h-4 w-4" /></MagneticButton>
                    <MagneticButton onClick={resetGuide} variant="light">Ricomincia</MagneticButton>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepList({ title, items, onChoose }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 sm:gap-4">
      <p className="text-[11px] font-black uppercase tracking-[.16em] text-[#d9b76c] sm:text-sm sm:tracking-[.18em]">{title}</p>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button key={item.id} onClick={() => onChoose(item)} className="group flex cursor-pointer items-center gap-3 rounded-[1.15rem] border border-white/10 bg-white/7 p-3.5 text-left transition hover:bg-white hover:text-[#211714] sm:gap-4 sm:rounded-[1.5rem] sm:p-4">
            <span className="gold-sheen flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#211714] sm:h-12 sm:w-12 sm:rounded-2xl"><Icon className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1"><span className="block text-base font-black sm:text-lg">{item.title}</span><span className="mt-1 block text-xs leading-5 text-white/58 group-hover:text-[#60483d] sm:text-sm">{item.micro}</span></span>
            <ChevronRight className="h-5 w-5 shrink-0" />
          </button>
        );
      })}
    </motion.div>
  );
}

function OptionList({ title, items, activeId, onChoose }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 sm:gap-4">
      <p className="text-[11px] font-black uppercase tracking-[.16em] text-[#d9b76c] sm:text-sm sm:tracking-[.18em]">{title}</p>
      {items.map((item) => (
        <button key={item.id} onClick={() => onChoose(item.id)} className={`flex cursor-pointer items-start gap-3 rounded-[1.15rem] border p-3.5 text-left transition hover:bg-white hover:text-[#211714] sm:gap-4 sm:rounded-[1.5rem] sm:p-4 ${activeId === item.id ? 'border-[#d9b76c] bg-white/12' : 'border-white/10 bg-white/7'}`}>
          <span className="gold-sheen mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#211714] sm:h-8 sm:w-8"><Check className="h-4 w-4" /></span>
          <span><span className="block text-base font-black sm:text-lg">{item.title}</span><span className="mt-1 block text-xs leading-5 text-white/58 sm:text-sm sm:leading-6">{item.text}</span></span>
        </button>
      ))}
    </motion.div>
  );
}

function Treatments({ openTreatmentId, toggleTreatmentCard }) {
  return (
    <section id="trattamenti" className="bg-white px-3 py-10 sm:px-4 sm:py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 grid gap-3 sm:mb-10 sm:gap-5 md:grid-cols-[.95fr_1.05fr] md:items-end">
          <div><SoftTag>Trattamenti e specializzazioni</SoftTag><h2 className="mt-3 text-2xl font-black leading-tight tracking-[-.04em] sm:mt-4 sm:text-3xl md:text-5xl">Ogni area ha un effetto diverso.</h2></div>
          <p className="text-sm leading-6 text-[#60483d] sm:text-base md:text-lg">Una panoramica semplice per capire cosa si può valorizzare: dal viso alle specializzazioni più delicate come areole mammarie e tricopigmentazione.</p>
        </div>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {treatments.map((service) => {
            const Icon = service.icon;
            const isOpen = openTreatmentId === service.id;
            return (
              <article key={service.id} className="group relative overflow-hidden rounded-[1.35rem] border border-[#f0dfc2] bg-[#fffaf4] shadow-md shadow-black/5 transition sm:rounded-[2rem] sm:shadow-lg md:hover:-translate-y-1 md:hover:shadow-2xl">
                <button onClick={() => toggleTreatmentCard(service.id)} className="flex w-full cursor-pointer items-center gap-3 p-3 text-left md:block md:p-0">
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[1rem] bg-[#211714] sm:h-24 sm:w-32 md:h-56 md:w-full md:rounded-none">
                    <img src={service.img} alt={service.title} className="h-full w-full object-cover opacity-100 transition duration-500 md:group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 hidden bg-gradient-to-t from-[#211714]/82 via-[#211714]/8 to-transparent md:block" />
                    <div className="absolute bottom-4 left-4 right-4 hidden items-end justify-between gap-3 md:flex">
                      <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#f4d98d]">Trattamento</p><h3 className="mt-1 text-2xl font-black text-white">{service.title}</h3></div>
                      <div className="gold-sheen flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[#211714] shadow-lg"><Icon className="h-5 w-5" /></div>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 md:hidden">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-black text-[#211714]">{service.title}</h3>
                      <span className="gold-sheen flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#211714]">{isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs font-bold text-[#9a741e]">{service.micro}</p>
                  </div>
                </button>
                <div className={`${isOpen ? 'block' : 'hidden'} px-3 pb-4 md:block md:p-5`}>
                  <p className="hidden text-sm font-black text-[#9a741e] md:block">{service.micro}</p>
                  <p className="mt-2 text-sm leading-6 text-[#60483d] md:mt-3">{service.text}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-6 rounded-[1.5rem] border border-[#d9b76c]/25 bg-[#fbf4ea] p-4 sm:mt-8 sm:rounded-[2rem] sm:p-5 md:flex md:items-center md:justify-between md:gap-6">
          <div><p className="text-lg font-black sm:text-xl">Non sai quale trattamento sia più adatto?</p><p className="mt-2 text-sm leading-6 text-[#60483d]">La scelta giusta dipende da viso, pelle, colore, intensità desiderata e situazione di partenza.</p></div>
          <MagneticButton onClick={() => scrollToId('specchio')} variant="dark" className="mt-4 w-full md:mt-0 md:w-auto">Fai il percorso guidato <ChevronRight className="h-4 w-4" /></MagneticButton>
        </div>
      </div>
    </section>
  );
}

function TrustCards() {
  return (
    <section className="px-3 py-8 sm:px-4 sm:py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-2.5 sm:gap-6 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: 'Sicurezza e metodo', text: 'Tecniche professionali, pigmenti biocompatibili e attenzione al comfort durante il trattamento.' },
          { icon: Camera, title: 'Prima si valuta', text: 'Foto, simmetrie, pelle e vecchi lavori cambiano completamente il percorso consigliato.' },
          { icon: Clock, title: 'Più semplice ogni mattina', text: 'Meno tempo davanti allo specchio e un aspetto più ordinato anche senza make-up completo.' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-[1.15rem] border border-[#d9b76c]/25 bg-white/70 p-3 shadow-md shadow-black/5 backdrop-blur sm:rounded-[2rem] sm:p-6 sm:shadow-lg">
              <div className="flex items-start gap-3 sm:block">
                <div className="gold-sheen flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:mb-5 sm:h-12 sm:w-12 sm:rounded-2xl"><Icon className="h-4 w-4 sm:h-5 sm:w-5" /></div>
                <div><h3 className="text-base font-black sm:text-xl">{item.title}</h3><p className="mt-1 text-xs leading-5 text-[#60483d] sm:mt-3 sm:text-base sm:leading-7">{item.text}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="risultati" className="bg-[#211714] px-3 py-8 text-white sm:px-4 sm:py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 grid gap-2 sm:mb-10 sm:gap-4 md:grid-cols-[1fr_.8fr] md:items-end">
          <div><SoftTag>Risultati e dettagli</SoftTag><h2 className="mt-3 text-[1.45rem] font-black leading-tight tracking-[-.04em] sm:mt-4 sm:text-3xl md:text-5xl">Il risultato deve farsi notare solo per il motivo giusto.</h2></div>
          <p className="text-xs leading-5 text-white/62 sm:text-base sm:leading-6 md:text-lg">Un impatto più premium e meno scheda sito, con immagini grandi e messaggio più emozionale.</p>
        </div>
        <div className="grid gap-2.5 sm:gap-4 md:grid-cols-6">
          <img src={images.sopracciglia} alt="Sopracciglia trucco permanente" className="h-28 w-full rounded-[1.05rem] object-cover sm:h-72 sm:rounded-[2rem] md:col-span-3" />
          <img src={images.labbra} alt="Labbra trucco permanente" className="h-28 w-full rounded-[1.05rem] object-cover sm:h-72 sm:rounded-[2rem] md:col-span-2" />
          <img src={images.occhi} alt="Trucco permanente occhi" className="h-28 w-full rounded-[1.05rem] object-cover sm:h-72 sm:rounded-[2rem] md:col-span-1" />
        </div>
        <div className="mt-6 grid gap-3 rounded-[1.4rem] border border-white/10 bg-white/8 p-4 sm:mt-8 sm:gap-4 sm:rounded-[2rem] sm:p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="text-xl font-black sm:text-2xl">Oltre 500 recensioni a 5 stelle su Google</p><p className="mt-2 text-sm leading-6 text-white/60">Per un trattamento sul viso la fiducia pesa più di qualsiasi promessa.</p></div>
          <MagneticButton href={REVIEWS_URL} variant="light" className="w-full md:w-auto">Vedi recensioni</MagneticButton>
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contatti" className="px-3 py-10 sm:px-4 sm:py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <SoftTag>Contatti</SoftTag>
          <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-.04em] sm:mt-4 sm:text-3xl md:text-5xl">Prenota la tua consulenza gratuita a Torino.</h2>
          <p className="mt-3 text-[15px] leading-7 text-[#60483d] sm:mt-4 sm:text-lg sm:leading-8">Un primo confronto serve a capire cosa desideri, cosa è realistico ottenere e quale trattamento può valorizzarti meglio.</p>
          <div className="mt-5 grid gap-2.5 sm:mt-7 sm:gap-3">
            <a href={whatsappLink('Ciao Rosanna, vorrei una consulenza gratuita per trucco permanente a Torino.')} {...EXTERNAL_LINK_PROPS} className="flex cursor-pointer items-center gap-3 rounded-[1.25rem] bg-white p-3.5 text-sm shadow-lg shadow-black/5 transition hover:shadow-xl sm:rounded-3xl sm:p-4 sm:text-base"><MessageCircle className="h-5 w-5 text-[#9a741e]" /> WhatsApp: {PHONE}</a>
            <a href={`tel:${PHONE_LINK}`} {...EXTERNAL_LINK_PROPS} className="flex cursor-pointer items-center gap-3 rounded-[1.25rem] bg-white p-3.5 text-sm shadow-lg shadow-black/5 transition hover:shadow-xl sm:rounded-3xl sm:p-4 sm:text-base"><Phone className="h-5 w-5 text-[#9a741e]" /> Chiama: {PHONE}</a>
            <a href={`mailto:${EMAIL}`} {...EXTERNAL_LINK_PROPS} className="flex cursor-pointer items-center gap-3 rounded-[1.25rem] bg-white p-3.5 text-sm shadow-lg shadow-black/5 transition hover:shadow-xl sm:rounded-3xl sm:p-4 sm:text-base"><Mail className="h-5 w-5 text-[#9a741e]" /> {EMAIL}</a>
            <a href={MAP_URL} {...EXTERNAL_LINK_PROPS} className="flex cursor-pointer items-center gap-3 rounded-[1.25rem] bg-white p-3.5 text-sm shadow-lg shadow-black/5 transition hover:shadow-xl sm:rounded-3xl sm:p-4 sm:text-base"><MapPin className="h-5 w-5 text-[#9a741e]" /> {ADDRESS}</a>
          </div>
        </div>
        <div className="rounded-[1.6rem] bg-[#211714] p-4 text-white shadow-2xl shadow-black/10 sm:rounded-[2.2rem] sm:p-5 md:p-7">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#d9b76c] sm:text-sm sm:tracking-[.18em]">Messaggio rapido</p>
          <h3 className="mt-2 text-2xl font-black tracking-[-.04em] sm:mt-3 sm:text-3xl">Non sai ancora cosa scegliere?</h3>
          <p className="mt-3 text-sm leading-7 text-white/62 sm:text-base">Va benissimo così. Il primo contatto serve proprio a capire quale trattamento ha senso per te, senza dover decidere tutto prima.</p>
          <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/7 p-4 sm:mt-6 sm:rounded-[1.6rem]"><p className="text-sm font-bold text-white">Un messaggio semplice, senza impegno.</p><p className="mt-2 text-sm leading-6 text-white/58">Racconta cosa vorresti migliorare e ricevi un primo consiglio personalizzato.</p></div>
          <MagneticButton href={whatsappLink('Ciao Rosanna, vorrei una consulenza gratuita. Non so ancora quale trattamento sia più adatto, vorrei un consiglio.')} variant="gold" className="mt-5 w-full sm:mt-6">Chiedi consiglio su WhatsApp <MessageCircle className="h-4 w-4" /></MagneticButton>
          <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-2">
            <a href={INSTAGRAM_URL} {...EXTERNAL_LINK_PROPS} className="flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#211714]"><AtSign className="h-4 w-4" /> Instagram</a>
            <a href={FACEBOOK_URL} {...EXTERNAL_LINK_PROPS} className="flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#211714]"><ThumbsUp className="h-4 w-4" /> Facebook</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#d9b76c]/20 bg-white px-3 py-7 pb-24 sm:px-4 sm:py-8 md:pb-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[#60483d] md:flex-row md:items-center md:justify-between">
        <p><strong className="text-[#211714]">Rosanna Dell’Olio</strong> · Trucco Permanente Torino · P.IVA 10027500015</p>
        <div className="flex flex-wrap gap-4"><a href={REVIEWS_URL} {...EXTERNAL_LINK_PROPS} className="cursor-pointer hover:text-[#9a741e]">Vedi recensioni</a><a href="https://www.truccopermanentetorino.com/informativa-sulla-privacy" {...EXTERNAL_LINK_PROPS} className="cursor-pointer hover:text-[#9a741e]">Privacy</a><a href="https://www.truccopermanentetorino.com/informativa-sui-cookie" {...EXTERNAL_LINK_PROPS} className="cursor-pointer hover:text-[#9a741e]">Cookie</a></div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-2 left-2 right-2 z-50 sm:bottom-3 sm:left-3 sm:right-3 md:hidden">
      <a href={whatsappLink('Ciao Rosanna, vorrei prenotare una consulenza gratuita per trucco permanente a Torino.')} {...EXTERNAL_LINK_PROPS} className="gold-sheen flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-black text-[#211714] shadow-2xl shadow-black/20 sm:px-5 sm:py-4">Consulenza gratuita su WhatsApp <MessageCircle className="h-4 w-4" /></a>
    </div>
  );
}
