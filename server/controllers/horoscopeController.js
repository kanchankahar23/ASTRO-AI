// controllers/horoscopeController.js

// ── Dynamic Stats Generator ───────────────────────────────────────
// Same sign + same day = same stats (changes daily automatically)
const generateStats = (sign) => {
  const today = new Date().toDateString(); // "Thu May 07 2026"
  const seed = sign + today;

  const hash = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) % 100;
    }
    return h;
  };

  return {
    body:   50 + (hash(seed + "body")   % 45),
    mind:   50 + (hash(seed + "mind")   % 45),
    wealth: 50 + (hash(seed + "wealth") % 45),
    love:   50 + (hash(seed + "love")   % 45),
    health: 50 + (hash(seed + "health") % 45),
    career: 50 + (hash(seed + "career") % 45),
  };
};

// ── Horoscope Data ────────────────────────────────────────────────
const horoscopeData = {
  aries: {
    sign: 'Aries', symbol: '♈',
    date_range: 'March 21 - April 19',
    element: 'Fire', ruling_planet: 'Mars',
    traits: ['Courageous', 'Energetic', 'Confident', 'Enthusiastic'],
    lucky_number: 9, lucky_color: 'Red', lucky_stone: 'Diamond',
    compatibility: 'Leo, Sagittarius',
    daily: [
      'The stars align powerfully in your favor today. Your energy is magnetic — use it to take bold action. ✨',
      'Mars fuels your ambition today. A new opportunity is on the horizon — stay alert and trust your instincts. 🔥',
      'Your fiery spirit shines bright today. Take the lead and others will naturally follow your path. ⭐',
      'The universe pushes you toward growth today. Embrace challenges — they are your stepping stones. 🌙',
      'Your confidence is your greatest weapon today. Step forward boldly and claim what is yours. 🔮',
    ],
    weekly: 'This week brings exciting new beginnings. Mars energizes your ambitions and pushes you to take decisive action. Focus on your goals with laser precision.',
    strengths: 'Natural leader, passionate, determined, enthusiastic',
    weaknesses: 'Impatient, impulsive, aggressive at times',
    career: 'Leadership roles, entrepreneurship, sports, military suit you well.',
    love: 'You are passionate and direct in love. Leo and Sagittarius match your energy perfectly.',
  },
  taurus: {
    sign: 'Taurus', symbol: '♉',
    date_range: 'April 20 - May 20',
    element: 'Earth', ruling_planet: 'Venus',
    traits: ['Reliable', 'Patient', 'Devoted', 'Practical'],
    lucky_number: 6, lucky_color: 'Green', lucky_stone: 'Emerald',
    compatibility: 'Virgo, Capricorn',
    daily: [
      'Venus blesses you with beauty and abundance today. Focus on what truly matters to your heart. 🌙',
      'Your patience is your superpower today. Take things slow and steady — the universe rewards your consistency. ✨',
      'Financial opportunities may arise today. Trust your practical instincts and make grounded decisions. 💚',
      'Your loyalty attracts beautiful energy today. Nurture your relationships — they are your greatest treasure. ⭐',
      'The earth element grounds you beautifully today. Stay present and appreciate the gifts around you. 🔮',
    ],
    weekly: 'Venus brings harmony and abundance this week. Financial matters look promising. Focus on stability and nurturing your most important relationships.',
    strengths: 'Reliable, patient, practical, devoted, responsible',
    weaknesses: 'Stubborn, possessive, uncompromising',
    career: 'Finance, agriculture, luxury goods, art, and music align with your nature.',
    love: 'You are devoted and sensual in love. Virgo and Capricorn share your values perfectly.',
  },
  gemini: {
    sign: 'Gemini', symbol: '♊',
    date_range: 'May 21 - June 20',
    element: 'Air', ruling_planet: 'Mercury',
    traits: ['Adaptable', 'Curious', 'Witty', 'Communicative'],
    lucky_number: 5, lucky_color: 'Yellow', lucky_stone: 'Pearl',
    compatibility: 'Libra, Aquarius',
    daily: [
      'Mercury sharpens your mind today. Your words carry power — use them wisely and watch doors open. ✨',
      'Your curiosity leads you to exciting discoveries today. Explore new ideas without hesitation. 🌟',
      'Communication flows beautifully today. Express yourself openly and connections will deepen. ⭐',
      'Your adaptability is your greatest gift today. Flow like water and you will navigate every challenge. 🔮',
      'New information comes your way today. Stay open minded and let knowledge guide your decisions. 🌙',
    ],
    weekly: 'Mercury energizes your communication this week. Great time for negotiations, learning, and connecting with new people. Your ideas are powerful — share them.',
    strengths: 'Adaptable, outgoing, intelligent, witty, curious',
    weaknesses: 'Inconsistent, indecisive, nervous',
    career: 'Writing, journalism, teaching, sales, public relations suit your nature.',
    love: 'You are playful and intellectual in love. Libra and Aquarius stimulate your mind perfectly.',
  },
  cancer: {
    sign: 'Cancer', symbol: '♋',
    date_range: 'June 21 - July 22',
    element: 'Water', ruling_planet: 'Moon',
    traits: ['Intuitive', 'Emotional', 'Nurturing', 'Protective'],
    lucky_number: 2, lucky_color: 'Silver', lucky_stone: 'Ruby',
    compatibility: 'Scorpio, Pisces',
    daily: [
      'The Moon heightens your intuition today. Trust your inner feelings — they will not lead you astray. 🌙',
      'Your nurturing energy creates warmth around you today. Those you love feel your care deeply. ✨',
      'Your emotional intelligence is a superpower today. Use it to understand what others cannot express. 💙',
      'Home and family bring you peace today. Create a sanctuary and let its energy recharge your soul. ⭐',
      'Your protective instincts are strong today. Guard what matters to you while staying open to love. 🔮',
    ],
    weekly: 'The Moon guides you through deep emotional waters this week. Home and family matters take center stage. Trust your powerful intuition above all else.',
    strengths: 'Highly intuitive, compassionate, loyal, protective',
    weaknesses: 'Moody, manipulative, insecure at times',
    career: 'Healthcare, counseling, teaching, hospitality, real estate suit you well.',
    love: 'You are deeply loving and protective in relationships. Scorpio and Pisces understand your depth.',
  },
  leo: {
    sign: 'Leo', symbol: '♌',
    date_range: 'July 23 - August 22',
    element: 'Fire', ruling_planet: 'Sun',
    traits: ['Charismatic', 'Generous', 'Creative', 'Confident'],
    lucky_number: 1, lucky_color: 'Gold', lucky_stone: 'Peridot',
    compatibility: 'Aries, Sagittarius',
    daily: [
      'The Sun illuminates your path gloriously today. Step into your spotlight and let your brilliance shine. ✨',
      'Your natural charisma draws people to you today. Lead with your heart and inspire everyone around you. 🌟',
      'Creative energy flows powerfully through you today. Express yourself boldly and create something magnificent. 🔥',
      'Your generosity creates beautiful ripples today. Give freely and the universe returns abundance. ⭐',
      'Confidence is your crown today. Wear it proudly and watch the world respond to your royal energy. 🔮',
    ],
    weekly: 'The Sun empowers you magnificently this week. Your creativity and leadership are at their peak. A perfect time to start new projects and take center stage.',
    strengths: 'Creative, passionate, generous, warm-hearted, humorous',
    weaknesses: 'Arrogant, stubborn, self-centered at times',
    career: 'Entertainment, politics, management, art, and entrepreneurship align with your nature.',
    love: 'You are passionate and romantic in love. Aries and Sagittarius match your fire perfectly.',
  },
  virgo: {
    sign: 'Virgo', symbol: '♍',
    date_range: 'August 23 - September 22',
    element: 'Earth', ruling_planet: 'Mercury',
    traits: ['Analytical', 'Practical', 'Loyal', 'Hardworking'],
    lucky_number: 5, lucky_color: 'Navy Blue', lucky_stone: 'Sapphire',
    compatibility: 'Taurus, Capricorn',
    daily: [
      'Mercury sharpens your analytical mind today. Pay attention to details — you will spot what others miss. ✨',
      'Your practical nature solves complex problems effortlessly today. Trust your systematic approach. 🌙',
      'Your dedication to excellence shines brightly today. Your hard work is noticed and appreciated. ⭐',
      'A helpful opportunity to serve others presents itself today. Your kindness creates lasting impact. 🔮',
      'Organization and clarity come naturally today. Use this energy to bring order to any chaos around you. 💙',
    ],
    weekly: 'Mercury enhances your analytical powers this week. Excellent time for detailed work, health improvements, and solving long-standing problems. Your precision is unmatched.',
    strengths: 'Loyal, analytical, kind, hardworking, practical',
    weaknesses: 'Overly critical, worrying, all work no play',
    career: 'Healthcare, research, accounting, writing, and service industries suit you perfectly.',
    love: 'You are devoted and thoughtful in love. Taurus and Capricorn appreciate your reliability.',
  },
  libra: {
    sign: 'Libra', symbol: '♎',
    date_range: 'September 23 - October 22',
    element: 'Air', ruling_planet: 'Venus',
    traits: ['Diplomatic', 'Fair', 'Charming', 'Social'],
    lucky_number: 6, lucky_color: 'Pink', lucky_stone: 'Opal',
    compatibility: 'Gemini, Aquarius',
    daily: [
      'Venus blesses your relationships with harmony today. Seek balance in all things and peace will follow. ✨',
      'Your diplomatic nature resolves conflicts beautifully today. You are the bridge others need. 🌸',
      'Beauty and art speak to your soul today. Surround yourself with things that lift your spirit. ⭐',
      'Justice and fairness guide your decisions today. Trust your sense of right and wrong completely. 🔮',
      'Social connections bring joy and opportunity today. Reach out and strengthen your beautiful bonds. 🌙',
    ],
    weekly: 'Venus harmonizes your relationships this week. Focus on partnerships, creative projects, and bringing balance to areas of your life that feel unsettled.',
    strengths: 'Cooperative, diplomatic, gracious, fair-minded, social',
    weaknesses: 'Indecisive, avoids confrontation, self-pity',
    career: 'Law, diplomacy, fashion, art, counseling, and design suit your balanced nature.',
    love: 'You are charming and romantic in love. Gemini and Aquarius stimulate your intellect and heart.',
  },
  scorpio: {
    sign: 'Scorpio', symbol: '♏',
    date_range: 'October 23 - November 21',
    element: 'Water', ruling_planet: 'Pluto',
    traits: ['Passionate', 'Brave', 'Determined', 'Magnetic'],
    lucky_number: 8, lucky_color: 'Deep Red', lucky_stone: 'Topaz',
    compatibility: 'Cancer, Pisces',
    daily: [
      'Pluto reveals hidden truths to you today. Your investigative mind uncovers what others cannot see. 🔮',
      'Your magnetic energy draws powerful connections today. Trust the depth of what you feel inside. ✨',
      'Transformation is your superpower today. Embrace change and emerge stronger than before. 🌙',
      'Your intuition penetrates all illusions today. See through the surface and trust what you know. ⭐',
      'Deep emotional healing is available to you today. Allow yourself to feel and release what no longer serves you. 💜',
    ],
    weekly: 'Pluto empowers your transformation this week. Deep insights and powerful connections are available to you. Trust your instincts completely — they are razor sharp.',
    strengths: 'Resourceful, brave, passionate, stubborn, a true friend',
    weaknesses: 'Jealous, secretive, distrusting',
    career: 'Research, psychology, surgery, investigation, and finance align with your depth.',
    love: 'You are intensely loyal and passionate in love. Cancer and Pisces understand your emotional depth.',
  },
  sagittarius: {
    sign: 'Sagittarius', symbol: '♐',
    date_range: 'November 22 - December 21',
    element: 'Fire', ruling_planet: 'Jupiter',
    traits: ['Generous', 'Optimistic', 'Adventurous', 'Philosophical'],
    lucky_number: 3, lucky_color: 'Purple', lucky_stone: 'Turquoise',
    compatibility: 'Aries, Leo',
    daily: [
      'Jupiter expands your horizons magnificently today. Adventure and wisdom await — say yes to new experiences. ✨',
      'Your optimism is contagious today. Spread your positive energy and watch miracles unfold around you. 🌟',
      'A philosophical insight comes to you today. This wisdom will guide your path for weeks to come. 🔮',
      'Your adventurous spirit leads to unexpected joy today. Step outside your comfort zone boldly. ⭐',
      'Freedom and truth call to you today. Follow your highest ideals and the universe will support you. 🌙',
    ],
    weekly: 'Jupiter blesses you with expansion and opportunity this week. Perfect time for travel, learning, and pursuing your biggest dreams. Think big — the universe supports you.',
    strengths: 'Generous, idealistic, great sense of humor, adventurous',
    weaknesses: 'Promises more than delivers, impatient, tactless',
    career: 'Travel, education, philosophy, sports, publishing, and entrepreneurship suit you.',
    love: 'You are adventurous and honest in love. Aries and Leo match your passionate free spirit.',
  },
  capricorn: {
    sign: 'Capricorn', symbol: '♑',
    date_range: 'December 22 - January 19',
    element: 'Earth', ruling_planet: 'Saturn',
    traits: ['Responsible', 'Disciplined', 'Ambitious', 'Patient'],
    lucky_number: 4, lucky_color: 'Brown', lucky_stone: 'Garnet',
    compatibility: 'Taurus, Virgo',
    daily: [
      'Saturn rewards your discipline magnificently today. Every effort you make builds toward lasting success. ✨',
      'Your ambition is perfectly aligned with cosmic energy today. Take strategic steps toward your biggest goal. 🌙',
      'Patience is your greatest virtue today. The universe is preparing something remarkable for you. ⭐',
      'Your responsible nature earns deep respect today. Others look to you as their anchor and guide. 🔮',
      'Hard work and perseverance define your path today. Keep climbing — the summit is closer than you think. 💪',
    ],
    weekly: 'Saturn strengthens your foundations this week. Career advancement and financial planning are highly favored. Your discipline now creates the life you dream of.',
    strengths: 'Responsible, disciplined, self-control, good managers',
    weaknesses: 'Know-it-all, unforgiving, condescending',
    career: 'Business, management, finance, engineering, and government roles suit your ambition.',
    love: 'You are loyal and committed in love. Taurus and Virgo share your dedication and values.',
  },
  aquarius: {
    sign: 'Aquarius', symbol: '♒',
    date_range: 'January 20 - February 18',
    element: 'Air', ruling_planet: 'Uranus',
    traits: ['Progressive', 'Original', 'Humanitarian', 'Visionary'],
    lucky_number: 7, lucky_color: 'Electric Blue', lucky_stone: 'Amethyst',
    compatibility: 'Gemini, Libra',
    daily: [
      'Uranus sparks revolutionary ideas in your mind today. Your unique vision can change the world around you. ✨',
      'Your humanitarian spirit connects you to something greater today. Your actions ripple far and wide. 🌟',
      'Innovation flows through you powerfully today. Break old patterns and create something entirely new. ⭐',
      'Your independent thinking cuts through confusion today. Trust your original perspective completely. 🔮',
      'The future calls to you today. You are ahead of your time — keep dreaming and building boldly. 🌙',
    ],
    weekly: 'Uranus activates your genius this week. Revolutionary ideas and unexpected breakthroughs are available. Connect with like-minded visionaries and build something meaningful.',
    strengths: 'Progressive, original, independent, humanitarian',
    weaknesses: 'Runs from emotional expression, temperamental, uncompromising',
    career: 'Technology, science, social work, aviation, and activism align with your vision.',
    love: 'You are loyal yet freedom-loving in love. Gemini and Libra understand your independent spirit.',
  },
  pisces: {
    sign: 'Pisces', symbol: '♓',
    date_range: 'February 19 - March 20',
    element: 'Water', ruling_planet: 'Neptune',
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle'],
    lucky_number: 11, lucky_color: 'Sea Green', lucky_stone: 'Aquamarine',
    compatibility: 'Cancer, Scorpio',
    daily: [
      'Neptune deepens your intuition beautifully today. Trust the whispers of your soul — they carry divine wisdom. 🌙',
      'Your compassionate heart creates healing around you today. Your gentle presence is a gift to all. ✨',
      'Creative inspiration flows like a river through you today. Express your inner world through art and beauty. 🎨',
      'Your spiritual connection is heightened today. Meditation and stillness will reveal profound answers. ⭐',
      'Empathy is your superpower today. You feel what others cannot express — use this gift with love. 🔮',
    ],
    weekly: 'Neptune opens your spiritual and creative channels this week. Dreams carry important messages. Trust your intuition deeply and express your inner world beautifully.',
    strengths: 'Compassionate, artistic, intuitive, gentle, wise',
    weaknesses: 'Fearful, overly trusting, sad, desire to escape reality',
    career: 'Arts, music, healing, spirituality, photography, and writing suit your sensitive nature.',
    love: 'You are romantic and deeply empathetic in love. Cancer and Scorpio understand your emotional depth.',
  },
};

// ── Helper: Daily message rotates each day ────────────────────────
const getDailyMessage = (sign) => {
  const messages = horoscopeData[sign].daily;
  const today = new Date().getDate();
  return messages[today % messages.length];
};

// ── GET /api/horoscope/all ────────────────────────────────────────
export const getAllSigns = async (req, res) => {
  try {
    const signs = Object.values(horoscopeData).map(({
      sign, symbol, date_range, element,
      ruling_planet, traits, lucky_color,
      lucky_number, compatibility
    }) => ({
      sign, symbol, date_range, element,
      ruling_planet, traits, lucky_color,
      lucky_number, compatibility
    }));
    res.status(200).json({ success: true, data: signs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/horoscope/:sign ──────────────────────────────────────
export const getHoroscope = async (req, res) => {
  try {
    const sign = req.params.sign.toLowerCase();

    if (!horoscopeData[sign]) {
      return res.status(404).json({
        success: false,
        message: `Sign "${sign}" not found. Valid signs: aries, taurus, gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces`
      });
    }

    const data = horoscopeData[sign];

    // ✅ Generate dynamic stats for today
    const stats = generateStats(sign);

    res.status(200).json({
      success: true,
      data: {
        ...data,
        stats,                           // ✅ dynamic, changes daily
        daily_message: getDailyMessage(sign),
        date: new Date().toDateString(),
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};