import axios from "axios";

//const url = 'https://expenses-project-4erz.onrender.com/api/expenses';
const url = 'http://localhost:5000/api/expenses';

export default function useCreateExpense() {
    const createExpense = async ({
        title,
        description,
        participantsIds,
        users
    }: {
        title: string;
        description: string;
        amount: number;
        participantsIds: string[];
        users: { _id: string; amount: number }[];
    }) => {
        if (!title.trim() || !description.trim()) {
            throw new Error('Preencha título e descrição.');
        }

        if (participantsIds.length === 0) {
            throw new Error('Selecione pelo menos um participante.');
        }

        const participants = users
            .filter(user => participantsIds.includes(user._id))
            .map(user => ({
                userId: user._id,
                paid: false,
                amount: user.amount,
            }));

        await axios.post(url, {
            title,
            description,
            participants,
        });
    }

    return { createExpense };
}