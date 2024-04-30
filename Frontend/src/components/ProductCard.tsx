import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

const ProductCard: React.FC<Product> = (product) => {
  return (
    <Card key={product.id} className="text-white bg-blue-800">
      <CardHeader>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <p className="text-white">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
