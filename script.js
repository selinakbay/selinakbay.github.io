document.addEventListener("DOMContentLoaded", function () {
    const mockApiUrl = "https://run.mocky.io/v3/4c4484d2-3ec1-4e44-98c5-34e95fa2713f";

const companySelect = document.querySelector("#company");
const subjectSelect = document.querySelector("#subject");
const areaCodeSelect = document.querySelector("#areaCode");
const form = document.querySelector("#registrationForm");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");

const areaCodes = [
    "212", "216", "312", "232", "224", "262", "266", "282", "286", "342", "352",
    "362", "372", "382", "388", "412", "422", "432", "442", "452", "462", "472",
    "482", "488", "506", "507", "508", "530", "531", "532", "533", "534", "535",
    "536", "537", "538", "539", "540", "541", "542", "543", "544", "545", "546",
    "547", "548", "549", "551", "552", "553", "554", "555", "556", "557", "558",
    "559", "561", "562", "563", "564", "565", "566", "567", "568", "569"
];

areaCodes.forEach((code) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `+90 ${code}`;
    areaCodeSelect.appendChild(option);
});


    fetch(mockApiUrl)
        .then((response) => response.json())
        .then((data) => {

            data.companies.forEach((company) => {
                const option = document.createElement("option");
                option.value = company;
                option.textContent = company;
                companySelect.appendChild(option);
            });

            data.subjects.forEach((subject) => {
                const option = document.createElement("option");
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching data from mock API:", error);
        });

    // Form validation and submission
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form from submitting to server

        const emailValue = emailInput.value.trim();
        const phoneValue = phoneInput.value.trim();

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\d{7}$/;

        let isValid = true;

        // Validate email
        if (!emailValue) {
            emailInput.setCustomValidity("Please fill out this field.");
            emailInput.reportValidity();
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            emailInput.setCustomValidity("Please enter a valid email address.");
            emailInput.reportValidity();
            isValid = false;
        } else {
            emailInput.setCustomValidity(""); // Clear custom validity if correct
        }

        // Validate phone number
        if (!phoneValue) {
            phoneInput.setCustomValidity("Please fill out this field.");
            phoneInput.reportValidity();
            isValid = false;
        } else if (!phoneRegex.test(phoneValue)) {
            phoneInput.setCustomValidity("Please enter a valid phone number.");
            phoneInput.reportValidity();
            isValid = false;
        } else {
            phoneInput.setCustomValidity(""); // Clear custom validity if correct
        }

        // If form is valid, redirect to the next page
        if (isValid) {
            console.log("Form is valid, redirecting...");
            window.location.href = "submitted.html";
        }
    });

    // Real-time validation for phone input
    phoneInput.addEventListener("input", function () {
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^\d{7}$/;

        if (!phoneValue) {
            phoneInput.setCustomValidity("Please fill out this field.");
        } else if (!phoneRegex.test(phoneValue)) {
            phoneInput.setCustomValidity("Please enter a valid phone number.");
        } else {
            phoneInput.setCustomValidity("");
        }
    });

    // Real-time validation for email input
    emailInput.addEventListener("input", function () {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailValue) {
            emailInput.setCustomValidity("Please fill out this field.");
        } else if (!emailRegex.test(emailValue)) {
            emailInput.setCustomValidity("Please enter a valid email address.");
        } else {
            emailInput.setCustomValidity("");
        }
    });

    // Function to close ads (not related to form, but included for completeness)
    function closeAd(ad) {
        ad.style.display = "none";
    }

    // Close sticky ads
    const stickyAds = document.querySelectorAll(".sticky-ad");
    stickyAds.forEach((stickyAd) => {
        const closeButton = stickyAd.querySelector(".close-ad");
        if (closeButton) {
            closeButton.addEventListener("click", function () {
                closeAd(stickyAd);
            });
        }
    });

});
