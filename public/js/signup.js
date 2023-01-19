

const signup = async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const username = document.querySelector("#username").value;
  const userCode = document.querySelector("#pin").value;
  const fullName = document.querySelector("#fullName").value;

  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
      userCode,
      fullName
    }),
    headers: { 'Content-Type' : 'application/json'}
  });

  if (response.ok) {
    document.location.replace("/clockIn");
  }
  else {
    window.alert("Something went wrong");
  }
}

document.querySelector("#signUpForm").addEventListener("submit", signup);