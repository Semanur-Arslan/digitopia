import { useDispatch, useSelector } from "react-redux";
import { closeRightPanel } from "@/features/rightPanel/rightPanelSlice";
import { fetchOrganizationDetails } from "@/features/rightPanel/organizationSlice";
import { fetchCountries } from "@/features/rightPanel/countriesSlice";
import { fetchIndustries } from "@/features/rightPanel/industriesSlice";
import { useEffect } from "react";
import { useTranslations } from 'next-intl';
import { SiAwsorganizations } from "react-icons/si";
import { PiPuzzlePieceLight } from "react-icons/pi";
import { LiaMapMarkedAltSolid } from "react-icons/lia";

export default function RightPanel() {
    const t = useTranslations('RightPanel');
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.rightPanel.isOpen);
    const token = useSelector((state) => state.auth.accessToken);

    const errors = {
        industries: useSelector((state) => state.industries.error),
        countries: useSelector((state) => state.countries.error),
        organization: useSelector((state) => state.organization.error)
    };
    const loadings = {
        industries: useSelector((state) => state.industries.loading),
        countries: useSelector((state) => state.countries.loading),
        organization: useSelector((state) => state.organization.loading)
    };

    useEffect(() => {
        dispatch(fetchIndustries());
        dispatch(fetchCountries());
        dispatch(fetchOrganizationDetails());
    }, [dispatch, token]);

    const industries = useSelector((state) => state.industries.list);
    const countries = useSelector((state) => state.countries.list);
    const organization = useSelector((state) => state.organization.details);

    const industryName = industries?.find(industry => industry.id === organization?.industryId)?.name;
    const countryName = countries?.find(country => country.id === organization?.countryId)?.name;

    const closeSidebar = () => dispatch(closeRightPanel());

    const hasError = errors.industries || errors.countries || errors.organization;
    const isLoading = loadings.industries || loadings.countries || loadings.organization;

    return (
        <div id="sidebar" className={`fixed top-0 right-0  w-64 sm:w-96  h-full bg-gray z-20 transition-transform duration-300 ease-in-out  rounded-tl-3xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4">
                <button
                    onClick={closeSidebar}
                    className="p-2 text-black text-2xl"
                >
                    x
                </button>
                <h2 className="text-xl font-md mt-4">{t('profileDetails')}</h2>
                {hasError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded my-4">
                        <p>{t('errorMessage')}</p>
                    </div>
                )}
                {isLoading ? (
                    <p className="my-4">{t('loading')}</p>
                ) : (
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
                )}
            </div>
        </div>
    );
}
