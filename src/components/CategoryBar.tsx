import React, { useState } from "react";

const defaultCategories = [
  "Digital Marketing",
  "Machine Learning",
  "UI/UX Design",
  "Melamar Kerja",
  "Lintas Minat",
  "Jenjang Karir",
];

interface CategoryBarProps {
  onCategorySelect: (category: string | null) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center bg-white shadow-md rounded-lg border border-gray-200 px-4 py-2 space-x-6">
        <button
          className={'px-4 py-2 rounded-md font-bold transition-all ${selectedCategory === null ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"}'}
          onClick={() => handleCategoryClick(null)}
        >
          View all
        </button>

        {defaultCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;