// Simple Request

// fetch("http://localhost:5008/api/student")
//   .then((resp) => resp.json())
//   .then((resp) => {
//     console.log(resp);
//   });

// Preflight request

// fetch("http://localhost:5008/api/student", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       a: 1,
//     },
//     credentials: "include",
//   })
//     .then((resp) => resp.json())
//     .then((resp) => {
//       console.log(resp);
//     });
login.onclick = function () {
  fetch("/api/admin/login", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      loginId: "joelle",
      loginPwd: "123456",
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
    });
};

updateStu.onclick = function () {
  fetch("/api/student/10", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: "Chris",
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
    });
};






