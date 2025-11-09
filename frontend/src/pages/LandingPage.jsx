import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import '../styles/globals.css';

function LandingPage() {
  const earlyBirdDate = new Date('2025-12-31T23:59:59');
  const registrationCloseDate = new Date('2026-01-15T23:59:59');

  return (
    <div>
      <Hero />

      <section id="countdown" style={{ padding: '4rem 0', background: 'var(--dark-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="gradient-text" style={{ marginBottom: '1rem' }}>Limited Time Offers</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
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

      <section id="about" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>About Code Garage 2025</h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Code Garage 2025 is a comprehensive skill-development program organized by IEEE SB OUCE Computer Society.
              Our mission is to help students strengthen their programming and problem-solving abilities through
              structured learning, guided practice, and performance-based progression.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              The program is divided into three progressive stages, allowing participants to advance at their own pace
              while maintaining motivation through regular assessments, leaderboards, and recognition-based incentives.
            </p>
          </div>
        </div>
      </section>

      <section id="stages" style={{ padding: '4rem 0', background: 'var(--dark-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="gradient-text" style={{ marginBottom: '1rem' }}>Three-Stage Learning Path</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Progress through carefully designed stages to master programming fundamentals and advanced concepts
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-strong hover-lift" style={{ padding: '2rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>1</div>
              <h3 style={{ marginBottom: '1rem' }}>Programming Foundations</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Choose from Java, Python, or C++ and build a strong foundation in programming concepts.
              </p>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Self-paced learning with mentor support</li>
                <li>Core programming concepts</li>
                <li>HackerRank proficiency assessment</li>
              </ul>
            </div>

            <div className="glass-strong hover-lift" style={{ padding: '2rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-blue))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>2</div>
              <h3 style={{ marginBottom: '1rem' }}>Data Structures & Algorithms</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Master DSA through the Striver Sheet and regular competitive assessments.
              </p>
              <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li>Complete 75% of Striver DSA Sheet</li>
                <li>Weekly/bi-weekly assessments</li>
                <li>Performance-based leaderboard</li>
              </ul>
            </div>

            <div className="glass-strong hover-lift" style={{ padding: '2rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--neon-green), var(--neon-cyan))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>3</div>
              <h3 style={{ marginBottom: '1rem' }}>Advanced Concepts & CP</h3>
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
        </div>
      </section>

      <section id="benefits" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="gradient-text" style={{ marginBottom: '1rem' }}>Key Benefits</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Everything you need to become a confident problem solver
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              'Structured learning pathway',
              'Peer learning & community support',
              'Regular progress assessments',
              'Leaderboards & recognition',
              'Goodies for top performers',
              'Expert mentorship',
              'Interview preparation',
              'Competitive programming skills'
            ].map((benefit, index) => (
              <div
                key={index}
                className="glass hover-lift"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))',
                  flexShrink: 0
                }}></div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
