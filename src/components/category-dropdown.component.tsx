
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet } from 'react-native';

export type CategoryOption = {
  label: string;
  value: string;
};

type CategoryDropdownProps = {
  value: string | null;
  onChange: (value: string) => void;
  options: CategoryOption[];
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  value,
  onChange,
  options,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CategoryOption[]>(options);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => onChange(callback(value))}
        setItems={setItems}
        placeholder="Select category"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000, // Make sure dropdown overlaps other elements
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
  },
});

export default CategoryDropdown;
