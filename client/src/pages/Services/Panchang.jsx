import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bannerImg from "/ASTRO-AI/client/src/assets/Kundali_banner.avif";

import {
  Sun,
  Moon,
  Sunrise,
  Sunset,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Star,
  Wind,
  Zap,
  Calendar,
  Clock,
} from "lucide-react";

// ─── Static Data (replace with API calls) ───────────────────────────────────
const TODAY_DATA = {
  date: "Tuesday, April 21, 2026",
  samvat: "Samvat 2083",
  masa: "Vaishakha",
  location: "Jabalpur, India",
  ritu: "Vasant (Spring)",
  ayana: "Uttarayana",
  amanta: "Vaishakha",
  purnimanta: "Jyeshtha",
  tithi: { name: "Panchami", paksha: "Shukla (Bright)", upto: "01:20:16", pct: 41 },
  nakshatra: { name: "Mrigashira - 1", upto: "23:59:18", pct: 72 },
  yoga: { name: "Shobhana", upto: "12:32:31", pct: 55 },
  karana: { name: "Bava", upto: "14:45", next: "Balava", pct: 38 },
  sunrise: "05:54",
  sunset: "18:43",
  moonrise: "08:53",
  moonset: "23:15",
  currentHora: { planet: "Saturn", start: "11:15:12", end: "12:19:16" },
  currentChog: { name: "Labh", type: "good", start: "10:43:10", end: "12:19:16" },
};

const AUSPICIOUS = [
  { name: "Brahma Muhurta", type: "good", time: "04:25:18 – 05:10:05" },
  { name: "Yamaganda Kalam", type: "bad", time: "09:07:03 – 10:43:10" },
  { name: "Abhijit Muhurta", type: "good", time: "11:53:38 – 12:44:53" },
  { name: "Rahu Kalam", type: "bad", time: "15:31:28 – 17:07:34" },
  { name: "Gulikai Kalam", type: "bad", time: "06:50:00 – 08:26:00" },
  { name: "Amrit Kalam", type: "good", time: "19:12:00 – 20:48:00" },
];

const DAY_CHOG = [
  { name: "Udveg", type: "bad", start: "05:54", end: "07:30" },
  { name: "Char", type: "neutral", start: "07:30", end: "09:07" },
  { name: "Labh", type: "good", start: "09:07", end: "10:43" },
  { name: "Amrit", type: "good", start: "10:43", end: "12:19" },
  { name: "Kaal", type: "bad", start: "12:19", end: "13:55" },
  { name: "Shubh", type: "good", start: "13:55", end: "15:31" },
  { name: "Rog", type: "bad", start: "15:31", end: "17:07" },
  { name: "Udveg", type: "bad", start: "17:07", end: "18:43" },
];

const NIGHT_CHOG = [
  { name: "Shubh", type: "good", start: "18:43", end: "20:19" },
  { name: "Amrit", type: "good", start: "20:19", end: "21:55" },
  { name: "Char", type: "neutral", start: "21:55", end: "23:31" },
  { name: "Rog", type: "bad", start: "23:31", end: "01:07" },
  { name: "Kaal", type: "bad", start: "01:07", end: "02:43" },
  { name: "Labh", type: "good", start: "02:43", end: "04:19" },
  { name: "Udveg", type: "bad", start: "04:19", end: "05:54" },
  { name: "Shubh", type: "good", start: "05:54", end: "06:30" },
];

const CALENDAR_DATA = [
  { d: 1, tithi: "Chaturdashi", naksh: "U. Phalguni", sr: "06:11", special: null },
  { d: 2, tithi: "Purnima", naksh: "Hasta", sr: "06:10", special: "purnima" },
  { d: 3, tithi: "Pratipada", naksh: "Chitra", sr: "06:09", special: null },
  { d: 4, tithi: "Dvitiya", naksh: "Swati", sr: "06:08", special: null },
  { d: 5, tithi: "Tritiya", naksh: "Vishakha", sr: "06:05", special: null },
  { d: 6, tithi: "Chaturthi", naksh: "Anuradha", sr: "06:05", special: null },
  { d: 7, tithi: "Panchami", naksh: "Jyeshtha", sr: "06:04", special: null },
  { d: 8, tithi: "Shashthi", naksh: "Mula", sr: "06:03", special: null },
  { d: 9, tithi: "Saptami", naksh: "Mula", sr: "06:02", special: null },
  { d: 10, tithi: "Ashtami", naksh: "P. Ashadha", sr: "06:01", special: null },
  { d: 11, tithi: "Navami", naksh: "U. Ashadha", sr: "06:00", special: null },
  { d: 12, tithi: "Dashami", naksh: "Shravana", sr: "05:59", special: null },
  { d: 13, tithi: "Ekadashi", naksh: "Dhanishtha", sr: "05:58", special: "ekadashi" },
  { d: 14, tithi: "Dwadashi", naksh: "Shatabhisha", sr: "05:57", special: null },
  { d: 15, tithi: "Trayodashi", naksh: "P. Bhadrapada", sr: "05:56", special: null },
  { d: 16, tithi: "Chaturdashi", naksh: "U. Bhadrapada", sr: "05:54", special: null },
  { d: 17, tithi: "Amavasya", naksh: "Revati", sr: "05:53", special: "amavasya" },
  { d: 18, tithi: "Pratipada", naksh: "Ashwini", sr: "05:52", special: null },
  { d: 19, tithi: "Dvitiya", naksh: "Bharani", sr: "05:51", special: null },
  { d: 20, tithi: "Tritiya", naksh: "Rohini", sr: "05:50", special: null },
  { d: 21, tithi: "Panchami", naksh: "Mrigashira", sr: "05:49", special: null, today: true },
  { d: 22, tithi: "Shashthi", naksh: "Ardra", sr: "05:48", special: null },
  { d: 23, tithi: "Saptami", naksh: "Punarvasu", sr: "05:47", special: null },
  { d: 24, tithi: "Ashtami", naksh: "Pushya", sr: "05:46", special: null },
  { d: 25, tithi: "Navami", naksh: "Ashlesha", sr: "05:46", special: null },
  { d: 26, tithi: "Dashami", naksh: "Magha", sr: "05:45", special: null },
  { d: 27, tithi: "Ekadashi", naksh: "P. Phalguni", sr: "05:44", special: "ekadashi" },
  { d: 28, tithi: "Dwadashi", naksh: "U. Phalguni", sr: "05:43", special: null },
  { d: 29, tithi: "Trayodashi", naksh: "Hasta", sr: "05:42", special: null },
  { d: 30, tithi: "Chaturdashi", naksh: "Chitra", sr: "05:41", special: null },
];

const MOON_PHASES = { 2: "🌕", 9: "🌔", 17: "🌑", 24: "🌘" };
const CHOG_WHEEL_COLORS = {
  Udveg: "#E74C3C", Char: "#F4A261", Labh: "#27AE60",
  Amrit: "#9B59B6", Kaal: "#95A5A6", Shubh: "#3498DB",
  Rog: "#E74C3C",
};
const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SeasonCards() {
  const items = [
    { label: "Ritu (Season)", value: TODAY_DATA.ritu, icon: "🌿", color: "#d5efd7" },
    { label: "Ayana", value: TODAY_DATA.ayana, icon: "☀️", color: "#f0e8ce" },
    { label: "Amanta", value: TODAY_DATA.amanta, icon: "🌙", color: "#edd8f0" },
    { label: "Purnimanta", value: TODAY_DATA.purnimanta, icon: "⭐", color: "#d6d9eb" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="rounded-xl border border-amber-100 bg-white p-3"
          style={{ background: item.color + "55" }}
        >
          <p className="text-[10px] uppercase tracking-widest text-amber-700/60 mb-1">{item.label}</p>
          <span className="text-base mb-1 block">{item.icon}</span>
          <p className="text-xl font-bold text-zinc-800">{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
}

function DetailCard({ label, icon: Icon, value, sub, pct, color }) {
  return (
    <div className="relative rounded-xl border border-stone-200 bg-white p-4 overflow-hidden">
      <span className="absolute top-3 right-3 text-[10px] text-stone-400">{pct}%</span>
      <p className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-stone-400 mb-2">
        <Icon size={11} /> {label}
      </p>
      <p className="text-base font-semibold text-stone-800 mb-0.5">{value}</p>
      <p className="text-[11px] text-stone-500">{sub}</p>
      <div className="mt-2 h-[3px] rounded-full bg-stone-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

function ChoghadiyaWheel() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cx = 110, cy = 110, R = 95, r = 52;
    ctx.clearRect(0, 0, 220, 220);
    DAY_CHOG.forEach((seg, i) => {
      const start = (i / 8) * 2 * Math.PI - Math.PI / 2;
      const end = ((i + 1) / 8) * 2 * Math.PI - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, start, end);
      ctx.closePath();
      ctx.fillStyle = CHOG_WHEEL_COLORS[seg.name] || "#ccc";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      const mid = (start + end) / 2;
      const tx = cx + R * 0.67 * Math.cos(mid);
      const ty = cy + R * 0.67 * Math.sin(mid);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 9px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(seg.name, tx, ty);
    });
    // Inner circle
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.stroke();
    // Current time text
    ctx.fillStyle = "#1c1917";
    ctx.font = "bold 17px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("11:17", cx, cy - 7);
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#a8a29e";
    ctx.fillText("now", cx, cy + 10);
    // Needle
    const nowAngle = (3.5 / 8) * 2 * Math.PI - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * 0.88 * Math.cos(nowAngle), cy + R * 0.88 * Math.sin(nowAngle));
    ctx.strokeStyle = "#1c1917";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);
  return <canvas ref={canvasRef} width={220} height={220} className="mx-auto block" />;
}

function ChogRow({ seg, current }) {
  const colors = {
    good: "bg-emerald-50 border-emerald-200 text-emerald-700",
    bad: "bg-red-50 border-red-200 text-red-700",
    neutral: "bg-amber-50 border-amber-200 text-amber-700",
  };
  return (
    <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm mb-2 ${colors[seg.type]} ${current ? "ring-2 ring-amber-400" : ""}`}>
      <span className="font-medium">{seg.name}</span>
      {current && <span className="text-[10px] uppercase tracking-wider opacity-70 mr-2">current</span>}
      <span className="text-xs opacity-75">{seg.start} – {seg.end}</span>
    </div>
  );
}

function AuspiciousRow({ item }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-100 last:border-0">
      {item.type === "good"
        ? <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
        : <AlertTriangle size={20} className="text-amber-500 flex-shrink-0" />}
      <span className="text-sm font-medium text-stone-800 flex-1">{item.name}</span>
      <span className="text-xs text-stone-400">{item.time}</span>
    </div>
  );
}

function CalendarView() {
  const firstDOW = 3; // April 1, 2026 is Wednesday
  const blanks = Array(firstDOW).fill(null);
  const specialColor = { purnima: "text-rose-600", amavasya: "text-violet-600", ekadashi: "text-blue-600" };

  return (
    <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <button className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors">
          <ChevronLeft size={14} />
        </button>
        <span className="text-xl font-semibold text-stone-800">April 2026</span>
        <button className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-7">
        {DOW.map((d, i) => (
          <div key={d} className={`text-center py-2 text-[10px] font-semibold tracking-wider border-b border-stone-100 ${i === 0 ? "text-rose-500" : "text-stone-400"}`}>
            {d}
          </div>
        ))}
        {blanks.map((_, i) => (
          <div key={`b${i}`} className="border-r border-b border-stone-100 min-h-[68px] p-1.5" />
        ))}
        {CALENDAR_DATA.map((day, idx) => {
          const col = day.special ? specialColor[day.special] : "text-stone-700";
          const phase = MOON_PHASES[day.d];
          return (
            <div
              key={day.d}
              className={`border-r border-b ml-5 border-stone-100 min-h-[68px] p-1.5 cursor-pointer hover:bg-amber-50 transition-colors ${day.today ? "bg-amber-50/70" : ""} ${(idx + firstDOW) % 7 === 6 ? "border-r-0" : ""}`}
            >
              <p className={`text-xl font-medium mb-0.5 ${day.today ? "text-amber-600" : "text-stone-700"}`}>{day.d}</p>
              <p className={`text-[12px] leading-tight ${col} font-medium`}>{day.tithi}</p>
              <p className="text-[9px] text-amber-600 flex items-center gap-0.5 mt-0.5">
                {phase && <span>{phase}</span>}{day.naksh}
              </p>
              <p className="text-[10px] text-stone-300 mt-0.5">🌅 {day.sr}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Panchang() {
  const [tab, setTab] = useState("today");

  const tabs = [
    { id: "today", label: "Today's Panchang", icon: Sun },
    { id: "calendar", label: "Calendar", icon: Calendar },

  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Header */}
   {/* ── Banner image ── */}
        <div className="relative h-72 md:h-80 flex flex-col items-center justify-center overflow-hidden">
          <img
            src={bannerImg}
            alt="Numerology Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <h1 className="relative z-10 text-2xl md:text-4xl font-semibold text-white text-center">
            Home / <span className="text-orange-400">Panchang</span>
          </h1>
          <p className="relative z-10 mt-3 text-center text-gray-200 md:text-lg px-4 max-w-xl">
            Decode the cosmic numbers hidden in your name and birth date.
          </p>
      
        </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* Location badge */}
        <button className="flex items-center gap-1.5 text-xs text-stone-500 border border-stone-200 rounded-full px-3 py-1.5 bg-white mb-5 hover:bg-stone-50 transition-colors">
          <MapPin size={11} className="text-amber-500" />
          {TODAY_DATA.location} ▾
        </button>

        {/* Season cards */}
        <SeasonCards />

        {/* Tabs */}
        <div className="flex border-b border-stone-200 mb-5 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-stone-400 hover:text-stone-600"
                }`}
              >
                <Icon size={13} />
                {t.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {tab === "today" && (
            <motion.div key="today" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {/* Main two-col */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Choghadiya wheel + current */}
                <div className="rounded-xl border border-stone-200 bg-white p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-stone-100 text-stone-600">Choghadiya</span>
                    <span className="text-xs px-3 py-1 rounded-full border border-stone-200 text-stone-400">Gowri</span>
                  </div>
                  <ChoghadiyaWheel />
                  <div className="mt-3 flex items-center justify-between px-3 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-emerald-600 mb-0.5">Current (Good)</p>
                      <p className="text-base font-semibold text-emerald-700">{TODAY_DATA.currentChog.name}</p>
                    </div>
                    <p className="text-xs text-emerald-600">{TODAY_DATA.currentChog.start} – {TODAY_DATA.currentChog.end}</p>
                  </div>
                </div>

                {/* Detail cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  <DetailCard label="Tithi" icon={Calendar} value={TODAY_DATA.tithi.name} sub={`${TODAY_DATA.tithi.paksha} • upto ${TODAY_DATA.tithi.upto}`} pct={TODAY_DATA.tithi.pct} color="#B8860B" />
                  <DetailCard label="Nakshatra" icon={Star} value={TODAY_DATA.nakshatra.name} sub={`upto ${TODAY_DATA.nakshatra.upto}`} pct={TODAY_DATA.nakshatra.pct} color="#5DCAA5" />
                  <DetailCard label="Yoga" icon={Wind} value={TODAY_DATA.yoga.name} sub={`upto ${TODAY_DATA.yoga.upto}`} pct={TODAY_DATA.yoga.pct} color="#7F77DD" />
                  <DetailCard label="Karana" icon={Zap} value={TODAY_DATA.karana.name} sub={`upto ${TODAY_DATA.karana.upto}, then ${TODAY_DATA.karana.next}`} pct={TODAY_DATA.karana.pct} color="#D85A30" />
                </div>
              </div>

              {/* Sun / Moon grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-amber-600/70 mb-1"><Sunrise size={11} /> Sunrise</p>
                      <p className="text-xl font-semibold text-stone-800">{TODAY_DATA.sunrise}</p>
                    </div>
                    <div className="text-right">
                      <p className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-wider text-orange-500/70 mb-1"><Sunset size={11} /> Sunset</p>
                      <p className="text-xl font-semibold text-stone-800">{TODAY_DATA.sunset}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-indigo-500/70 mb-1"><Moon size={11} /> Moonrise</p>
                      <p className="text-xl font-semibold text-stone-800">{TODAY_DATA.moonrise}</p>
                    </div>
                    <div className="text-right">
                      <p className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-wider text-indigo-400/70 mb-1"><Moon size={11} /> Moonset</p>
                      <p className="text-xl font-semibold text-stone-800">{TODAY_DATA.moonset}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Hora */}
              <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-4 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-amber-700/60 mb-0.5">Current Hora</p>
                  <p className="text-lg font-semibold text-amber-900" style={{ fontFamily: "'Georgia', serif" }}>
                    {TODAY_DATA.currentHora.planet}
                  </p>
                  <p className="text-xs text-amber-700/60">Current planetary hour ruled by {TODAY_DATA.currentHora.planet}</p>
                </div>
                <p className="text-xs text-amber-700/70">{TODAY_DATA.currentHora.start} – {TODAY_DATA.currentHora.end}</p>
              </div>

              {/* Auspicious periods */}
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                <p className="px-4 py-3 text-sm font-semibold text-stone-700 border-b border-stone-100">Auspicious Periods</p>
                {AUSPICIOUS.map((item) => <AuspiciousRow key={item.name} item={item} />)}
              </div>
            </motion.div>
          )}

          {tab === "calendar" && (
            <motion.div key="cal" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <CalendarView />
            </motion.div>
          )}

      
        </AnimatePresence>
      </div>
    </div>
  );
}