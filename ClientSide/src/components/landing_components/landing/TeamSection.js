import Title from "components/landing_components/landing/Title";
import TeamCard from "components/landing_components/landing/TeamCard";
import Image1 from "assets/landing_assets/img/rsz_4james_ori.png";


import Image2 from "assets/landing_assets/img/rsz_1team-4-470x470.png";
import Image3 from "assets/landing_assets/img/yo1.png";

import Image4 from "assets/landing_assets/img/foto-outvoice.jpg";
/* import Image4 from "assets/landing_assets/img/rsz_edo.png"; */
 
export default function TeamSection() {
  return (
    <section className="pt-20 pb-48">
      <div className="container max-w-7xl mx-auto px-4">
        <Title heading="Our Team">
          We are a group of four enthusiastic developers striving to improve
          the online experience. After one successfully year course at
          <a
            className="text-blue-600 hover:text-green-800"
            rel="noreferrer"
            color=""
            href="https://digitalcareerinstitute.org/"
            target="_blank"
          >
            {" Digital Career Institute"}
          </a>, learning new skills in web development,     this is our first team-created website. As independent workers we hace faced the struggle involved when creating an invoice. Our goal is to make this process as smooth, FREE, and as fast as possible. Thank you for visiting us and using our website!
        </Title>
      </div>
      <div className="w-full flex flex-wrap justify-between pr-4 mb-10 font-light">
      <TeamCard img={Image2} name="Ali" myPortfolio="https://www.youtube.com/" go2GitHub="https://github.com/Alizberlin" linkedin="https://www.linkedin.com/in/ali-r-388456ab/" position="Founder and CEO" />
      <TeamCard img={Image3} name="Carlos" myPortfolio="http://carlosbborruel.me/" go2GitHub="https://github.com/Charlibb" linkedin="https://www.linkedin.com/in/carlos-b-5baa6b75/"  position="Founder and CEO" />
      <TeamCard img={Image4} name="Edo" myPortfolio="http://www.edoardolovino.me/" go2GitHub="https://github.com/edoloba" linkedin="https://www.linkedin.com/in/edoardo-lovino-47211a15b/" position="Founder and CEO" /> 
      <TeamCard img={Image1}  name="James" myPortfolio="http://jameslange.me/" go2GitHub="https://github.com/jameslange" linkedin="https://www.linkedin.com/in/james-lange-6171a180/" position="Founder and CEO" />
        
         
          
      
      </div>


    </section>
  );
}

