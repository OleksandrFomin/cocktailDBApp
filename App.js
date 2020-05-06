import React, {useEffect, useState, useCallback, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getDrinksRequest, getCategoriesRequest} from './src/components/API/api';
import {Context} from './src/components/Context/context';
import DrinksList from './src/components/DrinksList';
import Filter from './src/components/Filter';
import {NavigationContainer} from '@react-navigation/native';
import {normalizer} from './src/components/utilities/normalizer';
import FilterButton from './src/components/FilterButton';

const Stack = createStackNavigator();

const App = () => {
  const [defaultDrinkCategories, setDefaultDrinkCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const didMountRef = useRef(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategoriesRequest();
      setDefaultDrinkCategories(normalizer(categories));
      setDrinkCategories(normalizer(categories));
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks = await getDrinksRequest(
        drinkCategories[currentPage].strCategory,
      );

      setDrinksList([
        {
          title: drinkCategories[currentPage].strCategory,
          data: [...drinks],
        },
      ]);
      setIsLoading(false);
    };
    fetchDrinks();
  }, [drinkCategories]);

  useEffect(() => {
    const fetchDrinks = async () => {
      setIsFetching(true);
      const drinks = await getDrinksRequest(
        drinkCategories[currentPage].strCategory,
      );
      setDrinksList((drinksList) => [
        ...drinksList,
        {
          title: drinkCategories[currentPage].strCategory,
          data: [...drinks],
        },
      ]);

      setIsFetching(false);
    };

    // mimics componentDidUpdate method
    if (didMountRef.current) {
      fetchDrinks();
    } else {
      didMountRef.current = true;
    }
  }, [currentPage]);

  return (
    <>
      <Context.Provider
        value={{
          currentPage,
          drinksList,
          drinkCategories,
          defaultDrinkCategories,
          setDrinksList,
          setDrinkCategories,
          setCurrentPage,
          isLoading,
          isFetching,
        }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Drinks"
              component={DrinksList}
              options={{
                headerRight: () => <FilterButton />,
                headerStyle: {
                  elevation: 10,
                },
              }}
            />
            <Stack.Screen
              name="Filter"
              component={Filter}
              options={{
                headerStyle: {
                  elevation: 10,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Context.Provider>
    </>
  );
};

export default App;
