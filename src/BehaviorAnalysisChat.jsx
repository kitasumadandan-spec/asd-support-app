import React, { useState } from 'react';

export const BehaviorAnalysisChat = ({ onClose, worksheetData, concernContent }) => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `こんにちは！行動分析のお手伝いをします。

現在分析している行動: 「${concernContent || '（未設定）'}」

この行動について、以下の観点からお話しいただけますか？
- いつ、どこで起こりやすいですか？
- 何がきっかけになっていると思いますか？
- 行動の後、ご本人はどうなりますか？`
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // シミュレーション応答（実際のAPIがない場合）
        setTimeout(() => {
            const assistantMessage = {
                role: 'assistant',
                content: `ありがとうございます。お話しいただいた内容から、以下のことが考えられます：

1. **環境要因**: 行動が起こる状況には特定のパターンがあるかもしれません。

2. **コミュニケーション**: この行動は何かを伝えようとしている可能性があります。

3. **感覚面**: 感覚的な要因が関係している可能性もあります。

もう少し詳しくお聞かせください。他に気づいたことはありますか？`
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-2xl">
                    <h3 className="font-bold text-lg">🤖 発達障害わかる君</h3>
                    <button 
                        onClick={onClose}
                        className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div 
                            key={idx} 
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div 
                                className={`max-w-[80%] p-3 rounded-2xl ${
                                    msg.role === 'user' 
                                        ? 'bg-blue-500 text-white rounded-br-md' 
                                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                }`}
                            >
                                <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="p-4 border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="メッセージを入力..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            送信
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        ※ 必ずしも正確な回答をするわけではありません。考察の参考にしてください。
                    </p>
                </div>
            </div>
        </div>
    );
};
