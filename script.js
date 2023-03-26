// Check if user is logged in
window.onload = function() {
  if (!localStorage.getItem("loggedIn") || !localStorage.getItem("username")) {
    // User is not logged in, redirect to login/signup page
    window.location.href = "login.html";
  }
}


// Get the chat window element
const chatWindow = document.getElementById('chat-window');

// Get the send button element
const sendButton = document.getElementById('send-button');

// Get the input element
const input = document.getElementById('input');

function getUserName()
{
  var user = localStorage.getItem('username');
  console.log(localStorage);
  console.log(user);
  if(!user)
  {
    window.location.href = "login.html";
  }
  return user;
}

// Get the username
const userName = getUserName()
const apiUrl = "https://20.193.139.27:8443/api/v1/session/";
async function getChatSessionId(){
 
  //var url = "https://20.193.139.27:8443/api/v1/session/" + userName;
  var url = apiUrl + userName;
  console.log("Getting session id from " + url);
  var sessionId;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "*/*"
      }
    });
    const data = await response.text();
    sessionId = data; // Store the response in a variable
    console.log("session id is : " + data ); // Log the response to the console (optional)
    console.log(sessionId);
    return sessionId;
  } catch(error) {
    console.log("There is an error in getting chat session id");
    console.error(error); // Log any errors to the console (optional)
  }
}

// Get the chat session id
getChatSessionId().then(sessionId => {
  chatSessionId = sessionId;
  console.log("chat session id received is : " + sessionId);
});



// Get the chat session id
var chatSessionId = getChatSessionId();
console.log("chat session id reeived is : " + chatSessionId);



function addChatBubble(text, isUser) {
    // Create a new chat bubble element
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble');
    
    // Create a new text element for the chat bubble content
    const bubbleText = document.createElement('div');
    bubbleText.classList.add('chat-bubble-text');
    bubbleText.textContent = text;
    
    // Add the text element to the chat bubble element
    bubble.appendChild(bubbleText);
    
    // Add the appropriate class to the chat bubble element
    if (isUser) {
      bubble.classList.add('user-bubble');
    } else {
      bubble.classList.add('chatbot-bubble');
    }
    
    // Add the chat bubble to the chat window
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.appendChild(bubble);
  }
  
function sendMessageToDatabase(text)
{
  //const sessionId = "24815b58-8a8c-4225-999d-096678620187"; 
  //const url = `https://20.193.139.27:8443/api/v1/session/${chatSessionId}/message`;
  const url = apiUrl + chatSessionId + "/message";
  console.log("messagin to database via " + url);
  console.log("User sent " + text);
  fetch(url, {
    method: "POST",
    headers: {
      "Accept": "*/*",
      "Content-Type": "text/plain"
    },
    body: text
  })
  .then(response => {
    // Handle the response here
    console.log(response);
  })
  .catch(error => {
    // Handle errors here
    console.log(error);
  });

}
// Event listener for send button click
sendButton.addEventListener('click', () => {

   
   console.log("Clicked");
  // Get the input text
  const text = input.value.trim();
  
    // If the input is not empty
  if (text) {
    // Add a new chat bubble for the user's message
    addChatBubble(text, true);
    
    // Clear the input
    input.value = '';

    // Send the message to the database and wait for its reply
    sendMessageToDatabase(text);
  }

  // Chatbot's reply
  addChatBubble("Hey your session id is : " + chatSessionId, false);
  addChatBubble("Hello from chatbot! How can i help?", false);
});


const logoutBtn = document.getElementById('logoutBtn');

// handle logout button click
logoutBtn.addEventListener('click', () => {
  // localStorage.clear();
  // window.location.href = './login.html';
  logout();
});

 // Logout function
 function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
