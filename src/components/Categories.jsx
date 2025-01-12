import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Boda", value: "wedding" },
  { name: "XV Años", value: "xv_years" },
  { name: "Aniversario", value: "anniversary" },
  { name: "Cumpleaños", value: "birthday" },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleSelectCategory = (category) => {
    navigate(`/templates/${category}`);
  };

  return (
    <div className="grid grid-cols-2 gap-10 p-8">
      {categories.map((category) => (
        <div
          key={category.value}
          onClick={() => handleSelectCategory(category.value)}
          className="cursor-pointer py-20 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
        >
          <h2 className="text-xl font-bold text-center">{category.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Categories;
