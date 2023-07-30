const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Create an object to send as the request body
    const data = {
      username: username,
      password: password,
    };

    // Make a POST request to the server with the login data
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Login successful, redirect to the homepage or perform any other action
          window.location.href = "/"; // Replace "/" with the URL you want to redirect to after login
        } else {
          // Login failed, handle error message
          return response.json().then((data) => {
            errorMessage.textContent = data.error; // Display the error message to the user
            errorMessage.style.display = "block"; // Show the error message container
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });