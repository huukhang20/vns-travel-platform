import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginManager = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = "/api/auth/";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    // if (!form.email || !form.password) {
    //   setError("Vui lòng nhập email và mật khẩu.");
    //   return;
    // }

    // try {
    //   const response = await axios.post(API_URL + "login", {
    //     email: form.email,
    //     passwordHash: form.password,
    //     phoneNumber: "000000000",
    //   });

    navigate("/ManagerDashboard");
    // } catch (err) {
    //   setError(
    //     err.response?.data?.message || "Sai thông tin đăng nhập hoặc lỗi máy chủ."
    //   );
    // }
  };

  return (
    <div className="bg-bg-light min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="bg-primary w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A9 9 0 1118.364 4.56M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              VNS Quản Lý
            </h2>
            <p className="text-gray-600">Đăng nhập vào tài khoản quản lý</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                autoComplete="email"
                placeholder="Nhập email của bạn"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                autoComplete="current-password"
                placeholder="Nhập mật khẩu của bạn"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover w-full py-3 px-4 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-3 focus:ring-offset-2 text-center"
              onClick={handleSubmit}
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-4 text-sm text-gray-500">Quản lý mới?</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="text-center">
              <a
                href="/ForgotPassword"
                className="text-primary text-sm font-medium hover:underline transition-colors duration-200"
              >
                Quên mật khẩu?
              </a>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Cần hỗ trợ? Vui lòng liên hệ bộ phận IT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginManager;
