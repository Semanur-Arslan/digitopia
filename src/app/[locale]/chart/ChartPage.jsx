'use client'
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ChartPage() {
  const t = useTranslations('ChartPage');

  const user = useSelector((state) => state.auth.user);
  const locale = useSelector((state) => state.language.locale);


  return (
    <div className='pt-24 w-full flex justify-center'>
      <div className='w-3/4 text-center pt-32'>
        <h1 className="text-4xl italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f3b3f0] to-[#758ef0]">
          {t('hello')} <span>{user.name} !</span>
        </h1>
        <p className="mt-12 text-xl font-semibold text-gray-700">
          {t('message')}
        </p>
        <div className="mt-12 flex justify-center">
          <Link href={`/${locale}/chart`} className="px-6 py-3 text-white font-semibold bg-gradient-to-r from-[#f3b3f0] to-[#758ef0] rounded-lg shadow-lg transform transition-transform duration-700 hover:scale-105 hover:from-[#758ef0] hover:to-[#f3b3f0]">{t('seeCharts')}</Link>
        </div>
      </div>
    </div>
  );
}
