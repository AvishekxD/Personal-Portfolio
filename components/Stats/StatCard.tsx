export default function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="p-4 rounded-xl bg-white shadow-md hover:scale-105 transition-all duration-200 hover:shadow-xl mt-2">
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className="text-xl font-bold text-black dark:text-white mt-1">{value}</p>
        </div>
    );
}