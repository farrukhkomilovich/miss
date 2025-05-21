import { memo, useState } from "react";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { apiAdmin } from "@/hooks/api_admin";
import { getStorage } from "@/helpers/Storage";

const AdminResendCode = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // API ga yuboriladigan ma'lumotlar
      const response = await apiAdmin("POST", "/auth/verify-code", {
        email: email || getStorage("admin_email"),
        password,
        code,
      });
      console.log(response);

      if (response?.status === 201) {
        message.success("Tasdiqlash muvaffaqiyatli yakunlandi");
        navigate("/admin-login");
      } else {
        setError("Kod noto'g'ri yoki muddati tugagan");
      }
    } catch (error) {
      console.error(error);
      setError(
        error?.response?.data?.message ||
          "Tarmoqli xatolik. Iltimos, keyinroq urinib ko‘ring."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#824fe3] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-center text-3xl font-bold text-[#333]">Tasdiqlash</h2>
        <p className="text-center text-gray-500 text-sm">
          Elektron pochta manzilingizga yuborilgan kodni kiriting
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Elektron pochta
            </label>
            <Input
              size="large"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`!w-full !rounded-md ${error ? "!border-red-500" : ""}`}
            />
          </div>

          {/* Parol */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Parol
            </label>
            <Input
              size="large"
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`!w-full !rounded-md ${error ? "!border-red-500" : ""}`}
            />
          </div>

          {/* Kod */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Tasdiqlash kodi
            </label>
            <Input
              size="large"
              placeholder="6 xonali kod"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`!w-full !rounded-md ${error ? "!border-red-500" : ""}`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          {/* Submit button */}
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            loading={loading}
            className="w-full !bg-[#824fe3] !h-11 !rounded-lg font-semibold"
          >
            Tasdiqlash
          </Button>
        </form>

        {/* Yangi kod yuborish */}
        <div className="text-center pt-4">
          <span className="text-sm text-gray-600">Kod kelmadimi? </span>
          <button
            onClick={() => navigate("/admin-resend-code")}
            className="text-sm text-[#824fe3] font-medium hover:underline"
          >
            Yangi kodni yuborish
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminResendCode);
