import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase.init'; 

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = ()=>{
  setLoading(true)
    return signInWithPopup(auth, googleProvider)
}

  const signInUser = (email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const updateUser = (updatedUser)=>{
    setLoading(true)
    return updateProfile(auth.currentUser, updatedUser)
  }



const logOutUser = ()=>{
  setLoading(true)
    return signOut(auth)
}

useEffect( ()=>{
const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
setUser(currentUser)
setLoading(false)

return ()=>{
    unsubscribe();
}

})


},[])


  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    signInWithGoogle,
    signInUser,
    updateUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
