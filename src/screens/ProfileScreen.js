import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./ProfileScreen.css";

const ProfileScreen = () => {
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
    <div className="profileScreen">
      <h1 className="profile__name">
        Welcome, <br />
        {user.displayName}!
      </h1>
      <br />
      <br />
      <img className="profile__img" src={user.photoURL ? user.photoURL : profileAvatar} alt={user.displayName} />
      <br />
      <br />
      <h4 className="profile__section">Your E-mail:</h4>
      <p className="profile__desc">{user.email}</p>
      <br />
      <h4 className="profile__section">Your ID:</h4>
      <p className="profile__desc">{user.uid}</p>
      <br />
      <br />
      <Link to="/">
        <button className="profile__button" onClick={logout}>Log Out</button>
      </Link>
    </div>
  );
};

export default ProfileScreen;
