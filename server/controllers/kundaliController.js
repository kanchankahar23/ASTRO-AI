// controllers/kundaliController.js

// ── Zodiac calculation from DOB ───────────────────────────────────
const getZodiacSign = (dob) => {
  const date = new Date(dob);
  const day   = date.getDate();
  const month = date.getMonth() + 1; // 1-12

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
};

// ── Moon sign based on birth month ───────────────────────────────
const getMoonSign = (dob) => {
  const signs = [
    'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius',
    'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini'
  ];
  const month = new Date(dob).getMonth(); // 0-11
  return signs[month];
};

// ── Rising sign based on birth time ──────────────────────────────
const getRisingSign = (time) => {
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const hour  = parseInt(time.split(':')[0]);
  const index = Math.floor(hour / 2) % 12;
  return signs[index];
};

// ── Nakshatra based on DOB ────────────────────────────────────────
const getNakshatra = (dob) => {
  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni',
    'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha',
    'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana',
    'Dhanishtha', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];
  const date  = new Date(dob);
  const day   = date.getDate();
  const month = date.getMonth();
  const index = (day + month * 3) % 27;
  return nakshatras[index];
};

// ── Planetary positions ───────────────────────────────────────────
const getPlanets = (dob, time) => {
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const date  = new Date(dob);
  const day   = date.getDate();
  const month = date.getMonth();
  const year  = date.getFullYear() % 100;
  const hour  = parseInt(time.split(':')[0]);

  const planets = [
    { name: '☀️ Sun',     base: month },
    { name: '🌙 Moon',    base: (month + day) % 12 },
    { name: '♂️ Mars',    base: (month + 2) % 12 },
    { name: '☿ Mercury',  base: (month + 1) % 12 },
    { name: '♃ Jupiter',  base: (year + month) % 12 },
    { name: '♀️ Venus',   base: (month + 3) % 12 },
    { name: '♄ Saturn',   base: (year + 2) % 12 },
    { name: '☊ Rahu',     base: (day + month) % 12 },
    { name: '☋ Ketu',     base: (day + month + 6) % 12 },
  ];

  return planets.map((p, i) => ({
    name:   p.name,
    sign:   signs[p.base],
    house:  ((p.base + hour) % 12) + 1,
    degree: `${((day * (i + 1) * 7) % 30).toFixed(2)}`,
  }));
};

// ── Predictions based on zodiac sign ─────────────────────────────
const getPredictions = (zodiacSign, gender) => {
  const predictions = {
    Aries: {
      career:  'Your fiery ambition drives you toward leadership roles. Expect significant career advancement this year. Mars energizes your professional life — bold moves bring bold rewards. 🚀',
      love:    'Passionate and direct, you attract equally strong partners. A meaningful romantic connection is on the horizon. Existing relationships deepen with honest communication. ❤️',
      health:  'Your energy levels are high but scattered. Channel this physical vitality through regular exercise and mindful rest. Avoid overexertion — sustainable effort brings lasting strength. 🌿',
      wealth:  'Financial opportunities arise through your leadership and initiative. Invest in ventures that align with your passion. Avoid impulsive spending — strategic planning multiplies your wealth. 💰',
      family:  'Family bonds strengthen as you take initiative in resolving old conflicts. Your protective instinct makes you a pillar of support for loved ones this period. 🏡',
      spiritual: 'Mars connects you to raw cosmic energy. Physical spiritual practices like yoga or martial arts deepen your connection to higher consciousness. 🔮',
    },
    Taurus: {
      career:  'Venus blesses your professional life with harmony and steady growth. Your reliability and patience earn well-deserved recognition. Financial fields, arts, and management suit you perfectly. 💼',
      love:    'Deeply devoted and sensual, you create lasting bonds. Venus brings romantic harmony this year. For singles, a stable and beautiful love connection is forming in your cosmic path. 🌹',
      health:  'Earth energy grounds your health beautifully. Focus on nutrition and gentle outdoor activities. Your body responds well to routine — establish healthy habits and watch them compound. 🌿',
      wealth:  'Saturn rewards your patient financial planning. Real estate and long-term investments are highly favored. Avoid get-rich-quick schemes — slow, steady wealth building is your cosmic path. 💰',
      family:  'Home and family are your sacred ground. You create a warm, stable environment for those you love. Family gatherings and traditions bring deep joy this period. 🏡',
      spiritual: 'Venus connects you to beauty as a spiritual practice. Spend time in nature, with art, or with music to access your deepest spiritual truths. 🔮',
    },
    Gemini: {
      career:  'Mercury amplifies your communication gifts in your career. Writing, teaching, media, or sales bring outstanding results. Your quick intellect solves complex problems others cannot see. 💼',
      love:    'Playful and intellectually stimulating, you attract partners who match your wit. Meaningful conversations build deep connections. Love flows when you allow vulnerability alongside your brilliance. ❤️',
      health:  'Your nervous system needs regular calming. Meditation and breathing exercises balance your active mind. Consistent sleep and reduced screen time dramatically improve your overall wellbeing. 🌿',
      wealth:  'Multiple income streams suit your versatile nature perfectly. Mercury favors trading, communication businesses, and intellectual ventures. Diversify wisely — your ideas are genuinely profitable. 💰',
      family:  'Your wit and adaptability make you the connector in your family. You bridge gaps between generations with ease. Siblings play an important role in your life this period. 🏡',
      spiritual: 'Your spiritual path is through knowledge and communication. Reading sacred texts, journaling your insights, and sharing wisdom with others deepens your cosmic connection. 🔮',
    },
    Cancer: {
      career:  'Your intuition and emotional intelligence are extraordinary professional assets. Careers in healing, counseling, hospitality, education, or real estate bring deep fulfillment. The Moon guides your success. 💼',
      love:    'You love with your entire soul. Deep, protective love is your greatest gift. A nurturing, emotionally rich relationship awaits. Trust your intuition — it always knows who deserves your heart. ❤️',
      health:  'Your health is deeply connected to your emotional state. Process feelings regularly through journaling or therapy. Nourishing home-cooked meals and adequate rest keep your body and soul in harmony. 🌿',
      wealth:  'The Moon brings financial flow through real estate, food, and care industries. Your intuitive investment decisions prove remarkably accurate. Build a financial sanctuary that makes you feel truly secure. 💰',
      family:  'Family is your entire universe. You are the emotional anchor everyone depends upon. Your home is a sacred space of warmth and healing that all are drawn to. 🏡',
      spiritual: 'The Moon is your cosmic guide. Water meditation, moonlit walks, and ancestral prayer connect you to the deepest spiritual dimensions available to any soul. 🔮',
    },
    Leo: {
      career:  'The Sun illuminates your extraordinary leadership path. Entertainment, management, politics, entrepreneurship, or the arts are your natural domains. Your charisma makes others want to follow your vision. 💼',
      love:    'Passionate and romantic, you love grandly and expect the same in return. A love that honors your magnificence and matches your warmth is written in your stars. ❤️',
      health:  'Your vitality is remarkable when you balance activity with genuine rest. Heart health deserves attention — joy, laughter, and love are literally your best medicine. 🌿',
      wealth:  'The Sun attracts wealth through visibility, leadership, and creative ventures. Invest in businesses where you can shine. Your confidence alone opens financial doors others cannot access. 💰',
      family:  'You are the proud heart of your family — generous, protective, and celebratory. Family gatherings become memorable occasions when you lead them with your natural warmth. 🏡',
      spiritual: 'The Sun is your spiritual source. Solar meditation, fire ceremonies, and acts of generous service connect you to your highest divine expression. 🔮',
    },
    Virgo: {
      career:  'Mercury sharpens your analytical mastery to extraordinary precision. Healthcare, research, accounting, writing, and service industries reward your dedication. Your attention to detail is a rare and valuable gift. 💼',
      love:    'Thoughtful and devoted, you love through acts of service and careful attention. A partner who appreciates your depth and reciprocates your dedication is being prepared for you by the cosmos. ❤️',
      health:  'Your health thrives on routine and discipline. Digestive health deserves particular attention. Regular exercise, balanced diet, and stress management through mindfulness keep you optimally well. 🌿',
      wealth:  'Mercury rewards your meticulous financial planning with steady, reliable growth. Budgeting, investing in health or service industries, and systematic saving build exceptional long-term wealth. 💰',
      family:  'You are the practical problem-solver your family always turns to. Your genuine desire to help and your attention to everyone\'s needs makes you an irreplaceable pillar of support. 🏡',
      spiritual: 'Your spiritual path is through service and purification. Fasting, clean living, healing work, and selfless service connect you to the divine in the most authentic way possible. 🔮',
    },
    Libra: {
      career:  'Venus opens beautiful doors in law, diplomacy, fashion, design, counseling, and the arts. Your natural ability to create harmony makes you invaluable in any professional environment. 💼',
      love:    'You were born to love and be loved deeply. Partnership is your natural state. A balanced, beautiful, and intellectually stimulating relationship is your cosmic birthright this lifetime. ❤️',
      health:  'Balance is your key to perfect health. Avoid extremes in diet, work, and emotion. Gentle yoga, aesthetic environments, and harmonious relationships dramatically improve your physical wellbeing. 🌿',
      wealth:  'Venus attracts wealth through beauty, luxury, partnerships, and creative fields. Joint ventures and business partnerships are highly favorable. Your charm opens financial opportunities others simply cannot access. 💰',
      family:  'You are the peacemaker your family cherishes beyond measure. Your ability to find middle ground and maintain harmony makes family gatherings genuinely joyful occasions for everyone. 🏡',
      spiritual: 'Beauty is your path to the divine. Sacred art, devotional music, balanced meditation, and acts of justice connect you to cosmic harmony in the most profound way. 🔮',
    },
    Scorpio: {
      career:  'Pluto empowers your mastery in research, psychology, surgery, investigation, finance, and transformation fields. Your penetrating insight sees what others cannot — this is your most powerful professional gift. 💼',
      love:    'You love with volcanic intensity and total loyalty. A transformative soul connection that changes both of you profoundly is written in your cosmic destiny. Deep love is your birthright. ❤️',
      health:  'Emotional processing is essential to your physical health. Unresolved feelings manifest as physical tension. Regular detoxification, deep rest, and honest emotional expression keep your body powerfully vital. 🌿',
      wealth:  'Pluto brings wealth through transformation, investigation, and financial management. Investments in healing, research, and technology prove remarkably profitable over time. Your financial instincts are razor sharp. 💰',
      family:  'Deeply loyal and fiercely protective of those you love. Family bonds run to your very soul. You would move mountains for your loved ones without a second thought. 🏡',
      spiritual: 'Pluto guides your profound spiritual transformation. Past life work, shadow healing, deep meditation, and death-rebirth ceremonies connect you to the most powerful cosmic dimensions. 🔮',
    },
    Sagittarius: {
      career:  'Jupiter expands your horizons through travel, education, philosophy, sports, publishing, and entrepreneurship. Your optimism and vision inspire entire organizations. Think internationally — your reach is genuinely global. 💼',
      love:    'Adventurous and deeply honest, you seek a partner who is also your greatest adventure companion. A free-spirited, intellectually expansive love connection is your perfect cosmic match. ❤️',
      health:  'Your active nature keeps you naturally vital. Focus on liver health and avoid overindulgence. Outdoor adventures, sports, and traveling to new places are genuinely therapeutic for your soul. 🌿',
      wealth:  'Jupiter brings financial expansion through education, international ventures, and philosophical products. Your optimism attracts investors and opportunities. Think abundantly — your wealth mindset creates your financial reality. 💰',
      family:  'You bring joy, humor, and wisdom to your entire family. Your stories from adventures and philosophical insights make you the most fascinating presence at any family gathering. 🏡',
      spiritual: 'Jupiter is your cosmic teacher. Higher education, pilgrimages, philosophical study, and teaching others what you know connect you to divine wisdom in the most expansive way. 🔮',
    },
    Capricorn: {
      career:  'Saturn rewards your exceptional discipline with remarkable long-term success. Business, management, government, engineering, and finance are your natural domains of mastery and achievement. 💼',
      love:    'Loyal, committed, and deeply responsible in love. You build relationships like you build careers — with patience and intention. A partner who values your dedication and ambition awaits you. ❤️',
      health:  'Your bones, joints, and skin deserve particular attention. Regular structured exercise, calcium-rich nutrition, and adequate rest prevent the wear your ambitious nature puts on your body. 🌿',
      wealth:  'Saturn creates extraordinary wealth through discipline, long-term planning, and systematic execution. Real estate and established industries reward your patient approach with compound financial growth. 💰',
      family:  'You are the responsible backbone your entire family depends upon. Your quiet strength, practical support, and long-term planning create security and stability for everyone you love. 🏡',
      spiritual: 'Saturn teaches through time and discipline. Structured meditation, traditional spiritual practices, karma yoga, and service to elders connect you to the deepest cosmic wisdom available. 🔮',
    },
    Aquarius: {
      career:  'Uranus activates your genius in technology, science, social innovation, aviation, and humanitarian fields. Your revolutionary ideas change industries and improve countless lives. The future literally belongs to you. 💼',
      love:    'Loyal yet beautifully independent, you need a partner who respects your freedom while sharing your vision for a better world. An intellectually electric, unconventional love is your cosmic match. ❤️',
      health:  'Your nervous system and circulation deserve regular attention. Innovative wellness practices, community activities, and giving back to society maintain your unique holistic health. 🌿',
      wealth:  'Uranus brings sudden and exciting financial breakthroughs through technology, innovation, and humanitarian ventures. Cryptocurrency, tech investments, and forward-thinking businesses align with your cosmic wealth path. 💰',
      family:  'The unconventional visionary of your family. Your ideas sometimes puzzle them but always ultimately inspire them. You teach your entire family to think beyond limitations and dream bigger. 🏡',
      spiritual: 'Uranus connects you to collective cosmic consciousness. Group meditation, humanitarian service, astrology, and working for universal human rights are your most authentic spiritual expressions. 🔮',
    },
    Pisces: {
      career:  'Neptune inspires your mastery in arts, music, healing, spirituality, photography, writing, and film. Your compassion and creativity create work that genuinely moves the human soul to its core. 💼',
      love:    'You love with boundless compassion and romantic imagination. A soulmate connection that feels like cosmic recognition — as if you have loved each other across many lifetimes — awaits you. ❤️',
      health:  'Your sensitive energy system needs regular cleansing and protection. Swimming, meditation, adequate sleep, and emotional boundaries maintain your delicate but beautiful energetic health. 🌿',
      wealth:  'Neptune brings wealth through creative, healing, and spiritual ventures. Trust your extraordinary intuition in financial decisions — it accesses information your rational mind simply cannot reach. 💰',
      family:  'The compassionate, empathetic heart of your family. You feel everyone\'s emotions as your own. Your healing presence and unconditional love create a sacred space wherever you go. 🏡',
      spiritual: 'Neptune is your cosmic ocean. Water ceremonies, dream journaling, devotional music, meditation, and acts of unconditional compassionate service are your direct pathways to the divine. 🔮',
    },
  };

  const signPredictions = predictions[zodiacSign] || predictions['Aries'];

  return [
    { area: '💼 Career',    prediction: signPredictions.career },
    { area: '❤️ Love',      prediction: signPredictions.love },
    { area: '🌿 Health',    prediction: signPredictions.health },
    { area: '💰 Wealth',    prediction: signPredictions.wealth },
    { area: '🏡 Family',    prediction: signPredictions.family },
    { area: '🔮 Spiritual', prediction: signPredictions.spiritual },
  ];
};

// ── Dasha periods ─────────────────────────────────────────────────
const getDasha = (dob) => {
  const dashaOrder = [
    { planet: 'Sun',     years: 6  },
    { planet: 'Moon',    years: 10 },
    { planet: 'Mars',    years: 7  },
    { planet: 'Rahu',    years: 18 },
    { planet: 'Jupiter', years: 16 },
    { planet: 'Saturn',  years: 19 },
    { planet: 'Mercury', years: 17 },
    { planet: 'Ketu',    years: 7  },
    { planet: 'Venus',   years: 20 },
  ];

  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  const startIndex = Math.floor(age / 10) % 9;

  return dashaOrder.slice(startIndex, startIndex + 3).map((d, i) => ({
    planet: d.planet,
    years:  d.years,
    period: `${currentYear + i * 3} – ${currentYear + i * 3 + d.years}`,
    effect: i === 0 ? 'Currently Active 🔥' : i === 1 ? 'Upcoming ⭐' : 'Future 🌙',
  }));
};

// ── POST /api/kundali ─────────────────────────────────────────────
export const generateKundali = async (req, res) => {
  try {
    const { name, dob, time, place, gender } = req.body;

    // Validate
    if (!name || !dob || !time || !place || !gender) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, dob, time, place, gender'
      });
    }

    // Calculate everything
    const zodiacSign = getZodiacSign(dob);
    const moonSign   = getMoonSign(dob);
    const risingSign = getRisingSign(time);
    const nakshatra  = getNakshatra(dob);
    const planets    = getPlanets(dob, time);
    const predictions = getPredictions(zodiacSign, gender);
    const dasha      = getDasha(dob);

    // Format date nicely
    const formattedDate = new Date(dob).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    res.status(200).json({
      success: true,
      name,
      dob:      formattedDate,
      time,
      place,
      gender,
      zodiacSign,
      moonSign,
      risingSign,
      nakshatra,
      planets,
      predictions,
      dasha,
      message: `Namaste ${name}! Your Kundali has been generated. The stars reveal a powerful and unique cosmic blueprint for your life. ✨`
    });

  } catch (error) {
    console.error('Kundali Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate Kundali. Please try again.'
    });
  }
};