
function validateForm() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (username === '' || email === '' || password === '') {
        errorMessage.textContent = 'Please fill out all fields.';
        return false; 
    }

    errorMessage.textContent = '';
    setTimeout(() => {
        window.location.href = 'trasport.html'; 
    }, 500); 
    return false;
}


const firebaseConfig = {
    apiKey: "AIzaSyAzYfe2zlSyfzY9KKtMmnlUvUQEmoZXlCo",
    authDomain: "chatbot-78193.firebaseapp.com",
    databaseURL: "https://chatbot-78193-default-rtdb.firebaseio.com",
    projectId: "chatbot-78193",
    storageBucket: "chatbot-78193.appspot.com",
    messagingSenderId: "48801969271",
    appId: "1:48801969271:web:81d320b4b43b9468a0c272",
    measurementId: "G-ZQY8BNM23T"
  };

  //#######################################################

  firebase.initializeApp(firebaseConfig);
  var chatbotDB=firebase.database().ref('chatbot');
  
  document.getElementById('chatbot').addEventListener('submit',submitForm);
  function submitForm(e) 
  {
    e.preventDefault();
    var username = getElementVal("username");
    var email = getElementVal("email");
    var password = getElementVal("password");
    console.log(username,email,password)
    saveMessages(username,email,password);
  }

  const saveMessages = (username,email,password) => {
    var newchatbot = chatbotDB.push();
  
    newchatbot.set({
        username: username,
        email:email,
        password: password
    });
  };
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  }; 
  









  
