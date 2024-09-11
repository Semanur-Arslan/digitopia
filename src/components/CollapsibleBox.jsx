import { useState, useEffect } from 'react';
import { LuArrowDownLeft } from "react-icons/lu";
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setSelectedRecommendation } from '@/features/chart/retrieveListSlice';
import { openRightPanel } from '@/features/rightPanel/rightPanelSlice';


const CollapsibleBox = () => {
    const dispatch = useDispatch();
    const t = useTranslations('ChartPage');
    const [isExpanded, setIsExpanded] = useState(true);
    const [colors, setColors] = useState({});

    const toggleBox = () => {
        setIsExpanded(!isExpanded);
    };

    const retrieveList = useSelector((state) => state.retrieveList.list);


    const generateRandomColor = () => '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    useEffect(() => {
        setColors(retrieveList.reduce((acc, item) => ({
            ...acc,
            [item.id]: acc[item.id] || generateRandomColor()
        }), {}));
        
    }, [retrieveList]);

    const handleItemClick = (item) => {
        dispatch(setSelectedRecommendation(item.topicRecommendation));
        dispatch(openRightPanel('itemDetails'));
    };


    return (
        <div className={`relative ${isExpanded ? 'w-72 px-4' : 'w-16 px-1'} h-96 bg-white rounded-lg transition-all duration-300 overflow-hidden `}>
            <div
                className={`absolute top-0 right-0 p-2 cursor-pointer transform transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-180'}`}
                onClick={toggleBox}
            >
                <div className='bg-gray radius100 rounded-full p-1'>
                    <LuArrowDownLeft color='#3f3f46' />
                </div>
            </div>
            <div className='h-full '>
                <h3
                    className={`font-semibold bg-white absolute transition-transform duration-300 ${isExpanded ? 'top-2 left-2  ' : 'top-1/2 -left-14 '}`}
                    style={{
                        transformOrigin: 'center center',
                        transform: isExpanded ? 'none' : 'rotate(-90deg)'
                    }}
                >
                    {t('title')}
                </h3>
                <div className={`pt-8 ${isExpanded ? 'overflow-y-auto' : 'overflow-hidden ps-4'}`} style={{ height: 'calc(100% - 2rem)' }}>
                    {retrieveList.map((retrieve) => (
                        <div
                            className='mx-2 my-4 rounded-md cursor-pointer'
                            key={retrieve.id}
                            style={{ backgroundColor: colors[retrieve.id] }}
                            onClick={() => handleItemClick(retrieve)}
                        >
                            {Array.isArray(retrieve.topicRecommendation) ? (
                                retrieve.topicRecommendation.map((item) => (
                                    <div className='bg-gray ms-6 p-2 flex justify-between text-sm' key={item.id}>
                                        <p className='truncate' title={item.recommendation || 'No Name'}>{item.recommendation || 'No Name'}</p>
                                        <p className='text-darkGray'>{item.section || 'No Value'}</p>
                                    </div>
                                ))
                            ) : (
                                <div className='bg-gray ms-6 p-2 flex justify-between text-sm' >
                                    <p className='truncate pe-4' title={retrieve.topicRecommendation.recommendation || 'No Name'}>{retrieve.topicRecommendation.recommendation || 'No Name'}</p>
                                    <p className='text-darkGray'>{retrieve.topicRecommendation.section || 'No Value'}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    className={` bg-opacity-50 text-black text-sm bg-primary py-1 rounded-md hover:bg-primary flex  items-center ${isExpanded ? 'justify-center justify-center w-full' : 'justify-start ps-2'}`}
                >
                    <CiCirclePlus size={20} />
                    <span className='ps-1 text-nowrap'> {t('btnText')}</span>
                </button>
            </div>
        </div>
    );
};

export default CollapsibleBox;
