const dms2Degree = ([degrees, minutes, seconds], precision) =>
  precision
    ? (degrees + minutes / 60 + seconds / 3600).toFixed(precision)
    : degrees + minutes / 60 + seconds / 3600;

const degree2Dms = (degree, precision) => {
  const degrees = parseInt(degree);
  const minutes = parseInt((degree - degrees) * 60);
  const seconds = precision
    ? ((degree - degrees - minutes / 60) * 3600).toFixed(precision)
    : (degree - degrees - minutes / 60) * 3600;

  return [degrees, minutes, seconds];
};

const degreeDmsConvertor = {
  dms2Degree,
  degree2Dms,
};

export default degreeDmsConvertor;
