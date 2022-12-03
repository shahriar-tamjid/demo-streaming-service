import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./Nav.css";

function Nav() {
  // useState is a way to use variables inside react app
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  const profileAvatar = "https://w7.pngwing.com/pngs/481/804/png-transparent-smiley-emoji-smiley-face-emoticon-smiley-miscellaneous-child-face.png";

  return (
    // Only use "nav__black" class when "show" variable is true
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src="https://www.abacustechnologies.com/wp-content/uploads/2020/05/580b57fcd9996e24bc43c529.png"
          alt="Logo"
        />

        <Link to="/profile">
          <img className="nav__avatar" src={user.photoURL ? user.photoURL : profileAvatar} alt={user.displayName} />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
