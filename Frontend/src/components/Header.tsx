import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-[10vh] flex items-center bg-blue-950 text-white">
      <a href="#" className="flex items-center gap-2 font-semibold text-lg">
        <CodeIcon className="h-6 w-6" />
        <span className="">CodeMart</span>
      </a>
      <div className="w-full flex justify-end space-x-4">
        <div className="relative text-black">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 " />
          <Input className="pl-8" placeholder="Search products..." />
        </div>
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-5 w-5 text-black" />
          <span className="sr-only">Cart</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
