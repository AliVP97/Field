import {useState, useEffect} from "react";
import {useFormikContext} from "formik";
import {Form} from "react-bootstrap";

import IconPicker from "components/IconPicker";

import styles from "./styles";

const Icon = ({parentName, name, label, style, hidden, ...props}) => {
  const {values, errors, touched, handleBlur, setFieldValue} =
    useFormikContext();

  const fieldName = parentName ? parentName + "." + name : name;

  const [icon, setIcon] = useState(values.fieldName);

  useEffect(() => {
    setFieldValue(fieldName, icon);
  }, [icon]);

  return (
    <Form.Group style={style} hidden={hidden} onBlur={handleBlur}>
      {label && <Form.Label>{label}</Form.Label>}
      <IconPicker setter={setIcon} icon={icon} {...props} />
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

export default Icon;
