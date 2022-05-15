import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  ClosingAlert,
  Popover,
  PopoverBody,
  PopoverContainer,
  PopoverHeader,
  Image,
  Label,
  Icon,
} from "@material-tailwind/react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { SavedAccount } from "./SavedAccount";
import { useState, useContext, useRef } from "react";
import { UserContext } from "components/stateManager";
import {countries} from "../hooks/countries";
import axios from "axios";

export default function SettingsForm() {
  const buttonRef = useRef("");
  const hiddenFileInput = useRef("");
  const { state, dispatch } = useContext(UserContext);
  const [resp, setResp] = useState("");
  const [imageResp, setImageResp] = useState("");
  const [resCol, setResCol] = useState("lightGreen");
  const [file, setFile] = useState(null);
  const [userPhoto, setUserPhoto] = useState('http://localhost:5000/user');
  
 const handleError = () => {
   setUserPhoto('http://localhost:5000/img')
 }
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if(file) {
      if(file.type.split('/')[0] !== 'image') {
        setResCol('deepOrange');
        setImageResp('Only Image is Allowed');
        return setFile(null);
      } else if(file.size > 2097152) {
        setResCol('deepOrange');
        setImageResp('Max size allowed is 2MB');
        return setFile(null);
      } else {
        const formData = new FormData();
        formData.append("photo", file);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        axios
          .post("/uploadimage", formData, config)
          .then((res) => {
            console.log(res)
              setResCol('lightGreen');
        setImageResp('Image uploaded successfully');
        setFile(null);
        window.location.reload();
            })
          .catch((e) => console.log(e));
      }
    }
  };
  
  const [inputField, setInputField] = useState({
    fName: state.user.fName || "",
    lName: state.user.lName || "",
    email: state.user.email || "",
    phone: state.user.phone || "",
    address: state.user.address || "",
    houseNumber: state.user.houseNumber || "",
    city: state.user.city || "",
    zip: state.user.zip || "",
    country: state.user.country || "",
    bank: state.user.bank || "",
    iban: state.user.iban || "",
    bic: state.user.bic || "",
  });
  const [show, setShow] = useState(false);
  const handleData = (e) => {
    const { name, value } = e.target;
    setInputField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const countryHandleOnSelect = (c) => {
    setInputField((prev) => ({
      ...prev,
      country: c.name
    }))
  }
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(inputField);
    dispatch({ type: "user", payLoad: inputField });
    if (
      inputField.fName.trim() === "" ||
      inputField.lName.trim() === "" ||
      inputField.email.trim() === ""
    ) {
      setResp('Fields with "*" are mandatory');
      return;
    } else {
      try {
        const response = await fetch("/updateuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputField),
        });
        if (response) {
          const ans = await response.json();
          if (ans.message) {
            setResCol("lightGreen");
            setResp(ans.message);
            return;
          } else if (ans.error) {
            setResCol("deepOrange");
            setResp(ans.error);
            return;
          } else {
            console.log(ans);
          }
        }
      } catch (error) {
        console.log(error);
        return;
      }
      setShow(true);
    }
  };

  if (resp || imageResp) {
    setTimeout(() => {
      setResp(null);
      setImageResp(null)
    }, 5000);
  }
  return (
    <>
      {!show && (
        <Card>
          <CardHeader
            className="bg-grey-900"
            color="purple"
            contentPosition="none"
          >
            <h2 className="text-white text-center md:text-4xl sm:text-3xl xs:text-2xl">User Settings</h2>
          </CardHeader>
          <CardBody>
            <div className="flex justify-between flex-wrap">
              <div className="pr-4 mb-10 font-light">
                <div className="mb-2">
              <Image
            src={userPhoto}
            onError={handleError}
            rounded={true}
            raised={true}
            width='80px'
            alt="User Image"
        />
                </div>
                <div >
                  <input
                    type="file"
                    name="photo"
                    ref={hiddenFileInput}
                    onChange={onInputChange}
                    style={{ display: "none" }}
                    value=""
                  />
                  {file && (
        <div className="my-3">
        <Label color="lightBlue" className="cursor-pointer">{file.name} <Icon onClick={() => setFile(null)} name="close" size="sm" /></Label>
                

         </div>
      )}
                  <Button variant="contained" component="label" onClick={file ? onFormSubmit : handleClick}>
                    {file ? 'Upload' : "Edit"}
                  </Button>
                  
                </div>
                <div className={imageResp ? "mt-2" : "invisible"}>
              <ClosingAlert color={resCol}>{imageResp}</ClosingAlert>
            </div>
              </div>
              <div className="mt-1">
                <Button color="lightBlue" ref={buttonRef} ripple="light">
                  {inputField.email}
                </Button>

                <Popover placement="top" ref={buttonRef}>
                  <PopoverContainer>
                    <PopoverHeader>Warning</PopoverHeader>
                    <PopoverBody>Email cannot be changed!</PopoverBody>
                  </PopoverContainer>
                </Popover>
              </div>
            </div>
            <form method="POST" onSubmit={submitForm}>
              <h6 className="text-purple-500 text-md mt-3 mb-6 font-light uppercase">
                User Information
              </h6>
              <div className="mt-10">
                <div className="w-full lg:w-5/12 pr-4 mb-10 font-light">
                  <Input
                    type="text"
                    color="purple"
                    placeholder="First Name *"
                    value={inputField.fName}
                    outline={true}
                    onChange={handleData}
                    name="fName"
                  />
                </div>
                <div className="w-full lg:w-5/12 pr-4 mb-10 font-light">
                  <Input
                    type="text"
                    color="purple"
                    placeholder="Last Name *"
                    value={inputField.lName}
                    outline={true}
                    onChange={handleData}
                    name="lName"
                  />
                </div>
                <div className="w-full lg:w-5/12 pr-4 mb-10 font-light">
                  <Input
                    type="number"
                    color="purple"
                    placeholder="Phone"
                    outline={true}
                    value={inputField.phone}
                    onChange={handleData}
                    name="phone"
                  />
                </div>
                <h6 className="text-purple-500 text-md my-6 font-light uppercase">
                  Contact Information
                </h6>
                <div className="mt-10">
                  <div className="flex">
                    <div className="w-full lg:w-3/12 pr-4 mb-10 font-light">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="Address"
                        outline={true}
                        value={inputField.address}
                        onChange={handleData}
                        name="address"
                      />
                    </div>
                    <div className="w-small lg:w-2/12 pl-4 mb-10 font-light">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="House Nr."
                        outline={true}
                        value={inputField.houseNumber}
                        onChange={handleData}
                        name="houseNumber"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-full lg:w-3/12 pr-4 mb-10 font-light">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="City"
                        outline={true}
                        value={inputField.city}
                        onChange={handleData}
                        name="city"
                      />
                    </div>
                    <div className="w-small lg:w-2/12 pl-4 mb-10 font-light">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="Zip"
                        outline={true}
                        value={inputField.zip}
                        onChange={handleData}
                        name="zip"
                      />
                    </div>
                  </div>
                  <header className="App-header">
        <div style={{ width: 200 }}>
          <ReactSearchAutocomplete
            items={countries}
            onSelect={countryHandleOnSelect}
            placeholder={state.user.country ? state.user.country : "Country"}
          />
        </div>
      </header>
                </div>
                <h6 className="text-purple-500 text-md my-6 font-light uppercase">
                  Bank Information
                </h6>
                <div className="mt-10">
                  <div className="w-full lg:w-5/12 mb-10 font-light">
                    <Input
                      type="text"
                      color="purple"
                      placeholder="Bank Name"
                      outline={true}
                      value={inputField.bank}
                      onChange={handleData}
                      name="bank"
                    />
                  </div>
                  <div className="flex">
                    <div className="w-full lg:w-3/12 pr-4 mb-10 font-light">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="Iban"
                        outline={true}
                        value={inputField.iban}
                        onChange={handleData}
                        name="iban"
                      />
                    </div>
                    <div className="w-small lg:w-2/12 pl-4 mb-10 font-light">
                      <Input
                        type="text"
                        color="purple"
                        placeholder="BIC"
                        outline={true}
                        value={inputField.bic}
                        onChange={handleData}
                        name="bic"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  color="lightBlue"
                  ripple="light"
                  buttonType="filled"
                  size="lg"
                  rounded={false}
                  block={true}
                  iconOnly={false}
                  type="submit"
                >
                  Save User
                </Button>
              </div>
            </form>

            <div className={resp ? "mt-2" : "invisible"}>
              <ClosingAlert color={resCol}>{resp}</ClosingAlert>
            </div>
          </CardBody>
        </Card>
      )}
      {show && (
        <SavedAccount
          fNameInput={inputField.fName}
          lNameInput={inputField.lName}
          emailInput={inputField.email}
          phoneInput={inputField.phone}
          addressInput={inputField.address}
          houseNumberInput={inputField.houseNumber}
          cityInput={inputField.city}
          zipInput={inputField.zip}
          countryInput={inputField.country}
          bankInput={inputField.bank}
          ibanInput={inputField.iban}
          binInput={inputField.bic}
        />
      )}
    </>
  );
}
