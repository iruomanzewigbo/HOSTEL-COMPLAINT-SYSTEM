document.addEventListener("DOMContentLoaded", () => {
    try {
        const officeData = sessionStorage.getItem("selectedOffice"); // Correct key
        const office = officeData ? JSON.parse(officeData) : null;
    } catch (error) {
        alert("An error occurred while loading office.");
        window.location.href = "/";
    }
});


const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {
    complaintForm.addEventListener("submit", (event) => {  // Use "submit" instead of "click"
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const room = document.getElementById("room").value.trim();
        const compliantType = document.getElementById("type").value.trim();
        const description = document.getElementById("description").value.trim();

        if (!name || !room || !compliantType || !description) {
            alert("Please fill all fields before sending!");
            return;
        } 
        try {
            let complaints = localStorage.getItem("complaints");
            complaints = complaints ? JSON.parse(complaints) : [];  // Corrected line

            const officeData = sessionStorage.getItem("selectedOffice");
            const office = officeData ? JSON.parse(officeData) : {};

            const newComplaint = {
                name: name,
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
