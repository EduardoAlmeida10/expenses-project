import { useState } from 'react';
import { CircleX } from 'lucide-react';
import useFetchUsers from '../../hooks/users/useFetchUser';
import useCreateExpense from '../../hooks/expenses/useCreateExpense'

export function Overlay({ setOpenOverlay }: { setOpenOverlay: (open: boolean) => void }) {
    const { users, loading } = useFetchUsers();
    const {createExpense} = useCreateExpense();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createExpense({
                title,
                description,
                participantsIds: selectedUsers,
                users,
            });
            setTitle('');
            setDescription('');
            setSelectedUsers([]);
            setOpenOverlay(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message || 'Erro ao adicionar despesa.');
            }
        }
    };

    if (loading) return <div>Carregando...</div>

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
                        {users.map((user) => (
                            <label key={user._id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={user._id}
                                    checked={selectedUsers.includes(user._id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedUsers([...selectedUsers, user._id]);
                                        } else {
                                            setSelectedUsers(selectedUsers.filter(id => id !== user._id));
                                        }
                                    }}
                                />
                                <span>{user.name}</span>
                            </label>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className={"bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 transition-colors"}
                    >
                        Adicionar despesa
                    </button>
                </form>
            </div>
        </div>
    );
}
