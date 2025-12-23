import React from 'react';

// Lucide Reactからのアイコン
export { GripVertical, Trash2, RotateCcw, Plus, ChevronDown, ChevronUp, Eye, Edit, X, Check, Search, Download, Upload, Printer, Save, FileText, Camera, Clock, Calendar, User, Users, Home, Settings, HelpCircle, Info, AlertCircle, CheckCircle, XCircle, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Menu, MoreHorizontal, MoreVertical } from 'lucide-react';

// 氷山アイコン
export const IcebergIcon = () => (
    <div className="flex-shrink-0 w-16 h-24 relative">
        <svg viewBox="0 0 64 96" className="w-full h-full drop-shadow-lg">
            <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#87CEEB" />
                    <stop offset="100%" stopColor="#B0E0E6" />
                </linearGradient>
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4A90D9" />
                    <stop offset="50%" stopColor="#2E5A8B" />
                    <stop offset="100%" stopColor="#1A3A5C" />
                </linearGradient>
                <linearGradient id="iceTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#E8F4FC" />
                    <stop offset="70%" stopColor="#B8D4E8" />
                    <stop offset="100%" stopColor="#A0C4DC" />
                </linearGradient>
                <linearGradient id="iceBottomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7EB8DA" />
                    <stop offset="50%" stopColor="#5A9AC0" />
                    <stop offset="100%" stopColor="#3D7A9E" />
                </linearGradient>
                <filter id="iceShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3"/>
                </filter>
            </defs>
            <rect x="0" y="0" width="64" height="35" fill="url(#skyGradient)" rx="4" ry="4"/>
            <rect x="0" y="35" width="64" height="61" fill="url(#waterGradient)" rx="0" ry="0"/>
            <rect x="0" y="91" width="64" height="5" fill="url(#waterGradient)" rx="0" ry="4"/>
            <path d="M0 35 Q8 33 16 35 T32 35 T48 35 T64 35" fill="none" stroke="#6BA5D4" strokeWidth="1.5" opacity="0.7"/>
            <path d="M0 37 Q8 35 16 37 T32 37 T48 37 T64 37" fill="none" stroke="#5A94C3" strokeWidth="1" opacity="0.5"/>
            <polygon 
                points="32,8 42,20 46,32 18,32 22,20" 
                fill="url(#iceTopGradient)" 
                stroke="#A0C4DC" 
                strokeWidth="0.5"
                filter="url(#iceShadow)"
            />
            <polygon 
                points="32,10 38,18 36,28 28,28 30,18" 
                fill="white" 
                opacity="0.4"
            />
            <polygon 
                points="18,38 46,38 56,55 52,75 42,88 22,88 12,75 8,55" 
                fill="url(#iceBottomGradient)" 
                stroke="#3D7A9E" 
                strokeWidth="0.5"
                opacity="0.85"
            />
            <polygon 
                points="22,42 42,42 48,55 45,70 38,80 26,80 19,70 16,55" 
                fill="#8EC8E8" 
                opacity="0.3"
            />
            <circle cx="50" cy="50" r="1.5" fill="white" opacity="0.4"/>
            <circle cx="14" cy="60" r="1" fill="white" opacity="0.3"/>
            <circle cx="52" cy="70" r="1.2" fill="white" opacity="0.35"/>
            <circle cx="10" cy="45" r="0.8" fill="white" opacity="0.25"/>
        </svg>
    </div>
);

// 特性フィードバックコンポーネント
export const TraitFeedback = ({ title, userConcern, trait, userSituation, supportSituation }) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h4 className="font-bold text-blue-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-700 mb-1"><span className="font-medium">ご利用者が困っていること:</span> {userConcern}</p>
        <p className="text-sm text-gray-700 mb-1"><span className="font-medium">障害の特性:</span> {trait}</p>
        <p className="text-sm text-gray-700 mb-1"><span className="font-medium">今のご利用者の状況:</span> {userSituation}</p>
        <p className="text-sm text-gray-700"><span className="font-medium">今の支援の状況:</span> {supportSituation}</p>
    </div>
);

// 保存・印刷ボタンコンポーネント
export const SavePrintButtons = ({ onSave, onPrint, saveLabel = "このページを保存", printLabel = "このページを印刷" }) => (
    <div className="flex flex-wrap gap-3 mb-6 justify-end print:hidden">
        <button
            onClick={onSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-xl hover:from-emerald-500 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
        >
            <span className="text-lg">💾</span> {saveLabel}
        </button>
        <button
            onClick={onPrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-400 to-purple-500 text-white rounded-xl hover:from-violet-500 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
        >
            <span className="text-lg">🖨️</span> {printLabel}
        </button>
    </div>
);
