const app = require("../firebase");

const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

const auth = getAuth();

vpExpoFirebaseController = {};

vpExpoFirebaseController.doCreateUserWithEmailAndPassword = async function (
  req,
  res,
  next
) {
  const { email, password } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      res.status(200).json({
        status: "success",
        user,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        status: "fail",
        error,
      });
    });
};

module.exports = vpExpoFirebaseController;
