import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }
  //?This profile form should give me a form where I can edit my Data

  return (
    <div>
      <EditProfile user={user} isEdit={true} />
    </div>
  );
};

export default Profile;
