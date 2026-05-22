const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async function (e) {

  e.preventDefault();

  const bookingData = {

    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    photographyPackage: document.getElementById("photographyPackage").value,
    preferredDate: document.getElementById("preferredDate").value,
    preferredTime: document.getElementById("preferredTime").value,
    location: document.getElementById("location").value,
    numberOfPeople: document.getElementById("numberOfPeople").value,
    notes: document.getElementById("notes").value

  };

  try {

    const response = await fetch("YOUR_RENDER_BACKEND_LINK/api/bookings", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(bookingData)

    });

    const result = await response.json();

    alert(result.message);

    bookingForm.reset();

  } catch (error) {

    alert("Booking failed.");
    console.log(error);

  }

});
