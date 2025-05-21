import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { showToastify } from "@/helpers/show-toastify";
import { apiAdmin } from "@/hooks/api_admin";
import { setStorage } from "@/helpers/Storage";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username kiritilishi shart")
    .min(4, "Kamida 4 ta belgidan iborat bo'lishi kerak"),
  email: yup
    .string()
    .required("Email kiritilishi shart")
    .email("Email formatini tekshiring"),
  password: yup
    .string()
    .required("Parol kiritilishi shart")
    .min(6, "Kamida 6 ta belgidan iborat bo'lishi kerak"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Parollar bir xil bo'lishi kerak")
    .required("Parolni tasdiqlash kerak"),
});

const AdminRegister = () => {
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
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await apiAdmin("POST", "/auth/sign-up", {
        username: data.username,
        password: data.password,
        email: data.email,
      });
      if (res.status === 201) {
        setStorage("admin_email", data.email);
        navigate("/admin-confirm");
        showToastify({
          message: "Emailingizga tasdiqlash kodi yuborildi",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      showToastify({
        message: "Bunday Foydalanuvchi allqachon mavjud",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#824fe3] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-center text-3xl font-bold text-[#333]">
          Ro'yxatdan O'tish
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Yangi hisob yaratish uchun malumotlarni kiriting
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Username
            </label>
            <Input
              size="large"
              placeholder="Enter your username"
              {...register("username")}
              className={`!w-full !rounded-md ${
                errors.username ? "!border-red-500" : ""
              }`}
              onChange={(e) =>
                setValue("username", e.target.value, { shouldValidate: true })
              }
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Email
            </label>
            <Input
              size="large"
              placeholder="Enter your email"
              {...register("email")}
              className={`!w-full !rounded-md ${
                errors.email ? "!border-red-500" : ""
              }`}
              onChange={(e) =>
                setValue("email", e.target.value, { shouldValidate: true })
              }
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Password
            </label>
            <Input.Password
              size="large"
              placeholder="Enter your password"
              {...register("password")}
              className={`!w-full !rounded-md ${
                errors.password ? "!border-red-500" : ""
              }`}
              onChange={(e) =>
                setValue("password", e.target.value, { shouldValidate: true })
              }
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <Input.Password
              size="large"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={`!w-full !rounded-md ${
                errors.confirmPassword ? "!border-red-500" : ""
              }`}
              onChange={(e) =>
                setValue("confirmPassword", e.target.value, {
                  shouldValidate: true,
                })
              }
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            loading={loading}
            className="w-full !bg-[#824fe3] !h-11 !rounded-lg font-semibold"
          >
            Sign up
          </Button>
        </form>

        <div className="text-center pt-4">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
          </span>
          <button
            onClick={() => navigate("/admin-login")}
            className="text-sm text-[#824fe3] font-medium hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
