import {useFormikContext} from "formik";
import {useEffect, useState} from "react";
import {Form, FormControl, FormGroup} from "react-bootstrap";

const valueGetter = (values, name) => {
  const valuesName = Object.keys({values})[0];
  const newName = `${valuesName}.${name}`;

  return eval(newName);
};

const FileUploader = ({
  name,
  label,
  multiple, // true/false
  fileType, // image/excel
  acceptFormat,
  style,
}) => {
  const {
    values,
    errors,
    touched,
    setFieldValue: fieldValueSetter,
  } = useFormikContext();

  const [filesDetail, setFilesDetail] = useState();

  useEffect(() => {
    values &&
      values[name] &&
      setFilesDetail(
        valueGetter(values, name).filter((value) => typeof value === "string")
      );
  }, []);

  const handleChange = (e) => {
    let newValues = valueGetter(values, name) || [];
    let newFilesDetail = filesDetail ? filesDetail : [];

    Array.from(e.currentTarget.files).map((file) => {
      newFilesDetail.push({
        url: URL.createObjectURL(file),
        fileName: file.name,
      });
      newValues.push({File: file});
    });

    fieldValueSetter(
      name,
      newValues.filter(({File: value}) => typeof value !== "string"),
      false
    );
    setFilesDetail(newFilesDetail.filter(({url}) => typeof url === "string"));
  };

  const removeHandler = (url) => {
    const index = filesDetail.findIndex((value) => value === url);

    filesDetail.splice(index, 1);
    setFilesDetail(filesDetail);

    valueGetter(values, name).splice(index, 1);

    fieldValueSetter(name, valueGetter(values, name));
  };

  return (
    <Form.Group style={style}>
      <Form.Label>{label}</Form.Label>
      <Form.Group
        style={{
          height: "100%",
          display: "grid",
          gridTemplateRows: "auto 40px",
          justifyItems: "center",
          alignItems: "center",
          border: "1px solid lightgray",
          borderRadius: 5,
          ...style,
        }}
      >
        {fileType === "image" ? (
          <ImagePreview
            fileDetailArray={filesDetail}
            removeHandler={removeHandler}
          />
        ) : (
          <FilePreview
            fileDetailArray={filesDetail}
            removeHandler={removeHandler}
            fileType={fileType}
          />
        )}
        <Form.Label
          style={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            backgroundColor: "lightgray",
            margin: 0,
            padding: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 5,
            fontWeight: 600,
          }}
          htmlFor={`image-multiple-uploader-${name}`}
        >
          <i className="fa fa-cloud-upload" /> آپلود
        </Form.Label>
        <FormControl
          id={`image-multiple-uploader-${name}`}
          name={name}
          type="file"
          onChange={handleChange}
          className={
            touched[name] && errors[name] ? "border border-danger" : null
          }
          style={{display: "none"}}
          multiple={multiple}
          accept={acceptFormat && acceptFormat}
        />
        {touched[name] && errors[name] ? (
          <Form.Label
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 12,
              color: "red",
            }}
          >
            {errors[name]}
          </Form.Label>
        ) : null}
      </Form.Group>
    </Form.Group>
  );
};

export default FileUploader;

const imageStyles = {
  imagesContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    padding: 5,
    overflowY: "auto",
    overflowX: "hidden",
  },
  imageHolder: {
    width: 49,
    height: 49,
    position: "relative",
    backgroundColor: "#eeeeee",
    borderRadius: 3,
  },
  images: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    left: 0,
    color: "red",
    backgroundColor: "white",
    borderRadius: "50%",
    cursor: "pointer",
  },
};

const ImagePreview = ({fileDetailArray, removeHandler}) => (
  <div style={imageStyles.imagesContainer}>
    {fileDetailArray &&
      fileDetailArray.map(({url}) => (
        <div key={`${Date.now()}${url}`} style={imageStyles.imageHolder}>
          <i
            style={imageStyles.deleteButton}
            className="fa fa-times-circle"
            onClick={() => removeHandler(url)}
          />
          <img style={imageStyles.images} src={url} />
        </div>
      ))}
  </div>
);

const fileStyles = {
  filesContainer: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 5,
    padding: 5,
    overflowY: "auto",
    overflowX: "hidden",
  },
  fileHolder: {
    direction: "ltr",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    borderRadius: 3,
    padding: 5,
  },
  files: {
    display: "flex",
    columnGap: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "red",
    backgroundColor: "white",
    borderRadius: "50%",
    cursor: "pointer",
  },
  link: {
    fontSize: 12,
    margin: 0,
  },
};

const FilePreview = ({fileDetailArray, removeHandler, fileType}) => (
  <div style={fileStyles.filesContainer}>
    {fileDetailArray &&
      fileDetailArray.map(({fileName, url}) => (
        <div key={`${Date.now()}${url}`} style={fileStyles.fileHolder}>
          <i
            style={fileStyles.deleteButton}
            className="fa fa-times-circle"
            onClick={() => removeHandler(url)}
          />
          <a href={url} download style={fileStyles.files}>
            <i className={`fas fa-file-${fileType}`}></i>
            <p style={fileStyles.link}>{fileName}</p>
          </a>
        </div>
      ))}
  </div>
);
