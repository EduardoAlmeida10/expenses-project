export function Card() {
    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-4 ml-10 mr-10 text-black mt-10">

                <h1 className="text-2xl font-bold">Card</h1>
                <p>This is a card component.</p>
                <hr className="border-t border-gray-500 my-4" />
                <ul>
                    <li className="flex justify-between items-center text-lg font-semibold mt-2 bg-red-700 text-white p-2 pr-5 pl rounded-md">
                        <p>Carlos</p>
                        <input type="checkbox" className="w-5 h-5" />
                    </li>   
                </ul>
            </div>
        </>
    )
}