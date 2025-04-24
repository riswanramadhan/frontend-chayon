import React from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="flex justify-center mt-8 overflow-x-auto">
      <div className="flex items-center bg-white shadow-md rounded-lg border border-gray-200 px-4 py-2 space-x-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;