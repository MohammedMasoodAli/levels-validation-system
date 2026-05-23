import {

  collection,
  addDoc,
  getDocs

} from "firebase/firestore";

import { db } from "../firebase/firebase";


// ADD SUBMISSION

export const addSubmission = async (data) => {

  try {

    await addDoc(
      collection(db, "submissions"),
      data
    );

  } catch (error) {

    console.log(error);

  }

}


// GET SUBMISSIONS

export const getSubmissions = async () => {

  try {

    const querySnapshot = await getDocs(
      collection(db, "submissions")
    );

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  } catch (error) {

    console.log(error);

    return [];
  }

}