import React, {useContext, useState} from 'react';
import {Context} from './Context/context';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Common/Button';

const Filter = () => {
  const navigation = useNavigation();
  const {
    setDrinkCategories,
    defaultDrinkCategories,
    setCurrentPage,
    setDrinksList,
  } = useContext(Context);

  const [toggledCategories, setToggledCategories] = useState(
    defaultDrinkCategories,
  );

  // copy default categories array and change isChecked prop on press
  const toggleCheckBoxHandler = (id) => {
    const changedCheckbox = toggledCategories.find(
      (category) => category.id === id,
    );
    changedCheckbox.isChecked = !changedCheckbox.isChecked;

    setToggledCategories([...toggledCategories]);
  };

  // create new array containing only isChecked: true items and set it to drinkCategories
  const onApplyHandler = () => {
    setDrinksList([]);
    setCurrentPage(0);
    setDrinkCategories(
      toggledCategories.filter((category) => category.isChecked),
    );

    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {defaultDrinkCategories.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                toggleCheckBoxHandler(item.id);
              }}>
              <View style={styles.filterElementContainer}>
                <Text style={styles.filterElementText}>{item.strCategory}</Text>
                <View style={{marginRight: -40}}>
                  <CheckBox
                    checked={item.isChecked}
                    onPress={() => {
                      toggleCheckBoxHandler(item.id);
                    }}
                    checkedIcon="check"
                    checkedColor="#000"
                    uncheckedColor="rgba(255, 255, 255, 0)"
                    right={true}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Button btnName="Apply" onPressHandler={onApplyHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 30,
  },

  filterElementContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  filterElementText: {
    color: '#7E7E7E',
    fontSize: 16,
  },
});

export default Filter;
