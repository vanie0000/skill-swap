import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ import useSelector

const CreateSkill = () => {
  const [form, setForm] = useState({
    skillOffered: "",
    skillNeeded: "",
    description: "",
  });

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // ✅ get token from Redux

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/skills", form, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ pass token manually
        },
      });
      alert("Skill posted!");
      navigate("/home");
    } catch (err) {
      alert("Post failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="skillOffered"
        placeholder="I can help with..."
        onChange={handleChange}
        required
      />
      <input
        name="skillNeeded"
        placeholder="Looking for help with..."
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Extra details..."
        onChange={handleChange}
        required
      />
      <button type="submit">Post Skill</button>
    </form>
  );
};

export default CreateSkill;
