import DefaultNavbar from 'components/landing_components/DefaultNavbar';
import DefaultFooter from 'components/landing_components/DefaultFooter';
import TeamSection from 'components/landing_components/landing/TeamSection';


export default function AboutUs() {
    return (
        <>
            <div className="absolute w-full z-20   bg-blue-500" >
                
                <DefaultNavbar className="" />
            </div>
            <main >
               

                <TeamSection />
               
             
            </main>
            <DefaultFooter />
        </>
    );
}
