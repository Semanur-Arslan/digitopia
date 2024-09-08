import { useDispatch, useSelector } from "react-redux";
import { closeRightPanel } from "@/features/rightPanel/rightPanelSlice";

export default function RightPanel() {
    const isOpen = useSelector((state) => state.rightPanel.isOpen);
    const dispatch = useDispatch();
    const closeSidebar = () => dispatch(closeRightPanel());

    return (
        <div id="sidebar" className={`fixed top-0 right-0 sm:w-1/4 w-3/4 h-full bg-gray z-20 ransition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4">
                <button
                    onClick={closeSidebar} 
                    className=" p-2 text-black text-2xl"
                >
                    x
                </button>
                <h2 className="text-xl font-bold">Sağ Panel Başlığı</h2>
                <p className="mt-2">Buraya panel içeriğinizi ekleyebilirsiniz.</p>
            </div>
        </div>
    )
}
