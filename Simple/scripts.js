
///// Email Form Submit /////

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email-address");
  const submitButton = document.getElementById("submit-button");
  const formMessage = document.getElementById("form-message");

  // Email validation function
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Live validation: change input background & enable/disable button
  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    const valid = isValidEmail(email);

    emailInput.classList.toggle("bg-emerald-200", valid);
    emailInput.classList.toggle("bg-white", !valid);
    submitButton.disabled = !valid;
  });

  document.getElementById("emailForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    if (!isValidEmail(email)) return; // Extra check for safety

    // Disable button while submitting & show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    submitButton.classList.add("opacity-50", "cursor-not-allowed");

    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwPKcxd8-ZfgmYrdyKuVab7vFzjiua5-ODqPocrKypZvp3VN3ZaaOvb4MO_3YKaygI8/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // Show success message
      formMessage.textContent = "🎉 Thanks for signing up!";
      formMessage.classList.replace("opacity-0", "opacity-100");

      emailInput.value = ""; // Clear input
      emailInput.classList.replace("bg-emerald-200", "bg-white"); // Reset input background
      submitButton.disabled = true; // Re-disable button since input is now empty
    } catch (error) {
      formMessage.textContent = "❌ Something went wrong. Try again later.";
      formMessage.classList.replace("opacity-0", "opacity-100");
      console.error("Error:", error);
    }

    // Reset button state after a short delay
    setTimeout(() => {
      submitButton.textContent = "Join Us";
      submitButton.classList.remove("opacity-50", "cursor-not-allowed");
    }, 2000);
  });
});


///// Every.org Giving Button /////

function createWidget() {
  everyDotOrgDonateButton.createWidget({
    selector: "#every-donate-btn",
    nonprofitSlug: "sustainable-joy",
    noExit: true,
    completeDonationInNewTab: false
  });
}
if (window.everyDotOrgDonateButton) {
  createWidget();
} else {
  document.getElementById("every-donate-btn-js").onload = createWidget;
}
