import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import Constants from 'expo-constants';


export default  function ElevatorRow({ id, title, selected, onSelect }) {

    const onSelect = React.useCallback(
        id => {
          const newSelected = new Map(selected);
          newSelected.set(id, !selected.get(id));
    
          setSelected(newSelected);
        },
        [selected],
    );
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[
          styles.item,
          { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );

    
}