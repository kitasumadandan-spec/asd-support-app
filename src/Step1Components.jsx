import React, { useMemo, useState } from 'react';
import { RotateCcw } from './SharedComponents';
import { assessmentCategories, exampleTexts, days, rotatedTimeSlots, ICF_DATA, ICF_ENVIRONMENT_DATA } from './constants';

// ==================== ステップ1メインコンポーネント ====================

export const Step1Content = ({ 
    currentSubTab, 
    setCurrentSubTab,
    profile, 
    setProfile,
    assessment, 
    setAssessment,
    schedule, 
    setSchedule,
    scheduleHistory, 
    setScheduleHistory,
    copiedCell,
    setCopiedCell,
    activeCell,
    setActiveCell,
    icfEvaluation,
    setIcfEvaluation,
    icfEnvEvaluation,
    setIcfEnvEvaluation
}) => {
    const subTabs = ['①プロフィール', '②日常生活アセスメント', '③1週間の過ごし方', '④ご利用者の強みと現状の支援'];
    const [isIcfGuideVisible, setIsIcfGuideVisible] = useState(false);
    const [isIcfEnvGuideVisible, setIsIcfEnvGuideVisible] = useState(false);

    const handleAssessmentButtonClick = (category, item, mark) => {
        const key = `${category}-${item}`;
        setAssessment(prev => {
            const newAssessment = {...prev};
            if (newAssessment[key] === mark) {
                delete newAssessment[key];
            } else {
                newAssessment[key] = mark;
            }
            return newAssessment;
        });
    };
    
    const handleSensoryCheckboxChange = (item) => {
        const key = `感覚の過敏性-${item}`;
        setAssessment(prev => {
            const newAssessment = {...prev};
            newAssessment[key] = !newAssessment[key];
            return newAssessment;
        });
    };

    const handleScheduleClick = (day, time) => {
        const key = `${day}-${time}`;
        setScheduleHistory([...scheduleHistory, JSON.parse(JSON.stringify(schedule))]);
        setSchedule(prev => {
            const newSchedule = { ...prev };
            const currentCell = newSchedule[key];
            if (currentCell && currentCell.selected) {
                newSchedule[key] = { text: '', selected: false };
            } else {
                newSchedule[key] = { ...(currentCell || { text: '' }), selected: true };
            }
            return newSchedule;
        });
    };

    const handleScheduleText = (day, time, text) => {
        const key = `${day}-${time}`;
        setSchedule(prev => ({
            ...prev,
            [key]: { ...(prev[key] || { selected: false }), text }
        }));
    };

    const undoSchedule = () => {
        if (scheduleHistory.length > 0) {
            const previous = scheduleHistory[scheduleHistory.length - 1];
            setSchedule(previous);
            setScheduleHistory(scheduleHistory.slice(0, -1));
        }
    };

    const handleCopy = () => {
        if (activeCell) {
            setCopiedCell(schedule[activeCell] || { text: '', selected: false });
        }
    };

    const handlePaste = () => {
        if (activeCell && copiedCell) {
            setScheduleHistory([...scheduleHistory, JSON.parse(JSON.stringify(schedule))]);
            setSchedule(prev => ({
                ...prev,
                [activeCell]: { ...copiedCell }
            }));
        }
    };

    const handleIcfChange = (itemId, field, value) => {
        setIcfEvaluation(prev => {
            const newState = { ...prev };
            const currentItemState = newState[itemId] || {};
            const newItemState = { ...currentItemState, [field]: value };

            // Logic to auto-skip subsequent questions
            if (field === 'q1') {
                if (value === '困難なし' || value === '詳細不明・非該当') {
                    newItemState.q2 = 'スキップ';
                    newItemState.q3 = 'スキップ';
                } else { // 困難あり
                    delete newItemState.q2;
                    delete newItemState.q3;
                }
            } else if (field === 'q2') {
                if (value === 'なし' || value === 'スキップ') {
                    newItemState.q3 = 'スキップ';
                } else { // あり
                    delete newItemState.q3;
                }
            }

            newState[itemId] = newItemState;
            return newState;
        });
    };

    const handleIcfEnvChange = (itemId, field, value) => {
        setIcfEnvEvaluation(prev => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                [field]: value
            }
        }));
    };

    return (
        <div className="space-y-6">
            {/* タブナビゲーション */}
            <div className="flex gap-1 p-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl overflow-x-auto shadow-inner">
                {subTabs.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSubTab(idx)}
                        className={`px-5 py-3 font-medium transition-all duration-300 whitespace-nowrap rounded-xl ${
                            currentSubTab === idx
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-[1.02]'
                                : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {currentSubTab === 0 && (
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                        <span className="text-3xl">👤</span> プロフィール情報
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">生年月日</label>
                            <input
                                type="date"
                                value={profile.birthDate}
                                onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400 transition-all bg-white shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">年齢</label>
                            <input
                                type="number"
                                value={profile.age}
                                onChange={(e) => setProfile({...profile, age: e.target.value})}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400 transition-all bg-white shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">保護者</label>
                            <input
                                type="text"
                                value={profile.guardian}
                                onChange={(e) => setProfile({...profile, guardian: e.target.value})}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400 transition-all bg-white shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">手帳情報</label>
                            <select
                                value={profile.handbook}
                                onChange={(e) => setProfile({...profile, handbook: e.target.value})}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400 transition-all bg-white shadow-sm hover:border-blue-300 cursor-pointer"
                            >
                                <option value="">選択してください</option>
                                <option value="A">A</option>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                            </select>
                        </div>
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">支援区分</label>
                            <select
                                value={profile.supportLevel}
                                onChange={(e) => setProfile({...profile, supportLevel: e.target.value})}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400 transition-all bg-white shadow-sm hover:border-blue-300 cursor-pointer"
                            >
                                <option value="">選択してください</option>
                                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">強度行動障害の点数</label>
                            <input
                                type="number"
                                value={profile.behaviorScore}
                                onChange={(e) => setProfile({...profile, behaviorScore: e.target.value})}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400 transition-all bg-white shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="md:col-span-2 group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">既往歴</label>
                            <textarea
                                value={profile.medicalHistory}
                                onChange={(e) => setProfile({...profile, medicalHistory: e.target.value})}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400 transition-all bg-white shadow-sm hover:border-blue-300 resize-y"
                                rows="3"
                            />
                        </div>
                        <div className="md:col-span-2 group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">生活歴</label>
                            <textarea
                                value={profile.lifeHistory}
                                onChange={(e) => setProfile({...profile, lifeHistory: e.target.value})}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400 transition-all bg-white shadow-sm hover:border-blue-300 resize-y"
                                rows="3"
                            />
                        </div>
                    </div>
                </div>
            )}

            {currentSubTab === 1 && (
                <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-8 rounded-2xl shadow-lg border border-blue-300 space-y-8">
                    {Object.entries(assessmentCategories).map(([category, config]) => (
                        <div key={category} className="space-y-4 bg-white/95 p-6 rounded-xl shadow-md">
                            <div>
                                <h4 className="font-bold text-lg text-blue-700 border-b-2 border-blue-400 pb-2">{category}</h4>
                            </div>

                            {category === '感覚の過敏性' ? (
                                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                                    {config.items.map((item, idx) => (
                                        <label key={idx} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={!!assessment[`${category}-${item}`]}
                                                onChange={() => handleSensoryCheckboxChange(item)}
                                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {(() => {
                                        // カテゴリごとに新しい項目を追加
                                        let itemsToRender = config.items;
                                        if (category === '作業/日課/余暇活動') {
                                            itemsToRender = [
                                                ...config.items,
                                                '作業/日課/余暇活動のやり方が分かっている。もしくは正しくできている。',
                                                '作業/日課/余暇活動をしていて、突然できなくなることがある'
                                            ];
                                        }
                                        if (category === '予期不安') {
                                            itemsToRender = [
                                                ...config.items,
                                                '行動を始めるとき'
                                            ];
                                        }
                                        return itemsToRender.map((item, idx) => {
                                            let description = config.description;
                                            if (item === 'つい急かしてしまうことがある') {
                                                description = 'つい急かしてしまうことが多いは○、ときどきあるは△、ないは×';
                                            }
                                            if (item === '作業/日課/余暇活動のやり方が分かっている。もしくは正しくできている。') {
                                                description = 'やり方が分かっているもしくは正しくできている場合は○、ときどき間違えるときがある場合は△、やり方が分かっていないもしくは正しくできていない場合は×';
                                            }
                                            if (item === '作業/日課/余暇活動をしていて、突然できなくなることがある') {
                                                description = '突然できなくなることはないの場合は○、たまに突然できなくなることがあるの場合は△、ときどき突然できなくなることがある場合は×';
                                            }
                                            if (item === '行動を始めるとき') {
                                                description = '自分で時計やスケジュールボードを見て行動する場合は○、ときどきできないことがある場合は△、他の利用者の行動や支援者の声掛けで行動している場合は×';
                                            }
                                            return (
                                                <div key={idx} className="space-y-2">
                                                    <div className="flex items-center flex-wrap gap-2">
                                                        <label className="text-sm font-medium text-gray-800">{item}</label>
                                                        {config.hasButtons && (
                                                            <div className="flex items-center gap-3 ml-auto">
                                                                <span className="text-xs text-gray-500">{description}</span>
                                                                <div className="flex gap-3">
                                                                    {['○', '△', '×'].map(mark => {
                                                                        const isSelected = assessment[`${category}-${item}`] === mark;
                                                                        let buttonClass = 'border-gray-300 bg-white hover:bg-gray-50';
                                                                        if (isSelected) {
                                                                            if (mark === '○') buttonClass = 'border-green-500 bg-green-100 text-green-700';
                                                                            else if (mark === '△') buttonClass = 'border-yellow-500 bg-yellow-100 text-yellow-700';
                                                                            else if (mark === '×') buttonClass = 'border-red-500 bg-red-100 text-red-700';
                                                                        }
                                                                        return (
                                                                            <button
                                                                                key={mark}
                                                                                onClick={() => handleAssessmentButtonClick(category, item, mark)}
                                                                                className={`w-9 h-9 rounded-full font-bold transition-colors border-2 flex-shrink-0 ${buttonClass}`}
                                                                            >
                                                                                {mark}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {item === '健康・病気' ? (
                                                        <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded text-sm min-h-[60px]">
                                                            {profile.medicalHistory || '①プロフィールの「既往歴」に入力すると、ここに反映されます。'}
                                                        </div>
                                                    ) : (
                                                        <textarea
                                                            placeholder={`例:${exampleTexts[item] || 'なし'}`}
                                                            value={assessment[`${category}-${item}-note`] || ''}
                                                            onChange={(e) => setAssessment({...assessment, [`${category}-${item}-note`]: e.target.value})}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                            rows="2"
                                                        />
                                                    )}
                                                </div>
                                            )
                                        });
                                    })()}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {currentSubTab === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                        <h3 className="text-lg font-bold text-gray-800">1週間の過ごし方</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={handleCopy}
                                disabled={!activeCell}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                コピー
                            </button>
                            <button
                                onClick={handlePaste}
                                disabled={!activeCell || !copiedCell}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                ペースト
                            </button>
                            <button
                                onClick={undoSchedule}
                                disabled={scheduleHistory.length === 0}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-1 shadow-md"
                            >
                                <RotateCcw />
                                元に戻す
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 bg-blue-100 p-2 sticky left-0 z-10">時刻</th>
                                    {days.map(day => (
                                        <th key={day} className="border border-gray-300 bg-blue-100 p-2 min-w-[120px]">{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rotatedTimeSlots.map(time => (
                                    <tr key={time}>
                                        <td className="border border-gray-300 bg-gray-50 p-2 font-medium sticky left-0 z-10">{time}</td>
                                        {days.map(day => {
                                            const key = `${day}-${time}`;
                                            const cell = schedule[key];
                                            const isActive = activeCell === key;
                                            return (
                                                <td
                                                    key={key}
                                                    onClick={() => handleScheduleClick(day, time)}
                                                    className={`border border-gray-300 p-0 cursor-pointer transition-colors h-10 ${
                                                        cell?.selected ? 'bg-red-100' : 'hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <input
                                                        type="text"
                                                        value={cell?.text || ''}
                                                        onFocus={() => setActiveCell(key)}
                                                        onChange={(e) => handleScheduleText(day, time, e.target.value)}
                                                        className={`w-full h-full bg-transparent border-none outline-none text-xs p-1 text-center ${
                                                            isActive ? 'ring-2 ring-blue-500' : ''
                                                        }`}
                                                        placeholder=""
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {currentSubTab === 3 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">ICF評価シート(活動と参加)</h3>
                            <div className="mb-4">
                                <button
                                    onClick={() => setIsIcfGuideVisible(!isIcfGuideVisible)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                                >
                                    {isIcfGuideVisible ? '記入の仕方を閉じる' : '記入の仕方を開く'}
                                </button>
                                {isIcfGuideVisible && (
                                    <div className="mt-4 border p-4 rounded-lg bg-gray-50 text-sm space-y-4">
                                        <div>
                                            <h4 className="font-bold">1. 3つの質問に回答する際の留意点</h4>
                                            <div className="pl-4 mt-2 space-y-2">
                                                <p><strong className="font-medium">①支援なしの場面では:</strong> 質問1は、支援なしの場面で項目内容についての困難が対象児者に少しでもあれば「困難あり」を選択してください。「困難なし」は支援なしでも項目内容を独力で達成できる場合に選択してください。</p>
                                                <p><strong className="font-medium">②困難が軽減する場面や支援:</strong> 質問2は、質問1で「困難あり」を選択した場合にのみ回答し、それ以外では「スキップ」を選択します。対象児者の困難が軽減する場面や支援の「あり・なし」については、困難が少しでも軽減する場面や支援があれば「あり」と回答し、困難が軽減する場面や支援がなければ「なし」と回答してください。なお、ここでの場面や支援とは意図的なものだけでなく意図しない日常の一場面、関わりや配慮も含みます。</p>
                                                <p><strong className="font-medium">③困難軽減の程度は:</strong> 質問3は、質問2で「あり」を選択した場合にのみ回答し、それ以外では「スキップ」を選択します。対象児者の困難軽減の程度が「顕著である」と支援者の多くが根拠をもって判断できる場合には「大きい」と回答し、困難軽減はあるが「顕著でない」と支援者の多くが判断または軽減の程度について判断が分かれる場合には「小さい」と回答してください。「小さい」の場合には支援内容の再確認や修正が必要です。</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold">2. 補足情報に記入する内容の解説</h4>
                                            <div className="pl-4 mt-2 space-y-2">
                                                <p><strong className="font-medium">①困難の状況:</strong> (「困難なし/困難あり」のいずれの場合でも記載。) 困難なし: 他の困難への活用のため実行状況を具体的に記載。顕著に高い能力の場合はその詳細を記載。 困難あり: 困難の実際の状況に合わせて支援を考えていくため、具体的な困難状況がわかるように記載。</p>
                                                <p><strong className="font-medium">②場面や支援:</strong> (質問2が「あり」で記載。意図していない日常の一場面、関わりや配慮も含む。) 場面: その場面の具体的状況(いつ・どこで・どんな場面)を記載。その場面や支援を他の困難に活用できることもあるため、具体的記述が重要。 支援: その支援の具体的内容(いつ・どこで・どのように)を記載。</p>
                                                <p><strong className="font-medium">③軽減の状況:</strong> (質問2が「あり」の場合、対象児者の困難さが軽減されている状況と程度を具体的に記載。) 大きい: 「困難軽減が顕著である」状況を具体的に記載。(どの程度やりやすくなったかなども記載) 小さい: 「困難軽減が顕著でない」状況を具体的に記載。(どんな困難がどれくらい残っているかも記載)</p>
                                                <p><strong className="font-medium">④その他:</strong> (支援カテゴリーに応じて以下を記載。また特記すべきその他の内容を記載。) 「強み」: その強みが対象児者の生活に活かされている程度や範囲と具体的状況を記載。「支援維持」: 困難軽減につながる場面や支援が生活に活かされている程度や範囲と具体的状況を記載。「支援修正」「支援考案」: その項目の困難軽減が対象児者に必要である理由を具体的に記載。「情報なし」: その項目の情報把握が対象児者の支援に必要あるいは不要である理由を具体的に記載。特記すべきその他の内容: 支援の検討に有用と思われるエピソードなどを記載。</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="overflow-auto max-h-[60vh]">
                                <table className="w-full border-collapse text-xs">
                                    <thead className="sticky top-0 bg-white z-10">
                                        <tr className="bg-blue-100">
                                            <th className="border p-2 min-w-[80px]">項目番号</th>
                                            <th className="border p-2 min-w-[200px]">項目タイトル</th>
                                            <th className="border p-2 min-w-[150px]">支援なしで</th>
                                            <th className="border p-2 min-w-[150px]">困難軽減の場面や支援</th>
                                            <th className="border p-2 min-w-[150px]">軽減の程度は</th>
                                            <th className="border p-2 min-w-[100px]">チェック</th>
                                            <th className="border p-2 min-w-[250px]">補足情報</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ICF_DATA.map(chapter => (
                                            <React.Fragment key={chapter.chapter}>
                                                <tr>
                                                    <td colSpan="7" className="bg-blue-50 font-bold p-2 border sticky top-12 z-10">{chapter.chapter}</td>
                                                </tr>
                                                {chapter.items.map(item => {
                                                    const itemState = icfEvaluation[item.id] || {};
                                                    const checkStatus = (() => {
                                                        const { q1, q2, q3 } = itemState;
                                                        if (q1 === '困難なし') return { text: '強み', color: 'bg-blue-200' };
                                                        if (q1 === '困難あり' && q2 === 'なし') return { text: '支援考案', color: 'bg-red-200' };
                                                        if (q1 === '困難あり' && q2 === 'あり' && q3 === '小さい') return { text: '支援修正', color: 'bg-yellow-200' };
                                                        if (q1 === '困難あり' && q2 === 'あり' && q3 === '大きい') return { text: '支援継続', color: 'bg-green-200' };
                                                        if (q1 && (q1 === '詳細不明・非該当' || (q2 && (q2 !=='あり' || q3)))) return { text: '×', color: 'bg-gray-200' };
                                                        return { text: '', color: '' };
                                                    })();

                                                    return (
                                                        <tr key={item.id}>
                                                            <td className="border p-2">{item.id}</td>
                                                            <td className="border p-2">{item.title}</td>
                                                            <td className="border p-2">
                                                                {['困難あり', '困難なし', '詳細不明・非該当'].map(option => (
                                                                    <label key={option} className="flex items-center">
                                                                        <input type="radio" name={`${item.id}-q1`} value={option} checked={itemState.q1 === option} onChange={(e) => handleIcfChange(item.id, 'q1', e.target.value)} className="mr-1" />
                                                                        {option}
                                                                    </label>
                                                                ))}
                                                            </td>
                                                            <td className="border p-2">
                                                                {['あり', 'なし', 'スキップ'].map(option => (
                                                                    <label key={option} className="flex items-center">
                                                                        <input type="radio" name={`${item.id}-q2`} value={option} checked={itemState.q2 === option} onChange={(e) => handleIcfChange(item.id, 'q2', e.target.value)} className="mr-1" disabled={itemState.q1 !== '困難あり'} />
                                                                        {option}
                                                                    </label>
                                                                ))}
                                                            </td>
                                                            <td className="border p-2">
                                                                {['大きい', '小さい', 'スキップ'].map(option => (
                                                                    <label key={option} className="flex items-center">
                                                                        <input type="radio" name={`${item.id}-q3`} value={option} checked={itemState.q3 === option} onChange={(e) => handleIcfChange(item.id, 'q3', e.target.value)} className="mr-1" disabled={itemState.q2 !== 'あり'} />
                                                                        {option}
                                                                    </label>
                                                                ))}
                                                            </td>
                                                            <td className={`border p-2 text-center font-semibold ${checkStatus.color}`}>
                                                                {checkStatus.text}
                                                            </td>
                                                            <td className="border p-2">
                                                                <textarea value={itemState.notes || ''} onChange={(e) => handleIcfChange(item.id, 'notes', e.target.value)} className="w-full p-1 border rounded" rows="3"></textarea>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">ICF評価シート(環境因子)</h3>
                            <div className="mb-4">
                                <button
                                    onClick={() => setIsIcfEnvGuideVisible(!isIcfEnvGuideVisible)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                                >
                                    {isIcfEnvGuideVisible ? '記入の仕方を閉じる' : '記入の仕方を開く'}
                                </button>
                                {isIcfEnvGuideVisible && (
                                    <div className="mt-4 border p-4 rounded-lg bg-gray-50 text-sm space-y-4">
                                        <p>(項目によって表現は変わるが、①生活への悪影響、②生活への好影響、③その他の構成となっている)</p>
                                        <div className="pl-4 mt-2 space-y-2">
                                            <p><strong className="font-medium">①生活への悪影響:</strong>当該環境因子の具体的内容と生活への悪影響の具体的状況を記載。さらに当該の悪影響を生活全体から除去している程度や範囲(悪影響の除去による生活の快適度)を記載。</p>
                                            <p><strong className="font-medium">②生活への好影響:</strong>当該環境因子の具体的内容と生活への好影響の具体的状況を記載。さらに当該の好影響を生活全体で充実させている程度や範囲(好影響の充実による生活の快適度)を記載。</p>
                                            <p><strong className="font-medium">③その他:</strong>悪影響の除去や好影響の充実を図る上で障壁となっている状況があれば具体的に記載。</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold">1. 第3章・第4章の情報聴取に際しての留意点</h4>
                                            <div className="pl-4 mt-2 space-y-2">
                                                <p><strong className="font-medium">注1) 物理的支援とは「具体物による支援や身体的な支援」のこと。</strong>「具体物による支援」は例えば、絵や文字で情報伝達する、スケジュールを帰属掲示する、タイマーを使う、漢字にフリガナを振る、文字を読みやすい大きさにするなど。「身体的な支援」は例えば、衣服の着脱・洗濯や爪切り・物や道具を使うことなどを手伝う、わかりやすい話し方をする、(危険回避のために)手をつないで歩く、など。</p>
                                                <p><strong className="font-medium">注2) 心理的支援とは「心理的な安定につながる支援」のこと。</strong>例えば、ほめる、なぐさめる、安心させる、元気づける、気持ちを落ちつかせる、受容的に関わる、自信や自己肯定感を支える、など。</p>
                                                <p><strong className="font-medium">注3) 特性理解とは「対象児者の生活上の困難さを児者の特性の観点から理解する」こと。</strong>で、例えば、課題に長時間取り組むことの難しさを注意機能の課題として理解することなど。多様な観点とは「個別的な困難を示す児者を多様性の観点の幅に受けとめること」で、例えば「人はいろいろなのだから、そのような困難を抱えることもある」などと児者を受けとめること、あきらめではなく前向きな姿勢。</p>
                                                <p><strong className="font-medium">注4) 助言が必要とは「物理的支援、心理的支援、特性理解、多様な観点が十分ではなく、周囲の人たちが支援的でない、または過剰的な環境となっている場合」にチェックします。</strong>助言が不要とは「物理的支援、心理的支援、特性理解、多様な観点が十分であり、周囲の人たちが支援的な環境となっている場合」にチェックします。</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold">2. 第3章・第4章の補足情報に記入する内容の解説</h4>
                                            <div className="pl-4 mt-2 space-y-2">
                                                <p><strong className="font-medium">①物理的支援:</strong>周囲の人たちが実施している物理的支援の具体的内容や実施状況、それが支援的環境となっている程度を記載。未実施の場合は、物理的支援が特に必要な場面と具体的支援内容を記載。</p>
                                                <p><strong className="font-medium">②心理的支援:</strong>周囲の人たちが実施している心理的支援の具体的内容や実施状況、それが支援的環境となっている程度を記載。未実施の場合は、心理的支援が特に必要な場面と具体的支援内容を記載。</p>
                                                <p><strong className="font-medium">③その他:</strong>物理的支援や心理的支援を充実させていく上で障壁となっている状況があれば記載。</p>
                                                <p><strong className="font-medium">①特性理解:</strong>周囲の人たちの特性理解の具体的内容や程度、それが支援的環境となっている程度を記載。特性理解が不十分な場合は、特に理解が必要な特性とその特性理解が必要な具体的場面を記載。</p>
                                                <p><strong className="font-medium">②多様な観点:</strong>周囲の人たちの多様な観点の具体的現れや程度、その支援的環境の具体的内容を記載。多様な観点が不十分な場合は、それが支援的でなく過剰的環境となっている具体的情況や程度を記載。</p>
                                                <p><strong className="font-medium">③その他:</strong>特性理解や多様な観点を促し支えていく上で障壁となっている状況があれば記載。</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="overflow-auto max-h-[60vh]">
                                <table className="w-full border-collapse text-xs">
                                    <thead className="sticky top-0 bg-white z-10">
                                        <tr className="bg-green-100">
                                            <th className="border p-2 min-w-[80px]">項目番号</th>
                                            <th className="border p-2 min-w-[200px]">項目タイトル</th>
                                            <th className="border p-2 min-w-[150px]">把握状況</th>
                                            <th className="border p-2 min-w-[100px]">チェック</th>
                                            <th className="border p-2 min-w-[250px]">補足情報</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ICF_ENVIRONMENT_DATA.map(chapter => (
                                            <React.Fragment key={chapter.chapter}>
                                                <tr>
                                                    <td colSpan="5" className="bg-green-50 font-bold p-2 border sticky top-12 z-10">{chapter.chapter}</td>
                                                </tr>
                                                {chapter.items.map(item => {
                                                    const itemState = icfEnvEvaluation[item.id] || {};
                                                    return (
                                                        <tr key={item.id}>
                                                            <td className="border p-2">{item.id}</td>
                                                            <td className="border p-2">
                                                                <p>{item.title}</p>
                                                                {item.subTitle && <p className="text-gray-500">{item.subTitle}</p>}
                                                            </td>
                                                            <td className="border p-2">
                                                                {['把握', 'なし', 'あり', '両方', '詳細不明・非該当'].map(option => (
                                                                    <label key={option} className="flex items-center">
                                                                        <input type="radio" name={`${item.id}-status`} value={option} checked={itemState.status === option} onChange={(e) => handleIcfEnvChange(item.id, 'status', e.target.value)} className="mr-1" />
                                                                        {option}
                                                                    </label>
                                                                ))}
                                                            </td>
                                                            <td className="border p-2">
                                                                <select value={itemState.check || ''} onChange={(e) => handleIcfEnvChange(item.id, 'check', e.target.value)} className="w-full p-1 border rounded">
                                                                    <option value=""></option>
                                                                    <option value="影響なし">影響なし</option>
                                                                    <option value="影響のみ">影響のみ</option>
                                                                    <option value="促進のみ">促進のみ</option>
                                                                    <option value="助言は不要">助言は不要</option>
                                                                    <option value="助言が必要">助言が必要</option>
                                                                </select>
                                                            </td>
                                                            <td className="border p-2">
                                                                <textarea value={itemState.notes || ''} onChange={(e) => handleIcfEnvChange(item.id, 'notes', e.target.value)} className="w-full p-1 border rounded" rows="3"></textarea>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
