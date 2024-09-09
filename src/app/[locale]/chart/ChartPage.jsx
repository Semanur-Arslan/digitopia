'use client'
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import GanttChart from '@/components/GanttChart';

export default function ChartPage() {
  const t = useTranslations('ChartPage');

  const user = useSelector((state) => state.auth.user);
  const locale = useSelector((state) => state.language.locale);


  return (
    <div className='pt-24 w-full flex justify-center'>
      <GanttChart />
    </div>
  );
}
