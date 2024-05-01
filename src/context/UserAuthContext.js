import { createContext, useEffect, useState, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { createUserObject } from "../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  


  const auth = getAuth(); // Initialize auth using getAuth() function

  async function signUp(email, password, data) {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await createUserObject(user, data);
      setUser(user);
    } catch(err) {
      console.error("Error signing up:", err);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUserObject(userCredential.user, data);
      setUser(userCredential.user);
    } catch (err) {
      console.error("Error signing up:", err.message);
      throw err; // Rethrow the error for the caller to handle if necessary
    }
  }

  async function logIn(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);
    } catch (error) {
      console.error("Error logging in:", error);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error; // Rethrow the error for the caller to handle if necessary
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error; // Rethrow the error for the caller to handle if necessary
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = await createUserObject(currentUser);
        onSnapshot(userRef, (snapshot) => {
          setUser({ id: snapshot.id, ...snapshot.data() });
          setLoadingUser(false);
          if (user) navigate(location.pathname, { replace: true });
        });
      } else {
        setLoadingUser(false);
        setUser(null);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        loadingUser,
        user,
        signUp,
        logIn,
        logOut,
        setLoadingUser,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
