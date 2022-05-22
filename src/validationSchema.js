import Yup from "adapters/yupAdapter";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .label("نام")
    .placeholder("نام خود را وارد کنید")
    .required("ورود نام الزامیست"),
  workExperience: Yup.number()
    .label("سابفه کار(سال)")
    .placeholder("سابقه کار خود را وارد نمایید")
    .min(0, "حداقل سال وارد شده برابر با صفر می باشد"),
  birthday: Yup.date().label("تاریخ تولد").required(""),
  resume: Yup.array()
    .label("رزومه")
    .of(Yup.mixed())
    .fieldComponent({
      type: "uploader",
      props: { fileType: "image", acceptFormat: "image/*" },
    }),
});

export default schema;
