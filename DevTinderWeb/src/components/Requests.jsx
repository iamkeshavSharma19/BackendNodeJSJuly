import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review" + "/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeRequests(_id));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const fetchRequests = async () => {
    try {
      if (requests) return;
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res?.data?.pendingConnectionRequest);
      dispatch(addRequests(res?.data?.pendingConnectionRequest));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return (
      <div className="min-h-screen w-full bg-[#020817] text-white pt-32 text-center">
        <h2 className="text-3xl font-bold font-['JetBrains_Mono']">
          No Pending Connection Requests
        </h2>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="min-h-screen w-full bg-[#020817] text-white pt-32 text-center">
        <h2 className="text-3xl font-bold font-['JetBrains_Mono']">
          No Pending Connection Requests
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="relative min-h-screen w-full bg-[#020817] text-white overflow-y-auto pt-24 pb-12">
        {/* Animated Dot Grid Background */}
        <div
          className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(#ffffff33_1.5px,#020817_1.5px)] bg-size-[20px_20px]"
          style={{
            animation: "pulseGrid 30s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />

        {/* CSS Animation Keyframes */}
        <style>{`
        @keyframes pulseGrid {
          0%, 100% {
            background-size: 18px 18px;
            opacity: 0.3;
          }
          50% {
            background-size: 26px 26px;
            opacity: 0.85;
          }
        }
      `}</style>

        {/* Main Content Area */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          {/* Centered Heading */}
          <h2 className="text-3xl font-bold font-['JetBrains_Mono'] text-center mb-8 text-white">
            Connection Requests
          </h2>

          {/* Connections List */}
          <div className="w-full max-w-6xl space-y-6">
            {requests.map((request) => {
              const { fromUserId } = request;
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                fromUserId;

              return (
                <div
                  key={_id || firstName}
                  /* Increased padding (p-7 sm:p-8) and min-height (min-h-[180px]) */
                  className="group relative w-full min-h-45 bg-[#090d1f]/80 border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl p-7 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col sm:flex-row items-center sm:items-start gap-7"
                >
                  {/* Enlarged Avatar Profile Picture */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-0.5 bg-linear-to-br from-indigo-500/40 via-purple-500/20 to-slate-800 shadow-inner">
                      <img
                        src={
                          photoUrl ||
                          "https://geographyandyou.com/images/user-profile.png"
                        }
                        alt={`${firstName} ${lastName}`}
                        className="w-full h-full object-cover rounded-[14px]"
                      />
                    </div>
                  </div>

                  {/* Expanded Profile Details & Text */}
                  <div className="flex-1 text-center sm:text-left space-y-2.5 min-w-0 py-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h3 className="text-2xl font-bold text-white tracking-wide font-['JetBrains_Mono'] group-hover:text-indigo-300 transition-colors truncate">
                        {firstName} {lastName}
                      </h3>

                      {/* Scaled Button */}
                      <div className="flex items-center justify-center sm:justify-start gap-3 self-center sm:self-auto shrink-0">
                        {/* Reject Button */}
                        <button
                          className="px-5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-600 hover:border-rose-500 text-rose-400 hover:text-white text-sm font-semibold font-['JetBrains_Mono'] transition-all duration-200 cursor-pointer shadow-lg shadow-rose-950/20 active:scale-95 flex items-center gap-2"
                          onClick={() => reviewRequest("rejected", request._id)}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span>Reject</span>
                        </button>

                        {/* Accept Button */}
                        <button
                          className="px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-600 hover:border-emerald-500 text-emerald-400 hover:text-white text-sm font-semibold font-['JetBrains_Mono'] transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-950/20 active:scale-95 flex items-center gap-2"
                          onClick={() => reviewRequest("accepted", request._id)}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Accept</span>
                        </button>
                      </div>
                    </div>

                    {/* Age & Gender Tag */}
                    {(age || gender) && (
                      <p className="text-sm font-semibold text-indigo-400/90 font-['JetBrains_Mono']">
                        {age ? `${age} yrs` : ""}
                        {age && gender ? " • " : ""}
                        {gender ? gender : ""}
                      </p>
                    )}

                    {/* Bio / About */}
                    <p className="text-slate-300/80 text-sm sm:text-base line-clamp-3 leading-relaxed font-sans">
                      {about || "This developer hasn't added an about bio yet."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
