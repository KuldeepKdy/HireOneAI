// get this all from firbase website after enable google authentication
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "hireoneai-6c088.firebaseapp.com",
  projectId: "hireoneai-6c088",
  storageBucket: "hireoneai-6c088.firebasestorage.app",
  messagingSenderId: "1044162011360",
  appId: "1:1044162011360:web:8774854faeb8010cca3085",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
