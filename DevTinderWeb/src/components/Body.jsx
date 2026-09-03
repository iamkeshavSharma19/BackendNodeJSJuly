import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

//?As soon as my page refreshes And My Body Component loads I will check wheteher the token is present or not ??If the token is present I will try to get back my loggedIn User.
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUser = async () => {
    if (userData) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
     
      dispatch(addUser(res.data));
    } catch (error) {
      console.log(error);
      console.log(error.status);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center text-white font-mono">
        Loading DevTinder...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {/* for rendering Children Routes, Use Outlet, All the children routes will be rendered inside the <Outlet/> component */}
      <Outlet />
    </div>
  );
};

export default Body;
