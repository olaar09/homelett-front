import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { IHouseIssue } from '@/app/interfaces/IHouseIssue';

interface IssueItemProps {
    issue: IHouseIssue;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
    return (
        <div className="bg-white py-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {issue.title}
                    </h3>
                    <p className="text-xs text-gray-500">{issue.description}</p>
                </div>

            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <span className={`flex items-center px-2 py-1 text-xs rounded-full ${issue.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : issue.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {issue.status ?? 'Pending'}
                    </span>
                </div>
                {/*     <span className="text-xs text-gray-400">
                    {new Date(payment.created_at).toLocaleDateString()}
                </span> */}
            </div>
        </div>
    );
};

export default IssueItem; 