// adds id and isChecked properties to the initial array returned by an API

export const normalizer = (arr) => {
  return arr.map((item, index) => {
    return {
      id: index,
      isChecked: true,
      ...item,
    };
  });
};
