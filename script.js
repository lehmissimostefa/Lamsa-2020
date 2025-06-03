// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// تهيئة Firebase باستخدام بياناتك الصحيحة
const firebaseConfig = {
  apiKey: "AIzaSyBn2ddsCYig_u_o5cxEIcUUpWWNBHUQe1U",
  authDomain: "lamsa-2020.firebaseapp.com",
  projectId: "lamsa-2020",
  storageBucket: "lamsa-2020.firebasestorage.app",
  messagingSenderId: "597684556267",
  appId: "1:597684556267:web:bcb4deda334ecee4b909ae",
  measurementId: "G-BMDM8BES69"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// التسجيل
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const name = document.getElementById('registerName').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      document.getElementById('registerMessage').innerText = "✅ تم التسجيل بنجاح";
      setTimeout(() => {
        window.location.href = "home.html"; // صفحة بعد التسجيل
      }, 1500);
    })
    .catch(error => {
      document.getElementById('registerMessage').innerText = "❌ خطأ: " + error.message;
    });
});

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      document.getElementById('loginMessage').innerText = "✅ تم تسجيل الدخول";
      setTimeout(() => {
        window.location.href = "home.html"; // صفحة بعد الدخول
      }, 1500);
    })
    .catch(error => {
      document.getElementById('loginMessage').innerText = "❌ خطأ: " + error.message;
    });
});
