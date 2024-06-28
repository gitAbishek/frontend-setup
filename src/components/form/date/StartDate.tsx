import  { useEffect, forwardRef, useImperativeHandle } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  defaultValue?: Date;
}

interface DatePickerRef {
  focus: () => void;
}

const StartDate = forwardRef<DatePickerRef, Props>(({ defaultValue }, ref) => {
  const { control, setValue } = useFormContext();
  const defaultDateValue = defaultValue ? new Date(defaultValue) : null;

  useEffect(() => {
    if (defaultValue) {
      setValue("start_date", defaultValue);
    }
  }, [defaultValue, setValue]);

  useImperativeHandle(ref, () => ({
    focus: () => console.log("Start date picker focused"),
  }));

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex border-[1px] border-gray-200 dark:border-gray-500 items-center pr-1 px-2 gap-2 rounded-md">
        <div className="text-lg">
          <CiCalendarDate />
        </div>
        <Controller
          control={control}
          name="start_date"
          defaultValue={defaultDateValue}
          render={({ field: { onChange: onDateChange, value } }) => (
            <ReactDatePicker
              dateFormat="yyyy-MM-dd"
              onChange={(dateVal: Date) => {
                onDateChange(dateVal);
              }}
              selected={value ? new Date(value) : defaultDateValue}
              customInput={
                <input className="w-full outline-none dark:bg-[#182235] border-none" />
              }
              placeholderText={"Select Specific Date"}
              autoComplete="off"
              className="w-full text-sm text-gray-400"
              wrapperClassName="w-full border-none outline-none dark:bg-[#182235]"
            />
          )}
        />
      </div>
    </div>
  );
});

export default StartDate;
