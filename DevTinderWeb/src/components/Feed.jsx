import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import loginBg from "../assets/loginBg.jpg";

const Feed = () => {
  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res?.data?.users);
      dispatch(addFeed(res?.data?.users));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  //?second useEffect for getFeed API call after the component is mounted.
  useEffect(() => {
    if (user) {
      getFeed();
    }
  }, [user]);
  if (!user) {
    return null;
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-cover bg-center bg-no-repeat relative font-sans antialiased text-white pt-20"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Light Overlay */}
      <div className="absolute inset-0 bg-[#050714]/50 backdrop-blur-[2px]" />

      {/* Main Feed Card Area */}
      {feed && feed?.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <div className="relative z-10 bg-[#090d1f]/90 border border-slate-800/80 rounded-2xl p-8 text-center max-w-md shadow-2xl">
          <h2 className="text-xl font-bold font-['JetBrains_Mono'] text-white">
            No New Profiles!
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            You've viewed everyone in your stack. Check back later for new
            developers.
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
