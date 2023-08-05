// Function to save user information
function saveUserInfo() {

  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var birthdate = document.getElementById("birthdate").value;
  var password = document.getElementById("password").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var gender = document.getElementById("gender").value;
  
  
  if (firstName === "" || lastName === "" || birthdate === "" || password === "" || phoneNumber === "" || gender === "") {
    alert("Please fill in all the fields.");
    return;
  }
  
 
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("birthdate", birthdate);
  localStorage.setItem("password", password);
  localStorage.setItem("phoneNumber", phoneNumber);
  localStorage.setItem("gender", gender);
  
  alert("User information saved.");
}
// Function to display user information
function displayUserProfile() {
  var userProfileDiv = document.getElementById("userProfile");
  
 
  var firstName = localStorage.getItem("firstName");
  var lastName = localStorage.getItem("lastName");
  var phoneNumber = localStorage.getItem("phoneNumber");
  var gender = localStorage.getItem("gender");
  
  var userProfileHTML = "<h2>Current User Information</h2>";
  userProfileHTML += "<p>First Name: " + firstName + "</p>";
  userProfileHTML += "<p>Last Name: " + lastName + "</p>";
  userProfileHTML += "<p>Phone Number: " + phoneNumber + "</p>";
  userProfileHTML += "<p>Gender: " + gender + "</p>";
  
  userProfileDiv.innerHTML = userProfileHTML;
}

displayUserProfile();