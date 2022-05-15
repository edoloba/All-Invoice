import DefaultNavbar from "components/landing_components/DefaultNavbar";
import DefaultFooter from "components/landing_components/DefaultFooter";
import Header from "components/landing_components/landing/Header";
import WorkingSection from "components/landing_components/landing/WorkingSection";
import ContactSection from "components/landing_components/landing/ContactSection";

export default function Landing() {
  return (
    <>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <main>
        <Header />
        <WorkingSection />
        <ContactSection />
      </main>
      <DefaultFooter />
    </>
  );
}
