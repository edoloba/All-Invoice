import DefaultFooter from 'components/landing_components/DefaultFooter';
import Header from 'components/landing_components/landing/Header';
import Content from 'components/landing_components/profile/Content';
import Sidebar from 'components/dashboards_components/Sidebar';

export default function Profile() {
    return (
        <div className="md:ml-64">
        <Sidebar />
            <main>
                <Header />
                <Content />
            </main>
            <DefaultFooter />
        </div>
    );
}
