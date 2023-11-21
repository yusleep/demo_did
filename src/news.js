// Reference to the button
const button = document.getElementById("sendMessageButton");

button.addEventListener("click", function () {
  // Using the Fetch API to send a GET request to a server
  fetch("http://localhost:8080")
    .then((response) => response.json())
    .then((data) => {
      // Storing the returned value from the server
      const messageFromServer = data.message;

      const buttonSideDiv = document.getElementById("button-side");

      // 设置新的HTML内容
      const newContent = `
      
      <div class="header-sign">
        <h1>Sign-in request</h1>
        <p>This site is requesting to sign in with</p>
      </div>
      <div class="message-box">
        <p><strong>Message:</strong></p>
        <p>Sign in with IX-Chain</p>
        <p><strong>URI:</strong></p>
        <p>https://dailynews.com</p>
        <p><strong>Version:</strong></p>
        <p>1</p>
      </div>
      <div class="button-container">
        <button class="cancel-button" id="cancelSignButton">Cancel</button>
        <button class="sign-button" id="signMessageButton">Sign-In</button>
      </div>
   
    `;

      // 更新button-side div的内容
      buttonSideDiv.innerHTML = newContent;

      // Now that the signatureButton exists in the DOM, we can safely add an event listener to it

      document
        .getElementById("signMessageButton")
        .addEventListener("click", function () {
          window.location.href =
            "file:///Users/fishbook/MyCode/demo_did/src/news_main.html";
        });

      document
        .getElementById("cancelSignButton")
        .addEventListener("click", function () {
          window.location.href =
            "file:///Users/fishbook/MyCode/demo_did/src/news_sign.html";
        });

      document
        .getElementById("signatureButton")
        .addEventListener("click", function () {
          // Handle the signature button click
          // Place your code here that should run when the signature button is clicked
          fetch("http://localhost:8080", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // any data you want to send to the server
              exampleKey: "exampleValue", // 随机数
            }),
          })
            .then((response) => response.json()) // assuming server responds with json
            .then((data) => {
              // Store the response. Here's an example using local storage
              localStorage.setItem("signatureResponse", JSON.stringify(data));

              // Now navigate to another page
              window.location.href =
                "file:///Users/fishbook/MyCode/demo_did/page2.html";
            })
            .catch((error) => {
              console.error(
                "There was an error with the fetch operation:",
                error
              );
            });
        });
    })
    .catch((error) => {
      console.error("Error fetching message:", error);
    });
});
