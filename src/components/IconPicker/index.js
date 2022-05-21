import {useEffect, useState} from "react";
import {DropdownButton, FormControl, InputGroup} from "react-bootstrap";
import {iconList} from "./data";
import "./picker.scss";

export default function IconPicker({setter, icon, size}) {
  const [searchParam, setSearchParam] = useState("");
  const [searchList, setSearchList] = useState(iconList);

  useEffect(() => {
    if (searchParam === "") {
      if (searchList.length !== iconList.length) {
        setSearchList(iconList);
      }
    } else {
      const e = iconList.filter((i) => i.search(searchParam) !== -1);
      setSearchList(e);
    }
  }, [searchParam]);

  return (
    <InputGroup className="mb-3">
      <DropdownButton
        as={InputGroup.Append}
        variant="primary"
        title={
          icon !== "" ? (
            <i className={icon} style={{color: "#fff", paddingLeft: 10}} />
          ) : (
            "انتخاب آیکن"
          )
        }
        style={{width: "auto"}}
        align="end"
      >
        <div className="iconSelectorContainer">
          <FormControl
            placeholde="جستجوی آیکن"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            size={size ? size : "sm"}
            className="iconSearch"
          />
          {searchList.map((i, j) => {
            return (
              <i
                className={i}
                onClick={() => {
                  setter(i);
                }}
                key={j}
              />
            );
          })}
        </div>
      </DropdownButton>
      <FormControl value={icon} size={size ? size : "sm"} onChange={() => {}} />
    </InputGroup>
  );
}
