import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 

// quick token check endpoint
function checkToken(req, res) {
  return res.json({ exp: req.exp, user: req.user ?? null });
}

const dataController = {
  async create(req, res, next) {
    try {
      const payload = {
        name: req.body?.name?.trim(),
        email: req.body?.email?.toLowerCase().trim(),
        password: req.body?.password,
      };

      const user = await User.create(payload);

      const token = makeJWT({ _id: user._id, name: user.name, email: user.email });
      res.locals.data = { user, token };
      return next();
    } catch (err) {
      return res.status(400).json({ error: err.message || "Signup failed" });
    }
  },

  async login(req, res, next) {
    try {
      const email = req.body?.email?.toLowerCase().trim();
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json("Bad Credentials");

      const ok = await bcrypt.compare(req.body.password, user.password);
      if (!ok) return res.status(400).json("Bad Credentials");

      const token = makeJWT({ _id: user._id, name: user.name, email: user.email });
      res.locals.data = { user, token };
      return next();
    } catch {
      return res.status(400).json("Bad Credentials");
    }
  },
};

const apiController = {
  auth(req, res) {
    const { token, user } = res.locals.data || {};
    return res.json({ token, user });
  },
};

export { checkToken, dataController, apiController };

/* -- helpers -- */
function makeJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}
