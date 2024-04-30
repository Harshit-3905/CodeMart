import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainPage;
