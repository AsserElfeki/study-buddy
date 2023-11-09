
export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="animate-spin h-12 w-12 mb-4 border-t-2 border-b-2 border-blue-500 rounded-full" />
            <p className="text-xl text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
    )
}

