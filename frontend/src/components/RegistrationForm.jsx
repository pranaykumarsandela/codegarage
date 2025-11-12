import { useState, useEffect } from "react";
import { EARLY_BIRD_END_DATE } from "../config/eventConfig";

function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState({ 1: false, 2: false, 3: false });
  const [errors, setErrors] = useState({});
  const [amount, setAmount] = useState(149);

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
  });

  // Set amount automatically based on early-bird deadline
  useEffect(() => {
    const now = new Date();
    setAmount(now < EARLY_BIRD_END_DATE ? 149 : 249);
  }, []);

  const handle = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    validate(name, value);
  };

  // ✅ Validation rules
  const validate = (field, value) => {
    let message = "";

    switch (field) {
      case "name":
        if (!/^[A-Za-z\s]{3,}$/.test(value))
          message = "Enter a valid name (min 3 letters)";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value))
          message = "Phone number must be 10 digits";
        break;
      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          message = "Enter a valid email address";
        break;
      case "rollno":
        if (!/^[A-Za-z0-9]{12}$/.test(value))
          message = "Roll number must be exactly 12 characters";
        break;
      case "discord":
        if (value.length < 3)
          message = "Enter a valid Discord username or ID";
        break;
      case "leetcode":
        if (value.length < 3)
          message = "Enter a valid LeetCode username";
        break;
      case "github":
        if (value.length < 3)
          message = "Enter a valid GitHub username";
        break;
      default:
        message = "";
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  // ✅ Validation per step
  const valid1 =
    data.name && data.phone && data.email && !errors.name && !errors.phone && !errors.email;

  const valid2 =
    data.year && data.department && data.rollno && !errors.rollno;

  const valid3 =
    data.discord &&
    data.leetcode &&
    data.github &&
    data.skill &&
    !errors.discord &&
    !errors.leetcode &&
    !errors.github;

  const next = async () => {
    if (step === 1 && valid1) setDone((d) => ({ ...d, 1: true }));
    if (step === 2 && valid2) setDone((d) => ({ ...d, 2: true }));
    if (step === 3 && valid3) setDone((d) => ({ ...d, 3: true }));

    if ((step === 1 && !valid1) || (step === 2 && !valid2) || (step === 3 && !valid3))
      return;

    // ✅ Final step → go to payment
    if (step === 3) {
      const payload = {
        ...data,
        discord: `https://discord.com/users/${data.discord}`,
        leetcode: `https://leetcode.com/${data.leetcode}`,
        github: `https://github.com/${data.github}`,
        amount,
      };

      localStorage.setItem("registrationData", JSON.stringify(payload));

      // ✅ Send registration data to Google Sheets
      try {
        fetch("https://script.google.com/macros/s/AKfycbzAribFfpDf9WhPTFAIRMI6B3oideI8yMIuPKfMR7U-Gs_075mt84qU7t2nzNQDHn6V/exec", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        console.log("✅ Registration data sent to Google Sheets:", payload);
      } catch (error) {
        console.error("❌ Error sending registration data:", error);
      }

      window.location.href = "/payment";
      return;
    }

    setStep(step + 1);
  };

  const back = () => setStep(step - 1);

  // ✅ Progress bar
  const progress =
    done[1] && done[2] && done[3]
      ? "100%"
      : done[1] && done[2]
      ? "66%"
      : done[1]
      ? "33%"
      : "0%";

  return (
    <form>
      {/* Steps Progress */}
      <div className="steps-wrapper">
        <div className="steps-line"></div>
        <div className="steps-progress" style={{ width: progress }}></div>
        <div className="steps-bar">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`step-dot ${step === n ? "active" : ""} ${done[n] ? "done" : ""}`}
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
            <label>Full Name</label>
            <input className={`form-input ${errors.name ? "invalid" : ""}`} name="name" value={data.name} onChange={handle} placeholder="Enter your name" />
            {errors.name && <small className="error">{errors.name}</small>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input className={`form-input ${errors.phone ? "invalid" : ""}`} name="phone" value={data.phone} onChange={handle} placeholder="9876543210" />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input className={`form-input ${errors.email ? "invalid" : ""}`} name="email" value={data.email} onChange={handle} placeholder="yourname@gmail.com" />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <button type="button" disabled={!valid1} onClick={next} className={`btn-primary full ${!valid1 ? "disabled" : ""}`}>
            Next →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="fade">
          <div className="form-group">
            <label>Year</label>
            <select className="form-select" name="year" value={data.year} onChange={handle}>
              <option value="">Select</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select className="form-select" name="department" value={data.department} onChange={handle}>
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
            <label>Roll No</label>
            <input className={`form-input ${errors.rollno ? "invalid" : ""}`} name="rollno" value={data.rollno} onChange={handle} />
            {errors.rollno && <small className="error">{errors.rollno}</small>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={back} className="btn-secondary">← Back</button>
            <button type="button" disabled={!valid2} onClick={next} className={`btn-primary ${!valid2 ? "disabled" : ""}`}>
              Next →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="fade">
          <div className="form-group">
            <label>Discord ID</label>
            <input className={`form-input ${errors.discord ? "invalid" : ""}`} name="discord" value={data.discord} onChange={handle} placeholder="alex_123_" />
            {errors.discord && <small className="error">{errors.discord}</small>}
          </div>

          <div className="form-group">
            <label>LeetCode Username</label>
            <input className={`form-input ${errors.leetcode ? "invalid" : ""}`} name="leetcode" value={data.leetcode} onChange={handle} placeholder="alexleetcode" />
            {errors.leetcode && <small className="error">{errors.leetcode}</small>}
          </div>

          <div className="form-group">
            <label>GitHub Username</label>
            <input className={`form-input ${errors.github ? "invalid" : ""}`} name="github" value={data.github} onChange={handle} placeholder="alexgithub" />
            {errors.github && <small className="error">{errors.github}</small>}
          </div>

          <div className="form-group">
            <label>Skill Level</label>
            <select className="form-select" name="skill" value={data.skill} onChange={handle}>
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={back} className="btn-secondary">← Back</button>
            <button type="button" disabled={!valid3} onClick={next} className={`btn-primary ${!valid3 ? "disabled" : ""}`}>
              Continue →
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default RegistrationForm;
