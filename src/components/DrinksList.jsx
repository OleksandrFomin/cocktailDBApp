import React, {useContext} from 'react';
import {FlatList, View, Text, Image} from 'react-native';
import {Context} from './Context/context';

const DrinksList = () => {
  const {drinksList, setCurrentPage, isLoading} = useContext(Context);

  return (
    <>
      <FlatList
        keyExtractor={(item) => item.idDrink.toString()}
        data={drinksList}
        onEndReached={() => {
          if (!isLoading) {
            setCurrentPage((page) => page + 1);
          }
        }}
        onEndReachedThreshold={0.3}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 20,
              }}>
              <Image
                style={{height: 100, width: 100, marginRight: 20}}
                source={{uri: item.strDrinkThumb}}
              />
              <Text>{item.strDrink}</Text>
            </View>
          );
        }}
      />
    </>
  );
};

export default DrinksList;
