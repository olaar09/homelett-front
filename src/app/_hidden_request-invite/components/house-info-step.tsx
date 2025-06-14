"use client"

import { motion } from "framer-motion"
import { Home, MapPin, Zap, Users, Wifi, Receipt, HouseIcon, HousePlugIcon, Bath } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { IHouse } from "@/app/interfaces/IHouse"
import { IHouseSKU } from "@/app/interfaces/IRegisterRequest"

export default function PropertyCard({ house, sku, onNext }: { house: IHouse, sku?: IHouseSKU, onNext: () => void }) {
    const services = [
        { icon: Zap, label: "electricity", color: "text-yellow-500" },
        { icon: Users, label: "kyc", color: "text-green-500" },
        { icon: Wifi, label: "internet", color: "text-blue-500" },
        { icon: Receipt, label: "billing", color: "text-purple-500" },
    ]

    const getServiceConfig = (serviceName: string) => {
        return services.find(s => s.label === serviceName.toLowerCase()) ||
            { icon: Home, color: "text-gray-500" }; // fallback default
    }

    return (
        <div className="flex items-start justify-start  bg-gray-50/50 pb-4 pt-8 ">
            <Card className="w-full  shadow-none border-none p-0 py-2">
                <CardContent className="pt-0 px-0">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Home className="h-5 w-5 text-primary" />
                                <h2 className="text-[0.78rem] font-semibold tracking-tight">{house.house_name}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                <h2 className="text-[0.78rem] font-semibold tracking-tight">{house.address}</h2>
                            </div>

                            {sku &&
                                <div className="flex items-center gap-2">
                                    <Bath className="h-5 w-5 text-primary" />
                                    <h2 className="text-[0.78rem] font-semibold tracking-tight">{sku.name}</h2>
                                </div>
                            }
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {house.modules.map((service, index) => (
                                <motion.div
                                    key={service.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Button variant="outline" className="w-full h-auto py-4 px-3 hover:bg-secondary">
                                        <div className="flex flex-col items-center gap-2">
                                            {(() => {
                                                const { icon: Icon, color } = getServiceConfig(service.name);
                                                return <Icon className={`h-5 w-5 ${color}`} />;
                                            })()}
                                            <span className="text-[0.78rem] font-medium">{service.name}</span>
                                        </div>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-4 pb-6 px-0">
                    <Button className="w-full py-6 text-lg font-medium" size="sm" onClick={onNext}>
                        <span className="text-sm">Get Started</span>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

