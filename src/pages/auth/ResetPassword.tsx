import React from "react";
import AuthImg from "../..//assets/images/auth-image.jpeg";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import CustomInput from "../../components/form/custom/CustomInput";
import { useForgotPasswordConfirm } from "../../hooks/auth.hook";
import { showErrorMessage, showSuccessMessage } from "../../utils/toast";
import { getValue } from "../../utils/object";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import Button from "../../components/common/Button/Button";

const ResetPasswordChange: React.FC = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const { mutateAsync: changePassword, isPending } = useForgotPasswordConfirm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const resData = {
        email: data.email,
        code: data.otp,
        password: data.password,
      };
      const response = await changePassword(resData);
      showSuccessMessage(getValue(response, "message"));
      navigate(PATH.login);
    } catch (err) {
      showErrorMessage(getValue(err, "message"));
    }
  };

  return (
    <div className="w-full flex flex-wrap  justify-center   lg:justify-between  h-screen px-6 lg:px-0 overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col items-center mt-10 md:mt-20 lg:mt-32">
        <div className="w-full lg:w-[60%] flex flex-col justify-center  gap-8 h-[80vh]">
          <h2 className="text-3xl font-bold">Reset your Password ✨</h2>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <CustomInput
                  type="text"
                  name="email"
                  placeHolder="Enter Your Email"
                  required={true}
                />

                <CustomInput
                  type="text"
                  name="otp"
                  placeHolder="Enter your otp"
                  required={true}
                />

                <CustomInput
                  type="password"
                  name="password"
                  placeHolder="Enter Your Password"
                  required={true}
                />
              </div>

              <div className="pt-5">
                <Button
                  title="Submit"
                  onClick={() => {}}
                  disabled={isPending}
                  styles="bg-[#6366f2]"
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 ">
        <img src={AuthImg} alt="Authentication" className="h-full" />
      </div>
    </div>
  );
};

export default ResetPasswordChange;
