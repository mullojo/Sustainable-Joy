import qr from "https://esm.sh/qr-code-styling@1.9";

// Muun address - Jo - for S. Joy
let address = "bc1qa8mhlktyh7wckuvcdam3msaqsmarh7wjehnwuuar4pxeqvnx46nqna23xg";

let lime300 = '#bef264';

// btc icon data from https://icon-sets.iconify.design/bxl/bitcoin/

let btcLogoLime300 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23bef264' d='m11.953 8.819l-.547 2.19c.619.154 2.529.784 2.838-.456c.322-1.291-1.673-1.579-2.291-1.734m-.822 3.296l-.603 2.415c.743.185 3.037.921 3.376-.441c.355-1.422-2.029-1.789-2.773-1.974'/%3E%3Cpath fill='%23bef264' d='M14.421 2.299C9.064.964 3.641 4.224 2.306 9.581C.97 14.936 4.23 20.361 9.583 21.697c5.357 1.335 10.783-1.924 12.117-7.281c1.336-5.356-1.924-10.781-7.279-12.117m1.991 8.275c-.145.974-.686 1.445-1.402 1.611c.985.512 1.485 1.298 1.009 2.661c-.592 1.691-1.998 1.834-3.87 1.48l-.454 1.82l-1.096-.273l.447-1.794a45 45 0 0 1-.875-.228l-.449 1.804l-1.095-.275l.454-1.823c-.257-.066-.517-.136-.782-.202L6.87 15l.546-1.256s.808.215.797.199c.311.077.448-.125.502-.261l.719-2.875l.115.029a1 1 0 0 0-.114-.037l.512-2.053c.013-.234-.066-.528-.511-.639c.018-.011-.797-.198-.797-.198l.291-1.172l1.514.378l-.001.005q.341.085.7.165l.449-1.802l1.097.273l-.44 1.766c.294.067.591.135.879.207l.438-1.755l1.097.273l-.449 1.802c1.384.479 2.396 1.195 2.198 2.525'/%3E%3C/svg%3E"


let options = {
  width: 222,
  height: 222,
  type: "svg",
  data: address,
  image: btcLogoLime300,
  dotsOptions: { color: lime300, type: "dots" }, // rose-600
  cornersSquareOptions: { type: "dot" },
  cornersDotOptions: { type: "dot" },
  backgroundOptions: { color: null },
  imageOptions: { crossOrigin: "anonymous", margin: 0 }
};

const qrCodeElem = document.getElementById("qr-code");
if (qrCodeElem) {
  const qrCode = new qr(options);
  qrCode.append(qrCodeElem);
}

const addressElem = document.getElementById("address");
if (addressElem) {
  addressElem.innerHTML = truncateAddress(address);
}

const copyBtn = document.getElementById("copy-btn");
if (copyBtn) {
  copyBtn.addEventListener("click", copyAddress);
}

function copyAddress() {
  if (!navigator.clipboard) return;
  copyBtn.disabled = true;

  navigator.clipboard
    .writeText(address)
    .then(() => {
      if (addressElem) {
        addressElem.innerHTML = "Address Copied 💚";
        setTimeout(() => {
          addressElem.textContent = truncateAddress(address);
          copyBtn.disabled = false;
        }, 2222);
      }
    })
    .catch((err) => {
      console.error("Clipboard write failed:", err);
      copyBtn.disabled = false;
    });
}

function truncateAddress(address) {
  const screenWidth = window.innerWidth;

  if (screenWidth < 500) {
    // Phones
    return address.slice(0, 6) + "..." + address.slice(-6);
  } else if (screenWidth >= 500 && screenWidth < 1024) {
    // Tablets
    return address.slice(0, 18) + "..." + address.slice(-12);
  } else {
    // Desktops
    return address; // Full address
  }
}


function updateAddress() {
  if (addressElem) addressElem.textContent = truncateAddress(address);
}

window.addEventListener("resize", updateAddress);
window.addEventListener("load", updateAddress);


////////////// Email Sign Up Functionality ////////////

document.getElementById("emailForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("email-address");
    const email = emailInput.value.trim();

    // Basic validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Google Apps Script endpoint (replace with your actual URL)
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPKcxd8-ZfgmYrdyKuVab7vFzjiua5-ODqPocrKypZvp3VN3ZaaOvb4MO_3YKaygI8/exec";
   
   
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Prevents CORS issues
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Simple success message (no-cors prevents checking response status)
      alert("Thanks for signing up! Your email has been saved.");
      emailInput.value = ""; // Clear input field
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      console.error("Error:", error);
    }
   
   
   
  });