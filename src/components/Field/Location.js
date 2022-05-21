import {useEffect, useState} from "react";
import {useFormikContext} from "formik";
import {Modal, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import UTMLatLng from "utm-latlng";

import Map from "components/Map";

const utmHandler = new UTMLatLng();

const Location = ({
  fieldConfig: {degree: degreeFieldName, dms: dmsFieldName, utm: utmFieldName},
  buttonStyle,
}) => {
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState();
  const [coordinate, setCoordinate] = useState();

  const {values, setFieldValue} = useFormikContext();

  useEffect(() => {
    const center = {};

    if (degreeFieldName) {
      if (Object.keys(degreeFieldName).length !== 0) {
        for (const key in degreeFieldName) {
          center[key] = values[degreeFieldName[key]];
        }
      }
    }

    if (dmsFieldName) {
      if (Object.keys(dmsFieldName).length !== 0) {
        for (const key in dmsFieldName) {
          center[key] = values[dmsFieldName[key]];
        }
      }
    }

    if (utmFieldName) {
      if (Object.keys(utmFieldName).length !== 0) {
        const utm = {};
        for (const key in utmFieldName) {
          utm[key] = values[utmFieldName[key]];
        }
        Object.assign(
          center,
          utmHandler.convertUtmToLatLng(
            utm.Easting,
            utm.Northing,
            utm.ZoneNumber,
            utm.ZoneLetter
          )
        );
      }
    }

    center.lat &&
      center.lng &&
      setOptions({
        center: center,
        zoom: 10,
      });
  }, [
    degreeFieldName && values[degreeFieldName.lat],
    degreeFieldName && values[degreeFieldName.lng],
    dmsFieldName && values[dmsFieldName.lat],
    dmsFieldName && values[dmsFieldName.lng],
    utmFieldName && values[utmFieldName.Easting],
    utmFieldName && values[utmFieldName.Northing],
    utmFieldName && values[utmFieldName.zoneLetter],
    utmFieldName && values[utmFieldName.ZoneNumber],
  ]);

  const submit = async () => {
    if (degreeFieldName) {
      for (const key in coordinate.degree) {
        await setFieldValue(degreeFieldName[key], coordinate.degree[key]);
      }
    }

    if (dmsFieldName) {
      for (const key in coordinate.dms) {
        await setFieldValue(dmsFieldName[key], coordinate.dms[key]);
      }
    }

    if (utmFieldName) {
      for (const key in coordinate.utm) {
        await setFieldValue(utmFieldName[key], coordinate.utm[key]);
      }
    }

    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        centered
        scrollable={true}
      >
        <Modal.Header closeButton />
        <Modal.Body>
          {show && (
            <Map
              handleChange={setCoordinate}
              getPosition
              options={{...options}}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={submit}>
            ثبت موقعیت
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={buttonStyle}>
        <Button
          style={{width: "100%"}}
          variant="primary"
          onClick={() => setShow(true)}
        >
          انتخاب از روی نقشه
        </Button>
      </div>
    </>
  );
};

Location.propTypes = {
  // field name assignment
  fieldConfig: PropTypes.shape({
    degree: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string,
    }),
    dms: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string,
    }),
    utm: PropTypes.shape({
      Easting: PropTypes.string,
      Northing: PropTypes.string,
      ZoneNumber: PropTypes.string,
      zoneLetter: PropTypes.string,
    }),
  }),
};

export default Location;
