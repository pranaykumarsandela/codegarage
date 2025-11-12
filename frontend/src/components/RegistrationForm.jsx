import { useState } from "react";

function RegistrationForm() {
  const [step, setStep] = useState(1);

  const [done, setDone] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    year: "",
    department: "",
    rollno: "",
    discord: "",
    leetcode: "",
    github: "",
    skill: "",
    plan: "",
  });

  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // VALIDATIONS
  const valid1 = data.name && data.phone && data.email;
  const valid2 = data.year && data.department && data.rollno;
  const valid3 = data.discord && data.leetcode && data.github && data.skill;

  const next = () => {
    if (step === 1 && valid1) setDone((d) => ({ ...d, 1: true }));
    if (step === 2 && valid2) setDone((d) => ({ ...d, 2: true }));
    if (step === 3 && valid3) setDone((d) => ({ ...d, 3: true }));

    if (
      (step === 1 && !valid1) ||
      (step === 2 && !valid2) ||
      (step === 3 && !valid3)
    )
      return;

    setStep(step + 1);
  };

  const back = () => setStep(step - 1);

  // PROGRESS LINE FILL (0%, 33%, 66%, 100%)
  const progress =
    done[1] && done[2] && done[3] && done[4]
      ? "100%"
      : done[1] && done[2] && done[3]
      ? "75%"
      : done[1] && done[2]
      ? "50%"
      : done[1]
      ? "25%"
      : "0%";

  return (
    <form>

      {/* STEPS + PROGRESS */}
      <div className="steps-wrapper">
        <div className="steps-line"></div>
        <div className="steps-progress" style={{ width: progress }}></div>

        <div className="steps-bar">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`step-dot ${step === n ? "active" : ""} ${
                done[n] ? "done" : ""
              }`}
            >
              {done[n] ? "✓" : n}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="fade">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              name="name"
              value={data.name}
              onChange={handle}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              className="form-input"
              name="phone"
              value={data.phone}
              onChange={handle}
              placeholder="9876543210"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              name="email"
              value={data.email}
              onChange={handle}
              placeholder="yourname@gmail.com"
            />
          </div>

          <button
            type="button"
            disabled={!valid1}
            onClick={next}
            className="btn-primary full"
          >
            Next →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="fade">
          <div className="form-group">
            <label className="form-label">Year</label>
            <select
              className="form-select"
              name="year"
              value={data.year}
              onChange={handle}
            >
              <option value="">Select</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              name="department"
              value={data.department}
              onChange={handle}
            >
              <option value="">Select</option>
              <option value="CSE">CSE</option>
              <option value="AIML">AIML</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="MINING">MINING</option>
              <option value="BME">BME</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Roll No</label>
            <input
              className="form-input"
              name="rollno"
              value={data.rollno}
              onChange={handle}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={back} className="btn-secondary">
              ← Back
            </button>
            <button
              type="button"
              disabled={!valid2}
              onClick={next}
              className="btn-primary"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 (NEW LINKS + SKILL LEVEL) */}
      {step === 3 && (
        <div className="fade">
          <div className="form-group">
            <label className="form-label">Discord Profile Link</label>
            <input
              className="form-input"
              name="discord"
              value={data.discord}
              onChange={handle}
            />
          </div>

          <div className="form-group">
            <label className="form-label">LeetCode Profile Link</label>
            <input
              className="form-input"
              name="leetcode"
              value={data.leetcode}
              onChange={handle}
            />
          </div>

          <div className="form-group">
            <label className="form-label">GitHub Profile Link</label>
            <input
              className="form-input"
              name="github"
              value={data.github}
              onChange={handle}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Skill Level</label>
            <select
              className="form-select"
              name="skill"
              value={data.skill}
              onChange={handle}
            >
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={back} className="btn-secondary">
              ← Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!valid3}
              className="btn-primary"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 (PRICING) */}
      {step === 4 && (
        <div className="fade">

          <div className="form-group">
            <label className="form-label">Choose Pricing</label>

            <div className="plan-buttons">
              <button
                type="button"
                className={`plan-btn ${data.plan === "early" ? "active" : ""}`}
                onClick={() => setData({ ...data, plan: "early" })}
              >
                Early Bird — ₹149
              </button>

              <button
                type="button"
                className={`plan-btn ${data.plan === "regular" ? "active" : ""}`}
                onClick={() => setData({ ...data, plan: "regular" })}
              >
                Regular — ₹249
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={back}>
              ← Back
            </button>

            <button
              type="button"
              className="btn-primary"
              disabled={!data.plan}
              onClick={() => {
                setDone((d) => ({ ...d, 4: true }));

                const amount = data.plan === "early" ? 149 : 249;
                const code = Math.floor(1000 + Math.random() * 9000);

                const payload = {
                  ...data,
                  plan: amount, // overwrite plan with price in sheet
                  amount: amount,
                  code: code,
                };

                fetch(
                  "https://script.google.com/macros/s/AKfycby2sJJhDR2ZKPHreQ28WME0GEXFjI4Q30EeTRBwUe-1j8SUBGfFW7p24kxcQRCu_288ug/exec",
                  {
                    method: "POST",
                    body: JSON.stringify(payload),
                  }
                );

                window.location.href = `/payment?amount=${amount}&code=${code}`;
              }}
            >
              Continue →
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default RegistrationForm;
