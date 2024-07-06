import { useState } from 'react';
import { TCategory } from '../types';
const Category: React.FC<{
  category: TCategory,
}> = ({
  category,
}) => {
    const [isSelected, setIsSelected] = useState(category.isSelected)
    return (
      <div className={`flex text-center font-bold min-w-fit ${!isSelected ?
        "border border-custom-black text-custom-black" :
        category.id === 'admin' ?
          "bg-orange-500 text-custom-white"
          : "bg-custom-primary text-custom-white"}
        rounded-md p-2`}>
        <p
          onClick={() => {
            setIsSelected(!isSelected)
          }}
        >{category.name}
        </p>
      </div>
    );
  };

export default Category;
