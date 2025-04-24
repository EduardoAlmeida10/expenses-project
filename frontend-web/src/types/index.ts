export interface User {
    _id: string;
    name: string;
}

export interface Participant {
    user: User;
    paid: boolean;
}

export interface Expense {
    _id: string;
    title: string;
    description: string;
    participants: Participant[];
}
