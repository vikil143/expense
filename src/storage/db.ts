import { getOrCreateEncryptionKey } from '@myapp/utilities/common-helpers';
import Realm from 'realm';
import { DashboardSchema } from './models/dashboardSchema';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: Date;
  note?: string;
}

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
    schemaVersion: 2,
    schema: [TransactionSchema, DashboardSchema],
    encryptionKey, // This makes your Realm secure
    migration: (oldRealm, newRealm) => {
      if (oldRealm.schemaVersion < 2) {
        // Handle migration logic (if any)
      }
    },
  });

  return realm;
};
