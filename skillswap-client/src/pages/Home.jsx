import { useEffect, useState } from 'react';
import axios from '../api/axios';
import SkillCard from "../components/SkillCard";


const Home = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get('/skills');
        setSkills(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div>
      <h2>Available Skill Swaps</h2>
      {skills.map((s) => (
  <SkillCard key={s._id} skill={s} showUser />
))}
    </div>
  );
};

export default Home;
