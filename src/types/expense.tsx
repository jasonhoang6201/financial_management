export enum ExpenseType {
  Meo = 'Meo',
  Petroleum = 'Petroleum',
  Company = 'Company',
  Other = 'Other',
}

export interface Expense {
  type: ExpenseType;
  month: string; // YYYY-MM
  items: {
    name: string;
    amount: number;
    isChecked: boolean;
  }[];
}
