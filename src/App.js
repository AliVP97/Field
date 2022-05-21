import React from "react";

import { Form, FormikProvider, useFormik } from "formik";
import validationSchema from "./validationSchema";

import Field from "components/Field";

const App = () => {
  const formik = useFormik({
    // enable when you're on a edit mode
    // enableReinitialize: true,
    // initialValues: initalData,
    validationSchema: validationSchema
  });

  return (
    <FormikProvider value={{ validationSchema, ...formik }}>
      <Form>
        {/* Regular Text Field */}
        <Field.Text
          name="firstName"
          label="نام"
          placeholder="نام خود را وارد کنید"
        />

        {/* Regular Number Field */}
        <Field.Number name="" label="سابفه کار(سال)" />

        {/* Date Field with date picker */}
        <Field.Date name="birthday" label="تاریخ تولد" />

        {/* File Field */}
        <Field.Uploader
          name="resume"
          label="رزومه"
          fileType="image"
          acceptFormat="image/*"
        />
      </Form>
    </FormikProvider>
  );
};

export default App;
