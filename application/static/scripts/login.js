const myForm = document.getElementById("loginForm");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  let matric_err = document.getElementById("username_err");
  let password_err = document.getElementById("password_err");

  let matric_number = document.getElementById("matric_number").value.trim();
  let password = document.getElementById("password").value.trim();

  // Retrieve stored user data from localStorage
  let storedData = localStorage.getItem("info");
  let users = storedData ? JSON.parse(storedData) : [];

  console.log("Stored users:", users); // Debugging
  console.log("Entered Matric Number:", matric_number);

  // Check if matric number exists in the stored users
  let user = users.find(user => user.matric_number === matric_number);

  if (!matric_number) {
    matric_err.textContent = "Please enter your matric number";
    isValid = false;
  } else if (!user) {
    matric_err.textContent = "Matric number not found";
    isValid = false;
  } else {
    matric_err.textContent = "";
  }

  if (!password) {
    password_err.textContent = "Please enter a password";
    isValid = false;
  } else if (user && user.password !== password) {
    password_err.textContent = "Incorrect password";
    isValid = false;
  } else {
    password_err.textContent = "";
  }

  if (isValid) {
    localStorage.setItem("Logged_in_user", matric_number); // Store matric number in localStorage
    window.location.href = "/home"; // Redirect to home page on successful login
  }
});
