import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase.init'; 

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
  }

  const updateUser = (updatedUser)=>{
    return updateProfile(auth.currentUser, updatedUser)
  }


const logOutUser = ()=>{
    return signOut(auth)
}

useEffect( ()=>{
const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
setUser(currentUser)

return ()=>{
    unsubscribe();
}

})


},[])


  const authInfo = {
    user,
    setUser,
    createUser,
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
