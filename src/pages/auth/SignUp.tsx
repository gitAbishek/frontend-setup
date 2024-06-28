import React from "react";
import { Link } from "react-router-dom";
import AuthImg from "../../assets/images/auth-image.jpeg";

import { PATH } from "../../constants/path";

const SignUp: React.FC = () => {
  return (
    <div className="w-full flex flex-wrap  justify-center   lg:justify-between  min-h-screen px-6 lg:px-0 ">
      <div className="w-full md:w-1/2 flex flex-col items-center mt-10 md:mt-20 lg:mt-32">
        <div className="w-full lg:w-[60%] flex flex-col gap-8">
          <h2 className="text-3xl font-bold">Create your Account ✨</h2>

          <div className="border-t border-gray-500 pt-4">
            <p className="text-gray-500 font-light text-sm">
              Have an account?
              <Link to={PATH.login} className="pl-2 text-[#6366f1]">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 ">
        <img src={AuthImg} alt="Authentication" className="h-full" />
      </div>
    </div>
  );
};

export default SignUp;
