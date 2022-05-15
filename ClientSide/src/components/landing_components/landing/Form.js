import H3 from "@material-tailwind/react/Heading3";
import Paragraph from "@material-tailwind/react/Paragraph";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import Button from "@material-tailwind/react/Button";
import { useState } from 'react';
import Alert from '@material-tailwind/react/Alert'
import ReCaptcha from "components/hooks/recaptcha";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@material-tailwind/react";


export default function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [res, setRes] = useState('');
  const [resCol, setResCol] = useState('lightGreen');
  const [verified, setVerified] = useState(false);
  const [modal, setModal] = useState(false);



  if(res) {
    setTimeout(()=>{
        setRes('');
    }, 5000)
}

// sendMessage = (e) => {
//   e.preventDefault()
  
//   if(name.trim() === '' || message.trim() === '' || email.trim() === ''){
//     setResCol('deepOrange')
//     setRes('Please fill out all the Fields before you send the Message!')
//   } else {
//     let data={
//       name: name,
//       email: email,
//       message: message,
//       sentOn: new Date(),
//     }
//     fetch('/newmessage', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json',},
//       body: JSON.stringify(data)
//     })
//     .then(res => {
//       res.json()
//       .then(ans => {
//         //console.log('ans', ans);
//         if(ans === 'done') {
//           setName(''); setEmail(''); setMessage('')
//           setResCol('lightGreen');
//           setRes('We have received your message, We will contact you as soon as possible');
//         }
//       })
//       .catch(e => console.log('firs', e))
//     })
//     .catch(e => console.log('second', e))

//   }
//   };
  const getValueCaptcha = (value) => {
    setVerified(value);
    console.log(value);
  };
  return (
    <div className="flex flex-wrap justify-center mt-24">
      <div className="w-full lg:w-8/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
          <div className="flex-auto p-5 lg:p-10">
            <div className="w-full text-center">
              <H3 color="gray">Contact Us</H3>
              <Paragraph color="blueGray">We want to hear from you!</Paragraph>
            </div>
            <form onSubmit={ function sendMessage (e){
  e.preventDefault()
  
  if(name.trim() === '' || message.trim() === '' || email.trim() === ''){
    setResCol('deepOrange')
    setRes('Please fill out all the Fields before you send the Message!')
  } else {
    let data={
      name: name,
      email: email,
      message: message,
      sentOn: new Date(),
    }
    fetch('/newmessage', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(data)
    })
    .then(res => {
      res.json()
      .then(ans => {
        //console.log('ans', ans);
        if(ans === 'done') {
          setName(''); setEmail(''); setMessage('')
          setResCol('lightGreen');
          setRes('We have received your message, We will contact you as soon as possible');
        }
      })
      .catch(e => console.log('firs', e))
    })
    .catch(e => console.log('second', e))

  }
  }}>
              <div className="flex gap-8 mt-16 mb-12">
                <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" color="lightBlue" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" color="lightBlue" />
              </div>

              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} color="lightBlue" placeholder="Message" />

              <div className="flex justify-center mt-10">

                <ReCaptcha validation={getValueCaptcha}/>
              </div>
              <div className="flex justify-center mt-10">
                <Button color="lightBlue" ripple="light" type="submit">
                  Send Message
                </Button>
              </div>
            </form>
      {/* {modal && (
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
    )} */}
            <div  className={res ? 'mt-2' : 'invisible'}>
                <Alert color={resCol}>{res}</Alert>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
