import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: 1,
    name: "Debug Duck",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Rubber duck for debugging code.",
  },
  {
    id: 2,
    name: "Git Commit Mug",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Rubber duck for debugging code.",
  },
  {
    id: 3,
    name: "React Hoodie",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Rubber duck for debugging code.",
  },
  {
    id: 4,
    name: "Python Socks",
    price: 9.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Rubber duck for debugging code.",
  },
  {
    id: 5,
    name: "JavaScript Sticker Pack",
    price: 4.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Rubber duck for debugging code.",
  },
  {
    id: 6,
    name: "Code & Coffee T-Shirt",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    description: "Rubber duck for debugging code.",
  },
];

export default function Component() {
  const [priceRange, setPriceRange] = useState([0, 50]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Apparel", "Accessories", "Drinkware", "Stickers"].map(
                  (category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <label
                        htmlFor={category}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Price Range</CardTitle>
              </CardHeader>
              <CardContent>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" size="icon" className="mr-2">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
