import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
function AddWorker() {
  const toast = useRef(null);

  const show = (data) => {
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: data,
    });
  };
  const defaultValues = {
    name: "",
    phoneNumber: "",
    gender: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });
  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };
  const onSubmit = (data) => {
    //call api xong roi thong bao
    show("Add successfully");

    reset();
  };
  

  return (
    <div className="flex justify-content-center">
      <h1>Add woker</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-column gap-2"
      >
        <Toast ref={toast} />
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required." }}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.name })}
              ></label>
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Name</label>
              </span>
              {getFormErrorMessage(field.name)}
            </>
          )}
        />
        <br />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: "Phone number is required.",
            pattern: {
              value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
              message: "Invalid phone number format.",
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.phoneNumber })}
              ></label>
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Phone Number</label>
              </span>
              {getFormErrorMessage(field.name)}
            </>
          )}
        />
        <br />
        <Controller
          name="gender"
          control={control}
          rules={{ required: "Gender is required." }}
          render={({ field }) => (
            <>
              <label htmlFor={`gender`}>Choose Gender</label>
              <br />
              <div className="p-field-radiobutton">
                <RadioButton
                  id={`${field.name}-male`}
                  inputId={`${field.name}-male`}
                  name={field.name}
                  value="male"
                  onChange={(e) => field.onChange(e.target.value)}
                  checked={field.value === "male"}
                />
                <label htmlFor={`${field.name}-male`}>Male</label>
              </div>
              <div className="p-field-radiobutton">
                <RadioButton
                  id={`${field.name}-female`}
                  inputId={`${field.name}-female`}
                  name={field.name}
                  value="female"
                  onChange={(e) => field.onChange(e.target.value)}
                  checked={field.value === "female"}
                />
                <label htmlFor={`${field.name}-female`}>Female</label>
              </div>
              {getFormErrorMessage(field.name)}
            </>
          )}
        />

        <br />
        <br />
        <Button label="Add worker" type="submit" icon="pi pi-check" />
      </form>
    </div>
  );
}
export default AddWorker;
