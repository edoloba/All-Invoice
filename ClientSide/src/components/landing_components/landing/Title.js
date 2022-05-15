import H1 from '@material-tailwind/react/Heading1';
import LeadText from '@material-tailwind/react/LeadText';

export default function Title({ heading, children }) {
    return (
        <div className="flex flex-wrap justify-center text-center mt-20 mb-24">
            <div className="w-full lg:w-11/12 px-4 ">
                <H1 color="indigo">{heading}</H1>
                <LeadText color="blueGray">{children}</LeadText>
            </div>
        </div>
    );
}
