const myForm = document.getElementById("registerForm");

// Regex patterns
const matricNumberRegex = /^[A-Za-z0-9]+$/;  // Alphanumeric matric number
const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{8,16}$/;

// Retrieve existing users
let storedUsers = localStorage.getItem("info");
let users = storedUsers ? JSON.parse(storedUsers) : [];

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Form Fields
    let matric_number = document.getElementById("matric_number").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirm_password = document.getElementById("confirmPassword").value.trim();

    // Error Fields
    let matricNumber_err = document.getElementById("username_err");
    let email_err = document.getElementById("email_err");
    let password_err = document.getElementById("password_err");
    let confirm_password_err = document.getElementById("confirm_password_err");

    // Matric Number Validation
    if (!matric_number) {
        matricNumber_err.textContent = "Please enter a matric number";
        isValid = false;
    } else if (!matricNumberRegex.test(matric_number)) {
        matricNumber_err.textContent = "Please enter a valid matric number";
        isValid = false;
    } else if (users.some(user => user.matric_number === matric_number)) {
        matricNumber_err.textContent = "Matric number already registered!";
        isValid = false;
    } else {
        matricNumber_err.textContent = "";
    }

    // Email Validation
    if (!email) {
        email_err.textContent = "Please enter an email address";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        email_err.textContent = "Please enter a valid email address";
        isValid = false;
    } else {
        email_err.textContent = "";
    }

    // Password Validation
    if (!password) {
        password_err.textContent = "Please enter a password";
        isValid = false;
    } else if (!passRegex.test(password)) {
        password_err.textContent = "Password must be 8-16 characters with a number, uppercase, lowercase, and special character";
        isValid = false;
    } else {
        password_err.textContent = "";
    }

    // Confirm Password Validation
    if (!confirm_password) {
        confirm_password_err.textContent = "Please confirm your password";
        isValid = false;
    } else if (password !== confirm_password) {
        confirm_password_err.textContent = "Passwords don't match";
        isValid = false;
    } else {
        confirm_password_err.textContent = "";
    }

    if (!isValid) return; // Stop registration if any validation fails

    // Save New User
    users.push({ matric_number, email, password });
    localStorage.setItem("info", JSON.stringify(users));

    alert("Registration successful! Please log in.");
    window.location.href = "index.html"; // Redirect to login page
});

// Password Visibility Toggle
const togglePasswordVisibility = (eyeIconId, passwordFieldId) => {
    let eyeIcon = document.getElementById(eyeIconId);
    let passwordField = document.getElementById(passwordFieldId);

    eyeIcon.addEventListener("click", function () {
        if (passwordField.type === "password") {
            passwordField.type = "text";
        } else {
            passwordField.type = "password";
        }
        eyeIcon.classList.toggle("fa-eye-slash");
        eyeIcon.classList.toggle("fa-eye");
    });
};

// Apply to both password fields
togglePasswordVisibility("eyeicon", "password");
togglePasswordVisibility("eyeicon2", "confirmPassword");

