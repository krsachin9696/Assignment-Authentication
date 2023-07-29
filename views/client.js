const inputname = document.getElementById('username');
const pass = document.getElementById('password');
const cf = document.getElementById('confirm-password');


document.getElementById('signup').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = inputname.value;
    const password = pass.value;
    const confirmpass = cf.value;

    if(!username || !password || !confirmpass){
        alert("Please fill the mandatory data");
        return;
    }
    if(password != confirmpass){
        alert("password & confirm password did not matcch !");
        return;
    }

    const form = event.target;
    const formData = new FormData(form);
  
    const userData = {
      username, 
      password,
      confirmpass,
    };

    
    form.reset();

  
    fetch("/signup", {       // The fetch function is a modern way to make network requests, 
        method: "POST",    // and in this case, it's used to send the todo object to the server.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    .then(function(response){
        if(response.status === 200){
            console.log("successfully registered");
            window.location.href="/login";
        }else if(response.status===401){
            alert("Email already exist");
            window.location.href="/signup";
        }else{
            alert("Something Went wrong");
        }
    });
  });
  