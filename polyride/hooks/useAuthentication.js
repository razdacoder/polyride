import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../slices/authSlice";

import { auth, db } from "../firebaseConfig";

const useAuthentication = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            accessToken: user.accessToken,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return { user };
};

export default useAuthentication;
