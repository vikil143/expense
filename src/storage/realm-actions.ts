import {v4 as uuidv4} from 'uuid';
import { openEncryptedRealm, Transaction, TransactionSchema } from "./db";
import { stripTime } from '@myapp/utilities/common-helpers';

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const realm = await openEncryptedRealm();
  const results = realm.objects<Transaction>(TransactionSchema.name).sorted('date', true);
  const transactions = results.map(txn => ({...txn}));
  realm.close();
  return transactions;
};

export const getLatestTransactions = async (): Promise<Transaction[]> => {
  const realm = await openEncryptedRealm();
  const results = realm.objects<Transaction>(TransactionSchema.name).sorted('date', true);
  const transactions = results.slice(0, 5).map(txn => ({...txn}));
  realm.close();
  return transactions;
};

export const addTransaction = async (data: Omit<Transaction, 'id'>): Promise<void> => {
  try {
    const realm = await openEncryptedRealm();
    realm.write(() => {
      console.log("Adding Transaction: ", data);
      realm.create(TransactionSchema.name, {
        ...data,
        id: uuidv4(),
      });
    });
    realm.close();
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const updateTransaction = async (id: string, updates: Partial<Transaction>): Promise<void> => {
  const realm = await openEncryptedRealm();
  const txn = realm.objectForPrimaryKey<Transaction>(TransactionSchema.name, id);
  if (!txn) return;

  realm.write(() => {
    Object.entries(updates).forEach(([key, value]) => {
      // @ts-ignore
      txn[key] = value;
    });
  });

  realm.close();
};


export const getTransactionsByDate = async (targetDate: Date) => {
  const realm = await openEncryptedRealm();
  const strippedTarget = stripTime(targetDate);

  const all = realm.objects(TransactionSchema.name);
  const result = all.filtered('date >= $0 AND date < $1',
    strippedTarget,
    new Date(strippedTarget.getTime() + 86400000) // +1 day
  );

  const data = result.map(txn => ({...txn}));
  realm.close();
  return data;
};
