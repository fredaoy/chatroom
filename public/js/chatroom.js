(function connect() {
  let socket = io.connect("https://chatroom-qoc6.testchat/");

  let username = document.querySelector("#username");
  let usernameBtn = document.querySelector("#usernameBtn");
  let curUsername = document.querySelector(".card-header");

  usernameBtn.addEventListener("click", (e) => {
    console.log(username.value);
    socket.emit("change_username", { username: username.value });
    curUsername.textContent = username.value;
    username.value = "";
  });

  let message = document.querySelector("#message");
  let messageBtn = document.querySelector("#messageBtn");
  let messageList = document.querySelector("#message-list");


    messageBtn.addEventListener("click", (e) => {
      console.log(message.value);
      let messageValue = message.value; // เก็บข้อความที่ใส่ลงใน input
      socket.emit("new_message", { message: messageValue }); // ส่งข้อความไปยังเซิร์ฟเวอร์
      message.value = ''; // ล้างข้อความใน input
    
      // ไม่ต้องมีการรับข้อความในนี้
    });

    // ฟังก์ชันสำหรับเข้ารหัสข้อความเป็นสี
function stringToColor(str) {
  // คำนวณ hash ของข้อความ
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // สร้างสี RGB จาก hash
  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
}

// เมื่อมีการรับข้อความใหม่
socket.on("receive_message", (data) => {
  console.log(data);
  let listItem = document.createElement("li");
  listItem.textContent = data.username + ": " + data.message;

  // ใช้ชื่อผู้ใช้เพื่อสร้างสี
  let userColor = stringToColor(data.username);
  listItem.style.color = userColor;

  messageList.appendChild(listItem);
  
  // Remove old messages
  const messageItems = messageList.querySelectorAll("li");
  if (messageItems.length > 10) {
    messageList.removeChild(messageItems[0]);
  }
});

})();
