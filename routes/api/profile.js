// the data in the profile itself
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load profile model
const Profile = require("../../models/profile");

// Load User model
const User = require("../../models/User");

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

// @route GET api/profile
// @desc get current user profile
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There's no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

// @route POST api/profile
// @desc update current user profile
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileData = {};
    profileData.user = req.user.id;
    if (typeof req.body.todo !== "undefined") {
      profileData.todo = req.body.todo.split(",");
    }
    if (typeof req.body.done !== "undefined") {
      profileData.done = req.body.done.split(",");
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileData },
        { new: true }
      ).then(profile => res.json(profile));
    });
  }
);

module.exports = router;
