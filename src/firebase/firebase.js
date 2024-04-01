import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  enableIndexedDbPersistence,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCA5PF_8PQrRKobVXBAR9hvdVvJq43AC7Q",
  authDomain: "waste-management-418513.firebaseapp.com",
  projectId: "waste-management-418513",
  storageBucket: "waste-management-418513.appspot.com",
  messagingSenderId: "134903389774",
  appId: "1:134903389774:web:a71dcaec7c900bdc242d1f",
  measurementId: "G-WGJ2FJ5P6B",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Enable Firestore persistence
enableIndexedDbPersistence(firestore);

export const auth = getAuth(app);
export const storage = getStorage(app);
export { firestore }; // Export firestore

export default app;

// The rest of your code using doc, getDoc, setDoc, addDoc, collection, updateDoc, and getDocs

export async function createUserObject(userAuth, data) {
  if (!userAuth) return;
  const uid = userAuth.uid;
  const userRef = doc(firestore, `users/${uid}`);

  // Check if document exists before getting it
  const userSnap = await getDoc(userRef).catch((error) => {
    if (error.code === "firestore/failed-precondition") {
      // Document does not exist, handle this case
      return null;
    }
    throw error; // Re-throw other errors
  });

  if (!userSnap.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date(),
      pickups = [];
    try {
      await setDoc(userRef, {
        displayName,
        uid,
        email,
        pickups,
        createdAt,
        ...data,
      });
    } catch (err) {
      //console.log(err);
    }
  }
  return userRef;
}

export const setPickups = async (pickup) => {
  try {
    const userRef = doc(firestore, `users/${pickup.user}`);
    const userSnap = (await getDoc(userRef)).data();
    // //console.log(pickup);
    const docRef = await addDoc(collection(firestore, "pickups"), {
      type: pickup.type,
      weight: pickup.weight,
      // imgUrl: pickup.imgUrl,
      dayTime: pickup.dayTime,
      location: pickup.location,
      pincode: pickup.pincode,
      OTP: pickup.OTP,
      status: pickup.status,
      user: userRef,
      createdAt: new Date(),
    });
    const pickups = userSnap.pickups;
    await updateDoc(userRef, { pickups: [...pickups, docRef] });
  } catch (err) {
    //console.log(err);
  }
};

// export const getPickupHistoryForCitizen = async (userId) => {
//   const userRef = doc(firestore, `users/${userId}`);
//   const userSnap = (await getDoc(userRef)).data();
//   //console.log(userSnap);
//   const pickups = userSnap.pickups;
//   const pickupHistory = [];
//   for (let i = 0; i < pickups.length; i++) {
//     const pickup = (await getDoc(pickups[i])).data();
//     pickupHistory.push(pickup);
//   }
//   return pickupHistory;
// };

export const getPickupForGarbageCollector = async (userId) => {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = (await getDoc(userRef)).data();
  const truckColour = userSnap.truckColour;
  const pickups = [];
  const pickupRef = collection(firestore, "pickups");
  const pickupSnap = await getDocs(pickupRef);
  pickupSnap.forEach((doc) => {
    const pickup = doc.data();
    // if (pickup.status === "pending" && pickup.type === truckColour && pickup.createdAt.toDate() < new Date()-86400000) {
    if (pickup.status === "pending" && pickup.type === truckColour) {
      pickups.push(pickup);
    }
  });
  pickups.sort((a, b) => {
    return a.dayTime - b.dayTime;
  });
  return pickups;
};

export const updatePickupStatus = async (pickupId, status) => {
  try {
    const pickupRef = doc(firestore, `pickups/${pickupId}`);
    await updateDoc(pickupRef, { status });
  } catch (err) {
    //console.log(err);
  }
};
