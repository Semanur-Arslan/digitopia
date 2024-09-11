import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CiCalendarDate } from "react-icons/ci";

export default function DateRangeModal({ isOpen, onClose, onSave }) {
    const t = useTranslations('DateRangeModal');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSave = () => {
        onSave({ startDate, endDate });
        // onClose();
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            setStartDate(value);
        } else if (name === 'endDate') {
            setEndDate(value);
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-30 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md z-40">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">{t('setTime')}</h2>
                <div className="flex flex-row space-x-4 w-full">
                    <div className="relative w-full border-darkGray border-b-2 rounded-md">
                        <div className="flex absolute inset-y-0 right-0 items-center pl-3 pointer-events-none bg-white">
                            <CiCalendarDate size={24} />
                        </div>
                        <input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={startDate}
                            onChange={handleDateChange}
                            className="w-full p-2 shadow-sm rounded-md focus:border-primary"
                        />
                    </div>
                    <div className="relative w-full border-darkGray border-b-2 rounded-md ">
                        <div className="flex absolute inset-y-0 right-0  rounded-md items-center pl-3 pointer-events-none bg-white">
                            <CiCalendarDate size={24} />
                        </div>
                        <input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={endDate}
                            onChange={handleDateChange}
                            className="w-full p-2  rounded-md shadow-sm focus:border-primary"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                    <button
                        onClick={handleSave}
                        className="bg-primary text-white py-2 px-4 rounded"
                    >
                        {t('save')}
                    </button>
                </div>
            </div>
        </div>
    );
}
