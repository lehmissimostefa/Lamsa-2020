const firebaseConfig = {
  apiKey: "AIzaSyDAsJ7_xRjKbFehZMrIbQfqSgiZkK-DHnI",
  authDomain: "lamsa-2020.firebaseapp.com",
  projectId: "lamsa-2020",
  appId: "1:597684556267:web:bcb4deda334ecee4b909ae"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      userCredential.user.sendEmailVerification();
      document.getElementById("registerMessage").textContent = "تم إنشاء الحساب. تحقق من بريدك الإلكتروني.";
    })
    .catch(error => {
      document.getElementById("registerMessage").textContent = "خطأ: " + error.message;
    });
});

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      if (userCredential.user.emailVerified) {
        window.location.href = "welcome.html";
      } else {
        auth.signOut();
        document.getElementById("loginMessage").textContent = "يرجى تفعيل البريد الإلكتروني أولاً.";
      }
    })
    .catch(error => {
      document.getElementById("loginMessage").textContent = "خطأ: " + error.message;
    });
});