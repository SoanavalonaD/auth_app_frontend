import React from 'react';
import { XCircle } from 'lucide-react';

interface ErrorAlertProps {
    message: string;
}


export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
    <div className="flex items-center p-3 text-sm font-medium text-red-800 bg-red-100 rounded-xl border border-red-300" role="alert">
        <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
        <div>{message}</div>
    </div>
);
