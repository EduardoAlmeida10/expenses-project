export interface User {
    _id: string;
    name: string;
    amountTotal: number
}

export interface Participant {
    user: User;
    paid: boolean;
}

export interface Expense {
    _id: string;
    title: string;
    description: string;
    amount: number;
    participants: Participant[];
}
