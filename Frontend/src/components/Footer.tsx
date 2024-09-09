const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-blue-950 text-white min-h-[10vh]">
      <p className="text-md">&copy; 2024 Code Merch. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <a href="#" className="text-md hover:underline underline-offset-4">
          Terms of Service
        </a>
        <a href="#" className="text-md hover:underline underline-offset-4">
          Privacy Policy
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
