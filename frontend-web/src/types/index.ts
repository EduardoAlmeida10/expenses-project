export interface User {
    _id: string;
    name: string;
    amountTotal: number
}

export interface Participant {
    user: User;
    paid: boolean;
    amount: number;
}

export interface Expense {
    _id: string;
    title: string;
    description: string;
    participants: Participant[];
}
