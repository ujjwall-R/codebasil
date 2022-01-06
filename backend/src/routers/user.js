import express from "express";
import User from "../models/user.js";

const router = new express.Router();

// @description trail
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

//@description Auth user and get token
//@route POST /users/login
//@access Public
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});

//@description Update user profile
//@route PUT /users/profile
//@access Private
router.put("/users/profile", async (req, res) => {
  try {
    // console.log(req.body._id);
    const user = await User.findById(req.body._id);

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

export default router;
