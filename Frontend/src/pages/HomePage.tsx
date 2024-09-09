import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-primary/90 h-[90vh] flex items-center justify-center">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-primary-foreground">
              Elevate Your Coding Style
            </h1>
            <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our collection of high-quality coding merchandise that
              combines style and functionality.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Shop Now
          </Link>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Featured Products
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out our latest and greatest coding merchandise.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            <ProductCard
              id={1}
              name="Coding Tee"
              image=""
              price={34}
              description="Comfortable and stylish coding tee."
            />
            <ProductCard
              id={1}
              name="Coding Hoodie"
              image=""
              price={49.99}
              description="Cozy and practical coding hoodie."
            />
            <ProductCard
              id={1}
              name="Coding Mug"
              image=""
              price={14.99}
              description="Stylish and functional coding mug."
            />
            <ProductCard
              id={1}
              name="Coding Stickers"
              image=""
              price={9.99}
              description="Customizable and fun coding stickers."
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted-foreground px-3 py-1 text-sm text-muted">
                Our Mission
              </div>
              <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Empowering Developers with Style
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                At CodeMart, our mission is to provide high-quality coding
                merchandise that combines style, comfort, and functionality. We
                believe that developers should be able to express their passion
                for coding through their attire and accessories.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-block rounded-lg bg-muted-foreground px-3 py-1 text-sm text-muted">
                Our Values
              </div>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Quality, Creativity, and Community. We are committed to sourcing
                the best materials, designing unique and eye-catching products,
                and fostering a community of like-minded individuals who share
                our passion for coding and style.
              </p>
              <a
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
