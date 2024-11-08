
document.getElementById("login-form").addEventListener("submit", validateLogin);

function validateLogin(event) {
  event.preventDefault(); 

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");

  const correctUsername = "user";
  const correctPassword = "password123";

  
  console.log("Entered Username: ", username);
  console.log("Entered Password: ", password);

  
  if (username === correctUsername && password === correctPassword) {
    console.log("Login successful!"); 
    window.location.href = "currency.html"; 
  } else {
    console.log("Invalid credentials!"); 
    errorMsg.textContent = "Invalid username or password.";
  }
}
