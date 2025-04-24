import { CircleX } from 'lucide-react';

export function Overlay({ setOpenOverlay }: { setOpenOverlay: (open: boolean) => void }) {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 ml-3 mr-3">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                <h1 className="text-2xl font-bold text-black mb-4">Adicionar despesa</h1>
                <CircleX
                    onClick={() => setOpenOverlay(false)}
                    className="absolute top-2 right-2 text-black cursor-pointer"
                />
                <form className="flex flex-col gap-4 text-black">
                    <label className="flex flex-col">
                        <span className="text-[18px] font-bold mb-1">Título</span>
                        <input
                            type="text"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-[18px] font-bold mb-1">Descrição</span>
                        <textarea
                            name="descricao"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </label>
                </form>
            </div>
        </div>
    );
}
