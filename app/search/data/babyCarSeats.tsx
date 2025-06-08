import React, { useState } from 'react';
import './BabyCarSeats.css';

// Baby Car Seats Buying Guide Data Structure

export interface UserAnswer {
  question: string;
  answer: string;
  timestamp: Date;
}

export interface SeatType {
  name: string;
  summary: string;
  pros: string[];
  cons: string[];
  image: string;
}

export interface PriceTier {
  tier: string;
  priceRange: string;
  brands: string[];
  keyUpgrades: string[];
}

export interface TooltipData {
  term: string;
  explanation: string;
  learnMoreUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BuyingGuideSection {
  id: string;
  title: string;
  description?: string;
  cards?: any[];
  question?: string;
}

export const seatTypes: SeatType[] = [
    {
      name: "Infant-only 'bucket'",
      summary: "Rear-facing 4–35 lb; detachable base",
      pros: ["Light carrier", "Clicks into strollers", "Easy install"],
      cons: ["Outgrown in ~12 mo", "Higher total spend if buying bigger seat later"],
      image: "https://m.media-amazon.com/images/I/61fMCUlrPWL._SL1500_.jpg"
    },
    {
      name: "Convertible",
      summary: "Rear to forward 4-65 lb",
      pros: ["One seat for 4-5 yrs", "High rear-facing limit"],
      cons: ["Heavy", "Not stroller-compatible", "Reinstall when switching cars"],
      image: "https://target.scene7.com/is/image/Target/GUEST_32d45c36-2c25-4209-8e46-8497cfc8f06b"
    },
    {
      name: "All-in-One / 3-in-1",
      summary: "Rear, forward, booster – up to 100 lb",
      pros: ["'Buy once' lifespan", "Good for bigger kids"],
      cons: ["Bulky", "Mixed ease of use", "Can be overkill for newborn stage"],
      image: "https://orbitbaby.com/cdn/shop/files/G5_Plus_Black_01.jpg?v=1701114774"
    },
    {
      name: "Dedicated Booster",
      summary: "40–120 lb; high-back or backless",
      pros: ["Cheap", "Lightweight travel option"],
      cons: ["Not for infants/toddlers", "Last stage only"],
      image: "https://target.scene7.com/is/image/Target/GUEST_9b599553-a30e-4630-b96a-98723c458245"
    }
  ];

export const priceTiers: PriceTier[] = [
    {
      tier: "Budget",
      priceRange: "< $150",
      brands: ["Cosco", "Evenflo"],
      keyUpgrades: ["Basic padding", "Belt install only"]
    },
    {
      tier: "Mid",
      priceRange: "$150–300",
      brands: ["Graco", "Chicco"],
      keyUpgrades: ["Push-button LATCH", "Nicer fabrics"]
    },
    {
      tier: "Premium",
      priceRange: "$300–500",
      brands: ["Britax", "Maxi-Cosi"],
      keyUpgrades: ["Steel frame", "Anti-rebound bar"]
    },
    {
      tier: "Luxury",
      priceRange: "$500–700+",
      brands: ["Nuna", "Clek", "Cybex"],
      keyUpgrades: ["Load-leg base", "Merino wool", "Sleek design"]
    }
  ];

export const tooltips: TooltipData[] = [
    {
      term: "LATCH",
      explanation: "Lower Anchors and Tethers for Children - a standardized system for securing car seats without using seat belts",
      learnMoreUrl: "/learn/latch-system"
    },
    {
      term: "Anti-rebound bar",
      explanation: "A metal bar that extends from the car seat base to prevent excessive rotation during a crash",
      learnMoreUrl: "/learn/anti-rebound-bar"
    },
    {
      term: "Load leg",
      explanation: "A support leg that extends from the base to the vehicle floor, reducing crash forces",
      learnMoreUrl: "/learn/load-leg"
    },
    {
      term: "Side-impact protection",
      explanation: "Additional padding and structural elements that protect against side crashes",
      learnMoreUrl: "/learn/side-impact"
    },
    {
      term: "Rear-facing limit",
      explanation: "The maximum height and weight a child can be while using the seat in rear-facing position",
      learnMoreUrl: "/learn/rear-facing"
    }
  ];

export const keyQuestions = [
    "Any hard deadline (e.g., due date, planned trip) we should work around?",
    "Which seat type(s) interest you—infant-only, convertible, all-in-one, or not sure?",
    "What car model(s) will this seat go into? Any plan for multiple seats at once?",
    "Comfortable installing with seat belt if needed, or prefer straightforward LATCH?",
    "Would you pay extra for steel frame or side-impact upgrades?",
    "Which matters more: lower weight for carrying, or plush fabric for long rides?",
    "Do you plan to clip the seat onto a stroller frame? If so, which stroller?",
    "Rough budget range you'd like to stay within?",
    "Expecting additional children soon? (Determines whether long lifespan matters more.)"
  ];

export const questionOptions = [
    // Question 0: Hard deadline
    [
      "No specific deadline",
      "Within 1 month",
      "Within 3 months", 
      "Within 6 months",
      "Baby due soon (weeks)",
      "Planning a trip soon"
    ],
    // Question 1: Seat type interest
    [
      "Infant-only seat",
      "Convertible seat", 
      "All-in-one seat",
      "Not sure yet",
      "Want to compare options"
    ],
    // Question 2: Car model/multiple seats
    [
      "Sedan/smaller car",
      "SUV/larger vehicle",
      "Multiple cars to fit",
      "Need 3-across seating",
      "Compact car with space limits",
      "Planning for second child"
    ],
    // Question 3: Installation preference
    [
      "Prefer LATCH (easier)",
      "Seat belt is fine",
      "Whatever is safest",
      "Not sure about installation",
      "Want professional installation"
    ],
    // Question 4: Premium safety features
    [
      "Yes, safety is priority",
      "No, basic safety is fine", 
      "Maybe, depends on price",
      "What's the difference?",
      "Not sure what these are"
    ],
    // Question 5: Weight vs comfort priority
    [
      "Lower weight (easier carrying)",
      "Plush fabric (comfort)",
      "Balance of both",
      "Don't carry much",
      "Comfort is most important"
    ],
    // Question 6: Stroller compatibility
    [
      "Yes, have specific stroller",
      "Yes, planning to buy stroller",
      "No stroller plans",
      "Not sure yet",
      "Want travel system"
    ],
    // Question 7: Budget range
    [
      "Under $150 (budget)",
      "$150-300 (mid-range)",
      "$300-500 (premium)", 
      "$500+ (luxury)",
      "Price not a major factor",
      "Want best value"
    ],
    // Question 8: Additional children
    [
      "Yes, planning more kids",
      "No, likely just one",
      "Maybe in the future",
      "Twins/multiples expected",
      "Not sure yet"
    ]
  ];

interface BabyCarSeatsBuyingGuideProps {
  recommendations?: Array<{
    id: string;
    name: string;
    image: string;
    price: string;
    rating: number;
    keyFeature: string;
    matchReason: string;
    link?: string;
  }>;
}

// Default recommendations for baby car seats
const defaultRecommendations = [
    {
      id: '1',
      name: 'Nuna PIPA RX Infant Car Seat + RELX Base',
      image: 'https://m.media-amazon.com/images/I/61fMCUlrPWL._SL1500_.jpg',
      price: '$450',
      rating: 4.9,
      keyFeature: 'Best crash test results',
      matchReason: 'Lightest weight (8.5 lbs) with superior safety',
      link: 'https://www.bambibaby.com/products/nuna-pipa-rx-infant-car-seat-pipa-relx-base-1?variant=44186731118789'
    },
    {
      id: '2',
      name: 'Nuna PIPA Aire Infant Car Seat',
      image: 'https://babyongrand.com/cdn/shop/files/Nuna_PIPAaire_Biscotti_Angle_US_8x8_5779ff4c-035e-4d4a-bdb3-09698829de76.png?v=1729782355&width=1080',
      price: '$329',
      rating: 4.8,
      keyFeature: 'Lightweight & breathable',
      matchReason: 'Ultra-light design with mesh ventilation',
      link: 'https://www.bambibaby.com/products/nuna-pipa-aire-infant-car-seat?variant=44152830591173'
    },
    {
      id: '3',
      name: 'CYBEX Cloud T SensorSafe Infant Car Seat',
      image: 'https://m.media-amazon.com/images/I/71CpnjTVJDL._SL1500_.jpg',
      price: '$399',
      rating: 4.7,
      keyFeature: 'Smart sensor technology',
      matchReason: 'Alerts for safety with app connectivity',
      link: 'https://www.bambibaby.com/products/cybex-cloud-t-sensorsafe-infant-car-seat-sepia-black?variant=44174548926661'
    },
    {
      id: '4',
      name: 'Evenflo Revolve180 LiteMax NXT Rotational',
      image: 'https://target.scene7.com/is/image/Target/GUEST_32d45c36-2c25-4209-8e46-8497cfc8f06b',
      price: '$279',
      rating: 4.6,
      keyFeature: '180° rotation',
      matchReason: 'Easy loading with rotating convenience',
      link: 'https://www.evenflo.com/products/revolve180-litemax-nxt-gold?variant=44759101964444'
    },
    {
      id: '5',
      name: 'Graco SnugRide 35 Lite LX Infant Car Seat',
      image: 'https://orbitbaby.com/cdn/shop/products/ToddlerCarSeat_Merino_Wool_01_19c14ff8-3c87-40af-a2c4-218211707e33.jpg?v=1642116461',
      price: '$149',
      rating: 4.5,
      keyFeature: 'Budget-friendly reliability',
      matchReason: 'Trusted brand with essential safety features',
      link: 'https://www.gracobaby.com/car-seats/infant-car-seats/snugride-35-lite-lx-infant-car-seat/'
    },
    {
      id: '6',
      name: 'Cosco Scenera Next Convertible Car Seat',
      image: 'https://target.scene7.com/is/image/Target/GUEST_9b599553-a30e-4630-b96a-98723c458245',
      price: '$59',
      rating: 4.2,
      keyFeature: 'Ultra-affordable',
      matchReason: 'Basic safety at the lowest price point',
      link: 'https://www.coscocarseats.com/products/scenera-next'
    }
  ];

const BabyCarSeatsBuyingGuide: React.FC<BabyCarSeatsBuyingGuideProps> = React.memo(({ recommendations }) => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentInput, setCurrentInput] = useState<{ [key: string]: string }>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [shuffledRecommendations, setShuffledRecommendations] = useState<typeof defaultRecommendations>(defaultRecommendations);
  const [isShuffling, setIsShuffling] = useState(false);

  // Shuffle function using Fisher-Yates algorithm
  const shuffleArray = React.useCallback((array: typeof defaultRecommendations) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Initialize shuffled recommendations on mount
  React.useEffect(() => {
    setShuffledRecommendations(shuffleArray(defaultRecommendations));
  }, [shuffleArray]);

  const displayRecommendations = shuffledRecommendations;

  const handleAnswerSubmit = React.useCallback((questionIndex: number) => {
    const question = keyQuestions[questionIndex];
    const answer = currentInput[questionIndex.toString()] || '';
    
    if (answer.trim()) {
      const newAnswer: UserAnswer = {
        question,
        answer: answer.trim(),
        timestamp: new Date()
      };
      
      setUserAnswers(prev => [...prev.filter(a => a.question !== question), newAnswer]);
      setAnsweredQuestions(prev => new Set([...prev, question]));
      setCurrentInput(prev => ({ ...prev, [questionIndex.toString()]: '' }));
      
      // Shuffle recommendations after each answer with animation
      setIsShuffling(true);
      setTimeout(() => {
        setShuffledRecommendations(shuffleArray(defaultRecommendations));
        setTimeout(() => setIsShuffling(false), 300);
      }, 200);
    }
  }, [currentInput, shuffleArray]);

  const handleKeyPress = React.useCallback((e: React.KeyboardEvent, questionIndex: number) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit(questionIndex);
    }
  }, [handleAnswerSubmit]);

  const isQuestionAnswered = React.useCallback((question: string) => answeredQuestions.has(question), [answeredQuestions]);

  const Tooltip = React.useCallback(({ term, children }: { term: string; children: React.ReactNode }) => {
    const tooltipData = tooltips.find(t => t.term.toLowerCase() === term.toLowerCase());
    
    if (!tooltipData) return <>{children}</>;

    return (
      <div className="tooltip-container">
        {children}
        <button 
          className="tooltip-icon"
          onMouseEnter={() => setShowTooltip(term)}
          onMouseLeave={() => setShowTooltip(null)}
          aria-label={`Learn about ${term}`}
        >
          ℹ️
        </button>
        {showTooltip === term && (
          <div className="tooltip-card">
            <h4>{tooltipData.term}</h4>
            <p>{tooltipData.explanation}</p>
            <a href={tooltipData.learnMoreUrl} className="learn-more-link">
              Learn more →
            </a>
          </div>
        )}
      </div>
    );
  }, [showTooltip]);

  const QuestionContainer = React.useCallback(({ question, questionIndex }: { question: string; questionIndex: number }) => {
    const isAnswered = isQuestionAnswered(question);
    const userAnswer = userAnswers.find(a => a.question === question);
    const inputKey = questionIndex.toString();
    const options = questionOptions[questionIndex] || [];

    const handleSelectChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value) {
        setCurrentInput(prev => ({
          ...prev,
          [inputKey]: value
        }));
        // Auto-submit when option is selected
        setTimeout(() => handleAnswerSubmit(questionIndex), 100);
      }
    }, [inputKey, questionIndex]);

    return (
      <div className={`question-container ${isAnswered ? 'answered' : ''}`}>
        <h4 className="question-text">Key question: {question}</h4>
        {!isAnswered ? (
          <div className="input-container">
            <select
              value={currentInput[inputKey] || ''}
              onChange={handleSelectChange}
              className="question-select"
            >
              <option value="">Choose an option...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="answer-display">
            <span className="user-answer">"{userAnswer?.answer}"</span>
            <span className="got-it">Got it ✓</span>
          </div>
        )}
      </div>
    );
  }, [currentInput, userAnswers, answeredQuestions, handleAnswerSubmit]);

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Main Content Section (3/4 height) */}
      <div className="flex-grow h-3/4 overflow-y-auto">
        <div className="buying-guide-container">
          <header className="guide-header">
            <h1>🚗 Baby Car Seats Buying Guide</h1>
            <p className="subtitle">Your complete guide to choosing the perfect car seat</p>
          </header>

      {/* Quick-Start Cheat Sheet */}
      <section className="guide-section">
        <h2>1. Quick-Start Cheat Sheet</h2>
        <div className="cards-horizontal">
          <div className="card cheat-card">
            <div className="card-icon">⚖️</div>
            <h3>Legal Basics</h3>
            <p><Tooltip term="Rear-facing limit">Rear-facing until at least age 2</Tooltip> or the height/weight limit of the seat.</p>
            <img src="https://m.media-amazon.com/images/I/71CpnjTVJDL._SL1500_.jpg" alt="Legal requirements" className="card-image" />
          </div>
          <div className="card cheat-card">
            <div className="card-icon">🚫</div>
            <h3>Never-Buy-Used Rules</h3>
            <p>Skip seats missing labels, recall notices, crash history, or past expiration (≈ 7 yrs).</p>
            <img src="https://babyongrand.com/cdn/shop/files/Nuna_PIPAaire_Biscotti_Angle_US_8x8_5779ff4c-035e-4d4a-bdb3-09698829de76.png?v=1729782355&width=1080" alt="Used seat warning" className="card-image" />
          </div>
        </div>
        <QuestionContainer 
          question={keyQuestions[0]} 
          questionIndex={0} 
        />
      </section>

      {/* Seat Types & Lifespan */}
      <section className="guide-section">
        <h2>2. Seat Types & Lifespan</h2>
        <div className="cards-horizontal">
          {seatTypes.map((seat, index) => (
            <div key={index} className="card seat-type-card">
              <img src={seat.image} alt={seat.name} className="card-image" />
              <h3><Tooltip term={seat.name}>{seat.name}</Tooltip></h3>
              <p className="seat-summary">{seat.summary}</p>
              <div className="pros-cons">
                <div className="pros">
                  <h4>✅ Pros</h4>
                  <ul>
                    {seat.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Cons</h4>
                  <ul>
                    {seat.cons.map((con, i) => <li key={i}>{con}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <QuestionContainer 
          question={keyQuestions[1]} 
          questionIndex={1} 
        />
      </section>

      {/* Fit: Child and Vehicle */}
      <section className="guide-section">
        <h2>3. Fit: Child and Vehicle</h2>
        <div className="cards-horizontal">
          <div className="card fit-card">
            <div className="card-icon">📏</div>
            <h3>Child Measurements</h3>
            <p><Tooltip term="Rear-facing limit">Height/weight match</Tooltip>, shell height, and head clearance.</p>
            <img src="https://orbitbaby.com/cdn/shop/files/G5_Plus_Melange_Grey_01.jpg?v=1712700739" alt="Child fit measurements" className="card-image" />
          </div>
          <div className="card fit-card">
            <div className="card-icon">🚗</div>
            <h3>Vehicle Compatibility</h3>
            <p>Narrow center hump, reclining back seats, three-across needs.</p>
            <img src="https://orbitbaby.com/cdn/shop/files/G5_Plus_Melange_Navy_01.jpg?v=1712700739" alt="Vehicle compatibility" className="card-image" />
          </div>
        </div>
        <QuestionContainer 
          question={keyQuestions[2]} 
          questionIndex={2} 
        />
      </section>

      {/* Installation & Ease of Use */}
      <section className="guide-section">
        <h2>4. Installation & Ease of Use</h2>
        <div className="cards-horizontal">
          <div className="card install-card">
            <div className="card-icon">🔗</div>
            <h3><Tooltip term="LATCH">LATCH vs Belt Lock-off</Tooltip></h3>
            <p>LATCH simpler ≤ 65 lb combined weight; belt often fits center seat.</p>
            <img src="https://orbitbaby.com/cdn/shop/files/G5_Plus_Melange_Flax_01.jpg?v=1718688917" alt="LATCH system" className="card-image" />
          </div>
          <div className="card install-card">
            <div className="card-icon">⚡</div>
            <h3>Safety Features</h3>
            <p>Recline indicators, <Tooltip term="Load leg">load legs</Tooltip>, <Tooltip term="Anti-rebound bar">anti-rebound bars</Tooltip> improve angle and crash performance.</p>
            <img src="https://orbitbaby.com/cdn/shop/files/G5_Plus_Black_01.jpg?v=1701114774" alt="Safety features" className="card-image" />
          </div>
        </div>
        <QuestionContainer 
          question={keyQuestions[3]} 
          questionIndex={3} 
        />
      </section>

      {/* Safety & Engineering Features */}
      <section className="guide-section">
        <h2>5. Safety & Engineering Features</h2>
        <div className="cards-horizontal">
          <div className="card safety-card">
            <div className="card-icon">🛡️</div>
            <h3>Construction Features</h3>
            <p>Energy-absorbing foam, steel-reinforced frame, <Tooltip term="Side-impact protection">side-impact pods</Tooltip>.</p>
            <img src="https://m.media-amazon.com/images/I/61fMCUlrPWL._SL1500_.jpg" alt="Construction features" className="card-image" />
          </div>
          <div className="card safety-card">
            <div className="card-icon">⭐</div>
            <h3>Third-party Scores</h3>
            <p>NHTSA ease-of-use stars; Consumer Reports crash ratings.</p>
            <img src="https://m.media-amazon.com/images/I/71CpnjTVJDL._SL1500_.jpg" alt="Safety ratings" className="card-image" />
          </div>
        </div>
        <QuestionContainer 
          question={keyQuestions[4]} 
          questionIndex={4} 
        />
      </section>

      {/* Comfort & Everyday Convenience */}
      <section className="guide-section">
        <h2>6. Comfort & Everyday Convenience</h2>
        <div className="cards-horizontal">
          <div className="card comfort-card">
            <div className="card-icon">🌟</div>
            <h3>Comfort Features</h3>
            <p>Breathable fabrics, no-rethread harness, magnetic buckles.</p>
            <img src="https://babyongrand.com/cdn/shop/files/Nuna_PIPAaire_Biscotti_Angle_US_8x8_5779ff4c-035e-4d4a-bdb3-09698829de76.png?v=1729782355&width=1080" alt="Comfort features" className="card-image" />
          </div>
          <div className="card comfort-card">
            <div className="card-icon">⚖️</div>
            <h3>Weight Considerations</h3>
            <p>Carrier weight: light (≈ 8 lb) vs heavy (≈ 12 lb). Machine-washable covers save sanity.</p>
            <img src="https://target.scene7.com/is/image/Target/GUEST_32d45c36-2c25-4209-8e46-8497cfc8f06b" alt="Weight comparison" className="card-image" />
          </div>
        </div>
        <QuestionContainer 
          question={keyQuestions[5]} 
          questionIndex={5} 
        />
      </section>

      {/* Travel-System & Stroller Compatibility */}
      <section className="guide-section">
        <h2>7. Travel-System & Stroller Compatibility</h2>
        <div className="cards-horizontal">
          <div className="card travel-card">
            <div className="card-icon">🔄</div>
            <h3>Same-brand Ecosystems</h3>
            <p>Nuna PIPA ↔ MIXX = one-click transfer. Universal adapters widen choices.</p>
            <img src="https://orbitbaby.com/cdn/shop/files/G5_Plus_Black_01.jpg?v=1701114774" alt="Travel system" className="card-image" />
          </div>
          <div className="card travel-card">
            <div className="card-icon">✈️</div>
            <h3>Air Travel</h3>
            <p>FAA approval for air travel if you'll fly.</p>
            <img src="https://m.media-amazon.com/images/I/61fMCUlrPWL._SL1500_.jpg" alt="Air travel approval" className="card-image" />
          </div>
        </div>
        <QuestionContainer 
          question={keyQuestions[6]} 
          questionIndex={6} 
        />
      </section>

      {/* Price Tiers & Brand Snapshot */}
      <section className="guide-section">
        <h2>8. Price Tiers & Brand Snapshot</h2>
        <div className="cards-horizontal">
          {priceTiers.map((tier, index) => (
            <div key={index} className={`card price-tier-card tier-${tier.tier.toLowerCase()}`}>
              <div className="card-icon">💰</div>
              <h3>{tier.tier}</h3>
              <p className="price-range">{tier.priceRange}</p>
              <div className="brands">
                <h4>Brands:</h4>
                <p>{tier.brands.join(', ')}</p>
              </div>
              <div className="upgrades">
                <h4>Key Upgrades:</h4>
                <ul>
                  {tier.keyUpgrades.map((upgrade, i) => <li key={i}>{upgrade}</li>)}
                </ul>
              </div>
              <img src={tier.tier === 'Budget' ? 'https://target.scene7.com/is/image/Target/GUEST_9b599553-a30e-4630-b96a-98723c458245' : 
                       tier.tier === 'Mid' ? 'https://target.scene7.com/is/image/Target/GUEST_32d45c36-2c25-4209-8e46-8497cfc8f06b' :
                       tier.tier === 'Premium' ? 'https://m.media-amazon.com/images/I/61fMCUlrPWL._SL1500_.jpg' :
                       'https://babyongrand.com/cdn/shop/files/Nuna_PIPAaire_Biscotti_Angle_US_8x8_5779ff4c-035e-4d4a-bdb3-09698829de76.png?v=1729782355&width=1080'} 
                       alt={`${tier.tier} tier examples`} className="card-image" />
            </div>
          ))}
        </div>
        <QuestionContainer 
          question={keyQuestions[7]} 
          questionIndex={7} 
        />
      </section>

      {/* Decision Matrix */}
      <section className="guide-section">
        <h2>9. Decision Matrix</h2>
        <div className="decision-matrix">
          <p className="matrix-description">Based on your answers, we'll compare seats on these factors:</p>
          <div className="matrix-factors">
            <div className="factor">🛡️ Safety rating</div>
            <div className="factor">📏 <Tooltip term="Rear-facing limit">Rear-facing height limit</Tooltip></div>
            <div className="factor">🔧 Install ease</div>
            <div className="factor">⚖️ Carrier/seat weight</div>
            <div className="factor">💰 Price</div>
            <div className="factor">🚲 Stroller fit</div>
          </div>
          {userAnswers.length > 0 && (
            <div className="matrix-preview">
              <h4>Your Preferences So Far:</h4>
              <div className="answered-preferences">
                {userAnswers.slice(-3).map((answer, index) => (
                  <div key={index} className="preference-item">
                    <strong>{answer.question.split(':')[0]}:</strong> {answer.answer}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Ownership Essentials */}
      <section className="guide-section">
        <h2>10. Ownership Essentials</h2>
        <div className="cards-horizontal">
          <div className="card essential-card">
            <div className="card-icon">📋</div>
            <h3>Registration</h3>
            <p>Register seat for recalls immediately after purchase.</p>
            <img src="https://m.media-amazon.com/images/I/61fMCUlrPWL._SL1500_.jpg" alt="Seat registration" className="card-image" />
          </div>
          <div className="card essential-card">
            <div className="card-icon">🧥</div>
            <h3>Winter Safety</h3>
            <p>No bulky coats in winter—use blankets over harness.</p>
            <img src="https://babyongrand.com/cdn/shop/files/Nuna_PIPAaire_Biscotti_Angle_US_8x8_5779ff4c-035e-4d4a-bdb3-09698829de76.png?v=1729782355&width=1080" alt="Winter safety" className="card-image" />
          </div>
          <div className="card essential-card">
            <div className="card-icon">📈</div>
            <h3>Upgrade Time</h3>
            <p>Upgrade when head &lt; 1″ from shell top or weight limit hit, whichever first.</p>
            <img src="https://target.scene7.com/is/image/Target/GUEST_32d45c36-2c25-4209-8e46-8497cfc8f06b" alt="When to upgrade" className="card-image" />
          </div>
        </div>
        <QuestionContainer 
          question={keyQuestions[8]} 
          questionIndex={8} 
        />
      </section>

      {/* Top FAQs */}
      <section className="guide-section">
        <h2>11. Top FAQs</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h4>"Can <Tooltip term="LATCH">LATCH</Tooltip> be used in the center seat?"</h4>
            <p>Usually no - most vehicles only have LATCH anchors in outboard positions. Check your vehicle manual.</p>
          </div>
          <div className="faq-item">
            <h4>"Is the seat safe after a minor crash?"</h4>
            <p>Replace after any crash where airbags deployed or visible damage occurred. Minor fender-benders may be okay - check manufacturer guidelines.</p>
          </div>
          <div className="faq-item">
            <h4>"What about ride-share and taxis?"</h4>
            <p>Many areas allow children over 2 in ride-shares without car seats, but portable boosters or travel seats are safer options.</p>
          </div>
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <p>Questions answered: {answeredQuestions.size}/{keyQuestions.length}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(answeredQuestions.size / keyQuestions.length) * 100}%` }}
          ></div>
        </div>
        {answeredQuestions.size === keyQuestions.length && (
          <div className="completion-message">
            🎉 All done! Ready to find your perfect car seat.
          </div>
        )}
      </div>
        </div>
      </div>

      {/* Product Recommendations Section (1/4 height) */}
      <div className="h-1/4 border-t border-white/20 bg-white/10 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto h-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              🎯 Top Car Seat Recommendations for You
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
              isShuffling 
                ? 'text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-800/30' 
                : 'text-gray-600 dark:text-gray-400 bg-white/50'
            }`}>
              {isShuffling ? '🔄 Updating...' : 'Based on your answers'}
            </span>
          </div>
          
          <div className={`flex overflow-x-auto space-x-3 h-full max-h-32 pb-2 transition-all duration-300 ${
            isShuffling ? 'opacity-60 scale-98' : 'opacity-100 scale-100'
          }`}>
            {displayRecommendations.map((product) => {
              const CardContent = (
                <>
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `data:image/svg+xml,${encodeURIComponent(`
                          <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="#f3f4f6"/>
                            <text x="50%" y="50%" font-family="Arial" font-size="10" fill="#6b7280" text-anchor="middle" dy=".3em">
                              Car Seat
                            </text>
                          </svg>
                        `)}`
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        {product.price}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {product.keyFeature}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium truncate">
                      {product.matchReason}
                    </p>
                    {product.link && (
                      <p className="text-xs text-blue-500 dark:text-blue-300 mt-1">
                        View Product →
                      </p>
                    )}
                  </div>
                </>
              );

              return product.link ? (
                <a 
                  key={product.id}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-3 flex items-center space-x-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-white/90 dark:hover:bg-gray-800/90 min-w-0 flex-shrink-0"
                  style={{ minWidth: '280px' }}
                >
                  {CardContent}
                </a>
              ) : (
                <div 
                  key={product.id} 
                  className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-3 flex items-center space-x-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer min-w-0 flex-shrink-0"
                  style={{ minWidth: '280px' }}
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default BabyCarSeatsBuyingGuide;
