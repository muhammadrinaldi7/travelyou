import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';


interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ 
    isOpen, 
    onClose, 
    onConfirm 
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Overlay */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ 
                            opacity: 0, 
                            scale: 0.9,
                            y: 50 
                        }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            y: 0 
                        }}
                        exit={{ 
                            opacity: 0, 
                            scale: 0.9,
                            y: 50 
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 p-6"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                        <FontAwesomeIcon icon={faXmark} className='size-6'/>
                        </button>

                        {/* Modal Content */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="bg-red-100 p-4 rounded-full">
                                <FontAwesomeIcon icon={faArrowLeft} className="w-8 h-8 text-red-600" />
                            </div>
                            
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-gray-800">
                                    Konfirmasi Logout
                                </h2>
                                <p className="text-sm text-gray-600 mt-2">
                                    Apakah Anda yakin ingin keluar dari akun?
                                </p>
                            </div>

                            <div className="flex w-full space-x-3">
                                <button 
                                    onClick={onClose}
                                    className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={onConfirm}
                                    className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LogoutModal;