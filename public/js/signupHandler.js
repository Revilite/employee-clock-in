


getUser = async (e) => {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const response = await fetch(`/api/users/login`,{
    method: "POST",
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type' : 'application/json'}
  });

  if (response.ok) {
    
  }
  else {
    window.alert("Incorrect username or password");
  }
}


document.querySelector(".signInForm").addEventListener("submit", getUser);