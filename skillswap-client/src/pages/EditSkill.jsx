import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

const EditSkill = () => {
  const { id } = useParams(); // Get skill ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    skillOffered: "",
    skillNeeded: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing skill data on load
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axios.get(`/skills`);
        const skill = res.data.find((s) => s._id === id);

        if (!skill) {
          alert("Skill not found");
          navigate("/my");
        } else {
          setForm({
            skillOffered: skill.skillOffered,
            skillNeeded: skill.skillNeeded,
            description: skill.description,
          });
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching skill", err);
        alert("Could not load skill.");
        navigate("/my");
      }
    };

    fetchSkill();
  }, [id, navigate]);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/skills/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Skill updated!");
      navigate("/my");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update skill.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Edit Your Skill Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="skillOffered"
          value={form.skillOffered}
          onChange={handleChange}
          placeholder="Skill you offer"
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          name="skillNeeded"
          value={form.skillNeeded}
          onChange={handleChange}
          placeholder="Skill you need"
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <button type="submit">Update Skill</button>
      </form>
    </div>
  );
};

export default EditSkill;
