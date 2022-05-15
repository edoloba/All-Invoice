import Icon from "@material-tailwind/react/Icon";
import H4 from "@material-tailwind/react/Heading4";
import LeadText from "@material-tailwind/react/LeadText";
import Invoice from "assets/landing_assets/img/invoicetemplate.png";
import Dashboard from "assets/landing_assets/img/screenshot_dashboard.png";

export default function WorkingSection() {
  return (
    <section className="pb-20 bg-gray-100 -mt-32">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap relative z-50 mt-12">
          <img src={Dashboard} alt="screenshot" className="rounded-2xl shadow-2xl" />
        </div>
        <div className="flex flex-wrap items-center mt-32">
          <div className="w-full md:w-5/12 px-4 mx-auto">
            <div className="text-blue-gray-800 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
              <Icon name="people" size="3xl" />
            </div>
            <H4 color="gray">Once you go All-Invoice you never go back</H4>
            <LeadText color="blueGray">
              All-Invoice provides the ability to effortlessly create and track your invoices.
            </LeadText>
            <LeadText color="blueGray">
              Our software is designed to make the lives of small business owners easier and more efficient.
              Conveniently create invoices with a click of a button.
            </LeadText>
            {/* <a href="/" className="font-medium text-light-blue-500 mt-2 inline-block">
              How it Works
            </a> */}
          </div>
          <div className="w-full md:w-4/12 mx-auto flex justify-center mt-24 lg:mt-0 shadow-2xl rounded">
            <img src={Invoice} alt="invoiceScreenshot" />
          </div>
        </div>
      </div>
    </section>
  );
}
