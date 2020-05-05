import * as axios from 'axios';

export const getDrinksRequest = async (drinkCategory) => {
  try {
    const res = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategory}`,
    );
    return res.data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesRequest = async () => {
  try {
    const res = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`,
    );
    return res.data.drinks;
  } catch (error) {
    console.log(error);
  }
};
