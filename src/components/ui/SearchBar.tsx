import Image from "next/image";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Pencarian",
  className = "w-[554px]",
}: SearchBarProps) {
  return (
    <div
      className={`flex items-center bg-white rounded-full px-6 py-3 border border-gray-300 transition-all duration-200
                  focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0
                  focus-within:border-blue-500 ${className}`}
    >
      <Image src="/search.svg" width={24} height={24} alt="Search Icon" className="mr-3" />
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none text-gray-700 text-lg font-light w-full bg-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
