'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { setLocale } from '@/features/language/languageSlice'
const LanguageSelector = () => {
  
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const dispatch = useDispatch(); 

  const pathname = usePathname()
  
  const pathWithoutLocale = pathname.replace(/^\/(en|tr)/, '');

  const onSelectChange = (e) => {
    const nextLocale = e.target.value;

    dispatch(setLocale(nextLocale)); 

    startTransition(() => {
      router.replace(`/${nextLocale}/${pathWithoutLocale}`);
    });
  };

  return (
    <div className="fixed top-20 text-sm right-2 z-10 lg:top-4 sm:text-base	">
      <select
        defaultValue={localActive}
        onChange={onSelectChange}
        disabled={isPending}
        className="p-1 sm:p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value='en'>English</option>
        <option value='tr'>Türkçe</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
