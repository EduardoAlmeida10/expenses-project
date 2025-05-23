import { useState } from 'react';
import axios from 'axios';
import { Expense } from '@/types';

const url = 'https://expenses-project-4erz.onrender.com/api/expenses';
//const url = 'http://localhost:5000/api/expenses';

export default function useUpdateExpense(expenses: Expense[]) {
  const [updating, setUpdating] = useState(false);

  const putPaid = async (expenseId: string, userId: string, currentPaid: boolean) => {
    setUpdating(true);
    try {
      const expenseToUpdate = expenses.find((e) => e._id === expenseId);
      if (!expenseToUpdate) return;

      const updatedParticipants = expenseToUpdate.participants.map((p) =>
        p.user._id === userId ? { ...p, paid: !currentPaid } : p
      );

      await axios.put(`${url}/${expenseId}`, {
        title: expenseToUpdate.title,
        description: expenseToUpdate.description,
        participants: updatedParticipants.map((p) => ({
          userId: p.user._id,
          paid: p.paid,
          amount: p.amount
        })),
      });
    } catch (err) {
      console.error('Erro ao atualizar participante:', err);
    } finally {
      setUpdating(false);
    }
  };

  return { putPaid, updating };
    
}
