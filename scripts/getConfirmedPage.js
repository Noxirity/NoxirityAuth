const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Noxirity LLC - Coming Soon</title>
    <style>
      html,
      body {
        height: 100%; /* make sure the page takes up full height */
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column; /* make elements stack vertically */
      }
      body {
        font-family: "Arial", sans-serif;
        background-color: #f4f4f4;
        color: #333;
        flex: 1; /* makes body element grow to take available space */
      }
      header,
      footer {
        background-color: #0057b8;
        color: #fff;
        padding: 10px 20px;
        text-align: center;
      }
      .container {
        flex: 1; /* makes container grow to take available space */
        display: flex;
        flex-direction: column;
        justify-content: center; /* center content vertically */
        align-items: center; /* center content horizontally */
        text-align: center;
      }
      h1,
      h2 {
        color: #333;
      }
      a {
        color: #0057b8;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      footer p {
        margin: 0;
        font-size: 0.8em;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js"></script>
  </head>
  <body onload="confettiStart()">
    <div class="container">
      <h2>Account Linked</h2>
      <p>
        Your Roblox account ({{roblox_name}}) has been successfully linked to your Irity profile!
      </p>
      {{__REWARD_MESSAGE__}}
      <p>
        <a href="https://noxirity.com/legal/privacy-policy/">Privacy Policy</a>
        |
        <a href="https://noxirity.com/legal/terms/">Terms of Service</a>
      </p>
    </div>
    <footer>
      <p>© Noxirity LLC</p>
    </footer>
    <script>
      function confettiStart() {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    </script>
  </body>
</html>`;

export default {
  send(req, res, roblox_name, discord_name, reward_msg) {
    const replacedHtml = html
      .replace("{{roblox_name}}", roblox_name)
      .replace("{{discord_name}}", discord_name)
      .replace("{{__REWARD_MESSAGE__}}", reward_msg);
    res.send(replacedHtml);
  },
};
