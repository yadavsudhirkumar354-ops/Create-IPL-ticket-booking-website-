document.addEventListener("DOMContentLoaded", function() {

    const bookButtons = document.querySelectorAll(".bookticket");
    const bookingForm = document.getElementById("bookingForm");
    const toast = document.getElementById("toast");
    const bookingTable = document.querySelector("#my-bookings tbody");


    bookButtons.forEach(function(button) {

        button.addEventListener("click", function(event) {

            event.preventDefault();

            document.getElementById("booking").scrollIntoView({
                behavior: "smooth"
            });

            showToast("Booking section opened!");

        });

    });


    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const match = bookingForm.elements["match"].value;
        const stand = bookingForm.elements["stand"].value;
        const tickets = bookingForm.elements["tickets"].value;

        let ticketPrice;

        if (stand === "General") {
            ticketPrice = 1200;
        }
        else if (stand === "Premium") {
            ticketPrice = 2500;
        }
        else {
            ticketPrice = 5000;
        }

        const totalAmount = ticketPrice * tickets;

        const bookingId = "IPL" + Math.floor(Math.random() * 9000 + 1000);

        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${bookingId}</td>
            <td>${match}</td>
            <td>${stand}</td>
            <td>${tickets}</td>
            <td>${totalAmount}</td>
        `;

        bookingTable.appendChild(newRow);

        showToast("Your ticket has been booked successfully!");

        bookingForm.reset();

        document.getElementById("my-bookings").scrollIntoView({
            behavior: "smooth"
        });

    });


    function showToast(message) {

        toast.textContent = message;

        toast.style.display = "block";

        setTimeout(function() {

            toast.style.display = "none";

        }, 2000);

    }


   
});
