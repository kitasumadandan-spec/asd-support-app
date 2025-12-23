import React, { useState, useEffect } from 'react';
import { Camera, Trash2, Plus, Upload } from './SharedComponents';

// ==================== ストラテジーシート ====================

export const StrategySheet = ({ strategyData, updateStrategyData, actionName }) => {
    const handleChange = (field, value) => {
        updateStrategyData({ ...strategyData, [field]: value });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">ストラテジーシート</h3>
            
            {/* 作成日と困った行動 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">作成日</label>
                    <input 
                        type="date"
                        value={strategyData.createDate || ''}
                        onChange={(e) => handleChange('createDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">困った行動</label>
                    <input 
                        type="text"
                        value={strategyData.behavior || ''}
                        onChange={(e) => handleChange('behavior', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="例: 鉛筆を投げる"
                    />
                </div>
            </div>

            {/* 現在の状況 */}
            <div>
                <h4 className="font-bold text-base mb-3 text-gray-800">現在の状況</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">A: 事前</div>
                            <div className="text-xs text-gray-600">いつ、どこで、誰といるとき</div>
                            <div className="text-xs text-gray-600">どういう時におこるのか</div>
                        </div>
                        <textarea
                            value={strategyData.beforeWhen || ''}
                            onChange={(e) => handleChange('beforeWhen', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[120px] text-sm"
                            placeholder="例: 作業室で、鉛筆を封筒に入れる作業中"
                        />
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">B: 行動</div>
                            <div className="text-xs text-gray-600">本人がどういう行動</div>
                        </div>
                        <textarea
                            value={strategyData.behaviorDetail || ''}
                            onChange={(e) => handleChange('behaviorDetail', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[120px] text-sm"
                            placeholder="例: 鉛筆を投げる"
                        />
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">C: 事後</div>
                            <div className="text-xs text-gray-600">共同生活者・共同従事者の態度</div>
                            <div className="text-xs text-gray-600">本人の態度・感情認知・その他</div>
                        </div>
                        <textarea
                            value={strategyData.afterConsequence || ''}
                            onChange={(e) => handleChange('afterConsequence', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[120px] text-sm"
                            placeholder="例: 支援員が声をかける、作業を中断する"
                        />
                    </div>
                </div>
            </div>

            {/* 今後の工夫 */}
            <div>
                <h4 className="font-bold text-base mb-3 text-gray-800">今後の工夫</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">A: 事前の工夫</div>
                            <div className="text-xs text-gray-600">実にならないでするために</div>
                            <div className="text-xs text-gray-600">困らないようにするために</div>
                        </div>
                        <textarea
                            value={strategyData.beforeSupport || ''}
                            onChange={(e) => handleChange('beforeSupport', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[150px] text-sm"
                            placeholder="例: 作業の量を減らす、サポートカードを準備する"
                        />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">B: 望ましい行動</div>
                            <div className="text-xs text-gray-600">何に出すか</div>
                            <div className="text-xs text-gray-600">何かやりたいことにつながること</div>
                        </div>
                        <textarea
                            value={strategyData.desiredBehavior || ''}
                            onChange={(e) => handleChange('desiredBehavior', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[150px] text-sm"
                            placeholder="例: サポートカードを使って助けを求める"
                        />
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">C: 事後の工夫</div>
                            <div className="text-xs text-gray-600">実天ましい行動には</div>
                            <div className="text-xs text-gray-600">起こってしまった時には</div>
                        </div>
                        <textarea
                            value={strategyData.afterSupport || ''}
                            onChange={(e) => handleChange('afterSupport', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[150px] text-sm"
                            placeholder="例: 適切な行動を賞賛する、一緒に作業する"
                        />
                    </div>
                </div>
            </div>

            {/* それでもまた起こってしまった場合 */}
            <div>
                <h4 className="font-bold text-base mb-3 text-gray-800">それでもまた起こってしまった場合</h4>
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <textarea
                        value={strategyData.stillHappens || ''}
                        onChange={(e) => handleChange('stillHappens', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[100px] text-sm"
                        placeholder="例: 大きく反応せずに、正しい方法を指示する"
                    />
                </div>
            </div>

            {/* 保存ボタン */}
            <div className="flex justify-center pt-4">
                <button
                    onClick={() => {
                        alert('保存しました');
                    }}
                    className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                    保存する
                </button>
            </div>
        </div>
    );
};

// ==================== 検証用ストラテジーシート ====================

export const VerificationStrategySheet = ({ verificationData, updateVerificationData, actionName }) => {
    const handleChange = (field, value) => {
        updateVerificationData({ ...verificationData, [field]: value });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">検証用ストラテジーシート</h3>
            
            {/* 検証日と困った行動 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">検証日</label>
                    <input 
                        type="date"
                        value={verificationData.createDate || ''}
                        onChange={(e) => handleChange('createDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">困った行動</label>
                    <input 
                        type="text"
                        value={verificationData.behavior || ''}
                        onChange={(e) => handleChange('behavior', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="t"
                    />
                </div>
            </div>

            {/* ツールを実践後の状態 */}
            <div>
                <h4 className="font-bold text-base mb-3 text-gray-800">ツールを実践後の状態</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">A: 事前</div>
                            <div className="text-xs text-gray-600">いつ、どこで、誰といるとき</div>
                            <div className="text-xs text-gray-600">どういう時におこるのか</div>
                        </div>
                        <textarea
                            value={verificationData.beforeWhen || ''}
                            onChange={(e) => handleChange('beforeWhen', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[120px] text-sm"
                            placeholder="・作業室&#10;・鉛筆3本ごと封筒に入れる作業中&#10;・支援員はそばにいない"
                        />
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">B: 行動</div>
                            <div className="text-xs text-gray-600">本人がどういう行動</div>
                        </div>
                        <textarea
                            value={verificationData.behaviorDetail || ''}
                            onChange={(e) => handleChange('behaviorDetail', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[120px] text-sm"
                            placeholder="鉛筆を投げる"
                        />
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">C: 事後</div>
                            <div className="text-xs text-gray-600">共同生活者・共同従事者の態度</div>
                            <div className="text-xs text-gray-600">本人の態度・感情認知・その他</div>
                        </div>
                        <textarea
                            value={verificationData.afterConsequence || ''}
                            onChange={(e) => handleChange('afterConsequence', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[120px] text-sm"
                            placeholder="・支援員が『どうした?』と言って近づく&#10;・支援員が『落ち着いて!』と肩を持って制止&#10;・『作業止めて休憩行こう』と作業室の外に誘導"
                        />
                    </div>
                </div>
            </div>

            {/* ツールの効果あり */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={verificationData.toolEffective || false}
                        onChange={(e) => handleChange('toolEffective', e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        ツールの効果あり
                    </span>
                </label>
                <p className="text-xs text-gray-500 mt-2 ml-8">
                    ツールを使うと支援の効果がみられたときにチェックを入れてください
                </p>
            </div>

            {/* 今後の工夫 */}
            <div>
                <h4 className="font-bold text-base mb-3 text-gray-800">今後の工夫</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">A: 事前の工夫</div>
                            <div className="text-xs text-gray-600">実にならないでするために</div>
                            <div className="text-xs text-gray-600">困らないようにするために</div>
                        </div>
                        <textarea
                            value={verificationData.beforeSupport || ''}
                            onChange={(e) => handleChange('beforeSupport', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[150px] text-sm"
                            placeholder="・作業の量を減らす&#10;・『手伝ってください』カードを本人のそばに置く&#10;・支援員が本人の横に立って待機する&#10;・本人が作業するのが止まって10秒たったら、支援員がカードを指さして、手のひらでカードを受け取るポーズをとる"
                        />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">B: 望ましい行動</div>
                            <div className="text-xs text-gray-600">何に出すか</div>
                            <div className="text-xs text-gray-600">何かやりたいことにつながること</div>
                        </div>
                        <textarea
                            value={verificationData.desiredBehavior || ''}
                            onChange={(e) => handleChange('desiredBehavior', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[150px] text-sm"
                            placeholder="『手伝ってください』カードを支援員に渡す"
                        />
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-center mb-2">
                            <div className="font-bold text-sm">C: 事後の工夫</div>
                            <div className="text-xs text-gray-600">実天ましい行動には</div>
                            <div className="text-xs text-gray-600">起こってしまった時には</div>
                        </div>
                        <textarea
                            value={verificationData.afterSupport || ''}
                            onChange={(e) => handleChange('afterSupport', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[150px] text-sm"
                            placeholder="・カードを渡せた行動を賞賛&#10;・支援員が手伝いながら一緒に作業をする&#10;・作業が完了したらハイタッチ&#10;・大好きな緑茶を飲む"
                        />
                    </div>
                </div>
            </div>

            {/* それでもまた起こってしまった場合 */}
            <div>
                <h4 className="font-bold text-base mb-3 text-gray-800">それでもまた起こってしまった場合</h4>
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <textarea
                        value={verificationData.stillHappens || ''}
                        onChange={(e) => handleChange('stillHappens', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white min-h-[100px] text-sm"
                        placeholder="・大きく反応せずに、次の作業を促し、正しい作業方法を指示する"
                    />
                </div>
            </div>

            {/* 保存ボタン */}
            <div className="flex justify-center pt-4">
                <button
                    onClick={() => {
                        // 保存処理は自動的に行われるため、視覚的なフィードバックのみ
                        alert('保存しました');
                    }}
                    className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                    保存する
                </button>
            </div>
        </div>
    );
};

// ==================== ツール作成コンポーネント ====================

export const ToolPhotosComponent = ({ toolData, setToolData }) => {
    const handleImageUpload = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setToolData(toolData.map(item => 
                    item.id === id ? { ...item, image: e.target.result } : item
                ));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDescriptionChange = (id, value) => {
        setToolData(toolData.map(item => 
            item.id === id ? { ...item, description: value } : item
        ));
    };

    const addNewTool = () => {
        const newId = Math.max(...toolData.map(t => t.id), 0) + 1;
        setToolData([...toolData, { id: newId, image: null, description: '' }]);
    };

    const removeTool = (id) => {
        if (toolData.length > 1) {
            setToolData(toolData.filter(item => item.id !== id));
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">ツールの作成</h3>
                <button
                    onClick={addNewTool}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    <Plus size={20} />
                    ツールを追加
                </button>
            </div>

            {toolData.map((tool) => (
                <div key={tool.id} className="bg-white p-4 rounded-lg shadow-sm border-2 border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-700">ツール #{tool.id}</h4>
                        {toolData.length > 1 && (
                            <button
                                onClick={() => removeTool(tool.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 画像アップロード */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                写真
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                {tool.image ? (
                                    <div className="relative">
                                        <img
                                            src={tool.image}
                                            alt={`Tool ${tool.id}`}
                                            className="max-h-48 mx-auto rounded"
                                        />
                                        <button
                                            onClick={() => handleImageUpload(tool.id, { target: { files: [] } })}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <Camera size={48} className="mx-auto text-gray-400 mb-2" />
                                        <span className="text-sm text-gray-500">クリックして写真を追加</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(tool.id, e)}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* コメント */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                コメント・説明
                            </label>
                            <textarea
                                value={tool.description}
                                onChange={(e) => handleDescriptionChange(tool.id, e.target.value)}
                                placeholder="このツールの使い方や目的を記入してください"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[180px]"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ==================== 支援の手順説明コンポーネント ====================

export const SupportProcedureComponent = ({ procedureData, setProcedureData }) => {
    // 初期データがない場合のデフォルト値
    const defaultData = {
        overview: '',
        purpose: '',
        steps: [{ id: 1, image: null, instruction: '', point: '' }],
        cautions: ''
    };
    
    const data = procedureData || defaultData;
    
    const updateData = (field, value) => {
        setProcedureData({ ...data, [field]: value });
    };

    const handleStepImageUpload = (stepId, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newSteps = data.steps.map(step => 
                    step.id === stepId ? { ...step, image: e.target.result } : step
                );
                updateData('steps', newSteps);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStepChange = (stepId, field, value) => {
        const newSteps = data.steps.map(step => 
            step.id === stepId ? { ...step, [field]: value } : step
        );
        updateData('steps', newSteps);
    };

    const addStep = () => {
        const newId = Math.max(...data.steps.map(s => s.id), 0) + 1;
        updateData('steps', [...data.steps, { id: newId, image: null, instruction: '', point: '' }]);
    };

    const removeStep = (stepId) => {
        if (data.steps.length > 1) {
            updateData('steps', data.steps.filter(step => step.id !== stepId));
        }
    };

    const removeStepImage = (stepId) => {
        const newSteps = data.steps.map(step => 
            step.id === stepId ? { ...step, image: null } : step
        );
        updateData('steps', newSteps);
    };

    return (
        <div className="space-y-6">
            {/* タイトル */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">支援の手順</h3>
            </div>

            {/* 支援の概要・目的 */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">概要</span>
                    この支援の目的と概要
                </h4>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">支援の目的</label>
                        <textarea
                            value={data.purpose || ''}
                            onChange={(e) => updateData('purpose', e.target.value)}
                            placeholder="例：ご利用者が次の活動を見通せるようにし、安心して過ごせるようにする"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">支援の概要</label>
                        <textarea
                            value={data.overview || ''}
                            onChange={(e) => updateData('overview', e.target.value)}
                            placeholder="例：スケジュールカードを使って、次の活動を伝える支援を行います"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="2"
                        />
                    </div>
                </div>
            </div>

            {/* 手順ステップ */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">手順</span>
                        支援の進め方
                    </h4>
                    <button
                        onClick={addStep}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        手順を追加
                    </button>
                </div>

                {data.steps.map((step, index) => (
                    <div key={step.id} className="bg-white rounded-lg shadow-sm border-2 border-gray-200 overflow-hidden">
                        {/* ステップヘッダー */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 flex justify-between items-center">
                            <span className="text-white font-bold text-lg">STEP {index + 1}</span>
                            {data.steps.length > 1 && (
                                <button
                                    onClick={() => removeStep(step.id)}
                                    className="text-white hover:text-red-200 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>
                        
                        <div className="p-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* 左側：写真・イラスト */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                        <Camera size={16} />
                                        写真・イラスト
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 min-h-[200px] flex items-center justify-center">
                                        {step.image ? (
                                            <div className="relative w-full">
                                                <img
                                                    src={step.image}
                                                    alt={`Step ${index + 1}`}
                                                    className="max-h-48 mx-auto rounded shadow-md"
                                                />
                                                <button
                                                    onClick={() => removeStepImage(step.id)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-md"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="cursor-pointer flex flex-col items-center">
                                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                                                    <Camera size={32} className="text-gray-400" />
                                                </div>
                                                <span className="text-sm text-gray-500">クリックして写真を追加</span>
                                                <span className="text-xs text-gray-400 mt-1">支援員が見てわかる写真やイラスト</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleStepImageUpload(step.id, e)}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* 右側：説明 */}
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            やること（手順の説明）
                                        </label>
                                        <textarea
                                            value={step.instruction || ''}
                                            onChange={(e) => handleStepChange(step.id, 'instruction', e.target.value)}
                                            placeholder="例：スケジュールカードを見せて「次は○○です」と伝える"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-orange-600 mb-1 flex items-center gap-1">
                                            💡 支援のポイント・注意点
                                        </label>
                                        <textarea
                                            value={step.point || ''}
                                            onChange={(e) => handleStepChange(step.id, 'point', e.target.value)}
                                            placeholder="例：本人の視界に入る位置でカードを見せる。声は落ち着いたトーンで。"
                                            className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-orange-50"
                                            rows="3"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 注意事項・補足 */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">注意</span>
                    支援時の注意事項
                </h4>
                <textarea
                    value={data.cautions || ''}
                    onChange={(e) => updateData('cautions', e.target.value)}
                    placeholder="例：&#10;・本人が興奮しているときは、無理に支援を行わず、落ち着くのを待つ&#10;・カードを渡すときは、本人のペースに合わせる&#10;・うまくいかないときは、無理に続けず記録して報告する"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                    rows="4"
                />
            </div>

            {/* 使い方のヒント */}
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
                <p className="font-medium mb-2">📋 このページの使い方</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>支援員全員が同じ手順で支援できるよう、具体的に記入してください</li>
                    <li>写真やイラストを使うと、より分かりやすくなります</li>
                    <li>新しい支援員にもわかるよう、できるだけ詳しく書いてください</li>
                </ul>
            </div>
        </div>
    );
};

// ==================== ツール実践コンポーネント ====================

export const ToolImplementationComponent = ({ implementationData, setImplementationData }) => {
    const handleImageUpload = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImplementationData(implementationData.map(item => 
                    item.id === id ? { ...item, image: e.target.result } : item
                ));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDescriptionChange = (id, value) => {
        setImplementationData(implementationData.map(item => 
            item.id === id ? { ...item, description: value } : item
        ));
    };

    const addNewImplementation = () => {
        const newId = Math.max(...implementationData.map(t => t.id), 0) + 1;
        setImplementationData([...implementationData, { id: newId, image: null, description: '' }]);
    };

    const removeImplementation = (id) => {
        if (implementationData.length > 1) {
            setImplementationData(implementationData.filter(item => item.id !== id));
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">ツールの実践記録</h3>
                <button
                    onClick={addNewImplementation}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    <Plus size={20} />
                    記録を追加
                </button>
            </div>

            {implementationData.map((record) => (
                <div key={record.id} className="bg-white p-4 rounded-lg shadow-sm border-2 border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-700">実践記録 #{record.id}</h4>
                        {implementationData.length > 1 && (
                            <button
                                onClick={() => removeImplementation(record.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 画像アップロード */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                実践中の写真
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                {record.image ? (
                                    <div className="relative">
                                        <img
                                            src={record.image}
                                            alt={`Implementation ${record.id}`}
                                            className="max-h-48 mx-auto rounded"
                                        />
                                        <button
                                            onClick={() => setImplementationData(implementationData.map(item => 
                                                item.id === record.id ? { ...item, image: null } : item
                                            ))}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <Camera size={48} className="mx-auto text-gray-400 mb-2" />
                                        <span className="text-sm text-gray-500">クリックして写真を追加</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(record.id, e)}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* コメント */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                実践時の状況・気づき
                            </label>
                            <textarea
                                value={record.description}
                                onChange={(e) => handleDescriptionChange(record.id, e.target.value)}
                                placeholder="ツール使用時の様子、本人の反応、効果など"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[180px]"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ==================== 認識アセスメントコンポーネント ====================

export const RecognitionAssessmentComponent = ({ data, setData, actionName }) => {
    // 初期データの設定（16項目）
    const initialAssessmentData = [
        {
            id: 'color_recognition',
            item: '色',
            content: 'カードを使い、「赤はどれ」「これは何色？」の問いに答える。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '色の識別が十分にできている。',
            pointsPlaceholder: '・ボタン操作の説明の際に、色シールを使用できる。・スケジュールボードやカレンダーで、色を使った区別ができる。'
        },
        {
            id: 'size_recognition',
            item: '形の大小',
            content: '○　□　△の大小の図形を使い、「どちらが大きい（小さい）ですか？」の問いに答える。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '物の大きさの比較ができている。',
            pointsPlaceholder: '・比較できるものを使い「大きい方を押してください」などの説明ができる。'
        },
        {
            id: 'matching',
            item: 'マッチング',
            content: '○　□　△の図形を使い、「同じ形の上に重ねて」「○の上に○を置いて」・見本を見せて真似る。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: 'マッチングが十分にできる。',
            pointsPlaceholder: '・片づけなどのマッチングでの説明が有効。・口頭で複数の単語を使った文章は理解が難しいので視覚的な手がかりが必要になる。'
        },
        {
            id: 'time_flow',
            item: '時間の流れ',
            content: '朝食・昼食・おやつのカードを「朝起きてから食べる順番に並べて」と聞い、カードを並べる。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '時間の経過は左から右が分かりやすい。',
            pointsPlaceholder: '・スケジュールボードを使用時や予定を伝える際には左から右に時間が流れるように書くと分かりやすい。'
        },
        {
            id: 'real_object',
            item: '実物・絵・写真',
            content: '実物・絵・写真を3つずつ見せて答えてもらう',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '実物・絵・写真ともすべて答えることができた',
            pointsPlaceholder: 'スケジュールボードでイラストを使うことができる'
        },
        {
            id: 'character_understanding',
            item: '文字',
            content: '紙に書いた「あかはどれ？」等の文章を読んで、色紙や図形の紙を使って行動する。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '平仮名を全て読めるわけではない。',
            pointsPlaceholder: '・文字だけの説明は有効ではない。'
        },
        {
            id: 'number_concept',
            item: '数の概念',
            content: 'もみじや車のイラストの数を数える。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '10までの数字は理解している。',
            pointsPlaceholder: '・お金の管理に向けた学習が有効。'
        },
        {
            id: 'number_size',
            item: '数の大小',
            content: '1〜10の数字のカードを並べて、「どちらが大きい（小さい）？」の問いに答える。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '9までの数字の大小は理解している。',
            pointsPlaceholder: '・お金の管理に向けた学習が有効。'
        },
        {
            id: 'digit_number',
            item: '桁数',
            content: '1桁〜4桁までの数字を見て、数字を答える。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '2桁まで理解している。',
            pointsPlaceholder: '・お金の管理に向けた学習が有効。・買い物時は1000札を使ったあとは、500円玉を使うと理解している。'
        },
        {
            id: 'calculation',
            item: '足し算引き算',
            content: '一桁の足し算と引き算の問題に答える。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '1桁の足し算・引き算は理解している。',
            pointsPlaceholder: '・お金の管理に向けた学習が有効。'
        },
        {
            id: 'calendar_date',
            item: 'カレンダー日にち',
            content: 'カレンダーを見ながら、ある日付を指さし、「これは何日？」の問いに答える。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: 'カレンダーの日付の見方を理解している。',
            pointsPlaceholder: '・カレンダーを使った予定の説明や予告ができる。'
        },
        {
            id: 'calendar_day',
            item: 'カレンダー曜日',
            content: 'カレンダーを見ながら、ある日付を指さし、「これは何曜日？」の問いに答える。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: 'カレンダーの曜日の見方を理解している。',
            pointsPlaceholder: '・カレンダーを使った予定の説明や予告ができる。'
        },
        {
            id: 'days_future',
            item: '何日先',
            content: '今日の日付を伝えて、明日・明後日・明々後日が何日になるかを答える。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '「何日先」の概念が分かりにくい。',
            pointsPlaceholder: '・「それは、二日後です」などの言い方は分かりにくい。カレンダーを見て伝える方がよい。'
        },
        {
            id: 'days_past',
            item: '何日あと',
            content: '今日の日付を伝えて、昨日・一昨日・一昨昨日が何日になるかを答える。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: '「何日前」の概念が分かりにくい。',
            pointsPlaceholder: '・「それは、二日前です」などの言い方は分かりにくい。カレンダーを見て伝える方がよい。'
        },
        {
            id: 'analog_clock',
            item: 'アナログ時計',
            content: 'アナログ時計の絵を見せ、「これは何時ですか？」と聞う。「昼食回答も速かった。の時間はどれですか？」と聞う。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: 'アナログ時計を正しく理解している。',
            pointsPlaceholder: '・アナログ時計を使った予告の支援が有効である。'
        },
        {
            id: 'digital_clock',
            item: 'デジタル時計',
            content: 'デジタル時計の絵を見せ、「これは何時ですか？」と聞う。「昼食回答も速かった。の時間はどれですか？」と聞う。',
            score: 1,
            degree: '',
            points: '',
            degreePlaceholder: 'デジタル時計を正しく理解している。',
            pointsPlaceholder: ''
        }
    ];

    // データが未初期化の場合は初期データを設定
    React.useEffect(() => {
        if (!data || Object.keys(data).length === 0) {
            const initialData = {};
            initialAssessmentData.forEach(item => {
                initialData[item.id] = {
                    score: item.score,
                    degree: item.degree,
                    points: item.points
                };
            });
            setData(initialData);
        }
    }, []);

    const assessmentData = initialAssessmentData.map(item => ({
        ...item,
        score: data[item.id]?.score || item.score,
        degree: data[item.id]?.degree || item.degree,
        points: data[item.id]?.points || item.points
    }));

    const handleScoreChange = (id, score) => {
        setData({
            ...data,
            [id]: {
                ...data[id],
                score: parseInt(score)
            }
        });
    };

    const handleDegreeChange = (id, value) => {
        setData({
            ...data,
            [id]: {
                ...data[id],
                degree: value
            }
        });
    };

    const handlePointsChange = (id, value) => {
        setData({
            ...data,
            [id]: {
                ...data[id],
                points: value
            }
        });
    };

    // レーダーチャート用のデータ準備
    const chartData = assessmentData.map(item => ({
        subject: item.item,
        score: item.score,
        fullMark: 3
    }));

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-gray-800">⑫認識のアセスメント（{actionName || '対象行動'}）</h3>
            </div>

            {/* 評価表 */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-3 font-bold">項目</th>
                            <th className="border border-gray-300 p-3 font-bold">アセスメント内容</th>
                            <th className="border border-gray-300 p-3 font-bold">評価点 (1:難しい, 2:芽生え, 3:できる)</th>
                            <th className="border border-gray-300 p-3 font-bold">認識の程度</th>
                            <th className="border border-gray-300 p-3 font-bold">活かせるポイント・注意すべきポイント</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessmentData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-3 font-semibold bg-gray-50 align-top">
                                    {row.item}
                                </td>
                                <td className="border border-gray-300 p-3 text-xs align-top">
                                    {row.content}
                                </td>
                                <td className="border border-gray-300 p-3 align-top">
                                    <div className="flex justify-center gap-3">
                                        {[1, 2, 3].map(score => (
                                            <label key={score} className="flex items-center gap-1 cursor-pointer">
                                                <input 
                                                    type="radio" 
                                                    name={`score-${row.id}`} 
                                                    value={score} 
                                                    checked={row.score === score} 
                                                    onChange={(e) => handleScoreChange(row.id, e.target.value)}
                                                    className="w-4 h-4 text-blue-500"
                                                />
                                                <span className="text-sm">{score}</span>
                                            </label>
                                        ))}
                                    </div>
                                </td>
                                <td className="border border-gray-300 p-0 align-top">
                                    <textarea
                                        value={row.degree}
                                        onChange={(e) => handleDegreeChange(row.id, e.target.value)}
                                        placeholder={row.degreePlaceholder}
                                        className="w-full h-full px-2 py-2 focus:outline-none text-xs min-h-[60px] placeholder-gray-400 resize-none"
                                        style={{ lineHeight: '1.4', border: 'none', boxShadow: 'none' }}
                                    />
                                </td>
                                <td className="border border-gray-300 p-0 align-top">
                                    <textarea
                                        value={row.points}
                                        onChange={(e) => handlePointsChange(row.id, e.target.value)}
                                        placeholder={row.pointsPlaceholder}
                                        className="w-full h-full px-2 py-2 focus:outline-none text-xs min-h-[60px] placeholder-gray-400 resize-none"
                                        style={{ lineHeight: '1.4', border: 'none', boxShadow: 'none' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// レーダーチャートSVGコンポーネント（16項目対応）
const RadarChartSVG = ({ data }) => {
    const width = 450;
    const height = 350;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = 130; // 小さめに調整
    const levels = 3; // 1, 2, 3の3レベル
    const minValue = 1; // 中心値を1に設定

    // 各軸の角度を計算（上から時計回り）
    const angleStep = (2 * Math.PI) / data.length;
    const startAngle = -Math.PI / 2;

    // 値から半径を計算（1が中心、3が外側）
    const valueToRadius = (value) => {
        const normalizedValue = (value - minValue) / (3 - minValue); // 0～1に正規化
        return normalizedValue * maxRadius;
    };

    // ポリゴンの座標を計算
    const getPoint = (index, value) => {
        const angle = startAngle + angleStep * index;
        const radius = valueToRadius(value);
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    };

    // 背景の円とグリッド線（1, 2, 3のレベル）
    const gridCircles = [1, 2, 3].map((level, i) => {
        const radius = valueToRadius(level);
        return (
            <g key={i}>
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="1.5"
                />
                {/* レベルラベルを右側に表示 */}
                <text
                    x={centerX + radius + 10}
                    y={centerY}
                    className="text-xs fill-gray-500"
                    textAnchor="start"
                    dominantBaseline="middle"
                >
                    {level}
                </text>
            </g>
        );
    });

    // 軸線
    const axisLines = data.map((item, index) => {
        const point = getPoint(index, 3); // 最大値まで線を引く
        return (
            <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={point.x}
                y2={point.y}
                stroke="#d1d5db"
                strokeWidth="1"
            />
        );
    });

    // データポリゴン
    const points = data.map((item, index) => {
        const point = getPoint(index, item.score);
        return `${point.x},${point.y}`;
    }).join(' ');

    // ラベル（項目名）
    const labels = data.map((item, index) => {
        const labelPoint = getPoint(index, 3.7); // ラベルをさらに外側に配置
        const angle = startAngle + angleStep * index;
        
        // ラベルの位置調整
        let textAnchor = 'middle';
        
        // 角度に基づいてテキストの位置を調整
        const normalizedAngle = ((angle + Math.PI * 2) % (Math.PI * 2));
        if (normalizedAngle > Math.PI * 0.1 && normalizedAngle < Math.PI * 0.9) {
            textAnchor = 'start';
        } else if (normalizedAngle > Math.PI * 1.1 && normalizedAngle < Math.PI * 1.9) {
            textAnchor = 'end';
        }
        
        return (
            <text
                key={index}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor={textAnchor}
                className="text-[10px] font-medium fill-gray-700"
                dominantBaseline="middle"
            >
                {item.subject}
            </text>
        );
    });

    return (
        <>
            {gridCircles}
            {axisLines}
            <polygon
                points={points}
                fill="rgba(59, 130, 246, 0.2)"
                stroke="rgb(59, 130, 246)"
                strokeWidth="2"
            />
            {data.map((item, index) => {
                const point = getPoint(index, item.score);
                return (
                    <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="rgb(59, 130, 246)"
                    />
                );
            })}
            {labels}
        </>
    );
};

// ==================== 認識分析コンポーネント ====================

export const RecognitionAnalysisComponent = ({ analysisData, setAnalysisData, assessmentData, actionName }) => {
    // 認識アセスメントのデータから分析を生成（16項目）
    const analysisItems = [
        { id: 'color_recognition', label: '色' },
        { id: 'size_recognition', label: '形の大小' },
        { id: 'matching', label: 'マッチング' },
        { id: 'time_flow', label: '時間の流れ' },
        { id: 'real_object', label: '実物・絵・写真' },
        { id: 'character_understanding', label: '文字' },
        { id: 'number_concept', label: '数の概念' },
        { id: 'number_size', label: '数の大小' },
        { id: 'digit_number', label: '桁数' },
        { id: 'calculation', label: '足し算引き算' },
        { id: 'calendar_date', label: 'カレンダー日にち' },
        { id: 'calendar_day', label: 'カレンダー曜日' },
        { id: 'days_future', label: '何日先' },
        { id: 'days_past', label: '何日あと' },
        { id: 'analog_clock', label: 'アナログ時計' },
        { id: 'digital_clock', label: 'デジタル時計' }
    ];

    // スコアと詳細情報を取得
    const getScoreData = () => {
        return analysisItems.map(item => {
            const itemData = assessmentData?.[item.id] || { score: 1, degree: '', points: '' };
            return {
                ...item,
                score: itemData.score,
                degree: itemData.degree,
                points: itemData.points
            };
        });
    };

    const scoreData = getScoreData();

    // レーダーチャート用のデータ
    const chartData = scoreData.map(item => ({
        subject: item.label,
        score: item.score,
        fullMark: 3
    }));

    // レーダーチャートSVGコンポーネント（16項目対応）
    const RadarChartSVG = ({ data }) => {
        const width = 450;
        const height = 350;
        const centerX = width / 2;
        const centerY = height / 2;
        const maxRadius = 130;
        const minValue = 1;

        const angleStep = (2 * Math.PI) / data.length;
        const startAngle = -Math.PI / 2;

        const valueToRadius = (value) => {
            const normalizedValue = (value - minValue) / (3 - minValue);
            return normalizedValue * maxRadius;
        };

        const getPoint = (index, value) => {
            const angle = startAngle + angleStep * index;
            const radius = valueToRadius(value);
            return {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle)
            };
        };

        const gridCircles = [1, 2, 3].map((level, i) => {
            const radius = valueToRadius(level);
            return (
                <g key={i}>
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="1.5"
                    />
                    <text
                        x={centerX + radius + 10}
                        y={centerY}
                        className="text-xs fill-gray-500"
                        textAnchor="start"
                        dominantBaseline="middle"
                    >
                        {level}
                    </text>
                </g>
            );
        });

        const axisLines = data.map((item, index) => {
            const point = getPoint(index, 3);
            return (
                <line
                    key={index}
                    x1={centerX}
                    y1={centerY}
                    x2={point.x}
                    y2={point.y}
                    stroke="#d1d5db"
                    strokeWidth="1"
                />
            );
        });

        const points = data.map((item, index) => {
            const point = getPoint(index, item.score);
            return `${point.x},${point.y}`;
        }).join(' ');

        const labels = data.map((item, index) => {
            const labelPoint = getPoint(index, 3.7); // ラベルをさらに外側に配置
            const angle = startAngle + angleStep * index;
            
            let textAnchor = 'middle';
            const normalizedAngle = ((angle + Math.PI * 2) % (Math.PI * 2));
            if (normalizedAngle > Math.PI * 0.1 && normalizedAngle < Math.PI * 0.9) {
                textAnchor = 'start';
            } else if (normalizedAngle > Math.PI * 1.1 && normalizedAngle < Math.PI * 1.9) {
                textAnchor = 'end';
            }
            
            return (
                <text
                    key={index}
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor={textAnchor}
                    className="text-[10px] font-medium fill-gray-700"
                    dominantBaseline="middle"
                >
                    {item.subject}
                </text>
            );
        });

        return (
            <>
                {gridCircles}
                {axisLines}
                <polygon
                    points={points}
                    fill="rgba(59, 130, 246, 0.2)"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                />
                {data.map((item, index) => {
                    const point = getPoint(index, item.score);
                    return (
                        <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="rgb(59, 130, 246)"
                        />
                    );
                })}
                {labels}
            </>
        );
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="border-b pb-4">
                <h3 className="text-xl font-bold text-gray-800">⑬認識アセスメント結果の分析（{actionName || '対象行動'}）</h3>
            </div>

            {/* レーダーチャート */}
            <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-bold text-lg text-gray-800 mb-3 text-center">
                    理解度
                </h4>
                <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
                    <svg viewBox="-30 -30 510 410" style={{ width: '100%', height: 'auto' }}>
                        <RadarChartSVG data={chartData} />
                    </svg>
                </div>
            </div>

            {/* 詳細な分析結果 */}
            <div className="border rounded-lg p-6 bg-white">
                <h4 className="font-bold text-lg text-gray-800 mb-4">項目別評価と記録</h4>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 w-32 font-bold">項目</th>
                                <th className="border border-gray-300 p-2 w-20 font-bold">評価点</th>
                                <th className="border border-gray-300 p-2 font-bold">認識の程度</th>
                                <th className="border border-gray-300 p-2 font-bold">活かせるポイント／注意点</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoreData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50 align-top">
                                        {item.label}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center align-top">
                                        <span className={`inline-block px-3 py-1 rounded font-semibold ${
                                            item.score === 3 ? 'bg-green-100 text-green-800' :
                                            item.score === 2 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {item.score}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 p-2 text-xs align-top">
                                        {item.degree || <span className="text-gray-400">記録なし</span>}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-xs align-top">
                                        {item.points || <span className="text-gray-400">記録なし</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 総合評価と支援のポイント */}
            <div className="grid grid-cols-1 gap-4">
                <div className="border rounded-lg p-6 bg-blue-50">
                    <h4 className="font-bold text-lg text-gray-800 mb-4">総合的な支援のポイント</h4>
                    <textarea
                        value={analysisData?.supportPoints || ''}
                        onChange={(e) => setAnalysisData({ ...analysisData, supportPoints: e.target.value })}
                        placeholder="評価結果を総合的に分析し、支援の方向性や重点的に取り組むべきポイントを記入してください"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="6"
                    />
                </div>

                {/* 強みと課題 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 bg-green-50">
                        <h4 className="font-bold text-base text-gray-800 mb-3">✓ 強み・活用できる認識能力</h4>
                        <textarea
                            value={analysisData?.strengths || ''}
                            onChange={(e) => setAnalysisData({ ...analysisData, strengths: e.target.value })}
                            placeholder="評価が高い項目や、支援で積極的に活用できる認識能力を記入"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="5"
                        />
                    </div>
                    <div className="border rounded-lg p-4 bg-yellow-50">
                        <h4 className="font-bold text-base text-gray-800 mb-3">⚠ 課題・支援が必要な領域</h4>
                        <textarea
                            value={analysisData?.challenges || ''}
                            onChange={(e) => setAnalysisData({ ...analysisData, challenges: e.target.value })}
                            placeholder="評価が低い項目や、重点的に支援が必要な認識能力を記入"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="5"
                        />
                    </div>
                </div>

                {/* 具体的な支援方法の提案 */}
                <div className="border rounded-lg p-4 bg-purple-50">
                    <h4 className="font-bold text-base text-gray-800 mb-3">💡 具体的な支援方法の提案</h4>
                    <textarea
                        value={analysisData?.suggestions || ''}
                        onChange={(e) => setAnalysisData({ ...analysisData, suggestions: e.target.value })}
                        placeholder="評価結果に基づいて、具体的にどのような支援ツールや方法を使用するかを記入"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="5"
                    />
                </div>
            </div>
        </div>
    );
};

// ==================== 絵カードなどの実践コンポーネント ====================

export const CardImplementationComponent = ({ implementationData, setImplementationData }) => {
    const handleImageUpload = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImplementationData(implementationData.map(item => 
                    item.id === id ? { ...item, image: e.target.result } : item
                ));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDescriptionChange = (id, value) => {
        setImplementationData(implementationData.map(item => 
            item.id === id ? { ...item, description: value } : item
        ));
    };

    const addNewRecord = () => {
        const newId = Math.max(...implementationData.map(t => t.id), 0) + 1;
        setImplementationData([...implementationData, { id: newId, image: null, description: '' }]);
    };

    const removeRecord = (id) => {
        if (implementationData.length > 1) {
            setImplementationData(implementationData.filter(item => item.id !== id));
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">絵カードなどの実践記録</h3>
                <button
                    onClick={addNewRecord}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
                >
                    <Plus size={20} />
                    記録を追加
                </button>
            </div>

            <div className="space-y-6">
                {implementationData.map((record) => (
                    <div key={record.id} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-gray-700">実践記録 #{record.id}</h4>
                            {implementationData.length > 1 && (
                                <button
                                    onClick={() => removeRecord(record.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 画像アップロード */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    実践中の写真
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-white min-h-[200px] flex items-center justify-center">
                                    {record.image ? (
                                        <div className="relative w-full">
                                            <img
                                                src={record.image}
                                                alt={`実践記録 ${record.id}`}
                                                className="max-h-48 mx-auto rounded"
                                            />
                                            <button
                                                onClick={() => setImplementationData(implementationData.map(item => 
                                                    item.id === record.id ? { ...item, image: null } : item
                                                ))}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer flex flex-col items-center">
                                            <Camera size={48} className="text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-500">クリックして写真を追加</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(record.id, e)}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* 支援内容・気づき */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    実践時の状況・気づき
                                </label>
                                <textarea
                                    value={record.description}
                                    onChange={(e) => handleDescriptionChange(record.id, e.target.value)}
                                    placeholder="ツール使用時の様子、本人の反応、効果など"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[200px] resize-none"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ==================== コミュニケーション実践の検証コンポーネント ====================

export const CommunicationVerificationComponent = ({ verificationData, setVerificationData, actionName }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'edit' | 'view'
    const [selectedArchiveId, setSelectedArchiveId] = useState(null);
    const [currentData, setCurrentData] = useState(null);

    const createDefaultData = () => ({
        id: Date.now(),
        verificationDate: new Date().toISOString().split('T')[0],
        targetBehavior: actionName || '',
        pecsPhase: { before: '', after: '', targetPhase: '' },
        frequency: { beforeSpontaneous: '', afterSpontaneous: '', beforePrompted: '', afterPrompted: '', successRate: '' },
        toolEffectiveness: [{ id: 1, toolName: '', effective: '', notes: '' }],
        independence: { physicalPrompt: '', gesturePrompt: '', verbalPrompt: '', independent: '', notes: '' },
        generalization: { differentPeople: '', differentPlaces: '', differentTimes: '', notes: '' },
        overallEvaluation: '',
        improvements: '',
        nextSteps: ''
    });

    // アーカイブデータの取得（配列形式）
    const archives = Array.isArray(verificationData) ? verificationData : [];

    // 新規作成
    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedArchiveId(null);
        setViewMode('edit');
    };

    // 保存
    const handleSave = () => {
        if (!currentData.verificationDate) {
            alert('検証日を入力してください');
            return;
        }
        
        const existingIndex = archives.findIndex(a => a.id === currentData.id);
        let newArchives;
        
        if (existingIndex >= 0) {
            // 既存の更新
            newArchives = archives.map(a => a.id === currentData.id ? currentData : a);
        } else {
            // 新規追加
            newArchives = [...archives, currentData];
        }
        
        // 日付順にソート（新しい順）
        newArchives.sort((a, b) => new Date(b.verificationDate) - new Date(a.verificationDate));
        
        setVerificationData(newArchives);
        setViewMode('list');
        setCurrentData(null);
    };

    // 削除
    const handleDelete = (id) => {
        if (window.confirm('この検証記録を削除しますか？')) {
            setVerificationData(archives.filter(a => a.id !== id));
            if (selectedArchiveId === id) {
                setViewMode('list');
                setCurrentData(null);
            }
        }
    };

    // 閲覧
    const handleView = (archive) => {
        setCurrentData(archive);
        setSelectedArchiveId(archive.id);
        setViewMode('view');
    };

    // 編集
    const handleEdit = (archive) => {
        setCurrentData({ ...archive });
        setSelectedArchiveId(archive.id);
        setViewMode('edit');
    };

    // 一覧に戻る
    const handleBackToList = () => {
        setViewMode('list');
        setCurrentData(null);
        setSelectedArchiveId(null);
    };

    // データ更新用関数
    const updateData = (field, value) => {
        setCurrentData({ ...currentData, [field]: value });
    };

    const updateNestedData = (category, field, value) => {
        setCurrentData({
            ...currentData,
            [category]: { ...currentData[category], [field]: value }
        });
    };

    const addToolEffectiveness = () => {
        const newId = Math.max(...currentData.toolEffectiveness.map(t => t.id), 0) + 1;
        updateData('toolEffectiveness', [...currentData.toolEffectiveness, { id: newId, toolName: '', effective: '', notes: '' }]);
    };

    const removeToolEffectiveness = (id) => {
        if (currentData.toolEffectiveness.length > 1) {
            updateData('toolEffectiveness', currentData.toolEffectiveness.filter(t => t.id !== id));
        }
    };

    const updateToolEffectiveness = (id, field, value) => {
        updateData('toolEffectiveness', currentData.toolEffectiveness.map(t =>
            t.id === id ? { ...t, [field]: value } : t
        ));
    };

    // PECSフェーズの説明（⑭絵カードなどの作成ページと同じ）
    const pecsPhases = [
        { value: 'phase1', label: 'フェーズ I：カードを渡して伝える(交換の仕方を学ぶ)', description: '絵カードを使って「欲しい物」を支援者に渡して伝える基礎を学びます' },
        { value: 'phase2', label: 'フェーズ II：離れた場所から自分で伝えに行く', description: '支援者から離れた場所にいても、自分から近づいてカードで伝えることを学びます' },
        { value: 'phase3', label: 'フェーズ III：複数のカードから欲しい物を選ぶ', description: 'たくさんの絵カードの中から、今欲しい物のカードを選んで伝えることを学びます' },
        { value: 'phase4', label: 'フェーズ IV：カードを組み合わせて伝える', description: '複数のカードを順番に並べて、より詳しく伝えることを学びます(例:「赤い・りんご・ください」)' }
    ];

    const getPhaseLabel = (value) => {
        const phase = pecsPhases.find(p => p.value === value);
        return phase ? phase.label : '未設定';
    };

    const getEffectivenessLabel = (value) => {
        const labels = {
            'very_effective': 'とても効果あり',
            'effective': '効果あり',
            'slightly_effective': 'やや効果あり',
            'not_effective': '効果なし',
            'needs_modification': '改善が必要'
        };
        return labels[value] || value;
    };

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">コミュニケーション支援の検証</h3>
                        <p className="text-sm text-gray-600 mt-1">TEACCHプログラム・PECSの観点から、コミュニケーション支援の効果を検証します。</p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        新規検証を作成
                    </button>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 mb-4">まだ検証記録がありません</p>
                        <button
                            onClick={handleCreateNew}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            最初の検証を作成する
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500 mb-2">📋 検証記録一覧（{archives.length}件）</p>
                        {archives.map((archive) => (
                            <div
                                key={archive.id}
                                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-lg font-bold text-blue-600">{archive.verificationDate}</span>
                                            {archive.pecsPhase?.after && (
                                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                                                    現在: {getPhaseLabel(archive.pecsPhase.after).split('：')[0]}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            対象: {archive.targetBehavior || '未設定'}
                                        </p>
                                        {archive.overallEvaluation && (
                                            <p className="text-sm text-gray-500 line-clamp-2">
                                                {archive.overallEvaluation.substring(0, 100)}...
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleView(archive)}
                                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                        >
                                            閲覧
                                        </button>
                                        <button
                                            onClick={() => handleEdit(archive)}
                                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                        >
                                            編集
                                        </button>
                                        <button
                                            onClick={() => handleDelete(archive.id)}
                                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 閲覧モード
    if (viewMode === 'view' && currentData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={handleBackToList}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                        ← 一覧に戻る
                    </button>
                    <button
                        onClick={() => handleEdit(currentData)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        編集する
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="text-xl font-bold text-gray-800">検証記録の詳細</h3>
                        <p className="text-lg text-blue-600 font-medium mt-2">{currentData.verificationDate}</p>
                        <p className="text-gray-600">対象: {currentData.targetBehavior}</p>
                    </div>

                    {/* PECSフェーズ */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-bold text-blue-800 mb-3">絵カードコミュニケーションの段階評価</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">支援開始前:</span>
                                <p className="font-medium">{getPhaseLabel(currentData.pecsPhase?.before)}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">現在:</span>
                                <p className="font-medium">{getPhaseLabel(currentData.pecsPhase?.after)}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">目標:</span>
                                <p className="font-medium">{getPhaseLabel(currentData.pecsPhase?.targetPhase)}</p>
                            </div>
                        </div>
                    </div>

                    {/* コミュニケーション頻度 */}
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-3">コミュニケーション頻度の変化</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500">自発的（支援前→後）:</span>
                                <p className="font-medium">{currentData.frequency?.beforeSpontaneous || '-'} → {currentData.frequency?.afterSpontaneous || '-'}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">促されて（支援前→後）:</span>
                                <p className="font-medium">{currentData.frequency?.beforePrompted || '-'} → {currentData.frequency?.afterPrompted || '-'}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">成功率:</span>
                                <p className="font-medium">{currentData.frequency?.successRate || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* ツール効果 */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-bold text-purple-800 mb-3">使用ツールの効果</h4>
                        <div className="space-y-2">
                            {currentData.toolEffectiveness?.map((tool, idx) => (
                                <div key={idx} className="bg-white p-2 rounded text-sm">
                                    <span className="font-medium">{tool.toolName || '未設定'}</span>
                                    <span className="mx-2">-</span>
                                    <span className={`${tool.effective?.includes('effective') ? 'text-green-600' : 'text-gray-600'}`}>
                                        {getEffectivenessLabel(tool.effective)}
                                    </span>
                                    {tool.notes && <p className="text-gray-500 mt-1">{tool.notes}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 総合評価 */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-3">総合評価</h4>
                        <p className="whitespace-pre-wrap text-gray-700">{currentData.overallEvaluation || '未入力'}</p>
                        
                        {currentData.improvements && (
                            <div className="mt-4">
                                <h5 className="font-medium text-gray-700">改善が必要な点:</h5>
                                <p className="whitespace-pre-wrap text-gray-600">{currentData.improvements}</p>
                            </div>
                        )}
                        
                        {currentData.nextSteps && (
                            <div className="mt-4">
                                <h5 className="font-medium text-gray-700">次のステップ:</h5>
                                <p className="whitespace-pre-wrap text-gray-600">{currentData.nextSteps}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 編集モード（既存のフォーム）
    if (viewMode === 'edit' && currentData) {
        const data = currentData;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            {/* ヘッダー */}
            <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <button
                        onClick={handleBackToList}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-2"
                    >
                        ← 一覧に戻る
                    </button>
                    <h3 className="text-xl font-bold text-gray-800">
                        {selectedArchiveId ? '検証記録の編集' : '新規検証記録の作成'}
                    </h3>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleBackToList}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        保存する
                    </button>
                </div>
            </div>
            
            <p className="text-sm text-gray-600">TEACCHプログラム・PECSの観点から、コミュニケーション支援の効果を検証します。</p>

            {/* 基本情報 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">検証日 <span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        value={data.verificationDate || ''}
                        onChange={(e) => updateData('verificationDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">対象となる行動・コミュニケーション</label>
                    <input
                        type="text"
                        value={data.targetBehavior || ''}
                        onChange={(e) => updateData('targetBehavior', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="例：要求を伝える、選択を伝える"
                    />
                </div>
            </div>

            {/* PECSフェーズ評価 */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">PECS</span>
                    絵カードコミュニケーションの段階評価
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">支援開始前のフェーズ</label>
                        <select
                            value={data.pecsPhase?.before || ''}
                            onChange={(e) => updateNestedData('pecsPhase', 'before', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">選択してください</option>
                            <option value="0">未実施</option>
                            {pecsPhases.map(phase => (
                                <option key={phase.value} value={phase.value}>{phase.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">現在のフェーズ</label>
                        <select
                            value={data.pecsPhase?.after || ''}
                            onChange={(e) => updateNestedData('pecsPhase', 'after', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">選択してください</option>
                            <option value="0">未実施</option>
                            {pecsPhases.map(phase => (
                                <option key={phase.value} value={phase.value}>{phase.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">目標フェーズ</label>
                        <select
                            value={data.pecsPhase?.targetPhase || ''}
                            onChange={(e) => updateNestedData('pecsPhase', 'targetPhase', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">選択してください</option>
                            {pecsPhases.map(phase => (
                                <option key={phase.value} value={phase.value}>{phase.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* フェーズの説明 */}
                <div className="mt-4 p-3 bg-white rounded border border-blue-100">
                    <p className="text-xs text-gray-600 font-medium mb-2">📚 PECSフェーズの説明</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500">
                        {pecsPhases.map(phase => (
                            <div key={phase.value} className="flex gap-2">
                                <span className="font-medium text-blue-600">{phase.label.split('：')[0]}:</span>
                                <span>{phase.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* コミュニケーション頻度の変化 */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">頻度</span>
                    コミュニケーション頻度の変化
                </h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-green-100">
                                <th className="px-3 py-2 text-left">項目</th>
                                <th className="px-3 py-2 text-center">支援前</th>
                                <th className="px-3 py-2 text-center">支援後</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-green-100">
                                <td className="px-3 py-2 font-medium">自発的なコミュニケーション（1日あたり）</td>
                                <td className="px-3 py-2">
                                    <input
                                        type="text"
                                        value={data.frequency?.beforeSpontaneous || ''}
                                        onChange={(e) => updateNestedData('frequency', 'beforeSpontaneous', e.target.value)}
                                        className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                                        placeholder="例：0〜2回"
                                    />
                                </td>
                                <td className="px-3 py-2">
                                    <input
                                        type="text"
                                        value={data.frequency?.afterSpontaneous || ''}
                                        onChange={(e) => updateNestedData('frequency', 'afterSpontaneous', e.target.value)}
                                        className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                                        placeholder="例：5〜10回"
                                    />
                                </td>
                            </tr>
                            <tr className="border-b border-green-100">
                                <td className="px-3 py-2 font-medium">促されてのコミュニケーション（1日あたり）</td>
                                <td className="px-3 py-2">
                                    <input
                                        type="text"
                                        value={data.frequency?.beforePrompted || ''}
                                        onChange={(e) => updateNestedData('frequency', 'beforePrompted', e.target.value)}
                                        className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                                        placeholder="例：3〜5回"
                                    />
                                </td>
                                <td className="px-3 py-2">
                                    <input
                                        type="text"
                                        value={data.frequency?.afterPrompted || ''}
                                        onChange={(e) => updateNestedData('frequency', 'afterPrompted', e.target.value)}
                                        className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                                        placeholder="例：2〜3回"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">コミュニケーション成功率</label>
                    <input
                        type="text"
                        value={data.frequency?.successRate || ''}
                        onChange={(e) => updateNestedData('frequency', 'successRate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="例：約80％（相手に意図が伝わった割合）"
                    />
                </div>
            </div>

            {/* 使用ツールの効果評価 */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-purple-800 flex items-center gap-2">
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">ツール</span>
                        視覚的支援ツールの効果評価
                    </h4>
                    <button
                        onClick={addToolEffectiveness}
                        className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                    >
                        <Plus size={16} />
                        追加
                    </button>
                </div>
                <div className="space-y-3">
                    {data.toolEffectiveness?.map((tool, index) => (
                        <div key={tool.id} className="bg-white p-3 rounded border border-purple-100 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                            <div className="md:col-span-3">
                                <label className="block text-xs text-gray-500 mb-1">使用したツール</label>
                                <input
                                    type="text"
                                    value={tool.toolName}
                                    onChange={(e) => updateToolEffectiveness(tool.id, 'toolName', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="例：要求カード"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-xs text-gray-500 mb-1">効果</label>
                                <select
                                    value={tool.effective}
                                    onChange={(e) => updateToolEffectiveness(tool.id, 'effective', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                >
                                    <option value="">選択</option>
                                    <option value="very_effective">とても効果あり</option>
                                    <option value="effective">効果あり</option>
                                    <option value="slightly_effective">やや効果あり</option>
                                    <option value="not_effective">効果なし</option>
                                    <option value="needs_modification">改善が必要</option>
                                </select>
                            </div>
                            <div className="md:col-span-5">
                                <label className="block text-xs text-gray-500 mb-1">備考・改善点</label>
                                <input
                                    type="text"
                                    value={tool.notes}
                                    onChange={(e) => updateToolEffectiveness(tool.id, 'notes', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    placeholder="具体的な効果や改善点"
                                />
                            </div>
                            <div className="md:col-span-1 flex items-end">
                                {data.toolEffectiveness.length > 1 && (
                                    <button
                                        onClick={() => removeToolEffectiveness(tool.id)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 自立度評価（プロンプトの必要度） */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                    <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm">自立度</span>
                    プロンプト（援助）の必要度
                </h4>
                <p className="text-xs text-gray-600 mb-3">現在、どの程度の援助が必要かを評価してください。</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-white p-3 rounded border border-orange-100">
                        <label className="block text-sm font-medium text-gray-700 mb-2">身体的プロンプト</label>
                        <select
                            value={data.independence?.physicalPrompt || ''}
                            onChange={(e) => updateNestedData('independence', 'physicalPrompt', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="">選択</option>
                            <option value="always">常に必要</option>
                            <option value="often">しばしば必要</option>
                            <option value="sometimes">時々必要</option>
                            <option value="rarely">ほぼ不要</option>
                            <option value="never">不要</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">手を添えるなど</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-orange-100">
                        <label className="block text-sm font-medium text-gray-700 mb-2">ジェスチャープロンプト</label>
                        <select
                            value={data.independence?.gesturePrompt || ''}
                            onChange={(e) => updateNestedData('independence', 'gesturePrompt', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="">選択</option>
                            <option value="always">常に必要</option>
                            <option value="often">しばしば必要</option>
                            <option value="sometimes">時々必要</option>
                            <option value="rarely">ほぼ不要</option>
                            <option value="never">不要</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">指さし、視線など</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-orange-100">
                        <label className="block text-sm font-medium text-gray-700 mb-2">言語的プロンプト</label>
                        <select
                            value={data.independence?.verbalPrompt || ''}
                            onChange={(e) => updateNestedData('independence', 'verbalPrompt', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="">選択</option>
                            <option value="always">常に必要</option>
                            <option value="often">しばしば必要</option>
                            <option value="sometimes">時々必要</option>
                            <option value="rarely">ほぼ不要</option>
                            <option value="never">不要</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">声かけ、促しなど</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-orange-100">
                        <label className="block text-sm font-medium text-gray-700 mb-2">自立の程度</label>
                        <select
                            value={data.independence?.independent || ''}
                            onChange={(e) => updateNestedData('independence', 'independent', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="">選択</option>
                            <option value="full_support">全面的な援助が必要</option>
                            <option value="partial_support">部分的な援助が必要</option>
                            <option value="minimal_support">最小限の援助で可能</option>
                            <option value="independent">自立して可能</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">自立度に関する備考</label>
                    <textarea
                        value={data.independence?.notes || ''}
                        onChange={(e) => updateNestedData('independence', 'notes', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        rows="2"
                        placeholder="自立度の変化や、今後プロンプトを減らすための方針など"
                    />
                </div>
            </div>

            {/* 般化の状況 */}
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h4 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-sm">般化</span>
                    様々な場面での使用状況
                </h4>
                <p className="text-xs text-gray-600 mb-3">学んだコミュニケーションスキルが、異なる状況でも使えているかを評価します。</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded border border-teal-100">
                        <label className="block text-sm font-medium text-gray-700 mb-2">異なる人との使用</label>
                        <select
                            value={data.generalization?.differentPeople || ''}
                            onChange={(e) => updateNestedData('generalization', 'differentPeople', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="">選択</option>
                            <option value="all">誰とでも使える</option>
                            <option value="most">ほとんどの人と使える</option>
                            <option value="some">特定の人とは使える</option>
                            <option value="few">限られた人のみ</option>
                            <option value="one">1人のみ</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">様々な支援者や家族と</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-teal-100">
                        <label className="block text-sm font-medium text-gray-700 mb-2">異なる場所での使用</label>
                        <select
                            value={data.generalization?.differentPlaces || ''}
                            onChange={(e) => updateNestedData('generalization', 'differentPlaces', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="">選択</option>
                            <option value="all">どこでも使える</option>
                            <option value="most">ほとんどの場所で使える</option>
                            <option value="some">特定の場所では使える</option>
                            <option value="few">限られた場所のみ</option>
                            <option value="one">1か所のみ</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">施設内、家庭、外出先など</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-teal-100">
                        <label className="block text-sm font-medium text-gray-700 mb-2">異なる時間帯での使用</label>
                        <select
                            value={data.generalization?.differentTimes || ''}
                            onChange={(e) => updateNestedData('generalization', 'differentTimes', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="">選択</option>
                            <option value="all">いつでも使える</option>
                            <option value="most">ほとんどの時間帯で使える</option>
                            <option value="some">特定の時間帯は使える</option>
                            <option value="few">限られた時間帯のみ</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">朝・昼・夕方・夜など</p>
                    </div>
                </div>
                <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">般化に関する備考</label>
                    <textarea
                        value={data.generalization?.notes || ''}
                        onChange={(e) => updateNestedData('generalization', 'notes', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        rows="2"
                        placeholder="般化が進んでいる場面、まだ難しい場面など"
                    />
                </div>
            </div>

            {/* 総合評価と今後の方針 */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">まとめ</span>
                    総合評価と今後の方針
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">総合評価</label>
                        <textarea
                            value={data.overallEvaluation || ''}
                            onChange={(e) => updateData('overallEvaluation', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="3"
                            placeholder="支援全体を通しての評価、効果があった点、ご利用者の変化など"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">改善が必要な点</label>
                        <textarea
                            value={data.improvements || ''}
                            onChange={(e) => updateData('improvements', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="3"
                            placeholder="うまくいかなかった点、ツールの改善点、環境調整の必要性など"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">次のステップ</label>
                        <textarea
                            value={data.nextSteps || ''}
                            onChange={(e) => updateData('nextSteps', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="3"
                            placeholder="次の目標、新しく取り組むこと、継続すること、フェーズアップの計画など"
                        />
                    </div>
                </div>
            </div>

            {/* 保存ボタン（フッター） */}
            <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                    onClick={handleBackToList}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                    キャンセル
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
                >
                    保存する
                </button>
            </div>
        </div>
    );
    }

    // フォールバック
    return null;
};

// ==================== コミック会話試行コンポーネント ====================

export const ComicConversationTrialComponent = ({ trialData, setTrialData, actionName }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'edit' | 'view'
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [currentData, setCurrentData] = useState(null);

    const createDefaultData = () => ({
        id: Date.now(),
        // 基本情報
        sessionDate: new Date().toISOString().split('T')[0],
        sessionTime: '',
        duration: '',
        location: '',
        staff: '',
        
        // 話題の選定
        topic: {
            category: '',
            specificTopic: '',
            whyChosen: '',
            relatedInterests: ''
        },
        
        // 環境設定（TEACCHの構造化）
        environment: {
            physicalSetup: '',
            seatingArrangement: '',
            distractionControl: '',
            visualSupports: ''
        },
        
        // 準備物
        materials: [
            { id: 1, item: '', prepared: false, notes: '' }
        ],
        
        // 手順（開始→展開→終了）
        procedure: {
            opening: '',
            development: '',
            closing: '',
            timeAllocation: ''
        },
        
        // 実施記録
        implementation: {
            photos: [],
            observations: '',
            personReaction: '',
            communicationAttempts: '',
            successfulExchanges: ''
        },
        
        // 振り返り
        reflection: {
            whatWorked: '',
            challenges: '',
            personEngagement: '',
            nextSteps: ''
        }
    });

    const archives = Array.isArray(trialData) ? trialData : [];

    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.sessionDate) {
            alert('実施日を入力してください');
            return;
        }
        
        const existingIndex = archives.findIndex(a => a.id === currentData.id);
        let newArchives;
        
        if (existingIndex >= 0) {
            newArchives = archives.map(a => a.id === currentData.id ? currentData : a);
        } else {
            newArchives = [...archives, currentData];
        }
        
        newArchives.sort((a, b) => new Date(b.sessionDate) - new Date(a.sessionDate));
        setTrialData(newArchives);
        setViewMode('list');
        setCurrentData(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('この記録を削除しますか？')) {
            setTrialData(archives.filter(a => a.id !== id));
            if (selectedRecordId === id) {
                setViewMode('list');
                setCurrentData(null);
            }
        }
    };

    const handleView = (record) => {
        setCurrentData(record);
        setSelectedRecordId(record.id);
        setViewMode('view');
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('edit');
    };

    const handleBackToList = () => {
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const updateData = (field, value) => {
        setCurrentData({ ...currentData, [field]: value });
    };

    const updateNestedData = (category, field, value) => {
        setCurrentData({
            ...currentData,
            [category]: { ...currentData[category], [field]: value }
        });
    };

    const addMaterial = () => {
        const newId = Math.max(...currentData.materials.map(m => m.id), 0) + 1;
        updateData('materials', [...currentData.materials, { id: newId, item: '', prepared: false, notes: '' }]);
    };

    const removeMaterial = (id) => {
        if (currentData.materials.length > 1) {
            updateData('materials', currentData.materials.filter(m => m.id !== id));
        }
    };

    const updateMaterial = (id, field, value) => {
        updateData('materials', currentData.materials.map(m =>
            m.id === id ? { ...m, [field]: value } : m
        ));
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPhotos = [...(currentData.implementation.photos || []), {
                    id: Date.now(),
                    data: e.target.result,
                    caption: ''
                }];
                updateNestedData('implementation', 'photos', newPhotos);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = (photoId) => {
        const newPhotos = currentData.implementation.photos.filter(p => p.id !== photoId);
        updateNestedData('implementation', 'photos', newPhotos);
    };

    const updatePhotoCaption = (photoId, caption) => {
        const newPhotos = currentData.implementation.photos.map(p =>
            p.id === photoId ? { ...p, caption } : p
        );
        updateNestedData('implementation', 'photos', newPhotos);
    };

    const topicCategories = [
        { value: 'favorite', label: '好きなもの・こと' },
        { value: 'daily', label: '日常の出来事' },
        { value: 'food', label: '食べ物' },
        { value: 'activity', label: '活動・趣味' },
        { value: 'family', label: '家族・友人' },
        { value: 'media', label: 'テレビ・動画' },
        { value: 'other', label: 'その他' }
    ];

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">コミック会話を楽しい話題で試行</h3>
                        <p className="text-sm text-gray-600 mt-1">TEACCHプログラムの構造化を活用して、コミック会話やイラストでの会話を楽しむセッションを計画・実施します。</p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        新規セッションを作成
                    </button>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 mb-4">まだセッション記録がありません</p>
                        <button
                            onClick={handleCreateNew}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            最初のセッションを作成する
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500 mb-2">📋 セッション記録一覧（{archives.length}件）</p>
                        {archives.map((record) => (
                            <div
                                key={record.id}
                                className="border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:bg-green-50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-lg font-bold text-green-600">{record.sessionDate}</span>
                                            {record.topic?.specificTopic && (
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                                                    話題: {record.topic.specificTopic}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            場所: {record.location || '未設定'} | 担当: {record.staff || '未設定'}
                                        </p>
                                        {record.reflection?.whatWorked && (
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                うまくいった点: {record.reflection.whatWorked.substring(0, 80)}...
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleView(record)}
                                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                        >
                                            閲覧
                                        </button>
                                        <button
                                            onClick={() => handleEdit(record)}
                                            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                                        >
                                            編集
                                        </button>
                                        <button
                                            onClick={() => handleDelete(record.id)}
                                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 閲覧モード
    if (viewMode === 'view' && currentData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={handleBackToList} className="text-green-600 hover:text-green-800 flex items-center gap-1">
                        ← 一覧に戻る
                    </button>
                    <button onClick={() => handleEdit(currentData)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        編集する
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="text-xl font-bold text-gray-800">セッション記録の詳細</h3>
                        <p className="text-lg text-green-600 font-medium mt-2">{currentData.sessionDate} {currentData.sessionTime}</p>
                    </div>

                    {/* 基本情報 */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-3">基本情報</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div><span className="text-gray-500">場所:</span> <span className="font-medium">{currentData.location || '-'}</span></div>
                            <div><span className="text-gray-500">所要時間:</span> <span className="font-medium">{currentData.duration || '-'}</span></div>
                            <div><span className="text-gray-500">担当:</span> <span className="font-medium">{currentData.staff || '-'}</span></div>
                        </div>
                    </div>

                    {/* 話題 */}
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-bold text-yellow-800 mb-3">話題</h4>
                        <p className="font-medium text-lg">{currentData.topic?.specificTopic || '未設定'}</p>
                        <p className="text-sm text-gray-600 mt-2">{currentData.topic?.whyChosen}</p>
                    </div>

                    {/* 振り返り */}
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-3">振り返り</h4>
                        <div className="space-y-2 text-sm">
                            <div><span className="font-medium">うまくいった点:</span> {currentData.reflection?.whatWorked || '-'}</div>
                            <div><span className="font-medium">課題:</span> {currentData.reflection?.challenges || '-'}</div>
                            <div><span className="font-medium">次のステップ:</span> {currentData.reflection?.nextSteps || '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 編集モード
    if (viewMode === 'edit' && currentData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                {/* ヘッダー */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <button onClick={handleBackToList} className="text-green-600 hover:text-green-800 flex items-center gap-1 mb-2">
                            ← 一覧に戻る
                        </button>
                        <h3 className="text-xl font-bold text-gray-800">
                            {selectedRecordId ? 'セッション記録の編集' : '新規セッション記録の作成'}
                        </h3>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleBackToList} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            キャンセル
                        </button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            保存する
                        </button>
                    </div>
                </div>

                {/* 1. 基本情報 */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">1</span>
                        セッション基本情報
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">実施日 <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                value={currentData.sessionDate || ''}
                                onChange={(e) => updateData('sessionDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">開始時刻</label>
                            <input
                                type="time"
                                value={currentData.sessionTime || ''}
                                onChange={(e) => updateData('sessionTime', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">所要時間</label>
                            <input
                                type="text"
                                value={currentData.duration || ''}
                                onChange={(e) => updateData('duration', e.target.value)}
                                placeholder="例: 15分"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">場所</label>
                            <input
                                type="text"
                                value={currentData.location || ''}
                                onChange={(e) => updateData('location', e.target.value)}
                                placeholder="例: 相談室、活動室"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">担当スタッフ</label>
                            <input
                                type="text"
                                value={currentData.staff || ''}
                                onChange={(e) => updateData('staff', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. 話題の選定 */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                        <span className="bg-yellow-600 text-white px-2 py-1 rounded text-sm">2</span>
                        話題の選定（楽しい話題を選ぶ）
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">💡 ご本人が興味を持っている話題を選ぶことで、コミック会話への参加意欲が高まります。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">話題のカテゴリ</label>
                            <select
                                value={currentData.topic?.category || ''}
                                onChange={(e) => updateNestedData('topic', 'category', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="">選択してください</option>
                                {topicCategories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">具体的な話題</label>
                            <input
                                type="text"
                                value={currentData.topic?.specificTopic || ''}
                                onChange={(e) => updateNestedData('topic', 'specificTopic', e.target.value)}
                                placeholder="例: 好きな電車の話、週末の予定"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">この話題を選んだ理由</label>
                            <textarea
                                value={currentData.topic?.whyChosen || ''}
                                onChange={(e) => updateNestedData('topic', 'whyChosen', e.target.value)}
                                placeholder="例: 普段から電車の話をすると笑顔になるため"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                                rows="2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">関連する興味・好きなこと</label>
                            <textarea
                                value={currentData.topic?.relatedInterests || ''}
                                onChange={(e) => updateNestedData('topic', 'relatedInterests', e.target.value)}
                                placeholder="例: 時刻表、駅名、車両の種類など"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. 環境設定（TEACCHの構造化） */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">3</span>
                        環境設定（TEACCHの構造化）
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">💡 構造化された環境により、ご本人が安心して参加できます。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">物理的環境の設定</label>
                            <textarea
                                value={currentData.environment?.physicalSetup || ''}
                                onChange={(e) => updateNestedData('environment', 'physicalSetup', e.target.value)}
                                placeholder="例: 静かな個室、刺激の少ない部屋"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">座席配置</label>
                            <textarea
                                value={currentData.environment?.seatingArrangement || ''}
                                onChange={(e) => updateNestedData('environment', 'seatingArrangement', e.target.value)}
                                placeholder="例: 90度の角度で座る、向かい合わない"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">刺激の統制</label>
                            <textarea
                                value={currentData.environment?.distractionControl || ''}
                                onChange={(e) => updateNestedData('environment', 'distractionControl', e.target.value)}
                                placeholder="例: 窓のカーテンを閉める、不要な物を片付ける"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">視覚的サポート</label>
                            <textarea
                                value={currentData.environment?.visualSupports || ''}
                                onChange={(e) => updateNestedData('environment', 'visualSupports', e.target.value)}
                                placeholder="例: 手順カード、タイマー、終わりの合図"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. 準備物 */}
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-orange-800 flex items-center gap-2">
                            <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm">4</span>
                            準備物チェックリスト
                        </h4>
                        <button
                            onClick={addMaterial}
                            className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
                        >
                            <Plus size={16} />
                            追加
                        </button>
                    </div>
                    <div className="space-y-2">
                        {currentData.materials?.map((material) => (
                            <div key={material.id} className="flex items-center gap-3 bg-white p-2 rounded border border-orange-100">
                                <input
                                    type="checkbox"
                                    checked={material.prepared}
                                    onChange={(e) => updateMaterial(material.id, 'prepared', e.target.checked)}
                                    className="w-5 h-5 text-orange-600 rounded"
                                />
                                <input
                                    type="text"
                                    value={material.item}
                                    onChange={(e) => updateMaterial(material.id, 'item', e.target.value)}
                                    placeholder="準備物"
                                    className="flex-grow px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                                <input
                                    type="text"
                                    value={material.notes}
                                    onChange={(e) => updateMaterial(material.id, 'notes', e.target.value)}
                                    placeholder="備考"
                                    className="w-1/3 px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                                {currentData.materials.length > 1 && (
                                    <button onClick={() => removeMaterial(material.id)} className="text-red-500 hover:text-red-700">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        💡 推奨準備物: 白い紙、カラーペン、棒人間シート、吹き出しカード、感情シンボル
                    </p>
                </div>

                {/* 5. 手順 */}
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <h4 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                        <span className="bg-teal-600 text-white px-2 py-1 rounded text-sm">5</span>
                        セッションの手順
                    </h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="inline-block w-6 h-6 bg-teal-200 text-teal-800 rounded-full text-center text-xs leading-6 mr-2">1</span>
                                開始（導入）
                            </label>
                            <textarea
                                value={currentData.procedure?.opening || ''}
                                onChange={(e) => updateNestedData('procedure', 'opening', e.target.value)}
                                placeholder="例: 挨拶→今日の活動を説明→「電車の絵を描きながらお話しよう」と伝える"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="inline-block w-6 h-6 bg-teal-200 text-teal-800 rounded-full text-center text-xs leading-6 mr-2">2</span>
                                展開（本題）
                            </label>
                            <textarea
                                value={currentData.procedure?.development || ''}
                                onChange={(e) => updateNestedData('procedure', 'development', e.target.value)}
                                placeholder="例: スタッフが棒人間を描く→「何の電車が好き？」と質問→ご本人の返答を吹き出しに書く→絵を追加しながら会話を展開"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="inline-block w-6 h-6 bg-teal-200 text-teal-800 rounded-full text-center text-xs leading-6 mr-2">3</span>
                                終了（まとめ）
                            </label>
                            <textarea
                                value={currentData.procedure?.closing || ''}
                                onChange={(e) => updateNestedData('procedure', 'closing', e.target.value)}
                                placeholder="例: 完成した絵を見せる→「楽しかったね」と伝える→終わりの合図→次回の予告"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">時間配分</label>
                            <input
                                type="text"
                                value={currentData.procedure?.timeAllocation || ''}
                                onChange={(e) => updateNestedData('procedure', 'timeAllocation', e.target.value)}
                                placeholder="例: 導入2分→本題10分→まとめ3分"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 6. 実施記録 */}
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <h4 className="font-bold text-pink-800 mb-3 flex items-center gap-2">
                        <span className="bg-pink-600 text-white px-2 py-1 rounded text-sm">6</span>
                        実施記録
                    </h4>
                    
                    {/* 写真アップロード */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">セッション中の写真・作成した絵</label>
                        <div className="flex flex-wrap gap-3">
                            {currentData.implementation?.photos?.map((photo) => (
                                <div key={photo.id} className="relative">
                                    <img src={photo.data} alt="セッション" className="w-32 h-32 object-cover rounded border" />
                                    <button
                                        onClick={() => removePhoto(photo.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <input
                                        type="text"
                                        value={photo.caption}
                                        onChange={(e) => updatePhotoCaption(photo.id, e.target.value)}
                                        placeholder="説明"
                                        className="w-full text-xs px-1 py-0.5 border rounded mt-1"
                                    />
                                </div>
                            ))}
                            <label className="w-32 h-32 border-2 border-dashed border-pink-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-pink-100">
                                <Camera size={24} className="text-pink-400" />
                                <span className="text-xs text-pink-500 mt-1">写真を追加</span>
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">観察記録</label>
                            <textarea
                                value={currentData.implementation?.observations || ''}
                                onChange={(e) => updateNestedData('implementation', 'observations', e.target.value)}
                                placeholder="セッション中に観察したこと全般"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ご本人の反応</label>
                            <textarea
                                value={currentData.implementation?.personReaction || ''}
                                onChange={(e) => updateNestedData('implementation', 'personReaction', e.target.value)}
                                placeholder="表情、態度、言葉など"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">コミュニケーションの試み</label>
                            <textarea
                                value={currentData.implementation?.communicationAttempts || ''}
                                onChange={(e) => updateNestedData('implementation', 'communicationAttempts', e.target.value)}
                                placeholder="ご本人から発信があった場面など"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">成功したやりとり</label>
                            <textarea
                                value={currentData.implementation?.successfulExchanges || ''}
                                onChange={(e) => updateNestedData('implementation', 'successfulExchanges', e.target.value)}
                                placeholder="うまくいったコミュニケーションの場面"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 7. 振り返り */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">7</span>
                        振り返り・評価
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">うまくいった点</label>
                            <textarea
                                value={currentData.reflection?.whatWorked || ''}
                                onChange={(e) => updateNestedData('reflection', 'whatWorked', e.target.value)}
                                placeholder="効果的だったこと、良い反応があった場面"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">課題・改善点</label>
                            <textarea
                                value={currentData.reflection?.challenges || ''}
                                onChange={(e) => updateNestedData('reflection', 'challenges', e.target.value)}
                                placeholder="難しかった点、改善が必要なこと"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ご本人の参加度・楽しさ</label>
                            <textarea
                                value={currentData.reflection?.personEngagement || ''}
                                onChange={(e) => updateNestedData('reflection', 'personEngagement', e.target.value)}
                                placeholder="どの程度楽しんでいたか、参加していたか"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">次回に向けて</label>
                            <textarea
                                value={currentData.reflection?.nextSteps || ''}
                                onChange={(e) => updateNestedData('reflection', 'nextSteps', e.target.value)}
                                placeholder="次回の改善点、試したいこと"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 保存ボタン */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button onClick={handleBackToList} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        キャンセル
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md">
                        保存する
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

// ==================== 説明が必要な場面でコミック会話を試行コンポーネント ====================

export const ComicConversationExplanationComponent = ({ trialData, setTrialData, actionName }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'edit' | 'view'
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [currentData, setCurrentData] = useState(null);

    const createDefaultData = () => ({
        id: Date.now(),
        // 基本情報
        sessionDate: new Date().toISOString().split('T')[0],
        sessionTime: '',
        duration: '',
        location: '',
        staff: '',
        
        // 対象となる場面・状況
        targetSituation: {
            situation: '',
            currentIssue: '',
            desiredOutcome: ''
        },
        
        // 伝えたい内容の整理
        contentToConvey: {
            category: '',
            mainMessage: '',
            keyPoints: '',
            visualElements: ''
        },
        
        // コミック会話の設計
        comicDesign: {
            characters: '',
            settingDescription: '',
            dialogueFlow: '',
            emotionSymbols: ''
        },
        
        // 環境設定（TEACCHの構造化）
        environment: {
            physicalSetup: '',
            seatingArrangement: '',
            distractionControl: '',
            visualSupports: ''
        },
        
        // 準備物
        materials: [
            { id: 1, item: '', prepared: false, notes: '' }
        ],
        
        // 支援手順（ステップバイステップ）
        steps: [
            { id: 1, order: 1, action: '', staffScript: '', expectedResponse: '', supportTip: '' }
        ],
        
        // 実施記録
        implementation: {
            photos: [],
            observations: '',
            personReaction: '',
            comprehensionLevel: '',
            behaviorChange: ''
        },
        
        // 振り返り
        reflection: {
            whatWorked: '',
            challenges: '',
            understanding: '',
            nextSteps: ''
        }
    });

    const archives = Array.isArray(trialData) ? trialData : [];

    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.sessionDate) {
            alert('実施日を入力してください');
            return;
        }
        
        const existingIndex = archives.findIndex(a => a.id === currentData.id);
        let newArchives;
        
        if (existingIndex >= 0) {
            newArchives = archives.map(a => a.id === currentData.id ? currentData : a);
        } else {
            newArchives = [...archives, currentData];
        }
        
        newArchives.sort((a, b) => new Date(b.sessionDate) - new Date(a.sessionDate));
        setTrialData(newArchives);
        setViewMode('list');
        setCurrentData(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('この記録を削除しますか？')) {
            setTrialData(archives.filter(a => a.id !== id));
            if (selectedRecordId === id) {
                setViewMode('list');
                setCurrentData(null);
            }
        }
    };

    const handleView = (record) => {
        setCurrentData(record);
        setSelectedRecordId(record.id);
        setViewMode('view');
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('edit');
    };

    const handleBackToList = () => {
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const updateData = (field, value) => {
        setCurrentData({ ...currentData, [field]: value });
    };

    const updateNestedData = (category, field, value) => {
        setCurrentData({
            ...currentData,
            [category]: { ...currentData[category], [field]: value }
        });
    };

    const addMaterial = () => {
        const newId = Math.max(...currentData.materials.map(m => m.id), 0) + 1;
        updateData('materials', [...currentData.materials, { id: newId, item: '', prepared: false, notes: '' }]);
    };

    const removeMaterial = (id) => {
        if (currentData.materials.length > 1) {
            updateData('materials', currentData.materials.filter(m => m.id !== id));
        }
    };

    const updateMaterial = (id, field, value) => {
        updateData('materials', currentData.materials.map(m =>
            m.id === id ? { ...m, [field]: value } : m
        ));
    };

    const addStep = () => {
        const newOrder = Math.max(...currentData.steps.map(s => s.order), 0) + 1;
        const newId = Math.max(...currentData.steps.map(s => s.id), 0) + 1;
        updateData('steps', [...currentData.steps, { id: newId, order: newOrder, action: '', staffScript: '', expectedResponse: '', supportTip: '' }]);
    };

    const removeStep = (id) => {
        if (currentData.steps.length > 1) {
            const newSteps = currentData.steps.filter(s => s.id !== id);
            // 順番を振り直す
            newSteps.forEach((step, index) => {
                step.order = index + 1;
            });
            updateData('steps', newSteps);
        }
    };

    const updateStep = (id, field, value) => {
        updateData('steps', currentData.steps.map(s =>
            s.id === id ? { ...s, [field]: value } : s
        ));
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPhotos = [...(currentData.implementation.photos || []), {
                    id: Date.now(),
                    data: e.target.result,
                    caption: ''
                }];
                updateNestedData('implementation', 'photos', newPhotos);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = (photoId) => {
        const newPhotos = currentData.implementation.photos.filter(p => p.id !== photoId);
        updateNestedData('implementation', 'photos', newPhotos);
    };

    const updatePhotoCaption = (photoId, caption) => {
        const newPhotos = currentData.implementation.photos.map(p =>
            p.id === photoId ? { ...p, caption } : p
        );
        updateNestedData('implementation', 'photos', newPhotos);
    };

    const contentCategories = [
        { value: 'social_rule', label: '社会的なルール' },
        { value: 'activity', label: '活動の仕方・手順' },
        { value: 'emotion', label: '感情・気持ちの理解' },
        { value: 'communication', label: 'コミュニケーションの仕方' },
        { value: 'safety', label: '安全に関すること' },
        { value: 'schedule', label: '予定の変更' },
        { value: 'other', label: 'その他' }
    ];

    const getCategoryLabel = (value) => {
        const cat = contentCategories.find(c => c.value === value);
        return cat ? cat.label : value;
    };

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">⑭支援員への支援のやり方の手順書（説明が必要な場面でコミック会話を試行）</h3>
                        <p className="text-sm text-gray-600 mt-1">社会的なルールや活動の仕方をコミック会話で伝えるセッションを計画・実施・記録します。</p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        新規セッションを作成
                    </button>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 mb-4">まだセッション記録がありません</p>
                        <button
                            onClick={handleCreateNew}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            最初のセッションを作成する
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500 mb-2">📋 セッション記録一覧（{archives.length}件）</p>
                        {archives.map((record) => (
                            <div
                                key={record.id}
                                className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-lg font-bold text-purple-600">{record.sessionDate}</span>
                                            {record.contentToConvey?.category && (
                                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                                                    {getCategoryLabel(record.contentToConvey.category)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700 font-medium">
                                            {record.targetSituation?.situation || '場面未設定'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            場所: {record.location || '未設定'} | 担当: {record.staff || '未設定'}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleView(record)}
                                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                        >
                                            閲覧
                                        </button>
                                        <button
                                            onClick={() => handleEdit(record)}
                                            className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                                        >
                                            編集
                                        </button>
                                        <button
                                            onClick={() => handleDelete(record.id)}
                                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 閲覧モード
    if (viewMode === 'view' && currentData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={handleBackToList} className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
                        ← 一覧に戻る
                    </button>
                    <button onClick={() => handleEdit(currentData)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        編集する
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="text-xl font-bold text-gray-800">セッション記録の詳細</h3>
                        <p className="text-lg text-purple-600 font-medium mt-2">{currentData.sessionDate} {currentData.sessionTime}</p>
                    </div>

                    {/* 基本情報 */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-3">基本情報</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div><span className="text-gray-500">場所:</span> <span className="font-medium">{currentData.location || '-'}</span></div>
                            <div><span className="text-gray-500">所要時間:</span> <span className="font-medium">{currentData.duration || '-'}</span></div>
                            <div><span className="text-gray-500">担当:</span> <span className="font-medium">{currentData.staff || '-'}</span></div>
                        </div>
                    </div>

                    {/* 対象となる場面 */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-bold text-blue-800 mb-3">対象となる場面・状況</h4>
                        <p className="font-medium">{currentData.targetSituation?.situation || '-'}</p>
                        <p className="text-sm text-gray-600 mt-2">現状の課題: {currentData.targetSituation?.currentIssue || '-'}</p>
                        <p className="text-sm text-gray-600">目指す姿: {currentData.targetSituation?.desiredOutcome || '-'}</p>
                    </div>

                    {/* 伝えたい内容 */}
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-bold text-yellow-800 mb-3">伝えたい内容</h4>
                        <p className="text-sm text-purple-600">{getCategoryLabel(currentData.contentToConvey?.category)}</p>
                        <p className="font-medium mt-2">{currentData.contentToConvey?.mainMessage || '-'}</p>
                    </div>

                    {/* 支援手順 */}
                    {currentData.steps && currentData.steps.length > 0 && (
                        <div className="bg-teal-50 p-4 rounded-lg">
                            <h4 className="font-bold text-teal-800 mb-3">支援手順</h4>
                            <div className="space-y-3">
                                {currentData.steps.map((step) => (
                                    <div key={step.id} className="bg-white p-3 rounded border border-teal-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-teal-600 text-white px-2 py-1 rounded text-sm font-bold">
                                                手順{step.order}
                                            </span>
                                        </div>
                                        <p className="font-medium">{step.action || '-'}</p>
                                        {step.staffScript && <p className="text-sm text-gray-600 mt-1">声かけ: {step.staffScript}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 振り返り */}
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-bold text-green-800 mb-3">振り返り</h4>
                        <div className="space-y-2 text-sm">
                            <div><span className="font-medium">うまくいった点:</span> {currentData.reflection?.whatWorked || '-'}</div>
                            <div><span className="font-medium">課題:</span> {currentData.reflection?.challenges || '-'}</div>
                            <div><span className="font-medium">理解度:</span> {currentData.reflection?.understanding || '-'}</div>
                            <div><span className="font-medium">次のステップ:</span> {currentData.reflection?.nextSteps || '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 編集モード
    if (viewMode === 'edit' && currentData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                {/* ヘッダー */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <button onClick={handleBackToList} className="text-purple-600 hover:text-purple-800 flex items-center gap-1 mb-2">
                            ← 一覧に戻る
                        </button>
                        <h3 className="text-xl font-bold text-gray-800">
                            {selectedRecordId ? 'セッション記録の編集' : '新規セッション記録の作成'}
                        </h3>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleBackToList} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            キャンセル
                        </button>
                        <button onClick={handleSave} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                            保存する
                        </button>
                    </div>
                </div>

                {/* 1. 基本情報 */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">1</span>
                        セッション基本情報
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">実施日 <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                value={currentData.sessionDate || ''}
                                onChange={(e) => updateData('sessionDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">開始時刻</label>
                            <input
                                type="time"
                                value={currentData.sessionTime || ''}
                                onChange={(e) => updateData('sessionTime', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">所要時間</label>
                            <input
                                type="text"
                                value={currentData.duration || ''}
                                onChange={(e) => updateData('duration', e.target.value)}
                                placeholder="例: 15分"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">場所</label>
                            <input
                                type="text"
                                value={currentData.location || ''}
                                onChange={(e) => updateData('location', e.target.value)}
                                placeholder="例: 相談室、活動室"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">担当スタッフ</label>
                            <input
                                type="text"
                                value={currentData.staff || ''}
                                onChange={(e) => updateData('staff', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. 対象となる場面・状況 */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                        <span className="bg-indigo-600 text-white px-2 py-1 rounded text-sm">2</span>
                        対象となる場面・状況
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">💡 どのような場面で、何を伝えたいかを明確にします。</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">対象となる場面・状況</label>
                            <textarea
                                value={currentData.targetSituation?.situation || ''}
                                onChange={(e) => updateNestedData('targetSituation', 'situation', e.target.value)}
                                placeholder="例: 活動の順番を待つ場面、他の人の物を使いたいとき"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">現状の課題</label>
                            <textarea
                                value={currentData.targetSituation?.currentIssue || ''}
                                onChange={(e) => updateNestedData('targetSituation', 'currentIssue', e.target.value)}
                                placeholder="例: 順番を待てずに割り込んでしまう、急に物を取ってしまう"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">目指す姿（ゴール）</label>
                            <textarea
                                value={currentData.targetSituation?.desiredOutcome || ''}
                                onChange={(e) => updateNestedData('targetSituation', 'desiredOutcome', e.target.value)}
                                placeholder="例: 順番カードを見て待てる、「貸して」と言えるようになる"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. 伝えたい内容の整理 */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                        <span className="bg-yellow-600 text-white px-2 py-1 rounded text-sm">3</span>
                        伝えたい内容の整理
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">💡 コミック会話で伝える内容を整理します。シンプルで具体的な内容にしましょう。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">内容のカテゴリ</label>
                            <select
                                value={currentData.contentToConvey?.category || ''}
                                onChange={(e) => updateNestedData('contentToConvey', 'category', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="">選択してください</option>
                                {contentCategories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">伝えたいメインメッセージ</label>
                            <input
                                type="text"
                                value={currentData.contentToConvey?.mainMessage || ''}
                                onChange={(e) => updateNestedData('contentToConvey', 'mainMessage', e.target.value)}
                                placeholder="例: 順番を待つと、みんなが嬉しい"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">ポイント（具体的な行動）</label>
                            <textarea
                                value={currentData.contentToConvey?.keyPoints || ''}
                                onChange={(e) => updateNestedData('contentToConvey', 'keyPoints', e.target.value)}
                                placeholder="例: ①順番カードを持つ ②前の人が終わるまで待つ ③自分の番が来たら始める"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                                rows="2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">使用する視覚的要素</label>
                            <textarea
                                value={currentData.contentToConvey?.visualElements || ''}
                                onChange={(e) => updateNestedData('contentToConvey', 'visualElements', e.target.value)}
                                placeholder="例: 順番カードの絵、待っている人の表情（笑顔）、時計"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. コミック会話の設計 */}
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <h4 className="font-bold text-pink-800 mb-3 flex items-center gap-2">
                        <span className="bg-pink-600 text-white px-2 py-1 rounded text-sm">4</span>
                        コミック会話の設計
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">💡 コミック会話の内容を事前に設計します。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">登場人物</label>
                            <textarea
                                value={currentData.comicDesign?.characters || ''}
                                onChange={(e) => updateNestedData('comicDesign', 'characters', e.target.value)}
                                placeholder="例: ご本人、他のお友達、先生"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">場面の説明</label>
                            <textarea
                                value={currentData.comicDesign?.settingDescription || ''}
                                onChange={(e) => updateNestedData('comicDesign', 'settingDescription', e.target.value)}
                                placeholder="例: 活動室でブロック遊びをしている場面"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                rows="2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">会話の流れ（吹き出しの内容）</label>
                            <textarea
                                value={currentData.comicDesign?.dialogueFlow || ''}
                                onChange={(e) => updateNestedData('comicDesign', 'dialogueFlow', e.target.value)}
                                placeholder="例: ①「ブロック使いたいな」 ②「待ってね」 ③（待つ様子）④「どうぞ」 ⑤「ありがとう」"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                rows="3"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">使用する感情シンボル</label>
                            <textarea
                                value={currentData.comicDesign?.emotionSymbols || ''}
                                onChange={(e) => updateNestedData('comicDesign', 'emotionSymbols', e.target.value)}
                                placeholder="例: 笑顔（待った後）、ハートマーク（嬉しい気持ち）、星（良くできた）"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 5. 環境設定（TEACCHの構造化） */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">5</span>
                        環境設定（TEACCHの構造化）
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">💡 構造化された環境により、ご本人が集中して理解しやすくなります。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">物理的環境の設定</label>
                            <textarea
                                value={currentData.environment?.physicalSetup || ''}
                                onChange={(e) => updateNestedData('environment', 'physicalSetup', e.target.value)}
                                placeholder="例: 静かな個室、刺激の少ない部屋"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">座席配置</label>
                            <textarea
                                value={currentData.environment?.seatingArrangement || ''}
                                onChange={(e) => updateNestedData('environment', 'seatingArrangement', e.target.value)}
                                placeholder="例: 90度の角度で座る、紙が見やすい位置"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">刺激の統制</label>
                            <textarea
                                value={currentData.environment?.distractionControl || ''}
                                onChange={(e) => updateNestedData('environment', 'distractionControl', e.target.value)}
                                placeholder="例: 窓のカーテンを閉める、不要な物を片付ける"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">視覚的サポート</label>
                            <textarea
                                value={currentData.environment?.visualSupports || ''}
                                onChange={(e) => updateNestedData('environment', 'visualSupports', e.target.value)}
                                placeholder="例: 手順カード、タイマー、終わりの合図"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 6. 準備物チェックリスト */}
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-orange-800 flex items-center gap-2">
                            <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm">6</span>
                            準備物チェックリスト
                        </h4>
                        <button
                            onClick={addMaterial}
                            className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
                        >
                            <Plus size={16} />
                            追加
                        </button>
                    </div>
                    <div className="space-y-2">
                        {currentData.materials?.map((material) => (
                            <div key={material.id} className="flex items-center gap-3 bg-white p-2 rounded border border-orange-100">
                                <input
                                    type="checkbox"
                                    checked={material.prepared}
                                    onChange={(e) => updateMaterial(material.id, 'prepared', e.target.checked)}
                                    className="w-5 h-5 text-orange-600 rounded"
                                />
                                <input
                                    type="text"
                                    value={material.item}
                                    onChange={(e) => updateMaterial(material.id, 'item', e.target.value)}
                                    placeholder="準備物"
                                    className="flex-grow px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                                <input
                                    type="text"
                                    value={material.notes}
                                    onChange={(e) => updateMaterial(material.id, 'notes', e.target.value)}
                                    placeholder="備考"
                                    className="w-1/3 px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                                {currentData.materials.length > 1 && (
                                    <button onClick={() => removeMaterial(material.id)} className="text-red-500 hover:text-red-700">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        💡 推奨準備物: 白い紙、カラーペン、棒人間シート、吹き出しテンプレート、感情シンボルカード
                    </p>
                </div>

                {/* 7. 支援手順（ステップバイステップ） */}
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-teal-800 flex items-center gap-2">
                            <span className="bg-teal-600 text-white px-2 py-1 rounded text-sm">7</span>
                            支援手順（初めての人でも迷わない手順書）
                        </h4>
                        <button
                            onClick={addStep}
                            className="flex items-center gap-1 px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 text-sm"
                        >
                            <Plus size={16} />
                            手順を追加
                        </button>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">💡 初めて支援する人でも迷わないように、具体的な行動と声かけを記載します。</p>
                    <div className="space-y-4">
                        {currentData.steps?.map((step, index) => (
                            <div key={step.id} className="bg-white p-4 rounded-lg border border-teal-200">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="bg-teal-600 text-white px-3 py-1 rounded font-bold">
                                        手順 {step.order}
                                    </span>
                                    {currentData.steps.length > 1 && (
                                        <button onClick={() => removeStep(step.id)} className="text-red-500 hover:text-red-700 text-sm">
                                            削除
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">支援者がやること</label>
                                        <textarea
                                            value={step.action}
                                            onChange={(e) => updateStep(step.id, 'action', e.target.value)}
                                            placeholder="例: コミック会話の紙をご本人の前に置く"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                                            rows="2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">声かけ（スクリプト）</label>
                                        <textarea
                                            value={step.staffScript}
                                            onChange={(e) => updateStep(step.id, 'staffScript', e.target.value)}
                                            placeholder="例: 「〇〇さん、今からお話を見てみよう」"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                                            rows="2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">予想される反応</label>
                                        <textarea
                                            value={step.expectedResponse}
                                            onChange={(e) => updateStep(step.id, 'expectedResponse', e.target.value)}
                                            placeholder="例: 紙を見る、指さしする"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                                            rows="2"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">うまくいかない時の対応ヒント</label>
                                        <textarea
                                            value={step.supportTip}
                                            onChange={(e) => updateStep(step.id, 'supportTip', e.target.value)}
                                            placeholder="例: 興味を示さない場合→好きなキャラクターを描き加える"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                                            rows="2"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. 実施記録 */}
                <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                    <h4 className="font-bold text-rose-800 mb-3 flex items-center gap-2">
                        <span className="bg-rose-600 text-white px-2 py-1 rounded text-sm">8</span>
                        実施記録
                    </h4>
                    
                    {/* 写真アップロード */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">セッション中の写真・作成した絵</label>
                        <div className="flex flex-wrap gap-3">
                            {currentData.implementation?.photos?.map((photo) => (
                                <div key={photo.id} className="relative">
                                    <img src={photo.data} alt="セッション" className="w-32 h-32 object-cover rounded border" />
                                    <button
                                        onClick={() => removePhoto(photo.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <input
                                        type="text"
                                        value={photo.caption}
                                        onChange={(e) => updatePhotoCaption(photo.id, e.target.value)}
                                        placeholder="説明"
                                        className="w-full text-xs px-1 py-0.5 border rounded mt-1"
                                    />
                                </div>
                            ))}
                            <label className="w-32 h-32 border-2 border-dashed border-rose-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-rose-100">
                                <Camera size={24} className="text-rose-400" />
                                <span className="text-xs text-rose-500 mt-1">写真を追加</span>
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">観察記録</label>
                            <textarea
                                value={currentData.implementation?.observations || ''}
                                onChange={(e) => updateNestedData('implementation', 'observations', e.target.value)}
                                placeholder="セッション中に観察したこと全般"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ご本人の反応</label>
                            <textarea
                                value={currentData.implementation?.personReaction || ''}
                                onChange={(e) => updateNestedData('implementation', 'personReaction', e.target.value)}
                                placeholder="表情、態度、言葉など"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">内容の理解度</label>
                            <textarea
                                value={currentData.implementation?.comprehensionLevel || ''}
                                onChange={(e) => updateNestedData('implementation', 'comprehensionLevel', e.target.value)}
                                placeholder="どの程度理解できていたか"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">行動の変化</label>
                            <textarea
                                value={currentData.implementation?.behaviorChange || ''}
                                onChange={(e) => updateNestedData('implementation', 'behaviorChange', e.target.value)}
                                placeholder="セッション後の行動に変化があったか"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 9. 振り返り */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">9</span>
                        振り返り・評価
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">うまくいった点</label>
                            <textarea
                                value={currentData.reflection?.whatWorked || ''}
                                onChange={(e) => updateNestedData('reflection', 'whatWorked', e.target.value)}
                                placeholder="効果的だったこと、良い反応があった場面"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">課題・改善点</label>
                            <textarea
                                value={currentData.reflection?.challenges || ''}
                                onChange={(e) => updateNestedData('reflection', 'challenges', e.target.value)}
                                placeholder="難しかった点、改善が必要なこと"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">理解度の評価</label>
                            <textarea
                                value={currentData.reflection?.understanding || ''}
                                onChange={(e) => updateNestedData('reflection', 'understanding', e.target.value)}
                                placeholder="伝えたい内容がどの程度伝わったか"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">次回に向けて</label>
                            <textarea
                                value={currentData.reflection?.nextSteps || ''}
                                onChange={(e) => updateNestedData('reflection', 'nextSteps', e.target.value)}
                                placeholder="次回の改善点、試したいこと、般化のための計画"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 保存ボタン */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button onClick={handleBackToList} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        キャンセル
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md">
                        保存する
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

// ==================== 行動の変化観察コンポーネント ====================

export const BehaviorChangeObservationComponent = ({ observationData, setObservationData, actionName }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'edit' | 'view'
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [currentData, setCurrentData] = useState(null);

    const createDefaultData = () => ({
        id: Date.now(),
        // 基本情報
        observationDate: new Date().toISOString().split('T')[0],
        observationPeriod: '',
        observer: '',
        targetBehavior: actionName || '',
        
        // 視覚化前の状態
        beforeVisualization: {
            behaviorDescription: '',
            frequency: '',
            independence: '',
            issues: ''
        },
        
        // 視覚化の内容
        visualization: {
            toolType: '',
            toolDescription: '',
            implementationMethod: '',
            photos: []
        },
        
        // 視覚化後の変化
        afterVisualization: {
            behaviorDescription: '',
            frequency: '',
            independence: '',
            improvements: ''
        },
        
        // 具体的な変化の記録
        changeRecords: [
            { id: 1, date: '', situation: '', beforeBehavior: '', afterBehavior: '', notes: '' }
        ],
        
        // 総合評価
        evaluation: {
            overallChange: '',
            effectivePoints: '',
            remainingChallenges: '',
            nextSteps: ''
        }
    });

    const archives = Array.isArray(observationData) ? observationData : [];

    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.observationDate) {
            alert('観察日を入力してください');
            return;
        }
        
        const existingIndex = archives.findIndex(a => a.id === currentData.id);
        let newArchives;
        
        if (existingIndex >= 0) {
            newArchives = archives.map(a => a.id === currentData.id ? currentData : a);
        } else {
            newArchives = [...archives, currentData];
        }
        
        newArchives.sort((a, b) => new Date(b.observationDate) - new Date(a.observationDate));
        setObservationData(newArchives);
        setViewMode('list');
        setCurrentData(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('この記録を削除しますか？')) {
            setObservationData(archives.filter(a => a.id !== id));
            if (selectedRecordId === id) {
                setViewMode('list');
                setCurrentData(null);
            }
        }
    };

    const handleView = (record) => {
        setCurrentData(record);
        setSelectedRecordId(record.id);
        setViewMode('view');
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('edit');
    };

    const handleBackToList = () => {
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const updateData = (field, value) => {
        setCurrentData({ ...currentData, [field]: value });
    };

    const updateNestedData = (category, field, value) => {
        setCurrentData({
            ...currentData,
            [category]: { ...currentData[category], [field]: value }
        });
    };

    const addChangeRecord = () => {
        const newId = Math.max(...currentData.changeRecords.map(r => r.id), 0) + 1;
        updateData('changeRecords', [...currentData.changeRecords, { id: newId, date: '', situation: '', beforeBehavior: '', afterBehavior: '', notes: '' }]);
    };

    const removeChangeRecord = (id) => {
        if (currentData.changeRecords.length > 1) {
            updateData('changeRecords', currentData.changeRecords.filter(r => r.id !== id));
        }
    };

    const updateChangeRecord = (id, field, value) => {
        updateData('changeRecords', currentData.changeRecords.map(r =>
            r.id === id ? { ...r, [field]: value } : r
        ));
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPhotos = [...(currentData.visualization.photos || []), {
                    id: Date.now(),
                    data: e.target.result,
                    caption: ''
                }];
                updateNestedData('visualization', 'photos', newPhotos);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = (photoId) => {
        const newPhotos = currentData.visualization.photos.filter(p => p.id !== photoId);
        updateNestedData('visualization', 'photos', newPhotos);
    };

    const updatePhotoCaption = (photoId, caption) => {
        const newPhotos = currentData.visualization.photos.map(p =>
            p.id === photoId ? { ...p, caption } : p
        );
        updateNestedData('visualization', 'photos', newPhotos);
    };

    const toolTypes = [
        { value: 'schedule', label: 'スケジュール表' },
        { value: 'procedure', label: '手順書' },
        { value: 'checklist', label: 'チェックリスト' },
        { value: 'comic', label: 'コミック会話・ソーシャルストーリー' },
        { value: 'visual_cue', label: '視覚的手がかり' },
        { value: 'timer', label: 'タイマー・時計' },
        { value: 'other', label: 'その他' }
    ];

    const getToolTypeLabel = (value) => {
        const tool = toolTypes.find(t => t.value === value);
        return tool ? tool.label : value;
    };

    const changeOptions = [
        { value: 'significant_improvement', label: '大きく改善した' },
        { value: 'moderate_improvement', label: 'やや改善した' },
        { value: 'no_change', label: '変化なし' },
        { value: 'slight_deterioration', label: 'やや悪化した' },
        { value: 'needs_adjustment', label: '調整が必要' }
    ];

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">行動の様子（視覚化による変化の検証）</h3>
                        <p className="text-sm text-gray-600 mt-1">作業や日課のやり方を視覚化することで、どのような変化があったかを記録・検証します。</p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        新規観察記録を作成
                    </button>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 mb-4">まだ観察記録がありません</p>
                        <button
                            onClick={handleCreateNew}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            最初の観察記録を作成する
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500 mb-2">📋 観察記録一覧（{archives.length}件）</p>
                        {archives.map((record) => (
                            <div
                                key={record.id}
                                className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-lg font-bold text-indigo-600">{record.observationDate}</span>
                                            {record.visualization?.toolType && (
                                                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                                                    {getToolTypeLabel(record.visualization.toolType)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700 font-medium">
                                            対象行動: {record.targetBehavior || '未設定'}
                                        </p>
                                        {record.evaluation?.overallChange && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                総合評価: {record.evaluation.overallChange}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleView(record)}
                                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                        >
                                            閲覧
                                        </button>
                                        <button
                                            onClick={() => handleEdit(record)}
                                            className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                                        >
                                            編集
                                        </button>
                                        <button
                                            onClick={() => handleDelete(record.id)}
                                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 閲覧モード
    if (viewMode === 'view' && currentData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={handleBackToList} className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                        ← 一覧に戻る
                    </button>
                    <button onClick={() => handleEdit(currentData)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        編集する
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="text-xl font-bold text-gray-800">観察記録の詳細</h3>
                        <p className="text-lg text-indigo-600 font-medium mt-2">{currentData.observationDate}</p>
                        <p className="text-sm text-gray-600">対象行動: {currentData.targetBehavior}</p>
                    </div>

                    {/* 視覚化前後の比較 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg">
                            <h4 className="font-bold text-red-800 mb-3">視覚化前の状態</h4>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">行動の様子:</span> {currentData.beforeVisualization?.behaviorDescription || '-'}</div>
                                <div><span className="font-medium">頻度:</span> {currentData.beforeVisualization?.frequency || '-'}</div>
                                <div><span className="font-medium">自立度:</span> {currentData.beforeVisualization?.independence || '-'}</div>
                            </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-bold text-green-800 mb-3">視覚化後の状態</h4>
                            <div className="space-y-2 text-sm">
                                <div><span className="font-medium">行動の様子:</span> {currentData.afterVisualization?.behaviorDescription || '-'}</div>
                                <div><span className="font-medium">頻度:</span> {currentData.afterVisualization?.frequency || '-'}</div>
                                <div><span className="font-medium">自立度:</span> {currentData.afterVisualization?.independence || '-'}</div>
                            </div>
                        </div>
                    </div>

                    {/* 総合評価 */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-bold text-blue-800 mb-3">総合評価</h4>
                        <div className="space-y-2 text-sm">
                            <div><span className="font-medium">全体的な変化:</span> {currentData.evaluation?.overallChange || '-'}</div>
                            <div><span className="font-medium">効果的だった点:</span> {currentData.evaluation?.effectivePoints || '-'}</div>
                            <div><span className="font-medium">残された課題:</span> {currentData.evaluation?.remainingChallenges || '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 編集モード
    if (viewMode === 'edit' && currentData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                {/* ヘッダー */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <button onClick={handleBackToList} className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-2">
                            ← 一覧に戻る
                        </button>
                        <h3 className="text-xl font-bold text-gray-800">
                            {selectedRecordId ? '観察記録の編集' : '新規観察記録の作成'}
                        </h3>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleBackToList} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            キャンセル
                        </button>
                        <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            保存する
                        </button>
                    </div>
                </div>

                {/* 1. 基本情報 */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">1</span>
                        基本情報
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">観察日 <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                value={currentData.observationDate || ''}
                                onChange={(e) => updateData('observationDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">観察期間</label>
                            <input
                                type="text"
                                value={currentData.observationPeriod || ''}
                                onChange={(e) => updateData('observationPeriod', e.target.value)}
                                placeholder="例: 2週間"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">観察者</label>
                            <input
                                type="text"
                                value={currentData.observer || ''}
                                onChange={(e) => updateData('observer', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">対象となる行動</label>
                            <input
                                type="text"
                                value={currentData.targetBehavior || ''}
                                onChange={(e) => updateData('targetBehavior', e.target.value)}
                                placeholder="例: 朝の身支度、作業の準備"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. 視覚化前の状態 */}
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">2</span>
                        視覚化前の状態
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">💡 視覚的支援を導入する前の行動の様子を記録します。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">行動の様子</label>
                            <textarea
                                value={currentData.beforeVisualization?.behaviorDescription || ''}
                                onChange={(e) => updateNestedData('beforeVisualization', 'behaviorDescription', e.target.value)}
                                placeholder="例: 次に何をすればよいかわからず、立ち止まってしまうことが多かった"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">頻度・回数</label>
                            <textarea
                                value={currentData.beforeVisualization?.frequency || ''}
                                onChange={(e) => updateNestedData('beforeVisualization', 'frequency', e.target.value)}
                                placeholder="例: 毎日3〜4回の声かけが必要だった"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">自立度</label>
                            <textarea
                                value={currentData.beforeVisualization?.independence || ''}
                                onChange={(e) => updateNestedData('beforeVisualization', 'independence', e.target.value)}
                                placeholder="例: 毎回スタッフの指示がないと次の行動に移れなかった"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                rows="2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">困っていたこと・課題</label>
                            <textarea
                                value={currentData.beforeVisualization?.issues || ''}
                                onChange={(e) => updateNestedData('beforeVisualization', 'issues', e.target.value)}
                                placeholder="例: 何度説明しても順番を覚えられない、不安になるとパニックになることがあった"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. 視覚化の内容 */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                        <span className="bg-yellow-600 text-white px-2 py-1 rounded text-sm">3</span>
                        視覚化の内容
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">💡 導入した視覚的支援ツールの内容を記録します。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ツールの種類</label>
                            <select
                                value={currentData.visualization?.toolType || ''}
                                onChange={(e) => updateNestedData('visualization', 'toolType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="">選択してください</option>
                                {toolTypes.map(tool => (
                                    <option key={tool.value} value={tool.value}>{tool.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ツールの具体的な内容</label>
                            <input
                                type="text"
                                value={currentData.visualization?.toolDescription || ''}
                                onChange={(e) => updateNestedData('visualization', 'toolDescription', e.target.value)}
                                placeholder="例: 朝の支度の手順書（写真付き5ステップ）"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">導入方法</label>
                            <textarea
                                value={currentData.visualization?.implementationMethod || ''}
                                onChange={(e) => updateNestedData('visualization', 'implementationMethod', e.target.value)}
                                placeholder="例: 洗面所の鏡の横に貼り、毎朝「これを見てね」と声かけ"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                                rows="2"
                            />
                        </div>
                        
                        {/* 写真アップロード */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">ツールの写真</label>
                            <div className="flex flex-wrap gap-3">
                                {currentData.visualization?.photos?.map((photo) => (
                                    <div key={photo.id} className="relative">
                                        <img src={photo.data} alt="ツール" className="w-32 h-32 object-cover rounded border" />
                                        <button
                                            onClick={() => removePhoto(photo.id)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                        <input
                                            type="text"
                                            value={photo.caption}
                                            onChange={(e) => updatePhotoCaption(photo.id, e.target.value)}
                                            placeholder="説明"
                                            className="w-full text-xs px-1 py-0.5 border rounded mt-1"
                                        />
                                    </div>
                                ))}
                                <label className="w-32 h-32 border-2 border-dashed border-yellow-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-yellow-100">
                                    <Camera size={24} className="text-yellow-400" />
                                    <span className="text-xs text-yellow-500 mt-1">写真を追加</span>
                                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. 視覚化後の変化 */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">4</span>
                        視覚化後の変化
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">💡 視覚的支援を導入した後の行動の変化を記録します。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">行動の様子</label>
                            <textarea
                                value={currentData.afterVisualization?.behaviorDescription || ''}
                                onChange={(e) => updateNestedData('afterVisualization', 'behaviorDescription', e.target.value)}
                                placeholder="例: 手順書を見ながら、自分で次の行動に移れるようになった"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">頻度・回数</label>
                            <textarea
                                value={currentData.afterVisualization?.frequency || ''}
                                onChange={(e) => updateNestedData('afterVisualization', 'frequency', e.target.value)}
                                placeholder="例: 声かけは1日1回程度に減った"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">自立度</label>
                            <textarea
                                value={currentData.afterVisualization?.independence || ''}
                                onChange={(e) => updateNestedData('afterVisualization', 'independence', e.target.value)}
                                placeholder="例: 手順書を見れば一人でできるようになった"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">改善した点</label>
                            <textarea
                                value={currentData.afterVisualization?.improvements || ''}
                                onChange={(e) => updateNestedData('afterVisualization', 'improvements', e.target.value)}
                                placeholder="例: 自信を持って取り組めるようになった、パニックがなくなった"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 5. 具体的な変化の記録 */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-purple-800 flex items-center gap-2">
                            <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">5</span>
                            具体的な変化の記録
                        </h4>
                        <button
                            onClick={addChangeRecord}
                            className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                        >
                            <Plus size={16} />
                            記録を追加
                        </button>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">💡 具体的なエピソードを記録することで、変化を可視化できます。</p>
                    <div className="space-y-4">
                        {currentData.changeRecords?.map((record, index) => (
                            <div key={record.id} className="bg-white p-4 rounded-lg border border-purple-200">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="bg-purple-600 text-white px-3 py-1 rounded font-bold text-sm">
                                        エピソード {index + 1}
                                    </span>
                                    {currentData.changeRecords.length > 1 && (
                                        <button onClick={() => removeChangeRecord(record.id)} className="text-red-500 hover:text-red-700 text-sm">
                                            削除
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">日付</label>
                                        <input
                                            type="date"
                                            value={record.date}
                                            onChange={(e) => updateChangeRecord(record.id, 'date', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">場面・状況</label>
                                        <input
                                            type="text"
                                            value={record.situation}
                                            onChange={(e) => updateChangeRecord(record.id, 'situation', e.target.value)}
                                            placeholder="例: 朝の身支度の時間"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">以前の行動</label>
                                        <textarea
                                            value={record.beforeBehavior}
                                            onChange={(e) => updateChangeRecord(record.id, 'beforeBehavior', e.target.value)}
                                            placeholder="例: 何度も「次は何？」と聞いていた"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                            rows="2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">変化後の行動</label>
                                        <textarea
                                            value={record.afterBehavior}
                                            onChange={(e) => updateChangeRecord(record.id, 'afterBehavior', e.target.value)}
                                            placeholder="例: 手順書を指さしながら自分で進めた"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                            rows="2"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">備考・気づき</label>
                                        <textarea
                                            value={record.notes}
                                            onChange={(e) => updateChangeRecord(record.id, 'notes', e.target.value)}
                                            placeholder="例: 笑顔で取り組んでいた、達成感を感じている様子だった"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                                            rows="2"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. 総合評価 */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                        <span className="bg-indigo-600 text-white px-2 py-1 rounded text-sm">6</span>
                        総合評価
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">全体的な変化の評価</label>
                            <select
                                value={currentData.evaluation?.overallChange || ''}
                                onChange={(e) => updateNestedData('evaluation', 'overallChange', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">選択してください</option>
                                {changeOptions.map(option => (
                                    <option key={option.value} value={option.label}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">効果的だった点</label>
                            <textarea
                                value={currentData.evaluation?.effectivePoints || ''}
                                onChange={(e) => updateNestedData('evaluation', 'effectivePoints', e.target.value)}
                                placeholder="例: 写真付きの手順書が分かりやすかった"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">残された課題</label>
                            <textarea
                                value={currentData.evaluation?.remainingChallenges || ''}
                                onChange={(e) => updateNestedData('evaluation', 'remainingChallenges', e.target.value)}
                                placeholder="例: 新しい場面への般化が課題"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                rows="3"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">今後の方針・次のステップ</label>
                            <textarea
                                value={currentData.evaluation?.nextSteps || ''}
                                onChange={(e) => updateNestedData('evaluation', 'nextSteps', e.target.value)}
                                placeholder="例: 他の場面にも同様の手順書を導入する、徐々に手順書なしでできるようにする"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 保存ボタン */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button onClick={handleBackToList} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        キャンセル
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md">
                        保存する
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

// ==================== 生活スキル手順確認コンポーネント ====================

export const LifeSkillProcedureComponent = ({ procedureData, setProcedureData, actionName }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'edit' | 'view'
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [currentData, setCurrentData] = useState(null);

    const createDefaultData = () => ({
        id: Date.now(),
        // 基本情報
        observationDate: new Date().toISOString().split('T')[0],
        observer: '',
        skillName: actionName || '',
        skillCategory: '',
        
        // 観察の概要
        overview: {
            location: '',
            timeOfDay: '',
            duration: '',
            frequency: '',
            context: ''
        },
        
        // 現在の手順（ステップバイステップ）
        currentSteps: [
            { id: 1, order: 1, action: '', method: '', timeRequired: '', independence: '', notes: '' }
        ],
        
        // 観察ポイント
        observationPoints: {
            sequence: '',
            accuracy: '',
            speed: '',
            safety: '',
            materials: ''
        },
        
        // 強みと課題
        assessment: {
            strengths: '',
            challenges: '',
            supportNeeded: '',
            triggers: ''
        },
        
        // 写真・動画メモ
        mediaRecords: {
            photos: [],
            videoNotes: ''
        },
        
        // 考察と次のステップ
        reflection: {
            analysis: '',
            recommendations: '',
            nextSteps: ''
        }
    });

    const archives = Array.isArray(procedureData) ? procedureData : [];

    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.observationDate) {
            alert('観察日を入力してください');
            return;
        }
        
        const existingIndex = archives.findIndex(a => a.id === currentData.id);
        let newArchives;
        
        if (existingIndex >= 0) {
            newArchives = archives.map(a => a.id === currentData.id ? currentData : a);
        } else {
            newArchives = [...archives, currentData];
        }
        
        newArchives.sort((a, b) => new Date(b.observationDate) - new Date(a.observationDate));
        setProcedureData(newArchives);
        setViewMode('list');
        setCurrentData(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('この記録を削除しますか？')) {
            setProcedureData(archives.filter(a => a.id !== id));
            if (selectedRecordId === id) {
                setViewMode('list');
                setCurrentData(null);
            }
        }
    };

    const handleView = (record) => {
        setCurrentData(record);
        setSelectedRecordId(record.id);
        setViewMode('view');
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('edit');
    };

    const handleBackToList = () => {
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const updateData = (field, value) => {
        setCurrentData({ ...currentData, [field]: value });
    };

    const updateNestedData = (category, field, value) => {
        setCurrentData({
            ...currentData,
            [category]: { ...currentData[category], [field]: value }
        });
    };

    const addStep = () => {
        const newOrder = Math.max(...currentData.currentSteps.map(s => s.order), 0) + 1;
        const newId = Math.max(...currentData.currentSteps.map(s => s.id), 0) + 1;
        updateData('currentSteps', [...currentData.currentSteps, { id: newId, order: newOrder, action: '', method: '', timeRequired: '', independence: '', notes: '' }]);
    };

    const removeStep = (id) => {
        if (currentData.currentSteps.length > 1) {
            const newSteps = currentData.currentSteps.filter(s => s.id !== id);
            newSteps.forEach((step, index) => {
                step.order = index + 1;
            });
            updateData('currentSteps', newSteps);
        }
    };

    const updateStep = (id, field, value) => {
        updateData('currentSteps', currentData.currentSteps.map(s =>
            s.id === id ? { ...s, [field]: value } : s
        ));
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPhotos = [...(currentData.mediaRecords.photos || []), {
                    id: Date.now(),
                    data: e.target.result,
                    caption: ''
                }];
                updateNestedData('mediaRecords', 'photos', newPhotos);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = (photoId) => {
        const newPhotos = currentData.mediaRecords.photos.filter(p => p.id !== photoId);
        updateNestedData('mediaRecords', 'photos', newPhotos);
    };

    const updatePhotoCaption = (photoId, caption) => {
        const newPhotos = currentData.mediaRecords.photos.map(p =>
            p.id === photoId ? { ...p, caption } : p
        );
        updateNestedData('mediaRecords', 'photos', newPhotos);
    };

    const skillCategories = [
        { value: 'grooming', label: '身だしなみ（着替え、洗顔、歯磨きなど）' },
        { value: 'eating', label: '食事（準備、食べる、片付け）' },
        { value: 'hygiene', label: '衛生（入浴、トイレ、手洗い）' },
        { value: 'housework', label: '家事（掃除、洗濯、整理整頓）' },
        { value: 'cooking', label: '調理' },
        { value: 'commute', label: '移動・外出' },
        { value: 'work', label: '作業・仕事' },
        { value: 'leisure', label: '余暇活動' },
        { value: 'other', label: 'その他' }
    ];

    const independenceLevels = [
        { value: 'independent', label: '自立（一人でできる）' },
        { value: 'verbal_prompt', label: '声かけが必要' },
        { value: 'gesture_prompt', label: '指さし・ジェスチャーが必要' },
        { value: 'partial_assist', label: '一部手伝いが必要' },
        { value: 'full_assist', label: '全面的な支援が必要' }
    ];

    const getCategoryLabel = (value) => {
        const cat = skillCategories.find(c => c.value === value);
        return cat ? cat.label : value;
    };

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">生活スキルの手順の確認</h3>
                        <p className="text-sm text-gray-600 mt-1">ご利用者がどのような方法で生活スキルを行っているか、その手順を観察・記録します。</p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        新規観察記録を作成
                    </button>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <p className="text-gray-500 mb-4">まだ観察記録がありません</p>
                        <button
                            onClick={handleCreateNew}
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                        >
                            最初の観察記録を作成する
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500 mb-2">📋 観察記録一覧（{archives.length}件）</p>
                        {archives.map((record) => (
                            <div
                                key={record.id}
                                className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:bg-teal-50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-lg font-bold text-teal-600">{record.observationDate}</span>
                                            {record.skillCategory && (
                                                <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded">
                                                    {getCategoryLabel(record.skillCategory)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700 font-medium">
                                            {record.skillName || '生活スキル名未設定'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            手順数: {record.currentSteps?.length || 0}ステップ
                                        </p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleView(record)}
                                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                        >
                                            閲覧
                                        </button>
                                        <button
                                            onClick={() => handleEdit(record)}
                                            className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded hover:bg-teal-200"
                                        >
                                            編集
                                        </button>
                                        <button
                                            onClick={() => handleDelete(record.id)}
                                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 閲覧モード
    if (viewMode === 'view' && currentData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={handleBackToList} className="text-teal-600 hover:text-teal-800 flex items-center gap-1">
                        ← 一覧に戻る
                    </button>
                    <button onClick={() => handleEdit(currentData)} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                        編集する
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="text-xl font-bold text-gray-800">生活スキル手順の詳細</h3>
                        <p className="text-lg text-teal-600 font-medium mt-2">{currentData.skillName}</p>
                        <p className="text-sm text-gray-500">{currentData.observationDate}</p>
                    </div>

                    {/* 現在の手順 */}
                    <div className="bg-teal-50 p-4 rounded-lg">
                        <h4 className="font-bold text-teal-800 mb-3">現在の手順</h4>
                        <div className="space-y-2">
                            {currentData.currentSteps?.map((step) => (
                                <div key={step.id} className="bg-white p-3 rounded border border-teal-200">
                                    <div className="flex items-start gap-3">
                                        <span className="bg-teal-600 text-white px-2 py-1 rounded text-sm font-bold">
                                            {step.order}
                                        </span>
                                        <div className="flex-grow">
                                            <p className="font-medium">{step.action || '-'}</p>
                                            {step.method && <p className="text-sm text-gray-600">方法: {step.method}</p>}
                                            {step.independence && <p className="text-sm text-gray-500">自立度: {step.independence}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 強みと課題 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-bold text-green-800 mb-2">強み</h4>
                            <p className="text-sm">{currentData.assessment?.strengths || '-'}</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="font-bold text-yellow-800 mb-2">課題</h4>
                            <p className="text-sm">{currentData.assessment?.challenges || '-'}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 編集モード
    if (viewMode === 'edit' && currentData) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                {/* ヘッダー */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <button onClick={handleBackToList} className="text-teal-600 hover:text-teal-800 flex items-center gap-1 mb-2">
                            ← 一覧に戻る
                        </button>
                        <h3 className="text-xl font-bold text-gray-800">
                            {selectedRecordId ? '観察記録の編集' : '新規観察記録の作成'}
                        </h3>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleBackToList} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            キャンセル
                        </button>
                        <button onClick={handleSave} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                            保存する
                        </button>
                    </div>
                </div>

                {/* 1. 基本情報 */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">1</span>
                        基本情報
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">観察日 <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                value={currentData.observationDate || ''}
                                onChange={(e) => updateData('observationDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">観察者</label>
                            <input
                                type="text"
                                value={currentData.observer || ''}
                                onChange={(e) => updateData('observer', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">スキルのカテゴリ</label>
                            <select
                                value={currentData.skillCategory || ''}
                                onChange={(e) => updateData('skillCategory', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">選択してください</option>
                                {skillCategories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">生活スキル名</label>
                            <input
                                type="text"
                                value={currentData.skillName || ''}
                                onChange={(e) => updateData('skillName', e.target.value)}
                                placeholder="例: 朝の歯磨き、着替え、食器洗い"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. 観察の概要 */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">2</span>
                        観察の概要
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">場所</label>
                            <input
                                type="text"
                                value={currentData.overview?.location || ''}
                                onChange={(e) => updateNestedData('overview', 'location', e.target.value)}
                                placeholder="例: 洗面所、居室"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">時間帯</label>
                            <input
                                type="text"
                                value={currentData.overview?.timeOfDay || ''}
                                onChange={(e) => updateNestedData('overview', 'timeOfDay', e.target.value)}
                                placeholder="例: 朝7時頃、昼食後"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">所要時間</label>
                            <input
                                type="text"
                                value={currentData.overview?.duration || ''}
                                onChange={(e) => updateNestedData('overview', 'duration', e.target.value)}
                                placeholder="例: 約10分"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">頻度</label>
                            <input
                                type="text"
                                value={currentData.overview?.frequency || ''}
                                onChange={(e) => updateNestedData('overview', 'frequency', e.target.value)}
                                placeholder="例: 毎日、週3回"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">状況・文脈</label>
                            <input
                                type="text"
                                value={currentData.overview?.context || ''}
                                onChange={(e) => updateNestedData('overview', 'context', e.target.value)}
                                placeholder="例: 起床後すぐ、入浴前"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. 現在の手順（ステップバイステップ） */}
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-teal-800 flex items-center gap-2">
                            <span className="bg-teal-600 text-white px-2 py-1 rounded text-sm">3</span>
                            現在の手順（ご利用者の実際のやり方）
                        </h4>
                        <button
                            onClick={addStep}
                            className="flex items-center gap-1 px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 text-sm"
                        >
                            <Plus size={16} />
                            手順を追加
                        </button>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">💡 ご利用者が実際にどのような順序・方法で行っているかを観察して記録します。</p>
                    <div className="space-y-4">
                        {currentData.currentSteps?.map((step, index) => (
                            <div key={step.id} className="bg-white p-4 rounded-lg border border-teal-200">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="bg-teal-600 text-white px-3 py-1 rounded font-bold">
                                        手順 {step.order}
                                    </span>
                                    {currentData.currentSteps.length > 1 && (
                                        <button onClick={() => removeStep(step.id)} className="text-red-500 hover:text-red-700 text-sm">
                                            削除
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">何をしているか（行動）</label>
                                        <input
                                            type="text"
                                            value={step.action}
                                            onChange={(e) => updateStep(step.id, 'action', e.target.value)}
                                            placeholder="例: 歯ブラシを持つ、歯磨き粉をつける"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">どのようにしているか（方法）</label>
                                        <textarea
                                            value={step.method}
                                            onChange={(e) => updateStep(step.id, 'method', e.target.value)}
                                            placeholder="例: 右手で歯ブラシを持ち、左手で歯磨き粉のキャップを開ける"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                                            rows="2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">所要時間</label>
                                        <input
                                            type="text"
                                            value={step.timeRequired}
                                            onChange={(e) => updateStep(step.id, 'timeRequired', e.target.value)}
                                            placeholder="例: 約30秒"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">自立度</label>
                                        <select
                                            value={step.independence}
                                            onChange={(e) => updateStep(step.id, 'independence', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                                        >
                                            <option value="">選択してください</option>
                                            {independenceLevels.map(level => (
                                                <option key={level.value} value={level.label}>{level.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">備考・気づき</label>
                                        <textarea
                                            value={step.notes}
                                            onChange={(e) => updateStep(step.id, 'notes', e.target.value)}
                                            placeholder="例: このステップで戸惑うことが多い"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                                            rows="2"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. 観察ポイント */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">4</span>
                        観察ポイント
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">手順の順序性</label>
                            <textarea
                                value={currentData.observationPoints?.sequence || ''}
                                onChange={(e) => updateNestedData('observationPoints', 'sequence', e.target.value)}
                                placeholder="例: 順番を間違えることがある、特定の順序へのこだわりがある"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">正確性</label>
                            <textarea
                                value={currentData.observationPoints?.accuracy || ''}
                                onChange={(e) => updateNestedData('observationPoints', 'accuracy', e.target.value)}
                                placeholder="例: 細かい動作は正確、大まかな動作は雑になりがち"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">スピード</label>
                            <textarea
                                value={currentData.observationPoints?.speed || ''}
                                onChange={(e) => updateNestedData('observationPoints', 'speed', e.target.value)}
                                placeholder="例: 全体的にゆっくり、特定の部分で時間がかかる"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">安全面</label>
                            <textarea
                                value={currentData.observationPoints?.safety || ''}
                                onChange={(e) => updateNestedData('observationPoints', 'safety', e.target.value)}
                                placeholder="例: 危険な道具の扱いには注意が必要"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">道具・材料の使い方</label>
                            <textarea
                                value={currentData.observationPoints?.materials || ''}
                                onChange={(e) => updateNestedData('observationPoints', 'materials', e.target.value)}
                                placeholder="例: 道具の場所を覚えている、量の加減が難しい"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 5. 強みと課題 */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                        <span className="bg-yellow-600 text-white px-2 py-1 rounded text-sm">5</span>
                        強みと課題の整理
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">強み（うまくできている点）</label>
                            <textarea
                                value={currentData.assessment?.strengths || ''}
                                onChange={(e) => updateNestedData('assessment', 'strengths', e.target.value)}
                                placeholder="例: 手順を一度覚えると忘れない、道具の準備は自分でできる"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">課題（難しい点）</label>
                            <textarea
                                value={currentData.assessment?.challenges || ''}
                                onChange={(e) => updateNestedData('assessment', 'challenges', e.target.value)}
                                placeholder="例: 順番を覚えるのが難しい、細かい動作が苦手"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">支援が必要な点</label>
                            <textarea
                                value={currentData.assessment?.supportNeeded || ''}
                                onChange={(e) => updateNestedData('assessment', 'supportNeeded', e.target.value)}
                                placeholder="例: 最初の声かけ、手順の途中での確認"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">つまずきやすいポイント</label>
                            <textarea
                                value={currentData.assessment?.triggers || ''}
                                onChange={(e) => updateNestedData('assessment', 'triggers', e.target.value)}
                                placeholder="例: 道具の場所が変わると混乱する、途中で話しかけられると忘れる"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 6. 写真記録 */}
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <h4 className="font-bold text-pink-800 mb-3 flex items-center gap-2">
                        <span className="bg-pink-600 text-white px-2 py-1 rounded text-sm">6</span>
                        写真・動画メモ
                    </h4>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">観察中の写真</label>
                        <div className="flex flex-wrap gap-3">
                            {currentData.mediaRecords?.photos?.map((photo) => (
                                <div key={photo.id} className="relative">
                                    <img src={photo.data} alt="観察写真" className="w-32 h-32 object-cover rounded border" />
                                    <button
                                        onClick={() => removePhoto(photo.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <input
                                        type="text"
                                        value={photo.caption}
                                        onChange={(e) => updatePhotoCaption(photo.id, e.target.value)}
                                        placeholder="説明"
                                        className="w-full text-xs px-1 py-0.5 border rounded mt-1"
                                    />
                                </div>
                            ))}
                            <label className="w-32 h-32 border-2 border-dashed border-pink-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-pink-100">
                                <Camera size={24} className="text-pink-400" />
                                <span className="text-xs text-pink-500 mt-1">写真を追加</span>
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">動画観察メモ</label>
                        <textarea
                            value={currentData.mediaRecords?.videoNotes || ''}
                            onChange={(e) => updateNestedData('mediaRecords', 'videoNotes', e.target.value)}
                            placeholder="動画で確認した内容や気づきをメモ"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                            rows="2"
                        />
                    </div>
                </div>

                {/* 7. 考察と次のステップ */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">7</span>
                        考察と次のステップ
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">分析・考察</label>
                            <textarea
                                value={currentData.reflection?.analysis || ''}
                                onChange={(e) => updateNestedData('reflection', 'analysis', e.target.value)}
                                placeholder="例: 視覚的な手がかりがあると自立度が上がる傾向がある"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">支援の提案・推奨事項</label>
                            <textarea
                                value={currentData.reflection?.recommendations || ''}
                                onChange={(e) => updateNestedData('reflection', 'recommendations', e.target.value)}
                                placeholder="例: 手順書の作成、チェックリストの導入、環境の構造化"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">次のステップ</label>
                            <textarea
                                value={currentData.reflection?.nextSteps || ''}
                                onChange={(e) => updateNestedData('reflection', 'nextSteps', e.target.value)}
                                placeholder="例: 手順書を試作して効果を検証する、他のスキルも同様に観察する"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                rows="2"
                            />
                        </div>
                    </div>
                </div>

                {/* 保存ボタン */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button onClick={handleBackToList} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        キャンセル
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md">
                        保存する
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

// ==================== 空間の状況のアセスメントコンポーネント ====================

export const SpaceAssessmentComponent = ({ data, setData, actionName }) => {
    const [viewMode, setViewMode] = useState('list');
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [currentData, setCurrentData] = useState(null);

    const createDefaultData = () => ({
        id: Date.now(),
        recordDate: new Date().toISOString().split('T')[0],
        recorder: '',
        spaceName: '',
        spaceType: '',
        photos: [],
        observations: [
            { id: 1, category: 'movement', label: '移動・動線', content: '', checked: false },
            { id: 2, category: 'activity', label: '活動場所', content: '', checked: false },
            { id: 3, category: 'waiting', label: '待機場所', content: '', checked: false },
            { id: 4, category: 'boundary', label: '空間の境界', content: '', checked: false },
            { id: 5, category: 'visual', label: '視覚的手がかり', content: '', checked: false },
            { id: 6, category: 'distraction', label: '気が散る要素', content: '', checked: false },
            { id: 7, category: 'materials', label: '道具・材料の配置', content: '', checked: false },
            { id: 8, category: 'comfort', label: '快適さ・安心感', content: '', checked: false },
            { id: 9, category: 'oneplace', label: '一場所・一行動の原則', content: '', checked: false }
        ],
        onePlaceOneAction: {
            isFollowed: null,
            currentActivities: '',
            issues: ''
        },
        behaviorDescription: '',
        userReaction: '',
        notes: ''
    });

    const archives = Array.isArray(data) ? data : [];

    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.recordDate) {
            alert('記録日を入力してください');
            return;
        }

        const newArchives = selectedRecordId
            ? archives.map(a => a.id === selectedRecordId ? { ...currentData, id: selectedRecordId } : a)
            : [...archives, currentData];

        setData(newArchives);
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('edit');
    };

    const handleView = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('view');
    };

    const handleDelete = (recordId) => {
        if (window.confirm('この記録を削除しますか？')) {
            setData(archives.filter(a => a.id !== recordId));
        }
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentData(prev => ({
                    ...prev,
                    photos: [...prev.photos, { id: Date.now(), src: reader.result, caption: '' }]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handlePhotoDelete = (photoId) => {
        setCurrentData(prev => ({
            ...prev,
            photos: prev.photos.filter(p => p.id !== photoId)
        }));
    };

    const handlePhotoCaptionChange = (photoId, caption) => {
        setCurrentData(prev => ({
            ...prev,
            photos: prev.photos.map(p => p.id === photoId ? { ...p, caption } : p)
        }));
    };

    const handleObservationChange = (obsId, field, value) => {
        setCurrentData(prev => ({
            ...prev,
            observations: prev.observations.map(obs => 
                obs.id === obsId ? { ...obs, [field]: value } : obs
            )
        }));
    };

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">⑫空間の状況のアセスメント</h3>
                        <p className="text-sm text-gray-600 mt-1">空間の様子を写真で記録し、ご利用者がどのように行動しているかを観察します。</p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        新規記録を作成
                    </button>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">まだ記録がありません。</p>
                        <p className="text-gray-400 text-sm mt-2">「新規記録を作成」ボタンから空間の観察を始めましょう。</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {archives.map(record => (
                            <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    {record.photos && record.photos.length > 0 && (
                                        <img src={record.photos[0].src} alt="" className="w-16 h-16 object-cover rounded-lg" />
                                    )}
                                    <div>
                                        <p className="font-medium">{record.spaceName || '場所名未設定'}</p>
                                        <p className="text-sm text-gray-500">{record.recordDate} - {record.recorder || '記録者未設定'}</p>
                                        <p className="text-xs text-gray-400 mt-1">写真: {record.photos?.length || 0}枚</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleView(record)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">閲覧</button>
                                    <button onClick={() => handleEdit(record)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">編集</button>
                                    <button onClick={() => handleDelete(record.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 編集・閲覧表示
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                    {viewMode === 'edit' ? (selectedRecordId ? '記録を編集' : '新規記録を作成') : '記録を閲覧'}
                </h3>
                <button
                    onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                    ← 一覧に戻る
                </button>
            </div>

            {/* 基本情報 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">記録日</label>
                    <input
                        type="date"
                        value={currentData?.recordDate || ''}
                        onChange={(e) => setCurrentData({ ...currentData, recordDate: e.target.value })}
                        disabled={viewMode === 'view'}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">記録者</label>
                    <input
                        type="text"
                        value={currentData?.recorder || ''}
                        onChange={(e) => setCurrentData({ ...currentData, recorder: e.target.value })}
                        disabled={viewMode === 'view'}
                        placeholder="記録者名"
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">場所の名前</label>
                    <input
                        type="text"
                        value={currentData?.spaceName || ''}
                        onChange={(e) => setCurrentData({ ...currentData, spaceName: e.target.value })}
                        disabled={viewMode === 'view'}
                        placeholder="例：食堂、作業室、リビング"
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
            </div>

            {/* 写真アップロード */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Camera size={20} />
                    空間の写真
                </h4>
                
                {viewMode === 'edit' && (
                    <div className="mb-4">
                        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-50 text-teal-700 rounded-lg cursor-pointer hover:bg-teal-100 transition-colors">
                            <Upload size={20} />
                            写真を追加
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                        </label>
                        <p className="text-xs text-gray-500 text-center mt-2">複数の写真を選択できます</p>
                    </div>
                )}

                {currentData?.photos && currentData.photos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentData.photos.map((photo, index) => (
                            <div key={photo.id} className="border rounded-lg overflow-hidden">
                                <img src={photo.src} alt={`空間写真 ${index + 1}`} className="w-full h-48 object-cover" />
                                <div className="p-3 bg-gray-50">
                                    {viewMode === 'edit' ? (
                                        <div className="space-y-2">
                                            <textarea
                                                value={photo.caption}
                                                onChange={(e) => handlePhotoCaptionChange(photo.id, e.target.value)}
                                                placeholder="この写真についてのメモ（ご利用者の動き、気になる点など）"
                                                className="w-full px-3 py-2 border rounded text-sm"
                                                rows="2"
                                            />
                                            <button
                                                onClick={() => handlePhotoDelete(photo.id)}
                                                className="text-xs text-red-600 hover:text-red-800"
                                            >
                                                この写真を削除
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600">{photo.caption || '（コメントなし）'}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">写真がまだありません</p>
                )}
            </div>

            {/* 観察ポイント */}
            <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-bold text-teal-800 mb-4">🔍 観察ポイント</h4>
                <p className="text-sm text-teal-700 mb-4">
                    以下の観点から、ご利用者がこの空間でどのように行動しているか観察してください。該当する項目にチェックを入れ、具体的な様子を記入してください。
                </p>
                <div className="space-y-3">
                    {currentData?.observations?.map(obs => (
                        <div key={obs.id} className="bg-white p-3 rounded-lg border">
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={obs.checked}
                                    onChange={(e) => handleObservationChange(obs.id, 'checked', e.target.checked)}
                                    disabled={viewMode === 'view'}
                                    className="mt-1"
                                />
                                <div className="flex-grow">
                                    <label className="font-medium text-gray-800">{obs.label}</label>
                                    {viewMode === 'edit' ? (
                                        <textarea
                                            value={obs.content}
                                            onChange={(e) => handleObservationChange(obs.id, 'content', e.target.value)}
                                            placeholder={getObservationPlaceholder(obs.category)}
                                            className="w-full mt-2 px-3 py-2 border rounded text-sm"
                                            rows="2"
                                        />
                                    ) : obs.content && (
                                        <p className="text-sm text-gray-600 mt-1">{obs.content}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 一場所・一行動の原則チェック */}
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-orange-800 mb-3">📍 一場所・一行動の原則チェック</h4>
                <p className="text-sm text-orange-700 mb-4">
                    TEACCHプログラムでは「一場所・一行動」の原則を重視しています。
                    一つの場所では一つの活動だけを行うことで、その場所に来れば何をすればよいかが明確になります。
                </p>
                
                <div className="bg-white p-4 rounded-lg space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            この場所で行われている活動は何ですか？
                        </label>
                        {viewMode === 'edit' ? (
                            <textarea
                                value={currentData?.onePlaceOneAction?.currentActivities || ''}
                                onChange={(e) => setCurrentData({
                                    ...currentData,
                                    onePlaceOneAction: {
                                        ...(currentData?.onePlaceOneAction || {}),
                                        currentActivities: e.target.value
                                    }
                                })}
                                placeholder="例：食事、作業、休憩、着替えなど複数の活動が行われている"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <p className="text-gray-700 bg-gray-50 p-2 rounded">
                                {currentData?.onePlaceOneAction?.currentActivities || '（記載なし）'}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            一場所・一行動の原則は守られていますか？
                        </label>
                        {viewMode === 'edit' ? (
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="oneplace"
                                        checked={currentData?.onePlaceOneAction?.isFollowed === true}
                                        onChange={() => setCurrentData({
                                            ...currentData,
                                            onePlaceOneAction: {
                                                ...(currentData?.onePlaceOneAction || {}),
                                                isFollowed: true
                                            }
                                        })}
                                    />
                                    <span className="text-green-700">はい（一場所で一つの活動）</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="oneplace"
                                        checked={currentData?.onePlaceOneAction?.isFollowed === false}
                                        onChange={() => setCurrentData({
                                            ...currentData,
                                            onePlaceOneAction: {
                                                ...(currentData?.onePlaceOneAction || {}),
                                                isFollowed: false
                                            }
                                        })}
                                    />
                                    <span className="text-red-700">いいえ（複数の活動が混在）</span>
                                </label>
                            </div>
                        ) : (
                            <p className={`font-medium ${currentData?.onePlaceOneAction?.isFollowed ? 'text-green-700' : 'text-red-700'}`}>
                                {currentData?.onePlaceOneAction?.isFollowed === true ? 'はい（守られている）' : 
                                 currentData?.onePlaceOneAction?.isFollowed === false ? 'いいえ（守られていない）' : '（未選択）'}
                            </p>
                        )}
                    </div>

                    {currentData?.onePlaceOneAction?.isFollowed === false && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                どのような問題がありますか？
                            </label>
                            {viewMode === 'edit' ? (
                                <textarea
                                    value={currentData?.onePlaceOneAction?.issues || ''}
                                    onChange={(e) => setCurrentData({
                                        ...currentData,
                                        onePlaceOneAction: {
                                            ...(currentData?.onePlaceOneAction || {}),
                                            issues: e.target.value
                                        }
                                    })}
                                    placeholder="例：同じテーブルで食事と作業を行っているため、食事の時間になっても作業を続けてしまう"
                                    className="w-full px-3 py-2 border rounded-lg"
                                    rows="3"
                                />
                            ) : (
                                <p className="text-gray-700 bg-gray-50 p-2 rounded">
                                    {currentData?.onePlaceOneAction?.issues || '（記載なし）'}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ご利用者の行動の様子 */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-3">📝 ご利用者の行動の様子</h4>
                {viewMode === 'edit' ? (
                    <textarea
                        value={currentData?.behaviorDescription || ''}
                        onChange={(e) => setCurrentData({ ...currentData, behaviorDescription: e.target.value })}
                        placeholder="この空間でご利用者がどのように行動しているか、具体的に記述してください。&#10;例：入口で立ち止まって周りを見渡す、特定の場所を避けて歩く、落ち着かない様子で歩き回る など"
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="4"
                    />
                ) : (
                    <p className="text-gray-700">{currentData?.behaviorDescription || '（記載なし）'}</p>
                )}
            </div>

            {/* ご利用者の反応 */}
            <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-3">💭 ご利用者の反応・表情</h4>
                {viewMode === 'edit' ? (
                    <textarea
                        value={currentData?.userReaction || ''}
                        onChange={(e) => setCurrentData({ ...currentData, userReaction: e.target.value })}
                        placeholder="この空間でのご利用者の表情や反応を記述してください。&#10;例：不安そうな表情、リラックスしている、緊張している様子 など"
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="3"
                    />
                ) : (
                    <p className="text-gray-700">{currentData?.userReaction || '（記載なし）'}</p>
                )}
            </div>

            {/* その他のメモ */}
            <div>
                <h4 className="font-bold text-gray-800 mb-3">📋 その他のメモ</h4>
                {viewMode === 'edit' ? (
                    <textarea
                        value={currentData?.notes || ''}
                        onChange={(e) => setCurrentData({ ...currentData, notes: e.target.value })}
                        placeholder="その他気づいたことがあれば記入してください"
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="3"
                    />
                ) : (
                    <p className="text-gray-700">{currentData?.notes || '（記載なし）'}</p>
                )}
            </div>

            {/* 保存・キャンセルボタン */}
            {viewMode === 'edit' && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                        onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }}
                        className="px-6 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md"
                    >
                        保存する
                    </button>
                </div>
            )}
        </div>
    );
};

// 観察ポイントのプレースホルダーを取得
const getObservationPlaceholder = (category) => {
    const placeholders = {
        movement: '例：入口から作業テーブルまでの動線が分かりにくい、他の利用者とぶつかりやすい',
        activity: '例：どこで活動すればよいか明確でない、活動スペースが狭い',
        waiting: '例：待つ場所が決まっていない、待機中に落ち着かない様子',
        boundary: '例：作業エリアと休憩エリアの境目が不明確',
        visual: '例：スケジュール表が見えにくい位置にある、目印がない',
        distraction: '例：窓の外が気になる、他の人の活動が視界に入る',
        materials: '例：道具の置き場所が分かりにくい、材料を取りに行く動線が長い',
        comfort: '例：照明が明るすぎる、音が響きやすい'
    };
    return placeholders[category] || '';
};

// ==================== 空間のアセスメント結果の分析コンポーネント ====================

export const SpaceAnalysisComponent = ({ analysisData, setAnalysisData, assessmentData, actionName }) => {
    const archives = Array.isArray(assessmentData) ? assessmentData : [];

    const [analysis, setAnalysis] = useState({
        selectedRecordIds: [],
        onePlaceOneAction: {
            isViolated: false,
            violations: [],
            improvements: ''
        },
        physicalStructure: {
            boundaries: { current: '', needed: '', priority: 'medium' },
            areas: { current: '', needed: '', priority: 'medium' },
            furniture: { current: '', needed: '', priority: 'medium' },
            pathways: { current: '', needed: '', priority: 'medium' }
        },
        visualStructure: {
            labels: { current: '', needed: '', priority: 'medium' },
            colorCoding: { current: '', needed: '', priority: 'medium' },
            floorMarking: { current: '', needed: '', priority: 'medium' },
            signage: { current: '', needed: '', priority: 'medium' }
        },
        proposedChanges: [],
        summary: ''
    });

    useEffect(() => {
        if (analysisData && Object.keys(analysisData).length > 0) {
            setAnalysis(prev => ({ ...prev, ...analysisData }));
        }
    }, [analysisData]);

    const handleSave = () => {
        setAnalysisData(analysis);
        alert('分析結果を保存しました');
    };

    const addViolation = () => {
        setAnalysis(prev => ({
            ...prev,
            onePlaceOneAction: {
                ...prev.onePlaceOneAction,
                violations: [...(prev.onePlaceOneAction?.violations || []), { id: Date.now(), place: '', activities: '', issue: '' }]
            }
        }));
    };

    const updateViolation = (id, field, value) => {
        setAnalysis(prev => ({
            ...prev,
            onePlaceOneAction: {
                ...prev.onePlaceOneAction,
                violations: (prev.onePlaceOneAction?.violations || []).map(v => v.id === id ? { ...v, [field]: value } : v)
            }
        }));
    };

    const removeViolation = (id) => {
        setAnalysis(prev => ({
            ...prev,
            onePlaceOneAction: {
                ...prev.onePlaceOneAction,
                violations: (prev.onePlaceOneAction?.violations || []).filter(v => v.id !== id)
            }
        }));
    };

    const addProposedChange = () => {
        setAnalysis(prev => ({
            ...prev,
            proposedChanges: [...prev.proposedChanges, { id: Date.now(), area: '', currentState: '', proposedChange: '', expectedEffect: '', priority: 'medium' }]
        }));
    };

    const updateProposedChange = (id, field, value) => {
        setAnalysis(prev => ({
            ...prev,
            proposedChanges: prev.proposedChanges.map(c => c.id === id ? { ...c, [field]: value } : c)
        }));
    };

    const removeProposedChange = (id) => {
        setAnalysis(prev => ({
            ...prev,
            proposedChanges: prev.proposedChanges.filter(c => c.id !== id)
        }));
    };

    const updatePhysicalStructure = (key, field, value) => {
        setAnalysis(prev => ({
            ...prev,
            physicalStructure: {
                ...prev.physicalStructure,
                [key]: { ...prev.physicalStructure[key], [field]: value }
            }
        }));
    };

    const updateVisualStructure = (key, field, value) => {
        setAnalysis(prev => ({
            ...prev,
            visualStructure: {
                ...prev.visualStructure,
                [key]: { ...prev.visualStructure[key], [field]: value }
            }
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">⑬空間のアセスメント結果の分析</h3>
                    <p className="text-sm text-gray-600 mt-1">TEACCHプログラムの空間の構造化の視点から分析します。</p>
                </div>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md"
                >
                    分析結果を保存
                </button>
            </div>

            {/* TEACCHの空間の構造化の説明 */}
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-800 mb-2">📚 TEACCHプログラムの空間の構造化とは</h4>
                <p className="text-sm text-blue-700 mb-3">
                    自閉症の方が「どこで何をするか」を理解しやすくするために、空間を物理的・視覚的に整理することです。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium text-blue-800">📍 一場所・一行動の原則</p>
                        <p className="text-xs text-gray-600">一つの場所では一つの活動だけを行う</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium text-blue-800">🏠 物理的な境界</p>
                        <p className="text-xs text-gray-600">家具やパーテーションで空間を区切る</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium text-blue-800">🎨 視覚的な手がかり</p>
                        <p className="text-xs text-gray-600">色、ラベル、床のマーキングで示す</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <p className="font-medium text-blue-800">➡️ 明確な動線</p>
                        <p className="text-xs text-gray-600">移動経路を分かりやすくする</p>
                    </div>
                </div>
            </div>

            {/* アセスメント記録の参照 */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">📷 参照するアセスメント記録</h4>
                {archives.length === 0 ? (
                    <p className="text-gray-500 text-sm">空間のアセスメント記録がありません。先に⑫で記録を作成してください。</p>
                ) : (
                    <div className="space-y-2">
                        {archives.map(record => (
                            <div key={record.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                                <input
                                    type="checkbox"
                                    checked={analysis.selectedRecordIds?.includes(record.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAnalysis(prev => ({ ...prev, selectedRecordIds: [...(prev.selectedRecordIds || []), record.id] }));
                                        } else {
                                            setAnalysis(prev => ({ ...prev, selectedRecordIds: (prev.selectedRecordIds || []).filter(id => id !== record.id) }));
                                        }
                                    }}
                                />
                                {record.photos && record.photos.length > 0 && (
                                    <img src={record.photos[0].src} alt="" className="w-12 h-12 object-cover rounded" />
                                )}
                                <div>
                                    <p className="font-medium">{record.spaceName || '場所名未設定'}</p>
                                    <p className="text-xs text-gray-500">{record.recordDate}</p>
                                    {record.onePlaceOneAction?.isFollowed === false && (
                                        <span className="text-xs text-red-600">⚠️ 一場所・一行動の原則に課題あり</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 一場所・一行動の原則の分析 */}
            <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
                <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                    📍 一場所・一行動の原則の分析
                </h4>
                <p className="text-sm text-orange-700 mb-4">
                    各場所で複数の活動が行われていないか確認し、問題がある場合は改善策を検討します。
                </p>

                <div className="mb-4">
                    <label className="flex items-center gap-2 mb-3">
                        <input
                            type="checkbox"
                            checked={analysis.onePlaceOneAction?.isViolated || false}
                            onChange={(e) => setAnalysis(prev => ({
                                ...prev,
                                onePlaceOneAction: { ...prev.onePlaceOneAction, isViolated: e.target.checked }
                            }))}
                        />
                        <span className="font-medium text-orange-800">一場所・一行動の原則に反している場所がある</span>
                    </label>
                </div>

                {analysis.onePlaceOneAction?.isViolated && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">問題のある場所を記録</span>
                            <button
                                onClick={addViolation}
                                className="px-3 py-1 text-sm bg-orange-200 text-orange-800 rounded hover:bg-orange-300"
                            >
                                + 追加
                            </button>
                        </div>
                        {(analysis.onePlaceOneAction?.violations || []).map((v, index) => (
                            <div key={v.id} className="bg-white p-3 rounded-lg border">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-medium text-gray-700">場所 {index + 1}</span>
                                    <button
                                        onClick={() => removeViolation(v.id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        削除
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-600">場所の名前</label>
                                        <input
                                            type="text"
                                            value={v.place}
                                            onChange={(e) => updateViolation(v.id, 'place', e.target.value)}
                                            placeholder="例：リビングのテーブル"
                                            className="w-full px-3 py-2 border rounded text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600">行われている活動</label>
                                        <input
                                            type="text"
                                            value={v.activities}
                                            onChange={(e) => updateViolation(v.id, 'activities', e.target.value)}
                                            placeholder="例：食事、作業、休憩"
                                            className="w-full px-3 py-2 border rounded text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600">発生している問題</label>
                                        <input
                                            type="text"
                                            value={v.issue}
                                            onChange={(e) => updateViolation(v.id, 'issue', e.target.value)}
                                            placeholder="例：活動の切り替えが困難"
                                            className="w-full px-3 py-2 border rounded text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="mt-4">
                            <label className="text-sm font-medium text-gray-700">改善の方向性</label>
                            <textarea
                                value={analysis.onePlaceOneAction?.improvements || ''}
                                onChange={(e) => setAnalysis(prev => ({
                                    ...prev,
                                    onePlaceOneAction: { ...prev.onePlaceOneAction, improvements: e.target.value }
                                }))}
                                placeholder="例：食事と作業を別の場所で行うように変更する、パーテーションで区切って別エリアにする"
                                className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                                rows="3"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* 物理的構造化の分析 */}
            <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-4">🏠 物理的構造化の分析</h4>
                <div className="space-y-4">
                    {[
                        { key: 'boundaries', label: '空間の境界', desc: 'パーテーション、棚、カーペットなどで区切られているか' },
                        { key: 'areas', label: 'エリアの明確さ', desc: '各活動のためのエリアが明確に分かれているか' },
                        { key: 'furniture', label: '家具の配置', desc: '活動に必要な家具が適切に配置されているか' },
                        { key: 'pathways', label: '動線', desc: '移動経路が明確で安全か' }
                    ].map(item => (
                        <div key={item.key} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-medium text-gray-800">{item.label}</p>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </div>
                                <select
                                    value={analysis.physicalStructure?.[item.key]?.priority || 'medium'}
                                    onChange={(e) => updatePhysicalStructure(item.key, 'priority', e.target.value)}
                                    className="px-2 py-1 text-xs border rounded"
                                >
                                    <option value="high">優先度：高</option>
                                    <option value="medium">優先度：中</option>
                                    <option value="low">優先度：低</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs text-gray-600">現状</label>
                                    <input
                                        type="text"
                                        value={analysis.physicalStructure?.[item.key]?.current || ''}
                                        onChange={(e) => updatePhysicalStructure(item.key, 'current', e.target.value)}
                                        placeholder="現在の状態を記入"
                                        className="w-full px-3 py-2 border rounded text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">必要な改善</label>
                                    <input
                                        type="text"
                                        value={analysis.physicalStructure?.[item.key]?.needed || ''}
                                        onChange={(e) => updatePhysicalStructure(item.key, 'needed', e.target.value)}
                                        placeholder="改善が必要な点"
                                        className="w-full px-3 py-2 border rounded text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 視覚的構造化の分析 */}
            <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-4">🎨 視覚的構造化の分析</h4>
                <div className="space-y-4">
                    {[
                        { key: 'labels', label: 'ラベル・名札', desc: '場所や物の名前が視覚的に示されているか' },
                        { key: 'colorCoding', label: '色分け', desc: 'エリアや活動ごとに色で区別されているか' },
                        { key: 'floorMarking', label: '床のマーキング', desc: 'テープやマットで場所が示されているか' },
                        { key: 'signage', label: 'サイン・案内', desc: '移動や活動の手順が視覚的に示されているか' }
                    ].map(item => (
                        <div key={item.key} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-medium text-gray-800">{item.label}</p>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </div>
                                <select
                                    value={analysis.visualStructure?.[item.key]?.priority || 'medium'}
                                    onChange={(e) => updateVisualStructure(item.key, 'priority', e.target.value)}
                                    className="px-2 py-1 text-xs border rounded"
                                >
                                    <option value="high">優先度：高</option>
                                    <option value="medium">優先度：中</option>
                                    <option value="low">優先度：低</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs text-gray-600">現状</label>
                                    <input
                                        type="text"
                                        value={analysis.visualStructure?.[item.key]?.current || ''}
                                        onChange={(e) => updateVisualStructure(item.key, 'current', e.target.value)}
                                        placeholder="現在の状態を記入"
                                        className="w-full px-3 py-2 border rounded text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">必要な改善</label>
                                    <input
                                        type="text"
                                        value={analysis.visualStructure?.[item.key]?.needed || ''}
                                        onChange={(e) => updateVisualStructure(item.key, 'needed', e.target.value)}
                                        placeholder="改善が必要な点"
                                        className="w-full px-3 py-2 border rounded text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 提案する変更 */}
            <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-gray-800">💡 具体的な構造化の提案</h4>
                    <button
                        onClick={addProposedChange}
                        className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded hover:bg-teal-200"
                    >
                        + 提案を追加
                    </button>
                </div>
                {analysis.proposedChanges.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">提案する変更を追加してください</p>
                ) : (
                    <div className="space-y-4">
                        {analysis.proposedChanges.map((change, index) => (
                            <div key={change.id} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="font-medium text-yellow-800">提案 {index + 1}</span>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={change.priority}
                                            onChange={(e) => updateProposedChange(change.id, 'priority', e.target.value)}
                                            className="px-2 py-1 border rounded text-sm"
                                        >
                                            <option value="high">優先度：高</option>
                                            <option value="medium">優先度：中</option>
                                            <option value="low">優先度：低</option>
                                        </select>
                                        <button
                                            onClick={() => removeProposedChange(change.id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-600">対象エリア</label>
                                        <input
                                            type="text"
                                            value={change.area}
                                            onChange={(e) => updateProposedChange(change.id, 'area', e.target.value)}
                                            placeholder="例：作業テーブル周辺"
                                            className="w-full px-3 py-2 border rounded text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600">現状</label>
                                        <input
                                            type="text"
                                            value={change.currentState}
                                            onChange={(e) => updateProposedChange(change.id, 'currentState', e.target.value)}
                                            placeholder="例：境界が不明確"
                                            className="w-full px-3 py-2 border rounded text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600">提案する変更</label>
                                        <input
                                            type="text"
                                            value={change.proposedChange}
                                            onChange={(e) => updateProposedChange(change.id, 'proposedChange', e.target.value)}
                                            placeholder="例：テープで床に境界線を引く"
                                            className="w-full px-3 py-2 border rounded text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600">期待される効果</label>
                                        <input
                                            type="text"
                                            value={change.expectedEffect}
                                            onChange={(e) => updateProposedChange(change.id, 'expectedEffect', e.target.value)}
                                            placeholder="例：作業場所が明確になり集中しやすくなる"
                                            className="w-full px-3 py-2 border rounded text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* まとめ */}
            <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-bold text-teal-800 mb-3">📝 分析のまとめ</h4>
                <textarea
                    value={analysis.summary}
                    onChange={(e) => setAnalysis(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="空間のアセスメント結果を総合的にまとめてください。&#10;・一場所・一行動の原則の遵守状況&#10;・物理的構造化の課題&#10;・視覚的構造化の課題&#10;・優先して取り組むべき改善点"
                    className="w-full px-3 py-2 border rounded-lg"
                    rows="5"
                />
            </div>

            {/* 保存ボタン */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md"
                >
                    分析結果を保存
                </button>
            </div>
        </div>
    );
};

// ==================== 空間の構造化の案の作成コンポーネント ====================

export const SpaceStructurizationPlanComponent = ({ data, setData, actionName }) => {
    const [viewMode, setViewMode] = useState('list');
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [currentData, setCurrentData] = useState(null);

    const createDefaultData = () => ({
        id: Date.now(),
        recordDate: new Date().toISOString().split('T')[0],
        recorder: '',
        targetArea: '',
        photos: [],
        structuringChecklist: {
            onePlaceOneAction: { checked: false, notes: '' },
            physicalBoundary: { checked: false, notes: '' },
            visualLabels: { checked: false, notes: '' },
            colorCoding: { checked: false, notes: '' },
            floorMarking: { checked: false, notes: '' },
            clearPathway: { checked: false, notes: '' },
            distractionReduced: { checked: false, notes: '' },
            appropriateLighting: { checked: false, notes: '' }
        },
        planDescription: '',
        expectedEffects: '',
        materials: '',
        timeline: '',
        notes: ''
    });

    const archives = Array.isArray(data) ? data : [];

    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.recordDate) {
            alert('作成日を入力してください');
            return;
        }
        const newArchives = selectedRecordId
            ? archives.map(a => a.id === selectedRecordId ? { ...currentData, id: selectedRecordId } : a)
            : [...archives, currentData];
        setData(newArchives);
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('edit');
    };

    const handleView = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('view');
    };

    const handleDelete = (recordId) => {
        if (window.confirm('この記録を削除しますか？')) {
            setData(archives.filter(a => a.id !== recordId));
        }
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentData(prev => ({
                    ...prev,
                    photos: [...prev.photos, { id: Date.now(), src: reader.result, caption: '' }]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleChecklistChange = (key, field, value) => {
        setCurrentData(prev => ({
            ...prev,
            structuringChecklist: {
                ...prev.structuringChecklist,
                [key]: { ...prev.structuringChecklist[key], [field]: value }
            }
        }));
    };

    const checklistItems = [
        { key: 'onePlaceOneAction', label: '一場所・一行動の原則', desc: '一つの場所で一つの活動のみ行う設計になっている' },
        { key: 'physicalBoundary', label: '物理的な境界', desc: 'パーテーション、棚、家具などで空間が区切られている' },
        { key: 'visualLabels', label: '視覚的なラベル', desc: '場所や活動の名前が視覚的に示されている' },
        { key: 'colorCoding', label: '色分け', desc: 'エリアや活動ごとに色で区別されている' },
        { key: 'floorMarking', label: '床のマーキング', desc: 'テープやマットで場所が示されている' },
        { key: 'clearPathway', label: '明確な動線', desc: '移動経路が分かりやすい' },
        { key: 'distractionReduced', label: '気が散る要素の軽減', desc: '不要な刺激が取り除かれている' },
        { key: 'appropriateLighting', label: '適切な照明', desc: '活動に適した明るさになっている' }
    ];

    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">⑭空間の構造化の案の作成</h3>
                        <p className="text-sm text-gray-600 mt-1">TEACCHプログラムに基づいた空間構造化の計画を作成します。</p>
                    </div>
                    <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md">
                        <Plus size={20} />
                        新規作成
                    </button>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">まだ構造化の案がありません。</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {archives.map(record => (
                            <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    {record.photos && record.photos.length > 0 && (
                                        <img src={record.photos[0].src} alt="" className="w-16 h-16 object-cover rounded-lg" />
                                    )}
                                    <div>
                                        <p className="font-medium">{record.targetArea || '対象エリア未設定'}</p>
                                        <p className="text-sm text-gray-500">{record.recordDate}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleView(record)} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">閲覧</button>
                                    <button onClick={() => handleEdit(record)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">編集</button>
                                    <button onClick={() => handleDelete(record.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                    {viewMode === 'edit' ? (selectedRecordId ? '構造化案を編集' : '新規構造化案を作成') : '構造化案を閲覧'}
                </h3>
                <button onClick={() => { setViewMode('list'); setCurrentData(null); }} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                    ← 一覧に戻る
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">作成日</label>
                    <input type="date" value={currentData?.recordDate || ''} onChange={(e) => setCurrentData({ ...currentData, recordDate: e.target.value })} disabled={viewMode === 'view'} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">作成者</label>
                    <input type="text" value={currentData?.recorder || ''} onChange={(e) => setCurrentData({ ...currentData, recorder: e.target.value })} disabled={viewMode === 'view'} placeholder="作成者名" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">対象エリア</label>
                    <input type="text" value={currentData?.targetArea || ''} onChange={(e) => setCurrentData({ ...currentData, targetArea: e.target.value })} disabled={viewMode === 'view'} placeholder="例：作業室、リビング" className="w-full px-3 py-2 border rounded-lg" />
                </div>
            </div>

            {/* イラスト・写真 */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-800 mb-4">📷 構造化のイメージ（イラスト・写真）</h4>
                {viewMode === 'edit' && (
                    <div className="mb-4">
                        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-50 text-teal-700 rounded-lg cursor-pointer hover:bg-teal-100">
                            <Upload size={20} />
                            画像を追加
                            <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                        </label>
                    </div>
                )}
                {currentData?.photos && currentData.photos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentData.photos.map((photo, index) => (
                            <div key={photo.id} className="border rounded-lg overflow-hidden">
                                <img src={photo.src} alt={`構造化イメージ ${index + 1}`} className="w-full h-48 object-cover" />
                                <div className="p-3 bg-gray-50">
                                    {viewMode === 'edit' ? (
                                        <textarea value={photo.caption} onChange={(e) => setCurrentData(prev => ({ ...prev, photos: prev.photos.map(p => p.id === photo.id ? { ...p, caption: e.target.value } : p) }))} placeholder="この画像についての説明" className="w-full px-3 py-2 border rounded text-sm" rows="2" />
                                    ) : (
                                        <p className="text-sm text-gray-600">{photo.caption || '（説明なし）'}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">画像がまだありません</p>
                )}
            </div>

            {/* 構造化チェックリスト */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-4">✅ TEACCHプログラムに基づく構造化チェック</h4>
                <div className="space-y-3">
                    {checklistItems.map(item => (
                        <div key={item.key} className="bg-white p-3 rounded-lg border">
                            <div className="flex items-start gap-3">
                                <input type="checkbox" checked={currentData?.structuringChecklist?.[item.key]?.checked || false} onChange={(e) => handleChecklistChange(item.key, 'checked', e.target.checked)} disabled={viewMode === 'view'} className="mt-1" />
                                <div className="flex-grow">
                                    <label className="font-medium text-gray-800">{item.label}</label>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                    {viewMode === 'edit' && (
                                        <input type="text" value={currentData?.structuringChecklist?.[item.key]?.notes || ''} onChange={(e) => handleChecklistChange(item.key, 'notes', e.target.value)} placeholder="具体的な内容を記入" className="w-full mt-2 px-3 py-2 border rounded text-sm" />
                                    )}
                                    {viewMode === 'view' && currentData?.structuringChecklist?.[item.key]?.notes && (
                                        <p className="text-sm text-gray-600 mt-1">{currentData.structuringChecklist[item.key].notes}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 計画の詳細 */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">構造化の計画内容</label>
                    {viewMode === 'edit' ? (
                        <textarea value={currentData?.planDescription || ''} onChange={(e) => setCurrentData({ ...currentData, planDescription: e.target.value })} placeholder="どのような構造化を行うか詳細を記述してください" className="w-full px-3 py-2 border rounded-lg" rows="4" />
                    ) : (
                        <p className="bg-gray-50 p-3 rounded-lg">{currentData?.planDescription || '（記載なし）'}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">期待される効果</label>
                    {viewMode === 'edit' ? (
                        <textarea value={currentData?.expectedEffects || ''} onChange={(e) => setCurrentData({ ...currentData, expectedEffects: e.target.value })} placeholder="この構造化によって期待される効果" className="w-full px-3 py-2 border rounded-lg" rows="3" />
                    ) : (
                        <p className="bg-gray-50 p-3 rounded-lg">{currentData?.expectedEffects || '（記載なし）'}</p>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">必要な材料・備品</label>
                        {viewMode === 'edit' ? (
                            <textarea value={currentData?.materials || ''} onChange={(e) => setCurrentData({ ...currentData, materials: e.target.value })} placeholder="パーテーション、テープ、ラベルなど" className="w-full px-3 py-2 border rounded-lg" rows="3" />
                        ) : (
                            <p className="bg-gray-50 p-3 rounded-lg">{currentData?.materials || '（記載なし）'}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">実施スケジュール</label>
                        {viewMode === 'edit' ? (
                            <textarea value={currentData?.timeline || ''} onChange={(e) => setCurrentData({ ...currentData, timeline: e.target.value })} placeholder="いつまでに何を行うか" className="w-full px-3 py-2 border rounded-lg" rows="3" />
                        ) : (
                            <p className="bg-gray-50 p-3 rounded-lg">{currentData?.timeline || '（記載なし）'}</p>
                        )}
                    </div>
                </div>
            </div>

            {viewMode === 'edit' && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button onClick={() => { setViewMode('list'); setCurrentData(null); }} className="px-6 py-2 text-gray-600 border rounded-lg hover:bg-gray-50">キャンセル</button>
                    <button onClick={handleSave} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md">保存する</button>
                </div>
            )}
        </div>
    );
};

// ==================== 構造化の実践コンポーネント ====================

export const SpaceImplementationComponent = ({ data, setData, actionName }) => {
    const [viewMode, setViewMode] = useState('list');
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [currentData, setCurrentData] = useState(null);

    const createDefaultData = () => ({
        id: Date.now(),
        implementationDate: new Date().toISOString().split('T')[0],
        recorder: '',
        targetArea: '',
        beforePhotos: [],
        afterPhotos: [],
        implementedChanges: '',
        userReactions: [
            { id: Date.now(), date: '', time: '', reaction: '', notes: '' }
        ],
        overallObservation: '',
        issues: '',
        nextSteps: ''
    });

    const archives = Array.isArray(data) ? data : [];

    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.implementationDate) {
            alert('実施日を入力してください');
            return;
        }
        const newArchives = selectedRecordId
            ? archives.map(a => a.id === selectedRecordId ? { ...currentData, id: selectedRecordId } : a)
            : [...archives, currentData];
        setData(newArchives);
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const handlePhotoUpload = (type, e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentData(prev => ({
                    ...prev,
                    [type]: [...prev[type], { id: Date.now(), src: reader.result, caption: '' }]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const addReaction = () => {
        setCurrentData(prev => ({
            ...prev,
            userReactions: [...prev.userReactions, { id: Date.now(), date: '', time: '', reaction: '', notes: '' }]
        }));
    };

    const updateReaction = (id, field, value) => {
        setCurrentData(prev => ({
            ...prev,
            userReactions: prev.userReactions.map(r => r.id === id ? { ...r, [field]: value } : r)
        }));
    };

    const removeReaction = (id) => {
        if (currentData.userReactions.length === 1) return;
        setCurrentData(prev => ({
            ...prev,
            userReactions: prev.userReactions.filter(r => r.id !== id)
        }));
    };

    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">⑮構造化の実践</h3>
                        <p className="text-sm text-gray-600 mt-1">空間の構造化を実施し、ご利用者の様子を記録します。</p>
                    </div>
                    <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md">
                        <Plus size={20} />
                        新規記録
                    </button>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">まだ実践記録がありません。</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {archives.map(record => (
                            <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{record.targetArea || '対象エリア未設定'}</p>
                                    <p className="text-sm text-gray-500">{record.implementationDate}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setCurrentData({ ...record }); setSelectedRecordId(record.id); setViewMode('view'); }} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">閲覧</button>
                                    <button onClick={() => { setCurrentData({ ...record }); setSelectedRecordId(record.id); setViewMode('edit'); }} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">編集</button>
                                    <button onClick={() => { if (window.confirm('削除しますか？')) setData(archives.filter(a => a.id !== record.id)); }} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">{viewMode === 'edit' ? '実践記録を編集' : '実践記録を閲覧'}</h3>
                <button onClick={() => { setViewMode('list'); setCurrentData(null); }} className="px-4 py-2 text-gray-600 hover:text-gray-800">← 一覧に戻る</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">実施日</label>
                    <input type="date" value={currentData?.implementationDate || ''} onChange={(e) => setCurrentData({ ...currentData, implementationDate: e.target.value })} disabled={viewMode === 'view'} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">記録者</label>
                    <input type="text" value={currentData?.recorder || ''} onChange={(e) => setCurrentData({ ...currentData, recorder: e.target.value })} disabled={viewMode === 'view'} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">対象エリア</label>
                    <input type="text" value={currentData?.targetArea || ''} onChange={(e) => setCurrentData({ ...currentData, targetArea: e.target.value })} disabled={viewMode === 'view'} className="w-full px-3 py-2 border rounded-lg" />
                </div>
            </div>

            {/* Before/After写真 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-3">📷 構造化前の写真</h4>
                    {viewMode === 'edit' && (
                        <label className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 mb-3">
                            <Upload size={20} />
                            写真を追加
                            <input type="file" accept="image/*" multiple onChange={(e) => handlePhotoUpload('beforePhotos', e)} className="hidden" />
                        </label>
                    )}
                    <div className="space-y-2">
                        {currentData?.beforePhotos?.map((photo, index) => (
                            <div key={photo.id} className="border rounded overflow-hidden">
                                <img src={photo.src} alt={`構造化前 ${index + 1}`} className="w-full h-32 object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-2 border-dashed border-green-300 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-3">📷 構造化後の写真</h4>
                    {viewMode === 'edit' && (
                        <label className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg cursor-pointer hover:bg-green-100 mb-3">
                            <Upload size={20} />
                            写真を追加
                            <input type="file" accept="image/*" multiple onChange={(e) => handlePhotoUpload('afterPhotos', e)} className="hidden" />
                        </label>
                    )}
                    <div className="space-y-2">
                        {currentData?.afterPhotos?.map((photo, index) => (
                            <div key={photo.id} className="border rounded overflow-hidden">
                                <img src={photo.src} alt={`構造化後 ${index + 1}`} className="w-full h-32 object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 実施した変更 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">実施した構造化の内容</label>
                {viewMode === 'edit' ? (
                    <textarea value={currentData?.implementedChanges || ''} onChange={(e) => setCurrentData({ ...currentData, implementedChanges: e.target.value })} placeholder="どのような構造化を行ったか詳細に記述" className="w-full px-3 py-2 border rounded-lg" rows="4" />
                ) : (
                    <p className="bg-gray-50 p-3 rounded-lg">{currentData?.implementedChanges || '（記載なし）'}</p>
                )}
            </div>

            {/* ご利用者の様子 */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-blue-800">👀 ご利用者の様子の変化</h4>
                    {viewMode === 'edit' && (
                        <button onClick={addReaction} className="px-3 py-1 text-sm bg-blue-200 text-blue-800 rounded hover:bg-blue-300">+ 記録を追加</button>
                    )}
                </div>
                <div className="space-y-3">
                    {currentData?.userReactions?.map((reaction, index) => (
                        <div key={reaction.id} className="bg-white p-3 rounded-lg border">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-gray-700">記録 {index + 1}</span>
                                {viewMode === 'edit' && currentData.userReactions.length > 1 && (
                                    <button onClick={() => removeReaction(reaction.id)} className="text-red-500 text-sm">削除</button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <div>
                                    <label className="text-xs text-gray-600">日付</label>
                                    <input type="text" value={reaction.date} onChange={(e) => updateReaction(reaction.id, 'date', e.target.value)} disabled={viewMode === 'view'} placeholder="〇月〇日" className="w-full px-2 py-1 border rounded text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">時間</label>
                                    <input type="text" value={reaction.time} onChange={(e) => updateReaction(reaction.id, 'time', e.target.value)} disabled={viewMode === 'view'} placeholder="10:00" className="w-full px-2 py-1 border rounded text-sm" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs text-gray-600">様子・反応</label>
                                    <input type="text" value={reaction.reaction} onChange={(e) => updateReaction(reaction.id, 'reaction', e.target.value)} disabled={viewMode === 'view'} placeholder="ご利用者の様子" className="w-full px-2 py-1 border rounded text-sm" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 全体的な観察 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">全体的な観察</label>
                {viewMode === 'edit' ? (
                    <textarea value={currentData?.overallObservation || ''} onChange={(e) => setCurrentData({ ...currentData, overallObservation: e.target.value })} placeholder="構造化後のご利用者の全体的な様子の変化" className="w-full px-3 py-2 border rounded-lg" rows="3" />
                ) : (
                    <p className="bg-gray-50 p-3 rounded-lg">{currentData?.overallObservation || '（記載なし）'}</p>
                )}
            </div>

            {viewMode === 'edit' && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button onClick={() => { setViewMode('list'); setCurrentData(null); }} className="px-6 py-2 text-gray-600 border rounded-lg hover:bg-gray-50">キャンセル</button>
                    <button onClick={handleSave} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md">保存する</button>
                </div>
            )}
        </div>
    );
};

// ==================== 構造化実践の検証コンポーネント ====================

export const SpaceVerificationComponent = ({ data, setData, actionName }) => {
    const [verification, setVerification] = useState({
        overallEffectiveness: '',
        onePlaceOneActionEffect: { effective: null, notes: '' },
        physicalStructureEffect: { effective: null, notes: '' },
        visualStructureEffect: { effective: null, notes: '' },
        behaviorChanges: {
            positive: '',
            negative: '',
            unchanged: ''
        },
        teacchChecklist: {
            clearBoundaries: { achieved: false, notes: '' },
            visualCues: { achieved: false, notes: '' },
            reducedDistraction: { achieved: false, notes: '' },
            independentMovement: { achieved: false, notes: '' },
            activityTransition: { achieved: false, notes: '' }
        },
        improvements: [],
        nextActions: '',
        conclusion: ''
    });

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setVerification(prev => ({ ...prev, ...data }));
        }
    }, [data]);

    const handleSave = () => {
        setData(verification);
        alert('検証結果を保存しました');
    };

    const addImprovement = () => {
        setVerification(prev => ({
            ...prev,
            improvements: [...prev.improvements, { id: Date.now(), issue: '', suggestion: '', priority: 'medium' }]
        }));
    };

    const updateImprovement = (id, field, value) => {
        setVerification(prev => ({
            ...prev,
            improvements: prev.improvements.map(i => i.id === id ? { ...i, [field]: value } : i)
        }));
    };

    const teacchItems = [
        { key: 'clearBoundaries', label: '空間の境界が明確になった', desc: 'ご利用者がどこで何をするか理解できている' },
        { key: 'visualCues', label: '視覚的な手がかりが機能している', desc: 'ラベルや色分けを見て行動できている' },
        { key: 'reducedDistraction', label: '気が散る要素が減った', desc: '集中して活動できるようになった' },
        { key: 'independentMovement', label: '自立した移動ができている', desc: '指示なく適切な場所に移動できる' },
        { key: 'activityTransition', label: '活動の切り替えがスムーズ', desc: '次の活動への移行がスムーズになった' }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">⑯構造化実践の検証</h3>
                    <p className="text-sm text-gray-600 mt-1">TEACCHプログラムの視点から構造化の効果を検証します。</p>
                </div>
                <button onClick={handleSave} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md">
                    検証結果を保存
                </button>
            </div>

            {/* 全体的な効果 */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-3">📊 全体的な効果</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">構造化の全体的な効果はありましたか？</label>
                        <div className="flex gap-4">
                            {['とても効果があった', '効果があった', 'あまり効果がなかった', '効果がなかった'].map(option => (
                                <label key={option} className="flex items-center gap-2">
                                    <input type="radio" name="overall" checked={verification.overallEffectiveness === option} onChange={() => setVerification(prev => ({ ...prev, overallEffectiveness: option }))} />
                                    <span className="text-sm">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 各構造化の効果 */}
            <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-4">🔍 構造化ごとの効果</h4>
                <div className="space-y-4">
                    {[
                        { key: 'onePlaceOneActionEffect', label: '一場所・一行動の原則' },
                        { key: 'physicalStructureEffect', label: '物理的構造化（境界・区切り）' },
                        { key: 'visualStructureEffect', label: '視覚的構造化（ラベル・色分け）' }
                    ].map(item => (
                        <div key={item.key} className="bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium text-gray-800 mb-2">{item.label}</p>
                            <div className="flex gap-4 mb-2">
                                <label className="flex items-center gap-2">
                                    <input type="radio" checked={verification[item.key]?.effective === true} onChange={() => setVerification(prev => ({ ...prev, [item.key]: { ...prev[item.key], effective: true } }))} />
                                    <span className="text-green-700">効果あり</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" checked={verification[item.key]?.effective === false} onChange={() => setVerification(prev => ({ ...prev, [item.key]: { ...prev[item.key], effective: false } }))} />
                                    <span className="text-red-700">効果なし/要改善</span>
                                </label>
                            </div>
                            <textarea value={verification[item.key]?.notes || ''} onChange={(e) => setVerification(prev => ({ ...prev, [item.key]: { ...prev[item.key], notes: e.target.value } }))} placeholder="具体的な観察内容や気づきを記入" className="w-full px-3 py-2 border rounded text-sm" rows="2" />
                        </div>
                    ))}
                </div>
            </div>

            {/* 行動の変化 */}
            <div className="border rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-4">👀 ご利用者の行動の変化</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">✅ 良くなった点</label>
                        <textarea value={verification.behaviorChanges?.positive || ''} onChange={(e) => setVerification(prev => ({ ...prev, behaviorChanges: { ...prev.behaviorChanges, positive: e.target.value } }))} placeholder="構造化によって改善した行動" className="w-full px-3 py-2 border rounded-lg" rows="3" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-red-700 mb-1">⚠️ 課題が残る点</label>
                        <textarea value={verification.behaviorChanges?.negative || ''} onChange={(e) => setVerification(prev => ({ ...prev, behaviorChanges: { ...prev.behaviorChanges, negative: e.target.value } }))} placeholder="まだ改善が必要な点" className="w-full px-3 py-2 border rounded-lg" rows="3" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">➡️ 変化がなかった点</label>
                        <textarea value={verification.behaviorChanges?.unchanged || ''} onChange={(e) => setVerification(prev => ({ ...prev, behaviorChanges: { ...prev.behaviorChanges, unchanged: e.target.value } }))} placeholder="特に変化が見られなかった点" className="w-full px-3 py-2 border rounded-lg" rows="2" />
                    </div>
                </div>
            </div>

            {/* TEACCHチェックリスト */}
            <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-bold text-teal-800 mb-4">✅ TEACCHプログラムの視点からの検証</h4>
                <div className="space-y-3">
                    {teacchItems.map(item => (
                        <div key={item.key} className="bg-white p-3 rounded-lg border">
                            <div className="flex items-start gap-3">
                                <input type="checkbox" checked={verification.teacchChecklist?.[item.key]?.achieved || false} onChange={(e) => setVerification(prev => ({ ...prev, teacchChecklist: { ...prev.teacchChecklist, [item.key]: { ...prev.teacchChecklist[item.key], achieved: e.target.checked } } }))} className="mt-1" />
                                <div className="flex-grow">
                                    <label className="font-medium text-gray-800">{item.label}</label>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                    <textarea value={verification.teacchChecklist?.[item.key]?.notes || ''} onChange={(e) => setVerification(prev => ({ ...prev, teacchChecklist: { ...prev.teacchChecklist, [item.key]: { ...prev.teacchChecklist[item.key], notes: e.target.value } } }))} placeholder="具体的な観察内容" className="w-full mt-2 px-3 py-2 border rounded text-sm" rows="2" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 改善点 */}
            <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-gray-800">💡 今後の改善点</h4>
                    <button onClick={addImprovement} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">+ 追加</button>
                </div>
                {verification.improvements?.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">改善点を追加してください</p>
                ) : (
                    <div className="space-y-3">
                        {verification.improvements?.map((imp, index) => (
                            <div key={imp.id} className="bg-yellow-50 p-3 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-medium">改善点 {index + 1}</span>
                                    <button onClick={() => setVerification(prev => ({ ...prev, improvements: prev.improvements.filter(i => i.id !== imp.id) }))} className="text-red-500 text-sm">削除</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-600">課題</label>
                                        <input type="text" value={imp.issue} onChange={(e) => updateImprovement(imp.id, 'issue', e.target.value)} placeholder="何が問題か" className="w-full px-3 py-2 border rounded text-sm" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600">改善案</label>
                                        <input type="text" value={imp.suggestion} onChange={(e) => updateImprovement(imp.id, 'suggestion', e.target.value)} placeholder="どう改善するか" className="w-full px-3 py-2 border rounded text-sm" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 次のアクション */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">次のアクション</label>
                <textarea value={verification.nextActions || ''} onChange={(e) => setVerification(prev => ({ ...prev, nextActions: e.target.value }))} placeholder="今後どのような対応を行うか" className="w-full px-3 py-2 border rounded-lg" rows="3" />
            </div>

            {/* 結論 */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-1">検証のまとめ</label>
                <textarea value={verification.conclusion || ''} onChange={(e) => setVerification(prev => ({ ...prev, conclusion: e.target.value }))} placeholder="構造化の効果についての総合的な評価" className="w-full px-3 py-2 border rounded-lg" rows="4" />
            </div>

            <div className="flex justify-end">
                <button onClick={handleSave} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md">
                    検証結果を保存
                </button>
            </div>
        </div>
    );
};

// ==================== 手順書の実践コンポーネント ====================

export const ProcedurePracticeComponent = ({ practiceData = [], setPracticeData, actionName }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list', 'edit', 'view'
    const [currentData, setCurrentData] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);

    const archives = practiceData || [];

    const createDefaultData = () => ({
        id: Date.now(),
        practiceDate: new Date().toISOString().split('T')[0],
        practitioner: '',
        targetActivity: actionName || '',
        photos: [],
        practiceDetails: {
            howPracticed: '',
            userReaction: '',
            practitionerResponse: ''
        },
        steps: [
            { id: 1, stepNumber: 1, description: '', photo: null, userBehavior: '', support: '', result: '' }
        ],
        overallNotes: '',
        nextSteps: '',
        effectiveness: ''
    });

    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.practiceDate) {
            alert('実践日を入力してください');
            return;
        }
        if (!currentData.practitioner) {
            alert('実践者を入力してください');
            return;
        }

        const newArchives = selectedRecordId
            ? archives.map(a => a.id === selectedRecordId ? { ...currentData, id: selectedRecordId } : a)
            : [...archives, currentData];

        setPracticeData(newArchives);
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('edit');
    };

    const handleView = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('view');
    };

    const handleDelete = (recordId) => {
        if (window.confirm('この記録を削除しますか？')) {
            setPracticeData(archives.filter(a => a.id !== recordId));
        }
    };

    // 写真アップロード処理
    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentData(prev => ({
                    ...prev,
                    photos: [...prev.photos, { id: Date.now() + Math.random(), src: reader.result, caption: '', timing: '' }]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handlePhotoDelete = (photoId) => {
        setCurrentData(prev => ({
            ...prev,
            photos: prev.photos.filter(p => p.id !== photoId)
        }));
    };

    const handlePhotoCaptionChange = (photoId, field, value) => {
        setCurrentData(prev => ({
            ...prev,
            photos: prev.photos.map(p => p.id === photoId ? { ...p, [field]: value } : p)
        }));
    };

    // ステップ用写真アップロード
    const handleStepPhotoUpload = (stepId, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentData(prev => ({
                    ...prev,
                    steps: prev.steps.map(step => 
                        step.id === stepId ? { ...step, photo: reader.result } : step
                    )
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStepPhotoDelete = (stepId) => {
        setCurrentData(prev => ({
            ...prev,
            steps: prev.steps.map(step => 
                step.id === stepId ? { ...step, photo: null } : step
            )
        }));
    };

    // ステップ管理
    const addStep = () => {
        const newStepNumber = currentData.steps.length + 1;
        setCurrentData(prev => ({
            ...prev,
            steps: [...prev.steps, { 
                id: Date.now(), 
                stepNumber: newStepNumber, 
                description: '', 
                photo: null, 
                userBehavior: '', 
                support: '', 
                result: '' 
            }]
        }));
    };

    const removeStep = (stepId) => {
        if (currentData.steps.length <= 1) return;
        setCurrentData(prev => ({
            ...prev,
            steps: prev.steps.filter(s => s.id !== stepId).map((s, idx) => ({ ...s, stepNumber: idx + 1 }))
        }));
    };

    const updateStep = (stepId, field, value) => {
        setCurrentData(prev => ({
            ...prev,
            steps: prev.steps.map(step => 
                step.id === stepId ? { ...step, [field]: value } : step
            )
        }));
    };

    const updatePracticeDetails = (field, value) => {
        setCurrentData(prev => ({
            ...prev,
            practiceDetails: { ...prev.practiceDetails, [field]: value }
        }));
    };

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">⑭手順書の実践</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            手順書に基づいた支援の実践を記録し、振り返ることができます。
                        </p>
                        {actionName && (
                            <p className="text-sm text-blue-600 mt-1">対象活動: {actionName}</p>
                        )}
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        新規実践記録を作成
                    </button>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">まだ実践記録がありません。</p>
                        <p className="text-gray-400 text-sm mt-2">「新規実践記録を作成」ボタンから記録を始めましょう。</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {archives.map(record => (
                            <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    {record.photos && record.photos.length > 0 && (
                                        <img src={record.photos[0].src} alt="" className="w-16 h-16 object-cover rounded-lg" />
                                    )}
                                    <div>
                                        <p className="font-medium">{record.targetActivity || '活動名未設定'}</p>
                                        <p className="text-sm text-gray-500">{record.practiceDate} - {record.practitioner || '実践者未設定'}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            写真: {record.photos?.length || 0}枚 | ステップ: {record.steps?.length || 0}個
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleView(record)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">閲覧</button>
                                    <button onClick={() => handleEdit(record)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">編集</button>
                                    <button onClick={() => handleDelete(record.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 編集・閲覧表示
    const isEditing = viewMode === 'edit';

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                    {isEditing ? (selectedRecordId ? '実践記録を編集' : '新規実践記録を作成') : '実践記録を閲覧'}
                </h3>
                <button
                    onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                    ← 一覧に戻る
                </button>
            </div>

            {/* 基本情報 */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">1</span>
                    基本情報
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">実践日 <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            value={currentData?.practiceDate || ''}
                            onChange={(e) => setCurrentData({ ...currentData, practiceDate: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">実践者 <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={currentData?.practitioner || ''}
                            onChange={(e) => setCurrentData({ ...currentData, practitioner: e.target.value })}
                            disabled={!isEditing}
                            placeholder="実践者名"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">対象活動</label>
                        <input
                            type="text"
                            value={currentData?.targetActivity || ''}
                            onChange={(e) => setCurrentData({ ...currentData, targetActivity: e.target.value })}
                            disabled={!isEditing}
                            placeholder="例：歯磨き、着替え"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>
            </div>

            {/* 実践の様子（写真） */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Camera size={20} />
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">2</span>
                    実践の様子（写真）
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                    実践中の様子を写真で記録してください。複数の写真をアップロードできます。
                </p>
                
                {isEditing && (
                    <div className="mb-4">
                        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                            <Upload size={20} />
                            写真を追加
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                        </label>
                        <p className="text-xs text-gray-500 text-center mt-2">複数の写真を選択できます</p>
                    </div>
                )}

                {currentData?.photos && currentData.photos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentData.photos.map((photo, index) => (
                            <div key={photo.id} className="border rounded-lg overflow-hidden">
                                <img src={photo.src} alt={`実践写真 ${index + 1}`} className="w-full h-48 object-cover" />
                                <div className="p-3 bg-gray-50 space-y-2">
                                    {isEditing ? (
                                        <>
                                            <div>
                                                <label className="text-xs text-gray-600">撮影タイミング</label>
                                                <input
                                                    type="text"
                                                    value={photo.timing || ''}
                                                    onChange={(e) => handlePhotoCaptionChange(photo.id, 'timing', e.target.value)}
                                                    placeholder="例：手順3の実践中"
                                                    className="w-full px-2 py-1 border rounded text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-600">コメント</label>
                                                <textarea
                                                    value={photo.caption || ''}
                                                    onChange={(e) => handlePhotoCaptionChange(photo.id, 'caption', e.target.value)}
                                                    placeholder="この写真についてのメモ"
                                                    className="w-full px-2 py-1 border rounded text-sm"
                                                    rows="2"
                                                />
                                            </div>
                                            <button
                                                onClick={() => handlePhotoDelete(photo.id)}
                                                className="text-xs text-red-600 hover:text-red-800"
                                            >
                                                この写真を削除
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            {photo.timing && <p className="text-xs text-blue-600">📍 {photo.timing}</p>}
                                            <p className="text-sm text-gray-600">{photo.caption || '（コメントなし）'}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">写真がまだありません</p>
                )}
            </div>

            {/* 実践の記録（全体） */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">3</span>
                    実践の記録（全体の振り返り）
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            📋 どのように実践したか
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                            手順書に沿ってどのように支援を行ったか、具体的に記録してください。
                        </p>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceDetails?.howPracticed || ''}
                                onChange={(e) => updatePracticeDetails('howPracticed', e.target.value)}
                                placeholder="例：手順書の通り、まず歯ブラシを持つところから声掛けを行い、次に歯磨き粉をつけるよう促しました。各ステップで視覚的な指示カードを見せながら進めました。"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                rows="4"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">
                                {currentData?.practiceDetails?.howPracticed || '（記録なし）'}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            👤 対象者がどのような反応をしたか
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                            ご利用者の行動、表情、言葉など、実践中に見られた反応を記録してください。
                        </p>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceDetails?.userReaction || ''}
                                onChange={(e) => updatePracticeDetails('userReaction', e.target.value)}
                                placeholder="例：最初は戸惑った様子でしたが、視覚的な指示カードを見せると理解した様子で歯ブラシを持ちました。歯磨き粉をつける際に少し困った表情を見せました。"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                rows="4"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">
                                {currentData?.practiceDetails?.userReaction || '（記録なし）'}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            💬 その反応に実践者がどう対応したか
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                            ご利用者の反応に対してどのようにサポートしたかを記録してください。
                        </p>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceDetails?.practitionerResponse || ''}
                                onChange={(e) => updatePracticeDetails('practitionerResponse', e.target.value)}
                                placeholder="例：歯磨き粉をつける際に困った様子だったので、手を添えて一緒につける動作を見せました。その後は自分でできるようになり、笑顔が見られました。"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                rows="4"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">
                                {currentData?.practiceDetails?.practitionerResponse || '（記録なし）'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ステップごとの詳細記録 */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h4 className="font-bold text-purple-800 flex items-center gap-2">
                            <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">4</span>
                            ステップごとの詳細記録（任意）
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                            各ステップの詳細を記録したい場合はこちらに入力してください。
                        </p>
                    </div>
                    {isEditing && (
                        <button
                            onClick={addStep}
                            className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                        >
                            <Plus size={16} />
                            ステップを追加
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {currentData?.steps?.map((step, index) => (
                        <div key={step.id} className="bg-white p-4 rounded-lg border border-purple-200">
                            <div className="flex justify-between items-center mb-3">
                                <span className="bg-purple-600 text-white px-3 py-1 rounded font-bold">
                                    手順 {step.stepNumber}
                                </span>
                                {isEditing && currentData.steps.length > 1 && (
                                    <button onClick={() => removeStep(step.id)} className="text-red-500 hover:text-red-700 text-sm">
                                        削除
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* 写真 */}
                                <div className="md:row-span-2">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">このステップの写真</label>
                                    {step.photo ? (
                                        <div className="relative">
                                            <img src={step.photo} alt={`手順${step.stepNumber}`} className="w-full h-32 object-cover rounded-lg" />
                                            {isEditing && (
                                                <button
                                                    onClick={() => handleStepPhotoDelete(step.id)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ) : isEditing ? (
                                        <label className="flex items-center justify-center h-32 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 border-2 border-dashed border-gray-300">
                                            <div className="text-center">
                                                <Camera size={24} className="mx-auto text-gray-400" />
                                                <span className="text-xs text-gray-500">写真を追加</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleStepPhotoUpload(step.id, e)}
                                                className="hidden"
                                            />
                                        </label>
                                    ) : (
                                        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <span className="text-xs text-gray-400">写真なし</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">この手順の内容</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={step.description}
                                            onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                                            placeholder="例：歯ブラシを持つ"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        />
                                    ) : (
                                        <p className="text-sm bg-gray-50 p-2 rounded">{step.description || '（未記入）'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">ご利用者の様子</label>
                                    {isEditing ? (
                                        <textarea
                                            value={step.userBehavior}
                                            onChange={(e) => updateStep(step.id, 'userBehavior', e.target.value)}
                                            placeholder="例：スムーズにできた、戸惑った様子だった"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                            rows="2"
                                        />
                                    ) : (
                                        <p className="text-sm bg-gray-50 p-2 rounded">{step.userBehavior || '（未記入）'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">行ったサポート</label>
                                    {isEditing ? (
                                        <textarea
                                            value={step.support}
                                            onChange={(e) => updateStep(step.id, 'support', e.target.value)}
                                            placeholder="例：声掛け、手を添える、見本を見せる"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                            rows="2"
                                        />
                                    ) : (
                                        <p className="text-sm bg-gray-50 p-2 rounded">{step.support || '（未記入）'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">結果・気づき</label>
                                    {isEditing ? (
                                        <textarea
                                            value={step.result}
                                            onChange={(e) => updateStep(step.id, 'result', e.target.value)}
                                            placeholder="例：サポート後は自分でできた"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                            rows="2"
                                        />
                                    ) : (
                                        <p className="text-sm bg-gray-50 p-2 rounded">{step.result || '（未記入）'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 保存ボタン */}
            {isEditing && (
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
                    >
                        保存する
                    </button>
                </div>
            )}
        </div>
    );
};

// ==================== 実践の検証コンポーネント（⑮） ====================

export const ProcedureVerificationComponent = ({ verificationData = [], setVerificationData, practiceData = [], actionName }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list', 'edit', 'view'
    const [currentData, setCurrentData] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const [selectedPracticeId, setSelectedPracticeId] = useState(null);

    const archives = verificationData || [];
    const practices = practiceData || [];

    const createDefaultData = (practiceRecord) => ({
        id: Date.now(),
        verificationDate: new Date().toISOString().split('T')[0],
        verifier: '',
        linkedPracticeId: practiceRecord?.id || null,
        linkedPracticeDate: practiceRecord?.practiceDate || '',
        linkedPractitioner: practiceRecord?.practitioner || '',
        targetActivity: practiceRecord?.targetActivity || actionName || '',
        
        // 実践内容の振り返り
        practiceReview: {
            whatWentWell: '',
            whatWasDifficult: '',
            unexpectedReactions: ''
        },
        
        // TEACCH構造化の評価
        teacchEvaluation: {
            // 物理的構造化
            physicalStructure: {
                effectiveness: '', // 'effective', 'partially', 'not_effective'
                notes: ''
            },
            // 時間的構造化（スケジュール）
            temporalStructure: {
                effectiveness: '',
                notes: ''
            },
            // 活動システム
            activitySystem: {
                effectiveness: '',
                notes: ''
            },
            // 視覚的構造化
            visualStructure: {
                effectiveness: '',
                notes: ''
            },
            // ルーチン
            routine: {
                effectiveness: '',
                notes: ''
            }
        },
        
        // 手順書との比較
        procedureComparison: {
            followedProcedure: '', // 'fully', 'partially', 'not'
            deviations: '',
            deviationReasons: ''
        },
        
        // 効果の評価
        effectivenessEvaluation: {
            overallEffectiveness: '', // 'very_effective', 'somewhat_effective', 'not_effective', 'negative', 'unknown'
            userEngagement: '', // 'high', 'medium', 'low'
            skillAcquisition: '', // 'improved', 'same', 'declined'
            specificImprovements: '',
            remainingChallenges: ''
        },
        
        // 手順書の改善点
        procedureImprovements: {
            needsRevision: false,
            suggestedChanges: '',
            additionalSupports: '',
            environmentalChanges: ''
        },
        
        // 次回への計画
        nextPlan: {
            continuePractice: true,
            modifications: '',
            focusPoints: '',
            timeline: ''
        },
        
        // 総合所見
        overallFindings: ''
    });

    const handleCreateNew = () => {
        if (practices.length === 0) {
            alert('先に⑭手順書の実践で記録を作成してください');
            return;
        }
        setSelectedPracticeId(null);
        setCurrentData(null);
        setViewMode('select_practice');
    };

    const handleSelectPractice = (practice) => {
        setSelectedPracticeId(practice.id);
        setCurrentData(createDefaultData(practice));
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.verificationDate) {
            alert('検証日を入力してください');
            return;
        }
        if (!currentData.verifier) {
            alert('検証者を入力してください');
            return;
        }

        const newArchives = selectedRecordId
            ? archives.map(a => a.id === selectedRecordId ? { ...currentData, id: selectedRecordId } : a)
            : [...archives, currentData];

        setVerificationData(newArchives);
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
        setSelectedPracticeId(null);
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setSelectedPracticeId(record.linkedPracticeId);
        setViewMode('edit');
    };

    const handleView = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setSelectedPracticeId(record.linkedPracticeId);
        setViewMode('view');
    };

    const handleDelete = (recordId) => {
        if (window.confirm('この検証記録を削除しますか？')) {
            setVerificationData(archives.filter(a => a.id !== recordId));
        }
    };

    const getLinkedPractice = () => {
        return practices.find(p => p.id === selectedPracticeId || p.id === currentData?.linkedPracticeId);
    };

    const updatePracticeReview = (field, value) => {
        setCurrentData(prev => ({
            ...prev,
            practiceReview: { ...prev.practiceReview, [field]: value }
        }));
    };

    const updateTeacchEvaluation = (category, field, value) => {
        setCurrentData(prev => ({
            ...prev,
            teacchEvaluation: {
                ...prev.teacchEvaluation,
                [category]: { ...prev.teacchEvaluation[category], [field]: value }
            }
        }));
    };

    const updateProcedureComparison = (field, value) => {
        setCurrentData(prev => ({
            ...prev,
            procedureComparison: { ...prev.procedureComparison, [field]: value }
        }));
    };

    const updateEffectivenessEvaluation = (field, value) => {
        setCurrentData(prev => ({
            ...prev,
            effectivenessEvaluation: { ...prev.effectivenessEvaluation, [field]: value }
        }));
    };

    const updateProcedureImprovements = (field, value) => {
        setCurrentData(prev => ({
            ...prev,
            procedureImprovements: { ...prev.procedureImprovements, [field]: value }
        }));
    };

    const updateNextPlan = (field, value) => {
        setCurrentData(prev => ({
            ...prev,
            nextPlan: { ...prev.nextPlan, [field]: value }
        }));
    };

    // 実践記録の選択画面
    if (viewMode === 'select_practice') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">検証する実践記録を選択</h3>
                        <p className="text-sm text-gray-600 mt-1">⑭手順書の実践で記録した内容から、検証対象を選んでください。</p>
                    </div>
                    <button
                        onClick={() => setViewMode('list')}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        ← 戻る
                    </button>
                </div>

                {practices.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">実践記録がありません。</p>
                        <p className="text-gray-400 text-sm mt-2">先に⑭手順書の実践で記録を作成してください。</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {practices.map(practice => (
                            <div 
                                key={practice.id} 
                                onClick={() => handleSelectPractice(practice)}
                                className="p-4 border rounded-lg hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    {practice.photos && practice.photos.length > 0 && (
                                        <img src={practice.photos[0].src} alt="" className="w-16 h-16 object-cover rounded-lg" />
                                    )}
                                    <div>
                                        <p className="font-medium">{practice.targetActivity || '活動名未設定'}</p>
                                        <p className="text-sm text-gray-500">{practice.practiceDate} - {practice.practitioner}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {practice.practiceDetails?.howPracticed?.substring(0, 50)}...
                                        </p>
                                    </div>
                                </div>
                                <span className="text-blue-600 text-sm">選択 →</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">⑮実践の検証</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            ⑭手順書の実践で記録した内容を振り返り、効果を検証します。
                        </p>
                        {actionName && (
                            <p className="text-sm text-blue-600 mt-1">対象活動: {actionName}</p>
                        )}
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        新規検証を作成
                    </button>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">まだ検証記録がありません。</p>
                        <p className="text-gray-400 text-sm mt-2">「新規検証を作成」ボタンから検証を始めましょう。</p>
                        {practices.length === 0 && (
                            <p className="text-orange-500 text-sm mt-4">※先に⑭手順書の実践で記録を作成してください。</p>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {archives.map(record => (
                            <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{record.targetActivity || '活動名未設定'}</p>
                                    <p className="text-sm text-gray-500">
                                        検証日: {record.verificationDate} - 検証者: {record.verifier}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        実践日: {record.linkedPracticeDate} （{record.linkedPractitioner}）
                                    </p>
                                    {record.effectivenessEvaluation?.overallEffectiveness && (
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                                            record.effectivenessEvaluation.overallEffectiveness === 'very_effective' ? 'bg-green-100 text-green-700' :
                                            record.effectivenessEvaluation.overallEffectiveness === 'somewhat_effective' ? 'bg-blue-100 text-blue-700' :
                                            record.effectivenessEvaluation.overallEffectiveness === 'not_effective' ? 'bg-yellow-100 text-yellow-700' :
                                            record.effectivenessEvaluation.overallEffectiveness === 'negative' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {record.effectivenessEvaluation.overallEffectiveness === 'very_effective' ? 'とても効果的' :
                                             record.effectivenessEvaluation.overallEffectiveness === 'somewhat_effective' ? 'ある程度効果あり' :
                                             record.effectivenessEvaluation.overallEffectiveness === 'not_effective' ? '効果なし' :
                                             record.effectivenessEvaluation.overallEffectiveness === 'negative' ? '逆効果' : '判断できない'}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleView(record)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">閲覧</button>
                                    <button onClick={() => handleEdit(record)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">編集</button>
                                    <button onClick={() => handleDelete(record.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 編集・閲覧表示
    const isEditing = viewMode === 'edit';
    const linkedPractice = getLinkedPractice();

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                    {isEditing ? (selectedRecordId ? '検証記録を編集' : '新規検証記録を作成') : '検証記録を閲覧'}
                </h3>
                <button
                    onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); setSelectedPracticeId(null); }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                    ← 一覧に戻る
                </button>
            </div>

            {/* 対象の実践記録情報 */}
            {linkedPractice && (
                <div className="bg-gray-100 p-4 rounded-lg border">
                    <h4 className="font-bold text-gray-700 mb-2">📋 検証対象の実践記録</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <p><span className="text-gray-500">活動:</span> {linkedPractice.targetActivity}</p>
                        <p><span className="text-gray-500">実践日:</span> {linkedPractice.practiceDate}</p>
                        <p><span className="text-gray-500">実践者:</span> {linkedPractice.practitioner}</p>
                    </div>
                    {linkedPractice.practiceDetails?.howPracticed && (
                        <div className="mt-2 text-sm">
                            <p className="text-gray-500">実践内容:</p>
                            <p className="bg-white p-2 rounded mt-1">{linkedPractice.practiceDetails.howPracticed}</p>
                        </div>
                    )}
                </div>
            )}

            {/* 基本情報 */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                    <span className="bg-orange-600 text-white px-2 py-1 rounded text-sm">1</span>
                    基本情報
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">検証日 <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            value={currentData?.verificationDate || ''}
                            onChange={(e) => setCurrentData({ ...currentData, verificationDate: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">検証者 <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={currentData?.verifier || ''}
                            onChange={(e) => setCurrentData({ ...currentData, verifier: e.target.value })}
                            disabled={!isEditing}
                            placeholder="検証者名"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">対象活動</label>
                        <input
                            type="text"
                            value={currentData?.targetActivity || ''}
                            onChange={(e) => setCurrentData({ ...currentData, targetActivity: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>
            </div>

            {/* 実践内容の振り返り */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">2</span>
                    実践内容の振り返り
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">✅ うまくいった点</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceReview?.whatWentWell || ''}
                                onChange={(e) => updatePracticeReview('whatWentWell', e.target.value)}
                                placeholder="例：視覚的な指示カードを見せると、すぐに理解して行動できた"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="3"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.practiceReview?.whatWentWell || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">⚠️ 難しかった点</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceReview?.whatWasDifficult || ''}
                                onChange={(e) => updatePracticeReview('whatWasDifficult', e.target.value)}
                                placeholder="例：歯磨き粉の量を調整するところで何度か失敗があった"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="3"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.practiceReview?.whatWasDifficult || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">💡 予想外の反応</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceReview?.unexpectedReactions || ''}
                                onChange={(e) => updatePracticeReview('unexpectedReactions', e.target.value)}
                                placeholder="例：自分からカードを指さして次の手順を確認する様子が見られた"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="3"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.practiceReview?.unexpectedReactions || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* TEACCH構造化の評価 */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">3</span>
                    TEACCH構造化の評価
                </h4>
                <p className="text-sm text-purple-700 mb-4">
                    TEACCHプログラムの5つの構造化要素について、今回の実践での効果を評価してください。
                </p>
                <div className="space-y-4">
                    {/* 物理的構造化 */}
                    <div className="bg-white p-3 rounded-lg border">
                        <label className="block text-sm font-bold text-gray-700 mb-2">🏠 物理的構造化（空間の配置・境界）</label>
                        <p className="text-xs text-gray-500 mb-2">活動場所の配置、仕切り、境界線の明確さなど</p>
                        {isEditing ? (
                            <>
                                <div className="flex flex-wrap gap-3 mb-2">
                                    {[
                                        { value: 'effective', label: '効果的だった', color: 'bg-green-100 text-green-700' },
                                        { value: 'partially', label: '部分的に効果あり', color: 'bg-yellow-100 text-yellow-700' },
                                        { value: 'not_effective', label: '効果がなかった', color: 'bg-red-100 text-red-700' },
                                        { value: 'not_applicable', label: '該当なし', color: 'bg-gray-100 text-gray-600' }
                                    ].map(option => (
                                        <label key={option.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${currentData?.teacchEvaluation?.physicalStructure?.effectiveness === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-gray-50 border'}`}>
                                            <input type="radio" name="physicalStructure" value={option.value} checked={currentData?.teacchEvaluation?.physicalStructure?.effectiveness === option.value} onChange={(e) => updateTeacchEvaluation('physicalStructure', 'effectiveness', e.target.value)} className="sr-only" />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <textarea value={currentData?.teacchEvaluation?.physicalStructure?.notes || ''} onChange={(e) => updateTeacchEvaluation('physicalStructure', 'notes', e.target.value)} placeholder="具体的な気づきや改善点" className="w-full px-3 py-2 border rounded-lg text-sm" rows="2" />
                            </>
                        ) : (
                            <div className="bg-gray-50 p-2 rounded border text-sm">
                                <p>評価: {currentData?.teacchEvaluation?.physicalStructure?.effectiveness === 'effective' ? '効果的だった' : currentData?.teacchEvaluation?.physicalStructure?.effectiveness === 'partially' ? '部分的に効果あり' : currentData?.teacchEvaluation?.physicalStructure?.effectiveness === 'not_effective' ? '効果がなかった' : currentData?.teacchEvaluation?.physicalStructure?.effectiveness === 'not_applicable' ? '該当なし' : '（未評価）'}</p>
                                {currentData?.teacchEvaluation?.physicalStructure?.notes && <p className="mt-1">メモ: {currentData.teacchEvaluation.physicalStructure.notes}</p>}
                            </div>
                        )}
                    </div>

                    {/* 時間的構造化 */}
                    <div className="bg-white p-3 rounded-lg border">
                        <label className="block text-sm font-bold text-gray-700 mb-2">⏰ 時間的構造化（スケジュール）</label>
                        <p className="text-xs text-gray-500 mb-2">活動の順序、タイムスケジュール、予告など</p>
                        {isEditing ? (
                            <>
                                <div className="flex flex-wrap gap-3 mb-2">
                                    {[
                                        { value: 'effective', label: '効果的だった', color: 'bg-green-100 text-green-700' },
                                        { value: 'partially', label: '部分的に効果あり', color: 'bg-yellow-100 text-yellow-700' },
                                        { value: 'not_effective', label: '効果がなかった', color: 'bg-red-100 text-red-700' },
                                        { value: 'not_applicable', label: '該当なし', color: 'bg-gray-100 text-gray-600' }
                                    ].map(option => (
                                        <label key={option.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${currentData?.teacchEvaluation?.temporalStructure?.effectiveness === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-gray-50 border'}`}>
                                            <input type="radio" name="temporalStructure" value={option.value} checked={currentData?.teacchEvaluation?.temporalStructure?.effectiveness === option.value} onChange={(e) => updateTeacchEvaluation('temporalStructure', 'effectiveness', e.target.value)} className="sr-only" />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <textarea value={currentData?.teacchEvaluation?.temporalStructure?.notes || ''} onChange={(e) => updateTeacchEvaluation('temporalStructure', 'notes', e.target.value)} placeholder="具体的な気づきや改善点" className="w-full px-3 py-2 border rounded-lg text-sm" rows="2" />
                            </>
                        ) : (
                            <div className="bg-gray-50 p-2 rounded border text-sm">
                                <p>評価: {currentData?.teacchEvaluation?.temporalStructure?.effectiveness === 'effective' ? '効果的だった' : currentData?.teacchEvaluation?.temporalStructure?.effectiveness === 'partially' ? '部分的に効果あり' : currentData?.teacchEvaluation?.temporalStructure?.effectiveness === 'not_effective' ? '効果がなかった' : currentData?.teacchEvaluation?.temporalStructure?.effectiveness === 'not_applicable' ? '該当なし' : '（未評価）'}</p>
                                {currentData?.teacchEvaluation?.temporalStructure?.notes && <p className="mt-1">メモ: {currentData.teacchEvaluation.temporalStructure.notes}</p>}
                            </div>
                        )}
                    </div>

                    {/* 活動システム */}
                    <div className="bg-white p-3 rounded-lg border">
                        <label className="block text-sm font-bold text-gray-700 mb-2">📋 活動システム（ワークシステム）</label>
                        <p className="text-xs text-gray-500 mb-2">何を・どのくらい・どうなったら終わり・次は何かの明確化</p>
                        {isEditing ? (
                            <>
                                <div className="flex flex-wrap gap-3 mb-2">
                                    {[
                                        { value: 'effective', label: '効果的だった', color: 'bg-green-100 text-green-700' },
                                        { value: 'partially', label: '部分的に効果あり', color: 'bg-yellow-100 text-yellow-700' },
                                        { value: 'not_effective', label: '効果がなかった', color: 'bg-red-100 text-red-700' },
                                        { value: 'not_applicable', label: '該当なし', color: 'bg-gray-100 text-gray-600' }
                                    ].map(option => (
                                        <label key={option.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${currentData?.teacchEvaluation?.activitySystem?.effectiveness === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-gray-50 border'}`}>
                                            <input type="radio" name="activitySystem" value={option.value} checked={currentData?.teacchEvaluation?.activitySystem?.effectiveness === option.value} onChange={(e) => updateTeacchEvaluation('activitySystem', 'effectiveness', e.target.value)} className="sr-only" />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <textarea value={currentData?.teacchEvaluation?.activitySystem?.notes || ''} onChange={(e) => updateTeacchEvaluation('activitySystem', 'notes', e.target.value)} placeholder="具体的な気づきや改善点" className="w-full px-3 py-2 border rounded-lg text-sm" rows="2" />
                            </>
                        ) : (
                            <div className="bg-gray-50 p-2 rounded border text-sm">
                                <p>評価: {currentData?.teacchEvaluation?.activitySystem?.effectiveness === 'effective' ? '効果的だった' : currentData?.teacchEvaluation?.activitySystem?.effectiveness === 'partially' ? '部分的に効果あり' : currentData?.teacchEvaluation?.activitySystem?.effectiveness === 'not_effective' ? '効果がなかった' : currentData?.teacchEvaluation?.activitySystem?.effectiveness === 'not_applicable' ? '該当なし' : '（未評価）'}</p>
                                {currentData?.teacchEvaluation?.activitySystem?.notes && <p className="mt-1">メモ: {currentData.teacchEvaluation.activitySystem.notes}</p>}
                            </div>
                        )}
                    </div>

                    {/* 視覚的構造化 */}
                    <div className="bg-white p-3 rounded-lg border">
                        <label className="block text-sm font-bold text-gray-700 mb-2">👁️ 視覚的構造化（視覚的手がかり）</label>
                        <p className="text-xs text-gray-500 mb-2">視覚的指示、色分け、写真・イラスト、文字の使用など</p>
                        {isEditing ? (
                            <>
                                <div className="flex flex-wrap gap-3 mb-2">
                                    {[
                                        { value: 'effective', label: '効果的だった', color: 'bg-green-100 text-green-700' },
                                        { value: 'partially', label: '部分的に効果あり', color: 'bg-yellow-100 text-yellow-700' },
                                        { value: 'not_effective', label: '効果がなかった', color: 'bg-red-100 text-red-700' },
                                        { value: 'not_applicable', label: '該当なし', color: 'bg-gray-100 text-gray-600' }
                                    ].map(option => (
                                        <label key={option.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${currentData?.teacchEvaluation?.visualStructure?.effectiveness === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-gray-50 border'}`}>
                                            <input type="radio" name="visualStructure" value={option.value} checked={currentData?.teacchEvaluation?.visualStructure?.effectiveness === option.value} onChange={(e) => updateTeacchEvaluation('visualStructure', 'effectiveness', e.target.value)} className="sr-only" />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <textarea value={currentData?.teacchEvaluation?.visualStructure?.notes || ''} onChange={(e) => updateTeacchEvaluation('visualStructure', 'notes', e.target.value)} placeholder="具体的な気づきや改善点" className="w-full px-3 py-2 border rounded-lg text-sm" rows="2" />
                            </>
                        ) : (
                            <div className="bg-gray-50 p-2 rounded border text-sm">
                                <p>評価: {currentData?.teacchEvaluation?.visualStructure?.effectiveness === 'effective' ? '効果的だった' : currentData?.teacchEvaluation?.visualStructure?.effectiveness === 'partially' ? '部分的に効果あり' : currentData?.teacchEvaluation?.visualStructure?.effectiveness === 'not_effective' ? '効果がなかった' : currentData?.teacchEvaluation?.visualStructure?.effectiveness === 'not_applicable' ? '該当なし' : '（未評価）'}</p>
                                {currentData?.teacchEvaluation?.visualStructure?.notes && <p className="mt-1">メモ: {currentData.teacchEvaluation.visualStructure.notes}</p>}
                            </div>
                        )}
                    </div>

                    {/* ルーチン */}
                    <div className="bg-white p-3 rounded-lg border">
                        <label className="block text-sm font-bold text-gray-700 mb-2">🔄 ルーチン（決まった手順）</label>
                        <p className="text-xs text-gray-500 mb-2">毎回同じ手順で行うこと、一貫性、予測可能性</p>
                        {isEditing ? (
                            <>
                                <div className="flex flex-wrap gap-3 mb-2">
                                    {[
                                        { value: 'effective', label: '効果的だった', color: 'bg-green-100 text-green-700' },
                                        { value: 'partially', label: '部分的に効果あり', color: 'bg-yellow-100 text-yellow-700' },
                                        { value: 'not_effective', label: '効果がなかった', color: 'bg-red-100 text-red-700' },
                                        { value: 'not_applicable', label: '該当なし', color: 'bg-gray-100 text-gray-600' }
                                    ].map(option => (
                                        <label key={option.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${currentData?.teacchEvaluation?.routine?.effectiveness === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-gray-50 border'}`}>
                                            <input type="radio" name="routine" value={option.value} checked={currentData?.teacchEvaluation?.routine?.effectiveness === option.value} onChange={(e) => updateTeacchEvaluation('routine', 'effectiveness', e.target.value)} className="sr-only" />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <textarea value={currentData?.teacchEvaluation?.routine?.notes || ''} onChange={(e) => updateTeacchEvaluation('routine', 'notes', e.target.value)} placeholder="具体的な気づきや改善点" className="w-full px-3 py-2 border rounded-lg text-sm" rows="2" />
                            </>
                        ) : (
                            <div className="bg-gray-50 p-2 rounded border text-sm">
                                <p>評価: {currentData?.teacchEvaluation?.routine?.effectiveness === 'effective' ? '効果的だった' : currentData?.teacchEvaluation?.routine?.effectiveness === 'partially' ? '部分的に効果あり' : currentData?.teacchEvaluation?.routine?.effectiveness === 'not_effective' ? '効果がなかった' : currentData?.teacchEvaluation?.routine?.effectiveness === 'not_applicable' ? '該当なし' : '（未評価）'}</p>
                                {currentData?.teacchEvaluation?.routine?.notes && <p className="mt-1">メモ: {currentData.teacchEvaluation.routine.notes}</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 手順書との比較 */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">4</span>
                    手順書との比較
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">手順書通りに実践できたか</label>
                        {isEditing ? (
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { value: 'fully', label: '完全に手順書通り' },
                                    { value: 'partially', label: '一部変更あり' },
                                    { value: 'not', label: '大幅に変更した' }
                                ].map(option => (
                                    <label key={option.value} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="followedProcedure"
                                            value={option.value}
                                            checked={currentData?.procedureComparison?.followedProcedure === option.value}
                                            onChange={(e) => updateProcedureComparison('followedProcedure', e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-3 rounded border">
                                {currentData?.procedureComparison?.followedProcedure === 'fully' ? '完全に手順書通り' :
                                 currentData?.procedureComparison?.followedProcedure === 'partially' ? '一部変更あり' :
                                 currentData?.procedureComparison?.followedProcedure === 'not' ? '大幅に変更した' : '（未選択）'}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">変更・逸脱した内容</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.procedureComparison?.deviations || ''}
                                onChange={(e) => updateProcedureComparison('deviations', e.target.value)}
                                placeholder="例：手順3と4の順番を入れ替えた"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.procedureComparison?.deviations || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">変更した理由</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.procedureComparison?.deviationReasons || ''}
                                onChange={(e) => updateProcedureComparison('deviationReasons', e.target.value)}
                                placeholder="例：ご利用者の様子を見て、先に4を行った方がスムーズだと判断した"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.procedureComparison?.deviationReasons || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 効果の評価 */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
                    <span className="bg-yellow-600 text-white px-2 py-1 rounded text-sm">5</span>
                    効果の評価
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">⭐ 全体的な効果</label>
                        {isEditing ? (
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { value: 'very_effective', label: 'とても効果的だった', color: 'bg-green-100 text-green-700' },
                                    { value: 'somewhat_effective', label: 'ある程度効果があった', color: 'bg-blue-100 text-blue-700' },
                                    { value: 'not_effective', label: 'あまり効果がなかった', color: 'bg-yellow-100 text-yellow-700' },
                                    { value: 'negative', label: '逆効果だった', color: 'bg-red-100 text-red-700' },
                                    { value: 'unknown', label: '判断できない', color: 'bg-gray-100 text-gray-700' }
                                ].map(option => (
                                    <label key={option.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer ${currentData?.effectivenessEvaluation?.overallEffectiveness === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-white border'}`}>
                                        <input
                                            type="radio"
                                            name="overallEffectiveness"
                                            value={option.value}
                                            checked={currentData?.effectivenessEvaluation?.overallEffectiveness === option.value}
                                            onChange={(e) => updateEffectivenessEvaluation('overallEffectiveness', e.target.value)}
                                            className="sr-only"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-3 rounded border">
                                {currentData?.effectivenessEvaluation?.overallEffectiveness === 'very_effective' ? 'とても効果的だった' :
                                 currentData?.effectivenessEvaluation?.overallEffectiveness === 'somewhat_effective' ? 'ある程度効果があった' :
                                 currentData?.effectivenessEvaluation?.overallEffectiveness === 'not_effective' ? 'あまり効果がなかった' :
                                 currentData?.effectivenessEvaluation?.overallEffectiveness === 'negative' ? '逆効果だった' :
                                 currentData?.effectivenessEvaluation?.overallEffectiveness === 'unknown' ? '判断できない' : '（未選択）'}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ご利用者の取り組み度</label>
                            {isEditing ? (
                                <select
                                    value={currentData?.effectivenessEvaluation?.userEngagement || ''}
                                    onChange={(e) => updateEffectivenessEvaluation('userEngagement', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                >
                                    <option value="">選択してください</option>
                                    <option value="high">積極的に取り組んだ</option>
                                    <option value="medium">普通に取り組んだ</option>
                                    <option value="low">消極的だった</option>
                                </select>
                            ) : (
                                <div className="bg-white p-3 rounded border">
                                    {currentData?.effectivenessEvaluation?.userEngagement === 'high' ? '積極的に取り組んだ' :
                                     currentData?.effectivenessEvaluation?.userEngagement === 'medium' ? '普通に取り組んだ' :
                                     currentData?.effectivenessEvaluation?.userEngagement === 'low' ? '消極的だった' : '（未選択）'}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">スキルの習得度</label>
                            {isEditing ? (
                                <select
                                    value={currentData?.effectivenessEvaluation?.skillAcquisition || ''}
                                    onChange={(e) => updateEffectivenessEvaluation('skillAcquisition', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                >
                                    <option value="">選択してください</option>
                                    <option value="improved">向上した</option>
                                    <option value="same">変わらない</option>
                                    <option value="declined">低下した</option>
                                </select>
                            ) : (
                                <div className="bg-white p-3 rounded border">
                                    {currentData?.effectivenessEvaluation?.skillAcquisition === 'improved' ? '向上した' :
                                     currentData?.effectivenessEvaluation?.skillAcquisition === 'same' ? '変わらない' :
                                     currentData?.effectivenessEvaluation?.skillAcquisition === 'declined' ? '低下した' : '（未選択）'}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">具体的に改善した点</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.effectivenessEvaluation?.specificImprovements || ''}
                                onChange={(e) => updateEffectivenessEvaluation('specificImprovements', e.target.value)}
                                placeholder="例：声掛けなしでも歯ブラシを持てるようになった"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.effectivenessEvaluation?.specificImprovements || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">残る課題</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.effectivenessEvaluation?.remainingChallenges || ''}
                                onChange={(e) => updateEffectivenessEvaluation('remainingChallenges', e.target.value)}
                                placeholder="例：歯磨き粉の量の調整はまだサポートが必要"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.effectivenessEvaluation?.remainingChallenges || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 手順書の改善点 */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">6</span>
                    手順書の改善点
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={currentData?.procedureImprovements?.needsRevision || false}
                                onChange={(e) => updateProcedureImprovements('needsRevision', e.target.checked)}
                                disabled={!isEditing}
                                className="w-4 h-4"
                            />
                            <span className="text-sm font-medium text-gray-700">手順書の修正が必要</span>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">修正・追加したい内容</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.procedureImprovements?.suggestedChanges || ''}
                                onChange={(e) => updateProcedureImprovements('suggestedChanges', e.target.value)}
                                placeholder="例：手順3に「歯磨き粉の量は豆粒大」という説明を追加する"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="3"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.procedureImprovements?.suggestedChanges || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">追加で必要なサポート</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.procedureImprovements?.additionalSupports || ''}
                                onChange={(e) => updateProcedureImprovements('additionalSupports', e.target.value)}
                                placeholder="例：歯磨き粉の量を示す目印シールを準備する"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.procedureImprovements?.additionalSupports || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">環境の変更</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.procedureImprovements?.environmentalChanges || ''}
                                onChange={(e) => updateProcedureImprovements('environmentalChanges', e.target.value)}
                                placeholder="例：歯ブラシスタンドの位置を変更する"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.procedureImprovements?.environmentalChanges || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 次回への計画 */}
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h4 className="font-bold text-teal-800 mb-4 flex items-center gap-2">
                    <span className="bg-teal-600 text-white px-2 py-1 rounded text-sm">7</span>
                    次回への計画
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={currentData?.nextPlan?.continuePractice !== false}
                                onChange={(e) => updateNextPlan('continuePractice', e.target.checked)}
                                disabled={!isEditing}
                                className="w-4 h-4"
                            />
                            <span className="text-sm font-medium text-gray-700">この手順書での実践を継続する</span>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">次回の変更点・工夫</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.nextPlan?.modifications || ''}
                                onChange={(e) => updateNextPlan('modifications', e.target.value)}
                                placeholder="例：声掛けのタイミングを遅らせて、自発的な行動を待つ時間を増やす"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="3"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.nextPlan?.modifications || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">重点的に観察するポイント</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.nextPlan?.focusPoints || ''}
                                onChange={(e) => updateNextPlan('focusPoints', e.target.value)}
                                placeholder="例：歯磨き粉の量を自分で調整できるか"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.nextPlan?.focusPoints || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">次回実践予定</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={currentData?.nextPlan?.timeline || ''}
                                onChange={(e) => updateNextPlan('timeline', e.target.value)}
                                placeholder="例：来週月曜日から毎日実施"
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.nextPlan?.timeline || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 総合所見 */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">8</span>
                    総合所見
                </h4>
                {isEditing ? (
                    <textarea
                        value={currentData?.overallFindings || ''}
                        onChange={(e) => setCurrentData({ ...currentData, overallFindings: e.target.value })}
                        placeholder="今回の検証を通じての全体的な所見、今後の方針などを自由に記入してください"
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="4"
                    />
                ) : (
                    <div className="bg-white p-3 rounded border">{currentData?.overallFindings || '（記録なし）'}</div>
                )}
            </div>

            {/* 保存ボタン */}
            {isEditing && (
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); setSelectedPracticeId(null); }}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-md"
                    >
                        保存する
                    </button>
                </div>
            )}
        </div>
    );
};

// ==================== ご利用者との立ち位置の確認コンポーネント（⑫人からの刺激が苦手） ====================

export const PositionCheckComponent = ({ checkData = [], setCheckData, actionName }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list', 'edit', 'view'
    const [currentData, setCurrentData] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);

    const archives = checkData || [];

    const createDefaultData = () => ({
        id: Date.now(),
        checkDate: new Date().toISOString().split('T')[0],
        supporterName: '',
        targetUser: actionName || '',
        
        // 自己チェック項目
        selfCheck: {
            // 視線について
            eyeContact: {
                awareness: '', // 'always', 'sometimes', 'rarely', 'never'
                comfortLevel: '', // 視線を合わせることへの意識
                adjustments: '' // 工夫していること
            },
            // 立ち位置について
            positioning: {
                awareness: '', // 'always', 'sometimes', 'rarely', 'never'
                usualPosition: '', // 普段の立ち位置
                adjustments: '' // 工夫していること
            },
            // 距離感について
            distance: {
                awareness: '', // 'always', 'sometimes', 'rarely', 'never'
                usualDistance: '', // 普段の距離感
                adjustments: '' // 工夫していること
            },
            // 声のトーンについて
            voiceTone: {
                awareness: '', // 'always', 'sometimes', 'rarely', 'never'
                usualTone: '', // 普段の声のトーン
                adjustments: '' // 工夫していること
            }
        },
        
        // ご利用者の様子
        userObservation: {
            eyeContactReaction: '', // 視線を合わせた時の反応
            positionReaction: '', // 立ち位置による反応の違い
            comfortableSituations: '', // リラックスしている時の状況
            uncomfortableSituations: '' // 緊張している時の状況
        },
        
        // 気づき・反省点
        reflections: '',
        
        // 今後心がけたいこと
        futureActions: ''
    });

    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.checkDate) {
            alert('確認日を入力してください');
            return;
        }
        if (!currentData.supporterName) {
            alert('支援者名を入力してください');
            return;
        }

        const newArchives = selectedRecordId
            ? archives.map(a => a.id === selectedRecordId ? { ...currentData, id: selectedRecordId } : a)
            : [...archives, currentData];

        setCheckData(newArchives);
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('edit');
    };

    const handleView = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('view');
    };

    const handleDelete = (recordId) => {
        if (window.confirm('この記録を削除しますか？')) {
            setCheckData(archives.filter(a => a.id !== recordId));
        }
    };

    const updateSelfCheck = (category, field, value) => {
        setCurrentData(prev => ({
            ...prev,
            selfCheck: {
                ...prev.selfCheck,
                [category]: {
                    ...prev.selfCheck[category],
                    [field]: value
                }
            }
        }));
    };

    const updateUserObservation = (field, value) => {
        setCurrentData(prev => ({
            ...prev,
            userObservation: { ...prev.userObservation, [field]: value }
        }));
    };

    const awarenessOptions = [
        { value: 'always', label: 'いつも意識している', color: 'bg-green-100 text-green-700' },
        { value: 'sometimes', label: '時々意識している', color: 'bg-blue-100 text-blue-700' },
        { value: 'rarely', label: 'あまり意識していない', color: 'bg-yellow-100 text-yellow-700' },
        { value: 'never', label: '意識したことがない', color: 'bg-gray-100 text-gray-700' }
    ];

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">⑫ご利用者との立ち位置の確認</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            ASDの方は視線や人との距離に敏感な方が多くいらっしゃいます。
                        </p>
                        <p className="text-sm text-gray-600">
                            日頃の関わり方を振り返り、ご利用者が安心できる環境づくりを考えましょう。
                        </p>
                        {actionName && (
                            <p className="text-sm text-blue-600 mt-1">対象ご利用者: {actionName}</p>
                        )}
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        自己チェックを開始
                    </button>
                </div>

                {/* 説明カード */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-6">
                    <h4 className="font-bold text-indigo-800 mb-2">💡 視線や立ち位置について</h4>
                    <p className="text-sm text-indigo-700">
                        ASDの方の中には、他者からの視線を「刺さるように感じる」という方もいらっしゃいます。
                        私たちが何気なく行っている視線や立ち位置が、ご利用者にとっては大きなストレスになることもあります。
                        このチェックを通じて、日頃の関わり方を優しく振り返ってみましょう。
                    </p>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">まだ記録がありません。</p>
                        <p className="text-gray-400 text-sm mt-2">「自己チェックを開始」ボタンから始めましょう。</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {archives.map(record => (
                            <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">支援者: {record.supporterName}</p>
                                    <p className="text-sm text-gray-500">{record.checkDate}</p>
                                    {record.futureActions && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            今後: {record.futureActions.substring(0, 40)}...
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleView(record)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">閲覧</button>
                                    <button onClick={() => handleEdit(record)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">編集</button>
                                    <button onClick={() => handleDelete(record.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 編集・閲覧表示
    const isEditing = viewMode === 'edit';

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                    {isEditing ? (selectedRecordId ? '記録を編集' : '自己チェック') : '記録を閲覧'}
                </h3>
                <button
                    onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                    ← 一覧に戻る
                </button>
            </div>

            {/* 優しいメッセージ */}
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <p className="text-indigo-800 text-sm">
                    🌸 このチェックは、ご利用者が安心して過ごせる環境を作るためのものです。
                    正解や不正解はありません。日頃の自分を振り返る機会としてお使いください。
                </p>
            </div>

            {/* 基本情報 */}
            <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 mb-4">基本情報</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">確認日 <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            value={currentData?.checkDate || ''}
                            onChange={(e) => setCurrentData({ ...currentData, checkDate: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">支援者名 <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={currentData?.supporterName || ''}
                            onChange={(e) => setCurrentData({ ...currentData, supporterName: e.target.value })}
                            disabled={!isEditing}
                            placeholder="あなたのお名前"
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">対象ご利用者</label>
                        <input
                            type="text"
                            value={currentData?.targetUser || ''}
                            onChange={(e) => setCurrentData({ ...currentData, targetUser: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* 視線について */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">👀</span>
                    視線について振り返ってみましょう
                </h4>
                <p className="text-sm text-blue-700 mb-4">
                    視線を合わせることは、私たちにとっては自然なことですが、
                    ご利用者によっては大きな負担になることがあります。
                </p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ご利用者と接する時、視線について意識していますか？
                        </label>
                        {isEditing ? (
                            <div className="flex flex-wrap gap-2">
                                {awarenessOptions.map(option => (
                                    <label key={option.value} className={`inline-flex items-center px-3 py-2 rounded cursor-pointer ${currentData?.selfCheck?.eyeContact?.awareness === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-white border'}`}>
                                        <input
                                            type="radio"
                                            name="eyeContactAwareness"
                                            value={option.value}
                                            checked={currentData?.selfCheck?.eyeContact?.awareness === option.value}
                                            onChange={(e) => updateSelfCheck('eyeContact', 'awareness', e.target.value)}
                                            className="sr-only"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-3 rounded border">
                                {awarenessOptions.find(o => o.value === currentData?.selfCheck?.eyeContact?.awareness)?.label || '（未選択）'}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            視線について、普段どのように心がけていますか？
                        </label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.selfCheck?.eyeContact?.adjustments || ''}
                                onChange={(e) => updateSelfCheck('eyeContact', 'adjustments', e.target.value)}
                                placeholder="例：正面から見つめすぎないようにしている、横並びで話すようにしている など"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.selfCheck?.eyeContact?.adjustments || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 立ち位置について */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">🧍</span>
                    立ち位置について振り返ってみましょう
                </h4>
                <p className="text-sm text-green-700 mb-4">
                    正面に立つことがプレッシャーになることがあります。
                    斜め前や横並びの方が安心できる方もいらっしゃいます。
                </p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ご利用者と接する時、立ち位置について意識していますか？
                        </label>
                        {isEditing ? (
                            <div className="flex flex-wrap gap-2">
                                {awarenessOptions.map(option => (
                                    <label key={option.value} className={`inline-flex items-center px-3 py-2 rounded cursor-pointer ${currentData?.selfCheck?.positioning?.awareness === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-white border'}`}>
                                        <input
                                            type="radio"
                                            name="positioningAwareness"
                                            value={option.value}
                                            checked={currentData?.selfCheck?.positioning?.awareness === option.value}
                                            onChange={(e) => updateSelfCheck('positioning', 'awareness', e.target.value)}
                                            className="sr-only"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-3 rounded border">
                                {awarenessOptions.find(o => o.value === currentData?.selfCheck?.positioning?.awareness)?.label || '（未選択）'}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            普段はどのような立ち位置で接していますか？
                        </label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.selfCheck?.positioning?.usualPosition || ''}
                                onChange={(e) => updateSelfCheck('positioning', 'usualPosition', e.target.value)}
                                placeholder="例：正面から話しかけることが多い、横に並んで話すようにしている など"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.selfCheck?.positioning?.usualPosition || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            立ち位置について、工夫していることはありますか？
                        </label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.selfCheck?.positioning?.adjustments || ''}
                                onChange={(e) => updateSelfCheck('positioning', 'adjustments', e.target.value)}
                                placeholder="例：威圧感を与えないよう少し離れて立つ、座って目線を合わせる など"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.selfCheck?.positioning?.adjustments || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 距離感について */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">↔️</span>
                    距離感について振り返ってみましょう
                </h4>
                <p className="text-sm text-yellow-700 mb-4">
                    パーソナルスペースの感じ方は人それぞれです。
                    近すぎると緊張される方もいらっしゃいます。
                </p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ご利用者との距離感について意識していますか？
                        </label>
                        {isEditing ? (
                            <div className="flex flex-wrap gap-2">
                                {awarenessOptions.map(option => (
                                    <label key={option.value} className={`inline-flex items-center px-3 py-2 rounded cursor-pointer ${currentData?.selfCheck?.distance?.awareness === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-white border'}`}>
                                        <input
                                            type="radio"
                                            name="distanceAwareness"
                                            value={option.value}
                                            checked={currentData?.selfCheck?.distance?.awareness === option.value}
                                            onChange={(e) => updateSelfCheck('distance', 'awareness', e.target.value)}
                                            className="sr-only"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-3 rounded border">
                                {awarenessOptions.find(o => o.value === currentData?.selfCheck?.distance?.awareness)?.label || '（未選択）'}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            距離感について、工夫していることはありますか？
                        </label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.selfCheck?.distance?.adjustments || ''}
                                onChange={(e) => updateSelfCheck('distance', 'adjustments', e.target.value)}
                                placeholder="例：急に近づかないようにしている、ご利用者が後ずさりしたら離れるようにしている など"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.selfCheck?.distance?.adjustments || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 声のトーンについて */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">🗣️</span>
                    声のトーンについて振り返ってみましょう
                </h4>
                <p className="text-sm text-purple-700 mb-4">
                    声の大きさやトーンも刺激になることがあります。
                    穏やかな声かけを心がけていますか？
                </p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            声のトーンについて意識していますか？
                        </label>
                        {isEditing ? (
                            <div className="flex flex-wrap gap-2">
                                {awarenessOptions.map(option => (
                                    <label key={option.value} className={`inline-flex items-center px-3 py-2 rounded cursor-pointer ${currentData?.selfCheck?.voiceTone?.awareness === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-white border'}`}>
                                        <input
                                            type="radio"
                                            name="voiceToneAwareness"
                                            value={option.value}
                                            checked={currentData?.selfCheck?.voiceTone?.awareness === option.value}
                                            onChange={(e) => updateSelfCheck('voiceTone', 'awareness', e.target.value)}
                                            className="sr-only"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-3 rounded border">
                                {awarenessOptions.find(o => o.value === currentData?.selfCheck?.voiceTone?.awareness)?.label || '（未選択）'}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            声について、工夫していることはありますか？
                        </label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.selfCheck?.voiceTone?.adjustments || ''}
                                onChange={(e) => updateSelfCheck('voiceTone', 'adjustments', e.target.value)}
                                placeholder="例：穏やかなトーンで話すようにしている、急に大きな声を出さないようにしている など"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.selfCheck?.voiceTone?.adjustments || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* ご利用者の様子 */}
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h4 className="font-bold text-teal-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">👁️</span>
                    ご利用者の様子を思い出してみましょう
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            視線を合わせた時、ご利用者はどのような反応をされますか？
                        </label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.userObservation?.eyeContactReaction || ''}
                                onChange={(e) => updateUserObservation('eyeContactReaction', e.target.value)}
                                placeholder="例：目をそらされる、体を硬くされる、特に反応はない など"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.userObservation?.eyeContactReaction || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            立ち位置によって反応に違いはありますか？
                        </label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.userObservation?.positionReaction || ''}
                                onChange={(e) => updateUserObservation('positionReaction', e.target.value)}
                                placeholder="例：正面だと緊張される、横並びだとリラックスされる など"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.userObservation?.positionReaction || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ご利用者がリラックスしているのはどのような時ですか？
                        </label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.userObservation?.comfortableSituations || ''}
                                onChange={(e) => updateUserObservation('comfortableSituations', e.target.value)}
                                placeholder="例：一人でいる時、少人数の時、好きな活動をしている時 など"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.userObservation?.comfortableSituations || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ご利用者が緊張しているのはどのような時ですか？
                        </label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.userObservation?.uncomfortableSituations || ''}
                                onChange={(e) => updateUserObservation('uncomfortableSituations', e.target.value)}
                                placeholder="例：大勢の人がいる時、知らない人がいる時、注目されている時 など"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.userObservation?.uncomfortableSituations || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 気づき・反省点 */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">💭</span>
                    振り返ってみて、気づいたことはありますか？
                </h4>
                {isEditing ? (
                    <textarea
                        value={currentData?.reflections || ''}
                        onChange={(e) => setCurrentData({ ...currentData, reflections: e.target.value })}
                        placeholder="このチェックを通じて気づいたこと、反省点などを自由に書いてください"
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="4"
                    />
                ) : (
                    <div className="bg-white p-3 rounded border">{currentData?.reflections || '（記録なし）'}</div>
                )}
            </div>

            {/* 今後心がけたいこと */}
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h4 className="font-bold text-pink-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">🌟</span>
                    今後、心がけていきたいことはありますか？
                </h4>
                {isEditing ? (
                    <textarea
                        value={currentData?.futureActions || ''}
                        onChange={(e) => setCurrentData({ ...currentData, futureActions: e.target.value })}
                        placeholder="これからの関わり方で意識していきたいことを書いてください"
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="4"
                    />
                ) : (
                    <div className="bg-white p-3 rounded border">{currentData?.futureActions || '（記録なし）'}</div>
                )}
            </div>

            {/* 保存ボタン */}
            {isEditing && (
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
                    >
                        保存する
                    </button>
                </div>
            )}
        </div>
    );
};

// ==================== 実践の検証コンポーネント（⑬人からの刺激が苦手） ====================

export const StimulusVerificationComponent = ({ verificationData = [], setVerificationData, positionCheckData = [], actionName }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list', 'edit', 'view'
    const [currentData, setCurrentData] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);

    const archives = verificationData || [];

    const createDefaultData = () => ({
        id: Date.now(),
        verificationDate: new Date().toISOString().split('T')[0],
        verifier: '',
        targetUser: actionName || '',
        observationPeriod: '', // 観察期間
        
        // 実践した内容
        practiceDetails: {
            eyeContactChanges: '', // 視線に関する工夫
            positioningChanges: '', // 立ち位置に関する工夫
            distanceChanges: '', // 距離感に関する工夫
            voiceChanges: '', // 声に関する工夫
            otherChanges: '' // その他の工夫
        },
        
        // 行動の変化
        behaviorChanges: {
            // 緊張・不安に関する変化
            tensionChanges: {
                before: '',
                after: '',
                changeLevel: '' // 'improved', 'same', 'worsened'
            },
            // その他の変化
            otherChanges: {
                description: '',
                changeLevel: ''
            }
        },
        
        // 効果があった工夫
        effectivePractices: '',
        
        // 効果がなかった・逆効果だった工夫
        ineffectivePractices: '',
        
        // 新たに気づいたこと
        newFindings: '',
        
        // 今後の方針
        futurePolicy: {
            continuePractices: '', // 続けていくこと
            newTries: '', // 新しく試すこと
            stopPractices: '' // やめること
        },
        
        // 総合評価
        overallEvaluation: '', // 'very_effective', 'somewhat_effective', 'no_change', 'negative'
        overallComment: ''
    });

    const handleCreateNew = () => {
        setCurrentData(createDefaultData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.verificationDate) {
            alert('検証日を入力してください');
            return;
        }
        if (!currentData.verifier) {
            alert('検証者を入力してください');
            return;
        }

        const newArchives = selectedRecordId
            ? archives.map(a => a.id === selectedRecordId ? { ...currentData, id: selectedRecordId } : a)
            : [...archives, currentData];

        setVerificationData(newArchives);
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('edit');
    };

    const handleView = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('view');
    };

    const handleDelete = (recordId) => {
        if (window.confirm('この検証記録を削除しますか？')) {
            setVerificationData(archives.filter(a => a.id !== recordId));
        }
    };

    const updatePracticeDetails = (field, value) => {
        setCurrentData(prev => ({
            ...prev,
            practiceDetails: { ...prev.practiceDetails, [field]: value }
        }));
    };

    const updateBehaviorChanges = (category, field, value) => {
        setCurrentData(prev => ({
            ...prev,
            behaviorChanges: {
                ...prev.behaviorChanges,
                [category]: {
                    ...prev.behaviorChanges[category],
                    [field]: value
                }
            }
        }));
    };

    const updateFuturePolicy = (field, value) => {
        setCurrentData(prev => ({
            ...prev,
            futurePolicy: { ...prev.futurePolicy, [field]: value }
        }));
    };

    // ⑫のデータから工夫内容を自動入力する関数
    const autoFillFromPositionCheck = (verifierName) => {
        if (!verifierName || !positionCheckData || positionCheckData.length === 0) return;
        
        // 同じ支援者名のレコードを検索（最新のものを優先）
        const matchingRecord = [...positionCheckData]
            .reverse()
            .find(record => record.supporterName === verifierName);
        
        if (matchingRecord && matchingRecord.selfCheck) {
            setCurrentData(prev => ({
                ...prev,
                verifier: verifierName,
                practiceDetails: {
                    ...prev.practiceDetails,
                    eyeContactChanges: matchingRecord.selfCheck.eyeContact?.adjustments || prev.practiceDetails?.eyeContactChanges || '',
                    positioningChanges: matchingRecord.selfCheck.positioning?.adjustments || prev.practiceDetails?.positioningChanges || '',
                    distanceChanges: matchingRecord.selfCheck.distance?.adjustments || prev.practiceDetails?.distanceChanges || '',
                    voiceChanges: matchingRecord.selfCheck.voiceTone?.adjustments || prev.practiceDetails?.voiceChanges || '',
                    otherChanges: prev.practiceDetails?.otherChanges || ''
                },
                autoFilledFrom: matchingRecord.checkDate // 自動入力元の日付を記録
            }));
            return true;
        }
        return false;
    };

    // 検証者名変更時のハンドラー
    const handleVerifierChange = (verifierName) => {
        const autoFilled = autoFillFromPositionCheck(verifierName);
        if (!autoFilled) {
            setCurrentData(prev => ({ ...prev, verifier: verifierName, autoFilledFrom: null }));
        }
    };

    const changeLevelOptions = [
        { value: 'improved', label: '改善した', color: 'bg-green-100 text-green-700' },
        { value: 'same', label: '変わらない', color: 'bg-gray-100 text-gray-700' },
        { value: 'worsened', label: '悪化した', color: 'bg-red-100 text-red-700' }
    ];

    const overallOptions = [
        { value: 'very_effective', label: 'とても効果があった', color: 'bg-green-100 text-green-700' },
        { value: 'somewhat_effective', label: '少し効果があった', color: 'bg-blue-100 text-blue-700' },
        { value: 'no_change', label: '変化なし', color: 'bg-gray-100 text-gray-700' },
        { value: 'negative', label: '逆効果だった', color: 'bg-red-100 text-red-700' }
    ];

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">⑬実践の検証</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            視線や立ち位置に関する工夫を実践した結果、ご利用者の行動にどのような変化があったかを記録します。
                        </p>
                        {actionName && (
                            <p className="text-sm text-blue-600 mt-1">対象ご利用者: {actionName}</p>
                        )}
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        新規検証を作成
                    </button>
                </div>

                {/* ⑫の記録がある場合は表示 */}
                {positionCheckData && positionCheckData.length > 0 && (
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-6">
                        <h4 className="font-bold text-indigo-800 mb-2">📋 ⑫で記録した自己チェック</h4>
                        <p className="text-sm text-indigo-700 mb-2">これまでの自己チェック記録: {positionCheckData.length}件</p>
                        <div className="text-xs text-indigo-600">
                            最新の記録: {positionCheckData[positionCheckData.length - 1]?.checkDate} - {positionCheckData[positionCheckData.length - 1]?.supporterName}
                        </div>
                    </div>
                )}

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">まだ検証記録がありません。</p>
                        <p className="text-gray-400 text-sm mt-2">「新規検証を作成」ボタンから記録を始めましょう。</p>
                        {positionCheckData.length === 0 && (
                            <p className="text-orange-500 text-sm mt-4">※先に⑫ご利用者との立ち位置の確認で自己チェックを行うことをお勧めします。</p>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {archives.map(record => (
                            <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">検証者: {record.verifier}</p>
                                    <p className="text-sm text-gray-500">{record.verificationDate} （観察期間: {record.observationPeriod || '未設定'}）</p>
                                    {record.overallEvaluation && (
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
                                            overallOptions.find(o => o.value === record.overallEvaluation)?.color || 'bg-gray-100'
                                        }`}>
                                            {overallOptions.find(o => o.value === record.overallEvaluation)?.label || ''}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleView(record)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">閲覧</button>
                                    <button onClick={() => handleEdit(record)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">編集</button>
                                    <button onClick={() => handleDelete(record.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 編集・閲覧表示
    const isEditing = viewMode === 'edit';

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                    {isEditing ? (selectedRecordId ? '検証記録を編集' : '新規検証記録を作成') : '検証記録を閲覧'}
                </h3>
                <button
                    onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                    ← 一覧に戻る
                </button>
            </div>

            {/* 基本情報 */}
            <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 mb-4">基本情報</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">検証日 <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            value={currentData?.verificationDate || ''}
                            onChange={(e) => setCurrentData({ ...currentData, verificationDate: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">検証者 <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={currentData?.verifier || ''}
                            onChange={(e) => handleVerifierChange(e.target.value)}
                            onBlur={(e) => handleVerifierChange(e.target.value)}
                            disabled={!isEditing}
                            placeholder="あなたのお名前"
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {positionCheckData && positionCheckData.length > 0 && isEditing && (
                            <p className="text-xs text-gray-500 mt-1">
                                ⑫で記録した支援者名と同じ名前を入力すると、工夫内容が自動入力されます
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">観察期間</label>
                        <input
                            type="text"
                            value={currentData?.observationPeriod || ''}
                            onChange={(e) => setCurrentData({ ...currentData, observationPeriod: e.target.value })}
                            disabled={!isEditing}
                            placeholder="例: 2週間"
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* 実践した内容 */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">🔧</span>
                    どのような工夫を実践しましたか？
                </h4>
                
                {/* 自動入力メッセージ */}
                {currentData?.autoFilledFrom && (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4">
                        <p className="text-sm text-green-800">
                            ✅ ⑫ご利用者との立ち位置の確認（{currentData.autoFilledFrom}）で記録した工夫内容を自動入力しました。必要に応じて修正・追記してください。
                        </p>
                    </div>
                )}
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">👀 視線に関する工夫</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceDetails?.eyeContactChanges || ''}
                                onChange={(e) => updatePracticeDetails('eyeContactChanges', e.target.value)}
                                placeholder="例: 正面から見つめすぎないようにした、横並びで話すようにした"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.practiceDetails?.eyeContactChanges || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">🧍 立ち位置に関する工夫</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceDetails?.positioningChanges || ''}
                                onChange={(e) => updatePracticeDetails('positioningChanges', e.target.value)}
                                placeholder="例: 斜め前から話しかけるようにした、威圧感を与えない位置を意識した"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.practiceDetails?.positioningChanges || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">↔️ 距離感に関する工夫</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceDetails?.distanceChanges || ''}
                                onChange={(e) => updatePracticeDetails('distanceChanges', e.target.value)}
                                placeholder="例: 少し離れた位置から声をかけるようにした"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.practiceDetails?.distanceChanges || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">🗣️ 声に関する工夫</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceDetails?.voiceChanges || ''}
                                onChange={(e) => updatePracticeDetails('voiceChanges', e.target.value)}
                                placeholder="例: 穏やかなトーンで話すようにした、声の大きさを控えめにした"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.practiceDetails?.voiceChanges || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">📝 その他の工夫</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.practiceDetails?.otherChanges || ''}
                                onChange={(e) => updatePracticeDetails('otherChanges', e.target.value)}
                                placeholder="その他に実践した工夫があれば記入してください"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.practiceDetails?.otherChanges || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 行動の変化 */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    ご利用者の行動の変化
                </h4>
                
                {/* 緊張・不安の変化 */}
                <div className="bg-white p-4 rounded-lg mb-4">
                    <h5 className="font-medium text-gray-800 mb-3">😰 緊張・不安に関する変化</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">実践前の様子</label>
                            {isEditing ? (
                                <textarea
                                    value={currentData?.behaviorChanges?.tensionChanges?.before || ''}
                                    onChange={(e) => updateBehaviorChanges('tensionChanges', 'before', e.target.value)}
                                    placeholder="例: 支援者が近づくと体を硬くしていた"
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    rows="2"
                                />
                            ) : (
                                <div className="bg-gray-50 p-2 rounded border text-sm">{currentData?.behaviorChanges?.tensionChanges?.before || '（記録なし）'}</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">実践後の様子</label>
                            {isEditing ? (
                                <textarea
                                    value={currentData?.behaviorChanges?.tensionChanges?.after || ''}
                                    onChange={(e) => updateBehaviorChanges('tensionChanges', 'after', e.target.value)}
                                    placeholder="例: 緊張する場面が減った"
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    rows="2"
                                />
                            ) : (
                                <div className="bg-gray-50 p-2 rounded border text-sm">{currentData?.behaviorChanges?.tensionChanges?.after || '（記録なし）'}</div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">変化の程度</label>
                        {isEditing ? (
                            <div className="flex flex-wrap gap-2">
                                {changeLevelOptions.map(option => (
                                    <label key={option.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${currentData?.behaviorChanges?.tensionChanges?.changeLevel === option.value ? option.color + ' ring-2' : 'bg-white border'}`}>
                                        <input
                                            type="radio"
                                            name="tensionChangeLevel"
                                            value={option.value}
                                            checked={currentData?.behaviorChanges?.tensionChanges?.changeLevel === option.value}
                                            onChange={(e) => updateBehaviorChanges('tensionChanges', 'changeLevel', e.target.value)}
                                            className="sr-only"
                                        />
                                        <span>{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 p-2 rounded border text-sm">
                                {changeLevelOptions.find(o => o.value === currentData?.behaviorChanges?.tensionChanges?.changeLevel)?.label || '（未選択）'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 効果のまとめ */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    効果のまとめ
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">✅ 効果があった工夫</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.effectivePractices || ''}
                                onChange={(e) => setCurrentData({ ...currentData, effectivePractices: e.target.value })}
                                placeholder="うまくいった工夫を記入してください"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="3"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.effectivePractices || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">❌ 効果がなかった・逆効果だった工夫</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.ineffectivePractices || ''}
                                onChange={(e) => setCurrentData({ ...currentData, ineffectivePractices: e.target.value })}
                                placeholder="うまくいかなかった工夫を記入してください"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="3"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.ineffectivePractices || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">💡 新たに気づいたこと</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.newFindings || ''}
                                onChange={(e) => setCurrentData({ ...currentData, newFindings: e.target.value })}
                                placeholder="実践を通じて新たに気づいたことを記入してください"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="3"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.newFindings || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 今後の方針 */}
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h4 className="font-bold text-teal-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    今後の方針
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">➡️ 続けていくこと</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.futurePolicy?.continuePractices || ''}
                                onChange={(e) => updateFuturePolicy('continuePractices', e.target.value)}
                                placeholder="効果があったので続けていく工夫"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.futurePolicy?.continuePractices || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">🆕 新しく試すこと</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.futurePolicy?.newTries || ''}
                                onChange={(e) => updateFuturePolicy('newTries', e.target.value)}
                                placeholder="新たに試してみたい工夫"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.futurePolicy?.newTries || '（記録なし）'}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">🚫 やめること</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.futurePolicy?.stopPractices || ''}
                                onChange={(e) => updateFuturePolicy('stopPractices', e.target.value)}
                                placeholder="効果がなかった、または逆効果だったのでやめる工夫"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.futurePolicy?.stopPractices || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 総合評価 */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">⭐</span>
                    総合評価
                </h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">全体的な効果</label>
                        {isEditing ? (
                            <div className="flex flex-wrap gap-2">
                                {overallOptions.map(option => (
                                    <label key={option.value} className={`inline-flex items-center px-4 py-2 rounded cursor-pointer ${currentData?.overallEvaluation === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-white border'}`}>
                                        <input
                                            type="radio"
                                            name="overallEvaluation"
                                            value={option.value}
                                            checked={currentData?.overallEvaluation === option.value}
                                            onChange={(e) => setCurrentData({ ...currentData, overallEvaluation: e.target.value })}
                                            className="sr-only"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-3 rounded border">
                                {overallOptions.find(o => o.value === currentData?.overallEvaluation)?.label || '（未選択）'}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">総合コメント</label>
                        {isEditing ? (
                            <textarea
                                value={currentData?.overallComment || ''}
                                onChange={(e) => setCurrentData({ ...currentData, overallComment: e.target.value })}
                                placeholder="全体を通しての感想や今後への意気込みなど"
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="4"
                            />
                        ) : (
                            <div className="bg-white p-3 rounded border">{currentData?.overallComment || '（記録なし）'}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 保存ボタン */}
            {isEditing && (
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md"
                    >
                        保存する
                    </button>
                </div>
            )}
        </div>
    );
};

// ⑫刺激を軽減するツールの捜索コンポーネント（感覚過敏）
export const SensoryToolSearchComponent = ({ searchData = [], setSearchData, actionName }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list', 'edit', 'view'
    const [currentData, setCurrentData] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);

    const archives = searchData || [];

    // 感覚の種類
    const sensoryTypes = [
        { 
            id: 'visual', 
            name: '視覚', 
            icon: '👁️', 
            color: 'blue',
            examples: '光のまぶしさ、蛍光灯のチラつき、動くもの、特定の色や模様',
            tools: ['サングラス', '帽子', '間仕切り・パーティション', '照明の調整', 'カーテン', '視覚的に落ち着く場所の確保']
        },
        { 
            id: 'auditory', 
            name: '聴覚', 
            icon: '👂', 
            color: 'purple',
            examples: '大きな音、特定の音（機械音、話し声など）、突然の音、BGM',
            tools: ['イヤーマフ', '耳栓', 'ノイズキャンセリングイヤホン', '静かな場所の確保', '事前の音の予告']
        },
        { 
            id: 'tactile', 
            name: '触覚', 
            icon: '✋', 
            color: 'green',
            examples: '特定の素材の肌触り、タグや縫い目、人との接触、温度',
            tools: ['好みの素材の衣類', 'タグを取り除く', '重みのあるブランケット', '圧迫ベスト', '手触りの良いグッズ']
        },
        { 
            id: 'olfactory', 
            name: '嗅覚', 
            icon: '👃', 
            color: 'yellow',
            examples: '香水、洗剤の匂い、食べ物の匂い、特定の場所の匂い',
            tools: ['マスク', '好みの香りのグッズ', '換気の工夫', '匂いの少ない製品への変更', '別の場所での活動']
        },
        { 
            id: 'gustatory', 
            name: '味覚', 
            icon: '👅', 
            color: 'red',
            examples: '特定の食感、温度、味の強さ、混ざった味',
            tools: ['食事の温度調整', '食感の調整', '個別の盛り付け', '慣れた食器の使用', '新しい食べ物の段階的な導入']
        },
        { 
            id: 'vestibular', 
            name: '前庭覚（動き・バランス）', 
            icon: '🎢', 
            color: 'indigo',
            examples: '乗り物酔い、高い場所、揺れ、回転',
            tools: ['ゆっくりとした動き', '安定した姿勢の確保', 'バランスボール', '揺れる椅子', '事前の予告']
        },
        { 
            id: 'proprioceptive', 
            name: '固有受容覚（体の感覚）', 
            icon: '🏋️', 
            color: 'teal',
            examples: '体の位置がわかりにくい、力加減が難しい、じっとしていられない',
            tools: ['重いものを持つ活動', '押す・引く活動', '重みのあるひざ掛け', 'ストレッチ', '体を動かす休憩時間']
        }
    ];

    // 苦手度のオプション
    const sensitivityLevels = [
        { value: 'none', label: '該当なし', color: 'bg-gray-100 text-gray-600' },
        { value: 'mild', label: '少し苦手', color: 'bg-yellow-100 text-yellow-700' },
        { value: 'moderate', label: 'かなり苦手', color: 'bg-orange-100 text-orange-700' },
        { value: 'severe', label: 'とても苦手', color: 'bg-red-100 text-red-700' }
    ];

    const createEmptyData = () => ({
        id: Date.now(),
        searchDate: new Date().toISOString().split('T')[0],
        recorder: '',
        // 各感覚の情報
        sensoryAssessment: sensoryTypes.reduce((acc, type) => {
            acc[type.id] = {
                sensitivityLevel: 'none',
                specificTriggers: '', // 具体的に苦手な刺激
                situations: '', // 困っている場面
                currentCoping: '', // 現在の対処法
                consideredTools: [], // 検討するツール（チェックボックス）
                otherTools: '', // その他のツール案
                notes: '' // メモ
            };
            return acc;
        }, {}),
        // 優先的に試すツール
        priorityTools: [
            { tool: '', reason: '', expectedEffect: '' },
            { tool: '', reason: '', expectedEffect: '' },
            { tool: '', reason: '', expectedEffect: '' }
        ],
        // 全体メモ
        overallNotes: ''
    });

    const handleCreateNew = () => {
        setCurrentData(createEmptyData());
        setSelectedRecordId(null);
        setViewMode('edit');
    };

    const handleSave = () => {
        if (!currentData.searchDate) {
            alert('捜索日を入力してください');
            return;
        }
        if (!currentData.recorder) {
            alert('記録者を入力してください');
            return;
        }

        if (selectedRecordId) {
            setSearchData(archives.map(a => a.id === selectedRecordId ? currentData : a));
        } else {
            setSearchData([...archives, currentData]);
        }
        setViewMode('list');
        setCurrentData(null);
        setSelectedRecordId(null);
    };

    const handleEdit = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('edit');
    };

    const handleView = (record) => {
        setCurrentData({ ...record });
        setSelectedRecordId(record.id);
        setViewMode('view');
    };

    const handleDelete = (recordId) => {
        if (window.confirm('この記録を削除しますか？')) {
            setSearchData(archives.filter(a => a.id !== recordId));
        }
    };

    const updateSensoryAssessment = (sensoryType, field, value) => {
        setCurrentData(prev => ({
            ...prev,
            sensoryAssessment: {
                ...prev.sensoryAssessment,
                [sensoryType]: {
                    ...prev.sensoryAssessment[sensoryType],
                    [field]: value
                }
            }
        }));
    };

    const toggleToolCheck = (sensoryType, tool) => {
        const currentTools = currentData?.sensoryAssessment?.[sensoryType]?.consideredTools || [];
        const newTools = currentTools.includes(tool)
            ? currentTools.filter(t => t !== tool)
            : [...currentTools, tool];
        updateSensoryAssessment(sensoryType, 'consideredTools', newTools);
    };

    const updatePriorityTool = (index, field, value) => {
        setCurrentData(prev => ({
            ...prev,
            priorityTools: prev.priorityTools.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    // 苦手な感覚の数をカウント
    const countSensitivities = (record) => {
        if (!record?.sensoryAssessment) return 0;
        return Object.values(record.sensoryAssessment).filter(s => s.sensitivityLevel !== 'none').length;
    };

    // 一覧表示
    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">⑫刺激を軽減するツールの捜索</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            感覚過敏のあるご利用者が、どのような刺激に困っているかを整理し、軽減するためのツールを探します。
                        </p>
                        {actionName && (
                            <p className="text-sm text-blue-600 mt-1">対象ご利用者: {actionName}</p>
                        )}
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                        <span>＋</span>
                        <span>新規捜索を開始</span>
                    </button>
                </div>

                {/* TEACCHの考え方の説明 */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                    <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                        <span>💡</span>
                        TEACCHプログラムにおける感覚過敏への対応
                    </h4>
                    <div className="text-sm text-indigo-900 space-y-2">
                        <p>ASDの方の多くは、感覚の処理に特徴があります。特定の刺激に対して過敏に反応したり、逆に鈍感だったりすることがあります。</p>
                        <p>TEACCHプログラムでは、<span className="font-bold">環境を本人に合わせて調整すること</span>を重視します。苦手な刺激を取り除いたり軽減したりするツールを見つけることで、本人が安心して活動できる環境を作ります。</p>
                    </div>
                </div>

                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">まだ捜索記録がありません。</p>
                        <p className="text-gray-400 text-sm mt-2">「新規捜索を開始」ボタンから記録を始めましょう。</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {archives.map(record => (
                            <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">記録者: {record.recorder}</p>
                                    <p className="text-sm text-gray-500">{record.searchDate}</p>
                                    <p className="text-sm text-indigo-600 mt-1">
                                        苦手な感覚: {countSensitivities(record)}種類
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleView(record)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">閲覧</button>
                                    <button onClick={() => handleEdit(record)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">編集</button>
                                    <button onClick={() => handleDelete(record.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 編集・閲覧表示
    const isEditing = viewMode === 'edit';

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                    {isEditing ? (selectedRecordId ? 'ツール捜索記録を編集' : '新規ツール捜索を開始') : 'ツール捜索記録を閲覧'}
                </h3>
                <button
                    onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                    ← 一覧に戻る
                </button>
            </div>

            {/* 基本情報 */}
            <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 mb-4">基本情報</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">捜索日 <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            value={currentData?.searchDate || ''}
                            onChange={(e) => setCurrentData({ ...currentData, searchDate: e.target.value })}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">記録者 <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={currentData?.recorder || ''}
                            onChange={(e) => setCurrentData({ ...currentData, recorder: e.target.value })}
                            disabled={!isEditing}
                            placeholder="あなたのお名前"
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* 導入メッセージ */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                    🌟 <span className="font-bold">ご利用者の感覚の特徴を理解しましょう</span><br />
                    以下の各感覚について、ご利用者がどのような刺激に困っているかを確認し、軽減するためのツールを一緒に探しましょう。
                    苦手な刺激がない感覚は「該当なし」のままで大丈夫です。
                </p>
            </div>

            {/* 各感覚のアセスメント */}
            {sensoryTypes.map((sensory) => {
                const assessment = currentData?.sensoryAssessment?.[sensory.id] || {};
                const isRelevant = assessment.sensitivityLevel && assessment.sensitivityLevel !== 'none';
                
                return (
                    <div key={sensory.id} className={`border rounded-lg overflow-hidden ${isRelevant ? 'border-indigo-300' : 'border-gray-200'}`}>
                        {/* ヘッダー */}
                        <div className={`p-4 ${isRelevant ? 'bg-indigo-50' : 'bg-gray-50'}`}>
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{sensory.icon}</span>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{sensory.name}</h4>
                                        <p className="text-xs text-gray-500">例: {sensory.examples}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {sensitivityLevels.map(level => (
                                        <label 
                                            key={level.value}
                                            className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${
                                                assessment.sensitivityLevel === level.value 
                                                    ? level.color + ' ring-2 ring-offset-1' 
                                                    : 'bg-white border hover:bg-gray-50'
                                            } ${!isEditing ? 'cursor-default' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name={`sensitivity-${sensory.id}`}
                                                value={level.value}
                                                checked={assessment.sensitivityLevel === level.value}
                                                onChange={(e) => updateSensoryAssessment(sensory.id, 'sensitivityLevel', e.target.value)}
                                                disabled={!isEditing}
                                                className="sr-only"
                                            />
                                            <span>{level.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 詳細（苦手な場合のみ表示） */}
                        {isRelevant && (
                            <div className="p-4 space-y-4 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            具体的にどのような刺激が苦手ですか？
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                value={assessment.specificTriggers || ''}
                                                onChange={(e) => updateSensoryAssessment(sensory.id, 'specificTriggers', e.target.value)}
                                                placeholder="例: 蛍光灯のチラつき、大きな話し声"
                                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                                rows="2"
                                            />
                                        ) : (
                                            <div className="bg-gray-50 p-2 rounded border text-sm">{assessment.specificTriggers || '（記録なし）'}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            どのような場面で困っていますか？
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                value={assessment.situations || ''}
                                                onChange={(e) => updateSensoryAssessment(sensory.id, 'situations', e.target.value)}
                                                placeholder="例: 食堂での昼食時、作業場での活動中"
                                                className="w-full px-3 py-2 border rounded-lg text-sm"
                                                rows="2"
                                            />
                                        ) : (
                                            <div className="bg-gray-50 p-2 rounded border text-sm">{assessment.situations || '（記録なし）'}</div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        現在はどのように対処していますか？
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={assessment.currentCoping || ''}
                                            onChange={(e) => updateSensoryAssessment(sensory.id, 'currentCoping', e.target.value)}
                                            placeholder="例: 耳をふさぐ、その場を離れる、我慢している"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                            rows="2"
                                        />
                                    ) : (
                                        <div className="bg-gray-50 p-2 rounded border text-sm">{assessment.currentCoping || '（記録なし）'}</div>
                                    )}
                                </div>

                                {/* ツールの候補 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🔧 検討するツール・対策（該当するものにチェック）
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {sensory.tools.map((tool) => (
                                            <label 
                                                key={tool}
                                                className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm border ${
                                                    (assessment.consideredTools || []).includes(tool)
                                                        ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                                                        : 'bg-white hover:bg-gray-50'
                                                } ${!isEditing ? 'cursor-default' : ''}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={(assessment.consideredTools || []).includes(tool)}
                                                    onChange={() => isEditing && toggleToolCheck(sensory.id, tool)}
                                                    disabled={!isEditing}
                                                    className="sr-only"
                                                />
                                                <span>{tool}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={assessment.otherTools || ''}
                                            onChange={(e) => updateSensoryAssessment(sensory.id, 'otherTools', e.target.value)}
                                            placeholder="その他のツール案があれば記入"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        />
                                    ) : assessment.otherTools ? (
                                        <div className="bg-gray-50 p-2 rounded border text-sm">その他: {assessment.otherTools}</div>
                                    ) : null}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        📝 メモ・気づいたこと
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={assessment.notes || ''}
                                            onChange={(e) => updateSensoryAssessment(sensory.id, 'notes', e.target.value)}
                                            placeholder="この感覚について気づいたことなど"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                            rows="2"
                                        />
                                    ) : (
                                        <div className="bg-gray-50 p-2 rounded border text-sm">{assessment.notes || '（記録なし）'}</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* 優先的に試すツール */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    優先的に試すツール（上位3つ）
                </h4>
                <p className="text-sm text-green-700 mb-4">
                    上記のアセスメントを踏まえて、まず試してみたいツールを3つまで選びましょう。
                </p>
                <div className="space-y-4">
                    {(currentData?.priorityTools || []).map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border">
                            <p className="font-medium text-gray-700 mb-3">優先{index + 1}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">試すツール</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={item.tool || ''}
                                            onChange={(e) => updatePriorityTool(index, 'tool', e.target.value)}
                                            placeholder="例: イヤーマフ"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        />
                                    ) : (
                                        <div className="bg-gray-50 p-2 rounded border text-sm">{item.tool || '（未入力）'}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">選んだ理由</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={item.reason || ''}
                                            onChange={(e) => updatePriorityTool(index, 'reason', e.target.value)}
                                            placeholder="例: 食堂の音が特に苦手なため"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        />
                                    ) : (
                                        <div className="bg-gray-50 p-2 rounded border text-sm">{item.reason || '（未入力）'}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">期待する効果</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={item.expectedEffect || ''}
                                            onChange={(e) => updatePriorityTool(index, 'expectedEffect', e.target.value)}
                                            placeholder="例: 昼食を落ち着いて食べられる"
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        />
                                    ) : (
                                        <div className="bg-gray-50 p-2 rounded border text-sm">{item.expectedEffect || '（未入力）'}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 全体メモ */}
            <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span>📋</span>
                    全体メモ・今後の方針
                </h4>
                {isEditing ? (
                    <textarea
                        value={currentData?.overallNotes || ''}
                        onChange={(e) => setCurrentData({ ...currentData, overallNotes: e.target.value })}
                        placeholder="全体を通しての気づきや、今後の進め方などを記入してください"
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="4"
                    />
                ) : (
                    <div className="bg-white p-3 rounded border">{currentData?.overallNotes || '（記録なし）'}</div>
                )}
            </div>

            {/* 保存ボタン */}
            {isEditing && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                        onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }}
                        className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
                    >
                        保存する
                    </button>
                </div>
            )}
        </div>
    );
};


// ⑭試行の検証コンポーネント（感覚過敏）
export const SensoryTrialVerificationComponent = ({ verificationData = [], setVerificationData, searchData = [], actionName }) => {
    const [viewMode, setViewMode] = useState('list');
    const [currentData, setCurrentData] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);

    const archives = verificationData || [];

    const effectLevels = [
        { value: 'very_effective', label: 'とても効果があった', color: 'bg-green-100 text-green-700', icon: '😊' },
        { value: 'somewhat_effective', label: '少し効果があった', color: 'bg-blue-100 text-blue-700', icon: '🙂' },
        { value: 'no_change', label: '変化なし', color: 'bg-gray-100 text-gray-700', icon: '😐' },
        { value: 'negative', label: '逆効果だった', color: 'bg-red-100 text-red-700', icon: '😟' }
    ];

    const continuationOptions = [
        { value: 'continue', label: '継続する', color: 'bg-green-100 text-green-700' },
        { value: 'modify', label: '修正して継続', color: 'bg-yellow-100 text-yellow-700' },
        { value: 'stop', label: '中止する', color: 'bg-red-100 text-red-700' },
        { value: 'undecided', label: '検討中', color: 'bg-gray-100 text-gray-700' }
    ];

    const createEmptyData = () => ({
        id: Date.now(),
        verificationDate: new Date().toISOString().split('T')[0],
        verifier: '',
        trialPeriod: '',
        triedTools: [{
            toolName: '', targetSensory: '', usageSituation: '',
            beforeBehavior: '', afterBehavior: '', effectLevel: '',
            userReaction: '', continuation: '', modificationIdea: '', notes: ''
        }],
        overallFindings: '', successfulTools: '', unsuccessfulTools: '', nextSteps: '', overallComment: ''
    });

    const handleCreateNew = () => { setCurrentData(createEmptyData()); setSelectedRecordId(null); setViewMode('edit'); };
    const handleSave = () => {
        if (!currentData.verificationDate) { alert('検証日を入力してください'); return; }
        if (!currentData.verifier) { alert('検証者を入力してください'); return; }
        if (selectedRecordId) { setVerificationData(archives.map(a => a.id === selectedRecordId ? currentData : a)); }
        else { setVerificationData([...archives, currentData]); }
        setViewMode('list'); setCurrentData(null); setSelectedRecordId(null);
    };
    const handleEdit = (record) => { setCurrentData({ ...record }); setSelectedRecordId(record.id); setViewMode('edit'); };
    const handleView = (record) => { setCurrentData({ ...record }); setSelectedRecordId(record.id); setViewMode('view'); };
    const handleDelete = (recordId) => { if (window.confirm('この検証記録を削除しますか？')) { setVerificationData(archives.filter(a => a.id !== recordId)); } };
    const updateTriedTool = (index, field, value) => { setCurrentData(prev => ({ ...prev, triedTools: prev.triedTools.map((tool, i) => i === index ? { ...tool, [field]: value } : tool) })); };
    const addTriedTool = () => { setCurrentData(prev => ({ ...prev, triedTools: [...prev.triedTools, { toolName: '', targetSensory: '', usageSituation: '', beforeBehavior: '', afterBehavior: '', effectLevel: '', userReaction: '', continuation: '', modificationIdea: '', notes: '' }] })); };
    const removeTriedTool = (index) => { if (currentData.triedTools.length > 1) { setCurrentData(prev => ({ ...prev, triedTools: prev.triedTools.filter((_, i) => i !== index) })); } };

    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">⑭試行の検証</h3>
                        <p className="text-sm text-gray-600 mt-1">感覚刺激を軽減するツールを試行した結果を検証し、今後の方針を決めます。</p>
                        {actionName && <p className="text-sm text-blue-600 mt-1">対象ご利用者: {actionName}</p>}
                    </div>
                    <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md">
                        <span>＋</span><span>新規検証を作成</span>
                    </button>
                </div>
                {searchData && searchData.length > 0 && (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-indigo-800">📋 ⑫刺激を軽減するツールの捜索で <span className="font-bold">{searchData.length}件</span> の記録があります。</p>
                    </div>
                )}
                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">まだ検証記録がありません。</p>
                        <p className="text-gray-400 text-sm mt-2">「新規検証を作成」ボタンから記録を始めましょう。</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {archives.map(record => (
                            <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">検証者: {record.verifier}</p>
                                    <p className="text-sm text-gray-500">{record.verificationDate}（試行期間: {record.trialPeriod || '未設定'}）</p>
                                    <p className="text-sm text-purple-600 mt-1">検証したツール: {record.triedTools?.length || 0}件</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleView(record)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">閲覧</button>
                                    <button onClick={() => handleEdit(record)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">編集</button>
                                    <button onClick={() => handleDelete(record.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    const isEditing = viewMode === 'edit';
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">{isEditing ? (selectedRecordId ? '検証記録を編集' : '新規検証記録を作成') : '検証記録を閲覧'}</h3>
                <button onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }} className="px-4 py-2 text-gray-600 hover:text-gray-800">← 一覧に戻る</button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 mb-4">基本情報</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">検証日 <span className="text-red-500">*</span></label><input type="date" value={currentData?.verificationDate || ''} onChange={(e) => setCurrentData({ ...currentData, verificationDate: e.target.value })} disabled={!isEditing} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">検証者 <span className="text-red-500">*</span></label><input type="text" value={currentData?.verifier || ''} onChange={(e) => setCurrentData({ ...currentData, verifier: e.target.value })} disabled={!isEditing} placeholder="あなたのお名前" className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">試行期間</label><input type="text" value={currentData?.trialPeriod || ''} onChange={(e) => setCurrentData({ ...currentData, trialPeriod: e.target.value })} disabled={!isEditing} placeholder="例: 2週間" className="w-full px-3 py-2 border rounded-lg" /></div>
                </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-purple-800 flex items-center gap-2"><span className="text-xl">🔧</span>試行したツールの検証</h4>
                    {isEditing && <button onClick={addTriedTool} className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700">＋ ツールを追加</button>}
                </div>
                <div className="space-y-6">
                    {(currentData?.triedTools || []).map((tool, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border relative">
                            {isEditing && currentData.triedTools.length > 1 && <button onClick={() => removeTriedTool(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">✕</button>}
                            <h5 className="font-medium text-gray-700 mb-4 pb-2 border-b">ツール {index + 1}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">ツール名</label>{isEditing ? <input type="text" value={tool.toolName || ''} onChange={(e) => updateTriedTool(index, 'toolName', e.target.value)} placeholder="例: イヤーマフ" className="w-full px-3 py-2 border rounded-lg" /> : <div className="bg-gray-50 p-2 rounded border">{tool.toolName || '（未入力）'}</div>}</div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">対象の感覚</label>{isEditing ? <select value={tool.targetSensory || ''} onChange={(e) => updateTriedTool(index, 'targetSensory', e.target.value)} className="w-full px-3 py-2 border rounded-lg"><option value="">選択してください</option><option value="visual">👁️ 視覚</option><option value="auditory">👂 聴覚</option><option value="tactile">✋ 触覚</option><option value="olfactory">👃 嗅覚</option><option value="gustatory">👅 味覚</option><option value="vestibular">🎢 前庭覚</option><option value="proprioceptive">🏋️ 固有受容覚</option><option value="other">その他</option></select> : <div className="bg-gray-50 p-2 rounded border">{tool.targetSensory || '（未選択）'}</div>}</div>
                            </div>
                            <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">使用した場面</label>{isEditing ? <textarea value={tool.usageSituation || ''} onChange={(e) => updateTriedTool(index, 'usageSituation', e.target.value)} placeholder="例: 食堂での昼食時" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-gray-50 p-2 rounded border">{tool.usageSituation || '（記録なし）'}</div>}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">😰 使用前の様子</label>{isEditing ? <textarea value={tool.beforeBehavior || ''} onChange={(e) => updateTriedTool(index, 'beforeBehavior', e.target.value)} placeholder="例: 耳をふさいで落ち着かない様子" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-gray-50 p-2 rounded border">{tool.beforeBehavior || '（記録なし）'}</div>}</div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">😊 使用後の様子</label>{isEditing ? <textarea value={tool.afterBehavior || ''} onChange={(e) => updateTriedTool(index, 'afterBehavior', e.target.value)} placeholder="例: 落ち着いて活動できた" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-gray-50 p-2 rounded border">{tool.afterBehavior || '（記録なし）'}</div>}</div>
                            </div>
                            <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-2">効果の程度</label><div className="flex flex-wrap gap-2">{effectLevels.map(level => (<label key={level.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${tool.effectLevel === level.value ? level.color + ' ring-2 ring-offset-1' : 'bg-white border hover:bg-gray-50'} ${!isEditing ? 'cursor-default' : ''}`}><input type="radio" name={`effect-${index}`} value={level.value} checked={tool.effectLevel === level.value} onChange={(e) => updateTriedTool(index, 'effectLevel', e.target.value)} disabled={!isEditing} className="sr-only" /><span>{level.icon} {level.label}</span></label>))}</div></div>
                            <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">ご利用者の反応</label>{isEditing ? <textarea value={tool.userReaction || ''} onChange={(e) => updateTriedTool(index, 'userReaction', e.target.value)} placeholder="例: 自分から要求するようになった" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-gray-50 p-2 rounded border">{tool.userReaction || '（記録なし）'}</div>}</div>
                            <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-2">今後の方針</label><div className="flex flex-wrap gap-2">{continuationOptions.map(option => (<label key={option.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${tool.continuation === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-white border hover:bg-gray-50'} ${!isEditing ? 'cursor-default' : ''}`}><input type="radio" name={`continuation-${index}`} value={option.value} checked={tool.continuation === option.value} onChange={(e) => updateTriedTool(index, 'continuation', e.target.value)} disabled={!isEditing} className="sr-only" /><span>{option.label}</span></label>))}</div></div>
                            {tool.continuation === 'modify' && <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">💡 改善案</label>{isEditing ? <textarea value={tool.modificationIdea || ''} onChange={(e) => updateTriedTool(index, 'modificationIdea', e.target.value)} placeholder="例: 使用時間を短くする" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-gray-50 p-2 rounded border">{tool.modificationIdea || '（記録なし）'}</div>}</div>}
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">📝 メモ</label>{isEditing ? <textarea value={tool.notes || ''} onChange={(e) => updateTriedTool(index, 'notes', e.target.value)} placeholder="その他気づいたこと" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-gray-50 p-2 rounded border">{tool.notes || '（記録なし）'}</div>}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2"><span className="text-xl">📊</span>全体の評価</h4>
                <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">✅ 効果があったツール</label>{isEditing ? <textarea value={currentData?.successfulTools || ''} onChange={(e) => setCurrentData({ ...currentData, successfulTools: e.target.value })} placeholder="効果があったツールとその理由" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-white p-2 rounded border">{currentData?.successfulTools || '（記録なし）'}</div>}</div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">❌ 効果がなかったツール</label>{isEditing ? <textarea value={currentData?.unsuccessfulTools || ''} onChange={(e) => setCurrentData({ ...currentData, unsuccessfulTools: e.target.value })} placeholder="効果がなかったツールとその理由" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-white p-2 rounded border">{currentData?.unsuccessfulTools || '（記録なし）'}</div>}</div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">💡 全体を通しての気づき</label>{isEditing ? <textarea value={currentData?.overallFindings || ''} onChange={(e) => setCurrentData({ ...currentData, overallFindings: e.target.value })} placeholder="試行全体を通して気づいたこと" className="w-full px-3 py-2 border rounded-lg" rows="3" /> : <div className="bg-white p-2 rounded border">{currentData?.overallFindings || '（記録なし）'}</div>}</div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">➡️ 今後の方針</label>{isEditing ? <textarea value={currentData?.nextSteps || ''} onChange={(e) => setCurrentData({ ...currentData, nextSteps: e.target.value })} placeholder="今後どのように進めていくか" className="w-full px-3 py-2 border rounded-lg" rows="3" /> : <div className="bg-white p-2 rounded border">{currentData?.nextSteps || '（記録なし）'}</div>}</div>
                </div>
            </div>
            {isEditing && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }} className="px-6 py-2 border rounded-lg hover:bg-gray-50">キャンセル</button>
                    <button onClick={handleSave} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md">保存する</button>
                </div>
            )}
        </div>
    );
};

// ==================== 緊急時対応の検証 ====================
export const EmergencyVerificationComponent = ({ verificationData = [], setVerificationData, actionName }) => {
    const [viewMode, setViewMode] = useState('list');
    const [currentData, setCurrentData] = useState(null);
    const [selectedRecordId, setSelectedRecordId] = useState(null);
    const archives = Array.isArray(verificationData) ? [...verificationData].sort((a, b) => new Date(b.verificationDate) - new Date(a.verificationDate)) : [];

    const effectLevels = [
        { value: 'very_effective', label: 'とても効果的', color: 'bg-green-100 text-green-700', icon: '😊' },
        { value: 'somewhat_effective', label: '少し効果があった', color: 'bg-blue-100 text-blue-700', icon: '🙂' },
        { value: 'no_change', label: '変化なし', color: 'bg-gray-100 text-gray-700', icon: '😐' },
        { value: 'negative', label: '逆効果だった', color: 'bg-red-100 text-red-700', icon: '😟' }
    ];

    const continuationOptions = [
        { value: 'continue', label: '継続する', color: 'bg-green-100 text-green-700' },
        { value: 'modify', label: '修正して継続', color: 'bg-yellow-100 text-yellow-700' },
        { value: 'stop', label: '中止する', color: 'bg-red-100 text-red-700' },
        { value: 'undecided', label: '検討中', color: 'bg-gray-100 text-gray-700' }
    ];

    const createEmptyData = () => ({
        id: Date.now(),
        verificationDate: new Date().toISOString().split('T')[0],
        verifier: '',
        emergencySituation: '',
        responseUsed: '',
        beforeState: '',
        afterState: '',
        effectLevel: '',
        userReaction: '',
        staffReaction: '',
        continuation: '',
        modificationIdea: '',
        preventionMeasures: '',
        overallComment: ''
    });

    const handleCreateNew = () => { setCurrentData(createEmptyData()); setSelectedRecordId(null); setViewMode('edit'); };
    const handleSave = () => {
        if (!currentData.verificationDate) { alert('検証日を入力してください'); return; }
        if (!currentData.verifier) { alert('検証者を入力してください'); return; }
        if (selectedRecordId) { setVerificationData(archives.map(a => a.id === selectedRecordId ? currentData : a)); }
        else { setVerificationData([...archives, currentData]); }
        setViewMode('list'); setCurrentData(null); setSelectedRecordId(null);
    };
    const handleEdit = (record) => { setCurrentData({ ...record }); setSelectedRecordId(record.id); setViewMode('edit'); };
    const handleView = (record) => { setCurrentData({ ...record }); setSelectedRecordId(record.id); setViewMode('view'); };
    const handleDelete = (recordId) => { if (window.confirm('この検証記録を削除しますか？')) { setVerificationData(archives.filter(a => a.id !== recordId)); } };

    if (viewMode === 'list') {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">🚨 緊急時対応の検証</h3>
                        <p className="text-sm text-gray-600 mt-1">緊急時の対応を振り返り、今後の対策を検討します。</p>
                        {actionName && <p className="text-sm text-blue-600 mt-1">対象ご利用者: {actionName}</p>}
                    </div>
                    <button onClick={handleCreateNew} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md">
                        <span>＋</span><span>新規検証を作成</span>
                    </button>
                </div>
                {archives.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">まだ検証記録がありません。</p>
                        <p className="text-gray-400 text-sm mt-2">「新規検証を作成」ボタンから記録を始めましょう。</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {archives.map(record => (
                            <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">検証者: {record.verifier}</p>
                                    <p className="text-sm text-gray-600">検証日: {record.verificationDate}</p>
                                    {record.emergencySituation && <p className="text-sm text-red-600 mt-1">状況: {record.emergencySituation.substring(0, 30)}...</p>}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleView(record)} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">閲覧</button>
                                    <button onClick={() => handleEdit(record)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">編集</button>
                                    <button onClick={() => handleDelete(record.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    const isEditing = viewMode === 'edit';
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">{isEditing ? (selectedRecordId ? '検証記録を編集' : '新規検証記録を作成') : '検証記録を閲覧'}</h3>
                <button onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }} className="px-4 py-2 text-gray-600 hover:text-gray-800">← 一覧に戻る</button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-bold text-gray-800 mb-4">基本情報</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">検証日 <span className="text-red-500">*</span></label><input type="date" value={currentData?.verificationDate || ''} onChange={(e) => setCurrentData({ ...currentData, verificationDate: e.target.value })} disabled={!isEditing} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">検証者 <span className="text-red-500">*</span></label><input type="text" value={currentData?.verifier || ''} onChange={(e) => setCurrentData({ ...currentData, verifier: e.target.value })} disabled={!isEditing} placeholder="あなたのお名前" className="w-full px-3 py-2 border rounded-lg" /></div>
                </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2"><span className="text-xl">🚨</span>緊急時の状況</h4>
                <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">発生した緊急事態</label>{isEditing ? <textarea value={currentData?.emergencySituation || ''} onChange={(e) => setCurrentData({ ...currentData, emergencySituation: e.target.value })} placeholder="どのような緊急事態が発生したか" className="w-full px-3 py-2 border rounded-lg" rows="3" /> : <div className="bg-white p-2 rounded border">{currentData?.emergencySituation || '（記録なし）'}</div>}</div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">実施した対応</label>{isEditing ? <textarea value={currentData?.responseUsed || ''} onChange={(e) => setCurrentData({ ...currentData, responseUsed: e.target.value })} placeholder="どのような対応を行ったか" className="w-full px-3 py-2 border rounded-lg" rows="3" /> : <div className="bg-white p-2 rounded border">{currentData?.responseUsed || '（記録なし）'}</div>}</div>
                </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><span className="text-xl">📊</span>対応の効果</h4>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">😰 対応前の様子</label>{isEditing ? <textarea value={currentData?.beforeState || ''} onChange={(e) => setCurrentData({ ...currentData, beforeState: e.target.value })} placeholder="対応前のご利用者の様子" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-white p-2 rounded border">{currentData?.beforeState || '（記録なし）'}</div>}</div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">😊 対応後の様子</label>{isEditing ? <textarea value={currentData?.afterState || ''} onChange={(e) => setCurrentData({ ...currentData, afterState: e.target.value })} placeholder="対応後のご利用者の様子" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-white p-2 rounded border">{currentData?.afterState || '（記録なし）'}</div>}</div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">効果の程度</label><div className="flex flex-wrap gap-2">{effectLevels.map(level => (<label key={level.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${currentData?.effectLevel === level.value ? level.color + ' ring-2 ring-offset-1' : 'bg-white border hover:bg-gray-50'} ${!isEditing ? 'cursor-default' : ''}`}><input type="radio" name="effect" value={level.value} checked={currentData?.effectLevel === level.value} onChange={(e) => setCurrentData({ ...currentData, effectLevel: e.target.value })} disabled={!isEditing} className="sr-only" /><span>{level.icon} {level.label}</span></label>))}</div></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">ご利用者の反応</label>{isEditing ? <textarea value={currentData?.userReaction || ''} onChange={(e) => setCurrentData({ ...currentData, userReaction: e.target.value })} placeholder="ご利用者がどのように反応したか" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-white p-2 rounded border">{currentData?.userReaction || '（記録なし）'}</div>}</div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">職員の振り返り</label>{isEditing ? <textarea value={currentData?.staffReaction || ''} onChange={(e) => setCurrentData({ ...currentData, staffReaction: e.target.value })} placeholder="対応した職員の感想や気づき" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-white p-2 rounded border">{currentData?.staffReaction || '（記録なし）'}</div>}</div>
                </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2"><span className="text-xl">📝</span>今後の対策</h4>
                <div className="space-y-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-2">今後の方針</label><div className="flex flex-wrap gap-2">{continuationOptions.map(option => (<label key={option.value} className={`inline-flex items-center px-3 py-1 rounded cursor-pointer text-sm ${currentData?.continuation === option.value ? option.color + ' ring-2 ring-offset-1' : 'bg-white border hover:bg-gray-50'} ${!isEditing ? 'cursor-default' : ''}`}><input type="radio" name="continuation" value={option.value} checked={currentData?.continuation === option.value} onChange={(e) => setCurrentData({ ...currentData, continuation: e.target.value })} disabled={!isEditing} className="sr-only" /><span>{option.label}</span></label>))}</div></div>
                    {currentData?.continuation === 'modify' && <div><label className="block text-sm font-medium text-gray-700 mb-1">💡 改善案</label>{isEditing ? <textarea value={currentData?.modificationIdea || ''} onChange={(e) => setCurrentData({ ...currentData, modificationIdea: e.target.value })} placeholder="どのように改善するか" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-white p-2 rounded border">{currentData?.modificationIdea || '（記録なし）'}</div>}</div>}
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">🛡️ 予防策</label>{isEditing ? <textarea value={currentData?.preventionMeasures || ''} onChange={(e) => setCurrentData({ ...currentData, preventionMeasures: e.target.value })} placeholder="同様の事態を防ぐための対策" className="w-full px-3 py-2 border rounded-lg" rows="3" /> : <div className="bg-white p-2 rounded border">{currentData?.preventionMeasures || '（記録なし）'}</div>}</div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">📋 全体コメント</label>{isEditing ? <textarea value={currentData?.overallComment || ''} onChange={(e) => setCurrentData({ ...currentData, overallComment: e.target.value })} placeholder="その他特記事項" className="w-full px-3 py-2 border rounded-lg" rows="2" /> : <div className="bg-white p-2 rounded border">{currentData?.overallComment || '（記録なし）'}</div>}</div>
                </div>
            </div>
            {isEditing && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button onClick={() => { setViewMode('list'); setCurrentData(null); setSelectedRecordId(null); }} className="px-6 py-2 border rounded-lg hover:bg-gray-50">キャンセル</button>
                    <button onClick={handleSave} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md">このページを保存</button>
                </div>
            )}
        </div>
    );
};
