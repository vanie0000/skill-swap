import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅
import SkillCard from "../components/SkillCard";

const MyPosts = () => {
  const [mySkills, setMySkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // ✅ get token from Redux

  const fetchMySkills = async () => {
    try {
      const res = await axios.get("/skills/my", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ add header
      });
      setMySkills(res.data);
    } catch (err) {
      console.error("❌ Fetch failed", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert("Failed to load your posts");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMySkills();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ token here too
      });
      fetchMySkills();
    } catch (err) {
      console.error("❌ Delete failed", err);
      alert("Failed to delete post");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h2>My Skill Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : mySkills.length === 0 ? (
        <p>You haven’t posted any skills yet.</p>
      ) : (
        mySkills.map((skill) => (
          <SkillCard
            key={skill._id}
            skill={skill}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );  
};

export default MyPosts;
