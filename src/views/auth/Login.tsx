import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
// import { apiAdmin } from "@/hooks/api_admin";
import { DataContext } from "@/context/DataContext";
import { showToastify } from "@/helpers/show-toastify";
import { setStorage } from "@/helpers/Storage";

interface FormData {
  username: string;
  password: string;
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username kiritilishi shart")
    .min(4, "Kamida 4 ta belgidan iborat bo'lishi kerak"),
  password: yup
    .string()
    .required("Parol kiritilishi shart")
    .min(6, "Kamida 6 ta belgidan iborat bo'lishi kerak"),
});

export default function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { generateToken } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!isValid) return;
    setLoading(true);
    try {
      console.log(data);
      // const res = await apiAdmin("POST", "/auth/sign-in", data);
      // if (res.status === 200) {
        // generateToken(res?.data?.data?.accessToken);
        generateToken("adawdawdawdawdwadawdaw");
        // setStorage("admin_token", res?.data?.data?.accessToken);
        setStorage("admin_token", "adawdawdawdawdwadawdaw");
        showToastify({
          message: "Login muvaffaqiyatli amalga oshirildi",
          type: "success",
        });
      // }
    } catch (error) {
      console.log(error);
      showToastify({
        message: "login yoki parol xato, iltimos tekshirib qaytadan urinib ko'ring",
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
          Xush Kelibsiz 👋
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Sahifaga kirish uchun username va parolni kiriting
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

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate("/admin-forgot-password")}
              className="text-sm text-[#824fe3] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            loading={loading}
            className="w-full !bg-[#824fe3] !h-11 !rounded-lg font-semibold"
          >
            Login
          </Button>
        </form>

        <div className="text-center pt-4">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <button
            onClick={() => navigate("/admin-register")}
            className="text-sm text-[#824fe3] font-medium hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
