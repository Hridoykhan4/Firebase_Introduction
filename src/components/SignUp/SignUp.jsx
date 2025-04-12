import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    console.log(name, photo);

    /*     const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordPattern.test(password)) {
      return alert(
        `Password must be 6 character, and have one uppercase,one lowercase one number, one special character`
      );
    } */
    /* if (password.length < 6) {
      setErrorMessage(`Password Should Be 6 characters or longer`);
      return;
    } */
    setErrorMessage("");

    if (!terms) {
      setErrorMessage("Please accept our terms and conditions");
      return;
    }

    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        // send verification email address

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Verification Email Sent");
        });

        // Update Profile name and photoURL
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("User Profile Updated");
          })
          .catch((error) => {
            console.log("Profile Update Error", error);
          });
      })
      .catch((error) => {
        console.log("Error", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="card bg-base-100 w-full  mx-auto max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSignUp} className="card-body">
        <h3 className="text-3xl text-center font-bold">Sign Up now!</h3>
        <fieldset className="fieldset">
          <label className="fieldset-label">Name</label>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="name"
            required
          />
          <label className="fieldset-label">photo URL</label>
          <input
            name="photo"
            type="text"
            className="input"
            placeholder="photo"
            required
          />
          <label className="fieldset-label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
            required
          />
          <label className="fieldset-label">Password</label>
          <div className="relative">
            <input
              name="password"
              // type="password"
              type={showPass ? "text" : "password"}
              className="input"
              required
              placeholder="Password"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="btn  btn-xs right-6 top-3  absolute"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box ">
            <label className="fieldset-label">
              <input type="checkbox" name="terms" className="checkbox" />
              Accept Our Terms & Conditions
            </label>
          </fieldset>
          <button className="btn btn-neutral mt-4">Sign Up</button>
        </fieldset>
      </form>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {success && <p className="text-green-600">Successfully created User </p>}

      <p className="m-2">
        Already have an account ? Please{" "}
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
