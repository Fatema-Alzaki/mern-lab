import Hoot from "../../models/hoot.js";

// GET /api/hoots
async function index(req, res) {
  try {
    const hoots = await Hoot.find()
      .sort("-createdAt") // newest first
      .populate({ path: "user", select: "name" })
      .exec();

    return res.json(hoots); // 200 by default
  } catch (err) {
    return res.status(500).json({ error: "Unable to load hoots." });
  }
}

// POST /api/hoots
async function create(req, res) {
  // must be authenticated (ensureLoggedIn should also guard this route)
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const text = (req.body?.text ?? "").trim();
  if (!text) return res.status(400).json({ error: "Text is required." });

  try {
    const hoot = await Hoot.create({ text, user: req.user._id });
    const populated = await hoot.populate({ path: "user", select: "name" });
    return res.status(201).json(populated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export default { index, create };
export { index, create };