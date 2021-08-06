const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Ride, Location } = require("../models");

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll();

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("login-page", {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup-page", {});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {


    res.render("profile", {
    profile: req.session.profile,
    loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/driver", async (req, res) => {
  try {


    res.render("driver-dashboard", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {

    const userData = await User.findAll();

    const rideData = await Ride.findAll();

    const locationData = await Location.findAll();

    const locations = locationData.map((location) =>
      location.get({ plain: true })
    );

    const users = userData.map((user) =>
      user.get({ plain: true })
    );

    const ride = rideData.map((rides) =>
      rides.get({ plain: true })
    );

    res.render("dashboard", {
      users,
      ride,
      locations,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
