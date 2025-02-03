const officeList = [
    {
        id: "1",
        name: "Sara Tancredi",
        department: "Head of Hostel Management",
        phone: "08120530257",
        image: "/static/img/admin1.jpg",
    },
    {
        id: "2",
        name: "Maricruz Fernando",
        department: "Maintenance Management",
        phone: "08120530257",
        image: "/static/img/admin2.jpg",
    },
    {
        id: "3",
        name: "Gretchen Morgan",
        department: "Complaint Resolution Officer",
        phone: "08120530257",
        image: "/static/img/admin4.jpg",
    },
];

function officeinit() {
    try {
        if (!localStorage.getItem("offices")) {
            localStorage.setItem("offices", JSON.stringify(officeList));
        }
    } catch (error) {
        console.error("Error initializing offices in local storage:", error);
    }
}

function getOffices() {
    try {
        const offices = localStorage.getItem("offices");
        return offices ? JSON.parse(offices) : [];
    } catch (error) {
        console.error("Error retrieving offices from localStorage:", error);
        return [];
    }
}

function createOfficeContainer(office) {
    const officeItem = document.createElement("div");
    officeItem.className = "admin-card";

    officeItem.innerHTML = `
        <img src="${office.image}" alt="${office.name}">
        <h4>${office.name}</h4>
        <p>${office.department}</p>
        <button class="btn btn-primary" data-office-id="${office.id}">Message Me</button>
    `;

    return officeItem;
}


function officeButtonListeners() {
    const buttons = document.querySelectorAll(".admin-card button");
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const officeId = event.target.getAttribute("data-office-id");
            messageMe(officeId);
        });
    });
}

function renderOffices() {
    const OfficeContainer = document.querySelector("#offices");
    if (!OfficeContainer) {
        console.error("Office container not found!");
        return;
    }

    OfficeContainer.innerHTML = ""; // Clears existing content

    const offices = getOffices();
    offices.forEach((office) => {
        const officeItem = createOfficeContainer(office);
        OfficeContainer.appendChild(officeItem);
    });

    officeButtonListeners();
}

function messageMe(officeId) {
    try {
        const offices = getOffices();
        const office = offices.find((o) => o.id === officeId);

        if (office) {
            const officeQuery = encodeURIComponent(JSON.stringify(office));
            window.location.href = `/message?office=${officeQuery}`;

        } else {
            console.error("Office not found:", officeId);
            alert("Office not found. Please try again.");
        }
    } catch (error) {
        console.error("Error sending message:", error);
        alert("An error occurred. Please try again.");
    }
}

// Initialize and render offices
officeinit();
renderOffices();
