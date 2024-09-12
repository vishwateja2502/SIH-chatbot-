const chatBox = document.getElementById('chat-box');
let editingMessage = null;

// Function to send a message
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const messageText = userInput.value.trim();
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (messageText === '' && !file) return;

    if (editingMessage) {
        editingMessage.querySelector('.message-text').textContent = messageText;
        if (file) {
            const img = editingMessage.querySelector('img');
            if (img) img.src = URL.createObjectURL(file);
        }
        editingMessage = null;
        userInput.value = '';
        fileInput.value = '';
        return;
    }

    // Create message div
    const messageDiv = document.createElement('div');
    messageDiv.className = `message user-message`;
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    if (file) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        messageContent.appendChild(img);
    }
    if (messageText) {
        const text = document.createElement('span');
        text.className = 'message-text';
        text.textContent = messageText;
        messageContent.appendChild(text);
    }

    messageDiv.appendChild(messageContent);
    messageDiv.innerHTML += `
        <button class="edit-btn" onclick="editMessage(this)">✏️</button>
        <button class="delete-btn" onclick="deleteMessage(this)">🗑️</button>
    `;

    chatBox.appendChild(messageDiv);

    // Clear input fields
    userInput.value = '';
    fileInput.value = '';

    // Simulate bot response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = `<span class="message-text">${getBotResponse(messageText)}</span>`;
        chatBox.appendChild(botMessage);

        // Scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

// Function to handle message editing
function editMessage(button) {
    const messageDiv = button.closest('.message');
    const messageText = messageDiv.querySelector('.message-text')?.textContent || '';
    document.getElementById('user-input').value = messageText;
    editingMessage = messageDiv;
}

// Function to handle message deletion
function deleteMessage(button) {
    const messageDiv = button.closest('.message');
    messageDiv.remove();
}

// Function to get a bot response
function getBotResponse(userMessage) {
    const responses = {
        'hello': 'Hi there! How can I assist you today?',
        'how are you': 'I’m just a bot, but I’m here to help you!',
        'bye': 'Goodbye! Have a fantastic day!',
    };
    return responses[userMessage.toLowerCase()] || "Sorry, I didn’t understand that.";
}

// Function to send the initial bot message
function sendInitialMessage() {
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.innerHTML = `<span class="message-text">Hey there! How can I help you?</span>`;
    chatBox.appendChild(botMessage);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Call the function to send the initial message when the page loads
window.onload = sendInitialMessage;
