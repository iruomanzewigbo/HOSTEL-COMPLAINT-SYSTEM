document.addEventListener("DOMContentLoaded", () => {
    try {
        const matricNumber = localStorage.getItem("Logged_in_user");  // Fetch the matric number from localStorage
        console.log("Matric Number from LocalStorage:", matricNumber); // Debugging line

        if (matricNumber) {
            document.getElementById("matric").value = matricNumber;  // Auto-fill the matric number
        } else {
            alert("Matric number not found! Please log in again.");
            window.location.href = "/login";  // Redirect to login page if not found
        }
    } catch (error) {
        alert("An error occurred while loading matric number.");
        window.location.href = "/";  // Redirect to home page
    }
});



const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
    complaintForm.addEventListener("submit", (event) => {  // Use "submit" instead of "click"
        event.preventDefault();

        const room = document.getElementById("room").value.trim();
        const compliantType = document.getElementById("type").value.trim();
        const description = document.getElementById("description").value.trim();
        const matric = document.getElementById("matric").value.trim();  // Get the matric number

        if (!room || !compliantType || !description || !matric) {
            alert("Please fill all fields before sending!");
            return;
        }

        try {
            let complaints = localStorage.getItem("complaints");
            complaints = complaints ? JSON.parse(complaints) : [];

            const officeData = sessionStorage.getItem("selectedOffice");
            const office = officeData ? JSON.parse(officeData) : {};

            const newComplaint = {
                matric: matric,  // Store matric number in the complaint
                room: room,
                compliantType: compliantType,
                description: description,
                officeName: office.name || "Unknown Office",
                officePhone: office.phone || "No Phone Available",
            };

            complaints.push(newComplaint);
            localStorage.setItem("complaints", JSON.stringify(complaints));
        } catch (error) {
            console.error("Error saving message:", error);
            alert("An error occurred while sending the message. Please try again.");
        }
    });
} else {
    console.warn("Send button not found on the page.");
}
