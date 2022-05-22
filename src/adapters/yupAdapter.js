import * as Yup from "yup";

Yup.addMethod(Yup.BaseSchema, "placeholder", function (value) {
  this.spec.placeholder = value === undefined ? "true" : value;
  return this;
});

Yup.addMethod(Yup.BaseSchema, "hidden", function (value) {
  this.spec.hidden = value === undefined ? true : !!value;
  return this;
});

Yup.addMethod(Yup.BaseSchema, "readOnly", function (value) {
  this.spec.readOnly = value === undefined ? true : !!value;
  return this;
});

// type : select / uploader / custom
Yup.addMethod(
  Yup.BaseSchema,
  "fieldComponent",
  function ({ type, props, Body }) {
    this.spec.component =
      type === "custom" && Body ? { Body, props } : { props };
    this.type === "array" &&
      this.spec.component.props &&
      (this.spec.component.props.multiple = true);

    type && (this.type = type);

    return this;
  }
);

export default Yup;
