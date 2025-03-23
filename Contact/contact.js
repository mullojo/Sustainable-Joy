setTimeout(() => {
    document.getElementById("flipCard").classList.add("flip");
}, 2000);

function flipCard() {
    document.getElementById("flipCard").classList.toggle("flip");
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const img = document.getElementById("photoPreview");
        img.src = reader.result;
        img.classList.remove("hidden");
    };
    reader.readAsDataURL(event.target.files[0]);
}

function addSocialHandle() {
    const container = document.getElementById("socialHandles");
    const socialMedia = document.getElementById("socialMedia").value;
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Enter ${socialMedia} Handle`;
    input.className = "w-full p-3 border rounded mb-2";
    container.appendChild(input);
}

function toggleOther() {
    const otherInput = document.getElementById("otherInterest");
    if (document.getElementById("interest").value === "Other") {
        otherInput.classList.remove("hidden");
    } else {
        otherInput.classList.add("hidden");
    }
}


//// Google Sheets Contact Form Integration ////
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect social handles into an array
    const socialHandles = [];
    document.querySelectorAll('#socialHandles input').forEach(input => {
        socialHandles.push({
            platform: document.getElementById('socialMedia').value,
            handle: input.value
        });
    });

    // Process image if present
    let photoBase64 = '';
    const photoPreview = document.getElementById('photoPreview');
    if (!photoPreview.classList.contains('hidden')) {
        photoBase64 = photoPreview.src; // This will be a data URL if set
    }

    const formData = {
        name: document.querySelector('input[placeholder="Name"]').value,
        email: document.querySelector('input[placeholder="Email"]').value,
        phone: document.querySelector('input[placeholder="Phone"]').value,
        socialHandles: socialHandles, // Now an array of platforms and handles
        address: document.querySelector('textarea[placeholder="Address or Location"]').value,
        interest: document.getElementById('interest').value,
        otherInterest: document.getElementById('otherInterest').value,
        joyMessage: document.querySelector('textarea[placeholder="What brings you Sustainable Joy?"]').value,
        comments: document.querySelector('textarea[placeholder="Your comments or special requests"]').value,
        photo: photoBase64,
        contactMethods: {
            email: document.getElementById('contactEmail').checked,
            text: document.getElementById('contactText').checked,
            socials: document.getElementById('contactSocials').checked
        }
    };

    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    fetch('https://script.google.com/macros/s/AKfycbyHo44dlfENOptBcDjzdtZACBn9tp-MQuXfivG_0_z0gCWUyyj-gTwtb2zARyQM2X0V/exec', {
        method: 'POST',
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(response => {
            submitBtn.textContent = "Success!";
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                // Optionally reset the form
                document.getElementById('contactForm').reset();
                document.getElementById('photoPreview').classList.add('hidden');
                document.getElementById('socialHandles').innerHTML = '';
            }, 2000);
        })
        .catch(error => {
            console.error("Error:", error);
            submitBtn.textContent = "Error - Try Again";
            submitBtn.disabled = false;
        });
});
