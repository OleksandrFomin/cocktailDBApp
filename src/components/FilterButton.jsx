import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const FilterButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Filter')}>
      <View style={{paddingHorizontal: 10}}>
        <Icon name="filter" size={30} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FilterButton;
