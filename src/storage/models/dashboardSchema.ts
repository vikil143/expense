import { ObjectId } from "bson";

export interface Dashboard {
  _id: ObjectId;
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  budgetLeft: number;
}

// dashboardSchema.js
export const DashboardSchema = {
  name: 'Dashboard',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    totalBalance: { type: 'double', default: 0 },
    totalIncome: { type: 'double', default: 0 },
    totalExpense: { type: 'double', default: 0 },
    budgetLeft: { type: 'double', default: 0 },
  },
};
