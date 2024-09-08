
'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Toast from '@/components/Toast';
import LanguageSelector from '@/components/LanguageSelector';
import RightPanel from '@/components/RightPanel';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(en|tr)/, '');
  const shouldShowHeader = pathWithoutLocale !== '/login';

  return (
    <>
      {shouldShowHeader && <Header />}
      {shouldShowHeader && <RightPanel />}
      {children}
      <Toast />
      <LanguageSelector />
    </>
  );
}
