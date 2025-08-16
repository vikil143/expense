import { ObjectId } from "bson";
import { openEncryptedRealm } from "../db";
import { Dashboard, DashboardSchema } from "../models/dashboardSchema";

export const createDashboard = async () => {
  const realm = await openEncryptedRealm();
  const existing = realm.objects(DashboardSchema.name);
  if (existing.length === 0) {
    realm.write(() => {
      realm.create(DashboardSchema.name, {
        _id: new Realm.BSON.ObjectId(),
        totalBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        budgetLeft: 0,
      });
    });
  }
};

export const getDashboard = async () => {
  const realm = await openEncryptedRealm();
  return realm.objects(DashboardSchema.name);
};

export const updateDashboard = async (key: string, value: number) => {
  const realm = await openEncryptedRealm();
  const dashboard = realm.objects(DashboardSchema.name)[0];
  if (dashboard) {
    realm.write(() => {
      (dashboard as any)[key] = value;
    });
  }
};

export const resetDashboard = async () => {
  const realm = await openEncryptedRealm();
  const dashboard = realm.objects("Dashboard")[0];

  if (dashboard) {
    realm.write(() => {
      dashboard.totalBalance = 0;
      dashboard.totalIncome = 0;
      dashboard.totalExpense = 0;
      dashboard.budgetLeft = 0;
    });
  }
};
