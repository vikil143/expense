import CategoryDropdown from '@myapp/components/category-dropdown.component';
import { RootStackScreenProps } from '@myapp/routes/types';
import { addTransaction } from '@myapp/storage/realm-actions';
import { getUUID, openGooglePay } from '@myapp/utilities/common-helpers';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const categories = [
  { label: 'Food', value: 'Food' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Bills', value: 'Bills' },
  { label: 'Groceries', value: 'Groceries' },
  { label: 'Others', value: 'Others' },
];

interface AmountScreenProps extends RootStackScreenProps<"Amount"> {
  // Define any props if needed
}

const AmountScreen = ({ navigation, route } : AmountScreenProps) => {
  const { pa, pn } = route.params; // Extracting UPI details from route params
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  const handlePay = async () => {
    console.log('Paying ₹', amount, 'Note:', note);
    addTransaction({
      amount: parseFloat(amount),
      category: selectedCategory || 'Uncategorized',
      date: new Date(),
      note: note || "No note",
    });
    // await openGooglePay({
    //   pa: pa!, // Payee VPA
    //   pn: pn!, // Payee Name
    //   tn: note, // Transaction Note
    //   am: amount // Amount to pay
    // });
    // You can trigger UPI flow from here
    navigation.popToTop(); // Navigate back to the dashboard after payment
  };

  return (
    <View style={styles.container}>
      {/* Recipient Info */}
      <View style={styles.profileBox}>
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
        <Text style={styles.name}>{pn}</Text>
        <Text style={styles.vpa}>{pa}</Text>
      </View>

      {/* Amount Input */}
      <TextInput
        style={styles.amountInput}
        placeholder="₹0.00"
        placeholderTextColor="#999"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Note */}
      <TextInput
        style={styles.noteInput}
        placeholder="Add a note (optional)"
        value={note}
        onChangeText={setNote}
      />

      <CategoryDropdown
        value={selectedCategory}
        onChange={(val) => setSelectedCategory(val)}
        options={categories}
      />

      {/* Pay Button */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePay}
        disabled={!amount || parseFloat(amount) <= 0}
      >
        <Text style={styles.payText}>Pay ₹{amount || '0.00'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileBox: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  vpa: {
    fontSize: 14,
    color: '#666',
  },
  amountInput: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  noteInput: {
    fontSize: 16,
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  payButton: {
    backgroundColor: '#0079FF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  payText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
