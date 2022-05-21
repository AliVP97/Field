const routeToOption = ({Id, Name, Children, selfId}, continuous = true) => {
  if (Children.length === 0) {
    if (selfId !== Id) {
      return (
        <option key={Id} value={Id}>
          {Name}
        </option>
      );
    }
  } else {
    if (continuous) {
      return (
        <optgroup key={Id} label={Name}>
          {selfId !== Id && (
            <option key={Id} value={Id}>
              {Name}
            </option>
          )}
          {Children.map((child) =>
            routeToOption({selfId: selfId, ...child}, false)
          )}
        </optgroup>
      );
    } else {
      return (
        selfId !== Id && (
          <option key={Id} value={Id}>
            {Name}
          </option>
        )
      );
    }
  }
};

export default routeToOption;
