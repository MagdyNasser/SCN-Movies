import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-mainColor px-4 pt-24">
      <div className="w-full max-w-md bg-card border border-white/10 rounded-2xl p-8 shadow-xl">
        <h2 className="text-white text-2xl font-bold text-center">
          Welcome back
        </h2>
        <p className="text-secondF text-sm text-center mt-2">
          Login to continue exploring on <span className="text-white">SCN</span>
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            const savedUserStr = localStorage.getItem("scn_user");
            const savedUser = savedUserStr ? JSON.parse(savedUserStr) : null;

            // lw mfish user
            if (!savedUser) {
              setErrors({
                email: "No account found. Please register first.",
              });
              setSubmitting(false);

              // يوديه للريجيستر بعد ثواني صغيرة (اختياري)
              setTimeout(() => navigate("/register"), 800);
              return;
            }

            const okEmail = values.email === savedUser.email;
            const okPass = values.password === savedUser.password;

            if (!okEmail || !okPass) {
              setErrors({
                password: "Invalid email or password.",
              });
              setSubmitting(false);
              return;
            }

            //  Login success
            dispatch(
              loginSuccess({
                name: savedUser.name,
                email: savedUser.email,
              })
            );

            setSubmitting(false);
            navigate("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 mt-6">
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
                    className="w-full mt-1 bg-mainColor border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-3 text-white/60 hover:text-white transition"
                    aria-label="Toggle password"
                  >
                    <i
                      className={`bi ${
                        showPass ? "bi-eye-slash" : "bi-eye"
                      }`}
                    />
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-400 text-xs mt-1"
                />
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-secondF cursor-pointer">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-white/80 hover:text-white transition"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-lg bg-btn-gradient hover:bg-btn-gradient-hover text-white font-semibold transition disabled:opacity-60"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-secondF text-sm">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social (UI فقط) */}
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

        {/* Register link */}
        <p className="text-center text-secondF text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-white hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
