import Image from 'next/image'

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
  className = "w-[554px]"
}: SearchBarProps) {
  return (
    <div className={`flex items-center bg-white rounded-full px-6 py-3 ${className}`}>
      <Image src="/search.svg" width={24} height={24} alt="Search Icon" className="mr-3" />
      <input 
        type="text" 
        placeholder={placeholder}
        className="outline-none text-gray-500 text-lg font-light w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}