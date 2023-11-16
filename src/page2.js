// This script will update the time dynamically
setInterval(() => {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  document.querySelector(".time").textContent = `${hours}:${minutes}`;
}, 1000);
