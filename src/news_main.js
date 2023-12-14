
document.getElementById("unlock-button").addEventListener("click", function () {
  const buttonSideDiv = document.getElementById("button-side");
  const randomNum = Math.floor(Math.random() * 100);

  const formData_subjectdid = new FormData();
  formData_subjectdid.append("SubjectDID", "DID:22222222");
  // 设置新的HTML内容

  fetch(`${window.myHttp}` + ":8002/dper/sendvcrequest/8001", {
    method: "POST",
    headers: {},
    body: formData_subjectdid,
  })
    .then((response) => response.json()) // assuming server responds with json
    .then((data) => {
      // Store the response. Here's an example using local storage
      localStorage.setItem("vcIdentifier", data.Identifier);
      localStorage.setItem("spDid", data.SubjectDID);

      // Now navigate to another page
    })
    .catch((error) => {
      console.error("There was an error with the fetch operation:", error);
    });
  const newContent = `
    
    <div class="header-sign">
      <h1>Vc request</h1>
      <p>This site is requesting your Vc</p>
    </div>
    <div class="message-box">
      <p><strong>Identifier:</strong> ${localStorage.getItem(
        "vcIdentifier"
      )}</p>
      <p><strong>Issuer:</strong> ${localStorage.getItem("spDid")}</p>
      <p><strong>Subject:</strong> ${localStorage.getItem("userDid")}</p>
      <p><strong>Validity:</strong> 2023-12-29</p>
      <p><strong>Purpose:</strong> get user info</p>
      <p><strong>Signature:</strong> </p>
      <p><strong>Reassign:</strong> 1</p>
      <p><strong>IssuerAddress:</strong> ${localStorage.getItem(
        "serverAddress"
      )}</p>
      <p><strong>SubjectAddress:</strong> ${localStorage.getItem(
        "userAddress"
      )}</p>

     
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
      // 向链上发送vc
      const formData_vc = new FormData();
      formData_vc.append("Issuer", `${localStorage.getItem("spDid")}`);
      formData_vc.append("Subject", `${localStorage.getItem("userDid")}`);
      formData_vc.append("validity", "2023-12-29");
      formData_vc.append(
        "Identifier",
        `${localStorage.getItem("vcIdentifier")}`
      );
      formData_vc.append(
        "SubjectAddress",
        `${localStorage.getItem("userAddress")}`
      );
      fetch(`${window.myHttp}` + ":8001/dper/sendvc/8002", {
        method: "POST",
        headers: {},
        body: formData_vc,
      })
        .then((response) => response.json()) // assuming server responds with json
        .then((data) => {
          // Store the response. Here's an example using local storage
          // Now navigate to another page
          localStorage.setItem("vcSignature", data.Signature);
        })
        .catch((error) => {
          console.error("There was an error with the fetch operation:", error);
        });
    });

  document
    .getElementById("cancelSignButton")
    .addEventListener("click", function () {
      window.location.href = "./news_main.html";
    });

  this.remove();
});
