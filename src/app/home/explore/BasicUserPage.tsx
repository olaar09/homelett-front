import React, { useContext, useState } from "react";
import { message } from "antd";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { IProduct } from "@/app/interfaces/IProduct";
import ProductChildrenDrawer from "./components/Products/ProductChildrenDrawer";
import PurchaseTokenDrawer from "./components/PurchaseTokenDrawer";
import KornHeader from "./components/KornHeader";
import KornBalanceCard from "./components/KornBalanceCard";
import IconButton from "./components/IconButton";
import SubscriptionInfoDrawer from "./components/SubscriptionInfo";
import TransactionList from "./components/TransactionList";
import { Str } from "@/utils/consts";
import { ISubscription } from "@/app/interfaces/IRegisterRequest";
import { Icon } from "@iconify/react/dist/iconify.js";

const BasicUserPage = () => {
    const [openSubscriptions, setOpenSubscriptions] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<ISubscription | undefined>(undefined);
    const [tokenDrawerOpen, setTokenDrawerOpen] = useState(false);

    const authContext = useContext(AuthContext);
    const loadingPage = authContext.loading;
    const userTransactions = authContext.currentUser?.recent_transactions ?? [];
    const homeProducts = authContext.currentUser?.streaming ?? [];
    const tokenPerKw = authContext.currentUser?.house?.token_per_kw ?? 0;

    const router = useRouter();

    const onOpenVault = (selected: IProduct) => {
        const sub = authContext.currentUser?.active_subscriptions?.find((sub) => sub.product.id == selected.id);
        if (!sub) {
            message.error(`No ${selected.title} subscription yet`);
        } else {
            setSelectedSubscription(sub);
        }
    };

    const onAddFund = () => {
        router.push('/home/add_fund');
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
                            <KornBalanceCard />

                            <div className="mt-8">
                                <div className="grid grid-cols-4 gap-4">
                                    <IconButton icon="solar:wallet-money-bold" label="Fund" onClick={onAddFund} />
                                    <IconButton icon="mdi:electricity-circle" label="Buy Token" onClick={() => setTokenDrawerOpen(true)} />
                                    <IconButton icon="solar:card-bold" label="Subscription" onClick={() => message.info('Subscription feature coming soon')} />
                                    <IconButton icon="solar:chat-round-dots-bold" label="Support" onClick={() => window.open(Str.whatsappHelp, '_blank')} />
                                </div>
                            </div>

                            <SubscriptionInfoDrawer
                                open={selectedSubscription != undefined}
                                onClose={() => setSelectedSubscription(undefined)}
                                selected={selectedSubscription}
                            />

                            <div className="mt-8">
                                {userTransactions.length > 0 && (
                                    <div className="mt-10 mb-3 flex justify-between items-center px-2">
                                        <div className="flex items-center gap-x-2">
                                            <Icon icon={'ri:time-line'} className="text-xs" />
                                            <span className="text-gray-800 text-xs">Recent transactions</span>
                                        </div>
                                    </div>
                                )}
                                <TransactionList transactions={userTransactions} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BasicUserPage; 