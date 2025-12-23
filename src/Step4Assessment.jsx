import React, { useState, useEffect } from 'react';
import { Trash2 } from './SharedComponents';
import { rotatedTimeSlots } from './constants';

// ==================== コミュニケーションサンプルコンポーネント ====================

export const CommunicationSample = ({ actionName, data, setData }) => {
    const [observer, setObserver] = useState('');
    const [rows, setRows] = useState([
        {
            id: 1,
            time: '',
            place: '',
            person: '',
            behavior: '',
            request: '',
            attention: '',
            refusal: '',
            explanation_func: '',
            infoProvide: '',
            infoRequest: '',
            other_func: '',
            context: '',
            language: '',
            card: '',
            content: ''
        }
    ]);

    // 初期データの読み込み
    useEffect(() => {
        if (data) {
            setObserver(data.observer || '');
            setRows(data.rows && data.rows.length > 0 ? data.rows : [{
                id: 1,
                time: '', place: '', person: '', behavior: '',
                request: '', attention: '', refusal: '', explanation_func: '',
                infoProvide: '', infoRequest: '', other_func: '',
                context: '', language: '', card: '', content: ''
            }]);
        }
    }, [data]);

    // 自動保存
    useEffect(() => {
        const timer = setTimeout(() => {
            handleSave();
        }, 2000);
        return () => clearTimeout(timer);
    }, [observer, rows]);

    // 新しい行を追加
    const addRow = () => {
        const newRow = {
            id: rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1,
            time: '', place: '', person: '', behavior: '',
            request: '', attention: '', refusal: '', explanation_func: '',
            infoProvide: '', infoRequest: '', other_func: '',
            context: '', language: '', card: '', content: ''
        };
        setRows([...rows, newRow]);
    };

    // 行を削除
    const removeRow = (id) => {
        if (rows.length > 1) {
            setRows(rows.filter(row => row.id !== id));
        } else {
            alert('少なくとも1行は必要です');
        }
    };

    // 行のデータを更新
    const updateRow = (id, field, value) => {
        setRows(rows.map(row => 
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    // データを保存
    const handleSave = () => {
        const saveData = { observer, rows };
        setData(actionName, saveData);
    };

    // JSONエクスポート
    const handleExportJSON = () => {
        const exportData = { observer, rows };
        const jsonString = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `communication_sample_${actionName}_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // CSVエクスポート
    const handleExportCSV = () => {
        const headers = [
            '時間・状態', '場所', '誰に', '行動', '要求', '注意喚起', '拒否', '説明',
            '情報提供', '情報請求', 'その他', '文脈', '言語・身振り', 'カード', '内容'
        ];
        
        const csvRows = [
            [`観察者: ${observer}`],
            [],
            headers,
            ...rows.map(row => [
                row.time, row.place, row.person, row.behavior,
                row.request, row.attention, row.refusal, row.explanation_func,
                row.infoProvide, row.infoRequest, row.other_func,
                row.context, row.language, row.card, row.content
            ])
        ];

        const csvString = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `communication_sample_${actionName}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">⑫ コミュニケーション・サンプル表</h3>
                <span className="text-xs text-gray-500">💾 自動保存中...</span>
            </div>
            
            {/* 上部の入力欄 */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">観察者:</label>
                    <input
                        type="text"
                        value={observer}
                        onChange={(e) => setObserver(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="観察者名を入力してください"
                    />
                </div>
            </div>

            {/* ツールバー */}
            <div className="mb-4 flex flex-wrap gap-2 items-center">
                <button
                    onClick={addRow}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                >
                    ➕ 行を追加
                </button>

                <button
                    onClick={handleExportJSON}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                >
                    📥 JSON
                </button>

                <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm"
                >
                    📊 CSV
                </button>

                <div className="ml-auto text-sm text-gray-600">
                    記録数: <span className="font-bold text-blue-600">{rows.length}</span>件
                </div>
            </div>

            {/* コミュニケーション・サンプル表 */}
            <div className="overflow-x-auto border border-gray-300 rounded-lg">
                <table className="w-full border-collapse text-xs">
                    <thead>
                        <tr className="bg-gray-100">
                            <th colSpan="3" className="border border-gray-300 p-2 text-center font-bold">文脈</th>
                            <th rowSpan="2" className="border border-gray-300 p-2 text-center font-bold min-w-[150px]">
                                行動<br/>
                                <span className="text-[10px] font-normal text-gray-600">何を言ったか<br/>何をしたか</span>
                            </th>
                            <th colSpan="7" className="border border-gray-300 p-2 text-center font-bold">機能</th>
                            <th rowSpan="2" className="border border-gray-300 p-2 text-center font-bold min-w-[100px]">文脈</th>
                            <th colSpan="2" className="border border-gray-300 p-2 text-center font-bold">形態</th>
                            <th rowSpan="2" className="border border-gray-300 p-2 text-center font-bold min-w-[150px]">
                                内容<br/>
                                <span className="text-[10px] font-normal text-gray-600">何を伝えようとしたか</span>
                            </th>
                            <th rowSpan="2" className="border border-gray-300 p-2 text-center font-bold min-w-[60px]">操作</th>
                        </tr>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[120px]">
                                時間<br/>
                                <span className="text-[10px] font-normal text-gray-600">どんな時に<br/>どんな状態で</span>
                            </th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[100px]">場所</th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[100px]">誰に</th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[80px]">要求</th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[80px]">注意<br/>喚起</th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[80px]">拒否</th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[80px]">説明</th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[80px]">情報<br/>提供</th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[80px]">情報<br/>請求</th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[80px]">その他</th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[100px]">言語<br/>身振り</th>
                            <th className="border border-gray-300 p-2 text-center font-bold min-w-[100px]">カード</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 p-1">
                                    <textarea
                                        value={row.time}
                                        onChange={(e) => updateRow(row.id, 'time', e.target.value)}
                                        className="w-full min-h-[60px] p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 resize-y"
                                        placeholder="時間・状態"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.place}
                                        onChange={(e) => updateRow(row.id, 'place', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="場所"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.person}
                                        onChange={(e) => updateRow(row.id, 'person', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="誰に"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <textarea
                                        value={row.behavior}
                                        onChange={(e) => updateRow(row.id, 'behavior', e.target.value)}
                                        className="w-full min-h-[60px] p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 resize-y"
                                        placeholder="行動"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.request}
                                        onChange={(e) => updateRow(row.id, 'request', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="要求"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.attention}
                                        onChange={(e) => updateRow(row.id, 'attention', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="注意喚起"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.refusal}
                                        onChange={(e) => updateRow(row.id, 'refusal', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="拒否"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.explanation_func}
                                        onChange={(e) => updateRow(row.id, 'explanation_func', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="説明"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.infoProvide}
                                        onChange={(e) => updateRow(row.id, 'infoProvide', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="情報提供"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.infoRequest}
                                        onChange={(e) => updateRow(row.id, 'infoRequest', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="情報請求"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.other_func}
                                        onChange={(e) => updateRow(row.id, 'other_func', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="その他"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.context}
                                        onChange={(e) => updateRow(row.id, 'context', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="文脈"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.language}
                                        onChange={(e) => updateRow(row.id, 'language', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="言語・身振り"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <input
                                        type="text"
                                        value={row.card}
                                        onChange={(e) => updateRow(row.id, 'card', e.target.value)}
                                        className="w-full p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                                        placeholder="カード"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1">
                                    <textarea
                                        value={row.content}
                                        onChange={(e) => updateRow(row.id, 'content', e.target.value)}
                                        className="w-full min-h-[60px] p-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 resize-y"
                                        placeholder="内容"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1 text-center">
                                    <button
                                        onClick={() => removeRow(row.id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
                                        title="この行を削除"
                                    >
                                        削除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 使い方のヒント */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-sm text-blue-900 mb-2">💡 使い方のヒント:</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                    <li>• 入力内容は2秒後に自動的に保存されます</li>
                    <li>• 「行を追加」ボタンで新しい観察記録を追加できます</li>
                    <li>• JSON/CSV形式でデータをエクスポートできます</li>
                    <li>• 不要な行は「削除」ボタンで削除できます（最低1行は保持されます）</li>
                </ul>
            </div>
        </div>
    );
};

// ==================== スキャッタープロットコンポーネント ====================

export const ScatterPlotComponent = ({ actionName, data, setData, info, setInfo }) => {
    const handleCellClick = (rowIndex, colIndex) => {
        const newData = data.map((row, rIdx) => {
            if (rIdx === rowIndex) {
                const newRow = [...row];
                newRow[colIndex] = !newRow[colIndex];
                return newRow;
            }
            return row;
        });
        setData(actionName, newData);
    };

    const handleInfoChange = (field, value) => {
        setInfo(actionName, {
            ...(info || {}),
            [field]: value,
        });
    };
    
    const handleDateChange = (index, value) => {
        const newDates = [...((info && info.dates) || Array(14).fill(''))];
        newDates[index] = value;
        setInfo(actionName, {
            ...(info || {}),
            dates: newDates
        });
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">スキャッタープロット</h3>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">観察する行動</label>
                <input 
                    type="text" 
                    placeholder="観察する行動を入力" 
                    value={(info && info.observedAction) || ''} 
                    onChange={(e) => handleInfoChange('observedAction', e.target.value)} 
                    className="border p-2 rounded w-full"/>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                    <thead>
                        <tr>
                            <th className="border p-1">時間</th>
                            {Array.from({length: 14}).map((_, i) => (
                                <th key={i} className="border p-1">
                                    <input 
                                        type="text" 
                                        placeholder="月/日" 
                                        value={(info && info.dates && info.dates[i]) || ''} 
                                        onChange={(e) => handleDateChange(i, e.target.value)} 
                                        className="w-20 text-center text-xs p-1" 
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rotatedTimeSlots.map((time, rowIndex) => (
                            <tr key={time}>
                                <td className="border p-1 text-center font-medium">{time}</td>
                                {Array.from({length: 14}).map((_, colIndex) => (
                                    <td 
                                        key={colIndex} 
                                        className={`border p-1 h-4 cursor-pointer ${data[rowIndex] && data[rowIndex][colIndex] ? 'bg-green-200' : ''}`}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                    ></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ==================== ABC記録コンポーネント ====================

export const AbcRecordComponent = ({ actionName, records, setRecords }) => {
    const recordData = records || {
        startDate: '', 
        endDate: '', 
        records: [{ id: Date.now(), date: '', time: '', before: '', behavior: '', after: '' }]
    };
    
    const handleInfoChange = (field, value) => {
        setRecords(actionName, { ...recordData, [field]: value });
    };
    
    const addRecord = () => {
        const newRecords = [...recordData.records, 
            { id: Date.now(), date: '', time: '', before: '', behavior: '', after: '' }];
        setRecords(actionName, { ...recordData, records: newRecords });
    };
    
    const updateRecord = (id, field, value) => {
        const newRecords = recordData.records.map(r => 
            r.id === id ? { ...r, [field]: value } : r
        );
        setRecords(actionName, { ...recordData, records: newRecords });
    };
    
    const deleteRecord = (id) => {
        if (recordData.records.length === 1) return;
        const newRecords = recordData.records.filter(r => r.id !== id);
        setRecords(actionName, { ...recordData, records: newRecords });
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">ABC記録シート</h3>
            <div className="mb-4 flex gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">記録日:</label>
                <input type="date" value={recordData.startDate || ''} 
                    onChange={(e) => handleInfoChange('startDate', e.target.value)}
                    className="border p-2 rounded"/>
                <span className="text-sm">～</span>
                <input type="date" value={recordData.endDate || ''} 
                    onChange={(e) => handleInfoChange('endDate', e.target.value)}
                    className="border p-2 rounded"/>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 min-w-[80px]">日</th>
                            <th className="border p-2 min-w-[80px]">時間</th>
                            <th className="border p-2 min-w-[200px]">事前の状況<br/><span className="text-xs font-normal text-gray-500">直接のきっかけ、周囲の状況、行動直前の対象者の状態など</span></th>
                            <th className="border p-2 min-w-[200px]">対象者の行動<br/><span className="text-xs font-normal text-gray-500">対象者の行動を具体的に書く</span></th>
                            <th className="border p-2 min-w-[200px]">事後の状況<br/><span className="text-xs font-normal text-gray-500">周囲の対応と対象者の変化</span></th>
                            <th className="border p-2 w-[60px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordData.records.map((record) => (
                            <tr key={record.id}>
                                <td className="border p-2">
                                    <input type="text" value={record.date} 
                                        onChange={(e) => updateRecord(record.id, 'date', e.target.value)}
                                        placeholder="〇日"
                                        className="w-full p-1 text-sm"/>
                                </td>
                                <td className="border p-2">
                                    <input type="text" value={record.time} 
                                        onChange={(e) => updateRecord(record.id, 'time', e.target.value)}
                                        placeholder="15:00"
                                        className="w-full p-1 text-sm"/>
                                </td>
                                <td className="border p-2">
                                    <textarea value={record.before} 
                                        onChange={(e) => updateRecord(record.id, 'before', e.target.value)}
                                        placeholder="例：昼食時、食堂で、A職員に対して「おうちに帰る」と5分ほど繰り返し聞いていた。"
                                        className="w-full p-1 text-sm resize-none placeholder:text-gray-400"
                                        rows="3"/>
                                </td>
                                <td className="border p-2">
                                    <textarea value={record.behavior} 
                                        onChange={(e) => updateRecord(record.id, 'behavior', e.target.value)}
                                        placeholder="例：A職員が「土曜日に帰ります」と答えた。"
                                        className="w-full p-1 text-sm resize-none placeholder:text-gray-400"
                                        rows="3"/>
                                </td>
                                <td className="border p-2">
                                    <textarea value={record.after} 
                                        onChange={(e) => updateRecord(record.id, 'after', e.target.value)}
                                        placeholder="例：聞かなくなった。"
                                        className="w-full p-1 text-sm resize-none placeholder:text-gray-400"
                                        rows="3"/>
                                </td>
                                <td className="border p-2 text-center">
                                    <button onClick={() => deleteRecord(record.id)}
                                        disabled={recordData.records.length === 1}
                                        className="text-red-500 hover:text-red-700 disabled:text-gray-300 disabled:cursor-not-allowed">
                                        <Trash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <button onClick={addRecord}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    記録を追加
                </button>
            </div>
        </div>
    );
};

// ==================== FAST評価コンポーネント ====================

export const FastAssessmentComponent = ({ actionName, fastData, updateFastData }) => {
    const handleQuestionChange = (index, value) => {
        const newQuestions = [...fastData.questions];
        newQuestions[index] = value;
        updateFastData(actionName, { ...fastData, questions: newQuestions });
    };

    const handleProblemBehaviorChange = (index, value) => {
        const newBehaviors = [...fastData.problemBehaviors];
        newBehaviors[index] = value;
        updateFastData(actionName, { ...fastData, problemBehaviors: newBehaviors });
    };

    const handleSelectBehavior = (index) => {
        updateFastData(actionName, { ...fastData, selectedBehaviorIndex: index });
    };

    const calculateScores = () => {
        const scores = { social: 0, escape: 0, sensory: 0, pain: 0 };
        const questions = fastData.questions;
        [0,1,2,3].forEach(i => { if (questions[i] === true) scores.social++; });
        [4,5,6,7].forEach(i => { if (questions[i] === true) scores.escape++; });
        [8,9,10,11].forEach(i => { if (questions[i] === true) scores.sensory++; });
        [12,13,14,15].forEach(i => { if (questions[i] === true) scores.pain++; });
        return scores;
    };

    const scores = calculateScores();
    const questions = [
        "問題行動は、対象者が注目を得られていないとき、あるいは支援者が他の人に注意を向けているときに起こりますか？",
        "問題行動は、対象者が好む物や活動を拒否されたり、それらを取り上げられたりしたときに起こりますか？",
        "問題行動が起きたとき、支援者は通常、対象者を落ち着かせようとするか、対象者が好む活動に参加させますか？",
        "対象者は通常、多くの注目が得られているときや、好きな活動をしているとき、問題行動なしに過ごせていますか？",
        "通常、課題をするように求められたり活動への参加を求められたりすると、騒いだり、抵抗したりしますか？",
        "問題行動は、課題をしたり活動に参加するように求められたときに起こりますか？",
        "課題をするように求められている場面で問題行動が起きた場合、対象者は通常その課題を一時的にやらなくてもすむことになりますか？",
        "通常、対象者は何もする必要がないとき、問題行動なしに過ごせていますか？",
        "問題行動は、誰も近くにいないとき、または、見ていないときでも、起こりますか？",
        "対象者は、好きな活動をしてよいときでも問題行動を起こしますか？",
        "問題行動は\"自己刺激\"の形態の一つとして起きているようにみえますか？",
        "問題行動は、感覚を刺激する活動が提示されると起こりにくくなりますか？",
        "問題行動は、周期的で、数日間起きては止まりますか？",
        "耳の感染症やアレルギーなど、痛みを伴う症状を繰り返していますか？",
        "問題行動は、体調が悪いときに起こりやすいですか？",
        "対象者が身体的な問題を抱えている場合、治療・対処されれば、問題行動は通常おさまりますか？"
    ];

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h3 className="font-bold text-lg text-blue-900 mb-2">FAST（機能分析スクリーニングツール）</h3>
                <p className="text-sm text-blue-800">問題行動に影響を及ぼす可能性のある要因を特定するためのアセスメントツールです。</p>
                {actionName && (<p className="text-sm text-blue-800 mt-2"><strong>対象行動：</strong>{actionName}</p>)}
            </div>

            {/* セクションI: 記入者と対象者との関係 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                <h4 className="font-bold text-lg text-gray-800 border-b-2 border-gray-300 pb-2">I 記入者と対象者との関係</h4>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">1. 対象者との関係を記入してください。</label>
                    <div className="flex flex-wrap gap-4">
                        {['保護者', '支援者', 'その他'].map(rel => (
                            <label key={rel} className="flex items-center">
                                <input type="radio" checked={fastData.recorderRelationship === rel} 
                                    onChange={() => updateFastData(actionName, { ...fastData, recorderRelationship: rel })} className="mr-2" />
                                {rel}{rel === '支援者' && '（教育関係・医療関係・福祉関係）'}
                                {rel === 'その他' && '（具体的に：'}
                                {rel === 'その他' && <input type="text" disabled={fastData.recorderRelationship !== 'その他'} 
                                    className="ml-2 px-2 py-1 border border-gray-300 rounded w-40" />}
                                {rel === 'その他' && '）'}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">2. 対象者とどのくらいの期間関わっていますか？</label>
                        <div className="flex items-center gap-2">
                            <span className="text-sm">およそ</span>
                            <input type="number" value={fastData.relationshipPeriodYears} 
                                onChange={(e) => updateFastData(actionName, { ...fastData, relationshipPeriodYears: e.target.value })}
                                className="w-20 px-2 py-1 border border-gray-300 rounded" placeholder="3" />
                            <span className="text-sm">年</span>
                            <input type="number" value={fastData.relationshipPeriodMonths} 
                                onChange={(e) => updateFastData(actionName, { ...fastData, relationshipPeriodMonths: e.target.value })}
                                className="w-20 px-2 py-1 border border-gray-300 rounded" placeholder="6" />
                            <span className="text-sm">ヶ月</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">3. 対象者と毎日関わりがありますか？</label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input type="radio" checked={fastData.dailyContact === true} 
                                    onChange={() => updateFastData(actionName, { ...fastData, dailyContact: true })} className="mr-2" />
                                はい
                            </label>
                            <label className="flex items-center">
                                <input type="radio" checked={fastData.dailyContact === false} 
                                    onChange={() => updateFastData(actionName, { ...fastData, dailyContact: false })} className="mr-2" />
                                いいえ
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">4. あなたは普段、どのような場面で対象者と接しますか？</label>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { key: 'meal', label: '食事' },
                            { key: 'leisure', label: '余暇' },
                            { key: 'selfCare', label: '身辺自立' },
                            { key: 'learning', label: '学習指導' },
                            { key: 'work', label: '仕事／職業訓練' }
                        ].map(scene => (
                            <label key={scene.key} className="flex items-center">
                                <input type="checkbox" checked={fastData.contactScenes[scene.key]}
                                    onChange={(e) => updateFastData(actionName, { ...fastData, contactScenes: { ...fastData.contactScenes, [scene.key]: e.target.checked } })}
                                    className="mr-2" />
                                {scene.label}
                            </label>
                        ))}
                        <label className="flex items-center">
                            <input type="checkbox" checked={fastData.contactScenes.other}
                                onChange={(e) => updateFastData(actionName, { ...fastData, contactScenes: { ...fastData.contactScenes, other: e.target.checked } })}
                                className="mr-2" />
                            その他（具体的に：
                            <input type="text" value={fastData.contactScenes.otherText} disabled={!fastData.contactScenes.other}
                                onChange={(e) => updateFastData(actionName, { ...fastData, contactScenes: { ...fastData.contactScenes, otherText: e.target.value } })}
                                className="ml-2 px-2 py-1 border border-gray-300 rounded w-40" />
                            ）
                        </label>
                    </div>
                </div>
            </div>

            {/* セクションII: 問題行動に関する情報 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                <h4 className="font-bold text-lg text-gray-800 border-b-2 border-gray-300 pb-2">II 問題行動に関する情報</h4>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        1. 問題行動（具体的に記述し、その中で機能を評価したい行動について１つ選び、✓をいれてください）
                    </label>
                    <p className="text-xs text-gray-500 mb-3">※評定する行動は、FAST評定1回につき1つの行動になります。今回は頻度が週に1回以上の行動を1つ選択してください。</p>
                    <div className="space-y-2">
                        {fastData.problemBehaviors.map((behavior, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <input type="radio" checked={fastData.selectedBehaviorIndex === index}
                                    onChange={() => handleSelectBehavior(index)} className="flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-600">({index + 1})</span>
                                <input type="text" 
                                    value={behavior} 
                                    onChange={(e) => handleProblemBehaviorChange(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder={index === 0 ? "自身の頭を叩く" : ""}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-4 mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">「1. 問題行動」で✓をいれた行動について、以下に記入してください。</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">2. 頻度</label>
                            <div className="flex flex-wrap gap-4">
                                {['1時間に1回', '1日に1回', '週に1回', 'あまり頻繁ではない'].map(freq => (
                                    <label key={freq} className="flex items-center">
                                        <input type="radio" checked={fastData.frequency === freq}
                                            onChange={() => updateFastData(actionName, { ...fastData, frequency: freq })} className="mr-2" />
                                        {freq}
                                    </label>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">※各回答の中間の場合は各回答に"以上"をつけて判断してください（例：1日に1回以上）</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">3. 重症度</label>
                            <div className="space-y-2">
                                {[
                                    { value: '軽度', label: '軽度：まわりに迷惑をかけるが、自分や他人への被害はほとんどなし' },
                                    { value: '中度', label: '中度：物を壊したり、軽微な傷' },
                                    { value: '重度', label: '重度：健康または安全に対する重大な脅威' }
                                ].map(sev => (
                                    <label key={sev.value} className="flex items-start">
                                        <input type="radio" checked={fastData.severity === sev.value}
                                            onChange={() => updateFastData(actionName, { ...fastData, severity: sev.value })}
                                            className="mr-2 mt-1 flex-shrink-0" />
                                        <span className="text-sm">{sev.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">4. その問題行動が最も起こりやすい状況</label>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">曜日/時間帯</label>
                                    <input type="text" value={fastData.mostLikelySituation.dayTime}
                                        onChange={(e) => updateFastData(actionName, { ...fastData, mostLikelySituation: { ...fastData.mostLikelySituation, dayTime: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="ほぼ毎日17時から18時ごろ" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">場面/活動</label>
                                    <input type="text" value={fastData.mostLikelySituation.sceneActivity}
                                        onChange={(e) => updateFastData(actionName, { ...fastData, mostLikelySituation: { ...fastData.mostLikelySituation, sceneActivity: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="余暇の時間、ホールでテレビを見ている時" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">その場にいる人</label>
                                    <input type="text" value={fastData.mostLikelySituation.people}
                                        onChange={(e) => updateFastData(actionName, { ...fastData, mostLikelySituation: { ...fastData.mostLikelySituation, people: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="スタッフ・他の利用者" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">5. その問題行動が最も起こりにくい状況</label>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">曜日/時間帯</label>
                                    <input type="text" value={fastData.leastLikelySituation.dayTime}
                                        onChange={(e) => updateFastData(actionName, { ...fastData, leastLikelySituation: { ...fastData.leastLikelySituation, dayTime: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="日曜日の夕食後、19時ごろ" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">場面/活動</label>
                                    <input type="text" value={fastData.leastLikelySituation.sceneActivity}
                                        onChange={(e) => updateFastData(actionName, { ...fastData, leastLikelySituation: { ...fastData.leastLikelySituation, sceneActivity: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="個室での余暇の時間、本人の好きなDVDを見ている時" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">その場にいる人</label>
                                    <input type="text" value={fastData.leastLikelySituation.people}
                                        onChange={(e) => updateFastData(actionName, { ...fastData, leastLikelySituation: { ...fastData.leastLikelySituation, people: e.target.value } })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="本人のみ" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">6. その問題行動が起きる直前、対象者のおかれた状況はどのようなものですか？</label>
                            <textarea value={fastData.beforeBehavior}
                                onChange={(e) => updateFastData(actionName, { ...fastData, beforeBehavior: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3"
                                placeholder="他の利用者と一緒に夕方の教育番組を見ている。スタッフは食事の準備をしている。" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">7. その問題行動が起きた直後、対象者に対して何がおきますか？</label>
                            <textarea value={fastData.afterBehavior}
                                onChange={(e) => updateFastData(actionName, { ...fastData, afterBehavior: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3"
                                placeholder="スタッフから注目を得られる。DVDが見れる。" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">8. 現在、行っている対応</label>
                            <textarea value={fastData.currentResponse}
                                onChange={(e) => updateFastData(actionName, { ...fastData, currentResponse: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows="3"
                                placeholder="本人に近寄って頭を叩かないように声掛けする。スタッフがDVDを準備し、見てもらう。" />
                        </div>
                    </div>
                </div>
            </div>

            {/* セクションIII: 問題行動に関する質問 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                <h4 className="font-bold text-lg text-gray-800 border-b-2 border-gray-300 pb-2">III 問題行動に関する質問</h4>
                <p className="text-sm text-gray-600 mb-4">「II 1. 問題行動」で✓をいれた行動について、以下の質問に答えてください。</p>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left w-12">番号</th>
                                <th className="border border-gray-300 p-2 text-left">質問</th>
                                <th className="border border-gray-300 p-2 text-center w-48">選択肢</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border border-gray-300 p-2 text-center font-medium">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{question}</td>
                                    <td className="border border-gray-300 p-2">
                                        {index === 13 ? (
                                            <div className="space-y-2">
                                                <div className="flex justify-center gap-4">
                                                    {['はい', 'いいえ', '不明'].map(option => (
                                                        <label key={option} className="flex items-center cursor-pointer">
                                                            <input type="radio"
                                                                checked={option === 'はい' ? fastData.questions[index] === true :
                                                                    option === 'いいえ' ? fastData.questions[index] === false :
                                                                    fastData.questions[index] === 'unknown'}
                                                                onChange={() => handleQuestionChange(index, option === 'はい' ? true : option === 'いいえ' ? false : 'unknown')}
                                                                className="mr-1" />
                                                            {option}
                                                        </label>
                                                    ))}
                                                </div>
                                                {fastData.questions[index] === true && (
                                                    <input type="text" value={fastData.physicalProblemDetail}
                                                        onChange={(e) => updateFastData(actionName, { ...fastData, physicalProblemDetail: e.target.value })}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="具体的に書いてください" />
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex justify-center gap-4">
                                                {['はい', 'いいえ', '不明'].map(option => (
                                                    <label key={option} className="flex items-center cursor-pointer">
                                                        <input type="radio"
                                                            checked={option === 'はい' ? fastData.questions[index] === true :
                                                                option === 'いいえ' ? fastData.questions[index] === false :
                                                                fastData.questions[index] === 'unknown'}
                                                            onChange={() => handleQuestionChange(index, option === 'はい' ? true : option === 'いいえ' ? false : 'unknown')}
                                                            className="mr-1" />
                                                        {option}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 採点 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-lg text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">採点</h4>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                    <p className="text-sm text-yellow-800">各質問で「はい」と答えた番号に丸をつけ、「合計数」の欄に丸をつけた項目の数を記入してください。</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">「はい」に丸をつけた項目</th>
                                <th className="border border-gray-300 p-2 w-24">合計数</th>
                                <th className="border border-gray-300 p-2">強化の可能性がある要因</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { numbers: [1,2,3,4], label: '社会的（注目／好みのものや活動）', score: scores.social },
                                { numbers: [5,6,7,8], label: '社会的（課題や活動からの逃避）', score: scores.escape },
                                { numbers: [9,10,11,12], label: '自動的（感覚刺激）', score: scores.sensory },
                                { numbers: [13,14,15,16], label: '自動的（痛みの軽減）', score: scores.pain }
                            ].map((row, idx) => (
                                <tr key={idx}>
                                    <td className="border border-gray-300 p-2">
                                        <div className="flex flex-wrap gap-2">
                                            {row.numbers.map(num => (
                                                <span key={num} className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 font-medium ${
                                                    fastData.questions[num - 1] === true ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-400'
                                                }`}>{num}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white text-xl font-bold">{row.score}</span>
                                    </td>
                                    <td className="border border-gray-300 p-2 font-medium">{row.label}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h5 className="font-bold text-gray-800 mb-2">結果の解釈</h5>
                    <p className="text-sm text-gray-700 mb-2">合計数の多い項目が想定される機能となります。なお、行動の機能が複数ある場合もあります。</p>
                    <p className="text-sm text-gray-700"><strong>注意：</strong>機能は同じ行動でも場面によって異なる可能性があります。可能であれば、1つの場面を想定して記入してください。</p>
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-bold text-blue-900 mb-2">担当者の方へ</h5>
                    <p className="text-sm text-blue-800">
                        FASTは、問題行動に影響を与える可能性のある要因を特定します。FASTは、行動の包括的な機能分析の一環としてのスクリーニングにのみ使用してください。対象者と頻繁に接する複数の人にFASTを実施してください。そして、FASTの結果をもとに、仮説された行動機能を確認し、また、問題行動に影響を与える可能性のある他の要因を見つけるため、いくつかの異なる状況下で直接観察を行って下さい。
                    </p>
                </div>
            </div>
        </div>
    );
};

// ==================== コミュニケーションサンプル分析コンポーネント ====================


// ==================== コミュニケーションサンプル分析コンポーネント（対話型AIアシスタント版） ====================

export const CommunicationAnalysis = ({ actionName, data, setData }) => {
    // 現在のステップと質問を管理
    const [currentStep, setCurrentStep] = useState(0); // 0: データ入力, 1-4: 質問ステップ, 5: レポート生成
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // ステップ0: データ入力
    const [sampleData, setSampleData] = useState('');

    // ステップ1のデータ
    const [step1Data, setStep1Data] = useState({
        purposes: [],
        mainPurpose: '',
        specificBehavior: '',
        unmetReaction: ''
    });

    // ステップ2のデータ
    const [step2Data, setStep2Data] = useState({
        methods: [],
        easiestMethod: '',
        situation: ''
    });

    // ステップ3のデータ
    const [step3Data, setStep3Data] = useState({
        calmSituation: '',
        difficultSituation: ''
    });

    // ステップ4のデータ
    const [step4Data, setStep4Data] = useState({
        interests: '',
        positiveExpression: ''
    });

    // データの初期化
    useEffect(() => {
        if (data) {
            setSampleData(data.sampleData || '');
            setStep1Data(data.step1 || { purposes: [], mainPurpose: '', specificBehavior: '', unmetReaction: '' });
            setStep2Data(data.step2 || { methods: [], easiestMethod: '', situation: '' });
            setStep3Data(data.step3 || { calmSituation: '', difficultSituation: '' });
            setStep4Data(data.step4 || { interests: '', positiveExpression: '' });
        }
    }, [data]);

    // 自動保存
    useEffect(() => {
        const timer = setTimeout(() => {
            const allData = {
                sampleData,
                step1: step1Data,
                step2: step2Data,
                step3: step3Data,
                step4: step4Data
            };
            setData(actionName, allData);
        }, 2000);
        return () => clearTimeout(timer);
    }, [sampleData, step1Data, step2Data, step3Data, step4Data]);

    // 選択肢の定義
    const purposeOptions = [
        { id: 1, label: '〇〇が欲しい、〇〇したい（要求）' },
        { id: 2, label: 'いやだ、やめたい（拒否）' },
        { id: 3, label: '注目してほしい、気づいてほしい（注意喚起）' },
        { id: 4, label: '〇〇があったよ、見て（情報提供）' },
        { id: 5, label: 'これは何？どうして？（情報請求）' },
        { id: 6, label: 'あいさつ、お礼、謝罪（社会的やりとり）' },
        { id: 7, label: 'その他' }
    ];

    const methodOptions = [
        { id: 1, label: '指差し' },
        { id: 2, label: '視線（物や人をじっと見る）' },
        { id: 3, label: 'クレーン現象（大人の手を使う）' },
        { id: 4, label: '身振り・ジェスチャー' },
        { id: 5, label: '絵カードや写真カード' },
        { id: 6, label: '物を渡す、見せる' },
        { id: 7, label: '体を寄せる、触れる' },
        { id: 8, label: '特定の声を出す' },
        { id: 9, label: 'その他' }
    ];

    // 次の質問へ
    const nextQuestion = () => {
        if (currentStep === 0) {
            setCurrentStep(1);
            setCurrentQuestion(1);
        } else if (currentStep === 1) {
            if (currentQuestion === 1) {
                setCurrentQuestion(2);
            } else if (currentQuestion === 2) {
                setCurrentQuestion(3);
            } else if (currentQuestion === 3) {
                setCurrentStep(2);
                setCurrentQuestion(1);
            }
        } else if (currentStep === 2) {
            if (currentQuestion === 1) {
                setCurrentQuestion(2);
            } else if (currentQuestion === 2) {
                setCurrentStep(3);
                setCurrentQuestion(1);
            }
        } else if (currentStep === 3) {
            if (currentQuestion === 1) {
                setCurrentQuestion(2);
            } else if (currentQuestion === 2) {
                setCurrentStep(4);
                setCurrentQuestion(1);
            }
        } else if (currentStep === 4) {
            if (currentQuestion === 1) {
                setCurrentQuestion(2);
            } else if (currentQuestion === 2) {
                setCurrentStep(5); // レポート生成へ
            }
        }
    };

    // 前の質問へ
    const prevQuestion = () => {
        if (currentStep === 1 && currentQuestion === 1) {
            setCurrentStep(0);
            setCurrentQuestion(0);
        } else if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        } else if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            if (currentStep === 2) setCurrentQuestion(3);
            else if (currentStep === 3) setCurrentQuestion(2);
            else if (currentStep === 4) setCurrentQuestion(2);
            else if (currentStep === 5) setCurrentQuestion(2);
        }
    };

    // 進行可能かチェック
    const canProceed = () => {
        if (currentStep === 0) return sampleData.trim().length > 0;
        if (currentStep === 1) {
            if (currentQuestion === 1) return step1Data.purposes.length > 0;
            if (currentQuestion === 2) return step1Data.mainPurpose && step1Data.specificBehavior;
            if (currentQuestion === 3) return step1Data.unmetReaction;
        } else if (currentStep === 2) {
            if (currentQuestion === 1) return step2Data.methods.length > 0;
            if (currentQuestion === 2) return step2Data.easiestMethod && step2Data.situation;
        } else if (currentStep === 3) {
            if (currentQuestion === 1) return step3Data.calmSituation;
            if (currentQuestion === 2) return step3Data.difficultSituation;
        } else if (currentStep === 4) {
            if (currentQuestion === 1) return step4Data.interests;
            if (currentQuestion === 2) return step4Data.positiveExpression;
        }
        return false;
    };

    // ステップ0: 導入とデータ入力
    const renderStep0 = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 p-6 rounded-lg">
                <h3 className="font-bold text-2xl text-gray-800 mb-4 flex items-center">
                    👋 こんにちは
                </h3>
                <p className="text-gray-700 mb-3">
                    私はあなたのコミュニケーション分析をお手伝いするアシスタントです。
                </p>
                <p className="text-gray-700">
                    まず始めに、分析の元になる<span className="font-bold text-blue-700">「コミュニケーション・サンプル表」の観察記録</span>を、
                    以下のテキストボックスにコピー＆ペーストしてください。
                </p>
                <p className="text-gray-700 mt-2">
                    データを確認した後、ご本人のコミュニケーションの素晴らしい可能性を引き出すために、いくつかの質問をさせていただきますね。
                </p>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                    📋 コミュニケーション・サンプル表データ:
                </label>
                <textarea
                    value={sampleData}
                    onChange={(e) => setSampleData(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    placeholder="ここにコミュニケーション・サンプル表のデータをペーストしてください...

例:
時間: 10:00, 場所: 教室, 誰に: 先生, 行動: 指差し, 要求: ○, 内容: おやつが欲しい
時間: 10:30, 場所: 遊び場, 誰に: 友達, 行動: 視線を送る, 注意喚起: ○, 内容: 遊びに誘う
..."
                    rows={12}
                    style={{ minHeight: '300px' }}
                />
                
                <div className="mt-4 text-sm text-gray-600 bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                    <p className="font-medium text-yellow-900 mb-1">💡 ヒント:</p>
                    <p className="text-yellow-800">
                        ⑫コミュニケーション・サンプル表で記録した観察データを、そのままコピーしてこちらに貼り付けてください。
                        データの形式は問いません。表形式、箇条書き、メモ書きなど、どのような形でも大丈夫です。
                    </p>
                </div>
            </div>
        </div>
    );

    // ステップ1: コミュニケーションの「目的（機能）」を探る
    const renderStep1 = () => {
        if (currentQuestion === 1) {
            return (
                <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded">
                        <h4 className="font-bold text-blue-900 mb-2 text-lg">
                            ステップ1: コミュニケーションの「目的（機能）」を探る
                        </h4>
                        <p className="text-blue-800">
                            最初のステップでは、ご本人が<span className="font-bold">「何を伝えたいのか」</span>という
                            コミュニケーションの根本的な動機を探っていきましょう。
                        </p>
                    </div>

                    <div className="bg-white border-2 border-blue-200 rounded-lg p-6 shadow-sm">
                        <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1-1</span>
                            質問1-1
                        </h5>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            記録全体を振り返って、ご本人が何かを伝えようとした時、その<span className="font-bold text-blue-700">「目的（機能）」</span>で
                            最も多かったものはどれですか？<span className="text-red-600 font-bold">当てはまるものを3つまで選んでください。</span>
                        </p>

                        <div className="space-y-3">
                            {purposeOptions.map(option => (
                                <label 
                                    key={option.id}
                                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        step1Data.purposes.includes(option.id)
                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={step1Data.purposes.includes(option.id)}
                                        onChange={(e) => {
                                            const newPurposes = e.target.checked
                                                ? [...step1Data.purposes, option.id].slice(0, 3)
                                                : step1Data.purposes.filter(id => id !== option.id);
                                            setStep1Data({ ...step1Data, purposes: newPurposes });
                                        }}
                                        disabled={!step1Data.purposes.includes(option.id) && step1Data.purposes.length >= 3}
                                        className="mr-3 h-5 w-5"
                                    />
                                    <span className="text-gray-800 font-medium">{option.label}</span>
                                </label>
                            ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                                選択済み: <span className="font-bold text-blue-600 text-lg">{step1Data.purposes.length}</span> / 3
                            </span>
                            {step1Data.purposes.length === 3 && (
                                <span className="text-green-600 font-medium">✓ 3つ選択されました</span>
                            )}
                        </div>
                    </div>
                </div>
            );
        } else if (currentQuestion === 2) {
            return (
                <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded">
                        <p className="text-blue-800 leading-relaxed">
                            <span className="font-bold">ありがとうございます。</span>その中でも特に強い動機を深掘りしますね。
                        </p>
                    </div>

                    <div className="bg-white border-2 border-blue-200 rounded-lg p-6 shadow-sm">
                        <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1-2</span>
                            質問1-2
                        </h5>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            今選んでいただいた目的のうち、<span className="font-bold text-blue-700">最も頻度が高いもの</span>を一つ教えてください。<br/>
                            そして、その目的を伝えようとする時に、<span className="font-bold text-blue-700">具体的にどのような行動が見られましたか？</span>
                        </p>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    最も頻度が高い目的:
                                </label>
                                <textarea
                                    value={step1Data.mainPurpose}
                                    onChange={(e) => setStep1Data({ ...step1Data, mainPurpose: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="例: 要求（欲しいものを手に入れたい）"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    具体的な行動:
                                </label>
                                <textarea
                                    value={step1Data.specificBehavior}
                                    onChange={(e) => setStep1Data({ ...step1Data, specificBehavior: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="例: 欲しいものを指差す、大人の手を持っていく、声を出して要求するなど、できるだけ具体的に記入してください"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (currentQuestion === 3) {
            return (
                <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded">
                        <p className="text-blue-800 leading-relaxed">
                            <span className="font-bold">なるほど、</span>その行動で伝えようとしているのですね。
                            では、もしその要求が通らなかった場合はどうなりますか？
                        </p>
                    </div>

                    <div className="bg-white border-2 border-blue-200 rounded-lg p-6 shadow-sm">
                        <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1-3</span>
                            質問1-3
                        </h5>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            その目的が満たされなかった時、ご本人の行動はどのように変化しますか？
                        </p>

                        <textarea
                            value={step1Data.unmetReaction}
                            onChange={(e) => setStep1Data({ ...step1Data, unmetReaction: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="例: 声が大きくなる、その場を離れる、諦めてしまう、繰り返し同じ行動をする、など具体的に記入してください"
                            rows={5}
                        />
                    </div>
                </div>
            );
        }
    };

    // ステップ2: コミュニケーションの「方法（形態）」を明らかにする
    const renderStep2 = () => {
        if (currentQuestion === 1) {
            return (
                <div className="space-y-6">
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded">
                        <h4 className="font-bold text-purple-900 mb-2 text-lg">
                            ステップ2: コミュニケーションの「方法（形態）」を明らかにする
                        </h4>
                        <p className="text-purple-800">
                            次のステップでは、ご本人が<span className="font-bold">「どのように伝えようとしているか」</span>という
                            得意な伝達方法を見つけていきましょう。<br/>
                            これを活かすことが支援の近道になります。
                        </p>
                    </div>

                    <div className="bg-white border-2 border-purple-200 rounded-lg p-6 shadow-sm">
                        <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                            <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2-1</span>
                            質問2-1
                        </h5>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            ご本人が何かを伝えようとする時、言葉以外ではどのような<span className="font-bold text-purple-700">「方法（形態）」</span>をよく使いますか？
                            <span className="text-red-600 font-bold">よく使うものを3つ教えてください。</span>
                        </p>

                        <div className="space-y-3">
                            {methodOptions.map(option => (
                                <label 
                                    key={option.id}
                                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        step2Data.methods.includes(option.id)
                                            ? 'border-purple-500 bg-purple-50 shadow-md'
                                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={step2Data.methods.includes(option.id)}
                                        onChange={(e) => {
                                            const newMethods = e.target.checked
                                                ? [...step2Data.methods, option.id].slice(0, 3)
                                                : step2Data.methods.filter(id => id !== option.id);
                                            setStep2Data({ ...step2Data, methods: newMethods });
                                        }}
                                        disabled={!step2Data.methods.includes(option.id) && step2Data.methods.length >= 3}
                                        className="mr-3 h-5 w-5"
                                    />
                                    <span className="text-gray-800 font-medium">{option.label}</span>
                                </label>
                            ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                                選択済み: <span className="font-bold text-purple-600 text-lg">{step2Data.methods.length}</span> / 3
                            </span>
                            {step2Data.methods.length === 3 && (
                                <span className="text-green-600 font-medium">✓ 3つ選択されました</span>
                            )}
                        </div>
                    </div>
                </div>
            );
        } else if (currentQuestion === 2) {
            return (
                <div className="space-y-6">
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded">
                        <p className="text-purple-800 leading-relaxed">
                            <span className="font-bold">ご本人が使いやすい方法が見えてきましたね。</span>
                        </p>
                    </div>

                    <div className="bg-white border-2 border-purple-200 rounded-lg p-6 shadow-sm">
                        <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                            <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2-2</span>
                            質問2-2
                        </h5>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            今選んでいただいた方法の中で、ご本人が<span className="font-bold text-purple-700">最も自然に、あるいは楽そうに使っている</span>と感じるものはどれですか？<br/>
                            また、それは<span className="font-bold text-purple-700">どのような状況で特によく見られますか？</span>
                        </p>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    最も自然な方法:
                                </label>
                                <textarea
                                    value={step2Data.easiestMethod}
                                    onChange={(e) => setStep2Data({ ...step2Data, easiestMethod: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="例: 指差しが最も自然に使えている、視線を送るのが得意など"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    よく見られる状況:
                                </label>
                                <textarea
                                    value={step2Data.situation}
                                    onChange={(e) => setStep2Data({ ...step2Data, situation: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="例: おやつの時間に、欲しいものを選ぶ時によく指差しをする、好きな遊びの時に視線でアピールするなど"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    // ステップ3: コミュニケーションが起こる「状況（文脈）」を読み解く
    const renderStep3 = () => {
        if (currentQuestion === 1) {
            return (
                <div className="space-y-6">
                    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded">
                        <h4 className="font-bold text-green-900 mb-2 text-lg">
                            ステップ3: コミュニケーションが起こる「状況（文脈）」を読み解く
                        </h4>
                        <p className="text-green-800">
                            3つ目のステップでは、コミュニケーションが<span className="font-bold">「いつ、どこで」</span>起こりやすいのか、その状況を整理します。<br/>
                            新しいスキルを学ぶのに最適な環境を見つける手がかりになります。
                        </p>
                    </div>

                    <div className="bg-white border-2 border-green-200 rounded-lg p-6 shadow-sm">
                        <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                            <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3-1</span>
                            質問3-1
                        </h5>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            ご本人が、比較的落ち着いていて、コミュニケーションが成功しやすいのは、どのような<span className="font-bold text-green-700">「状況（文脈）」</span>ですか？<br/>
                            場所、時間、人、活動など、具体的に教えてください。
                        </p>

                        <textarea
                            value={step3Data.calmSituation}
                            onChange={(e) => setStep3Data({ ...step3Data, calmSituation: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="例: 朝の会、〇〇先生と二人きりの時、好きなおもちゃで遊んでいる時、静かな環境、決まったルーティンの中など"
                            rows={6}
                        />
                    </div>
                </div>
            );
        } else if (currentQuestion === 2) {
            return (
                <div className="space-y-6">
                    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded">
                        <p className="text-green-800 leading-relaxed">
                            <span className="font-bold">素晴らしい観察眼ですね。</span>安心できる場面が分かると、支援の計画が立てやすくなります。<br/>
                            逆に、少し難しい場面についても教えてください。
                        </p>
                    </div>

                    <div className="bg-white border-2 border-green-200 rounded-lg p-6 shadow-sm">
                        <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                            <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3-2</span>
                            質問3-2
                        </h5>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            反対に、混乱したり、不適切な行動が起きやすかったりするのは、どのような<span className="font-bold text-green-700">「状況（文脈）」</span>ですか？
                        </p>

                        <textarea
                            value={step3Data.difficultSituation}
                            onChange={(e) => setStep3Data({ ...step3Data, difficultSituation: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="例: 賑やかな場所、予定が変更になった時、課題が難しい時、大人数の集団の中、待ち時間が長い時など"
                            rows={6}
                        />
                    </div>
                </div>
            );
        }
    };

    // ステップ4: コミュニケーションの「世界（内容）」を広げるヒントを探す
    const renderStep4 = () => {
        if (currentQuestion === 1) {
            return (
                <div className="space-y-6">
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded">
                        <h4 className="font-bold text-orange-900 mb-2 text-lg">
                            ステップ4: コミュニケーションの「世界（内容）」を広げるヒントを探す
                        </h4>
                        <p className="text-orange-800">
                            最後のステップです。ここでは、コミュニケーションの<span className="font-bold">「話題」</span>を広げ、
                            より豊かなやりとりに繋げるためのヒントを探します。
                        </p>
                    </div>

                    <div className="bg-white border-2 border-orange-200 rounded-lg p-6 shadow-sm">
                        <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">4-1</span>
                            質問4-1
                        </h5>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            ご本人が特に興味を持っていること、好きなもの・ことは何ですか？<br/>
                            これが、今後のコミュニケーションの楽しい<span className="font-bold text-orange-700">「話題」</span>になります。
                            思いつく限りたくさん挙げてください。
                        </p>

                        <textarea
                            value={step4Data.interests}
                            onChange={(e) => setStep4Data({ ...step4Data, interests: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="例: 電車、水、キラキラ光るもの、特定のキャラクター、音楽、絵本、特定の場所など、できるだけ多く記入してください"
                            rows={6}
                        />
                    </div>
                </div>
            );
        } else if (currentQuestion === 2) {
            return (
                <div className="space-y-6">
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded">
                        <p className="text-orange-800 leading-relaxed">
                            <span className="font-bold">素敵な「好き」がたくさんありますね！</span>それがご本人の世界を広げる力になります。
                        </p>
                    </div>

                    <div className="bg-white border-2 border-orange-200 rounded-lg p-6 shadow-sm">
                        <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">4-2</span>
                            質問4-2
                        </h5>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            ご本人が<span className="font-bold text-orange-700">「嬉しい」「楽しい」</span>といったポジティブな感情を表しているのは、どのような時ですか？<br/>
                            その気持ちを表現する方法を一緒に考えていきましょう。
                        </p>

                        <textarea
                            value={step4Data.positiveExpression}
                            onChange={(e) => setStep4Data({ ...step4Data, positiveExpression: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="例: 好きな電車を見た時に笑顔になる、好きな歌を聞くと体を揺らす、好きな遊びの時に声を出して笑うなど"
                            rows={6}
                        />
                    </div>
                </div>
            );
        }
    };

    // ステップ5: 最終レポート生成
    const renderReport = () => {
        // 選択された目的のラベルを取得
        const selectedPurposeLabels = step1Data.purposes.map(id => 
            purposeOptions.find(opt => opt.id === id)?.label || ''
        ).filter(label => label);

        // 選択された方法のラベルを取得
        const selectedMethodLabels = step2Data.methods.map(id => 
            methodOptions.find(opt => opt.id === id)?.label || ''
        ).filter(label => label);

        return (
            <div className="space-y-6">
                {/* 完了通知 */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-400 p-6 rounded-lg shadow-lg">
                    <h3 className="font-bold text-2xl text-gray-800 mb-3 flex items-center">
                        🎉 分析完了！
                    </h3>
                    <p className="text-gray-700 text-lg">
                        ありがとうございました。貴重な情報をたくさん教えていただき、感謝します。<br/>
                        いただいた回答とサンプル表のデータを元に、分析レポートを作成しました。
                    </p>
                </div>

                {/* レポート本体 */}
                <div className="bg-white border-2 border-gray-300 rounded-lg p-8 shadow-md">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 border-b-4 border-blue-500 pb-4">
                        コミュニケーション分析レポート
                    </h2>

                    {/* はじめに */}
                    <div className="mb-8 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                        <h3 className="font-bold text-xl text-gray-800 mb-3">はじめに</h3>
                        <p className="text-gray-700 leading-relaxed">
                            このたびは、詳細な観察記録と質問へのご回答をいただき、誠にありがとうございました。
                            このレポートは、ご本人のコミュニケーションの現状を多角的に分析し、
                            今後の支援に向けた具体的な提案をまとめたものです。
                            ご本人の強みを活かし、無理なく楽しみながらコミュニケーションスキルを伸ばしていくための
                            指針としてご活用ください。
                        </p>
                    </div>

                    {/* 1. コミュニケーションの現状分析 */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">
                            1. コミュニケーションの現状分析
                        </h3>

                        {/* 1.1 主なコミュニケーションの目的（機能） */}
                        <div className="mb-6 bg-white border-2 border-blue-200 rounded-lg p-5">
                            <h4 className="font-bold text-lg text-blue-800 mb-3">
                                1.1. 主なコミュニケーションの目的（機能）
                            </h4>
                            <div className="text-gray-700 space-y-2 leading-relaxed">
                                <p>
                                    観察記録から、ご本人のコミュニケーションには主に以下の目的が見られます：
                                    <span className="font-bold text-blue-700">
                                        {selectedPurposeLabels.join('、')}
                                    </span>
                                </p>
                                <p>
                                    中でも、<span className="font-bold text-blue-700">{step1Data.mainPurpose}</span>が
                                    最も頻度の高い動機として確認されました。
                                    この目的を伝えようとする際、ご本人は
                                    <span className="font-bold">「{step1Data.specificBehavior}」</span>という行動を示しています。
                                </p>
                                <p>
                                    また、この目的が満たされない場合には、
                                    <span className="font-bold">「{step1Data.unmetReaction}」</span>という反応が見られることから、
                                    ご本人にとってこの動機が非常に重要であることが分かります。
                                </p>
                            </div>
                        </div>

                        {/* 1.2 得意なコミュニケーションの方法（形態） */}
                        <div className="mb-6 bg-white border-2 border-purple-200 rounded-lg p-5">
                            <h4 className="font-bold text-lg text-purple-800 mb-3">
                                1.2. 得意なコミュニケーションの方法（形態）
                            </h4>
                            <div className="text-gray-700 space-y-2 leading-relaxed">
                                <p>
                                    ご本人が何かを伝えようとする際、非言語的な手段として
                                    <span className="font-bold text-purple-700">
                                        {selectedMethodLabels.join('、')}
                                    </span>
                                    をよく使用していることが確認されました。
                                </p>
                                <p>
                                    特に、<span className="font-bold">「{step2Data.easiestMethod}」</span>が
                                    最も自然で楽そうに使える方法として観察されています。
                                    この方法は、<span className="font-bold">「{step2Data.situation}」</span>という状況で
                                    特によく見られることから、ご本人にとって安心して使える得意な伝達手段であると言えます。
                                </p>
                                <p className="text-sm bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                                    💡 <strong>分析ポイント：</strong>
                                    この得意な方法を起点として、段階的にコミュニケーション手段を広げていくことが効果的です。
                                </p>
                            </div>
                        </div>

                        {/* 1.3 コミュニケーションの傾向（文脈） */}
                        <div className="mb-6 bg-white border-2 border-green-200 rounded-lg p-5">
                            <h4 className="font-bold text-lg text-green-800 mb-3">
                                1.3. コミュニケーションの傾向（文脈）
                            </h4>
                            <div className="text-gray-700 space-y-3 leading-relaxed">
                                <div>
                                    <p className="font-bold text-green-700 mb-1">✓ 成功しやすい状況：</p>
                                    <p className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                                        {step3Data.calmSituation}
                                    </p>
                                    <p className="text-sm mt-2">
                                        これらの状況では、ご本人は比較的落ち着いており、コミュニケーションが円滑に進む傾向があります。
                                        新しいスキルを練習する際は、このような環境から始めることが効果的です。
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold text-red-700 mb-1">⚠ 困難が生じやすい状況：</p>
                                    <p className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                                        {step3Data.difficultSituation}
                                    </p>
                                    <p className="text-sm mt-2">
                                        これらの状況では、混乱や不適切な行動が起きやすいため、
                                        環境調整や事前の準備が特に重要になります。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. 今後のコミュニケーション支援に向けた提案 */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">
                            2. 今後のコミュニケーション支援に向けた提案
                        </h3>

                        {/* 2.1 最優先の提案 */}
                        <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-6 shadow-md">
                            <h4 className="font-bold text-xl text-orange-900 mb-4 flex items-center">
                                <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">★</span>
                                2.1. 【最優先の提案】 代替行動で「伝え方」を教える
                            </h4>
                            <div className="text-gray-800 space-y-3 leading-relaxed">
                                <p>
                                    ご本人は<span className="font-bold text-orange-700">「{step1Data.mainPurpose}」</span>という
                                    強い動機を持ち、それを<span className="font-bold">「{step1Data.specificBehavior}」</span>という
                                    行動で表現しています。
                                </p>
                                <p className="bg-white p-4 rounded border-2 border-orange-300">
                                    <strong className="text-orange-900">🎯 具体的な支援アプローチ：</strong><br/>
                                    現在の行動を否定するのではなく、より適切で簡単な代替行動を教えることが重要です。
                                    例えば、{step2Data.easiestMethod}が得意であることを活かし、
                                    写真カードやコミュニケーションボードを使って同じ目的を達成する方法を練習することが考えられます。
                                </p>
                                <p className="text-sm bg-yellow-100 p-3 rounded">
                                    <strong>実践例：</strong>
                                    {step3Data.calmSituation}の場面で、まずは2つの選択肢から選ぶ練習を始め、
                                    成功体験を積み重ねながら段階的にスキルを広げていくことをお勧めします。
                                </p>
                            </div>
                        </div>

                        {/* 2.2 得意を伸ばす提案 */}
                        <div className="mb-6 bg-white border-2 border-blue-200 rounded-lg p-5">
                            <h4 className="font-bold text-lg text-blue-800 mb-3">
                                2.2. 【得意を伸ばす提案】 コミュニケーション手段の拡大
                            </h4>
                            <div className="text-gray-700 space-y-2 leading-relaxed">
                                <p>
                                    ご本人は<span className="font-bold text-blue-700">{step2Data.easiestMethod}</span>を
                                    自然に使えているという強みがあります。
                                    この得意な方法を起点に、段階的に手段を豊かにしていくことができます。
                                </p>
                                <div className="bg-blue-50 p-4 rounded space-y-2">
                                    <p><strong>ステップ1：</strong> まずは得意な方法での成功体験を増やす</p>
                                    <p><strong>ステップ2：</strong> 2つの選択肢から選ぶ練習を始める</p>
                                    <p><strong>ステップ3：</strong> 選択肢を3つ、4つと増やしていく</p>
                                    <p><strong>ステップ4：</strong> 絵カードやシンボルなど、他の視覚的手段も組み合わせる</p>
                                </div>
                            </div>
                        </div>

                        {/* 2.3 環境を整える提案 */}
                        <div className="mb-6 bg-white border-2 border-green-200 rounded-lg p-5">
                            <h4 className="font-bold text-lg text-green-800 mb-3">
                                2.3. 【環境を整える提案】 練習に最適な場面設定
                            </h4>
                            <div className="text-gray-700 space-y-2 leading-relaxed">
                                <p>
                                    新しいコミュニケーションスキルの習得には、安心できる環境が不可欠です。
                                    分析結果から、以下のような場面設定が効果的と考えられます：
                                </p>
                                <div className="bg-green-50 p-4 rounded space-y-2">
                                    <p><strong>推奨する練習環境：</strong></p>
                                    <p>{step3Data.calmSituation}</p>
                                    <p className="text-sm mt-3">
                                        <strong>配慮事項：</strong>
                                        {step3Data.difficultSituation}のような状況は避け、
                                        まずは予測可能で構造化された環境で練習を重ねることが大切です。
                                        成功体験が積み重なってきたら、少しずつ環境のバリエーションを広げていきましょう。
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2.4 世界を広げる提案 */}
                        <div className="mb-6 bg-white border-2 border-purple-200 rounded-lg p-5">
                            <h4 className="font-bold text-lg text-purple-800 mb-3">
                                2.4. 【世界を広げる提案】 コミュニケーションの話題作り
                            </h4>
                            <div className="text-gray-700 space-y-2 leading-relaxed">
                                <p>
                                    ご本人には<span className="font-bold text-purple-700">{step4Data.interests}</span>
                                    といった興味・関心があります。これらは、要求以外のコミュニケーション
                                    （共感、報告、情報共有など）を促す絶好の「話題」になります。
                                </p>
                                <div className="bg-purple-50 p-4 rounded space-y-2">
                                    <p><strong>具体的なアイデア：</strong></p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>好きなものの写真や絵カードを用意し、「見せる」「共有する」体験を作る</li>
                                        <li>{step4Data.positiveExpression}という場面を活用し、
                                            「嬉しい」気持ちを表現する練習をする</li>
                                        <li>好きな話題について、大人が楽しそうにコメントする姿を見せ、
                                            コミュニケーションの楽しさを実感してもらう</li>
                                    </ul>
                                    <p className="text-sm mt-3 bg-white p-3 rounded border border-purple-200">
                                        💡 <strong>ポイント：</strong>
                                        要求だけでなく、「楽しさを共有する」「気持ちを伝え合う」といった
                                        社会的なコミュニケーションの喜びを体験することで、
                                        コミュニケーションの動機がさらに豊かになっていきます。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* おわりに */}
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-300">
                        <h3 className="font-bold text-xl text-gray-800 mb-3">おわりに</h3>
                        <div className="text-gray-700 space-y-2 leading-relaxed">
                            <p>
                                このレポートでは、ご本人のコミュニケーションの現状と、
                                今後の支援に向けた4つの提案をお示ししました。
                            </p>
                            <p>
                                最も大切なのは、<span className="font-bold text-blue-700">ご本人のペースを尊重し、
                                小さな成功を積み重ねていくこと</span>です。
                                焦らず、一歩ずつ、ご本人らしいコミュニケーションの形を一緒に見つけていきましょう。
                            </p>
                            <p>
                                また、この分析はあくまで現時点での観察に基づくものです。
                                ご本人の成長や変化に合わせて、定期的に見直しを行い、
                                支援の方向性を調整していくことをお勧めします。
                            </p>
                            <p className="mt-4 text-sm bg-white p-4 rounded border-l-4 border-green-500">
                                <strong>🌟 支援のゴール：</strong><br/>
                                ご本人が「伝えたい」という気持ちを持ち続け、
                                自分らしい方法で周囲とつながっていける―
                                そんな未来を目指して、一緒に歩んでいきましょう。
                            </p>
                        </div>
                    </div>
                </div>

                {/* 印刷・エクスポートボタン */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md"
                    >
                        🖨️ レポートを印刷
                    </button>
                    <button
                        onClick={() => {
                            const reportText = `
コミュニケーション分析レポート

はじめに
${sampleData ? 'コミュニケーション・サンプル表データあり' : ''}

1. コミュニケーションの現状分析

1.1. 主なコミュニケーションの目的（機能）
選択された目的: ${selectedPurposeLabels.join(', ')}
最も頻度が高い目的: ${step1Data.mainPurpose}
具体的な行動: ${step1Data.specificBehavior}
目的が満たされない時の反応: ${step1Data.unmetReaction}

1.2. 得意なコミュニケーションの方法（形態）
よく使う方法: ${selectedMethodLabels.join(', ')}
最も自然な方法: ${step2Data.easiestMethod}
よく見られる状況: ${step2Data.situation}

1.3. コミュニケーションの傾向（文脈）
成功しやすい状況: ${step3Data.calmSituation}
困難が生じやすい状況: ${step3Data.difficultSituation}

2. 今後のコミュニケーション支援に向けた提案

2.1. 【最優先の提案】 代替行動で「伝え方」を教える
2.2. 【得意を伸ばす提案】 コミュニケーション手段の拡大
2.3. 【環境を整える提案】 練習に最適な場面設定
2.4. 【世界を広げる提案】 コミュニケーションの話題作り

興味・好きなこと: ${step4Data.interests}
ポジティブな感情の表現: ${step4Data.positiveExpression}
                            `.trim();
                            
                            const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `communication_analysis_report_${actionName}_${new Date().toISOString().split('T')[0]}.txt`;
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-md"
                    >
                        💾 テキストで保存
                    </button>
                </div>
            </div>
        );
    };

    // 進捗バーのレンダリング
    const renderProgressBar = () => {
        let progress = 0;
        if (currentStep === 0) progress = 10;
        else if (currentStep === 1) progress = 20 + (currentQuestion * 10);
        else if (currentStep === 2) progress = 50 + (currentQuestion * 10);
        else if (currentStep === 3) progress = 70 + (currentQuestion * 5);
        else if (currentStep === 4) progress = 80 + (currentQuestion * 5);
        else if (currentStep === 5) progress = 100;

        return (
            <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">
                        {currentStep === 0 && 'データ入力'}
                        {currentStep === 1 && `ステップ1: 目的を探る (質問${currentQuestion}/3)`}
                        {currentStep === 2 && `ステップ2: 方法を明らかにする (質問${currentQuestion}/2)`}
                        {currentStep === 3 && `ステップ3: 状況を読み解く (質問${currentQuestion}/2)`}
                        {currentStep === 4 && `ステップ4: 世界を広げる (質問${currentQuestion}/2)`}
                        {currentStep === 5 && 'レポート完成'}
                    </span>
                    <span className="font-bold text-blue-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        );
    };

    // ステップインジケーター
    const renderStepIndicator = () => {
        if (currentStep === 0 || currentStep === 5) return null;

        return (
            <div className="mb-6">
                <div className="flex items-center justify-center space-x-2">
                    {[1, 2, 3, 4].map(step => (
                        <div key={step} className="flex items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                                currentStep === step
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : currentStep > step
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-300 text-gray-600'
                            }`}>
                                {currentStep > step ? '✓' : step}
                            </div>
                            {step < 4 && (
                                <div className={`w-16 h-1 mx-1 ${currentStep > step ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="text-center mt-3 text-sm text-gray-600">
                    {currentStep === 1 && '目的（機能）'}
                    {currentStep === 2 && '方法（形態）'}
                    {currentStep === 3 && '状況（文脈）'}
                    {currentStep === 4 && '世界（内容）'}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                    ⑬-2 コミュニケーションサンプルの分析（対話型アシスタント）
                </h3>
                <span className="text-xs text-gray-500">💾 自動保存中...</span>
            </div>

            {renderProgressBar()}
            {renderStepIndicator()}

            <div className="min-h-[500px]">
                {currentStep === 0 && renderStep0()}
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                {currentStep === 5 && renderReport()}
            </div>

            {/* ナビゲーションボタン */}
            {currentStep !== 5 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={prevQuestion}
                        disabled={currentStep === 0}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${
                            currentStep === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-500 text-white hover:bg-gray-600 shadow-md hover:shadow-lg'
                        }`}
                    >
                        ← 前へ
                    </button>

                    <button
                        onClick={nextQuestion}
                        disabled={!canProceed()}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${
                            canProceed()
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {currentStep === 4 && currentQuestion === 2 ? '📊 レポートを生成 →' : '次へ →'}
                    </button>
                </div>
            )}

            {/* 最初からやり直すボタン（レポート表示時） */}
            {currentStep === 5 && (
                <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={() => {
                            setCurrentStep(0);
                            setCurrentQuestion(0);
                        }}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md"
                    >
                        🔄 最初から入力し直す
                    </button>
                </div>
            )}

            {/* ヘルプセクション */}
            {currentStep !== 5 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg">
                    <h5 className="font-bold text-gray-800 mb-2 text-sm flex items-center">
                        <span className="mr-2">💡</span>
                        入力のポイント
                    </h5>
                    <ul className="text-xs text-gray-700 space-y-1">
                        <li>• できるだけ具体的に、観察した事実を記入してください</li>
                        <li>• 複数のエピソードがある場合は、代表的なものを選んでください</li>
                        <li>• 前の質問に戻って修正することもできます</li>
                        <li>• 入力内容は自動的に保存されます（2秒後）</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

// ==================== PECS手順書作成コンポーネント ====================

export const PecsManualComponent = ({ actionName, data, setData }) => {
    const [currentPhase, setCurrentPhase] = useState('');
    const [specificGoal, setSpecificGoal] = useState('');
    const [layoutImage, setLayoutImage] = useState(null);
    const [layoutMemo, setLayoutMemo] = useState('');
    const [reinforcers, setReinforcers] = useState([]);
    const [reinforcerInput, setReinforcerInput] = useState('');
    const [promptLevel, setPromptLevel] = useState(1);
    const [fadingPlan, setFadingPlan] = useState('');
    const [waitTime, setWaitTime] = useState(5);
    const [useErrorCorrection, setUseErrorCorrection] = useState(false);
    const [errorCorrectionNotes, setErrorCorrectionNotes] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');

    useEffect(() => {
        if (data) {
            setCurrentPhase(data.currentPhase || '');
            setSpecificGoal(data.specificGoal || '');
            setLayoutImage(data.layoutImage || null);
            setLayoutMemo(data.layoutMemo || '');
            setReinforcers(data.reinforcers || []);
            setPromptLevel(data.promptLevel || 1);
            setFadingPlan(data.fadingPlan || '');
            setWaitTime(data.waitTime || 5);
            setUseErrorCorrection(data.useErrorCorrection || false);
            setErrorCorrectionNotes(data.errorCorrectionNotes || '');
            setAdditionalNotes(data.additionalNotes || '');
        }
    }, [data]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSave();
        }, 2000);
        return () => clearTimeout(timer);
    }, [currentPhase, specificGoal, layoutImage, layoutMemo, reinforcers, 
        promptLevel, fadingPlan, waitTime, useErrorCorrection, 
        errorCorrectionNotes, additionalNotes]);

    const handleSave = () => {
        const saveData = {
            currentPhase,
            specificGoal,
            layoutImage,
            layoutMemo,
            reinforcers,
            promptLevel,
            fadingPlan,
            waitTime,
            useErrorCorrection,
            errorCorrectionNotes,
            additionalNotes,
            lastUpdated: new Date().toISOString()
        };
        setData(actionName, saveData);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLayoutImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addReinforcer = () => {
        if (reinforcerInput.trim() !== '') {
            setReinforcers([...reinforcers, reinforcerInput.trim()]);
            setReinforcerInput('');
        }
    };

    const removeReinforcer = (index) => {
        setReinforcers(reinforcers.filter((_, i) => i !== index));
    };

    const promptLevelDescriptions = {
        1: '身体プロンプト:支援者が利用者の手を持って直接動作を誘導する',
        2: 'ジェスチャー:身体的な接触なしに、ジェスチャーで動作を促す',
        3: 'モデリング:支援者が見本を見せて、真似をしてもらう',
        4: '言語指示:言葉のみで指示を出す',
        5: '自立:支援なしで自分から行動できる'
    };

    const handleExportJSON = () => {
        const exportData = {
            actionName,
            currentPhase,
            specificGoal,
            layoutMemo,
            reinforcers,
            promptLevel,
            fadingPlan,
            waitTime,
            useErrorCorrection,
            errorCorrectionNotes,
            additionalNotes,
            exportDate: new Date().toISOString()
        };
        const jsonString = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `picture_card_manual_${actionName}_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const generateManualText = () => {
        const phaseNames = {
            'phase1': 'フェーズ I:カードを渡して伝える(交換の仕方を学ぶ)',
            'phase2': 'フェーズ II:離れた場所から自分で伝えに行く',
            'phase3': 'フェーズ III:複数のカードから欲しい物を選ぶ',
            'phase4': 'フェーズ IV:カードを組み合わせて伝える'
        };

        let text = `【絵カード等による支援手順書】\n\n`;
        text += `対象行動: ${actionName}\n`;
        text += `作成日: ${new Date().toLocaleDateString('ja-JP')}\n\n`;
        text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        
        text += `■ 1. 支援フェーズと目標設定\n\n`;
        text += `現在のフェーズ: ${phaseNames[currentPhase] || '未設定'}\n`;
        text += `具体的なゴール: ${specificGoal || '未設定'}\n\n`;
        
        text += `■ 2. 環境設定(セッティング)\n\n`;
        text += `物理的配置のメモ:\n${layoutMemo || '記載なし'}\n\n`;
        text += `強化子(ご褒美)リスト:\n`;
        if (reinforcers.length > 0) {
            reinforcers.forEach((r, i) => {
                text += `  ${i + 1}. ${r}\n`;
            });
        } else {
            text += `  記載なし\n`;
        }
        text += `\n`;
        
        text += `■ 3. 支援者の動き(プロンプトの統一)\n\n`;
        text += `プロンプトレベル: レベル${promptLevel}\n`;
        text += `(${promptLevelDescriptions[promptLevel]})\n\n`;
        text += `フェイディング計画:\n${fadingPlan || '記載なし'}\n\n`;
        
        text += `■ 4. エラー対応と待ち時間\n\n`;
        text += `待ち時間: ${waitTime}秒\n`;
        text += `エラー修正手順の使用: ${useErrorCorrection ? '使用する' : '使用しない'}\n`;
        if (useErrorCorrection && errorCorrectionNotes) {
            text += `エラー修正手順の詳細:\n${errorCorrectionNotes}\n`;
        }
        text += `\n`;
        
        if (additionalNotes) {
            text += `■ 5. 補足事項\n\n`;
            text += `${additionalNotes}\n\n`;
        }
        
        text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        
        return text;
    };

    const handleExportText = () => {
        const text = generateManualText();
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `picture_card_manual_${actionName}_${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                        ⑭ 支援員への支援のやり方の手順書（絵カードなどの作成）
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        統一した手順で支援を実施するための手順書を作成します
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-xs text-gray-500">💾 自動保存中...</span>
                    <p className="text-sm font-medium text-gray-700 mt-1">対象: {actionName}</p>
                </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                    <span className="mr-2">💡</span>
                    この手順書の目的
                </h4>
                <ul className="text-sm text-blue-900 space-y-1">
                    <li>• 複数の支援員が「同じ対応」をできるようにする</li>
                    <li>• 選択式の項目で入力のブレを防ぐ</li>
                    <li>• 支援の一貫性を保ち、利用者の混乱を減らす</li>
                </ul>
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2 text-2xl">📌</span>
                    1. 支援フェーズと目標設定
                </h4>
                
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        現在のフェーズを選択 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            value={currentPhase}
                            onChange={(e) => setCurrentPhase(e.target.value)}
                            className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-700 appearance-none"
                        >
                            <option value="">フェーズを選択してください</option>
                            <option value="phase1">フェーズ I:カードを渡して伝える(交換の仕方を学ぶ)</option>
                            <option value="phase2">フェーズ II:離れた場所から自分で伝えに行く</option>
                            <option value="phase3">フェーズ III:複数のカードから欲しい物を選ぶ</option>
                            <option value="phase4">フェーズ IV:カードを組み合わせて伝える</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {currentPhase && (
                        <div className="mt-2 p-3 bg-purple-100 rounded-lg text-sm text-purple-900">
                            <p className="font-medium">
                                {currentPhase === 'phase1' && '✓ 絵カードを使って「欲しい物」を支援者に渡して伝える基礎を学びます'}
                                {currentPhase === 'phase2' && '✓ 支援者から離れた場所にいても、自分から近づいてカードで伝えることを学びます'}
                                {currentPhase === 'phase3' && '✓ たくさんの絵カードの中から、今欲しい物のカードを選んで伝えることを学びます'}
                                {currentPhase === 'phase4' && '✓ 複数のカードを順番に並べて、より詳しく伝えることを学びます(例:「赤い・りんご・ください」)'}
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        具体的なゴール(到達目標) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={specificGoal}
                        onChange={(e) => setSpecificGoal(e.target.value)}
                        placeholder="例:「お菓子」のカードを自分から支援者に手渡すことができる"
                        className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                        rows="3"
                    />
                    <p className="mt-1 text-xs text-gray-600">
                        💡 できるだけ具体的に、観察可能な行動で記述してください
                    </p>
                </div>
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2 text-2xl">🏠</span>
                    2. 環境設定(セッティング)
                </h4>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        物理的配置(机・椅子・カードの位置など)
                    </label>
                    
                    <div className="mb-4">
                        <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center bg-white hover:bg-green-50 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="layout-image-upload"
                            />
                            <label htmlFor="layout-image-upload" className="cursor-pointer">
                                {layoutImage ? (
                                    <div>
                                        <img 
                                            src={layoutImage} 
                                            alt="配置図" 
                                            className="max-w-full max-h-64 mx-auto mb-2 rounded-lg shadow-md"
                                        />
                                        <p className="text-sm text-green-700 font-medium">
                                            📸 クリックして画像を変更
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="w-12 h-12 text-green-500 mx-auto mb-2">📤</div>
                                        <p className="text-gray-700 font-medium mb-1">
                                            配置の写真をアップロード
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            クリックして画像を選択(任意)
                                        </p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <textarea
                        value={layoutMemo}
                        onChange={(e) => setLayoutMemo(e.target.value)}
                        placeholder="例:利用者は椅子に座り、テーブルの向かい側に支援者が座る。絵カードはテーブル中央に置く。"
                        className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                        rows="3"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        強化子(ご褒美)リスト
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={reinforcerInput}
                            onChange={(e) => setReinforcerInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addReinforcer()}
                            placeholder="例:チョコレート、シール、iPad など"
                            className="flex-1 p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <button
                            onClick={addReinforcer}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-md transition-all"
                        >
                            追加
                        </button>
                    </div>
                    
                    {reinforcers.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {reinforcers.map((reinforcer, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                                >
                                    <span>{reinforcer}</span>
                                    <button
                                        onClick={() => removeReinforcer(index)}
                                        className="text-green-600 hover:text-green-900 font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="mt-2 text-xs text-gray-600">
                        💡 現在有効な強化子(ご褒美)を登録しておくことで、チーム全体で統一した対応ができます
                    </p>
                </div>
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2 text-2xl">👥</span>
                    3. 支援者の動き(プロンプトの統一)
                </h4>

                <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <p className="text-sm text-yellow-900">
                        <strong>重要:</strong> プロンプトレベルを統一することで、支援者による対応のバラつきを防ぎます
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                        現在のプロンプトレベル <span className="text-red-500">*</span>
                    </label>
                    
                    <div className="mb-4">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={promptLevel}
                            onChange={(e) => setPromptLevel(parseInt(e.target.value))}
                            className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
                            <span>Lv1</span>
                            <span>Lv2</span>
                            <span>Lv3</span>
                            <span>Lv4</span>
                            <span>Lv5</span>
                        </div>
                    </div>

                    <div className="p-4 bg-blue-100 rounded-lg border-2 border-blue-400">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                {promptLevel}
                            </div>
                            <div>
                                <h5 className="font-bold text-blue-900 mb-1">
                                    レベル {promptLevel}
                                </h5>
                                <p className="text-sm text-blue-900">
                                    {promptLevelDescriptions[promptLevel]}
                                </p>
                            </div>
                        </div>
                    </div>

                    <details className="mt-4">
                        <summary className="cursor-pointer text-sm text-blue-700 hover:text-blue-900 font-medium">
                            📋 全プロンプトレベルを確認
                        </summary>
                        <div className="mt-3 space-y-2">
                            {Object.entries(promptLevelDescriptions).map(([level, desc]) => (
                                <div 
                                    key={level}
                                    className={`p-3 rounded-lg text-sm ${
                                        parseInt(level) === promptLevel 
                                            ? 'bg-blue-200 border-2 border-blue-500' 
                                            : 'bg-gray-50 border border-gray-300'
                                    }`}
                                >
                                    <strong>レベル {level}:</strong> {desc}
                                </div>
                            ))}
                        </div>
                    </details>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        フェイディング計画(支援を徐々に減らす計画)
                    </label>
                    <textarea
                        value={fadingPlan}
                        onChange={(e) => setFadingPlan(e.target.value)}
                        placeholder="例:最初の1週間はレベル1(身体プロンプト)、正答率80%を超えたらレベル2(ジェスチャー)に移行する"
                        className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows="4"
                    />
                    <p className="mt-1 text-xs text-gray-600">
                        💡 どのような基準で支援レベルを下げていくかを具体的に記述してください
                    </p>
                </div>
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2 text-2xl">⏱️</span>
                    4. エラー対応と待ち時間
                </h4>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        待ち時間(反応があるまで待つ時間) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={waitTime}
                            onChange={(e) => setWaitTime(parseInt(e.target.value) || 5)}
                            className="w-24 p-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-center font-bold text-lg"
                        />
                        <span className="text-gray-700 font-medium">秒</span>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            value={waitTime}
                            onChange={(e) => setWaitTime(parseInt(e.target.value))}
                            className="flex-1 h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <p className="mt-2 text-xs text-gray-600">
                        💡 利用者が自発的に行動するチャンスを与えるための待ち時間です
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={useErrorCorrection}
                                onChange={(e) => setUseErrorCorrection(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-600"></div>
                        </label>
                        <span className="text-sm font-bold text-gray-700">
                            エラー修正手順(4ステップ)を使用する
                        </span>
                    </div>

                    {useErrorCorrection && (
                        <div className="mt-4 p-4 bg-orange-100 rounded-lg border border-orange-300">
                            <h5 className="font-bold text-orange-900 mb-3 flex items-center">
                                <span className="mr-2">📝</span>
                                エラー修正手順の詳細
                            </h5>
                            <div className="mb-3 p-3 bg-white rounded-lg text-sm text-gray-700">
                                <p className="font-medium mb-2">標準的な4ステップ手順:</p>
                                <ol className="list-decimal list-inside space-y-1 ml-2">
                                    <li>即座に身体プロンプトで正しい行動を誘導</li>
                                    <li>強化子は与えず、別の試行を開始</li>
                                    <li>新しい試行で自発的に成功したら強化</li>
                                    <li>次回のセッションで再度確認</li>
                                </ol>
                            </div>
                            <textarea
                                value={errorCorrectionNotes}
                                onChange={(e) => setErrorCorrectionNotes(e.target.value)}
                                placeholder="この利用者に特有の注意事項や、手順の調整点があれば記入してください"
                                className="w-full p-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                                rows="3"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-300">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2 text-2xl">📝</span>
                    5. 補足事項・その他の注意点
                </h4>
                <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="例:本人の体調が悪い時は無理に実施しない、特定の時間帯(午前中)に実施するなど"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none"
                    rows="4"
                />
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-6 border-t-2 border-gray-200">
                <button
                    onClick={handleExportJSON}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md transition-all flex items-center gap-2"
                >
                    <span>💾</span>
                    JSONで保存
                </button>
                <button
                    onClick={handleExportText}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-md transition-all flex items-center gap-2"
                >
                    <span>📄</span>
                    テキストで保存
                </button>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg">
                <h5 className="font-bold text-gray-800 mb-2 text-sm flex items-center">
                    <span className="mr-2">💡</span>
                    手順書作成のポイント
                </h5>
                <ul className="text-xs text-gray-700 space-y-1">
                    <li>• できるだけ選択式の項目を活用して、支援者間のバラつきを防ぎましょう</li>
                    <li>• プロンプトレベルは定期的に見直し、徐々に支援を減らしていきましょう</li>
                    <li>• チーム全員がこの手順書を確認してから支援を開始しましょう</li>
                    <li>• 入力内容は自動的に保存されます(2秒後)</li>
                </ul>
            </div>
        </div>
    );
};
