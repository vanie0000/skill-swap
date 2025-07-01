import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../UserProfile.css";
import SkillCard from "../components/SkillCard";


const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return navigate("/login");
    setUser(storedUser);

    const fetchMySkills = async () => {
      try {
        const res = await axios.get("/skills/my");
        setSkills(res.data);
      } catch (err) {
        console.error("Error fetching user posts", err);
      }
    };

    fetchMySkills();
  }, [navigate]);

  const handleDeleteAccount = () => {
    alert("Delete account feature coming soon!");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user.username}'s Profile</h1>
        <p>Email: {user.email}</p>
        <button onClick={handleDeleteAccount} className="danger-button">
          Delete Account
        </button>
      </div>

      <div className="profile-skills">
        <h2>Your Skill Posts</h2>
        {skills.length === 0 ? (
          <p>You haven’t posted any skills yet.</p>
        ) : (
            skills.map((skill) => (
                <SkillCard
                  key={skill._id}
                  skill={skill}
                  onEdit={(id) => navigate(`/edit/${id}`)}
                />
              ))
              )}
      </div>
    </div>
  );
};

export default UserProfile;
