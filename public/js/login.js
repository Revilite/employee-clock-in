
getUser = async (e) => {
  e.preventDefault();
  const username = document.querySelector("#loginUsername").value;
  const password = document.querySelector("#loginPassword").value;

  const response = await fetch(`/api/users/login`,{
    method: "POST",
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type' : 'application/json'}
  });

  if (response.ok) {
      document.location.replace("/clockIn");
  }
  else {
    window.alert("Incorrect username or password");
  }
}


document.querySelector(".logInForm").addEventListener("submit", getUser);