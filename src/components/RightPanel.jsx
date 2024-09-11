import { useDispatch, useSelector } from "react-redux";
import { closeRightPanel, openRightPanel } from "@/features/rightPanel/rightPanelSlice";
import { fetchOrganizationDetails } from "@/features/rightPanel/organizationSlice";
import { fetchCountries } from "@/features/rightPanel/countriesSlice";
import { fetchIndustries } from "@/features/rightPanel/industriesSlice";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { SiAwsorganizations } from "react-icons/si";
import { PiPuzzlePieceLight } from "react-icons/pi";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { CiCirclePlus } from "react-icons/ci";
import DateRangeModal from "./DateRangeModal";


export default function RightPanel() {
    const t = useTranslations('RightPanel');
    const t1 = useTranslations('Pages');

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.rightPanel.isOpen);
    const source = useSelector((state) => state.rightPanel.source);
    const token = useSelector((state) => state.auth.accessToken);
    const { selectedRecommendation } = useSelector((state) => state.retrieveList);
    const closeSidebar = () => dispatch(closeRightPanel());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);


    useEffect(() => {
        if (token) {
            dispatch(fetchIndustries());
            dispatch(fetchCountries());
            dispatch(fetchOrganizationDetails()) }

        }, [dispatch, token, user.organizationId]);

    const industries = useSelector((state) => state.industries.list);
    const countries = useSelector((state) => state.countries.list);
    const organization = useSelector((state) => state.organization.details);

    const industryName = industries?.find(industry => industry.id === organization?.industryId)?.name;
    const countryName = countries?.find(country => country.id === organization?.countryId)?.name;


    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSave = (dates) => {
        console.log('Selected Dates:', dates);

    };


    const renderContent = () => {
        if (source === 'header') {
            return (
                <>
                    <h2 className="text-xl font-md mt-4">{t('profileDetails')}</h2>

                    {
                        organization && (
                            <div className="pt-4 ps-2">
                                <div className="grid md:grid-cols-2 grid-cols-1 py-4 ">
                                    <div className="flex">
                                        <SiAwsorganizations size={24} color="#758ef0" />
                                        <p className="ms-2 text-md text-primary text-nowrap">{t('organizationName')} :</p>
                                    </div>
                                    <p className="ms-2 mt-4 md:mt-0 text-nowrap"> {organization.name}</p>
                                </div>


                                <div className="grid md:grid-cols-2 grid-cols-1 py-4">
                                    <div className="flex">
                                        <PiPuzzlePieceLight size={24} color="#758ef0" />
                                        <p className="ms-2 text-md text-primary text-nowrap">{t('industryName')} :</p>
                                    </div>
                                    <p className="ms-2 mt-4 md:mt-0 text-nowrap"> {industryName}</p>
                                </div>


                                <div className="grid md:grid-cols-2 grid-cols-1 py-4">
                                    <div className="flex">
                                        <LiaMapMarkedAltSolid size={24} color="#758ef0" />
                                        <p className="ms-2 text-md text-primary text-nowrap">{t('countryName')} :</p>
                                    </div>
                                    <p className="ms-2 mt-4 md:mt-0 text-nowrap">{countryName}</p>
                                </div>

                            </div>
                        )
                    }



                </>
            );
        } else if (source === 'itemDetails') {
            return (
                <>
                    <h2 className="text-xl font-md mt-4">{t('recommendationDetails')}</h2>
                    {selectedRecommendation && (
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{selectedRecommendation.recommendation}</h3>
                            <div className="grid grid-cols-2 px-2 py-8">
                                <div>
                                    <p>{t('size')}</p>
                                    <p>{selectedRecommendation.initiativeSize}</p>
                                </div>
                                <div>
                                    <p>{t('duration')}</p>
                                    <button
                                        className={` bg-opacity-50 text-black text-sm bg-primary py-1 rounded-md hover:bg-primary flex  items-center justify-center justify-center w-full`}
                                        onClick={handleAddClick}
                                    >
                                        <CiCirclePlus size={20} />
                                        <span className='ps-1 text-nowrap'> {t('add')}</span>
                                    </button>
                                </div>


                            </div>
                            <p className="bg-gray p-4">{selectedRecommendation.description}</p>
                        </div>

                    )}
                    <div className="flex justify-end pe-4 pt-12">
                        <button className={`text-white font-bold bg-primary hover:bg-primaryHover py-2 px-8 rounded-3xl flex  items-center justify-center`}>
                            {t('save')}
                        </button>
                    </div>

                </>
            );
        }
        return null;
    };

    return (
        <div className={`relative`}>
            <div id="sidebar" className={`fixed top-0 right-0  w-64 sm:w-96  h-full bg-white z-20 transition-transform duration-300 ease-in-out  rounded-tl-3xl overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4">
                    <button
                        onClick={closeSidebar}
                        className="p-2 text-black text-2xl"
                    >
                        x
                    </button>
                    {renderContent()}
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={closeSidebar}></div>
            )}

            <DateRangeModal isOpen={isModalOpen} onClose={handleModalClose} onSave={handleSave} />
        </div>
    );
}
