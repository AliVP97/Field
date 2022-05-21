import React, { useState } from "react";

import { Form, FormikProvider, useFormik } from "formik";
import validationSchema from "./validationSchema";

import Field from "components/Field";

const App = () => {
  const [isFormGroup, setIsFormGroup] = useState(false);

  const formik = useFormik({
    // enable when you're on a edit mode
    // enableReinitialize: true,
    initialValues: { firstName: "" },
    validationSchema: validationSchema
  });

  console.log(isFormGroup);

  return (
    <FormikProvider value={{ validationSchema, ...formik }}>
      <Form>
        {isFormGroup ? (
          <>
            {/* Regular Text Field */}
            <Field.Text
              name="firstName"
              label="نام"
              placeholder="نام خود را وارد کنید"
            />

            {/* Regular Number Field */}
            <Field.Number
              name="workExperience"
              label="سابفه کار(سال)"
              placeholder="سابقه کار خود را وارد نمایید"
            />

            {/* Date Field with date picker */}
            <Field.Date name="birthday" label="تاریخ تولد" />

            {/* File Field */}
            <Field.Uploader
              name="resume"
              label="رزومه"
              fileType="image"
              acceptFormat="image/*"
            />
          </>
        ) : (
          <Field.Group
            name={["firstName", "workExperience", "birthday", "resume"]}
          />
        )}
      </Form>
      <br />
      <div className="is-form-group">
        <label htmlFor="isFormGroup">Form Group Example</label>
        <input
          id="isFormGroup"
          type="checkbox"
          onChange={(e) => setIsFormGroup(e.target.value === "true")}
        />
      </div>
    </FormikProvider>
  );
};

export default App;
