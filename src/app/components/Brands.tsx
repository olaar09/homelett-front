const Brands = ({
  brands,
  size = "default",
}: {
  size: "small" | "default";
  brands: string[];
}) => {
  return (
    <div className="flex ">
      {brands.map((brand, index) => (
        <div key={index} className="-ml-4 px-1 bg-transparent">
          <img
            src={brand}
            alt={`brand-${index}`}
            className={`flex w-auto ${
              size == "small" ? "h-5" : "h-8"
            } bg-[#2A2A2A] rounded-full`}
          />
        </div>
      ))}
    </div>
  );
};

export default Brands;
