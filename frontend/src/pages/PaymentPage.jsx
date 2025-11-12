import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SuccessAnimation from "../components/SuccessAnimation";

function PaymentPage() {
  const [params] = useSearchParams();
  const amount = params.get("amount");
  const code = params.get("code");

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const openConfirm = () => setShowModal(true);
  const closeConfirm = () => setShowModal(false);

  const confirmPayment = async () => {
  setShowModal(false);

  try {
    await fetch("https://script.google.com/macros/s/AKfycbxMz5WSrYOnT4Z2P5dhBUebIj7C4qRZYb_j_VtbSaeYzDQOqmJunO4UbvqogcNHrDho-w/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updatePayment",
        code: code,
      }),
    });

    console.log("✅ Payment status updated for code:", code);
  } catch (err) {
    console.error("❌ Error updating payment status:", err);
  }

  // Show success animation after update
  setTimeout(() => setShowSuccess(true), 300);
};


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
        position: "relative",
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
          boxShadow: "0 0 40px rgba(0,0,0,0.3)",
        }}
      >
        {!showSuccess ? (
          <>
            <h2 style={{ marginBottom: "1rem" }}>Complete Your Payment</h2>

            <p style={{ fontSize: "1.1rem" }}>
              <strong>Amount:</strong> ₹{amount}
            </p>

            <p style={{ marginTop: "0.6rem" }}>
              <strong>Your Unique Code:</strong>
              <span
                style={{
                  color: "#00eaff",
                  marginLeft: "8px",
                  fontSize: "1.4rem",
                }}
              >
                {code}
              </span>
            </p>

            <p style={{ opacity: 0.8, fontSize: "0.95rem" }}>
              Add this code in the UPI description.
            </p>

            <img
              src="/qr.png"
              alt="QR Code"
              style={{
                width: "220px",
                height: "220px",
                margin: "1.5rem auto",
                display: "block",
                borderRadius: "12px",
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
              You're successfully registered!  
              We'll reach out to you soon.
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left:0,
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
