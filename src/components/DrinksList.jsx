import React, {useContext, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  SectionList,
  StyleSheet,
} from 'react-native';
import {Context} from './Context/context';
import Center from './utilities/Center';
import {fonts, colors} from './utilities/style';

const DrinksList = () => {
  const {
    drinksList,
    currentPage,
    setCurrentPage,
    isLoading,
    isFetching,
  } = useContext(Context);

  return (
    <>
      {isLoading ? (
        <Center>
          <ActivityIndicator size={'large'} />
        </Center>
      ) : (
        <SectionList
          keyExtractor={(item) => item.idDrink.toString()}
          sections={drinksList}
          onEndReached={() => {
            // subsuqent api call will  NOT be made if there is an ongoing async action or the last page has been reached
            if (!isLoading && currentPage + 1 < drinksList.length) {
              setCurrentPage((page) => page + 1);
            }
          }}
          onEndReachedThreshold={0.3}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.listTitle}>{title}</Text>
          )}
          renderItem={({item}) => {
            return (
              <View style={styles.listItemContainer}>
                <Image
                  style={styles.listItemImage}
                  source={{uri: item.strDrinkThumb}}
                />
                <Text style={styles.listItemText}>{item.strDrink}</Text>
              </View>
            );
          }}
        />
      )}
      {isFetching && <ActivityIndicator size={'large'} />}
    </>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    fontSize: fonts.sm,
    color: colors.textLight,
    marginTop: 20,
    marginLeft: 20,
  },

  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },

  listItemImage: {height: 100, width: 100, marginRight: 20},
  listItemText: {fontSize: fonts.md, color: colors.textLight},
});

export default DrinksList;
