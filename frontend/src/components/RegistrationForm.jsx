import { useState, useEffect } from "react";
import { EARLY_BIRD_END_DATE } from "../config/eventConfig";
import SuccessAnimation from "../components/SuccessAnimation";

function RegistrationForm({ onStateChange }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState({ 1: false, 2: false, 3: false });
  const [errors, setErrors] = useState({});
  const [amount, setAmount] = useState(149);

  // these must be defined before using inside useEffect
  const [showPayment, setShowPayment] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
  useEffect(() => {
  const now = new Date();
  setAmount(now < EARLY_BIRD_END_DATE ? 149 : 249);
}, []);

  // notify parent whenever these two states change
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        showPayment,
        paymentSuccess,
      });
    }
  }, [showPayment, paymentSuccess]);


  const handle = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    validate(name, value);
  };

  const validate = (field, value) => {
    let message = "";

    switch (field) {
      case "name":
        if (!/^[A-Za-z\s]{3,}$/.test(value))
          message = "Enter a valid name (min 3 letters)";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value))
          message = "Phone must be 10 digits";
        break;
      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          message = "Invalid email address";
        break;
      case "rollno":
        if (!/^[A-Za-z0-9]{12}$/.test(value))
          message = "Roll number must be 12 characters";
        break;
      case "discord":
        if (value.length < 3)
          message = "Enter a valid Discord ID";
        break;
      case "leetcode":
        if (value.length < 3)
          message = "Enter a valid LeetCode username";
        break;
      case "github":
        if (value.length < 3)
          message = "Enter a valid GitHub username";
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const valid1 = data.name && data.phone && data.email && !errors.name && !errors.phone && !errors.email;
  const valid2 = data.year && data.department && data.rollno && !errors.rollno;
  const valid3 =
    data.discord &&
    data.leetcode &&
    data.github &&
    data.skill &&
    !errors.discord &&
    !errors.leetcode &&
    !errors.github;

  const next = () => {
    if (step === 1 && valid1) setDone({ ...done, 1: true });
    if (step === 2 && valid2) setDone({ ...done, 2: true });
    if (step === 3 && valid3) setDone({ ...done, 3: true });

    if ((step === 1 && !valid1) || (step === 2 && !valid2) || (step === 3 && !valid3)) return;

    if (step === 3) {
      setShowPayment(true);
      return;
    }

    setStep(step + 1);
  };

  const back = () => {
    if (showPayment) {
      setShowPayment(false);
      return;
    }
    setStep(step - 1);
  };

  const submitPayment = async () => {
    if (!/^[A-Za-z0-9]{10,30}$/.test(transactionId.trim())) {
      alert("Enter a valid UPI Transaction ID");
      return;
    }

    const finalPayload = {
      ...data,
      discord: `https://discord.com/users/${data.discord}`,
      leetcode: `https://leetcode.com/${data.leetcode}`,
      github: `https://github.com/${data.github}`,
      amount,
      transactionId,
    };

    try {
      const form = new URLSearchParams();
      Object.entries(finalPayload).forEach(([k, v]) => form.append(k, v));

      await fetch("https://script.google.com/macros/s/AKfycbwZotioNMslv0v-kxum5aBKdDns_wmO6dqCbTPySrR477E6Tye5JeohaCCGQuRPMIEF/exec", {
        method: "POST",
        body: form,
      });

      setPaymentSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  const qrImage = amount === 149 ? "/qr-early.jpeg" : "/qr-regular.jpeg";

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
      {/* Hide steps when payment or success is shown */}
      {!showPayment && !paymentSuccess && (
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
      )}

      {/* STEP 1 */}
      {step === 1 && !showPayment && (
        <div className="fade">
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" className={`form-input ${errors.name ? "invalid" : ""}`} value={data.name} onChange={handle} placeholder="Enter your name" />
            {errors.name && <small className="error">{errors.name}</small>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input name="phone" className={`form-input ${errors.phone ? "invalid" : ""}`} value={data.phone} onChange={handle} placeholder="9876543210" />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" className={`form-input ${errors.email ? "invalid" : ""}`} value={data.email} onChange={handle} placeholder="yourname@gmail.com" />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <button type="button" disabled={!valid1} onClick={next} className={`btn-primary full ${!valid1 ? "disabled" : ""}`}>
            Next →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && !showPayment && (
        <div className="fade">
          <div className="form-group">
            <label>Year</label>
            <select name="year" className="form-select" value={data.year} onChange={handle}>
              <option value="">Select</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select name="department" className="form-select" value={data.department} onChange={handle}>
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
            <input name="rollno" className={`form-input ${errors.rollno ? "invalid" : ""}`} value={data.rollno} onChange={handle} placeholder="Enter your roll number" />
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
      {step === 3 && !showPayment && (
        <div className="fade">
          <div className="form-group">
            <label>Discord ID</label>
            <input name="discord" className={`form-input ${errors.discord ? "invalid" : ""}`} value={data.discord} onChange={handle} placeholder="alex_123_" />
            {errors.discord && <small className="error">{errors.discord}</small>}
          </div>

          <div className="form-group">
            <label>LeetCode Username</label>
            <input name="leetcode" className={`form-input ${errors.leetcode ? "invalid" : ""}`} value={data.leetcode} onChange={handle} placeholder="alexleetcode" />
            {errors.leetcode && <small className="error">{errors.leetcode}</small>}
          </div>

          <div className="form-group">
            <label>GitHub Username</label>
            <input name="github" className={`form-input ${errors.github ? "invalid" : ""}`} value={data.github} onChange={handle} placeholder="alexgithub" />
            {errors.github && <small className="error">{errors.github}</small>}
          </div>

          <div className="form-group">
            <label>Skill Level</label>
            <select name="skill" className="form-select" value={data.skill} onChange={handle}>
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

      {/* PAYMENT SCREEN */}
      {showPayment && !paymentSuccess && (
        <div className="fade" style={{ marginTop: "2rem", textAlign: "center" }}>
          <h2>Complete Your Payment</h2>
          <p><strong>Amount:</strong> ₹{amount}</p>

          <img
            src={qrImage}
            alt="QR"
            style={{ width: "220px", height: "300px", borderRadius: "12px", margin: "1rem auto" }}
          />

          <input
            type="text"
            placeholder="Enter UPI Transaction ID"
            className="form-input"
            style={{ textAlign: "center" }}
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />

          <div className="form-actions">
            <button type="button" onClick={back} className="btn-secondary">← Back</button>
            <button type="button" className="btn-primary full" onClick={submitPayment}>
              Done ✔
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {paymentSuccess && (
        <div className="fade" style={{ textAlign: "center", marginTop: "2rem" }}>
          <SuccessAnimation />
          <h2 style={{ marginTop: "1rem" }}>Congratulations! 🎉</h2>
          <p style={{ opacity: 0.8 }}>You're successfully registered! We’ll verify your payment soon.</p>
        </div>
      )}
    </form>
  );
}

export default RegistrationForm;
