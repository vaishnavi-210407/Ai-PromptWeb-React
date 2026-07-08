import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [step, setStep] = useState(1); // 1: enter email, 2: enter new password
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError("");
    const users = JSON.parse(localStorage.getItem("autoverse_users") || "[]");
    const found = users.find((u) => u.email === email);
    if (!found) {
      setError("No account found with this email.");
      return;
    }
    setStep(2);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      resetPassword({ email, newPassword });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-md bg-navy-900 border border-navy-700 rounded-2xl p-8 shadow-xl shadow-black/40">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-400 tracking-wide">AutoVerse</h1>
          <p className="text-gray-400 text-sm mt-1">Reset your password</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2 mb-4">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg px-4 py-3 mb-6">
              Password reset successful. You can now sign in.
            </div>
            <Link
              to="/login"
              className="inline-block w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold rounded-lg py-2.5 transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold rounded-lg py-2.5 transition-colors"
            >
              Verify Email
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                placeholder="Re-enter new password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold rounded-lg py-2.5 transition-colors"
            >
              Reset Password
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-400 mt-6">
          Remembered your password?{" "}
          <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}