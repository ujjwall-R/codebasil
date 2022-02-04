import express from "express";
import User from "../models/user.js";
import { auth } from "../middleware/auth.js";
import { getRawData } from "../codechef.js";
import VarificationOTP from "../models/VarificationOTP.js";
import { generateOTP } from "../utils.js/otpGenerator.js";
import bcrypt from "bcryptjs";

const router = new express.Router();

// @description testing
router.get("/hi", async (req, res) => {
  try {
    res.send("Route working.");
  } catch (error) {
    res.status(400).send();
  }
});

//@description Register a new user
//@route POST /api/users
//@access Public
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  const OTP = generateOTP();
  console.log(OTP);
  const varificationOTP = new VarificationOTP({
    owner: user._id,
    token: OTP,
  });

  await varificationOTP.save();

  try {
    await user.save();
    const token = await user.generateAuthToken();
    // console.log(token);
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

router.post("/users/otp", async (req, res) => {
  const user = await User.findByEmail(req.body.email);
  if (!user) {
    return res.status(401).send("User not found!");
  }

  const OTP = await VarificationOTP.findOne({ owner: user._id });
  const isMatch = await bcrypt.compare(req.body.otp, OTP.token);

  if (!isMatch) {
    await User.deleteOne({ email: req.body.email });
    throw new Error("Invalid OTP!");
  }

  user.varified = true;

  await VarificationOTP.findByIdAndDelete(OTP._id);
  await user.save();

  res.status(200).send();

  return;
});

//@description Auth user and get token
//@route POST /users/login
//@access Public
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (!user.varified) {
      throw new Error("user is not verified!");
    }

    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});

router.post("/users/reset/getotp", async (req, res) => {
  try {
    console.log(req.body.email);
    const user = await User.findByEmail(req.body.email);
    const OTP = generateOTP();
    console.log(OTP);
    const varificationOTP = new VarificationOTP({
      owner: user._id,
      token: OTP,
    });
    await varificationOTP.save();
    res.status(200).send("sucess");
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.post("/users/reset", async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);
    const OTP = await VarificationOTP.findOne({ owner: user._id });
    const isMatch = await bcrypt.compare(req.body.otp, OTP.token);
    if (!isMatch) {
      throw new Error("OTP invalid!");
    }
    user.password = req.body.password;
    await VarificationOTP.findByIdAndDelete(OTP._id);
    user.save();
    res.status(200).send("success!");
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});

//@description Update user profile
//@route PUT /users/profile
//@access Private
router.put("/users/profile", auth, async (req, res) => {
  try {
    // console.log(req.body._id);
    const user = req.user;

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.codechefUsername =
        req.body.codechefUsername || user.codechefUsername;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.json({ updatedUser });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

//@description Logout user
//@route POST /users/logout
//@access Private
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send({ message: "logged out successfully" });
  } catch (error) {
    req.status(500).send();
  }
});

//@description Logout from all devices
//@route POST /users/logoutall
//@access Private
router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ message: "Logged out" });
  } catch (error) {
    res.status(500).send();
  }
});

//@description display personal data
//@route POST /users/me
//@access Private
router.get("/users/me", auth, async (req, res) => {
  try {
    const codechefData = await getRawData(req.user.codechefUsername);
    res.send({ user: req.user, codechefData });
  } catch (error) {
    console.log(error);
  }
});

//@description get/search user by email
//@route GET /users/search
//@access Public
router.get("/users/search", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("User not found!");
    }
    const codechefData = await getRawData(user.codechefUsername);

    const userData = [
      { codechefData: codechefData },
      { codeforcesData: {} },
      { hackerrankData: {} },
    ];

    res.send(userData);
  } catch (error) {
    console.log(error);
  }
});

//@description follow other user
//@route POST /users/follow/:email
//@access Private
router.post("/users/follow/:email", auth, async (req, res) => {
  try {
    const userToFollow = await User.findOne({ email: req.params.email });
    const user = req.user;

    if (!userToFollow) {
      throw new Error("No such user exist!");
    }

    if (!user.following.includes(userToFollow.email)) {
      user.following.push(userToFollow.email);
    }

    const updatedUser = await user.save();
    res.json({ updatedUser });
  } catch (error) {
    console.log(error);
  }
});

//@description unfollow user
//@route POST /users/unfollow/:email
//@access Private
router.post("/users/unfollow/:email", auth, async (req, res) => {
  try {
    const user = req.user;

    user.following = user.following.filter((em) => em !== req.params.email);

    const updatedUser = await user.save();
    res.json({ updatedUser });
  } catch (error) {
    console.log(error);
  }
});

export default router;
