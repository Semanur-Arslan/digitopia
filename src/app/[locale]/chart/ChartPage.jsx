'use client'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GanttChart from '@/components/GanttChart';
import { fetchImpactRunList } from '@/features/chart/impactRunListSlice';
import { fetchRetrieveList } from '@/features/chart/retrieveListSlice';
import CollapsibleBox from '@/components/CollapsibleBox';

export default function ChartPage() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    dispatch(fetchImpactRunList());
    dispatch(fetchRetrieveList());
  }, [dispatch, token]);

  return (
    <div className="relative pt-24  w-full flex justify-center h-screen ">
      <div className="bg-gray p-24 flex justify-center flex-col md:flex-row ">
        <div className="pe-8 flex justify-center ">
          <CollapsibleBox />
        </div>
        <div className=" w-full mt-4 md:mt-0">
          <GanttChart />
        </div>
      </div>
    </div>
  );
}


