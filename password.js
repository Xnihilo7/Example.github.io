  //password.html js
  
  // Store the default password, currently: 'pswrd'
  var defaultPassword = "pswrd";

  //Verify the password
  function verifyPassword() {
    var enteredPassword = document.getElementById("password").value;
    
    if (enteredPassword === defaultPassword) {
      window.location.href = "dashboard.html";
    } else {
      alert("Incorrect password. Please try again.");
    }
  }