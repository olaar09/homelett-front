import { AvatarFallback, AvatarImage, Avatar as ShadeCNAvatar } from "@/components/ui/avatar";
//import Avatar, { genConfig } from "react-nice-avatar";

export const HomeLettAvatar = ({ name, avatarSrc, isGen, width = 'w-7', height = 'h-7', genWidth = '6rem', genHeight = '6rem' }: { width?: string, height?: string, genHeight?: string, genWidth?: string, isGen: boolean, name: string; avatarSrc: string }) => {
    // const config = genConfig(name)

    return (
        <ShadeCNAvatar className={`${isGen ? 'h-auto w-auto' : `${width} ${height}`}`}>
            {isGen &&
                <>
                    kmkm
                </>
            }
            {!isGen &&
                <>
                    <AvatarImage src={avatarSrc} alt={name} />
                    <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </>
            }
        </ShadeCNAvatar>
    );
};