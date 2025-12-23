import React, { useMemo } from 'react';
import { supportStepTemplates, ENVIRONMENT_MAP } from './constants';

// ==================== ステップ3メインコンポーネント ====================

export const Step3Content = ({ 
    step3SubTab, 
    setStep3SubTab,
    supportPlans, 
    setSupportPlans,
    editingPlanId, 
    setEditingPlanId,
    userConcerns,
    icebergWorksheets,
    navigateToStep4Direct,
    collapsedSections,
    toggleCollapse
}) => {
    const step3Tabs = ['⑨支援計画を作成する行動の選択', '⑩支援計画の作成・編集', '⑪支援の進捗状況'];
    const activeConcerns = userConcerns.filter(c => c.content.trim() !== '');

    const editingPlan = useMemo(() => {
        if (editingPlanId === null) return null;
        return supportPlans.find(p => p.id === editingPlanId);
    }, [editingPlanId, supportPlans]);

    const createNewPlan = (concern) => {
        // まず最新のワークシートデータを取得
        const concernIndex = userConcerns.findIndex(c => c.id === concern.id);
        const worksheet = concernIndex !== -1 ? icebergWorksheets[concernIndex] : null;

        const supportGroups = [];
        const checkedTraits = worksheet ? Object.entries(worksheet.autismPerspectives)
            .filter(([, isChecked]) => isChecked)
            .map(([trait]) => trait) : [];
        
        checkedTraits.forEach(trait => {
            let stepsData;
            let type;

            // 氷山モデルから特性の詳細情報を取得
            const traitDetail = worksheet?.traitDetails?.[trait] || '';
            const environmentChecks = worksheet?.environmentCheckboxes || {};
            const environmentNote = worksheet?.environmentTraitNotes?.[trait] || '';
            
            // 該当する環境要因のチェック状況を取得
            const checkedEnvironments = ENVIRONMENT_MAP[trait] 
                ? ENVIRONMENT_MAP[trait].filter(env => environmentChecks[env])
                : [];

            if (trait === '変化が苦手') {
                type = 'standard';
                stepsData = {
                    shortTerm: ['1）行動のアセスメント', '2）アセスメント結果の分析', '3）ツールの作成または準備', '4）ツールの実践', '5）実践の検証'].map((title, i) => ({
                        id: `step-${Date.now()}-std-st-${trait.replace(/\s/g, '')}-${i}`, title, person: '', startDate: '', endDate: '', progress: 0
                    })),
                    longTerm: ['1）認識のアセスメント', '2）認識アセスメント結果の分析', '3）支援員への支援のやり方の手順書（スケジュールボードやカレンダーなど）', '4）ツールの実践', '5）実践の検証'].map((title, i) => ({
                        id: `step-${Date.now()}-std-lt-${trait.replace(/\s/g, '')}-${i}`, title, person: '', startDate: '', endDate: '', progress: 0
                    }))
                };
            } else if (trait === '特別な空間のとらえ方') {
                type = 'spatial';
                stepsData = supportStepTemplates.spatial.map((title, i) => ({
                    id: `step-${Date.now()}-spa-${trait.replace(/\s/g, '')}-${i}`, title, person: '', startDate: '', endDate: '', progress: 0
                }));
            } else if (trait === 'コミュニケーションが苦手') {
                type = 'communication';
                stepsData = supportStepTemplates.communication.map((title, i) => ({
                    id: `step-${Date.now()}-com-${trait.replace(/\s/g, '')}-${i}`, title, person: '', startDate: '', endDate: '', progress: 0
                }));
            } else if (trait === '想像することが苦手') {
                type = 'imagination';
                stepsData = supportStepTemplates.imagination.map((title, i) => ({
                    id: `step-${Date.now()}-img-${trait.replace(/\s/g, '')}-${i}`, title, person: '', startDate: '', endDate: '', progress: 0
                }));
            } else if (trait === '特別な記憶の仕方') {
                type = 'memory';
                stepsData = supportStepTemplates.memory.map((title, i) => ({
                    id: `step-${Date.now()}-mem-${trait.replace(/\s/g, '')}-${i}`, title, person: '', startDate: '', endDate: '', progress: 0
                }));
            } else if (trait === '人からの刺激が苦手') {
                type = 'stimulus';
                stepsData = supportStepTemplates.stimulus.map((title, i) => ({
                    id: `step-${Date.now()}-stm-${trait.replace(/\s/g, '')}-${i}`, title, person: '', startDate: '', endDate: '', progress: 0
                }));
            } else if (trait === '感覚過敏') {
                type = 'sensory';
                stepsData = supportStepTemplates.sensory.map((title, i) => ({
                    id: `step-${Date.now()}-sen-${trait.replace(/\s/g, '')}-${i}`, title, person: '', startDate: '', endDate: '', progress: 0
                }));
            }

            if (type) {
                supportGroups.push({ 
                    type, 
                    traits: [trait], 
                    steps: stepsData,
                    traitDetail: traitDetail,
                    checkedEnvironments: checkedEnvironments,
                    environmentNote: environmentNote
                });
            }
        });

        // 既存の計画があるかチェック（supportGroups生成後）
        const existingPlan = supportPlans.find(p => p.targetConcernId === concern.id);
        if (existingPlan) {
            // 既存計画のsupportGroupsを最新データで更新
            setSupportPlans(supportPlans.map(p => 
                p.id === existingPlan.id 
                    ? { ...p, supportGroups: supportGroups }
                    : p
            ));
            setEditingPlanId(existingPlan.id);
            setStep3SubTab(1);
            return;
        }

        // 新規計画を作成
        const newPlan = {
            id: `plan-${Date.now()}`,
            targetConcernId: concern.id,
            targetConcernContent: concern.content,
            longTermGoal: '',
            shortTermGoal: '',
            supportGroups: supportGroups,
        };
        setSupportPlans([...supportPlans, newPlan]);
        setEditingPlanId(newPlan.id);
        setStep3SubTab(1);
    };

    const deletePlan = (planId) => {
        if (window.confirm('この支援計画を本当に削除しますか？')) {
            setSupportPlans(supportPlans.filter(p => p.id !== planId));
        }
    };

    const handlePlanChange = (e) => {
        const { name, value } = e.target;
        const updatedPlans = supportPlans.map(p => 
            p.id === editingPlanId ? { ...p, [name]: value } : p
        );
        setSupportPlans(updatedPlans);
    };
    
    const handleStepChange = (groupIndex, term, stepIndex, field, value) => {
        setSupportPlans(prevPlans => prevPlans.map(plan => {
            if (plan.id === editingPlanId) {
                const newSupportGroups = JSON.parse(JSON.stringify(plan.supportGroups));
                if (term) {
                    newSupportGroups[groupIndex].steps[term][stepIndex][field] = value;
                } else {
                    newSupportGroups[groupIndex].steps[stepIndex][field] = value;
                }
                return { ...plan, supportGroups: newSupportGroups };
            }
            return plan;
        }));
    };
    
    const handleProgressChange = (planId, groupIndex, term, stepIndex, newProgress) => {
        setSupportPlans(prevPlans => prevPlans.map(plan => {
            if (plan.id === planId) {
                const newSupportGroups = JSON.parse(JSON.stringify(plan.supportGroups));
                if(term){
                    newSupportGroups[groupIndex].steps[term][stepIndex].progress = parseInt(newProgress, 10);
                } else {
                    newSupportGroups[groupIndex].steps[stepIndex].progress = parseInt(newProgress, 10);
                }
                return { ...plan, supportGroups: newSupportGroups };
            }
            return plan;
        }));
    };

    const getStatusColor = (startDate, endDate, progress) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        let startBg = 'bg-transparent';
        let endBg = 'bg-transparent';

        if (start && today >= start) {
            if (progress >= 10) {
                startBg = 'bg-green-100';
            } else {
                startBg = 'bg-red-100';
            }
        }

        if (progress === 100) {
            endBg = 'bg-green-100';
        } else if (end && today > end) {
            endBg = 'bg-red-100';
        }
        
        return { startBg, endBg };
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 border-b-2 border-gray-200 overflow-x-auto">
                {step3Tabs.map((tab, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setStep3SubTab(idx);
                            if (idx !== 1) setEditingPlanId(null);
                        }}
                        className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                            step3SubTab === idx
                                ? 'text-blue-600 border-b-4 border-blue-600'
                                : 'text-gray-600 hover:text-blue-500'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {step3SubTab === 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">⑨支援計画を作成する行動の選択</h3>
                    <p className="text-sm text-gray-600 mb-6">ステップ2で入力した「困った・困っている行動」の中から、支援計画を作成したいものを選択してください。</p>
                    {activeConcerns.length > 0 ? (
                        <div className="space-y-3">
                            {activeConcerns.map((concern, index) => (
                                <div key={concern.id} className="p-4 border rounded-lg flex justify-between items-center">
                                    <p><span className="font-bold mr-2">{index + 1}.</span>{concern.content}</p>
                                    <button
                                        onClick={() => createNewPlan(concern)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow"
                                    >
                                        {supportPlans.some(p => p.targetConcernId === concern.id) ? '計画を編集' : 'この行動の計画を作成'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">計画を作成する行動がありません。ステップ2-⑦で「困った・困っている行動」を入力してください。</p>
                    )}
                </div>
            )}

            {step3SubTab === 1 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">⑩支援計画の作成・編集</h3>
                    {!editingPlan ? (
                        <p className="text-gray-500">⑨から計画を作成する行動を選択するか、⑪から編集したい計画を選択してください。</p>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">対象の行動</label>
                                <p className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg">{editingPlan.targetConcernContent}</p>
                            </div>
                            <div>
                                <label htmlFor="longTermGoal" className="block text-sm font-medium text-gray-700 mb-1">長期目標</label>
                                <textarea id="longTermGoal" name="longTermGoal" value={editingPlan.longTermGoal} onChange={handlePlanChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="例：〇〇さんが安心して毎日を過ごせるようになる"></textarea>
                            </div>
                            <div>
                                <label htmlFor="shortTermGoal" className="block text-sm font-medium text-gray-700 mb-1">短期目標</label>
                                <textarea id="shortTermGoal" name="shortTermGoal" value={editingPlan.shortTermGoal} onChange={handlePlanChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="例：〇〇することの回数を1週間に1回に減らす"></textarea>
                            </div>
                            
                            {/* 具体的な支援 */}
                            <div className="space-y-6">
                                <label className="block text-sm font-medium text-gray-700">具体的な支援</label>
                                {editingPlan.supportGroups.length > 0 ? editingPlan.supportGroups.map((group, groupIndex) => (
                                    <div key={group.type + group.traits.join('-') + groupIndex} className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg space-y-4">
                                        <h4 onClick={() => toggleCollapse(`${editingPlan.id}-group-${groupIndex}`)} className="font-bold text-md text-blue-800 cursor-pointer flex justify-between items-center">
                                            <span>〇 自閉症の視点の「{group.traits.join('」「')}」に対しては</span>
                                            <span>{collapsedSections[`${editingPlan.id}-group-${groupIndex}`] ?? true ? '▼' : '▲'}</span>
                                        </h4>
                                        
                                        {!(collapsedSections[`${editingPlan.id}-group-${groupIndex}`] ?? true) && (group.traitDetail || (group.checkedEnvironments && group.checkedEnvironments.length > 0)) && (
                                            <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
                                                <h5 className="font-semibold text-sm text-gray-700 mb-2">⑧氷山モデルでの入力内容</h5>
                                                {group.traitDetail && (
                                                    <div className="mb-2">
                                                        <p className="text-xs font-medium text-gray-600 mb-1">自閉症の視点（ご利用者の困りごと）:</p>
                                                        <p className="text-sm text-gray-800 bg-blue-50 p-2 rounded">{group.traitDetail}</p>
                                                    </div>
                                                )}
                                                {group.checkedEnvironments && group.checkedEnvironments.length > 0 && (
                                                    <div className="mb-2">
                                                        <p className="text-xs font-medium text-gray-600 mb-1">周囲の状況や環境:</p>
                                                        <ul className="list-disc list-inside text-sm text-gray-800 bg-green-50 p-2 rounded">
                                                            {group.checkedEnvironments.map((env, idx) => (
                                                                <li key={idx}>{env}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {group.environmentNote && (
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-600 mb-1">環境に関する補足:</p>
                                                        <p className="text-sm text-gray-800 bg-green-50 p-2 rounded">{group.environmentNote}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        
                                        {!(collapsedSections[`${editingPlan.id}-group-${groupIndex}`] ?? true) && (
                                            <>
                                                {group.steps.shortTerm ? (
                                                    <>
                                                        <div onClick={() => toggleCollapse(`${editingPlan.id}-${groupIndex}-shortTerm`)} className="mt-4 p-3 bg-blue-100 rounded-lg flex justify-between items-center cursor-pointer">
                                                            <h5 className="font-bold text-blue-900">短期的な対応</h5>
                                                            {group.traits.includes('変化が苦手') && (
                                                                <span className="text-xs text-blue-800">（根本的な予期不安が解消していない場合、この支援の効果が限定される場合があります）</span>
                                                            )}
                                                        </div>
                                                        {!(collapsedSections[`${editingPlan.id}-${groupIndex}-shortTerm`] ?? true) && group.steps.shortTerm.map((step, stepIndex) => (
                                                            <div key={step.id} className="p-3 border rounded-lg bg-white ml-4">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <label className="text-sm font-medium text-gray-800 block">{step.title}</label>
                                                                    {group.traits.includes('変化が苦手') && (
                                                                        <button
                                                                            onClick={() => navigateToStep4Direct(
                                                                                ['⑫行動のアセスメント', '⑬アセスメント結果の分析', '⑭ツールの作成または準備', '⑮ツールの実践', '⑯実践の検証'][stepIndex],
                                                                                editingPlan.targetConcernContent
                                                                            )}
                                                                            className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                                        >
                                                                            {
                                                                                stepIndex === 0 ? 'アセスメントページへ' :
                                                                                stepIndex === 1 ? 'アセスメント結果の分析ページへ' :
                                                                                stepIndex === 2 ? 'ツールの作成または準備へ' :
                                                                                stepIndex === 3 ? 'ツールの実践ページへ' :
                                                                                '実践の検証ページへ'
                                                                            }
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                    <input type="text" value={step.person} onChange={(e) => handleStepChange(groupIndex, 'shortTerm', stepIndex, 'person', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="担当者" />
                                                                    <div>
                                                                        <label className="text-xs text-gray-500">始める時期</label>
                                                                        <input type="date" value={step.startDate} onChange={(e) => handleStepChange(groupIndex, 'shortTerm', stepIndex, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                                                    </div>
                                                                    <div>
                                                                        <label className="text-xs text-gray-500">完了する時期</label>
                                                                        <input type="date" value={step.endDate} onChange={(e) => handleStepChange(groupIndex, 'shortTerm', stepIndex, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div onClick={() => toggleCollapse(`${editingPlan.id}-${groupIndex}-longTerm`)} className="mt-4 p-3 bg-blue-100 rounded-lg cursor-pointer">
                                                            <h5 className="font-bold text-blue-900">長期的な対応</h5>
                                                        </div>
                                                        {!(collapsedSections[`${editingPlan.id}-${groupIndex}-longTerm`] ?? true) && group.steps.longTerm.map((step, stepIndex) => (
                                                            <div key={step.id} className="p-3 border rounded-lg bg-white ml-4">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <label className="text-sm font-medium text-gray-800 block">{step.title}</label>
                                                                    {group.traits.includes('変化が苦手') && (
                                                                        <button
                                                                            onClick={() => navigateToStep4Direct(
                                                                                ['⑫認識のアセスメント', '⑬認識アセスメント結果の分析', '⑭支援員への支援のやり方の手順書（スケジュールボードやカレンダーなど）', '⑮ツールの実践', '⑯実践の検証'][stepIndex],
                                                                                editingPlan.targetConcernContent
                                                                            )}
                                                                            className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                                        >
                                                                            {
                                                                                stepIndex === 0 ? '認識のアセスメントページへ' :
                                                                                stepIndex === 1 ? '認識アセスメント結果の分析ページへ' :
                                                                                stepIndex === 2 ? '支援員への支援のやり方の手順書（スケジュールボードやカレンダーなど）ページへ' :
                                                                                stepIndex === 3 ? 'ツールの実践ページへ' :
                                                                                '実践の検証ページへ'
                                                                            }
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                                                                    <input type="text" value={step.person} onChange={(e) => handleStepChange(groupIndex, 'longTerm', stepIndex, 'person', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="担当者" />
                                                                    <div>
                                                                        <label className="text-xs text-gray-500">始める時期</label>
                                                                        <input type="date" value={step.startDate} onChange={(e) => handleStepChange(groupIndex, 'longTerm', stepIndex, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                                                    </div>
                                                                    <div>
                                                                        <label className="text-xs text-gray-500">完了する時期</label>
                                                                        <input type="date" value={step.endDate} onChange={(e) => handleStepChange(groupIndex, 'longTerm', stepIndex, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : (
                                                    group.steps.map((step, stepIndex) => (
                                                        <div key={step.id} className="p-3 border rounded-lg bg-white">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <label className="text-sm font-medium text-gray-800 block">{step.title}</label>
                                                                <button
                                                                    onClick={() => {
                                                                        const pageTitlesMap = {
                                                                            '特別な空間のとらえ方': ['⑫空間の状況のアセスメント', '⑬空間のアセスメント結果の分析', '⑭空間の構造化の案の作成', '⑮構造化の実践', '⑯構造化実践の検証'],
                                                                            'コミュニケーションが苦手': ['⑫コミュニケーションサンプル', '⑬コミュニケーションサンプルの分析', '⑭支援員への支援のやり方の手順書（絵カードなどの作成）', '⑮絵カードなどの実践', '⑯実践の検証'],
                                                                            '想像することが苦手': ['⑫コミック会話を楽しい話題で試行', '⑬支援員への支援のやり方の手順書（説明が必要な場面でコミック会話を試行）', '⑭行動の変化を観察し検証'],
                                                                            '特別な記憶の仕方': ['⑫ご利用者がした場合の生活スキルの手順の確認', '⑬支援員への支援のやり方の手順書（ご利用者の手順に合わせた手順書）', '⑭手順書の実践', '⑮実践の検証'],
                                                                            '人からの刺激が苦手': ['⑫ご利用者との立ち位置の確認', '⑬実践の検証'],
                                                                            '感覚過敏': ['⑫刺激を軽減するツールの捜索', '⑬支援員への支援のやり方の手順書（ツールの試行）', '⑭試行の検証']
                                                                        };
                                                                        const pageTitles = pageTitlesMap[group.traits[0]];
                                                                        navigateToStep4Direct(pageTitles[stepIndex], editingPlan.targetConcernContent)
                                                                    }}
                                                                    className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                                >
                                                                    {step.title.split('）')[1]}ページへ
                                                                </button>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                <input type="text" value={step.person} onChange={(e) => handleStepChange(groupIndex, null, stepIndex, 'person', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="担当者" />
                                                                <div>
                                                                    <label className="text-xs text-gray-500">始める時期</label>
                                                                    <input type="date" value={step.startDate} onChange={(e) => handleStepChange(groupIndex, null, stepIndex, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs text-gray-500">完了する時期</label>
                                                                    <input type="date" value={step.endDate} onChange={(e) => handleStepChange(groupIndex, null, stepIndex, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </>
                                        )}
                                    </div>
                                )) : (
                                    <p className="text-gray-500">この行動の背景となる自閉症の視点が⑧で選択されていません。ステップ2に戻り、分析を行ってください。</p>
                                )}
                            </div>

                            <div className="text-right">
                                <button onClick={() => { setEditingPlanId(null); setStep3SubTab(2); }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">保存して一覧に戻る</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {step3SubTab === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">⑪支援の進捗状況</h3>
                    {supportPlans.length > 0 ? (
                        <div className="space-y-6">
                            {supportPlans.map(plan => {
                                return (
                                    <div key={plan.id} className="p-4 border rounded-lg shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm text-gray-500">対象の行動</p>
                                                <p className="font-bold text-lg">{plan.targetConcernContent}</p>
                                            </div>
                                            <div className="flex gap-2 flex-shrink-0">
                                                <button onClick={() => { setEditingPlanId(plan.id); setStep3SubTab(1); }} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">編集</button>
                                                <button onClick={() => deletePlan(plan.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">削除</button>
                                            </div>
                                        </div>

                                        {plan.supportGroups.map((group, groupIndex) => (
                                            <div key={group.type + groupIndex} className="mt-4 p-3 border-l-4 border-gray-300 bg-gray-50 rounded-r-lg space-y-4">
                                                <h4 className="font-semibold text-gray-700">
                                                    自閉症の視点: {group.traits.join(', ')}
                                                </h4>
                                                {group.steps.shortTerm ? (
                                                    <>
                                                        <div className="mt-3">
                                                            <div className="flex justify-between items-center pl-2">
                                                                <h5 className="font-semibold text-gray-600">短期的な対応</h5>
                                                                {group.traits.includes('変化が苦手') && (
                                                                    <span className="text-xs text-gray-500">（根本的な予期不安が解消していない場合、この支援の効果が限定される場合があります）</span>
                                                                )}
                                                            </div>
                                                            {group.steps.shortTerm.map((step, stepIndex) => {
                                                                const { startBg, endBg } = getStatusColor(step.startDate, step.endDate, step.progress);
                                                                return (
                                                                    <div key={step.id} className="p-3 border rounded bg-white mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div>
                                                                            <p className="font-medium">{step.title}</p>
                                                                            <div className="text-sm text-gray-600 mt-2 space-y-1">
                                                                                <p><strong>担当:</strong> {step.person || '未設定'}</p>
                                                                                <p><strong>開始:</strong> <span className={`p-1 rounded ${startBg}`}>{step.startDate || '未設定'}</span></p>
                                                                                <p><strong>完了:</strong> <span className={`p-1 rounded ${endBg}`}>{step.endDate || '未設定'}</span></p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <label className="text-sm font-medium text-gray-700">どのくらい進んでいるか</label>
                                                                            <div className="flex items-center gap-2 mt-1">
                                                                                <select value={step.progress} onChange={(e) => handleProgressChange(plan.id, groupIndex, 'shortTerm', stepIndex, e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1">
                                                                                    {Array.from({length: 11}, (_, i) => i * 10).map(p => <option key={p} value={p}>{p}</option>)}
                                                                                </select>
                                                                                <span>%</span>
                                                                            </div>
                                                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${step.progress || 0}%` }}></div></div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="mt-3">
                                                            <h5 className="font-semibold text-gray-600 pl-2">長期的な対応</h5>
                                                            {group.steps.longTerm.map((step, stepIndex) => {
                                                                const { startBg, endBg } = getStatusColor(step.startDate, step.endDate, step.progress);
                                                                return (
                                                                    <div key={step.id} className="p-3 border rounded bg-white mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div>
                                                                            <p className="font-medium">{step.title}</p>
                                                                            <div className="text-sm text-gray-600 mt-2 space-y-1">
                                                                                <p><strong>担当:</strong> {step.person || '未設定'}</p>
                                                                                <p><strong>開始:</strong> <span className={`p-1 rounded ${startBg}`}>{step.startDate || '未設定'}</span></p>
                                                                                <p><strong>完了:</strong> <span className={`p-1 rounded ${endBg}`}>{step.endDate || '未設定'}</span></p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <label className="text-sm font-medium text-gray-700">どのくらい進んでいるか</label>
                                                                            <div className="flex items-center gap-2 mt-1">
                                                                                <select value={step.progress} onChange={(e) => handleProgressChange(plan.id, groupIndex, 'longTerm', stepIndex, e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1">
                                                                                    {Array.from({length: 11}, (_, i) => i * 10).map(p => <option key={p} value={p}>{p}</option>)}
                                                                                </select>
                                                                                <span>%</span>
                                                                            </div>
                                                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${step.progress || 0}%` }}></div></div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </>
                                                ) : (
                                                    group.steps.map((step, stepIndex) => {
                                                        const { startBg, endBg } = getStatusColor(step.startDate, step.endDate, step.progress);
                                                        return (
                                                            <div key={step.id} className="p-3 border rounded bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <p className="font-medium">{step.title}</p>
                                                                    <div className="text-sm text-gray-600 mt-2 space-y-1">
                                                                        <p><strong>担当:</strong> {step.person || '未設定'}</p>
                                                                        <p><strong>開始:</strong> <span className={`p-1 rounded ${startBg}`}>{step.startDate || '未設定'}</span></p>
                                                                        <p><strong>完了:</strong> <span className={`p-1 rounded ${endBg}`}>{step.endDate || '未設定'}</span></p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="text-sm font-medium text-gray-700">どのくらい進んでいるか</label>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <select value={step.progress} onChange={(e) => handleProgressChange(plan.id, groupIndex, null, stepIndex, e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1">
                                                                            {Array.from({length: 11}, (_, i) => i * 10).map(p => <option key={p} value={p}>{p}</option>)}
                                                                        </select>
                                                                        <span>%</span>
                                                                    </div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${step.progress || 0}%` }}></div></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )})}
                        </div>
                    ) : (
                        <p className="text-gray-500">まだ支援計画はありません。⑨から計画を作成してください。</p>
                    )}
                </div>
            )}
        </div>
    );
};
