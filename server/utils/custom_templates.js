const emailVerificationSuccessTemplate = `
<html>
  <head>
    <title>Email Verification Successful</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        text-align: center;
        padding-top: 50px;
      }
      h1 {
        color: #333;
      }
      p {
        color: #666;
        font-size: 18px;
      }
    </style>
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        var count = 5; // Initial countdown value
        var countdownDisplay = document.getElementById('countdown');
        function countdown() {
          countdownDisplay.textContent = count;
          count--;
          if (count < 0) {
            window.close(); // Close the tab when countdown reaches 0
          } else {
            setTimeout(countdown, 1000); // Update countdown every second
          }
        }
        countdown(); // Start the countdown
      });
    </script>
  </head>
  <body>
    <h1>Email Verification Successful</h1>
    <p>Your email has been successfully verified. This tab will close automatically in <span id="countdown">5</span> seconds.</p>
  </body>
</html>
`;

module.exports = { emailVerificationSuccessTemplate };
