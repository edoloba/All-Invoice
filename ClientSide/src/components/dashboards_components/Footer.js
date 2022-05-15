export default function footer() {
  return (
    <footer className="py-6 px-16 border-t md:ml-64 border-gray-200 font-light flex flex-col lg:flex-row justify-between items-center">
      <p className="text-gray-700 mb-6 lg:mb-0">
        Copyright &copy; {new Date().getFullYear()}{" "}
        <a
          href="/"
          target=""
          rel="noreferrer"
          className="text-light-blue-500 hover:text-light-blue-700"
        >
          Ali Invoice
        </a>
      </p>
    </footer>
  );
}
