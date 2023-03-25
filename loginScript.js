// script.js


 
  const loginForm = document.getElementById('loginForm');
  const signUpForm = document.getElementById('signUpForm');
  
  const loggedInSection = document.getElementById('loggedInSection');
  const loggedOutSection = document.getElementById('loggedOutSection');

  const signUpUrl = "https://hackathon-chatgpt20230322210656.azurewebsites.net/api/Identity/signup/";
  
  // check if user is logged in
  // if (localStorage.getItem('loggedIn') === 'true') {
  //   loggedInSection.style.display = 'block';
  //   loggedOutSection.style.display = 'none';
  // } else {
  //   loggedInSection.style.display = 'none';
  //   loggedOutSection.style.display = 'block';
  // }
  
  // handle login form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();    
    // handle authentication

      
    const userName = e.target.username.value;
    const password = e.target.password.value;
   
    var noError = true;
    const url = `https://hackathon-chatgpt20230322210656.azurewebsites.net/api/Identity/login?userName=${userName}&password=${password}`;

    fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'text/plain'
        },
        body: ''
      })
        .then(response => response.text())
        .then(response => {
          
          return response.json();
        
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          noError = false;
          console.log('error', error)
        });
      
      
      if(noError)
      {
        alert("You have successfully logged in " + userName);
        localStorage.setItem('username', userName);
        localStorage.setItem('loggedIn', 'true');
      }       
        
        
      window.location.href = 'index.html';
  
  });
  
  // handle sign up form submission
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    
    const userName = e.target.username.value;
    const password = e.target.password.value;
    

const url = 'https://hackathon-chatgpt20230322210656.azurewebsites.net/api/Identity/signup';

const params = new URLSearchParams();
params.append('userName', encodeURIComponent(userName));
params.append('password', encodeURIComponent(password));

fetch(url + '?' + params.toString(), {
  method: 'POST',
  headers: {
    'Accept': 'text/plain'
  },
  body: ''
})
  .then(response => response.text())
  .then(response => {
    alert("You have successfully signed in");
    localStorage.setItem('username', userName);
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'index.html';
    return response.json();
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

    
    
    
  });



  
  