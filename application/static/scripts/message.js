document.addEventListener("DOMContentLoaded", () => {
    try {
        // Fetch the stored user object from localStorage
        const loggedInUser = localStorage.getItem("Logged_in_user");
        const user = loggedInUser ? JSON.parse(loggedInUser) : null;

        console.log("User from LocalStorage:", user); // Debugging line

        if (user && user.matric_number) {
            document.getElementById("matric").value = user.matric_number;  // Auto-fill the matric number
        } else {
            alert("Matric number not found! Please log in again.");
            window.location.href = "/login";  // Redirect to login page if not found
        }
    } catch (error) {
        console.error("Error loading matric number:", error);
        alert("An error occurred while loading matric number.");
        window.location.href = "/";  // Redirect to home page
    }
});

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
    complaintForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const room = document.getElementById("room").value.trim();
        const compliantType = document.getElementById("type").value.trim();
        const description = document.getElementById("description").value.trim();
        const matric = document.getElementById("matric").value.trim(); // Get the auto-filled matric number

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

            alert("Complaint submitted successfully!");
            window.location.reload(); // Refresh page after submission
        } catch (error) {
            console.error("Error saving complaint:", error);
            alert("An error occurred while sending the complaint. Please try again.");
        }
    });
} else {
    console.warn("Complaint form not found on the page.");
}
