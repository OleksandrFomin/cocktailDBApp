export const normalizer = (arr) => {
  return arr.map((item, index) => {
    return {
      id: index,
      isChecked: true,
      ...item,
    };
  });
};
