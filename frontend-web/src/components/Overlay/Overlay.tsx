import { useState } from 'react';
import { CircleX } from 'lucide-react';
import useFetchUsers from '../../hooks/users/useFetchUser';
import useCreateExpense from '../../hooks/expenses/useCreateExpense';

export function Overlay({ setOpenOverlay }: { setOpenOverlay: (open: boolean) => void }) {
    const { users, loading } = useFetchUsers();
    const { createExpense } = useCreateExpense();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [participants, setParticipants] = useState<{ _id: string; amount: number }[]>([]);

    const handleUserToggle = (userId: string, checked: boolean) => {
        if (checked) {
            setParticipants((prev) => [...prev, { _id: userId, amount: 0 }]);
        } else {
            setParticipants((prev) => prev.filter((p) => p._id !== userId));
        }
    };

    const handleAmountChange = (userId: string, value: number) => {
        setParticipants((prev) =>
            prev.map((p) => (p._id === userId ? { ...p, amount: value } : p))
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const amount = participants.reduce((sum, p) => sum + p.amount, 0);
        const participantsIds = participants.map((p) => p._id);

        try {
            await createExpense({
                title,
                description,
                amount,
                participantsIds,
                users: participants,
            });
            setTitle('');
            setDescription('');
            setParticipants([]);
            setOpenOverlay(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message || 'Erro ao adicionar despesa.');
            }
        }
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 ml-3 mr-3">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                <h1 className="text-2xl font-bold text-black mb-4">Adicionar despesa</h1>
                <CircleX
                    onClick={() => setOpenOverlay(false)}
                    className="absolute top-2 right-2 text-black cursor-pointer"
                />
                <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit}>
                    <label className="flex flex-col">
                        <span className="text-[18px] font-bold mb-1">Título</span>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-[18px] font-bold mb-1">Descrição</span>
                        <textarea
                            name="descricao"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </label>
                    <div className="flex flex-col">
                        <span className="text-[18px] font-bold mb-1">Participantes</span>
                        {users.map((user) => {
                            const isSelected = participants.some((p) => p._id === user._id);
                            const amount = participants.find((p) => p._id === user._id)?.amount || 0;

                            return (
                                <div key={user._id} className="flex flex-col gap-1 mb-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={(e) =>
                                                handleUserToggle(user._id, e.target.checked)
                                            }
                                        />
                                        <span>{user.name}</span>
                                    </label>
                                    {isSelected && (
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded px-2 py-1 w-30"
                                            placeholder="Valor"
                                            min={0}
                                            value={amount}
                                            onChange={(e) =>
                                                handleAmountChange(
                                                    user._id,
                                                    parseFloat(e.target.value) || 0
                                                )
                                            }
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 transition-colors"
                    >
                        Adicionar despesa
                    </button>
                </form>
            </div>
        </div>
    );
}
