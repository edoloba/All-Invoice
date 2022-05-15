import H5 from "@material-tailwind/react/Heading5";
import LeadText from "@material-tailwind/react/LeadText";

export default function DefaultFooter() {
  return (
    <>
      <footer className="relative bg-gray-100 pt-8 pb-6">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left pt-6">
            <div className="w-full lg:w-6/12 px-4">
              <H5 color="gray">All-Invoice</H5>
              <div className="-mt-4">
                <LeadText color="blueGray">Taking care of you invoicing needs.</LeadText>
              </div>
              
            </div>
            
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-700 font-medium py-1">
                Copyright © {new Date().getFullYear()} All-Invoice by{" "}
                <a
                  href="/"
                  className="text-gray-700 hover:text-gray-900 transition-all"
                >
                  Edo, Carlos, Ali, Divyaa & James
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
