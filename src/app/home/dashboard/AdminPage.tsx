import React, { useContext, useState } from "react";
import { message, Tooltip } from "antd";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ProductChildrenDrawer from "./components/Products/ProductChildrenDrawer";
import PurchaseTokenDrawer from "./components/PurchaseTokenDrawer";
import KornHeader from "./components/KornHeader";
import KornBalanceCard from "./components/KornBalanceCard";
import IconButton from "./components/IconButton";
import SubscriptionInfoDrawer from "./components/SubscriptionInfo";
import { Str } from "@/utils/consts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IHouse, ISubscription } from "@/app/interfaces/IRegisterRequest";
import { IProduct } from "@/app/interfaces/IProduct";
import AdminInfoCard from "./components/AdminInfoCard";
import NewHouseDrawer from './components/NewHouseDrawer';
import HouseDetailsDrawer from './components/HouseDetailsDrawer';

const AdminPage = () => {
    const [openSubscriptions, setOpenSubscriptions] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<ISubscription | undefined>(undefined);
    const [tokenDrawerOpen, setTokenDrawerOpen] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [selectedHouse, setSelectedHouse] = useState<IHouse | null>(null);

    const authContext = useContext(AuthContext);
    const loadingPage = authContext.loading;
    const homeProducts = authContext.currentUser?.streaming ?? [];
    const tokenPerKw = authContext.currentUser?.house?.token_per_kw ?? 0;
    const houses = authContext.currentUser?.houses ?? [];

    const router = useRouter();

    const onOpenVault = (selected: IProduct) => {
        const sub = authContext.currentUser?.active_subscriptions?.find((sub) => sub.product.id == selected.id);
        if (!sub) {
            message.error(`No ${selected.title} subscription yet`);
        } else {
            setSelectedSubscription(sub);
        }
    };

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = (reload: boolean) => {
        setDrawerVisible(false);
        if (reload) {
            authContext.refreshProfile();
        }
    };

    const handleCopy = (houseCode: string, index: number) => {
        navigator.clipboard.writeText(houseCode).then(() => {
            setCopiedIndex(index);
            message.success('House code copied to clipboard!');
            setTimeout(() => setCopiedIndex(null), 2000);
        });
    };

    const openHouseDetails = (house: IHouse) => {
        setSelectedHouse(house);
    };

    const closeHouseDetails = () => {
        setSelectedHouse(null);
    };

    return (
        <>
            <ProductChildrenDrawer
                product={homeProducts[0]}
                open={openSubscriptions}
                onClose={() => setOpenSubscriptions(false)}
            />

            <PurchaseTokenDrawer
                open={tokenDrawerOpen}
                onClose={() => setTokenDrawerOpen(false)}
                tokenPerKw={tokenPerKw}
                isAdmin={authContext.currentUser?.is_house_admin == 1}
            />

            <div className="h-screen overflow-y-auto overflow-hidden">
                {loadingPage && (
                    <div className="h-screen flex flex-col justify-center items-center">
                        <Icon icon={"eos-icons:three-dots-loading"} className="text-6xl text-foreground" />
                    </div>
                )}

                {!loadingPage && (
                    <div className="bg-gray-100 min-h-screen pt-6 pb-24">
                        <KornHeader />
                        <div className="p-4">
                            <AdminInfoCard />

                            <div className="mt-8">
                                <div className="grid grid-cols-4 gap-4">
                                    <IconButton
                                        icon="mdi:home-plus"
                                        label="New House"
                                        onClick={showDrawer}
                                    />
                                    <IconButton
                                        icon="material-symbols-light:lightbulb-circle"
                                        label="Urgent Token"
                                        onClick={() => setTokenDrawerOpen(true)}
                                    />
                                    <IconButton
                                        icon="mdi:meter-electric"
                                        label="Order Meter"
                                        onClick={() => message.info('Order Meter feature coming soon')}
                                    />
                                    <IconButton
                                        icon="solar:chat-round-dots-bold"
                                        label="Support"
                                        onClick={() => window.open(Str.whatsappHelp, '_blank')}
                                    />
                                </div>
                            </div>

                            <SubscriptionInfoDrawer
                                open={selectedSubscription != undefined}
                                onClose={() => setSelectedSubscription(undefined)}
                                selected={selectedSubscription}
                            />

                            <div className="mt-8">
                                {houses.length > 0 ? (
                                    <ul className="">
                                        {houses.map((house, index) => (
                                            <li
                                                key={index}
                                                className="flex flex-col justify-between p-4 mb-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200"
                                                onClick={() => openHouseDetails(house)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <p className="text-gray-800 font-medium">{house.house_name}</p>
                                                    <div className="flex items-center">
                                                        <Tooltip title="Share house link">
                                                            <button
                                                                onClick={() => {
                                                                    if (navigator.share) {
                                                                        navigator.share({
                                                                            title: house.house_code,
                                                                            text: `Signup here to buy electricity for : ${house.house_code}`,
                                                                            url: `${Str.signupUrl}?house=${house.house_code}`
                                                                        }).catch((error) => console.error('Error sharing:', error));
                                                                    } else {
                                                                        message.error('Share functionality is not supported in this browser.');
                                                                    }
                                                                }}
                                                                className="text-blue-500 hover:text-blue-700 ml-2"
                                                            >
                                                                <Icon icon="mdi:share" />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                <hr className="my-2 border-gray-200" />
                                                <div className="flex justify-between items-center text-sm text-gray-500">
                                                    <p className="truncate text-xs">{house.address}</p>
                                                    <div className="flex items-center">
                                                        <span className="text-xs text-gray-400 mr-2">{house.house_code}</span>
                                                        <Tooltip title={copiedIndex === index ? "Copied!" : "Copy house code"}>
                                                            <button onClick={() => handleCopy(house.house_code ?? '', index)} className="text-blue-500 hover:text-blue-700">
                                                                {copiedIndex === index ? <Icon icon="mdi:check" /> : <Icon icon="mdi:content-copy" />}
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="mt-10 mb-3 flex flex-col justify-center items-center px-2 py-4 bg-gray-50 rounded-lg shadow-md">
                                        <Icon icon={'mdi:home-off-outline'} className="text-4xl text-gray-400 mb-2" />
                                        <span className="text-gray-500 text-sm">No houses available</span>
                                        <span className="text-gray-400 text-xs mt-1">Please check back later or contact support for assistance.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <NewHouseDrawer visible={drawerVisible} onClose={closeDrawer} />
            <HouseDetailsDrawer
                visible={selectedHouse !== null}
                house={selectedHouse}
                onClose={closeHouseDetails}
            />
        </>
    );
};

export default AdminPage; 