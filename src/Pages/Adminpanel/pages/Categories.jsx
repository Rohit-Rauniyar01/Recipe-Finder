const Categories = () => {
  return (
    <div className="categories">
      <h1>Categories Management</h1>
      {/* Categories content will go here */}
    </div>
  );
};

const categories = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'snack', label: 'Snack' }
];

export { categories };

export default Categories; 