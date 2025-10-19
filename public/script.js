const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const botMessageElement = document.createElement('div');
botMessageElement.classList.add('message', 'bot');
botMessageElement.textContent = 'Hello! How can I assist you today?';
chatBox.appendChild(botMessageElement);
chatBox.scrollTop = chatBox.scrollHeight;

form.addEventListener('submit',async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  try {
    const response = await fetch('/api/chat', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        role: 'user',
        prompt: userMessage
       })
    })

    if(!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    if(data && data.message) {
      appendMessage('bot', data.message);
    } else {
      botMessageElement.textContent = 'No response from bot.';
    }
  } catch (error) {
    botMessageElement.textContent = 'Error: ' + error.message;
  } finally {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
