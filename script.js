function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Show popup
document.getElementById("contact-link").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("contact-popup").style.display = "block";
});

// Close popup
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("contact-popup").style.display = "none";
});

// Close if clicked outside popup content
window.addEventListener("click", function (event) {
  const popup = document.getElementById("contact-popup");
  if (event.target == popup) {
    popup.style.display = "none";
  }
});

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.style.color = "green";
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.style.color = "redorange";
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            result.style.color = "red";
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});