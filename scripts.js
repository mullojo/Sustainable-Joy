document
  .getElementById("emailForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email-address");
    const email = emailInput.value.trim();

    // Basic validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Google Apps Script endpoint (replace with your actual URL)
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwPKcxd8-ZfgmYrdyKuVab7vFzjiua5-ODqPocrKypZvp3VN3ZaaOvb4MO_3YKaygI8/exec";

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Prevents CORS issues
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      // Simple success message (no-cors prevents checking response status)
      alert("Thanks for signing up! Your email has been saved.");
      emailInput.value = ""; // Clear input field
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      console.error("Error:", error);
    }
  });

//// Every.org Giving Button /////

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
