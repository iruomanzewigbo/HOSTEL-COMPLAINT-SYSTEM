const myForm = document.getElementById("loginForm");

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Input Fields
    let matric_number = document.getElementById("matric_number").value.trim();
    let password = document.getElementById("password").value.trim();

    // Error Messages
    let matric_err = document.getElementById("username_err");
    let password_err = document.getElementById("password_err");

    // Retrieve stored users from localStorage
    let storedData = localStorage.getItem("info");
    let users = storedData ? JSON.parse(storedData) : [];

    console.log("Stored users:", users); // Debugging
    console.log("Entered Matric Number:", matric_number);

    // Find user by matric number
    let user = users.find(user => user.matric_number === matric_number);

    // Matric Number Validation
    if (!matric_number) {
        matric_err.textContent = "Please enter your matric number";
        isValid = false;
    } else if (!user) {
        matric_err.textContent = "Matric number not found";
        isValid = false;
    } else {
        matric_err.textContent = "";
    }

    // Password Validation
    if (!password) {
        password_err.textContent = "Please enter a password";
        isValid = false;
    } else if (user && user.password !== password) {
        password_err.textContent = "Incorrect password";
        isValid = false;
    } else {
        password_err.textContent = "";
    }

    // If valid, log in user
    if (isValid) {
        localStorage.setItem("Logged_in_user", JSON.stringify(user)); // Store user data
        // alert("Login successful!");
        window.location.href = "/home"; // Redirect to home page
    }
});
