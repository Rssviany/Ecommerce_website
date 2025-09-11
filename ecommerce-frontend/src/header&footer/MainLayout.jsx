import { Outlet, useLocation } from 'react-router-dom';
import NavbarMain from './NavbarMain';
import NavbarTop from './NavbarTop';
import Footer from './Footer';

function MainLayout() {
    const location = useLocation();

    const hideFooter = location.pathname === '/login' || location.pathname === '/register';
    return (
        <div className='flex flex-col min-h-screen'>
            <NavbarTop />
            <NavbarMain />
            <main className='flex-grow pb-16'>
                <Outlet />
            </main>
            {!hideFooter && <Footer />}
        </div>
    )
}



export default MainLayout
