import { useFormikContext } from "formik";
import { Form } from "react-bootstrap";
import Date from "./Date";
import Icon from "./Icon";
import Location from "./Location";
import Number from "./Number";
import Select from "./Select";
import Text from "./Text";
import Uploader from "./Uploader";

const schemaProccessor = (parentNames, schema, selectedFields) => {
  const fieldArray = [];

  if (parentNames.constructor === String) parentNames = [parentNames];

  const arrayNamePatern = new RegExp(/([A-Z]\w+)\[([0-9])+]/);
  const isArray = arrayNamePatern.test(parentNames[0]);

  const isParent =
    !isArray && (!!schema.fields[parentNames[0]]["_nodes"] || !selectedFields);

  if (isParent && schema.fields[parentNames[0]].type !== "object") {
    parentNames.map((key) => {
      const { type } = schema.fields[key];
      const { label, hidden, readOnly, component } = schema.fields[key].spec;
      fieldArray.push({
        name: key,
        ...{
          type,
          label,
          hidden,
          readOnly,
          component
        }
      });
    });
  } else {
    parentNames.map((parentName) => {
      const index =
        isArray && parentName.match(/\[(?<index>[0-9]+)\]/).groups.index;

      if (isArray)
        parentName = parentName.match(/(?<name>[A-Z]\w+)\[([0-9])+]/).groups
          .name;

      selectedFields = selectedFields
        ? selectedFields
        : Object.keys(schema.fields[parentName].fields);

      selectedFields.map((key) => {
        if (arrayNamePatern.test(parentName))
          parentName = parentName.match(/(?<name>[A-Z]\w+)\[([0-9])+]/).groups
            .name;

        const { type } =
          schema.fields[parentName].type === "array"
            ? schema.fields[parentName].innerType.fields[key]
            : schema.fields[parentName].fields[key];
        const { label, hidden, readOnly, component } =
          schema.fields[parentName].type === "array"
            ? schema.fields[parentName].innerType.fields[key].spec
            : schema.fields[parentName].fields[key].spec;

        parentName =
          schema.fields[parentName].type === "array"
            ? parentName + `[${index}]`
            : parentName;

        fieldArray.push({
          name: key,
          ...{
            parentName,
            type,
            label,
            hidden,
            readOnly,
            component
          }
        });
      });
    });
  }

  return fieldArray;
};

const fieldCreator = {
  string: (props) => <Text key={props.name} {...props} />,
  date: (props) => <Date key={props.name} {...props} />,
  number: (props) => <Number key={props.name} {...props} />,
  select: (props) => <Select key={props.name} {...props} />,
  uploader: (props) => <Uploader key={props.name} {...props} />,
  location: (props) => <Location key={props.name} {...props} />,
  icon: (props) => <Icon key={props.name} {...props} />,
  custom: ({ component: { Body }, ...props }) => <Body {...props} />
};

const Group = ({ names, selectedFields, children }) => {
  const { validationSchema: schema } = useFormikContext();

  return schema ? (
    <>
      {schemaProccessor(
        names,
        schema,
        selectedFields
      ).map(({ type, ...rest }) =>
        fieldCreator[type](
          rest.component ? { ...rest, ...rest.component.props } : rest
        )
      )}
    </>
  ) : (
    <Form.Group>{children}</Form.Group>
  );
};

export default Group;
