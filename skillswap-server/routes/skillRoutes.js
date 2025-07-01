const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const auth = require("../middleware/authMiddleware"); 

// Create skill post
router.post("/", auth, async (req, res) => {
  try {
    const newSkill = new Skill({
      skillOffered: req.body.skillOffered,
      skillNeeded: req.body.skillNeeded,
      description: req.body.description,
      user: req.user.id,
    });

    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all skill posts
router.get("/", async (req, res) => {
  const skills = await Skill.find().populate("user", "username");
  res.json(skills);
});

// Get logged-in user's skill posts
router.get("/my", auth, async (req, res) => {
  try {
    console.log("✅ /my endpoint hit");
    console.log("req.user:", req.user);

    const mySkills = await Skill.find({ user: req.user.id });
    res.json(mySkills);
  } catch (err) {
    console.error("❌ Error in /my:", err);
    res.status(500).json({ message: "Server error" });
  }
});



//  Update a skill post
router.put("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    if (skill.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//  Delete a skill post
router.delete("/:id", auth, async (req, res) => {
  try {
    console.log("🟡 DELETE endpoint hit");
    console.log("req.user.id:", req.user.id);
    console.log("req.params.id:", req.params.id);

    const skill = await Skill.findById(req.params.id);
    console.log("Fetched skill:", skill);

    if (!skill) {
      console.log("❌ Skill not found");
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.user.toString() !== req.user.id) {
      console.log("❌ Unauthorized attempt by", req.user.id);
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await skill.deleteOne();
    console.log("✅ Skill deleted");
    return res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error("❌ ERROR deleting skill:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


router.get("/match", auth, async (req, res) => {
  try {
    const mySkills = await Skill.find({ user: req.user.id });

    if (!mySkills.length) {
      return res.status(200).json([]); // gracefully return empty
    }

    const matchedSkills = await Skill.find({
      user: { $ne: req.user.id },
      $or: mySkills.map((s) => ({
        skillOffered: s.skillNeeded,
        skillNeeded: s.skillOffered,
      })),
    }).populate("user", "username");

    res.json(matchedSkills);
  } catch (err) {
    console.error("❌ Error in /match:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
