import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKB0ACuYIZTklVRokperlg4wRuF0Irg5o",
  authDomain: "we-text-c82e4.firebaseapp.com",
  projectId: "we-text-c82e4",
  storageBucket: "we-text-c82e4.appspot.com",
  messagingSenderId: "607569203009",
  appId: "1:607569203009:web:ab2caf1eec92344fc11bc0",
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseStorage = getStorage(firebaseApp);

export default firebaseStorage;
