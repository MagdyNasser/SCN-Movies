import { Link } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Login from './../Login/Login';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerSuccess } from "../../store/authSlice";

// Yup Validation :
const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  terms: Yup.boolean().oneOf([true], "You must accept the terms"),
});

export default function GetStarted() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <section className="min-h-screen flex items-center justify-center bg-mainColor px-4 pt-24 mb-1">
      <div className="w-full max-w-md bg-card border border-white/10 rounded-2xl p-8 shadow-xl">
        {/* Title */}
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          Create your account
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
          }}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            console.log("REGISTER VALUES:", values);
          }}
        >
          {({ isSubmitting }) => (
            <>
              {/* Form */}
              <Form className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="text-secondF text-sm">Full Name</label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full mt-1 bg-mainColor border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-secondF text-sm">Email</label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full mt-1 bg-mainColor border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-secondF text-sm">Password</label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full mt-1 bg-mainColor border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-3 top-3 text-white/60 hover:text-white transition"
                      aria-label="Toggle password"
                    >
                      <i className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-secondF text-sm">Confirm Password</label>
                  <div className="relative">
                    <Field
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm password"
                      className="w-full mt-1 bg-mainColor border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      className="absolute right-3 top-3 text-white/60 hover:text-white transition"
                      aria-label="Toggle confirm password"
                    >
                      <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                {/* Terms */}
                <div className="text-sm text-secondF">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Field type="checkbox" name="terms" />
                    <span>I agree to the terms & conditions</span>
                  </label>
                  <ErrorMessage
                    name="terms"
                    component="p"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 rounded-lg bg-btn-gradient hover:bg-btn-gradient-hover text-white font-semibold transition disabled:opacity-60"
                >
                  Create Account
                </button>
              </Form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-secondF text-sm">or</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Social Login */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="w-full py-2 rounded-lg border border-white/10 text-white flex items-center justify-center gap-2 hover:bg-white/5 transition"
                >
                  <i className="bi bi-google"></i>
                  Continue with Google
                </button>

                <button
                  type="button"
                  className="w-full py-2 rounded-lg border border-white/10 text-white flex items-center justify-center gap-2 hover:bg-white/5 transition"
                >
                  <i className="bi bi-apple"></i>
                  Continue with Apple
                </button>
              </div>

              {/* Login link */}
              <p className="text-center text-secondF text-sm mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-white hover:underline">
                  Login
                </Link>
              </p>
            </>
          )}
        </Formik>
      </div>
    </section>
  );
}
