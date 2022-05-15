import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import { FaEye } from "react-icons/fa";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import SimpleFooter from "components/landing_components/SimpleFooter";
import Page from "components/landing_components/login/Page";
import Container from "components/landing_components/login/Container";
import Alert from "@material-tailwind/react/Alert";
import { useState } from "react";
import CardHeader from "@material-tailwind/react/CardHeader";
import H5 from "@material-tailwind/react/Heading5";
import ReCaptcha from "components/hooks/recaptcha";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@material-tailwind/react";
import { transform } from "@babel/core";

export default function Register() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [resp, setResp] = useState("");
  const [resCol, setResCol] = useState("lightGreen");
  const [togglep, setTogglep] = useState("password");
  const [toggler, setToggler] = useState("password");
  const [verified, setVerified] = useState(false);
  const [modal, setModal] = useState(false);

  if (resp) {
    setTimeout(() => {
      setResp("");
    }, 5000);
  }

  const registerWithEnter = (e) => {
    if (e.key === "Enter") {
      addUser(fName, lName, mail, pass, repass);
    }
  };

  const addUser = async (f, l, m, p, r) => {
    if (
      fName.trim() === "" ||
      lName.trim() === "" ||
      mail.trim() === "" ||
      pass.trim() === "" ||
      repass.trim() === ""
    ) {
      setResCol("deepOrange");
      setResp("Fill out all the Fields please!");
      return;
    } else {
      let user = {
        fName: f,
        lName: l,
        mail: m,
        pass: p,
        repass: r,
      };
      try {
        const response = await fetch("/register/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response) {
          const ans = await response.json();
          if (ans.message) {
            //console.log(ans.message.errors[0].msg)
            setResCol("deepOrange");
            setResp(ans.message.errors[0].msg);
            return;
          } else {
            setResCol("lightGreen");
            setResp(ans);
            setMail("");
            setFName("");
            setLName("");
            setPass("");
            setRepass("");
            return;
          }
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };
  const getValueCaptcha = (value) => {
    setVerified(value);
    console.log(value);
  };
  return (
    <>
    <Page >
        <div className="max-w-xl  xs:w-screen mxs:w-auto m-auto p-2">
          <Card className="mt-4">
            <CardHeader color="lightBlue">
              <H5 color="white">
                Register
              </H5>
            </CardHeader>
            <CardBody>
              <div className="mb-4 sm:mb-0 px-4 sm:px-0 sm:mt-3">
                <InputIcon
                  type="text"
                  color="lightBlue"
                  placeholder="First Name"
                  iconName="account_circle"
                  onChange={(e) => setFName(e.target.value)}
                  value={fName}
                  required
                />
              </div>
              <div className="mb-4 sm:mb-0 px-4 sm:px-0 sm:mt-3">
                <InputIcon
                  type="text"
                  color="lightBlue"
                  placeholder="Last Name"
                  iconName="account_circle"
                  onChange={(e) => setLName(e.target.value)}
                  value={lName}
                  required
                />
              </div>
              <div className="mb-4 sm:mb-0 px-4 sm:px-0 sm:mt-3">
                <InputIcon
                  type="email"
                  color="lightBlue"
                  placeholder="Email Address"
                  iconName="email"
                  onChange={(e) => setMail(e.target.value)}
                  value={mail}
                  required
                />
              </div>
              <div className="relative mb-4 sm:mb-0 px-4 sm:px-0 sm:mt-3">
                <Input
                  type={togglep}
                  color="lightBlue"
                  placeholder="Password"
                  name="pass"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  required
                />
                <FaEye
                  className="absolute bottom-2 right-5 text-lg cursor-pointer sm:right-0"
                  color="grey"
                  onClick={() =>
                    setTogglep(togglep === "password" ? "text" : "password")
                  }
                />
              </div>
              <div className="relative mb-6 px-4 sm:px-0 sm:mt-3">
                <Input
                  type={toggler}
                  color="lightBlue"
                  placeholder="Re-password"
                  name="repass"
                  onChange={(e) => setRepass(e.target.value)}
                  value={repass}
                  onKeyDown={(e) => registerWithEnter(e)}
                  required
                />
                <FaEye
                  className="absolute bottom-2 right-5 sm:right-0 text-lg cursor-pointer"
                  color="grey"
                  onClick={() =>
                    setToggler(toggler === "password" ? "text" : "password")
                  }
                />
              </div>
              <div className="m-auto max-w-screen-xs overflow-x-auto " style={{transform:"scale(0.80)",WebkitTransform:"scale(0.99)",transformOrigin:"0 0", WebkitTransformOrigin:"0 0"}}>
                <ReCaptcha validation={getValueCaptcha} />
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex justify-around">
                <Button
                  size="sm"
                  ripple="dark"
                  onClick={() => verified ? addUser(fName, lName, mail, pass, repass) : setModal(true)}
                >
                  Register
                </Button>
                <a href="/login" color="lightBlue">
                  <Button
                    size="sm"
                  >Login here</Button>
                </a>
              </div>
            </CardFooter>
          </Card>
          <div className={resp ? "mt-2" : "invisible"}>
            <Alert color={resCol}>{resp}</Alert>
          </div>
      </div>
        

      <SimpleFooter className="md:mb-2" />
      

    </Page>
   {modal && (
        <Modal size="sm" active={modal} toggler={() => setModal(false)}>
            <ModalHeader toggler={() => setModal(false)}>
                Attention
            </ModalHeader>
            <ModalBody>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              Please check the captcha to continue, we want to be sure you are not a robot
            </p>
                </ModalBody>
                <ModalFooter>
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => setModal(false)}
              ripple="dark"
            >
              Close
            </Button>
            </ModalFooter>
            </Modal>
    )}
    </>
  );
}
