import React, { useState, useEffect } from "react";
import { EARLY_BIRD_END_DATE } from "../config/eventConfig";
import SuccessAnimation from "../components/SuccessAnimation";

function PaymentPage() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [isEarlyBird, setIsEarlyBird] = useState(true);
  const [amount, setAmount] = useState(149);

  useEffect(() => {
    const now = new Date();
    const early = now < EARLY_BIRD_END_DATE;
    setIsEarlyBird(early);
    setAmount(early ? 149 : 249);
  }, []);

  const openConfirm = () => setShowModal(true);
  const closeConfirm = () => setShowModal(false);

  const confirmPayment = async () => {
    if (!/^[A-Za-z0-9]{6,20}$/.test(transactionId.trim())) {
      alert("Please enter a valid UPI Transaction ID");
      return;
    }

    setShowModal(false);

    const payload = {
      ...JSON.parse(localStorage.getItem("registrationData")),
      transactionId,
    };

    try {
      // Send as application/x-www-form-urlencoded to avoid CORS preflight
      // Avoiding custom headers prevents the browser from sending an OPTIONS preflight
      // which many Apps Script web apps don't respond to with CORS headers.
      const formBody = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => {
        formBody.append(k, v == null ? "" : String(v));
      });

      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbzAribFfpDf9WhPTFAIRMI6B3oideI8yMIuPKfMR7U-Gs_075mt84qU7t2nzNQDHn6V/exec",
        {
          method: "POST",
          body: formBody,
        }
      );

      console.log("✅ Registration + Transaction saved (request sent):", payload);
      try {
        const text = await res.text();
        console.log("Response text:", text);
      } catch (e) {
        console.log("Response could not be read:", e);
      }
    } catch (err) {
      console.error("❌ Error saving data:", err);
    }

    setTimeout(() => setShowSuccess(true), 300);
  };

  const qrImage = isEarlyBird ? "/qr-early.jpeg" : "/qr-regular.jpeg";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "#0a0a0a",
        color: "white",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
          padding: "2rem",
          borderRadius: "20px",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {!showSuccess ? (
          <>
            <h2 style={{ marginBottom: "1rem" }}>Complete Your Payment</h2>
            <p style={{ fontSize: "1.1rem" }}>
              <strong>Amount:</strong> ₹{amount}
              {isEarlyBird && (
                <span style={{ color: "#00eaff", marginLeft: "5px" }}>
                  (Early Bird Applied)
                </span>
              )}
            </p>
            <img
              src={qrImage}
              alt="QR Code"
              style={{
                width: "220px",
                height: "300px",
                margin: "1.5rem auto",
                display: "block",
                borderRadius: "12px",
              }}
            />
            <input
              type="text"
              placeholder="Enter your UPI Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.08)",
                color: "white",
                marginBottom: "1.2rem",
                textAlign: "center",
              }}
            />
            <button
              onClick={openConfirm}
              style={{
                padding: "12px 20px",
                background: "linear-gradient(135deg,#a855f7,#06b6d4)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Done
            </button>
          </>
        ) : (
          <div>
            <SuccessAnimation />
            <h2 style={{ marginTop: "1rem" }}>Congratulations! 🎉</h2>
            <p style={{ opacity: 0.8, marginTop: "0.6rem" }}>
              You're successfully registered! We’ll verify your payment soon.
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(5px)",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "1.5rem",
              borderRadius: "16px",
              textAlign: "center",
              width: "300px",
              color: "white",
            }}
          >
            <h3>Are you sure you paid?</h3>
            <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
              <button
                onClick={confirmPayment}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#10b981",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "600",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={closeConfirm}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#ef4444",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "600",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
