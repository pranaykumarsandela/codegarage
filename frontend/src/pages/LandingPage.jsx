import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import { useEffect } from "react";
import "../styles/globals.css";

function LandingPage() {
  const earlyBirdDate = new Date("2025-12-31T23:59:59");
  const registrationCloseDate = new Date("2026-01-15T23:59:59");

  const benefits = [
    "Structured learning pathway",
    "Peer learning & community support",
    "Regular progress assessments",
    "Leaderboards & recognition",
    "Goodies for top performers",
    "Expert mentorship",
    "Interview preparation",
    "Competitive programming skills",
  ];

  // Mobile Carousel Logic
useEffect(() => {
  const carousel = document.querySelector(".stages-carousel");
  const nextBtn = document.getElementById("stageNext");
  const prevBtn = document.getElementById("stagePrev");

  if (!carousel || !nextBtn || !prevBtn) return;

  const realSlides = carousel.children.length;

  // Clone first + last
  const firstClone = carousel.children[0].cloneNode(true);
  const lastClone = carousel.children[realSlides - 1].cloneNode(true);

  firstClone.classList.add("clone-slide");
  lastClone.classList.add("clone-slide");

  // Insert clones
  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, carousel.children[0]);

  const totalSlides = carousel.children.length;
  let index = 1;

  // Start correctly
  carousel.style.transform = `translateX(-${index * 100}%)`;

  const slideTo = () => {
    carousel.style.transition = "transform 0.4s ease";
    carousel.style.transform = `translateX(-${index * 100}%)`;
  };

  const handleTransitionEnd = () => {
    const current = carousel.children[index];

    // If we hit the fake last slide (before real 1)
    if (current.classList.contains("clone-slide") && index === 0) {
      carousel.style.transition = "none";
      index = realSlides; // go to real last (3)
      carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    // If we hit the fake first slide (after real 3)
    if (current.classList.contains("clone-slide") && index === totalSlides - 1) {
      carousel.style.transition = "none";
      index = 1; // go to real first (1)
      carousel.style.transform = `translateX(-100%)`;
    }
  };

  carousel.addEventListener("transitionend", handleTransitionEnd);

  nextBtn.onclick = () => {
    index++;
    slideTo();
  };

  prevBtn.onclick = () => {
    index--;
    slideTo();
  };

  return () => {
    carousel.removeEventListener("transitionend", handleTransitionEnd);
  };
}, []);



  return (
    <div>
      <Hero />

      {/* COUNTDOWN SECTION */}
      <section id="countdown" className="countdown-section">
        <div className="container">
          <div className="center-text mb-3">
            <h2 className="gradient-text mb-1">Limited Time Offers</h2>
            <p className="text-secondary max-600">
              Register early to secure the best pricing for Code Garage 2025
            </p>
          </div>

          <div className="countdown-container">
            <Countdown
              label="Early Bird Offer"
              targetDate={earlyBirdDate}
              badge="Save ₹100"
              price="149"
              info="Limited spots available"
            />
            <Countdown
              label="Registration Closes"
              targetDate={registrationCloseDate}
              price="249"
              info="Regular pricing"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="center-text max-800">
            <h2 className="gradient-text mb-1">About Code Garage 2025</h2>
            <p className="text-secondary">
              Code Garage 2025 is a comprehensive skill-development program organized by IEEE SB OUCE Computer Society.
              Our mission is to help students strengthen their programming and problem-solving abilities through
              structured learning, guided practice, and performance-based progression.
            </p>
          </div>
        </div>
      </section>

      {/* STAGES */}
      {/* STAGES */}
<section
  id="stages"
  style={{ padding: "4rem 0", background: "var(--dark-surface)" }}
>
  <div className="container">
    <div className="center-text mb-3">
      <h2 className="gradient-text mb-1">Three-Stage Learning Path</h2>
      <p className="text-secondary">
        The program is divided into three progressive stages, allowing participants to advance at their own pace
              while maintaining motivation through regular assessments, leaderboards, and recognition-based incentives.
      </p>
    </div>

    {/* DESKTOP GRID */}
    <div className="stages-grid">
      <div className="glass-strong hover-lift stage-card">
        <div className="stage-head">
          <div className="stage-number purple">1</div>
          <h3>Programming Foundations</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Choose from Java, Python, or C++ and build a strong foundation in programming concepts.
              </p>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Self-paced learning with mentor support</li>
                <li>Core programming concepts</li>
                <li>HackerRank proficiency assessment</li>
              </ul>
      </div>

      <div className="glass-strong hover-lift stage-card">
        <div className="stage-head">
          <div className="stage-number cyan">2</div>
          <h3>Data Structures & Algorithms</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Master DSA through the Striver Sheet and regular competitive assessments.
              </p>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Complete 75% of Striver DSA Sheet</li>
                <li>Weekly/bi-weekly assessments</li>
                <li>Performance-based leaderboard</li>
              </ul>
      </div>

      <div className="glass-strong hover-lift stage-card">
        <div className="stage-head">
          <div className="stage-number green">3</div>
          <h3>Advanced Concepts & CP</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Dive into advanced topics and competitive programming strategies.
              </p>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Advanced Trees & Graphs</li>
                <li>Algorithmic patterns</li>
                <li>Offline timed coding contests</li>
          
        </ul>
      </div>
    </div>

    {/* MOBILE CAROUSEL */}
    <div className="stages-carousel-wrapper">
      <div className="stages-carousel">
        <div className="stage-card-mobile glass-strong">
          <div className="stage-head">
            <div className="stage-number purple">1</div>
            <h3>Programming Foundations</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Choose from Java, Python, or C++ and build a strong foundation in programming concepts.
              </p>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Self-paced learning with mentor support</li>
                <li>Core programming concepts</li>
                <li>HackerRank proficiency assessment</li>
              </ul>
        </div>

        <div className="stage-card-mobile glass-strong">
          <div className="stage-head">
            <div className="stage-number cyan">2</div>
            <h3>Data Structures & Algorithms</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Master DSA through the Striver Sheet and regular competitive assessments.
              </p>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Complete 75% of Striver DSA Sheet</li>
                <li>Weekly/bi-weekly assessments</li>
                <li>Performance-based leaderboard</li>
              </ul>
        </div>

        <div className="stage-card-mobile glass-strong">
          <div className="stage-head">
            <div className="stage-number green">3</div>
            <h3>Advanced Concepts & CP</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Dive into advanced topics and competitive programming strategies.
              </p>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Advanced Trees & Graphs</li>
                <li>Algorithmic patterns</li>
                <li>Offline timed coding contests</li>
              </ul>
        </div>
      </div>

      <button className="stage-nav left" id="stagePrev">‹</button>
      <button className="stage-nav right" id="stageNext">›</button>
    </div>
  </div>
</section>


      {/* BENEFITS */}
      <section id="benefits" style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="center-text mb-3">
            <h2 className="gradient-text mb-1">Key Benefits</h2>
            <p className="text-secondary">Everything you need to grow</p>
          </div>

          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card glass hover-lift">
                <div className="benefit-dot"></div>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
