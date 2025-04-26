import { useState } from 'react';
import useExpenses from '../../hooks/useExpense';
import axios from 'axios';

export function Card() {
  const { expenses, loading } = useExpenses();
  const [updating, setUpdating] = useState(false);

  const togglePaid = async (expenseId: string, userId: string, currentPaid: boolean) => {
    setUpdating(true);
    try {
      const expenseToUpdate = expenses.find((e) => e._id === expenseId);
      if (!expenseToUpdate) return;

      const updatedParticipants = expenseToUpdate.participants.map((p) =>
        p.user._id === userId ? { ...p, paid: !currentPaid } : p
      );

      await axios.put(`https://expenses-project-4erz.onrender.com/api/expenses/${expenseId}`, {
        title: expenseToUpdate.title,
        description: expenseToUpdate.description,
        participants: updatedParticipants.map((p) => ({
          userId: p.user._id,
          paid: p.paid,
        })),
      });
      
    } catch (err) {
      console.error('Erro ao atualizar participante:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="">
      {expenses.map((expense) => (
        <div key={expense._id} className="mb-6 bg-white shadow-md rounded-lg p-4 ml-10 mr-10 text-black mt-10 flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{expense.title}</h2>
          <p className="text-gray-600">{expense.description}</p>
          <hr className="border-t border-gray-500 my-2" />

          <ul>
            {expense.participants.map((p) => (
              <li
                key={p.user._id}
                className={`flex justify-between items-center text-lg font-semibold mt-2 p-2 pr-5 rounded-md ${p.paid ? 'bg-green-600' : 'bg-red-700'
                  } text-white`}
              >
                <p>{p.user.name}</p>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={p.paid}
                  onChange={() => togglePaid(expense._id, p.user._id, p.paid)}
                  disabled={updating}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
