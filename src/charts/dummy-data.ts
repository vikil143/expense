import { SCREEN_WIDTH } from "@myapp/utilities/common-data";

export const COLORS = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#5e60ce', '#48bfe3'];

export const padding = { top: 40, right: 20, bottom: 40, left: 30 };

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
  color?: string;
};

export type TypeOfPay = {
    name: string;
    color: string;
}

export const typeOfPay: TypeOfPay[] = [
    { name: "GPay", color: "blue" }, 
    { name: "PhonePay", color: "red" }, 
    { name: "Paytm", color: "orange" }
]

export const lineDataOfGPay: LineData[] = [
    { date: new Date('2025-04-14'), amount: 120, category: 'Food', color: 'blue' },
    { date: new Date('2025-04-15'), amount: 90, category: 'Travel', color: 'blue' },
    { date: new Date('2025-04-16'), amount: 150, category: 'Groceries', color: 'blue' },
    { date: new Date('2025-04-17'), amount: 200, category: 'Rent', color: 'blue' },
    { date: new Date('2025-04-18'), amount: 180, category: 'Food', color: 'blue' },
    { date: new Date('2025-04-19'), amount: 70, category: 'Entertainment', color: 'blue' },
    { date: new Date('2025-04-20'), amount: 100, category: 'Bills', color: 'blue' },
];


export const lineDataOfPhonePay: LineData[] = [
    { date: new Date('2025-04-14'), amount: 100, category: 'Food', color: 'red' },
    { date: new Date('2025-04-15'), amount: 90, category: 'Travel', color: 'red' },
    { date: new Date('2025-04-16'), amount: 200, category: 'Groceries', color: 'red' },
    { date: new Date('2025-04-17'), amount: 150, category: 'Rent', color: 'red' },
    { date: new Date('2025-04-18'), amount: 120, category: 'Food', color: 'red' },
    { date: new Date('2025-04-19'), amount: 150, category: 'Entertainment', color: 'red' },
    { date: new Date('2025-04-20'), amount: 180, category: 'Bills', color: 'red' },
];

export const lineDataOfPytm: LineData[] = [
    { date: new Date('2025-04-14'), amount: 50, category: 'Food', color: 'orange' },
    { date: new Date('2025-04-15'), amount: 20, category: 'Travel', color: 'orange' },
    { date: new Date('2025-04-16'), amount: 100, category: 'Groceries', color: 'orange' },
    { date: new Date('2025-04-17'), amount: 60, category: 'Rent', color: 'orange' },
    { date: new Date('2025-04-18'), amount: 120, category: 'Food', color: 'orange' },
    { date: new Date('2025-04-19'), amount: 160, category: 'Entertainment', color: 'orange' },
    { date: new Date('2025-04-20'), amount: 120, category: 'Bills', color: 'orange' },
];

export const lineGraphDimension = {
    width: SCREEN_WIDTH - padding.left - padding.right,
    height: SCREEN_WIDTH - padding.top - padding.bottom,
}


export type BarData = {
  category: string;
  amount: number;
};

export const barData: BarData[] = [
    { category: 'Food', amount: 320 },
    { category: 'Travel', amount: 190 },
    { category: 'Rent', amount: 500 },
    { category: 'Groceries', amount: 250 },
    { category: 'Entertainment', amount: 150 },
];  

export const barGraphDimension = {
    width: SCREEN_WIDTH - padding.left - padding.right,
    height: SCREEN_WIDTH - padding.top - padding.bottom,
}


