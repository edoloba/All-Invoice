import H3 from "@material-tailwind/react/Heading3";
import Paragraph from "@material-tailwind/react/Paragraph";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Icon,
} from "@material-tailwind/react";
import { CardImage } from "@material-tailwind/react";


export default function LandingTeamCard({ img, name, position, linkedin, go2GitHub, myPortfolio }) {
 
  return (
    <Card className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
      <div className="px-6">
        <CardImage className="object-cover h-60
         w-80" src={img} alt={name} raised />
        <CardBody className="pt-6 text-center">
          <H3 color="gray">{name}</H3>
          <Paragraph color="blueGray">{position}</Paragraph>
        </CardBody>
        <CardFooter>
          <div className="flex flex-wrap justify-around ">
            <Button
              className="mt-1 "
              size="lg"
              color="indigo"
              buttonType="filled"
              block={true}
              iconOnly={false}
              onClick={()=>window.open(myPortfolio, "_blank") }
              ripple="light"
            >
              {"Visit my Portfolio "}
              <Icon name="link"></Icon>
            </Button>

            <Button
              className="mt-4"
              size="lg"
              color="indigo"
              buttonType="filled"
              block={true}
              iconOnly={false}
              onClick={()=>window.open(go2GitHub, "_blank") }
              ripple="light"
            >
              {"Discover my GitHub"}
              <Icon name="link"></Icon> 
            </Button>

            <Button
              className="mt-4"
              size="lg"
              color="indigo"
              buttonType="filled"
              block={true}
              iconOnly={false}
              onClick={()=>window.open(linkedin, "_blank") }

              ripple="light"
            >
              {"Go to my linkedin"}

              <Icon name="link"></Icon>
            </Button>
           
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
