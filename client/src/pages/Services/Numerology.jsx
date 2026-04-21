import { useState } from "react";
import numero from '../../assets/numero.webp'
import bannerImg from '../../assets/Kundali_banner.avif'
// import bannerImg from "/ASTRO-AI/client/src/assets/Kundali_banner.avif";

import { motion, AnimatePresence } from "framer-motion";
import { Hash, Star, Heart, Briefcase, Zap, ChevronDown, Sparkles, RefreshCw } from "lucide-react";

// ─── Numerology Logic ────────────────────────────────────────────────────────

function reduceToSingle(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split("").reduce((a, d) => a + Number(d), 0);
  }
  return n;
}

function getLifePathNumber(dob) {
  const digits = dob.replace(/\D/g, "");
  const sum = digits.split("").reduce((a, d) => a + Number(d), 0);
  return reduceToSingle(sum);
}

function getDestinyNumber(name) {
  const PYTHAGOREAN = {
    a:1,b:2,c:3,d:4,e:5,f:8,g:3,h:5,i:1,j:1,k:2,l:3,m:4,
    n:5,o:7,p:8,q:1,r:2,s:3,t:4,u:6,v:6,w:6,x:5,y:1,z:7,
  };
  const sum = name.toLowerCase().replace(/[^a-z]/g, "").split("")
    .reduce((a, c) => a + (PYTHAGOREAN[c] || 0), 0);
  return reduceToSingle(sum);
}

function getSoulNumber(name) {
  const VOWELS = { a:1,e:5,i:9,o:6,u:3 };
  const sum = name.toLowerCase().replace(/[^a-z]/g, "").split("")
    .reduce((a, c) => a + (VOWELS[c] || 0), 0);
  return reduceToSingle(sum || 1);
}

function getPersonalityNumber(name) {
  const PYTHAGOREAN = {
    a:1,b:2,c:3,d:4,e:5,f:8,g:3,h:5,i:1,j:1,k:2,l:3,m:4,
    n:5,o:7,p:8,q:1,r:2,s:3,t:4,u:6,v:6,w:6,x:5,y:1,z:7,
  };
  const VOWELS = new Set(["a","e","i","o","u"]);
  const sum = name.toLowerCase().replace(/[^a-z]/g, "").split("")
    .filter(c => !VOWELS.has(c))
    .reduce((a, c) => a + (PYTHAGOREAN[c] || 0), 0);
  return reduceToSingle(sum || 1);
}

// ─── Number Meanings ─────────────────────────────────────────────────────────

const NUMBER_DATA = {
  1: {
    title: "The Leader",
    planet: "Sun ☀️",
    element: "Fire",
    color: "#E74C3C",
    gem: "Ruby",
    traits: ["Independent", "Ambitious", "Original", "Courageous"],
    description: "You are a natural-born leader with immense willpower and drive. The Sun's energy fuels your desire to stand out, create, and pioneer new paths. You thrive when given autonomy and are at your best when leading rather than following.",
    strength: "Determination & Innovation",
    challenge: "Stubbornness & Self-centeredness",
    career: "Entrepreneur, Executive, Innovator",
    love: "You seek a partner who respects your independence while matching your ambition.",
    luckyDays: "Sunday",
    luckyColors: "Gold, Red, Orange",
  },
  2: {
    title: "The Diplomat",
    planet: "Moon 🌙",
    element: "Water",
    color: "#9B59B6",
    gem: "Pearl",
    traits: ["Cooperative", "Sensitive", "Intuitive", "Peaceful"],
    description: "You are the mediator, the peacemaker, the one who sees all sides. The Moon blesses you with deep emotional intelligence and a natural ability to nurture relationships. You find strength in partnerships.",
    strength: "Empathy & Diplomacy",
    challenge: "Indecisiveness & Over-sensitivity",
    career: "Counselor, Diplomat, Artist, Nurse",
    love: "You crave deep emotional bonds and thrive in committed, harmonious relationships.",
    luckyDays: "Monday",
    luckyColors: "White, Silver, Light Blue",
  },
  3: {
    title: "The Creator",
    planet: "Jupiter ♃",
    element: "Fire",
    color: "#F39C12",
    gem: "Yellow Sapphire",
    traits: ["Creative", "Expressive", "Joyful", "Social"],
    description: "Jupiter's expansive energy fills you with creativity and optimism. You are the artist, the communicator, the one who brings color and laughter wherever you go. Your self-expression inspires others.",
    strength: "Creativity & Communication",
    challenge: "Scattered energy & Superficiality",
    career: "Writer, Actor, Designer, Speaker",
    love: "You need excitement and mental stimulation. You fall for witty, creative souls.",
    luckyDays: "Thursday",
    luckyColors: "Yellow, Purple, Gold",
  },
  4: {
    title: "The Builder",
    planet: "Rahu / Uranus",
    element: "Earth",
    color: "#27AE60",
    gem: "Hessonite",
    traits: ["Disciplined", "Reliable", "Practical", "Hardworking"],
    description: "You are the foundation upon which great things are built. Steady, disciplined, and methodical — you create order from chaos. Your loyalty and dedication make you an invaluable friend and partner.",
    strength: "Reliability & Discipline",
    challenge: "Rigidity & Resistance to change",
    career: "Engineer, Accountant, Architect, Manager",
    love: "You value loyalty above all. You are a committed, dependable partner.",
    luckyDays: "Saturday, Sunday",
    luckyColors: "Blue, Grey, Green",
  },
  5: {
    title: "The Adventurer",
    planet: "Mercury ☿",
    element: "Air",
    color: "#3498DB",
    gem: "Emerald",
    traits: ["Freedom-loving", "Versatile", "Curious", "Dynamic"],
    description: "Mercury's quicksilver energy makes you restless, adaptable, and endlessly curious. You are the traveler, the risk-taker, the one who refuses to be boxed in. Change is your constant companion.",
    strength: "Adaptability & Enthusiasm",
    challenge: "Restlessness & Impulsiveness",
    career: "Journalist, Salesperson, Traveler, Marketer",
    love: "You need space and variety. A partner who gives you freedom wins your heart.",
    luckyDays: "Wednesday",
    luckyColors: "Light Green, White, Grey",
  },
  6: {
    title: "The Nurturer",
    planet: "Venus ♀",
    element: "Earth",
    color: "#E91E8C",
    gem: "Diamond",
    traits: ["Caring", "Responsible", "Harmonious", "Artistic"],
    description: "Venus blesses you with beauty, love, and a deep sense of responsibility. You are the caregiver of the numerological world — always there for family and community. Your home is your sanctuary.",
    strength: "Compassion & Responsibility",
    challenge: "Perfectionism & Self-sacrifice",
    career: "Teacher, Doctor, Interior Designer, Social Worker",
    love: "You are devoted and romantic. You give everything in love and expect the same.",
    luckyDays: "Friday",
    luckyColors: "Pink, Blue, Rose",
  },
  7: {
    title: "The Seeker",
    planet: "Ketu / Neptune",
    element: "Water",
    color: "#8E44AD",
    gem: "Cat's Eye",
    traits: ["Analytical", "Spiritual", "Introspective", "Wise"],
    description: "You are the eternal seeker — drawn to mysteries, philosophy, and the hidden truths of the universe. Your mind is your greatest gift. Solitude refuels you, and wisdom is your ultimate goal.",
    strength: "Wisdom & Intuition",
    challenge: "Isolation & Skepticism",
    career: "Researcher, Philosopher, Scientist, Mystic",
    love: "You need an intellectual soulmate who understands your need for solitude.",
    luckyDays: "Monday, Sunday",
    luckyColors: "Violet, Purple, Grey",
  },
  8: {
    title: "The Powerhouse",
    planet: "Saturn ♄",
    element: "Earth",
    color: "#2C3E50",
    gem: "Blue Sapphire",
    traits: ["Ambitious", "Authoritative", "Resilient", "Material"],
    description: "Saturn's serious energy makes you a force to be reckoned with. You understand power, karma, and hard work better than anyone. Material success and authority are your domains — earned through perseverance.",
    strength: "Leadership & Business acumen",
    challenge: "Workaholism & Control issues",
    career: "CEO, Banker, Judge, Real Estate",
    love: "You seek a stable, ambitious partner who matches your drive for success.",
    luckyDays: "Saturday",
    luckyColors: "Dark Blue, Black, Grey",
  },
  9: {
    title: "The Humanitarian",
    planet: "Mars ♂",
    element: "Fire",
    color: "#C0392B",
    gem: "Red Coral",
    traits: ["Compassionate", "Idealistic", "Generous", "Courageous"],
    description: "Mars gives you the fire to fight for justice and humanity. You are the old soul — wise, selfless, and driven by a desire to make the world better. You feel everything deeply and love universally.",
    strength: "Compassion & Courage",
    challenge: "Martyrdom & Disappointment",
    career: "Activist, Artist, Healer, Spiritual Leader",
    love: "You love deeply and universally — you need a partner who shares your values.",
    luckyDays: "Tuesday",
    luckyColors: "Red, Rose, Pink",
  },
  11: {
    title: "The Illuminator",
    planet: "Moon/Sun ☯",
    element: "Spirit",
    color: "#5B2C6F",
    gem: "Moonstone",
    traits: ["Visionary", "Intuitive", "Inspired", "Sensitive"],
    description: "11 is a Master Number — the number of spiritual enlightenment and psychic intuition. You are here to inspire and uplift humanity. Your sensitivity is both your greatest gift and your deepest challenge.",
    strength: "Spiritual insight & Inspiration",
    challenge: "Anxiety & Overwhelm",
    career: "Spiritual teacher, Psychic, Inventor, Artist",
    love: "You need a deeply spiritual or empathetic partner who understands your intensity.",
    luckyDays: "Monday, Sunday",
    luckyColors: "Silver, White, Indigo",
  },
  22: {
    title: "The Master Builder",
    planet: "Uranus ♅",
    element: "Earth/Spirit",
    color: "#16A085",
    gem: "Sapphire",
    traits: ["Visionary", "Disciplined", "Powerful", "Practical"],
    description: "22 is the most powerful Master Number — you can turn the grandest dreams into reality. You combine intuition with practical skill to build lasting legacies. Your potential is virtually limitless.",
    strength: "Manifesting grand visions",
    challenge: "Self-doubt & Pressure",
    career: "Architect, World leader, Visionary entrepreneur",
    love: "You seek a grounded partner who supports your massive ambitions.",
    luckyDays: "Saturday, Sunday",
    luckyColors: "Coral, Gold, Silver",
  },
  33: {
    title: "The Master Teacher",
    planet: "Venus/Jupiter",
    element: "Spirit",
    color: "#D4AC0D",
    gem: "Yellow Diamond",
    traits: ["Nurturing", "Selfless", "Wise", "Healing"],
    description: "33 is the rarest Master Number — the Master Teacher. You carry the energy of pure compassion and creative expression at a cosmic level. You are here to heal, teach, and uplift all of humanity.",
    strength: "Unconditional love & Wisdom",
    challenge: "Taking on too much for others",
    career: "Healer, Guru, Artist, Humanitarian",
    love: "Love is sacred to you — you give everything and expect spiritual depth.",
    luckyDays: "Thursday, Friday",
    luckyColors: "Gold, White, Violet",
  },
};

function getData(n) {
  return NUMBER_DATA[n] || NUMBER_DATA[1];
}

// ─── Sub Components ───────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

function TraitPill({ trait, color }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-medium border"
      style={{ borderColor: color + "44", color, background: color + "11" }}
    >
      {trait}
    </span>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-stone-100 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={13} className="text-amber-600" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">{label}</p>
        <p className="text-sm text-stone-700">{value}</p>
      </div>
    </div>
  );
}

function ResultCard({ number, label, icon: Icon, color, onClick, active }) {
  const data = getData(number);
  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`rounded-xl border cursor-pointer transition-all overflow-hidden ${
        active ? "border-amber-400 shadow-md" : "border-stone-200 hover:border-stone-300"
      }`}
      style={{ background: active ? color + "08" : "#fff" }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: color + "20" }}
            >
              <Icon size={15} style={{ color }} />
            </div>
            <span className="text-xs font-medium text-stone-500">{label}</span>
          </div>
          <span className="text-3xl font-bold" style={{ color }}>{number}</span>
        </div>
        <p className="text-base font-semibold text-stone-800">{data.title}</p>
        <p className="text-xs text-stone-400 mt-0.5">{data.planet} • {data.element}</p>
      </div>
      {active && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {data.traits.map(t => (
              <span
                key={t}
                className="inline-block px-2 py-0.5 rounded-full text-[10px]"
                style={{ background: color + "15", color }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Numerology() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [results, setResults] = useState(null);
  const [activeCard, setActiveCard] = useState("life");
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState("");

  const calculate = () => {
    if (!name.trim() || !dob) {
      setError("Please enter both your full name and date of birth.");
      return;
    }
    setError("");
    const life        = getLifePathNumber(dob);
    const destiny     = getDestinyNumber(name);
    const soul        = getSoulNumber(name);
    const personality = getPersonalityNumber(name);
    setResults({ life, destiny, soul, personality });
    setCalculated(true);
    setActiveCard("life");
  };

  const reset = () => {
    setName("");
    setDob("");
    setResults(null);
    setCalculated(false);
    setError("");
  };

  const cards = results
    ? [
        { key: "life",        label: "Life Path",   number: results.life,        icon: Star,      color: "#B8860B" },
        { key: "destiny",     label: "Destiny",     number: results.destiny,     icon: Zap,       color: "#8E44AD" },
        { key: "soul",        label: "Soul Urge",   number: results.soul,        icon: Heart,     color: "#E91E8C" },
        { key: "personality", label: "Personality", number: results.personality, icon: Briefcase, color: "#2980B9" },
      ]
    : [];

  const activeData  = results ? getData(results[activeCard]) : null;
  const activeColor = cards.find(c => c.key === activeCard)?.color || "#B8860B";

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── Banner image ── */}
      <div className="relative h-72 md:h-80 flex flex-col items-center justify-center overflow-hidden">
        <img
          src={bannerImg}
          alt="Numerology Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <h1 className="relative z-10 text-2xl md:text-4xl font-semibold text-white text-center">
          Home / <span className="text-orange-400">Numerology</span>
        </h1>
        <p className="relative z-10 mt-3 text-center text-gray-200 md:text-lg px-4 max-w-xl">
          Decode the cosmic numbers hidden in your name and birth date.
        </p>
    
      </div>

      {/* ── Main content ── */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">

          {/* ── FORM state ── */}
          {!calculated ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <div className="rounded-2xl border border-stone-200 bg-white p-6 mb-6 shadow-sm">
                <h2 className="text-xl font-semibold text-stone-800 mb-5 flex items-center gap-2">
                  <Hash size={16} className="text-orange-600" />
                  Enter Your Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1.5 uppercase tracking-wider">
                      Full Name (as given at birth)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && calculate()}
                      placeholder="e.g. Kanchan Kahar"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-800 text-sm bg-stone-50 focus:outline-none focus:border-orange-400 focus:bg-white transition-all placeholder:text-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-500 mb-1.5 uppercase tracking-wider">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-800 text-sm bg-stone-50 focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      ⚠ {error}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={calculate}
                    className="w-full py-3.5 rounded-xl text-sm font-semibold bg-orange-500 text-white transition-all"
                    
                  >
                    <Sparkles size={14} className="inline mr-2 mb-0.5" />
                    Reveal My Numbers
                  </motion.button>
                </div>
              </div>

              {/* Number explorer */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-stone-200 bg-white p-5"
              >
                <h3 className="text-xl font-semibold text-stone-700 mb-4 flex items-center gap-2">
                  <Hash size={14} className="text-amber-500" />
                  Explore the 9 Core Numbers
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[1,2,3,4,5,6,7,8,9].map(n => {
                    const d = getData(n);
                    return (
                      <div
                        key={n}
                        className="rounded-xl border border-stone-100 bg-stone-50 p-4 text-center hover:bg-amber-50 hover:border-amber-200 transition-all"
                      >
                        <p className="text-2xl font-bold mb-1" style={{ color: d.color }}>{n}</p>
                        <p className="text-[10px] font-medium text-stone-500 leading-tight">{d.title}</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">{d.planet}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

          ) : (

            /* ── RESULTS state ── */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {/* top bar */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm text-stone-500 uppercase tracking-wider mb-0.5">Reading for</p>
                  <p className="text-2xl font-bold text-orange-300">{name}</p>
                  <p className="text-sm text-stone-500">{dob}</p>
                </div>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-xs text-stone-400 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-stone-100 transition-colors"
                >
                  <RefreshCw size={11} /> New Reading
                </button>
              </div>

              {/* 4 number cards */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {cards.map(c => (
                  <ResultCard
                    key={c.key}
                    {...c}
                    active={activeCard === c.key}
                    onClick={() => setActiveCard(c.key)}
                  />
                ))}
              </div>

              {/* detail panel */}
              <AnimatePresence mode="wait">
                {activeData && (
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border bg-white overflow-hidden shadow-sm mb-5"
                    style={{ borderColor: activeColor + "44" }}
                  >
                    {/* header */}
                    <div className="px-5 py-5" style={{ background: activeColor + "08" }}>
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold text-white flex-shrink-0"
                          style={{ background: activeColor }}
                        >
                          {results[activeCard]}
                        </div>
                        <div>
                          <p
                            className="text-[10px] uppercase tracking-widest mb-1"
                            style={{ color: activeColor }}
                          >
                            {cards.find(c => c.key === activeCard)?.label} Number
                          </p>
                          <p
                            className="text-xl font-bold text-stone-800"
                            style={{ fontFamily: "'Georgia', serif" }}
                          >
                            {activeData.title}
                          </p>
                          <p className="text-xs text-stone-400">
                            {activeData.planet} • {activeData.element} • {activeData.gem}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {activeData.traits.map(t => (
                          <TraitPill key={t} trait={t} color={activeColor} />
                        ))}
                      </div>
                    </div>

                    {/* description */}
                    <div className="px-5 py-4 border-b border-stone-100">
                      <p className="text-sm text-stone-600 leading-relaxed">{activeData.description}</p>
                    </div>

                    {/* info rows */}
                    <div className="px-5">
                      <InfoRow icon={Zap}        label="Greatest Strength"    value={activeData.strength} />
                      <InfoRow icon={ChevronDown} label="Core Challenge"       value={activeData.challenge} />
                      <InfoRow icon={Briefcase}   label="Ideal Career"         value={activeData.career} />
                      <InfoRow icon={Heart}       label="Love & Relationships" value={activeData.love} />
                      <InfoRow icon={Star}        label="Lucky Days"           value={activeData.luckyDays} />
                      <InfoRow icon={Sparkles}    label="Lucky Colors"         value={activeData.luckyColors} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* summary note */}
              <div
                className="rounded-xl border p-4 text-center"
                style={{ borderColor: "#B8860B33", background: "#B8860B08" }}
              >
                <p className="text-xs text-amber-700 font-medium mb-1">✨ All 4 Numbers Together</p>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Life Path <strong>{results.life}</strong> shapes your journey.{" "}
                  Destiny <strong>{results.destiny}</strong> is your mission.{" "}
                  Soul Urge <strong>{results.soul}</strong> is your heart's desire.{" "}
                  Personality <strong>{results.personality}</strong> is how the world sees you.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}