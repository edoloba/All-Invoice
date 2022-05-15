import H1 from "@material-tailwind/react/Heading1";
import LeadText from "@material-tailwind/react/LeadText";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useState, useEffect } from "react";




export default function Header() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  const words = [
    "tasks",
    "clients",
    "expenses",
    "invoices",
  ];
  useEffect(() => {
    if (index === words.length - 1 && subIndex === words[index].length) {
      return;
    }
    if (
      subIndex === words[index].length + 1 &&
      index !== words.length - 1 &&
      !reverse
    ) {
      setReverse(true);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 500 : 150, parseInt(Math.random() * 350)));
    return () => clearTimeout(timeout);
  }, [index, subIndex, reverse]);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
      <div className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-full" />
      <div className="container max-w-8xl relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full md:w-8/12 xs:px-5  md:px-4 ml-auto mr-auto text-left text-cream-500 font-sans">
            <div>
           
            <H1  color="">All-Invoice</H1>
            </div>
            <div className="text-cream-500">
              <LeadText color="" >
                We keep track of yours{" "}
                {`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}.
              </LeadText>
              <a href="/register">

              <Button className="xs:invisible md:visible" size="lg" color="pink" href='/register'>
                {" "}
                Register Now
                <Icon name="person" size="sm" />
              </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
