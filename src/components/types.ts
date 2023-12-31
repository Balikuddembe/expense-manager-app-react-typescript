export interface Expense {
    id: number;
    expense_type: string;
    expense_date: string;
    expense_amount: string;
    description: string;
}

export interface IProfile {
    first_name: string;
    last_name: string;
    email: string;
}