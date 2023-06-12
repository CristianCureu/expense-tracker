const router = require("express").Router();
const { registerUser, loginUser, updateUser } = require("../controllers/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/user/:id", updateUser);

module.exports = router;
