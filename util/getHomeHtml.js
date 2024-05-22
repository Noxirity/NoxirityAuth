/**
 *
 * While templating libraries are often used for html page construction,
 * this sample uses a function to keep it as simple as possible for ease of understanding.
 */

export function getHomeHtml(userData) {
  return `
          <!DOCTYPE html>
          <html>
          <head>
          <title>User Profile</title>
          <style>
              body {
                  background-color: #1a1a1a;
                  color: #fff;
                  font-family: Arial, sans-serif;
                  text-align: center;
                  padding: 20px;
              }
  
              h1 {
                  font-size: 24px;
                  margin-bottom: 20px;
              }
  
              img {
                  border-radius: 50%;
                  margin: 20px;
                  max-width: 150px;
                  height: auto;
              }
  
              p {
                  font-size: 18px;
                  margin: 5px 0;
              }
  
              .button-link {
                  display: inline-block;
                  background-color: #ff5722;
                  color: #fff;
                  text-decoration: none;
                  font-weight: bold;
                  padding: 10px 20px;
                  margin-top: 10px;
                  border-radius: 3px;
                  transition: background-color 0.3s ease-in-out;
              }
  
              .button-link:hover {
                  background-color: #ff4500;
              }
  
              .message-form {
                  background-color: #333;
                  padding: 20px;
                  border-radius: 5px;
                  margin-top: 20px;
                  max-width: 400px;
                  margin: 20px auto;
              }
  
              .input-container {
                  margin-bottom: 10px;
              }
  
              .message-input {
                  background-color: #444;
                  color: #fff;
                  border: 1px solid #777;
                  border-radius: 3px;
                  padding: 10px;
                  width: 100%;
                  box-sizing: border-box;
                  outline: none;
                  transition: box-shadow 0.2s ease-in-out;
              }
  
              .message-input::placeholder {
                  color: #999;
                  font-size: 0.8rem;
              }
  
              .message-input:focus {
                  border: 1px solid #ff5722;
                  box-shadow: 0 0 10px #ff5722;
              }
  
              .button-link {
                  display: inline-block;
                  vertical-align: middle;
                  background-color: #ff5722;
                  color: #fff;
                  text-decoration: none;
                  font-weight: bold;
                  padding: 10px;
                  margin-top: 10px;
                  border-radius: 3px;
                  transition: background-color 0.3s ease-in-out;
              }
  
              .button-link:hover {
                  background-color: #ff4500;
              }
  
              .message-button {
                  background-color: #ff5722;
                  color: #fff;
                  border: none;
                  border-radius: 3px;
                  padding: 10px;
                  cursor: pointer;
                  width: 100%;
                  transition: background-color 0.1s ease-in-out;
              }
  
              .message-button:hover {
                  background-color: #ff4500;
              }
  
          </style>
          </head>
          <body>
              <img src="${userData.picture}" alt="User Picture">
              <h1>Hello, ${userData.nickname}</h1>
              <p><b>Username:</b> ${userData.preferred_username}</p>
              <p><b>User ID:</b> ${userData.sub}</p>
              <a href="${userData.profile}" target="_blank" class="button-link">🔗 View on Roblox</a>
              <a href="/logout" class="button-link">Logout</a>
  
              <form action="/message" method="POST" class="message-form">
                  <div class="input-container">
                      <input type="text" id="topic" name="topic" class="message-input" required placeholder="Topic">
                  </div>
                  <div class="input-container">
                      <input type="text" id="universeId" name="universeId" class="message-input" required placeholder="Universe ID">
                  </div>
                  <div class="input-container">
                      <input type="text" id="message" name="message" class="message-input" required placeholder="Message">
                  </div>
                  <button type="submit" class="message-button">Send Message</button>
              </form>
          </body>
          </html>
      `;
}
