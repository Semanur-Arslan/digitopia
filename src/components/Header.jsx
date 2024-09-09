
import logo from '../images/digitopiaLogoWithName.svg';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { MdOutlineMenu } from "react-icons/md";
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { openRightPanel } from '@/features/rightPanel/rightPanelSlice';
import { usePathname } from 'next/navigation';



export default function Header () {

    const locale = useSelector((state) => state.language.locale);
    const user = useSelector((state) => state.auth.user);
    const t = useTranslations('Header');
    const dispatch = useDispatch();
    const openSidebar = () => dispatch(openRightPanel());

    // const auth = useSelector((state) => state.auth);
    // console.log(auth)

    const pathname = usePathname();
    // Extract the page name (e.g., 'home', 'chart') from the pathname
    const currentPage = pathname.split('/').pop();


  return (
    <header className=" flex justify-center fixed top-0 w-full ">
      <div className='flex items-center w-full py-4 px-1 justify-between border-b border-gray-200 sm:w-4/5 sm:px-0'>
      <div className="flex-shrink-0">
        <img src={logo.src} alt="Logo" className="h-6 sm:h-8" />
      </div>
      
      <nav className="flex flex-grow justify-center sm:space-x-12  space-x-2" >
        <Link href={`/${locale}/home`} className={`text-black hover:text-primary ${currentPage === 'home' ? 'text-primary ' : ''}`}>
            {t('home')}
            </Link>
        <Link href={`/${locale}/chart`} className={`text-black hover:text-primary ${currentPage === 'chart' ? 'text-primary' : ''}`}>{t('chart')}</Link> 
      </nav>
      
      <div className="flex items-center space-x-1 sm:space-x-4">
        <span className="text-gray-700 font-semibold">{user?.name}</span>
        <MdOutlineMenu size={24} onClick={openSidebar} /> 

      </div>
      </div>
    </header>
  );
};


