import React, { useEffect, useState } from "react";
import { auth } from "../api/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) return null; // or a loading spinner

  return user ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;