'use client'

import useExpenses from '../../hooks/useExpense';

export function Card() {

    const { expenses, loading } = useExpenses();

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-4 ml-10 mr-10 text-black mt-10">

                {expenses.map((expense) => (
                    <div key={expense._id} className="mb-6">
                        <h2 className="text-xl font-semibold">{expense.title}</h2>
                        <p className="text-gray-600">{expense.description}</p>
                        <hr className="border-t border-gray-500 my-2" />

                        <ul>
                            {expense.participants.map((p) => (
                                <li
                                    key={p.user._id}
                                    className="flex justify-between items-center text-lg font-semibold mt-2 bg-red-700 text-white p-2 pr-5 rounded-md"
                                >
                                    <p>{p.user.name}</p>
                                    <input type="checkbox" className="w-5 h-5" checked={p.paid} readOnly />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}