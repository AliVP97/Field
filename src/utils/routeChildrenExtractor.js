const routeChildrenExtractor = (data) => {
  let newData = [];
  data.map((route) => {
    if (route.Children.length === 0) {
      newData.push(route);
    } else {
      newData.push(route);
      newData = newData.concat(routeChildrenExtractor(route.Children));
    }
  });

  return newData;
};

export default routeChildrenExtractor;
