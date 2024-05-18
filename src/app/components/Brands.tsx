const Brands = ({
  brands,
  size = "default",
  remaining = 0,
}: {
  size: "small" | "default";
  brands: string[];
  remaining?: number;
}) => {
  return (
    <div className="flex items-center justify-between">
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

      {remaining > 0 && (
        <span className=" text-foreground-secondary text-xs">+{remaining}</span>
      )}
    </div>
  );
};

export default Brands;
