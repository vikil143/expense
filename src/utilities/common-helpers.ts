import EncryptedStorage from 'react-native-encrypted-storage';
import { UpiParams } from './common-types';
import { Linking } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
  return uuidv4();
};

export const stripTime = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getOrCreateEncryptionKey = async () => {
  const existingKey = await EncryptedStorage.getItem('realm_key');

  if (existingKey) {
    return Uint8Array.from(JSON.parse(existingKey));
  }

  // Generate a new 64-byte random encryption key
  const key = Array.from({ length: 64 }, () => Math.floor(Math.random() * 256));

  // Store securely
  await EncryptedStorage.setItem('realm_key', JSON.stringify(key));

  return Uint8Array.from(key);
};

export const checkAndTriggerNewDay = async (onNewDay: () => void) => {
  const today = new Date().toDateString(); // e.g., "Sun Jul 27 2025"

  try {
    const stored = await EncryptedStorage.getItem('last_active_date');

    if (stored !== today) {
      await EncryptedStorage.setItem('last_active_date', today);
      onNewDay(); // 🔁 Trigger logic on new day
    }
  } catch (error) {
    console.error('Error checking/storing date:', error);
  }
};

export const parseUpiUri = (uri: string): Record<string, string> => {
  const result: Record<string, string> = {};

  if (!uri.startsWith('upi://pay')) return result;

  const query = uri.split('?')[1];
  if (!query) return result;

  const pairs = query.split('&');

  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    if (key && value) {
      result[key] = decodeURIComponent(value);
    }
  }

  return result;
};

export const generateUpiUrl = ({
  payeeVpa,
  payeeName,
  transactionNote,
  amount,
  currency = "INR"
}: {
    payeeVpa: string;
    payeeName: string;
    transactionNote: string;
    amount: string;
    currency?: string;
}) => {
  return (
    `upi://pay?pa=${payeeVpa}&pn=${payeeName}` +
    `&tn=${transactionNote}&am=${amount}&cu=${currency}`
  );
};


export const openGooglePay = async ({pa, pn, tn, am}: { pa: string; pn: string; tn: string; am: string  }) => {
  const upiUrl = generateUpiUrl({
    payeeVpa: pa,
    payeeName: pn,
    transactionNote: tn,
    amount: am,
    currency: 'INR'
  });

  try {
    const supported = await Linking.canOpenURL(upiUrl);
    if (supported) {
      await Linking.openURL(upiUrl);
    } else {
      console.warn("GPay or UPI not supported");
    }
  } catch (e) {
    console.error("Failed to open GPay:", e);
  }
};
