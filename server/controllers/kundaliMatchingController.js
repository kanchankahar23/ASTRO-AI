// controllers/kundaliMatchingController.js

// ── Zodiac calculation ────────────────────────────────────────────
const getZodiacSign = (dob) => {
  const date  = new Date(dob);
  const day   = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 3  && day >= 21) || (month === 4  && day <= 19)) return 'Aries';
  if ((month === 4  && day >= 20) || (month === 5  && day <= 20)) return 'Taurus';
  if ((month === 5  && day >= 21) || (month === 6  && day <= 20)) return 'Gemini';
  if ((month === 6  && day >= 21) || (month === 7  && day <= 22)) return 'Cancer';
  if ((month === 7  && day >= 23) || (month === 8  && day <= 22)) return 'Leo';
  if ((month === 8  && day >= 23) || (month === 9  && day <= 22)) return 'Virgo';
  if ((month === 9  && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1  && day <= 19)) return 'Capricorn';
  if ((month === 1  && day >= 20) || (month === 2  && day <= 18)) return 'Aquarius';
  return 'Pisces';
};

// ── Nakshatra index from DOB ──────────────────────────────────────
const getNakshatraIndex = (dob) => {
  const date  = new Date(dob);
  const day   = date.getDate();
  const month = date.getMonth();
  return (day + month * 3) % 27;
};

// ── Guna (element) index ──────────────────────────────────────────
const getGunaIndex = (dob) => {
  const date = new Date(dob);
  return (date.getDate() + date.getMonth()) % 3;
};

// ── Yoni index ───────────────────────────────────────────────────
const getYoniIndex = (dob) => {
  const date = new Date(dob);
  return (date.getDate() * 2 + date.getMonth()) % 14;
};

// ── Ashtakoot Guna Milan Calculation ─────────────────────────────
const calculateGunaScore = (maleDob, femaleDob) => {
  const maleNakshatra   = getNakshatraIndex(maleDob);
  const femaleNakshatra = getNakshatraIndex(femaleDob);
  const maleGuna        = getGunaIndex(maleDob);
  const femaleGuna      = getGunaIndex(femaleDob);
  const maleYoni        = getYoniIndex(maleDob);
  const femaleYoni      = getYoniIndex(femaleDob);

  const nakshatraDiff = Math.abs(maleNakshatra - femaleNakshatra);
  const gunaDiff      = Math.abs(maleGuna - femaleGuna);

  // ── 8 Kootas ─────────────────────────────────────────────────
  const gunas = [
    {
      name:      'Varna',
      maxPoints: 1,
      scored:    gunaDiff === 0 ? 1 : 0,
      meaning:   'Spiritual compatibility and ego levels between partners.',
    },
    {
      name:      'Vashya',
      maxPoints: 2,
      scored:    nakshatraDiff % 6 < 3 ? 2 : nakshatraDiff % 6 < 5 ? 1 : 0,
      meaning:   'Mutual attraction and control between the couple.',
    },
    {
      name:      'Tara',
      maxPoints: 3,
      scored:    nakshatraDiff % 9 < 4 ? 3 : nakshatraDiff % 9 < 7 ? 2 : 1,
      meaning:   'Birth star compatibility and health of partners.',
    },
    {
      name:      'Yoni',
      maxPoints: 4,
      scored:    Math.abs(maleYoni - femaleYoni) < 3 ? 4
               : Math.abs(maleYoni - femaleYoni) < 6 ? 3
               : Math.abs(maleYoni - femaleYoni) < 9 ? 2 : 1,
      meaning:   'Physical and intimate compatibility between partners.',
    },
    {
      name:      'Graha Maitri',
      maxPoints: 5,
      scored:    gunaDiff === 0 ? 5 : gunaDiff === 1 ? 4 : gunaDiff === 2 ? 2 : 1,
      meaning:   'Mental compatibility and friendship between partners.',
    },
    {
      name:      'Gana',
      maxPoints: 6,
      scored:    maleGuna === femaleGuna ? 6
               : Math.abs(maleGuna - femaleGuna) === 1 ? 4 : 2,
      meaning:   'Temperament and nature compatibility of the couple.',
    },
    {
      name:      'Bhakoot',
      maxPoints: 7,
      scored:    nakshatraDiff < 5 ? 7
               : nakshatraDiff < 10 ? 5
               : nakshatraDiff < 15 ? 3 : 1,
      meaning:   'Love, affection, and family prosperity compatibility.',
    },
    {
      name:      'Nadi',
      maxPoints: 8,
      scored:    maleGuna !== femaleGuna ? 8 : 0,
      meaning:   'Health, genes, and progeny compatibility between partners.',
    },
  ];

  return gunas;
};

// ── Compatibility level from score ────────────────────────────────
const getCompatibility = (score, maxScore) => {
  const pct = (score / maxScore) * 100;

  if (pct >= 90) return {
    level:   'Exceptional',
    color:   'green',
    message: 'A truly divine union blessed by the cosmos! The stars have aligned perfectly for this couple. Your bond will be extraordinarily strong, deeply loving, and spiritually elevating for both souls. 🌟',
  };
  if (pct >= 75) return {
    level:   'Excellent',
    color:   'green',
    message: 'The cosmic energies align beautifully for this union. This is a deeply compatible match with strong foundations for a long, harmonious, and prosperous life together. ✨',
  };
  if (pct >= 60) return {
    level:   'Good',
    color:   'blue',
    message: 'The stars smile upon this union with warmth and approval. A good match with solid compatibility. With mutual understanding and love, this relationship will flourish beautifully. 💙',
  };
  if (pct >= 50) return {
    level:   'Average',
    color:   'yellow',
    message: 'The cosmic energies are moderately aligned. This match has potential but requires conscious effort, mutual respect, and deep understanding from both partners to thrive fully. 🌙',
  };
  return {
    level:   'Challenging',
    color:   'red',
    message: 'The stars indicate significant differences in cosmic energies. This match may face challenges that require exceptional patience, love, and spiritual guidance to navigate successfully. 🔮',
  };
};

// ── Relationship predictions based on score ───────────────────────
const getRelationshipPredictions = (maleDob, femaleDob, totalScore) => {
  const maleMonth   = new Date(maleDob).getMonth();
  const femaleMonth = new Date(femaleDob).getMonth();
  const diff        = Math.abs(maleMonth - femaleMonth);
  const pct         = (totalScore / 36) * 100;

  return [
    {
      area: '💑 Marriage Compatibility',
      prediction: pct >= 75
        ? 'This union is highly auspicious for marriage. The stars bless this couple with deep love, mutual respect, and a lifelong bond that grows stronger with every passing year.'
        : pct >= 50
        ? 'Marriage is possible with conscious effort and understanding. Both partners must nurture communication and respect to build a lasting, meaningful union.'
        : 'Marriage may face challenges. Seek guidance from experienced astrologers and ensure strong emotional foundations before proceeding.',
    },
    {
      area: '👶 Children & Family',
      prediction: diff < 4
        ? 'The cosmic alignment is favorable for children and family growth. A nurturing, warm family environment is indicated with potential for wonderful children who bring joy.'
        : 'Family life will require patience and planning. The stars suggest that with love and dedication, a beautiful family life is achievable for this couple.',
    },
    {
      area: '💰 Financial Prosperity',
      prediction: totalScore >= 25
        ? 'Financial prosperity flows naturally in this union. Combined energies attract abundance, stability, and material comfort. Joint ventures and investments will prove fruitful.'
        : 'Financial stability requires joint planning and discipline. Avoid major financial risks early in marriage and build wealth systematically together.',
    },
    {
      area: '❤️ Emotional Bond',
      prediction: pct >= 70
        ? 'An exceptionally deep emotional connection exists between these souls. They will understand each other intuitively, provide unwavering support, and create a safe emotional sanctuary for each other.'
        : 'The emotional bond will strengthen over time through shared experiences. Open communication and vulnerability will deepen the connection between these two souls.',
    },
    {
      area: '🌿 Health & Wellbeing',
      prediction: totalScore >= 20
        ? 'Both partners will positively influence each other\'s health and wellbeing. The union brings vitality, healthy habits, and mutual care that keeps both partners flourishing.'
        : 'Health requires mutual attention and care in this union. Supporting each other through challenges and maintaining healthy routines together will strengthen both body and bond.',
    },
    {
      area: '🔮 Spiritual Connection',
      prediction: diff % 3 === 0
        ? 'A profound spiritual connection exists between these souls. They will grow together on the spiritual path, supporting each other\'s evolution and awakening to higher consciousness.'
        : 'Spiritual growth happens individually but complements the relationship. Respecting each other\'s spiritual paths while sharing values will create beautiful harmony.',
    },
  ];
};

// ── POST /api/kundali-matching ────────────────────────────────────
export const matchKundali = async (req, res) => {
  try {
    const { male, female } = req.body;

    // Validate
    if (!male?.name || !male?.dob || !female?.name || !female?.dob) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and date of birth for both male and female.'
      });
    }

    // Calculate
    const gunaDetails   = calculateGunaScore(male.dob, female.dob);
    const totalScore    = gunaDetails.reduce((sum, g) => sum + g.scored, 0);
    const maxScore      = gunaDetails.reduce((sum, g) => sum + g.maxPoints, 0); // 36
    const percentage    = Math.round((totalScore / maxScore) * 100);
    const compatibility = getCompatibility(totalScore, maxScore);
    const predictions   = getRelationshipPredictions(male.dob, female.dob, totalScore);

    res.status(200).json({
      success: true,
      male: {
        name:   male.name,
        dob:    new Date(male.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        place:  male.place  || 'Not provided',
        time:   male.time   || 'Not provided',
        zodiac: getZodiacSign(male.dob),
      },
      female: {
        name:   female.name,
        dob:    new Date(female.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        place:  female.place  || 'Not provided',
        time:   female.time   || 'Not provided',
        zodiac: getZodiacSign(female.dob),
      },
      totalScore,
      maxScore,
      percentage,
      compatibility,
      gunaDetails,
      predictions,
      summary: `${male.name} and ${female.name} have a ${compatibility.level} match with ${totalScore} out of ${maxScore} Gunas. ${compatibility.message}`,
    });

  } catch (error) {
    console.error('Kundali Matching Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to match Kundali. Please try again.'
    });
  }
};