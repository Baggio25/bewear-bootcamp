import BrandItem from "./brand-item";

const Brands = () => {
  return (
    <div className="space-y-6 pb-12">
      <h3 className="font-semibold">Marcas parceiras</h3>
      <div className="flex w-full gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <BrandItem src="/nike.svg" alt="Nike" brand="Nike" />
        <BrandItem src="/adidas.svg" alt="Adidas" brand="Adidas" />
        <BrandItem src="/puma.svg" alt="Puma" brand="Puma" />

        <BrandItem src="/converse.svg" alt="Converse" brand="Converse" />
        <BrandItem src="/polo.svg" alt="Polo" brand="Polo" />
        <BrandItem src="/zara.svg" alt="Zara" brand="Zara" />
      </div>
    </div>
  );
};

export default Brands;
