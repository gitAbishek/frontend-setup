import React from "react";
import AuthImg from "../..//assets/images/auth-image.jpeg";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import CustomInput from "../../components/form/custom/CustomInput";
import { useForgotPassword } from "../../hooks/auth.hook";
import { showErrorMessage, showSuccessMessage } from "../../utils/toast";
import { getValue } from "../../utils/object";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import { PATH } from "../../constants/path";

const ForgotPassword: React.FC = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const resData = {
        email: data.email,
      };
      const response = await forgotPassword(resData);
      showSuccessMessage(getValue(response, "message"));
      navigate(PATH.resetPassword);
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
              <CustomInput
                type="text"
                name="email"
                placeHolder="Enter Your Email"
                required={true}
              />
              <div className="pt-5">
                <Button
                  title="Send Reset Link"
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

export default ForgotPassword;
