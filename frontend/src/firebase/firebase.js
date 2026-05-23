import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyAU8UJtbVao7MkwqDUHZ71qsZlMAlODWPg",
  authDomain: "levels-validation-system-f8feb.firebaseapp.com",
  projectId: "levels-validation-system-f8feb",
  storageBucket: "levels-validation-system-f8feb.firebasestorage.app",
  messagingSenderId: "989737985677",
  appId: "1:989737985677:web:feb4b245589815b87264c4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);