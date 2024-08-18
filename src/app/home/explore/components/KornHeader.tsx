// components/Header.tsx
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import React from 'react';

const KornHeader: React.FC = () => {
    return (
        <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Korn</h1>

            <Link href={'/home/profile'}>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Icon icon={'clarity:avatar-solid-badged'} />
                </div>
            </Link>

        </div>
    );
};

export default KornHeader;
