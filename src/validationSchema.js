import Yup from "adapters/yupAdapter";

const schema = Yup.object().shape({
  firstName: Yup.string().required("ورود نام الزامیست"),
  birthday: Yup.date().required("")
});

export default schema;
