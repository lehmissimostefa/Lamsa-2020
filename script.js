// استيراد Firebase من الإنترنت مباشرة
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// إعدادات مشروعك على Firebase (انسخها من firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyBn2ddsCYig_u_o5cxEIcUUpWWNBHUQe1U",
  authDomain: "lamsa-2020.firebaseapp.com",
  projectId: "lamsa-2020",
  storageBucket: "lamsa-2020.appspot.com",
  messagingSenderId: "597684556267",
  appId: "1:597684556267:web:bcb4deda334ecee4b909ae",
  measurementId: "G-BMDM8BES69"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 📌 التعامل مع نموذج التسجيل
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailVerification(userCredential.user).then(() => {
        document.getElementById("registerMessage").innerText = "✅ تم إنشاء الحساب، يرجى تأكيد بريدك الإلكتروني.";
      });
    })
    .catch((error) => {
      document.getElementById("registerMessage").innerText = "❌ خطأ: " + error.message;
    });
});

// 📌 التعامل مع نموذج تسجيل الدخول
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (userCredential.user.emailVerified) {
        document.getElementById("loginMessage").innerText = "✅ تم تسجيل الدخول بنجاح.";
        setTimeout(() => {
          window.location.href = "welcome.html"; // تأكد من وجود هذه الصفحة
        }, 1500);
      } else {
        signOut(auth);
        document.getElementById("loginMessage").innerText = "❌ يرجى تفعيل بريدك الإلكتروني أولاً.";
      }
    })
    .catch((error) => {
      document.getElementById("loginMessage").innerText = "❌ خطأ: " + error.message;
    });
});
