import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      setErrorMessage(`Password Should Be 6 characters or longer`);
      return;
    }

    setErrorMessage("");

    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log("Error", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
    /* .catch((error) => {
        console.log("Error", error.message))
    setErrorMessage(error.message)
      })
     */
  };

  return (
    <div className="card bg-base-100 w-full  mx-auto max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSignUp} className="card-body">
        <h3 className="text-3xl text-center font-bold">Sign Up now!</h3>
        <fieldset className="fieldset">
          <label className="fieldset-label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
            required
          />
          <label className="fieldset-label">Password</label>
          <input
            name="password"
            type="password"
            className="input"
            required
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Sign Up</button>
        </fieldset>
      </form>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {
        success && <p className="text-green-600">Successfully created User </p>
      }
    </div>
  );
};

export default SignUp;
