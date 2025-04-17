import { SCREEN_WIDTH } from "@myapp/utilities/common-data";

export const COLORS = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#5e60ce', '#48bfe3'];

export type PieData = {
  category: string;
  amount: number;
};

export const data = [
  { category: 'Food', amount: 350 },
  { category: 'Bills', amount: 200 },
  { category: 'Travel', amount: 150 },
  { category: 'Shopping', amount: 120 },
  { category: 'Entertainment', amount: 180 }
];

export type LineData = {
  date: Date;
  amount: number;
  category: string;
};

export const lineDataOfGPay: LineData[] = [
    { date: new Date('2025-04-14'), amount: 120, category: 'Food' },
    { date: new Date('2025-04-15'), amount: 90, category: 'Travel' },
    { date: new Date('2025-04-16'), amount: 150, category: 'Groceries' },
    { date: new Date('2025-04-17'), amount: 200, category: 'Rent' },
    { date: new Date('2025-04-18'), amount: 180, category: 'Food' },
    { date: new Date('2025-04-19'), amount: 70, category: 'Entertainment' },
    { date: new Date('2025-04-20'), amount: 100, category: 'Bills' },
];


export const lineDataOfPhonePay: LineData[] = [
    { date: new Date('2025-04-14'), amount: 100, category: 'Food' },
    { date: new Date('2025-04-15'), amount: 90, category: 'Travel' },
    { date: new Date('2025-04-16'), amount: 200, category: 'Groceries' },
    { date: new Date('2025-04-17'), amount: 150, category: 'Rent' },
    { date: new Date('2025-04-18'), amount: 120, category: 'Food' },
    { date: new Date('2025-04-19'), amount: 150, category: 'Entertainment' },
    { date: new Date('2025-04-20'), amount: 180, category: 'Bills' },
];

export const lineDataOfPytm: LineData[] = [
    { date: new Date('2025-04-14'), amount: 50, category: 'Food' },
    { date: new Date('2025-04-15'), amount: 20, category: 'Travel' },
    { date: new Date('2025-04-16'), amount: 100, category: 'Groceries' },
    { date: new Date('2025-04-17'), amount: 60, category: 'Rent' },
    { date: new Date('2025-04-18'), amount: 120, category: 'Food' },
    { date: new Date('2025-04-19'), amount: 160, category: 'Entertainment' },
    { date: new Date('2025-04-20'), amount: 120, category: 'Bills' },
];




export const padding = { top: 40, right: 20, bottom: 40, left: 50 };

export const lineGraphDimension = {
    width: SCREEN_WIDTH - padding.left - padding.right,
    height: SCREEN_WIDTH - padding.top - padding.bottom,
}
