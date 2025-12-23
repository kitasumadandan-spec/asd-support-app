import React, { useState, useMemo, useEffect } from 'react';
import { GripVertical, IcebergIcon, TraitFeedback, Trash2 } from './SharedComponents';
import { PERMANENT_TRAITS, ENVIRONMENT_MAP, assessmentCategories, rotatedTimeSlots } from './constants';

// ==================== ステップ2用スキャッタープロットコンポーネント ====================

const Step2ScatterPlot = ({ problemIndex, data, setData, info, setInfo }) => {
    const handleCellClick = (rowIndex, colIndex) => {
        const newData = data.map((row, rIdx) => {
            if (rIdx === rowIndex) {
                const newRow = [...row];
                newRow[colIndex] = !newRow[colIndex];
                return newRow;
            }
            return row;
        });
        setData(problemIndex, newData);
    };

    const handleInfoChange = (field, value) => {
        setInfo(problemIndex, {
            ...(info || {}),
            [field]: value,
        });
    };
    
    const handleDateChange = (index, value) => {
        const newDates = [...((info && info.dates) || Array(14).fill(''))];
        newDates[index] = value;
        setInfo(problemIndex, {
            ...(info || {}),
            dates: newDates
        });
    };
    
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-md font-bold text-gray-800 mb-3">スキャッタープロット</h4>
            <p className="text-sm text-gray-600 mb-3">行動が起こる時間帯のパターンを記録します。セルをクリックして行動があった時間をマークしてください。</p>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">観察する行動</label>
                <input 
                    type="text" 
                    placeholder="観察する行動を入力" 
                    value={(info && info.observedAction) || ''} 
                    onChange={(e) => handleInfoChange('observedAction', e.target.value)} 
                    className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-1 bg-gray-100">時間</th>
                            {Array.from({length: 14}).map((_, i) => (
                                <th key={i} className="border border-gray-300 p-1 bg-gray-100">
                                    <input 
                                        type="text" 
                                        placeholder="月/日" 
                                        value={(info && info.dates && info.dates[i]) || ''} 
                                        onChange={(e) => handleDateChange(i, e.target.value)} 
                                        className="w-16 text-center text-xs p-1 border border-gray-200 rounded" 
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rotatedTimeSlots.map((time, rowIndex) => (
                            <tr key={time}>
                                <td className="border border-gray-300 p-1 text-center font-medium bg-gray-50 text-xs">{time}</td>
                                {Array.from({length: 14}).map((_, colIndex) => (
                                    <td 
                                        key={colIndex} 
                                        className={`border border-gray-300 p-1 h-4 cursor-pointer transition-colors hover:bg-green-100 ${data[rowIndex] && data[rowIndex][colIndex] ? 'bg-green-300' : ''}`}
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

// ==================== ステップ2用ABC記録コンポーネント ====================

const Step2AbcRecord = ({ problemIndex, records, setRecords }) => {
    const recordData = records || {
        startDate: '', 
        endDate: '', 
        records: [{ id: Date.now(), date: '', time: '', beforePlace: '', beforeActivity: '', beforeState: '', beforeEnvironment: '', behavior: '', after: '' }]
    };
    
    const handleInfoChange = (field, value) => {
        setRecords(problemIndex, { ...recordData, [field]: value });
    };
    
    const addRecord = () => {
        const newRecords = [...recordData.records, 
            { id: Date.now(), date: '', time: '', beforePlace: '', beforeActivity: '', beforeState: '', beforeEnvironment: '', behavior: '', after: '' }];
        setRecords(problemIndex, { ...recordData, records: newRecords });
    };
    
    const updateRecord = (id, field, value) => {
        const newRecords = recordData.records.map(r => 
            r.id === id ? { ...r, [field]: value } : r
        );
        setRecords(problemIndex, { ...recordData, records: newRecords });
    };
    
    const deleteRecord = (id) => {
        if (recordData.records.length === 1) return;
        const newRecords = recordData.records.filter(r => r.id !== id);
        setRecords(problemIndex, { ...recordData, records: newRecords });
    };
    
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
            <h4 className="text-md font-bold text-gray-800 mb-3">ABC記録シート</h4>
            <p className="text-sm text-gray-600 mb-3">行動の前後の状況を記録し、行動のきっかけと結果を分析します。</p>
            <div className="mb-4 flex flex-wrap gap-4 items-center">
                <label className="text-sm font-medium text-gray-700">記録期間:</label>
                <input type="date" value={recordData.startDate || ''} 
                    onChange={(e) => handleInfoChange('startDate', e.target.value)}
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"/>
                <span className="text-sm">～</span>
                <input type="date" value={recordData.endDate || ''} 
                    onChange={(e) => handleInfoChange('endDate', e.target.value)}
                    className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 min-w-[70px]">日</th>
                            <th className="border border-gray-300 p-2 min-w-[70px]">時間</th>
                            <th className="border border-gray-300 p-2 min-w-[280px]">
                                A: 事前の状況
                                <span className="block text-xs font-normal text-gray-500">場所、何をしているとき、本人の状態、周囲の状況</span>
                            </th>
                            <th className="border border-gray-300 p-2 min-w-[180px]">
                                B: 行動
                                <span className="block text-xs font-normal text-gray-500">具体的な行動</span>
                            </th>
                            <th className="border border-gray-300 p-2 min-w-[180px]">
                                C: 事後の状況
                                <span className="block text-xs font-normal text-gray-500">周囲の対応と変化</span>
                            </th>
                            <th className="border border-gray-300 p-2 w-[50px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordData.records.map((record) => (
                            <tr key={record.id}>
                                <td className="border border-gray-300 p-2">
                                    <input type="text" value={record.date} 
                                        onChange={(e) => updateRecord(record.id, 'date', e.target.value)}
                                        placeholder="〇日"
                                        className="w-full p-1 text-sm border border-gray-200 rounded"/>
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input type="text" value={record.time} 
                                        onChange={(e) => updateRecord(record.id, 'time', e.target.value)}
                                        placeholder="15:00"
                                        className="w-full p-1 text-sm border border-gray-200 rounded"/>
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <div className="space-y-2">
                                        <div>
                                            <label className="text-xs text-gray-500 block">（場所）</label>
                                            <input type="text" value={record.beforePlace || ''} 
                                                onChange={(e) => updateRecord(record.id, 'beforePlace', e.target.value)}
                                                placeholder="例：食堂の前で"
                                                className="w-full p-1 text-sm border border-gray-200 rounded placeholder:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 block">（何をしているとき）</label>
                                            <input type="text" value={record.beforeActivity || ''} 
                                                onChange={(e) => updateRecord(record.id, 'beforeActivity', e.target.value)}
                                                placeholder="例：食事を待っているとき"
                                                className="w-full p-1 text-sm border border-gray-200 rounded placeholder:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 block">（本人の状態）</label>
                                            <input type="text" value={record.beforeState || ''} 
                                                onChange={(e) => updateRecord(record.id, 'beforeState', e.target.value)}
                                                placeholder="例：険しい表情で"
                                                className="w-full p-1 text-sm border border-gray-200 rounded placeholder:text-gray-400"/>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 block">（周囲の状況）</label>
                                            <input type="text" value={record.beforeEnvironment || ''} 
                                                onChange={(e) => updateRecord(record.id, 'beforeEnvironment', e.target.value)}
                                                placeholder="例：しゃべり声でざわざわしている"
                                                className="w-full p-1 text-sm border border-gray-200 rounded placeholder:text-gray-400"/>
                                        </div>
                                    </div>
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <textarea value={record.behavior} 
                                        onChange={(e) => updateRecord(record.id, 'behavior', e.target.value)}
                                        placeholder="例：大きな声を出した"
                                        className="w-full p-1 text-sm resize-none border border-gray-200 rounded placeholder:text-gray-400"
                                        rows="4"/>
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <textarea value={record.after} 
                                        onChange={(e) => updateRecord(record.id, 'after', e.target.value)}
                                        placeholder="例：職員が声をかけると落ち着いた"
                                        className="w-full p-1 text-sm resize-none border border-gray-200 rounded placeholder:text-gray-400"
                                        rows="4"/>
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        onClick={() => deleteRecord(record.id)}
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md">
                    記録を追加
                </button>
            </div>
        </div>
    );
};

// ==================== ステップ2用FASTコンポーネント ====================

const Step2Fast = ({ problemIndex, fastData, setFastData }) => {
    const data = fastData || {};

    const fastQuestions = [
        {
            category: '社会的注目',
            questions: [
                { id: 'social_1', text: '他の人がいないとき、この行動は起こりますか？' },
                { id: 'social_2', text: '他の人がいるときに、この行動は起こりやすいですか？' },
                { id: 'social_3', text: '周りからの注目（視線、声かけなど）で落ち着きますか？' },
                { id: 'social_4', text: '「見て」「聞いて」など注目を引くサインはありますか？' }
            ]
        },
        {
            category: '逃避・回避',
            questions: [
                { id: 'escape_1', text: '嫌な活動や難しい課題の前に、この行動は起こりますか？' },
                { id: 'escape_2', text: 'この行動の後、課題や活動が中止・延期されることがありますか？' },
                { id: 'escape_3', text: '課題から離れることで、この行動は減りますか？' },
                { id: 'escape_4', text: '課題が終わると、この行動は減りますか？' }
            ]
        },
        {
            category: '要求（物・活動）',
            questions: [
                { id: 'tangible_1', text: '好きな物や活動が得られないとき、この行動は起こりますか？' },
                { id: 'tangible_2', text: 'この行動の後、欲しい物や活動を得られることがありますか？' },
                { id: 'tangible_3', text: '好きな物・活動がある場面で、この行動は起こりやすいですか？' },
                { id: 'tangible_4', text: '欲しい物・活動を事前に与えると、この行動は減りますか？' }
            ]
        },
        {
            category: '感覚刺激',
            questions: [
                { id: 'sensory_1', text: '一人でいるときにも、この行動は起こりますか？' },
                { id: 'sensory_2', text: '特定の感覚（揺れ、音、触感など）を求めているように見えますか？' },
                { id: 'sensory_3', text: '周りの反応に関係なく、繰り返し行われますか？' },
                { id: 'sensory_4', text: '本人が楽しんでいる、または落ち着くように見えますか？' }
            ]
        }
    ];

    const handleAnswer = (questionId, answer) => {
        setFastData(problemIndex, {
            ...data,
            answers: { ...(data.answers || {}), [questionId]: answer }
        });
    };

    const handleNotesChange = (category, value) => {
        setFastData(problemIndex, {
            ...data,
            categoryNotes: { ...(data.categoryNotes || {}), [category]: value }
        });
    };

    const getScoreByCategory = (category) => {
        const categoryQuestions = fastQuestions.find(c => c.category === category)?.questions || [];
        const yesCount = categoryQuestions.filter(q => data?.answers?.[q.id] === 'yes').length;
        return yesCount;
    };

    const getMaxScore = () => 4;

    const getFunctionColor = (score) => {
        if (score >= 3) return 'bg-red-100 text-red-800 border-red-300';
        if (score >= 2) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        return 'bg-gray-100 text-gray-600 border-gray-300';
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
            <h4 className="text-md font-bold text-gray-800 mb-3">FAST（機能分析スクリーニングツール）</h4>
            <p className="text-sm text-gray-600 mb-4">
                行動の機能（なぜその行動をするのか）を推定するためのスクリーニングです。各質問に「はい」「いいえ」で回答してください。
            </p>

            {/* スコアサマリー */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {fastQuestions.map(cat => {
                    const score = getScoreByCategory(cat.category);
                    return (
                        <div key={cat.category} className={`p-3 rounded-lg border ${getFunctionColor(score)}`}>
                            <p className="text-xs font-medium">{cat.category}</p>
                            <p className="text-lg font-bold">{score}/{getMaxScore()}</p>
                        </div>
                    );
                })}
            </div>

            {/* 質問 */}
            <div className="space-y-6">
                {fastQuestions.map(category => (
                    <div key={category.category} className="border rounded-lg p-4">
                        <h5 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span className={`inline-block w-3 h-3 rounded-full ${
                                getScoreByCategory(category.category) >= 3 ? 'bg-red-500' :
                                getScoreByCategory(category.category) >= 2 ? 'bg-yellow-500' : 'bg-gray-300'
                            }`}></span>
                            {category.category}
                        </h5>
                        <div className="space-y-3">
                            {category.questions.map(q => (
                                <div key={q.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                                    <span className="text-sm flex-grow">{q.text}</span>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => handleAnswer(q.id, 'yes')}
                                            className={`px-3 py-1 text-sm rounded ${
                                                data?.answers?.[q.id] === 'yes'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-white border border-gray-300 hover:bg-green-50'
                                            }`}
                                        >
                                            はい
                                        </button>
                                        <button
                                            onClick={() => handleAnswer(q.id, 'no')}
                                            className={`px-3 py-1 text-sm rounded ${
                                                data?.answers?.[q.id] === 'no'
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-white border border-gray-300 hover:bg-red-50'
                                            }`}
                                        >
                                            いいえ
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3">
                            <label className="text-xs text-gray-600">この機能についてのメモ：</label>
                            <textarea
                                value={data?.categoryNotes?.[category.category] || ''}
                                onChange={(e) => handleNotesChange(category.category, e.target.value)}
                                placeholder="気づいたことや考察を記入"
                                className="w-full p-2 text-sm border border-gray-200 rounded mt-1"
                                rows="2"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* 分析結果 */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h5 className="font-bold text-blue-800 mb-2">分析結果のまとめ</h5>
                <p className="text-sm text-blue-700 mb-3">
                    スコアが高い（3以上）カテゴリが、この行動の主な機能である可能性が高いです。
                </p>
                <div className="space-y-2">
                    {fastQuestions
                        .filter(cat => getScoreByCategory(cat.category) >= 2)
                        .sort((a, b) => getScoreByCategory(b.category) - getScoreByCategory(a.category))
                        .map(cat => (
                            <div key={cat.category} className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded text-sm font-medium ${getFunctionColor(getScoreByCategory(cat.category))}`}>
                                    {cat.category}: {getScoreByCategory(cat.category)}/4
                                </span>
                                {getScoreByCategory(cat.category) >= 3 && (
                                    <span className="text-xs text-red-600">← 主要な機能の可能性</span>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

// ==================== 行動分析チャットコンポーネント ====================

const BehaviorPatternChat = ({ problemContent, scatterPlotData, scatterPlotInfo, abcRecordData }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [userInputs, setUserInputs] = useState({
        physicalSymptoms: '',
        pattern: '',
        beforeState: '',
        afterState: ''
    });
    const [generatedText, setGeneratedText] = useState('');
    const [copied, setCopied] = useState(false);
    const chatContainerRef = React.useRef(null);

    // チャットメッセージ更新時に自動スクロール
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    // rotatedTimeSlotsと同じ定義
    const timeSlots = rotatedTimeSlots || [
        '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
        '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00', '00:30',
        '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30'
    ];

    // スキャッタープロット分析
    const scatterAnalysis = useMemo(() => {
        if (!scatterPlotData || !Array.isArray(scatterPlotData) || scatterPlotData.length === 0) {
            return { hasData: false, peakTimes: [], totalCount: 0, timePatterns: [] };
        }

        let hasAnyData = false;
        scatterPlotData.forEach(row => {
            if (Array.isArray(row) && row.some(cell => cell === true)) {
                hasAnyData = true;
            }
        });

        if (!hasAnyData) {
            return { hasData: false, peakTimes: [], totalCount: 0, timePatterns: [] };
        }

        const timeDistribution = {};
        let totalCount = 0;

        scatterPlotData.forEach((row, rowIndex) => {
            if (!Array.isArray(row)) return;
            row.forEach((cell) => {
                if (cell === true) {
                    const timeSlot = timeSlots[rowIndex] || `不明(${rowIndex})`;
                    timeDistribution[timeSlot] = (timeDistribution[timeSlot] || 0) + 1;
                    totalCount++;
                }
            });
        });

        if (totalCount === 0) {
            return { hasData: false, peakTimes: [], totalCount: 0, timePatterns: [] };
        }

        const peakTimes = Object.entries(timeDistribution)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([time, count]) => ({ time, count, percentage: Math.round((count / totalCount) * 100) }));

        // 時間帯パターン
        const getHour = (timeStr) => parseInt(timeStr.split(':')[0]);
        
        const morningCount = Object.entries(timeDistribution)
            .filter(([time]) => { const hour = getHour(time); return hour >= 5 && hour < 12; })
            .reduce((sum, [_, count]) => sum + count, 0);

        const afternoonCount = Object.entries(timeDistribution)
            .filter(([time]) => { const hour = getHour(time); return hour >= 12 && hour < 17; })
            .reduce((sum, [_, count]) => sum + count, 0);

        const eveningCount = Object.entries(timeDistribution)
            .filter(([time]) => { const hour = getHour(time); return hour >= 17 && hour < 21; })
            .reduce((sum, [_, count]) => sum + count, 0);

        const timePatterns = [
            { period: '朝', count: morningCount },
            { period: '昼', count: afternoonCount },
            { period: '夕方', count: eveningCount }
        ].filter(p => p.count > 0).sort((a, b) => b.count - a.count);

        return { hasData: true, peakTimes, totalCount, timePatterns };
    }, [scatterPlotData, timeSlots]);

    // ABC記録分析
    const abcAnalysis = useMemo(() => {
        if (!abcRecordData || !abcRecordData.records || !Array.isArray(abcRecordData.records)) {
            return { hasData: false, antecedents: [], behaviors: [], consequences: [] };
        }

        const records = abcRecordData.records.filter(r => 
            r.beforePlace || r.beforeActivity || r.beforeState || r.beforeEnvironment || r.behavior || r.after
        );
        if (records.length === 0) {
            return { hasData: false, antecedents: [], behaviors: [], consequences: [] };
        }

        // 事前の状況を結合
        const antecedents = records.map(r => {
            const parts = [];
            if (r.beforePlace) parts.push(`場所: ${r.beforePlace}`);
            if (r.beforeActivity) parts.push(`状況: ${r.beforeActivity}`);
            if (r.beforeState) parts.push(`本人の状態: ${r.beforeState}`);
            if (r.beforeEnvironment) parts.push(`周囲: ${r.beforeEnvironment}`);
            return parts.join('、');
        }).filter(Boolean);

        return {
            hasData: true,
            antecedents: antecedents,
            behaviors: records.map(r => r.behavior).filter(Boolean),
            consequences: records.map(r => r.after).filter(Boolean),
            recordCount: records.length
        };
    }, [abcRecordData]);

    // チャット開始
    const startChat = () => {
        const initialMessages = [];
        
        // スキャッタープロットの分析結果を表示
        if (scatterAnalysis.hasData) {
            let scatterMessage = `📊 **スキャッタープロットの分析結果**\n\n`;
            scatterMessage += `記録された行動回数: ${scatterAnalysis.totalCount}回\n\n`;
            
            if (scatterAnalysis.peakTimes.length > 0) {
                scatterMessage += `【よく起こる時間帯】\n`;
                scatterAnalysis.peakTimes.forEach(pt => {
                    scatterMessage += `• ${pt.time} （${pt.count}回、${pt.percentage}%）\n`;
                });
            }
            
            if (scatterAnalysis.timePatterns.length > 0) {
                scatterMessage += `\n【時間帯の傾向】\n`;
                scatterMessage += scatterAnalysis.timePatterns.map(tp => `${tp.period}: ${tp.count}回`).join('、');
            }
            
            initialMessages.push({ role: 'assistant', content: scatterMessage });
        }

        // ABC記録の分析結果を表示
        if (abcAnalysis.hasData) {
            let abcMessage = `📝 **ABC記録の分析結果**\n\n`;
            abcMessage += `記録数: ${abcAnalysis.recordCount}件\n\n`;
            
            if (abcAnalysis.antecedents.length > 0) {
                abcMessage += `【事前の状況（きっかけ）】\n`;
                abcAnalysis.antecedents.slice(0, 3).forEach(a => {
                    abcMessage += `• ${a}\n`;
                });
            }
            
            if (abcAnalysis.consequences.length > 0) {
                abcMessage += `\n【事後の状況（結果）】\n`;
                abcAnalysis.consequences.slice(0, 3).forEach(c => {
                    abcMessage += `• ${c}\n`;
                });
            }
            
            initialMessages.push({ role: 'assistant', content: abcMessage });
        }

        // 質問1: 身体症状について
        initialMessages.push({
            role: 'assistant',
            content: `上記の記録を踏まえて、「${problemContent}」という行動について一緒に整理していきましょう。\n\n**質問1:** 病気や痛み、便秘気味などの身体症状はないですか？\n（例：特になし、便秘気味、歯が痛そう、風邪気味 など）`
        });

        setChatMessages(initialMessages);
        setCurrentStep(1);
    };

    // ユーザー入力処理
    const handleUserInput = (value) => {
        if (currentStep === 1) {
            setUserInputs(prev => ({ ...prev, physicalSymptoms: value }));
            setChatMessages(prev => [
                ...prev,
                { role: 'user', content: value },
                { role: 'assistant', content: `身体症状について「${value}」ですね。\n\n**質問2:** この行動には、どのような傾向やパターンがありますか？\n（例：特定の時間に多い、特定の人がいるときに起こる、特定の活動中に多い など）` }
            ]);
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setUserInputs(prev => ({ ...prev, pattern: value }));
            setChatMessages(prev => [
                ...prev,
                { role: 'user', content: value },
                { role: 'assistant', content: `なるほど、「${value}」という傾向があるのですね。\n\n**質問3:** この行動が起こる直前、ご利用者はどのような状態ですか？\n（例：イライラしている、疲れている、不安そう、待っている など）` }
            ]);
            setCurrentStep(3);
        } else if (currentStep === 3) {
            setUserInputs(prev => ({ ...prev, beforeState: value }));
            setChatMessages(prev => [
                ...prev,
                { role: 'user', content: value },
                { role: 'assistant', content: `行動の前には「${value}」という状態なのですね。\n\n**質問4:** この行動の後、ご利用者や周囲の状況はどうなりますか？\n（例：落ち着く、注目を得る、活動を中断できる、物が手に入る など）` }
            ]);
            setCurrentStep(4);
        } else if (currentStep === 4) {
            setUserInputs(prev => ({ ...prev, afterState: value }));
            
            // 生成テキストを作成（身体症状も含める）
            let finalText = `「${problemContent}」という行動があります。`;
            if (userInputs.physicalSymptoms && userInputs.physicalSymptoms !== '特になし' && userInputs.physicalSymptoms !== 'なし') {
                finalText += `身体症状として「${userInputs.physicalSymptoms}」があります。`;
            }
            finalText += `傾向は「${userInputs.pattern}」という特徴を持ち、その行動の前には「${userInputs.beforeState}」があり、行動によって「${value}」という結果になります。`;
            
            setGeneratedText(finalText);
            
            setChatMessages(prev => [
                ...prev,
                { role: 'user', content: value },
                { role: 'assistant', content: `ありがとうございます。入力いただいた内容を整理しました。\n\n---\n\n**生成された文章：**\n\n${finalText}\n\n---\n\n👆 **この文章を「発達障害わかる君」にコピペして相談してみてください。**\n行動の背景にある自閉症の特性や、効果的な支援方法について相談できます。` }
            ]);
            setCurrentStep(5);
        }
    };

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        if (inputValue.trim()) {
            handleUserInput(inputValue.trim());
            setInputValue('');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetChat = () => {
        setChatMessages([]);
        setCurrentStep(0);
        setUserInputs({ physicalSymptoms: '', pattern: '', beforeState: '', afterState: '' });
        setGeneratedText('');
        setInputValue('');
    };

    return (
        <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                <h4 className="font-bold text-lg">💬 行動パターン分析チャット</h4>
                <p className="text-sm text-blue-100 mt-1">アセスメント結果を基に、行動のパターンを言語化します</p>
            </div>

            {currentStep === 0 ? (
                <div className="p-6 text-center">
                    <p className="text-gray-600 mb-4">
                        スキャッタープロットとABC記録のデータを分析し、<br />
                        行動の傾向とパターンを一緒に整理していきます。
                    </p>
                    <button
                        onClick={startChat}
                        disabled={!scatterAnalysis.hasData && !abcAnalysis.hasData}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {(!scatterAnalysis.hasData && !abcAnalysis.hasData) 
                            ? 'アセスメントデータを入力してください' 
                            : '分析を開始する'}
                    </button>
                </div>
            ) : (
                <>
                    <div ref={chatContainerRef} className="h-96 overflow-y-auto p-4 space-y-4">
                        {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap text-sm ${
                                    msg.role === 'user' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-white border border-gray-200 text-gray-800'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    {currentStep < 5 && (
                        <div className="p-4 border-t border-gray-200 bg-white">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                    placeholder="回答を入力してください..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={!inputValue.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    送信
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 5 && (
                        <div className="p-4 border-t border-gray-200 bg-white space-y-3">
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    {copied ? '✓ コピーしました！' : '📋 生成された文章をコピー'}
                                </button>
                                <a
                                    href="https://notebooklm.google.com/notebook/3e240d45-6fce-40a5-9388-d454249eb263"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-gradient-to-b from-purple-400 via-purple-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
                                >
                                    発達障害わかる君を開く
                                </a>
                            </div>
                            <button
                                onClick={resetChat}
                                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                もう一度やり直す
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// ==================== ⑧小項目タブコンテンツ ====================

const Step2Tab8Content = ({
    userConcerns,
    icebergWorksheets,
    setIcebergWorksheets,
    step2AssessmentData,
    setStep2AssessmentData
}) => {
    const [subSubTab, setSubSubTab] = useState(0);
    const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);

    const subSubTabs = ['アセスメント', '分析', '行動の背景'];

    // 有効な困りごとのみフィルタリング
    const validConcerns = userConcerns.filter(uc => uc.content.trim());

    // スキャッタープロットデータの更新
    const updateScatterPlotData = (problemIndex, data) => {
        setStep2AssessmentData(prev => ({
            ...prev,
            scatterPlots: {
                ...(prev.scatterPlots || {}),
                [problemIndex]: data
            }
        }));
    };

    // スキャッタープロット情報の更新
    const updateScatterPlotInfo = (problemIndex, info) => {
        setStep2AssessmentData(prev => ({
            ...prev,
            scatterPlotInfos: {
                ...(prev.scatterPlotInfos || {}),
                [problemIndex]: info
            }
        }));
    };

    // ABC記録の更新
    const updateAbcRecords = (problemIndex, records) => {
        setStep2AssessmentData(prev => ({
            ...prev,
            abcRecords: {
                ...(prev.abcRecords || {}),
                [problemIndex]: records
            }
        }));
    };

    // 初期データ生成
    const getScatterPlotData = (problemIndex) => {
        return (step2AssessmentData?.scatterPlots?.[problemIndex]) || 
            Array(48).fill(null).map(() => Array(14).fill(false));
    };

    const getScatterPlotInfo = (problemIndex) => {
        return step2AssessmentData?.scatterPlotInfos?.[problemIndex] || { observedAction: '', dates: Array(14).fill('') };
    };

    const getAbcRecords = (problemIndex) => {
        return step2AssessmentData?.abcRecords?.[problemIndex] || {
            startDate: '',
            endDate: '',
            records: [{ id: Date.now(), date: '', time: '', before: '', behavior: '', after: '' }]
        };
    };

    // FASTデータの更新
    const updateFastData = (problemIndex, data) => {
        setStep2AssessmentData(prev => ({
            ...prev,
            fastData: {
                ...(prev.fastData || {}),
                [problemIndex]: data
            }
        }));
    };

    const getFastData = (problemIndex) => {
        return step2AssessmentData?.fastData?.[problemIndex] || {};
    };

    // handleAutismPerspectiveChange などのワークシート操作関数
    const handleAutismPerspectiveChange = (worksheetIndex, trait, isChecked) => {
        setIcebergWorksheets(prev => prev.map((ws, i) => i === worksheetIndex ? {
            ...ws,
            autismPerspectives: { ...ws.autismPerspectives, [trait]: isChecked }
        } : ws));
    };

    const handleTraitDetailChange = (problemIndex, trait, value) => {
        setIcebergWorksheets(prev => prev.map((ws, i) => i === problemIndex ? {
            ...ws,
            traitDetails: { ...ws.traitDetails, [trait]: value }
        } : ws));
    };

    const handleEnvironmentCheckboxChange = (problemIndex, checkboxLabel, checked) => {
        setIcebergWorksheets(prev => prev.map((ws, i) => i === problemIndex ? {
            ...ws,
            environmentCheckboxes: { ...ws.environmentCheckboxes, [checkboxLabel]: checked }
        } : ws));
    };

    const handleEnvironmentTraitNotesChange = (problemIndex, trait, value) => {
        setIcebergWorksheets(prev => prev.map((ws, i) => i === problemIndex ? {
            ...ws,
            environmentTraitNotes: { ...(ws.environmentTraitNotes || {}), [trait]: value }
        } : ws));
    };

    const handleAddAdditionalNote = (problemIndex) => {
        setIcebergWorksheets(prev => prev.map((ws, i) => i === problemIndex ? {
            ...ws,
            additionalNotes: [...(ws.additionalNotes || []), { autism: '', environment: '' }]
        } : ws));
    };

    const handleAdditionalNoteChange = (problemIndex, noteIndex, field, value) => {
        setIcebergWorksheets(prev => prev.map((ws, i) => {
            if (i !== problemIndex) return ws;
            const newNotes = [...(ws.additionalNotes || [])];
            newNotes[noteIndex] = { ...newNotes[noteIndex], [field]: value };
            return { ...ws, additionalNotes: newNotes };
        }));
    };

    if (validConcerns.length === 0) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <p className="text-yellow-800">
                    ⑦困った・困っている行動で行動を入力してください。<br />
                    入力された行動ごとにアセスメントと分析を行います。
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* 対象行動の選択 */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">対象とする行動を選択:</label>
                <select
                    value={selectedProblemIndex}
                    onChange={(e) => setSelectedProblemIndex(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    {validConcerns.map((uc, idx) => (
                        <option key={uc.id} value={idx}>
                            {idx + 1}. {uc.content}
                        </option>
                    ))}
                </select>
            </div>

            {/* 小項目タブ */}
            <div className="flex gap-2 p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border border-blue-200">
                {subSubTabs.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSubSubTab(idx)}
                        className={`px-6 py-3 font-bold text-sm transition-all rounded-lg border-2 shadow-sm ${
                            subSubTab === idx
                                ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                                : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50 hover:border-blue-400'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* アセスメントタブ */}
            {subSubTab === 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <h4 className="font-bold text-blue-900">
                            対象行動: {validConcerns[selectedProblemIndex]?.content}
                        </h4>
                        <p className="text-sm text-blue-700 mt-1">
                            この行動について、スキャッタープロットとABC記録でデータを収集します。
                        </p>
                    </div>

                    <Step2ScatterPlot
                        problemIndex={selectedProblemIndex}
                        data={getScatterPlotData(selectedProblemIndex)}
                        setData={updateScatterPlotData}
                        info={getScatterPlotInfo(selectedProblemIndex)}
                        setInfo={updateScatterPlotInfo}
                    />

                    <Step2AbcRecord
                        problemIndex={selectedProblemIndex}
                        records={getAbcRecords(selectedProblemIndex)}
                        setRecords={updateAbcRecords}
                    />

                    <Step2Fast
                        problemIndex={selectedProblemIndex}
                        fastData={getFastData(selectedProblemIndex)}
                        setFastData={updateFastData}
                    />
                </div>
            )}

            {/* 分析タブ */}
            {subSubTab === 1 && (
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
                        <h4 className="font-bold text-indigo-900">
                            対象行動: {validConcerns[selectedProblemIndex]?.content}
                        </h4>
                        <p className="text-sm text-indigo-700 mt-1">
                            アセスメントで収集したデータを分析し、行動のパターンを言語化します。
                        </p>
                    </div>

                    <BehaviorPatternChat
                        problemContent={validConcerns[selectedProblemIndex]?.content || ''}
                        scatterPlotData={getScatterPlotData(selectedProblemIndex)}
                        scatterPlotInfo={getScatterPlotInfo(selectedProblemIndex)}
                        abcRecordData={getAbcRecords(selectedProblemIndex)}
                    />
                </div>
            )}

            {/* 行動の背景タブ（氷山モデルワークシート） */}
            {subSubTab === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    {/* 外部リンクボタン */}
                    <div className="text-center my-4">
                        <p className="text-sm text-gray-700 mb-2">
                            見えている困った行動または隠れているご利用者が困っていることの見えない背景が何か相談することができます。
                        </p>
                        <a
                            href="https://notebooklm.google.com/notebook/3e240d45-6fce-40a5-9388-d454249eb263"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-gradient-to-b from-purple-400 via-purple-500 to-indigo-600 text-white font-medium rounded-lg shadow-[0_4px_0_0_#4338ca,0_6px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_0_#4338ca,0_3px_6px_rgba(0,0,0,0.3)] hover:translate-y-[2px] active:shadow-[0_0px_0_0_#4338ca,0_1px_2px_rgba(0,0,0,0.3)] active:translate-y-[4px] transition-all border-t border-purple-300"
                        >
                            発達障害わかる君
                        </a>
                        <p className="mt-2 text-sm text-gray-500">
                            必ずしも正確な回答をするわけではありません。<br />
                            考察の参考にしてください。
                        </p>
                    </div>
                    
                    <p className="text-center text-md font-semibold text-gray-700 mb-6">氷山モデルワークシート</p>

                    {/* 選択された行動のワークシートのみ表示 */}
                    {(() => {
                        const uc = validConcerns[selectedProblemIndex];
                        const worksheet = icebergWorksheets[selectedProblemIndex];
                        if (!uc || !worksheet) return null;

                        return (
                            <div className="border-2 border-blue-200 rounded-lg p-4">
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                    <IcebergIcon />
                                    <div className="flex-grow w-full">
                                        <div className="bg-blue-100 p-3 rounded-t-lg">
                                            <label className="block text-sm font-medium text-blue-800 mb-1">見えている困った行動または隠れているご利用者が困っていること</label>
                                            <div className="w-full p-2 border border-blue-300 rounded bg-gray-50 min-h-[40px]">
                                                {uc.content}
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-b-lg border-t-4 border-dashed border-white">
                                            <label className="block text-sm font-medium text-blue-800 mb-2">見えない背景</label>
                                            <p className="text-xs text-gray-600 mb-2">自閉症の視点と周囲の環境や状況から考えられる課題となる行動の理由</p>
                                            
                                            {/* 操作方法の説明 */}
                                            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
                                                <p className="text-sm text-yellow-800 font-medium mb-1">📝 操作方法</p>
                                                <p className="text-xs text-yellow-700">
                                                    下の「自閉症の視点」と「周囲の状況や環境」の各項目を見て、該当すると思われる項目の □ をクリックしてチェックを入れてください。
                                                    また、具体的な状況があれば、テキスト欄に記入してください。
                                                </p>
                                            </div>
                                            
                                            <div className="relative">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <h4 className="text-sm font-semibold text-gray-700 text-center">自閉症の視点</h4>
                                                    <h4 className="text-sm font-semibold text-gray-700 text-center">周囲の状況や環境</h4>
                                                </div>

                                                <div className="mt-2">
                                                    <div className="space-y-2">
                                                        {PERMANENT_TRAITS.map((trait, idx) => (
                                                            <div key={trait} className={`grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3 rounded-lg ${idx % 2 === 1 ? 'bg-slate-100/70' : 'bg-white/70'}`}>
                                                                {/* Left: Trait */}
                                                                <div className="border border-gray-300 rounded p-3 bg-white flex flex-col">
                                                                    <label className="flex items-center text-sm font-medium text-gray-600">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={!!worksheet.autismPerspectives[trait]}
                                                                            onChange={(e) => handleAutismPerspectiveChange(selectedProblemIndex, trait, e.target.checked)}
                                                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                                                                        />
                                                                        {trait}
                                                                    </label>
                                                                    <textarea
                                                                        value={worksheet.traitDetails[trait] || ''}
                                                                        onChange={(e) => handleTraitDetailChange(selectedProblemIndex, trait, e.target.value)}
                                                                        className="w-full p-2 mt-1 border border-blue-300 rounded text-sm flex-grow"
                                                                        rows="3"
                                                                        placeholder="ご利用者はどのようなことで困っているか具体的に書いてください。"
                                                                    />
                                                                </div>
                                                                {/* Right: Environment */}
                                                                <div className="border border-gray-300 rounded p-3 bg-white flex flex-col">
                                                                    {ENVIRONMENT_MAP[trait] && (
                                                                        <div className="flex-grow">
                                                                            {ENVIRONMENT_MAP[trait].map(checkboxLabel => (
                                                                                <label key={checkboxLabel} className="flex items-center text-sm text-gray-700 mb-2">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        checked={!!worksheet.environmentCheckboxes[checkboxLabel]}
                                                                                        onChange={(e) => handleEnvironmentCheckboxChange(selectedProblemIndex, checkboxLabel, e.target.checked)}
                                                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                                                                                    />
                                                                                    {checkboxLabel}
                                                                                </label>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                    <textarea
                                                                        value={(worksheet.environmentTraitNotes || {})[trait] || ''}
                                                                        onChange={(e) => handleEnvironmentTraitNotesChange(selectedProblemIndex, trait, e.target.value)}
                                                                        className="w-full p-2 mt-2 border border-blue-300 rounded text-sm"
                                                                        rows="2"
                                                                        placeholder="気づいた周囲の状況や環境"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block absolute top-10 bottom-0 left-1/2 -translate-x-1/2 w-px">
                                                    <div className="h-full border-l-2 border-dashed border-gray-400"></div>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2 mt-4">
                                                {worksheet.additionalNotes.map((note, noteIdx) => (
                                                    <div key={noteIdx} className={`relative grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch p-3 rounded-lg ${PERMANENT_TRAITS.length % 2 === 1 ? (noteIdx % 2 === 0 ? 'bg-slate-100/70' : 'bg-white/70') : (noteIdx % 2 === 0 ? 'bg-white/70' : 'bg-slate-100/70')}`}>
                                                        <div className="border border-gray-300 rounded p-3 bg-white flex flex-col">
                                                            <label className="text-sm font-medium text-gray-600 mb-1">自閉症の視点(自由記載)</label>
                                                            <textarea
                                                                value={note.autism}
                                                                onChange={(e) => handleAdditionalNoteChange(selectedProblemIndex, noteIdx, 'autism', e.target.value)}
                                                                className="w-full p-2 mt-1 border border-blue-300 rounded text-sm flex-grow"
                                                                rows="3"
                                                                placeholder="ご利用者はどのようなことで困っているか具体的に書いてください。"
                                                            />
                                                        </div>
                                                        <div className="border border-gray-300 rounded p-3 bg-white flex flex-col">
                                                            <label className="text-sm font-medium text-gray-600 mb-1">周囲の状況や環境(自由記載)</label>
                                                            <textarea
                                                                value={note.environment}
                                                                onChange={(e) => handleAdditionalNoteChange(selectedProblemIndex, noteIdx, 'environment', e.target.value)}
                                                                className="w-full p-2 mt-1 border border-blue-300 rounded text-sm flex-grow"
                                                                rows="3"
                                                                placeholder="気づいた周囲の状況や環境"
                                                            />
                                                        </div>
                                                        <div className="hidden sm:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px">
                                                            <div className="h-full border-l-2 border-dashed border-gray-400"></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-center mt-4">
                                                <button
                                                    onClick={() => handleAddAdditionalNote(selectedProblemIndex)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                                                >
                                                    自由記載欄を追加
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}
        </div>
    );
};

// ==================== ステップ2メインコンポーネント ====================

export const Step2Content = ({ 
    step2SubTab, 
    setStep2SubTab,
    problems, 
    setProblems,
    userConcerns, 
    setUserConcerns,
    icebergWorksheets, 
    setIcebergWorksheets,
    assessment,
    step2AssessmentData,
    setStep2AssessmentData
}) => {
    const step2Tabs = ['⑤困った行動', '⑥背景となる障害特性', '⑦困った・困っている行動', '⑧困った・困っている行動の背景(氷山モデル)'];

    // ドラッグ＆ドロップ用の参照
    const dragItem = React.useRef(null);
    const dragOverItem = React.useRef(null);

    const handleProblemDragStart = (index) => {
        dragItem.current = index;
    };

    const handleProblemDragEnter = (index) => {
        dragOverItem.current = index;
    };

    const handleProblemDrop = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;

        const reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        };

        if (dragItem.current !== dragOverItem.current) {
            const newProblems = reorder(problems, dragItem.current, dragOverItem.current);
            const newIcebergWorksheets = reorder(icebergWorksheets, dragItem.current, dragOverItem.current);
            setProblems(newProblems);
            setIcebergWorksheets(newIcebergWorksheets);
        }

        dragItem.current = null;
        dragOverItem.current = null;
    };

    // フィードバック表示判定
    const showAnxietyFeedback = useMemo(() => {
        const anxietyCondition = assessmentCategories['予期不安'].items.some(item => {
            const value = assessment[`予期不安-${item}`];
            return value === '○' || value === '△';
        });
        const actionStartValue = assessment['予期不安-行動を始めるとき'];
        // 予期不安カテゴリが○または△、または行動を始めるときが△または×の場合に表示
        return anxietyCondition || (actionStartValue === '△' || actionStartValue === '×');
    }, [assessment]);

    const showCommunicationFeedback = useMemo(() => {
        const expression = assessment['コミュニケーション-表現(発語やジェスチャー)'];
        const understanding = assessment['コミュニケーション-口頭での理解'];
        const visualCues = assessment['コミュニケーション-視覚的手がかりがあった場合の理解'];
        return (expression === '△' || expression === '×') ||
               (understanding === '△' || understanding === '×') ||
               (visualCues === '○' || visualCues === '△');
    }, [assessment]);
    
    const showSocialRuleFeedback = useMemo(() => {
        const socialRuleCondition = assessmentCategories['社会的ルール'].items.some(item => {
            const value = assessment[`社会的ルール-${item}`];
            return value === '○' || value === '△';
        });
        const activitySkillValue = assessment['作業/日課/余暇活動-作業/日課/余暇活動のやり方が分かっている。もしくは正しくできている。'];
        // 社会的ルールが○または△、または作業/日課/余暇活動のやり方が△または×の場合に表示
        return socialRuleCondition || (activitySkillValue === '△' || activitySkillValue === '×');
    }, [assessment]);

    const showMemoryFeedback = useMemo(() => {
        const rushValue = assessment['生活スキル-つい急かしてしまうことがある'];
        const activitySkillValue = assessment['作業/日課/余暇活動-作業/日課/余暇活動のやり方が分かっている。もしくは正しくできている。'];
        const suddenStopValue = assessment['作業/日課/余暇活動-作業/日課/余暇活動をしていて、突然できなくなることがある'];
        // つい急かしてしまうことがある が○または△、または作業/日課/余暇活動のやり方が△または×、または突然できなくなることがある が△または×の場合に表示
        return (rushValue === '○' || rushValue === '△') || 
               (activitySkillValue === '△' || activitySkillValue === '×') ||
               (suddenStopValue === '△' || suddenStopValue === '×');
    }, [assessment]);

    const showStimulusFeedback = useMemo(() => {
        return assessmentCategories['生活スキル'].items.some(item => {
            if (item === 'つい急かしてしまうことがある') return false;
            const value = assessment[`生活スキル-${item}`];
            return value === '△' || value === '×';
        });
    }, [assessment]);
    
    const showSensoryFeedback = useMemo(() => {
        return assessmentCategories['感覚の過敏性'].items.some(item => {
            const key = `感覚の過敏性-${item}`;
            return !!assessment[key];
        });
    }, [assessment]);

    return (
        <div className="space-y-4">
            <div className="flex gap-2 border-b-2 border-gray-200 overflow-x-auto">
                {step2Tabs.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => setStep2SubTab(idx)}
                        className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                            step2SubTab === idx
                                ? 'text-blue-600 border-b-4 border-blue-600'
                                : 'text-gray-600 hover:text-blue-500'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {step2SubTab === 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-baseline gap-4 mb-4">
                        <h3 className="text-lg font-bold text-gray-800">⑤困った行動</h3>
                        <p className="text-sm text-gray-500">周囲の人たちが困っているご利用者の行動/優先順位の順番に困った行動を入れてください</p>
                    </div>
                    <div className="space-y-3">
                        {problems.map((problem, idx) => (
                            <div 
                                key={problem.id}
                                className="flex items-center gap-2 p-2"
                                draggable
                                onDragStart={() => handleProblemDragStart(idx)}
                                onDragEnter={() => handleProblemDragEnter(idx)}
                                onDragEnd={handleProblemDrop}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <div className="cursor-grab text-gray-400 hover:text-gray-600">
                                    <GripVertical />
                                </div>
                                <span className="font-medium text-gray-600 w-8">{idx + 1}.</span>
                                <input
                                    type="text"
                                    value={problem.content}
                                    onChange={(e) => {
                                        const newProblems = [...problems];
                                        newProblems[idx].content = e.target.value;
                                        setProblems(newProblems);
                                    }}
                                    placeholder="困った行動を入力してください"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {step2SubTab === 1 && (
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">⑥背景となる障害特性(アセスメントからのフィードバック)</h3>
                    {showAnxietyFeedback && (
                        <>
                            <TraitFeedback 
                                title="変化が苦手"
                                userConcern="先々のことが不安になって仕方がない(予期不安)"
                                trait="変化が苦手"
                                userSituation="知らされていない予定が多い→見通しが立たないので不安"
                                supportSituation="次に何があるかを示していない(予告支援をしていない)"
                            />
                            <TraitFeedback
                                title="特別な空間のとらえ方"
                                userConcern="空間に視覚的な手がかりがなくて混乱する"
                                trait="特別な空間のとらえ方"
                                userSituation="どう過ごしたらよいかわからない→空間に区切りがないとわからない"
                                supportSituation="環境を整えていない"
                            />
                        </>
                    )}
                    {showCommunicationFeedback && (
                        <TraitFeedback
                            title="コミュニケーションが苦手"
                            userConcern="コミュニケーションが取れなくて辛い"
                            trait="コミュニケーションが苦手"
                            userSituation="言われたことがわからない、伝えたいことが伝わらない"
                            supportSituation="口頭で伝えている、ご利用者の伝えたいことが理解できない"
                        />
                    )}
                    {showSocialRuleFeedback && (
                        <TraitFeedback
                            title="想像することが苦手"
                            userConcern="注意されるけど理由がわからなくて辛い、過剰な関連付けをしてしまう（例：「雨」が降ったら「傘」をさす→「傘」をさしたら「雨」が降ると思ってしまう）"
                            trait="想像することが苦手"
                            userSituation="相手や周囲の人の気持ちがわからない、当たり前だと思っていることが正しくないことがある"
                            supportSituation="口頭で注意する"
                        />
                    )}
                    {showMemoryFeedback && (
                        <TraitFeedback
                            title="特別な記憶の仕方"
                            userConcern="言われたことをすぐに思い出せない、何もしていないときに嫌なことを思い出しやすい、記憶を頼りに行動している"
                            trait="ショートムービーのような特別な記憶の仕方"
                            userSituation="思い出すのに時間がかかってしまう、パニックになったりイライラしたりすることがある"
                            supportSituation="つい急かしてしまう"
                        />
                    )}
                    {showStimulusFeedback && (
                        <TraitFeedback
                            title="人からの刺激が苦手"
                            userConcern="人と一緒にいると緊張したり、視線が痛かったりする"
                            trait="人からの刺激が苦手"
                            userSituation="人と接触する機会が多い"
                            supportSituation="介助などの支援をすることが多い"
                        />
                    )}
                    {showSensoryFeedback && (
                        <TraitFeedback
                            title="感覚過敏"
                            userConcern="刺激が強くて辛い"
                            trait="感覚過敏"
                            userSituation="強い刺激にさらされている"
                            supportSituation="刺激を軽減する支援をしていない"
                        />
                    )}
                    {!showAnxietyFeedback && !showCommunicationFeedback && !showSocialRuleFeedback && !showMemoryFeedback && !showStimulusFeedback && !showSensoryFeedback && (
                        <p className="text-gray-500">②日常生活アセスメントで該当する項目にチェックを入れると、関連する障害特性の解説がここに表示されます。</p>
                    )}
                </div>
            )}
            
            {step2SubTab === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">⑦困った・困っている行動</h3>
                    <div className="space-y-3">
                        {userConcerns.map((concern, idx) => (
                            <div key={concern.id} className="flex items-center gap-3">
                                <span className="font-medium text-gray-600 w-8">{idx + 1}.</span>
                                <input
                                    type="text"
                                    value={concern.content}
                                    onChange={(e) => {
                                        const newConcerns = [...userConcerns];
                                        newConcerns[idx] = { ...newConcerns[idx], content: e.target.value };
                                        setUserConcerns(newConcerns);
                                    }}
                                    placeholder="ご利用者がこまっていることを入力してください"
                                    className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${idx < problems.filter(p => p.content.trim() !== '').length ? 'bg-gray-100' : ''}`}
                                    readOnly={idx < problems.filter(p => p.content.trim() !== '').length}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {step2SubTab === 3 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">⑧困った・困っている行動の背景(氷山モデル)</h3>
                    
                    <Step2Tab8Content
                        userConcerns={userConcerns}
                        icebergWorksheets={icebergWorksheets}
                        setIcebergWorksheets={setIcebergWorksheets}
                        step2AssessmentData={step2AssessmentData}
                        setStep2AssessmentData={setStep2AssessmentData}
                    />
                </div>
            )}
        </div>
    );
};
