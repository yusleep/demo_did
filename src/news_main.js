document.getElementById("unlock-button").addEventListener("click", function () {
  const buttonSideDiv = document.getElementById("button-side");
  const randomNum = Math.floor(Math.random() * 100);
  // 设置新的HTML内容
  const newContent = `
    
    <div class="header-sign">
      <h1>Vc request</h1>
      <p>This site is requesting your Vc</p>
    </div>
    <div class="message-box">
      <p><strong>Identifier:</strong>sdfsa-fnncxn-scxv</p>
      <p><strong>Issuer:</strong> DID:324723hwehfhh</p>
      <p><strong>Subject:</strong> DID:sdfasf232</p>
      <p><strong>Validity:</strong> 2023-12-29</p>
      <p><strong>Purpose:</strong> ganggang</p>
      <p><strong>Signature:</strong> </p>
      <p><strong>Reassign:</strong> 0</p>
      <p><strong>IssuerAddress:</strong> 8adfafcxcvooqweor</p>
      <p><strong>SubjectAddress:</strong> f21hsdfhay</p>

     
    </div>
    <div class="button-container">
      <button class="cancel-button" id="cancelSignButton">Cancel</button>
      <button class="sign-button" id="signMessageButton">Sign-In</button>
    </div>
 
  `;

  // 更新button-side div的内容
  buttonSideDiv.innerHTML = newContent;

  document
    .getElementById("signMessageButton")
    .addEventListener("click", function () {
      var content = document.querySelector(".content-right");
      content.style.filter = "none"; // This removes the blur effect
      document.getElementById("lock-layer").remove(); // This removes the lock layer
      document.getElementById("button-side").remove();
      // 向用户请求签名
      const formData_userMessage = new FormData();
      formData_userMessage.append("message", `${randomNum}`);
      fetch("http://localhost:800/dper/signaturereturn", {
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
          console.error("There was an error with the fetch operation:", error);
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
      fetch("http://localhost:800/dper/signvalid", {
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
          console.error("There was an error with the fetch operation:", error);
        });
    });

  document
    .getElementById("cancelSignButton")
    .addEventListener("click", function () {
      window.location.href =
        "file:///Users/fishbook/MyCode/demo_did/src/news_main.html";
    });

  this.remove();
});
