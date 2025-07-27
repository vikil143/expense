import { getOrCreateEncryptionKey } from '@myapp/utilities/common-helpers';
import Realm from 'realm';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: Date;
  note?: string;
}

// Define your schema
export const TransactionSchema = {
  name: 'Transaction',
  properties: {
    id: 'string',
    amount: 'double',
    category: 'string',
    date: 'date',
    note: 'string?',
  },
  primaryKey: 'id',
};

// Access encrypted Realm
export const openEncryptedRealm = async () => {
  const encryptionKey = await getOrCreateEncryptionKey();

  const realm = await Realm.open({
    path: 'realm-encrypted',
    schemaVersion: 1,
    schema: [TransactionSchema],
    encryptionKey, // This makes your Realm secure
  });

  return realm;
};
