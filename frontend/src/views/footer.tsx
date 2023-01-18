const Footer = () => {
  return (
    <footer className=" flex items-center justify-center bg-black py-6 text-sm font-thin text-white">
      <div className="container flex items-center justify-evenly">
        <div className="text-center">
          <p className="text-white-500 w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. This is
            my fun little project inspired by Solita Dev academy pre-exercise.
          </p>
        </div>
        <div>
          <a
            href="https://github.com/nhuttu/solita-dev"
            className="flex flex-col items-center justify-center gap-2"
          >
            GitHub
            <img src="github-logo.png" alt="GitHub Logo" className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
