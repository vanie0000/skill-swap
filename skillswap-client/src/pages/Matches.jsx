import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SkillCard from "../components/SkillCard";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("/skills/match", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatches(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch matches", err);
        if (err.response?.status === 401) {
          alert("Please log in to view your matches.");
          navigate("/login");
        }
      }
    };

    fetchMatches();
  }, [token, navigate]);

  return (
    <div>
      <h2>Skill Matches</h2>
      {matches.length === 0 ? (
        <p>No matches found</p>
      ) : (
        matches.map((skill) => (
          <SkillCard key={skill._id} skill={skill} showUser />
        ))
      )}
    </div>
  );
};

export default Matches;
