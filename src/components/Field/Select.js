import {useState} from "react";
import {useFormikContext} from "formik";
import {Form} from "react-bootstrap";

import ReactSelect from "react-select";

import styles from "./styles";

const Select = ({
  parentName,
  name,
  label,
  options,
  children,
  style,
  hidden,
  type = "number",
  multiple,
  ...props
}) => {
  const {values, errors, touched, handleBlur, setFieldValue} =
    useFormikContext();

  const fieldName = parentName ? parentName + "." + name : name;

  const handleChange = ({target: {value}}) =>
    value
      ? setFieldValue(fieldName, type === "number" ? parseInt(value) : value)
      : (
          values[parentName].constructor === Object
            ? Object.keys(values[parentName]).length === 1
            : values[parentName].length === 1
        )
      ? setFieldValue(parentName, undefined) // clean parent key if null
      : setFieldValue(fieldName, undefined); // clean itself if null

  return (
    <Form.Group style={style} hidden={hidden}>
      {label && <Form.Label>{label}</Form.Label>}
      {multiple ? (
        <MultiSelect
          parentName={parentName}
          name={parentName ? `${parentName}.${name}` : name}
          options={
            options &&
            options.map(({Value, Id}) => ({
              value: Id,
              label: Value,
            }))
          }
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
        />
      ) : (
        <Form.Select
          name={parentName ? `${parentName}.${name}` : name}
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
        >
          {options
            ? options.map(({Value, Id}) => (
                <option key={Id} value={Id}>
                  {Value}
                </option>
              ))
            : children && children}
        </Form.Select>
      )}
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

const MultiSelect = ({parentName, name, options}) => {
  const {values, setFieldValue} = useFormikContext();

  const [value, setValue] = useState();

  const defaultOptions = {
    isMulti: true,
    isRtl: true,
    isSearchable: true,
    placeholder: "انتخاب نمایید",
  };

  const handleChange = (selectedOption) => {
    selectedOption.length === 0
      ? (
          values[parentName].constructor === Object
            ? Object.keys(values[parentName]).length === 1
            : values[parentName].length === 1
        )
        ? setFieldValue(parentName, undefined) // clean parent key if null
        : setFieldValue(name, undefined) // clean itself if null
      : setFieldValue(
          name,
          selectedOption.map(({value}) => value)
        );

    setValue(selectedOption);
  };

  return (
    <ReactSelect
      onChange={handleChange}
      options={options}
      value={value}
      {...defaultOptions}
    />
  );
};

export default Select;
