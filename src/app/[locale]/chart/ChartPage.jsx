'use client'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import GanttChart from '@/components/GanttChart';
import { fetchImpactRunList } from '@/features/chart/impactRunListSlice';
import { fetchRetrieveList } from '@/features/chart/retrieveListSlice';
import { useEffect } from 'react';
import CollapsibleBox from '@/components/CollapsibleBox';

export default function ChartPage() {
  const t = useTranslations('ChartPage');

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    dispatch(fetchImpactRunList());
    dispatch(fetchRetrieveList());
  }, [dispatch, token]);

  


  return (
    // <div className='pt-24 flex  justify-center h-3/4 bg-gray-100'>
    //   <div className='bg-gray-300 p-4 w-1/2 h-1/3 grid grid-cols-2 gap-4'>
    //   <div class="bg-gray-500 text-white flex items-center justify-center p-4">
    //   <CollapsibleBox />
    //   </div>
    //   <GanttChart />
    //   </div>
    // </div>

    <div className="pt-24 w-full flex justify-center h-screen ">
      <div className="bg-gray p-24 flex justify-center flex-col md:flex-row">
        <div className="pe-8">
          <CollapsibleBox />
        </div>
        <div className=" w-full">
          <GanttChart />
        </div>
      </div>
    </div>
  );
}


