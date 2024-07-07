
import { useState } from 'react';
import { TCategory } from '../types';
import Category from './Category';
const CategoriesFilter: React.FC<{ categories: TCategory[]; withAdmin: boolean }> = ({
  categories,
  withAdmin,
}) => {
  const [allCategories, setAllCategories] = useState<TCategory[]>(categories)
  // todo: make filters work
  return (
    <div className='flex justify-items-center overflow-scroll gap-x-3 no-scrollbar'>
      {withAdmin && <><Category category={{ name: 'Admin 👮‍♂️️', id: 'admin', isSelected: true }} /><span className='flex items-center'>|</span></>}
      {allCategories.map((category, i) => (
        <Category category={category} key={i} />
      ))}
    </div>
  );
};

export default CategoriesFilter;
