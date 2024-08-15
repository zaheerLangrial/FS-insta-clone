import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8500/api/v1/user/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      });
      if (res.data.success) {
        (e.target.email.value = ""), (e.target.password.value = "");
      }
      console.log("response", res.data);
      toast(res.data.message);
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="border-1 border w-[400px] rounded-md">
        <img
          src="src/assets/Insta-signup-logo.png"
          alt="Insta logo"
          className="w-full h-[150px] object-contain mt-6"
        />

        <form
          className=" w-[90%] mx-auto flex flex-col gap-1"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            name="email"
            className=" bg-[#FAFAFA] w-full p-2 border border-gray-300 rounded-md outline-none text-gray-500"
            placeholder="Enter your email"
          />
          <input
            type="password"
            name="password"
            className=" bg-[#FAFAFA] w-full p-2 border border-gray-300 rounded-md outline-none text-gray-500"
            placeholder="Enter your password"
          />

          <div className="mt-5 mb-10">
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-500 text-white py-2 w-full text-center rounded-lg hover:bg-blue-600 flex justify-center items-center disabled:bg-blue-950"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Log in
            </button>
          </div>
        </form>
      </div>
      <div className="border-1 border w-[400px] rounded-md mt-3 p-6 text-center text-[#737373]">
        <p className=" text-sm">
          Have an account?{" "}
          <Link
            to={"/signup"}
            className="font-semibold text-blue-500 cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
