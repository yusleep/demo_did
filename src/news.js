// Reference to the button
const button = document.getElementById("sendMessageButton");

button.addEventListener("click", function () {
  // Using the Fetch API to send a GET request to a server
  fetch("http://localhost:8080")
    .then((response) => response.json())
    .then((data) => {
      // Storing the returned value from the server
      const userDid = data.did;
      console.log(`Here is the user did :${userDid}`);

      const formData_did = new FormData();
      formData_did.append("DID", `${userDid}`);
      console.log(formData_did);
      // 向服务器发送did请求address
      fetch("http://127.0.0.1:8001/dper/getaddress", {
        method: "POST",
        headers: {},
        body: formData_did,
      })
        .then((response) => response.json()) // assuming server responds with json
        .then((data) => {
          // Store the response. Here's an example using local storage
          localStorage.setItem("userAddress", data.address);
          console.log(`This is the user address : ${data.address}`);
          // Now navigate to another page
        })
        .catch((error) => {
          console.error("There was an error with the fetch operation:", error);
        });

      const buttonSideDiv = document.getElementById("button-side");
      const randomNum = Math.floor(Math.random() * 100);
      // 设置新的HTML内容
      const newContent = `
      
      <div class="header-sign">
        <h1>Sign-in request</h1>
        <p>This site is requesting to sign in with</p>
      </div>
      <div class="message-box">
        <p><strong>Message:</strong></p>
        <p>${randomNum}</p>
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
          // 向用户请求签名
          const formData_userMessage = new FormData();
          formData_userMessage.append("message", `${randomNum}`);
          fetch("http://localhost:8001/dper/signaturereturn", {
            method: "POST",
            headers: {},
            body: formData_userMessage,
          })
            .then((response) => response.json()) // assuming server responds with json
            .then((data) => {
              // Store the response. Here's an example using local storage
              localStorage.setItem("userSignature", data.signature);
              // Now navigate to another page
            })
            .catch((error) => {
              console.error(
                "There was an error with the fetch operation:",
                error
              );
            });

          const formDataToServer = new FormData();
          formDataToServer.append("message", `${randomNum}`);
          formDataToServer.append(
            "address",
            `${localStorage.getItem("userAddress")}`
          );
          formDataToServer.append(
            "signature",
            `${localStorage.getItem("userSignature")}`
          );
          // 向服务器发送验证请求
          fetch("http://localhost:8001/dper/signvalid", {
            method: "POST",
            headers: {},
            body: formDataToServer,
          })
            .then((response) => response.json()) // assuming server responds with json
            .then((data) => {
              console.log(`Verify success : ${data}`);
              // Store the response. Here's an example using local storage
              if ((data.status = "success")) {
                // 如果验证正确则页面跳转
                window.location.href =
                  "file:///Users/fishbook/MyCode/demo_did/src/news_main.html";
              } else {
                alert("验证失败！");
                window.location.href =
                  "file:///Users/fishbook/MyCode/demo_did/src/news_sign.html";
              }
              // Now navigate to another page
            })
            .catch((error) => {
              console.error(
                "There was an error with the fetch operation:",
                error
              );
            });
        });

      document
        .getElementById("cancelSignButton")
        .addEventListener("click", function () {
          window.location.href =
            "file:///Users/fishbook/MyCode/demo_did/src/news_sign.html";
        });
    })
    .catch((error) => {
      console.error("Error fetching message:", error);
    });
});

// verify 部分
const buttonVerify = document.getElementById("verifyMessageButton");

buttonVerify.addEventListener("click", function () {
  const randomNum = Math.floor(Math.random() * 100); //随机生成0-100的整数（不包含100）
  // 向服务器请求签名
  const formData_serverMessage = new FormData();
  formData_serverMessage.append("message", `${randomNum}`);
  fetch("http://localhost:8002/dper/signaturereturn2", {
    method: "POST",
    headers: {},
    body: formData_serverMessage,
  })
    .then((response) => response.json()) // assuming server responds with json
    .then((data) => {
      // Store the response. Here's an example using local storage
      localStorage.setItem("serverSignature", data.signature);
      localStorage.setItem("serverAddress", data.address);
    })
    .catch((error) => {
      console.error("There was an error with the fetch operation:", error);
    });

  const buttonSideDiv = document.getElementById("button-side");

  // 设置新的HTML内容
  const newContent = `
      
      <div class="header-sign">
        <h1>Verify request</h1>
        <p>You can verify the website with</p>
      </div>
      <div class="message-box">
        <p><strong>Message:</strong></p>
        <p>${randomNum}</p>
        <p><strong>address:</strong></p>
        <p>35ec55397d0fc52b1bb6294a74fc04c34ac85379</p>
        <p><strong>Signature:</strong></p>
        <p>${localStorage.getItem("serverSignature")}</p>
      </div>
      <div class="button-container">
        <button class="cancel-button" id="cancelSignButton">Cancel</button>
        <button class="sign-button" id="signMessageButton">Verify</button>
      </div>
   
    `;

  // 更新button-side div的内容
  buttonSideDiv.innerHTML = newContent;

  // Now that the signatureButton exists in the DOM, we can safely add an event listener to it

  document
    .getElementById("signMessageButton")
    .addEventListener("click", function () {
      const formDataToUser = new FormData();
      formDataToUser.append("message", `${randomNum}`);
      formDataToUser.append(
        "address",
        `${localStorage.getItem("serverAddress")}`
      );
      formDataToUser.append(
        "signature",
        `${localStorage.getItem("serverSignature")}`
      );
      console.log(formDataToUser);
      // 向用户发送验证请求
      fetch("http://localhost:8001/dper/signvalid", {
        method: "POST",
        headers: {},
        body: formDataToUser,
      })
        .then((response) => response.json()) // assuming server responds with json
        .then((data) => {
          // Store the response. Here's an example using local storage
          if ((data.status = "successs")) {
            alert("Successful!");
            window.location.href =
              "file:///Users/fishbook/MyCode/demo_did/src/news_sign.html";
          } else {
            alert("验证失败！");
            window.location.href =
              "file:///Users/fishbook/MyCode/demo_did/src/news_sign.html";
          }
          // Now navigate to another page
        })
        .catch((error) => {
          console.error("There was an error with the fetch operation:", error);
        });
    });

  document
    .getElementById("cancelSignButton")
    .addEventListener("click", function () {
      window.location.href =
        "file:///Users/fishbook/MyCode/demo_did/src/news_sign.html";
    });
});
