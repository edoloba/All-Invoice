import ReCAPTCHA from "react-google-recaptcha";
require("dotenv").config();

export default function ReCaptcha (props){
    return (
        <div className="containerCaptcha" >
        <ReCAPTCHA
        sitekey='6LevtaofAAAAAI68qt3hcbHf4bxVFHOLsijGvVXc'
        onChange={props.validation}
        className="recaptcha"
        style={{transformOrigin:"left-top"}}
        />
        </div>
    );
}