import useFetchExpenses from '../../hooks/expenses/useFetchExpense';
import useUpdateExpense from '../../hooks/expenses/useUpdateExpense';

export function Card() {
  const { expenses, loading } = useFetchExpenses();
  const { putPaid, updating } = useUpdateExpense(expenses);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense._id} className="mb-6 bg-white shadow-md rounded-lg p-4 ml-10 mr-10 text-black mt-5 flex flex-col gap-2">
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
                <div className='flex gap-5'>
                  <p>Valor: R$ {p.amount}</p>
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={p.paid}
                    onChange={() => putPaid(expense._id, p.user._id, p.paid)}
                    disabled={updating}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
