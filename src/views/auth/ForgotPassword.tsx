import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

interface FormData {
  email: string;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email kiritilishi shart")
    .email("To'g'ri email manzil kiriting"),
});

const AdminForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (data: FormData) => {
    setLoading(true);
    try {
      console.log("Reset link yuborish: ", data);
      // TODO: Reset link yuborish uchun API chaqiruvi bu yerga yoziladi

      // showToastify({ message: "Reset link yuborildi", type: "success" });
    } catch (error) {
      console.error("Xatolik:", error);
      // showToastify({ message: "Xatolik yuz berdi", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#824fe3] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <Input
              size="large"
              placeholder="Email"
              {...register("email")}
              className={`w-full transition-all duration-300 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                errors.email ? "!border-red-500" : ""
              }`}
              onChange={(e) =>
                setValue("email", e.target.value, { shouldValidate: true })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/admin-login")}
              className="text-sm text-[#824fe3] hover:underline font-medium"
            >
              Back to Sign in
            </button>
          </div>

          <Button
            htmlType="submit"
            disabled={loading}
            loading={loading}
            type="primary"
            size="large"
            className="w-full !h-11 rounded-lg font-semibold !bg-[#824fe3]"
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
