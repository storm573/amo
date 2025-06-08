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
      image: "/placeholder-infant-seat.jpg"
    },
    {
      name: "Convertible",
      summary: "Rear to forward 4-65 lb",
      pros: ["One seat for 4-5 yrs", "High rear-facing limit"],
      cons: ["Heavy", "Not stroller-compatible", "Reinstall when switching cars"],
      image: "/placeholder-convertible-seat.jpg"
    },
    {
      name: "All-in-One / 3-in-1",
      summary: "Rear, forward, booster – up to 100 lb",
      pros: ["'Buy once' lifespan", "Good for bigger kids"],
      cons: ["Bulky", "Mixed ease of use", "Can be overkill for newborn stage"],
      image: "/placeholder-allinone-seat.jpg"
    },
    {
      name: "Dedicated Booster",
      summary: "40–120 lb; high-back or backless",
      pros: ["Cheap", "Lightweight travel option"],
      cons: ["Not for infants/toddlers", "Last stage only"],
      image: "/placeholder-booster-seat.jpg"
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

const BabyCarSeatsBuyingGuide: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentInput, setCurrentInput] = useState<{ [key: string]: string }>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleAnswerSubmit = (questionIndex: number) => {
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
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, questionIndex: number) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit(questionIndex);
    }
  };

  const isQuestionAnswered = (question: string) => answeredQuestions.has(question);

  const Tooltip: React.FC<{ term: string; children: React.ReactNode }> = ({ term, children }) => {
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
  };

  const QuestionContainer: React.FC<{ question: string; questionIndex: number }> = ({ question, questionIndex }) => {
    const isAnswered = isQuestionAnswered(question);
    const userAnswer = userAnswers.find(a => a.question === question);

    return (
      <div className={`question-container ${isAnswered ? 'answered' : ''}`}>
        <h4 className="question-text">Key question: {question}</h4>
        {!isAnswered ? (
          <div className="input-container">
            <input
              type="text"
              value={currentInput[questionIndex.toString()] || ''}
              onChange={(e) => setCurrentInput(prev => ({ ...prev, [questionIndex.toString()]: e.target.value }))}
              onKeyPress={(e) => handleKeyPress(e, questionIndex)}
              placeholder="Your answer..."
              className="question-input"
            />
            <button 
              onClick={() => handleAnswerSubmit(questionIndex)}
              className="enter-button"
              disabled={!currentInput[questionIndex.toString()]?.trim()}
            >
              Enter
            </button>
          </div>
        ) : (
          <div className="answer-display">
            <span className="user-answer">"{userAnswer?.answer}"</span>
            <span className="got-it">Got it ✓</span>
          </div>
        )}
      </div>
    );
  };

  return (
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
            <img src="/placeholder-legal.jpg" alt="Legal requirements" className="card-image" />
          </div>
          <div className="card cheat-card">
            <div className="card-icon">🚫</div>
            <h3>Never-Buy-Used Rules</h3>
            <p>Skip seats missing labels, recall notices, crash history, or past expiration (≈ 7 yrs).</p>
            <img src="/placeholder-used-warning.jpg" alt="Used seat warning" className="card-image" />
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
            <img src="/placeholder-child-fit.jpg" alt="Child fit measurements" className="card-image" />
          </div>
          <div className="card fit-card">
            <div className="card-icon">🚗</div>
            <h3>Vehicle Compatibility</h3>
            <p>Narrow center hump, reclining back seats, three-across needs.</p>
            <img src="/placeholder-vehicle-fit.jpg" alt="Vehicle compatibility" className="card-image" />
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
            <img src="/placeholder-latch.jpg" alt="LATCH system" className="card-image" />
          </div>
          <div className="card install-card">
            <div className="card-icon">⚡</div>
            <h3>Safety Features</h3>
            <p>Recline indicators, <Tooltip term="Load leg">load legs</Tooltip>, <Tooltip term="Anti-rebound bar">anti-rebound bars</Tooltip> improve angle and crash performance.</p>
            <img src="/placeholder-safety-features.jpg" alt="Safety features" className="card-image" />
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
            <img src="/placeholder-construction.jpg" alt="Construction features" className="card-image" />
          </div>
          <div className="card safety-card">
            <div className="card-icon">⭐</div>
            <h3>Third-party Scores</h3>
            <p>NHTSA ease-of-use stars; Consumer Reports crash ratings.</p>
            <img src="/placeholder-ratings.jpg" alt="Safety ratings" className="card-image" />
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
            <img src="/placeholder-comfort.jpg" alt="Comfort features" className="card-image" />
          </div>
          <div className="card comfort-card">
            <div className="card-icon">⚖️</div>
            <h3>Weight Considerations</h3>
            <p>Carrier weight: light (≈ 8 lb) vs heavy (≈ 12 lb). Machine-washable covers save sanity.</p>
            <img src="/placeholder-weight.jpg" alt="Weight comparison" className="card-image" />
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
            <img src="/placeholder-travel-system.jpg" alt="Travel system" className="card-image" />
          </div>
          <div className="card travel-card">
            <div className="card-icon">✈️</div>
            <h3>Air Travel</h3>
            <p>FAA approval for air travel if you'll fly.</p>
            <img src="/placeholder-air-travel.jpg" alt="Air travel approval" className="card-image" />
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
              <img src={`/placeholder-${tier.tier.toLowerCase()}.jpg`} alt={`${tier.tier} tier examples`} className="card-image" />
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
            <img src="/placeholder-registration.jpg" alt="Seat registration" className="card-image" />
          </div>
          <div className="card essential-card">
            <div className="card-icon">🧥</div>
            <h3>Winter Safety</h3>
            <p>No bulky coats in winter—use blankets over harness.</p>
            <img src="/placeholder-winter-safety.jpg" alt="Winter safety" className="card-image" />
          </div>
          <div className="card essential-card">
            <div className="card-icon">📈</div>
            <h3>Upgrade Time</h3>
            <p>Upgrade when head &lt; 1″ from shell top or weight limit hit, whichever first.</p>
            <img src="/placeholder-upgrade.jpg" alt="When to upgrade" className="card-image" />
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
  );
};

export default BabyCarSeatsBuyingGuide;
