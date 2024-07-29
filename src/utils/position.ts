export const getPosition = (position: string, positionValues?: any) => {
  const [vertical, horizontal] = position.split("-");
  if (positionValues) {
    return {
      [vertical]: positionValues[0] ? positionValues[0] : "0px",
      [horizontal]: positionValues[1] ? positionValues[1] : "0px",
    };
  }
  return {
    [vertical]: "30px",
    [horizontal]: "30px",
  };
};
