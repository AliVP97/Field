import { useFormikContext } from "formik";
import { Form } from "react-bootstrap";

import styles from "./styles";

const Text = ({ parentName, name, label, style, hidden, ...props }) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue
  } = useFormikContext();

  const fieldName = parentName ? parentName + "." + name : name;

  const handleChange = ({ target: { value } }) =>
    value
      ? setFieldValue(fieldName, value)
      : (
          values[parentName].constructor === Object
            ? Object.keys(values[parentName]).length === 1
            : values[parentName].length === 1
        )
      ? setFieldValue(parentName, undefined)
      : setFieldValue(fieldName, undefined);

  return (
    <Form.Group style={style} hidden={hidden}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        name={parentName ? `${parentName}.${name}` : name}
        type="text"
        value={
          parentName
            ? values[parentName] && name && values[parentName][name]
            : name && values[name]
        }
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          touched[parentName] &&
          name &&
          touched[parentName][name] &&
          errors[parentName] &&
          name &&
          errors[parentName][name]
            ? "border border-danger"
            : null
        }
        {...props}
      />
      {touched[parentName] &&
      name &&
      touched[parentName][name] &&
      errors[parentName] &&
      name &&
      errors[parentName][name] ? (
        <Form.Label style={styles.errorField}>
          {name ? errors[parentName][name] : errors[parentName]}
        </Form.Label>
      ) : null}
    </Form.Group>
  );
};

export default Text;
