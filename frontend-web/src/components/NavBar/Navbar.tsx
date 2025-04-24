import { CircleDollarSign } from 'lucide-react';
import { CirclePlus } from 'lucide-react';

export default function NavBar({ setOpenOverlay }: { setOpenOverlay: (open: boolean) => void }) {
    return (
        <div className="bg-gray-700 h-16 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
                <CircleDollarSign className='w-10 h-10' />
                <h1 className="text-white text-2xl font-bold">Expense web</h1>
            </div>
            <CirclePlus className='w-10 h-10 cursor-pointer' onClick={() => setOpenOverlay(true)} />
        </div>
    )
}