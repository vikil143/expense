// UpiPayment.ts
import { NativeModules } from 'react-native';

const { UpiPayment } = NativeModules;

export const sendUPI = async (
  upiId: string,
  name: string,
  note: string,
  amount: string
) => {
  try {
    const res = await UpiPayment.initiatePayment(upiId, name, note, amount);
    console.log('Result:', res);
  } catch (e) {
    console.error('UPI Error:', e);
  }
};
