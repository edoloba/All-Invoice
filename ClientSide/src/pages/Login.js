import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import InputIcon from "@material-tailwind/react/InputIcon";
import Input from "@material-tailwind/react/Input";
import Checkbox from "@material-tailwind/react/Checkbox";
import Button from "@material-tailwind/react/Button";
import SimpleFooter from "components/landing_components/SimpleFooter";
import Page from "components/landing_components/login/Page";
import Container from "components/landing_components/login/Container";
import Alert from "@material-tailwind/react/Alert";
import { FaEye, FaRocketchat } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ dispatch, state }) {
  let navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  
  const [resp, setResp] = useState("");
  const [resCol, setResCol] = useState("lightGreen");
  const [toggle, setTogglep] = useState("password");
//   const [verified, setVerified] = useState(false);
//   const [modal, setModal] = useState(false);

  if (resp) {
    setTimeout(() => {
      setResp("");
    }, 5000);
  }

  const loginWithEnter = (e) => {
    if (e.key === "Enter") {
      loginUser(mail, pass);
    }
  };
  

  const loginUser = async (mail, pass) => {
    if (mail.trim() === "" || pass.trim() === "") {
      setResp("Please enter your Email and Password");
    } else {
      const user = { mail, pass };
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response) {
        const ans = await response.json();
        if (ans.error) {
          setResCol("deepOrange");
          setResp(ans.error);
        } else {
          console.log(ans.message);
          navigate("/dashboard");
        }
      }
    }
  };
 
  return (
      <>
    <Page>
      <Container>
        <Card>
          <CardHeader color="lightBlue">
            <H5 color="white" style={{ marginBottom: 0 }}>
              Login
            </H5>
          </CardHeader>

          <CardBody>
            <div className="mb-6 px-4">
              <InputIcon
                type="email"
                color="lightBlue"
                placeholder="Email Address"
                iconName="email"
                onChange={(e) => setMail(e.target.value)}
                value={mail}
              />
            </div>
            <div className="relative mb-6 px-4">
              <Input
                type={toggle}
                color="lightBlue"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                onKeyDown={(e) => loginWithEnter(e)}
              />
              <FaEye
                className="absolute bottom-2 right-5 text-lg cursor-pointer"
                color="grey"
                onClick={() =>
                  setTogglep(toggle === "password" ? "text" : "password")
                }
              />
            </div>
             <div className="mb-4 px-4">
              <Checkbox color="lightBlue" text="Remember Me" id="remember"/>
            </div>
          </CardBody>
          <CardFooter className="flex justify-around  xs:flex-wrap ">
            <a href="/register" color="lightBlue">
              <Button>Create Account</Button>
            </a>
            <div color="lightBlue" className="xs:mt-1 md:mt-0">
              <Button ripple="dark" onClick={(e) => loginUser(mail, pass)}>
                Get Started
              </Button>
            </div>
          </CardFooter>
        </Card>
        <div className={resp ? "mt-2" : "hidden"}>
          <Alert color={resCol}>{resp}</Alert>
        </div>
      </Container>
      <SimpleFooter className="md:mb-2 xs:mb-1" />
    </Page>
    </>
  )
}
