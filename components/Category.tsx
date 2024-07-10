import { useState } from 'react';
import { TCategory } from '../types';
const Category: React.FC<{
  category: TCategory,
}> = ({
  category,
}) => {
    const [isSelected, setIsSelected] = useState(category.isSelected)
    return (
      <div className={`flex text-center font-bold min-w-fit rounded-md p-2 border ${!isSelected ?
        " border-custom-black text-custom-black" :
        category.id === 'admin' ?
          "bg-orange-500 border-orange-500 text-custom-white "
          : "bg-custom-primary border-custom-primary text-custom-white"}
        `}>
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
