import React, { useState, useEffect } from 'react';
import { PERMANENT_TRAITS, rotatedTimeSlots } from './constants';
import { Step1Content } from './Step1Components';
import { Step2Content, Step2ScatterPlot, Step2AbcRecord } from './Step2Components';
import { Step3Content } from './Step3Components';
import { ScatterPlotComponent, AbcRecordComponent, FastAssessmentComponent, CommunicationSample, CommunicationAnalysis, PecsManualComponent } from './Step4Assessment';
import { BehaviorAnalysisChat } from './BehaviorAnalysisChat';
import { StrategySheet, VerificationStrategySheet, ToolPhotosComponent as ToolCreationComponent, ToolImplementationComponent, RecognitionAssessmentComponent, RecognitionAnalysisComponent, CardImplementationComponent, SupportProcedureComponent, CommunicationVerificationComponent, ComicConversationTrialComponent, ComicConversationExplanationComponent, BehaviorChangeObservationComponent, LifeSkillProcedureComponent, SpaceAssessmentComponent, SpaceAnalysisComponent, SpaceStructurizationPlanComponent, SpaceImplementationComponent, SpaceVerificationComponent, ProcedurePracticeComponent, ProcedureVerificationComponent, PositionCheckComponent, StimulusVerificationComponent, SensoryToolSearchComponent, SensoryTrialVerificationComponent, TimeStructureVerificationComponent, EmergencyVerificationComponent } from './Step4Tools';

// ==================== 保存・印刷ボタンコンポーネント ====================

const SavePrintButtons = ({ onSave, onPrint, saveLabel = "このページを保存", printLabel = "このページを印刷" }) => (
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

// ==================== メインアプリケーション ====================

const App = () => {
    const [userName, setUserName] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [currentSubTab, setCurrentSubTab] = useState(0);
    const [step2SubTab, setStep2SubTab] = useState(0);
    const [step3SubTab, setStep3SubTab] = useState(0);
    
    // ストラテジーシートのデータ
    const [strategyData, setStrategyData] = useState({
        createDate: '',
        beforeWhen: '',
        behavior: '',
        afterConsequence: '',
        beforeSupport: '',
        desiredBehavior: '',
        afterSupport: '',
        stillHappens: ''
    });

    // ツール作成のデータ
    const [toolData, setToolData] = useState([
        { id: 1, image: null, description: '' }
    ]);

    // 支援の手順説明データ（変化が苦手用）
    const [supportProcedureData, setSupportProcedureData] = useState({
        overview: '',
        purpose: '',
        steps: [{ id: 1, image: null, instruction: '', point: '' }],
        cautions: ''
    });

    // ツール実践のデータ（短期的な対応）
    const [shortTermImplementationData, setShortTermImplementationData] = useState([
        { id: 1, image: null, description: '' }
    ]);

    // ツール実践のデータ（長期的な対応）
    const [longTermImplementationData, setLongTermImplementationData] = useState([
        { id: 1, image: null, description: '' }
    ]);

    // 構造化の実践用のデータ
    const [structurizationImplementationData, setStructurizationImplementationData] = useState([
        { id: 1, image: null, description: '' }
    ]);

    // 絵カードなどの実践用のデータ
    const [cardImplementationData, setCardImplementationData] = useState([
        { id: 1, image: null, description: '' }
    ]);

    // 検証用データ
    const [verificationData, setVerificationData] = useState({
        createDate: '',
        beforeWhen: '',
        behavior: '',
        afterConsequence: '',
        beforeSupport: '',
        desiredBehavior: '',
        afterSupport: '',
        stillHappens: '',
        toolEffective: false
    });

    // コミュニケーション検証用データ（配列形式でアーカイブ）
    const [communicationVerificationData, setCommunicationVerificationData] = useState([]);

    // コミック会話試行用データ（配列形式でアーカイブ）
    const [comicConversationTrialData, setComicConversationTrialData] = useState([]);

    // 説明が必要な場面でコミック会話を試行用データ（配列形式でアーカイブ）
    const [comicConversationExplanationData, setComicConversationExplanationData] = useState([]);

    // 行動の様子観察データ（配列形式でアーカイブ）
    const [behaviorChangeObservationData, setBehaviorChangeObservationData] = useState([]);

    // 生活スキル手順確認データ（配列形式でアーカイブ）
    const [lifeSkillProcedureData, setLifeSkillProcedureData] = useState([]);

    // 時間の構造化検証データ（変化が苦手）
    const [timeStructureVerificationData, setTimeStructureVerificationData] = useState([]);

    // 緊急時対応の効果検証データ
    const [emergencyVerificationData, setEmergencyVerificationData] = useState([]);

    // 手順書の実践データ（配列形式でアーカイブ）
    const [procedurePracticeData, setProcedurePracticeData] = useState([]);

    // 実践の検証データ（配列形式でアーカイブ）
    const [procedureVerificationData, setProcedureVerificationData] = useState([]);

    // ご利用者との立ち位置の確認データ（人からの刺激が苦手）
    const [positionCheckData, setPositionCheckData] = useState([]);

    // 実践の検証データ（人からの刺激が苦手）
    const [stimulusVerificationData, setStimulusVerificationData] = useState([]);

    // 刺激を軽減するツールの捜索データ（感覚過敏）
    const [sensoryToolSearchData, setSensoryToolSearchData] = useState([]);

    // 試行の検証データ（感覚過敏）
    const [sensoryTrialVerificationData, setSensoryTrialVerificationData] = useState([]);

    // 支援員への支援のやり方の手順書データ（感覚過敏：ツールの試行）
    const [sensoryProcedureData, setSensoryProcedureData] = useState(null);

    // 支援員への支援のやり方の手順書データ（変化が苦手：スケジュールボード）
    const [scheduleProcedureData, setScheduleProcedureData] = useState(null);

    // 支援員への支援のやり方の手順書データ（特別な記憶の仕方：手順書）
    const [memoryProcedureData, setMemoryProcedureData] = useState(null);

    // 空間の状況のアセスメントデータ
    const [spaceAssessmentData, setSpaceAssessmentData] = useState([]);
    
    // 空間のアセスメント結果の分析データ
    const [spaceAnalysisData, setSpaceAnalysisData] = useState({});

    // 空間の構造化の案の作成データ
    const [spaceStructurizationPlanData, setSpaceStructurizationPlanData] = useState([]);

    // 構造化の実践データ
    const [spaceImplementationData, setSpaceImplementationData] = useState([]);

    // 構造化実践の検証データ
    const [spaceVerificationData, setSpaceVerificationData] = useState({});

    // 認識アセスメント結果の分析データ
    const [analysisData, setAnalysisData] = useState({});

    const [step4Stage, setStep4Stage] = useState('select_plan');
    const [selectedTraitForStep4, setSelectedTraitForStep4] = useState(null);
    const [step4NestedTab, setStep4NestedTab] = useState(0);
    const [behaviorAssessmentSubTab, setBehaviorAssessmentSubTab] = useState(0);
    const [recognitionAssessment, setRecognitionAssessment] = useState({});
    const [step4View, setStep4View] = useState('default');
    const [assessmentTargetAction, setAssessmentTargetAction] = useState('');
    const [step4DirectTitle, setStep4DirectTitle] = useState('');
    const [step4ImplementationType, setStep4ImplementationType] = useState('shortTerm'); // 'shortTerm' or 'longTerm'
    const [collapsedSections, setCollapsedSections] = useState({});
    const [scatterPlotData, setScatterPlotData] = useState({});
    const [scatterPlotInfo, setScatterPlotInfo] = useState({});
    const [abcRecords, setAbcRecords] = useState({});
    const [communicationSampleData, setCommunicationSampleData] = useState({});
    const [communicationAnalysisData, setCommunicationAnalysisData] = useState({});
    const [pecsManualData, setPecsManualData] = useState({});

    // プロフィールデータ
    const [profile, setProfile] = useState({
        birthDate: '',
        age: '',
        guardian: '',
        handbook: '',
        supportLevel: '',
        behaviorScore: '',
        medicalHistory: '',
        lifeHistory: ''
    });

    // 困った行動データ
    const [problems, setProblems] = useState(Array.from({ length: 10 }, (_, i) => ({ id: `problem-${i}`, content: '' })));
    const [userConcerns, setUserConcerns] = useState(Array.from({ length: 20 }, (_, i) => ({ id: `concern-${i}`, content: '' })));
    
    const initialWorksheetState = () => ({
        traitDetails: {},
        environmentCheckboxes: {},
        environmentTraitNotes: {},
        autismPerspectives: PERMANENT_TRAITS.reduce((acc, trait) => ({ ...acc, [trait]: false }), {}),
        additionalNotes: []
    });

    const [icebergWorksheets, setIcebergWorksheets] = useState(() => 
        Array.from({ length: 20 }, initialWorksheetState)
    );

    // ICF評価データ
    const [icfEvaluation, setIcfEvaluation] = useState({});
    const [icfEnvEvaluation, setIcfEnvEvaluation] = useState({});

    // アセスメントデータ
    const [assessment, setAssessment] = useState({});

    // スケジュールデータ
    const [schedule, setSchedule] = useState({});
    const [scheduleHistory, setScheduleHistory] = useState([]);
    const [copiedCell, setCopiedCell] = useState(null);
    const [activeCell, setActiveCell] = useState(null);
    
    // 支援計画データ
    const [supportPlans, setSupportPlans] = useState([]);
    const [editingPlanId, setEditingPlanId] = useState(null);
    const [selectedPlanIdForStep4, setSelectedPlanIdForStep4] = useState(null);

    // ステップ2用アセスメントデータ（スキャッタープロット、ABC記録）
    const [step2AssessmentData, setStep2AssessmentData] = useState({
        scatterPlots: {},
        scatterPlotInfos: {},
        abcRecords: {}
    });

    // FAST用のstate
    const [fastDataStore, setFastDataStore] = useState({});
    
    const getFastData = (actionName) => {
        if (!fastDataStore[actionName]) {
            return {
                recorderRelationship: '',
                relationshipPeriodYears: '',
                relationshipPeriodMonths: '',
                dailyContact: null,
                contactScenes: {
                    meal: false,
                    leisure: false,
                    selfCare: false,
                    learning: false,
                    work: false,
                    other: false,
                    otherText: ''
                },
                problemBehaviors: [actionName, '', '', '', ''],
                selectedBehaviorIndex: 0,
                frequency: '',
                severity: '',
                mostLikelySituation: {
                    dayTime: '',
                    sceneActivity: '',
                    people: ''
                },
                leastLikelySituation: {
                    dayTime: '',
                    sceneActivity: '',
                    people: ''
                },
                beforeBehavior: '',
                afterBehavior: '',
                currentResponse: '',
                questions: Array(16).fill(null),
                physicalProblemDetail: ''
            };
        }
        return fastDataStore[actionName];
    };
    
    const updateFastData = (actionName, newData) => {
        setFastDataStore({ ...fastDataStore, [actionName]: newData });
    };

    const toggleCollapse = (sectionId) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    // ==================== 保存機能 ====================
    
    // 全データを収集
    const collectAllData = () => ({
        userName,
        profile,
        assessment,
        schedule,
        scheduleHistory,
        icfEvaluation,
        icfEnvEvaluation,
        problems,
        userConcerns,
        icebergWorksheets,
        supportPlans,
        step2AssessmentData,
        fastDataStore,
        scatterPlotData,
        scatterPlotInfo,
        abcRecords,
        communicationSampleData,
        communicationAnalysisData,
        pecsManualData,
        strategyData,
        toolData,
        supportProcedureData,
        shortTermImplementationData,
        longTermImplementationData,
        structurizationImplementationData,
        cardImplementationData,
        verificationData,
        communicationVerificationData,
        comicConversationTrialData,
        comicConversationExplanationData,
        behaviorChangeObservationData,
        lifeSkillProcedureData,
        timeStructureVerificationData,
        emergencyVerificationData,
        procedurePracticeData,
        procedureVerificationData,
        positionCheckData,
        stimulusVerificationData,
        sensoryToolSearchData,
        sensoryTrialVerificationData,
        sensoryProcedureData,
        scheduleProcedureData,
        memoryProcedureData,
        spaceAssessmentData,
        spaceAnalysisData,
        spaceStructurizationPlanData,
        spaceImplementationData,
        spaceVerificationData,
        analysisData,
        recognitionAssessment
    });

    // ステップ別データを収集
    const collectStepData = (stepNumber) => {
        const baseData = { userName, savedAt: new Date().toISOString(), step: stepNumber };
        switch (stepNumber) {
            case 1:
                return { ...baseData, profile, assessment, schedule, scheduleHistory, icfEvaluation, icfEnvEvaluation };
            case 2:
                return { ...baseData, problems, userConcerns, icebergWorksheets, step2AssessmentData };
            case 3:
                return { ...baseData, supportPlans };
            case 4:
                return {
                    ...baseData,
                    fastDataStore, scatterPlotData, scatterPlotInfo, abcRecords,
                    communicationSampleData, communicationAnalysisData, pecsManualData,
                    strategyData, toolData, supportProcedureData,
                    shortTermImplementationData, longTermImplementationData,
                    structurizationImplementationData, cardImplementationData,
                    verificationData, communicationVerificationData,
                    comicConversationTrialData, comicConversationExplanationData,
                    behaviorChangeObservationData, lifeSkillProcedureData,
                    timeStructureVerificationData, emergencyVerificationData,
                    procedurePracticeData, procedureVerificationData,
                    positionCheckData, stimulusVerificationData,
                    sensoryToolSearchData, sensoryTrialVerificationData,
                    sensoryProcedureData, scheduleProcedureData, memoryProcedureData,
                    spaceAssessmentData, spaceAnalysisData, spaceStructurizationPlanData,
                    spaceImplementationData, spaceVerificationData, analysisData, recognitionAssessment
                };
            default:
                return baseData;
        }
    };

    // すべてのデータを保存（JSONファイルとしてダウンロード）
    const saveAllData = () => {
        const data = { ...collectAllData(), savedAt: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ASD支援アプリ_全データ_${userName || '未設定'}_${new Date().toLocaleDateString('ja-JP').replace(/\//g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('すべてのデータを保存しました');
    };

    // ステップ別データを保存
    const saveStepData = (stepNumber) => {
        const stepNames = { 1: 'ステップ1_ご利用者の生活', 2: 'ステップ2_困った行動と背景', 3: 'ステップ3_支援計画', 4: 'ステップ4_支援の実践' };
        const data = collectStepData(stepNumber);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ASD支援アプリ_${stepNames[stepNumber]}_${userName || '未設定'}_${new Date().toLocaleDateString('ja-JP').replace(/\//g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert(`${stepNames[stepNumber]}のデータを保存しました`);
    };

    // データを読み込む（ファイルから）
    const loadDataFromFile = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // 全データの読み込み
                if (data.userName !== undefined) setUserName(data.userName);
                if (data.profile) setProfile(data.profile);
                if (data.assessment) setAssessment(data.assessment);
                if (data.schedule) setSchedule(data.schedule);
                if (data.scheduleHistory) setScheduleHistory(data.scheduleHistory);
                if (data.icfEvaluation) setIcfEvaluation(data.icfEvaluation);
                if (data.icfEnvEvaluation) setIcfEnvEvaluation(data.icfEnvEvaluation);
                if (data.problems) setProblems(data.problems);
                if (data.userConcerns) setUserConcerns(data.userConcerns);
                if (data.icebergWorksheets) setIcebergWorksheets(data.icebergWorksheets);
                if (data.supportPlans) setSupportPlans(data.supportPlans);
                if (data.step2AssessmentData) setStep2AssessmentData(data.step2AssessmentData);
                if (data.fastDataStore) setFastDataStore(data.fastDataStore);
                if (data.scatterPlotData) setScatterPlotData(data.scatterPlotData);
                if (data.scatterPlotInfo) setScatterPlotInfo(data.scatterPlotInfo);
                if (data.abcRecords) setAbcRecords(data.abcRecords);
                if (data.communicationSampleData) setCommunicationSampleData(data.communicationSampleData);
                if (data.communicationAnalysisData) setCommunicationAnalysisData(data.communicationAnalysisData);
                if (data.pecsManualData) setPecsManualData(data.pecsManualData);
                if (data.strategyData) setStrategyData(data.strategyData);
                if (data.toolData) setToolData(data.toolData);
                if (data.supportProcedureData) setSupportProcedureData(data.supportProcedureData);
                if (data.shortTermImplementationData) setShortTermImplementationData(data.shortTermImplementationData);
                if (data.longTermImplementationData) setLongTermImplementationData(data.longTermImplementationData);
                if (data.structurizationImplementationData) setStructurizationImplementationData(data.structurizationImplementationData);
                if (data.cardImplementationData) setCardImplementationData(data.cardImplementationData);
                if (data.verificationData) setVerificationData(data.verificationData);
                if (data.communicationVerificationData) setCommunicationVerificationData(data.communicationVerificationData);
                if (data.comicConversationTrialData) setComicConversationTrialData(data.comicConversationTrialData);
                if (data.comicConversationExplanationData) setComicConversationExplanationData(data.comicConversationExplanationData);
                if (data.behaviorChangeObservationData) setBehaviorChangeObservationData(data.behaviorChangeObservationData);
                if (data.lifeSkillProcedureData) setLifeSkillProcedureData(data.lifeSkillProcedureData);
                if (data.timeStructureVerificationData) setTimeStructureVerificationData(data.timeStructureVerificationData);
                if (data.emergencyVerificationData) setEmergencyVerificationData(data.emergencyVerificationData);
                if (data.procedurePracticeData) setProcedurePracticeData(data.procedurePracticeData);
                if (data.procedureVerificationData) setProcedureVerificationData(data.procedureVerificationData);
                if (data.positionCheckData) setPositionCheckData(data.positionCheckData);
                if (data.stimulusVerificationData) setStimulusVerificationData(data.stimulusVerificationData);
                if (data.sensoryToolSearchData) setSensoryToolSearchData(data.sensoryToolSearchData);
                if (data.sensoryTrialVerificationData) setSensoryTrialVerificationData(data.sensoryTrialVerificationData);
                if (data.sensoryProcedureData) setSensoryProcedureData(data.sensoryProcedureData);
                if (data.scheduleProcedureData) setScheduleProcedureData(data.scheduleProcedureData);
                if (data.memoryProcedureData) setMemoryProcedureData(data.memoryProcedureData);
                if (data.spaceAssessmentData) setSpaceAssessmentData(data.spaceAssessmentData);
                if (data.spaceAnalysisData) setSpaceAnalysisData(data.spaceAnalysisData);
                if (data.spaceStructurizationPlanData) setSpaceStructurizationPlanData(data.spaceStructurizationPlanData);
                if (data.spaceImplementationData) setSpaceImplementationData(data.spaceImplementationData);
                if (data.spaceVerificationData) setSpaceVerificationData(data.spaceVerificationData);
                if (data.analysisData) setAnalysisData(data.analysisData);
                if (data.recognitionAssessment) setRecognitionAssessment(data.recognitionAssessment);
                
                alert('データを読み込みました');
            } catch (error) {
                alert('データの読み込みに失敗しました: ' + error.message);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    // ==================== 印刷機能 ====================
    
    // 全てのページを印刷（データサマリーレポート）
    const printAll = () => {
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            // プロフィールサマリー
            const profileSummary = `
                <h2>ステップ1：ご利用者の生活を知ろう</h2>
                <h3>①基本プロフィール</h3>
                <table>
                    <tr><th>生年月日</th><td>${profile.birthDate || '未入力'}</td></tr>
                    <tr><th>年齢</th><td>${profile.age || '未入力'}</td></tr>
                    <tr><th>保護者・キーパーソン</th><td>${profile.guardian || '未入力'}</td></tr>
                    <tr><th>療育手帳</th><td>${profile.handbook || '未入力'}</td></tr>
                    <tr><th>障害支援区分</th><td>${profile.supportLevel || '未入力'}</td></tr>
                    <tr><th>行動関連項目</th><td>${profile.behaviorScore || '未入力'}</td></tr>
                    <tr><th>医療歴</th><td>${profile.medicalHistory || '未入力'}</td></tr>
                    <tr><th>生育歴</th><td>${profile.lifeHistory || '未入力'}</td></tr>
                </table>
            `;

            // 困った行動サマリー
            const problemsList = problems.filter(p => p.content).map((p, i) => `<li>${p.content}</li>`).join('') || '<li>未入力</li>';
            const concernsList = userConcerns.filter(c => c.content).map((c, i) => `<li>${c.content}</li>`).join('') || '<li>未入力</li>';
            const step2Summary = `
                <h2>ステップ2：困った行動とその背景を知ろう</h2>
                <h3>⑤困った行動</h3>
                <ul>${problemsList}</ul>
                <h3>⑦困った・困っている行動</h3>
                <ul>${concernsList}</ul>
            `;

            // 支援計画サマリー
            const plansList = supportPlans.map(plan => `
                <div class="plan-item">
                    <h4>対象行動: ${plan.targetConcernContent || '未設定'}</h4>
                    <p><strong>長期目標:</strong> ${plan.longTermGoal || '未入力'}</p>
                    <p><strong>短期目標:</strong> ${plan.shortTermGoal || '未入力'}</p>
                </div>
            `).join('') || '<p>支援計画はまだ作成されていません</p>';
            const step3Summary = `
                <h2>ステップ3：支援の計画を立てよう</h2>
                <h3>⑩支援計画</h3>
                ${plansList}
            `;

            // Step4サマリー（スキャッタープロット・ABC記録のアーカイブ数）
            const scatterCount = Object.keys(scatterPlotInfo).reduce((acc, key) => {
                const archives = scatterPlotInfo[key]?.archives || [];
                return acc + archives.length;
            }, 0);
            const abcCount = Object.keys(abcRecords).reduce((acc, key) => {
                const archives = abcRecords[key]?.archives || [];
                return acc + archives.length;
            }, 0);
            const step4Summary = `
                <h2>ステップ4：実際に支援をしてみよう</h2>
                <h3>記録状況</h3>
                <ul>
                    <li>スキャッタープロット記録数: ${scatterCount}件</li>
                    <li>ABC記録数: ${abcCount}件</li>
                    <li>検証データ: ${communicationVerificationData.length + behaviorChangeObservationData.length + procedureVerificationData.length}件</li>
                </ul>
            `;

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>ASD支援アプリ - 全体レポート - ${userName || '未設定'}様</title>
                    <style>
                        @media print {
                            body { font-size: 11pt; }
                            .page-break { page-break-before: always; }
                        }
                        body { padding: 20px; font-family: 'Hiragino Kaku Gothic Pro', 'Meiryo', sans-serif; line-height: 1.6; }
                        h1 { font-size: 20pt; color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px; }
                        h2 { font-size: 16pt; color: #1e40af; margin-top: 30px; border-left: 5px solid #3b82f6; padding-left: 10px; }
                        h3 { font-size: 13pt; color: #374151; margin-top: 20px; }
                        h4 { font-size: 12pt; color: #4b5563; }
                        table { border-collapse: collapse; width: 100%; margin: 10px 0; }
                        th, td { border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; }
                        th { background: #f3f4f6; font-weight: bold; width: 30%; }
                        ul { margin: 10px 0; padding-left: 25px; }
                        li { margin: 5px 0; }
                        .header-info { background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 30px; }
                        .plan-item { background: #f9fafb; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #3b82f6; }
                    </style>
                </head>
                <body>
                    <div class="header-info">
                        <h1>ASD支援アプリ - 全体レポート</h1>
                        <p><strong>対象ご利用者:</strong> ${userName || '未設定'}様</p>
                        <p><strong>印刷日時:</strong> ${new Date().toLocaleString('ja-JP')}</p>
                    </div>
                    ${profileSummary}
                    <div class="page-break"></div>
                    ${step2Summary}
                    <div class="page-break"></div>
                    ${step3Summary}
                    <div class="page-break"></div>
                    ${step4Summary}
                </body>
                </html>
            `);
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
            }, 500);
        }
    };

    // 現在のステップを印刷
    const printCurrentStep = () => {
        const stepNames = { 1: 'ステップ1：ご利用者の生活を知ろう', 2: 'ステップ2：困った行動とその背景を知ろう', 3: 'ステップ3：支援の計画を立てよう', 4: 'ステップ4：実際に支援をしてみよう' };
        const printWindow = window.open('', '_blank');
        const contentElement = document.getElementById('step-content');
        
        if (contentElement && printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>ASD支援アプリ - ${stepNames[currentStep]} - ${userName || '未設定'}様</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    <style>
                        @media print {
                            body { font-size: 12pt; }
                            .no-print, .print\\:hidden { display: none !important; }
                        }
                        body { padding: 20px; font-family: sans-serif; }
                        h1 { font-size: 18pt; margin-bottom: 10px; }
                        .header-info { margin-bottom: 20px; padding: 10px; background: #f0f9ff; border-radius: 8px; }
                        table { border-collapse: collapse; width: 100%; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        input, textarea, select { border: 1px solid #ccc; padding: 4px; }
                    </style>
                </head>
                <body>
                    <div class="header-info">
                        <h1>ASD支援アプリ - ${stepNames[currentStep]}</h1>
                        <p>対象ご利用者: ${userName || '未設定'}様</p>
                        <p>印刷日時: ${new Date().toLocaleString('ja-JP')}</p>
                    </div>
                    ${contentElement.innerHTML}
                </body>
                </html>
            `);
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    };

    // ==================== ここまで保存・印刷機能 ====================

    useEffect(() => {
        setUserConcerns(prevConcerns => {
            const newConcerns = Array.from({ length: 20 }, (_, i) => {
                const existingConcern = prevConcerns[i] || { id: `concern-${i}`, content: '' };
                if (i < 10) {
                    return { ...existingConcern, content: problems[i]?.content || '' };
                }
                return existingConcern;
            });
            return newConcerns;
        });
    }, [problems]);

    const navigateToStep4Direct = (title, action) => {
        setCurrentStep(4);
        setStep4View('direct_implement');
        setAssessmentTargetAction(action);
        setStep4DirectTitle(title);
        
        // 短期的な対応か長期的な対応かを判定
        const longTermTitles = [
            '⑫認識のアセスメント',
            '⑬認識アセスメント結果の分析',
            '⑭支援員への支援のやり方の手順書（スケジュールボードやカレンダーなど）'
        ];
        const isLongTerm = longTermTitles.some(t => title.includes(t.substring(0, 6))); // ⑫認識、⑬認識、⑭支援 で判定
        setStep4ImplementationType(isLongTerm ? 'longTerm' : 'shortTerm');
        
        // タイトルから特性を判定（優先）
        if (title.includes('説明する場面') || title.includes('コミック会話') || title.includes('行動の変化を観察し検証')) {
            setSelectedTraitForStep4('想像することが苦手');
        } else if (title.includes('コミュニケーションサンプル') || title.includes('絵カード')) {
            setSelectedTraitForStep4('コミュニケーションが苦手');
        } else if (title.includes('構造化') || title.includes('空間')) {
            setSelectedTraitForStep4('特別な空間のとらえ方');
        } else if (title.includes('生活スキルの手順') || title.includes('ご利用者の手順に合わせた手順書') || (title.includes('手順書の実践') && !title.includes('ツール')) || (title.includes('実践の検証') && title.includes('⑮'))) {
            setSelectedTraitForStep4('特別な記憶の仕方');
        } else if (title.includes('立ち位置の確認') || title.includes('⑬実践の検証')) {
            setSelectedTraitForStep4('人からの刺激が苦手');
        } else if (title.includes('刺激を軽減') || title.includes('ツールの試行') || title.includes('試行の検証')) {
            setSelectedTraitForStep4('感覚過敏');
        } else {
            // 編集中の計画から特性を判定
            const editingPlan = supportPlans.find(p => p.id === editingPlanId);
            if (editingPlan && editingPlan.supportGroups) {
                const hasHenkaGaNigate = editingPlan.supportGroups.some(g => 
                    g.traits && g.traits.includes('変化が苦手')
                );
                const hasCommunicationGaNigate = editingPlan.supportGroups.some(g => 
                    g.traits && g.traits.includes('コミュニケーションが苦手')
                );
                const hasSozouGaNigate = editingPlan.supportGroups.some(g => 
                    g.traits && g.traits.includes('想像することが苦手')
                );
                const hasTokubetsuNaKioku = editingPlan.supportGroups.some(g => 
                    g.traits && g.traits.includes('特別な記憶の仕方')
                );
                const hasHitoKaraNigate = editingPlan.supportGroups.some(g => 
                    g.traits && g.traits.includes('人からの刺激が苦手')
                );
                const hasKankakuKabin = editingPlan.supportGroups.some(g => 
                    g.traits && g.traits.includes('感覚過敏')
                );
                if (hasTokubetsuNaKioku) {
                    setSelectedTraitForStep4('特別な記憶の仕方');
                } else if (hasHitoKaraNigate) {
                    setSelectedTraitForStep4('人からの刺激が苦手');
                } else if (hasKankakuKabin) {
                    setSelectedTraitForStep4('感覚過敏');
                } else if (hasHenkaGaNigate) {
                    setSelectedTraitForStep4('変化が苦手');
                } else if (hasCommunicationGaNigate) {
                    setSelectedTraitForStep4('コミュニケーションが苦手');
                } else if (hasSozouGaNigate) {
                    setSelectedTraitForStep4('想像することが苦手');
                }
            }
        }
        
        setBehaviorAssessmentSubTab(0);
    };

    // スキャッタープロット用ヘルパー
    const getScatterPlotData = (actionName) => {
        return scatterPlotData[actionName] || Array(48).fill(Array(14).fill(false));
    };

    const setScatterPlotDataForAction = (actionName, data) => {
        setScatterPlotData(prev => ({...prev, [actionName]: data}));
    };

    const getScatterPlotInfo = (actionName) => {
        return scatterPlotInfo[actionName] || { dates: Array(14).fill('') };
    };

    const setScatterPlotInfoForAction = (actionName, info) => {
        setScatterPlotInfo(prev => ({...prev, [actionName]: info}));
    };

    // Step2のスキャッタープロット・ABC記録を取得するヘルパー（actionNameをキーに直接参照）
    const getStep2ScatterData = (actionName) => {
        return step2AssessmentData?.scatterPlots?.[actionName] || null;
    };

    const getStep2ScatterInfo = (actionName) => {
        return step2AssessmentData?.scatterPlotInfos?.[actionName] || null;
    };

    const getStep2AbcRecords = (actionName) => {
        return step2AssessmentData?.abcRecords?.[actionName] || null;
    };

    // ABC記録用ヘルパー
    const getAbcRecords = (actionName) => {
        return abcRecords[actionName];
    };

    const setAbcRecordsForAction = (actionName, records) => {
        setAbcRecords(prev => ({...prev, [actionName]: records}));
    };

    // コミュニケーションサンプル用ヘルパー
    const getCommunicationSampleData = (actionName) => {
        return communicationSampleData[actionName];
    };

    const setCommunicationSampleDataForAction = (actionName, data) => {
        setCommunicationSampleData(prev => ({...prev, [actionName]: data}));
    };

    // コミュニケーション分析用ヘルパー
    const getCommunicationAnalysisData = (actionName) => {
        return communicationAnalysisData[actionName];
    };

    const setCommunicationAnalysisDataForAction = (actionName, data) => {
        setCommunicationAnalysisData(prev => ({...prev, [actionName]: data}));
    };

    // PECS手順書用ヘルパー
    const getPecsManualData = (actionName) => {
        return pecsManualData[actionName] || {
            currentPhase: '',
            specificGoal: '',
            layoutImage: null,
            layoutMemo: '',
            reinforcers: [],
            promptLevel: 1,
            fadingPlan: '',
            waitTime: 5,
            useErrorCorrection: false,
            errorCorrectionNotes: '',
            additionalNotes: ''
        };
    };

    const setPecsManualDataForAction = (actionName, data) => {
        setPecsManualData(prev => ({...prev, [actionName]: data}));
    };

    // ==================== Step4のレンダリング ====================
    const renderStep4Content = () => {
        if (step4View === 'direct_implement') {
            // editingPlanIdから常に最新の対象行動を取得
            const currentEditingPlan = supportPlans.find(p => p.id === editingPlanId);
            const currentActionName = currentEditingPlan ? currentEditingPlan.targetConcernContent : assessmentTargetAction;
            
            // 「変化が苦手」+「⑭ツールの作成または準備」の場合は特別なタブ名
            const isSupportProcedure = selectedTraitForStep4 === '変化が苦手' && (step4DirectTitle === '⑭ツールの作成または準備' || step4DirectTitle === '⑭支援員への支援のやり方の手順書（スケジュールボードやカレンダーなど）' || step4DirectTitle.includes('スケジュールボードの作成・カレンダーの準備') || step4DirectTitle.includes('スケジュールボードやカレンダーなど'));
            const tabName = isSupportProcedure 
                ? `⑭支援員への支援のやり方の手順書（スケジュールボードやカレンダーなど）（${currentActionName}）`
                : `${step4DirectTitle}（${currentActionName}）`;
            
            // 「想像することが苦手」の「⑫説明する場面の設定」も行動のアセスメントとして扱う
            const isScatterPlot = step4DirectTitle === '⑫行動のアセスメント';
            const isCommunicationSample = step4DirectTitle === '⑫コミュニケーションサンプル';
            const isRecognitionAssessment = step4DirectTitle === '⑫認識のアセスメント';
            // 空間の状況のアセスメント（特別な空間のとらえ方）
            const isSpatialAssessment = step4DirectTitle === '⑫空間の状況のアセスメント' || step4DirectTitle.includes('空間の状況のアセスメント');
            // 空間のアセスメント結果の分析（特別な空間のとらえ方）
            const isSpatialAnalysis = step4DirectTitle === '⑬空間のアセスメント結果の分析' || step4DirectTitle.includes('空間のアセスメント結果の分析');
            // 空間の構造化の案の作成（特別な空間のとらえ方）
            const isSpaceStructurizationPlan = step4DirectTitle === '⑭空間の構造化の案の作成' || step4DirectTitle.includes('空間の構造化の案の作成');
            // 構造化の実践（特別な空間のとらえ方）
            const isSpaceImplementation = step4DirectTitle === '⑮構造化の実践' || (selectedTraitForStep4 === '特別な空間のとらえ方' && step4DirectTitle.includes('構造化の実践'));
            // 構造化実践の検証（特別な空間のとらえ方）- isStructurizationVerificationに統合するため、こちらはfalseに
            const isSpaceVerification = false; // isStructurizationVerificationを使用
            const isAnalysis = step4DirectTitle === '⑬アセスメント結果の分析';
            const isCommunicationAnalysis = step4DirectTitle === '⑬コミュニケーションサンプルの分析';
            const isRecognitionAnalysis = step4DirectTitle === '⑬認識アセスメント結果の分析';
            // 緊急時対応の支援員への支援の手順書
            const isEmergencySupportProcedure = step4DirectTitle === '⑭支援員への支援の手順書';
            const isToolCreation = step4DirectTitle === '⑭ツールの作成または準備' || step4DirectTitle === '⑭支援員への支援のやり方の手順書（スケジュールボードやカレンダーなど）' || step4DirectTitle.includes('スケジュールボードの作成・カレンダーの準備');
            const isPecsManual = step4DirectTitle === '⑭支援員への支援のやり方の手順書（絵カードなどの作成）' || step4DirectTitle === '⑭絵カードなどの作成（支援者への支援手順書）' || step4DirectTitle.includes('絵カードなどの作成');
            console.log('step4DirectTitle:', step4DirectTitle);
            console.log('isPecsManual:', isPecsManual);
            const isToolImplementation = step4DirectTitle === '⑮ツールの実践';
            const isCardImplementation = step4DirectTitle === '⑮絵カードなどの実践';
            const isStructurizationImplementation = step4DirectTitle === '⑮構造化の実践';
            const isVerification = step4DirectTitle === '⑯実践の検証';
            // 緊急時対応の実践の検証
            const isEmergencyVerification = !selectedTraitForStep4 && step4DirectTitle === '⑯実践の検証';
            const isStructurizationVerification = step4DirectTitle === '⑯構造化実践の検証' || (selectedTraitForStep4 === '特別な空間のとらえ方' && step4DirectTitle.includes('構造化実践の検証'));
            // コミック会話試行（楽しい話題）- 想像することが苦手の⑫
            const isComicConversationTrial = step4DirectTitle.includes('コミック会話を楽しい話題で試行') || step4DirectTitle.includes('⑫コミック会話を楽しい');
            // コミック会話試行（説明が必要な場面）- 想像することが苦手の⑬
            const isComicConversationExplanation = step4DirectTitle.includes('支援員への支援のやり方の手順書（説明が必要な場面でコミック会話を試行）') || step4DirectTitle.includes('説明が必要な場面でコミック会話を試行') || step4DirectTitle.includes('⑬説明が必要な場面') || step4DirectTitle.includes('⑬支援員への支援のやり方の手順書（説明が必要な場面');
            // 行動の変化を観察し検証（想像することが苦手）- ⑭に変更
            const isBehaviorChangeVerification = step4DirectTitle.includes('行動の変化を観察し検証') || step4DirectTitle.includes('⑭行動の変化');
            // 生活スキルの手順の確認（特別な記憶の仕方）
            const isLifeSkillProcedure = step4DirectTitle.includes('生活スキルの手順の確認') || step4DirectTitle.includes('⑫ご利用者がした場合');
            // 手順書の実践（特別な記憶の仕方）
            const isProcedurePractice = step4DirectTitle.includes('手順書の実践') || step4DirectTitle.includes('⑭手順書の実践');
            // 実践の検証（特別な記憶の仕方）- ⑮
            const isProcedureVerification = selectedTraitForStep4 === '特別な記憶の仕方' && (step4DirectTitle.includes('実践の検証') || step4DirectTitle.includes('⑮実践の検証'));
            // 手順書作成（特別な記憶の仕方）
            const isMemoryProcedureCreation = step4DirectTitle.includes('支援員への支援のやり方の手順書（ご利用者の手順に合わせた手順書）') || step4DirectTitle.includes('ご利用者の手順に合わせた手順書の作成');
            // 刺激を軽減するツールの捜索（感覚過敏）- ⑫
            const isSensoryToolSearch = step4DirectTitle.includes('刺激を軽減するツールの捜索') || step4DirectTitle.includes('⑫刺激を軽減');
            // ツールの試行（感覚過敏）- ⑬
            const isSensoryToolTrial = step4DirectTitle.includes('支援員への支援のやり方の手順書（ツールの試行）') || step4DirectTitle.includes('ツールを試行');
            // 試行の検証（感覚過敏）- ⑭
            const isSensoryTrialVerification = step4DirectTitle.includes('試行の検証') || step4DirectTitle.includes('⑭試行の検証');
            // ご利用者との立ち位置の確認（人からの刺激が苦手）
            const isPositionCheck = step4DirectTitle.includes('ご利用者との立ち位置の確認') || step4DirectTitle.includes('⑫ご利用者との立ち位置');
            // 実践の検証（人からの刺激が苦手）- ⑬ タイトルに⑬実践が含まれる場合
            const isStimulusVerification = step4DirectTitle.includes('⑬実践の検証') || step4DirectTitle.includes('⑬実践');
            // スケジュールボードやカレンダーなどの手順書（変化が苦手）- ⑭
            const isScheduleProcedure = step4DirectTitle.includes('支援員への支援のやり方の手順書（スケジュールボードやカレンダーなど）') || step4DirectTitle.includes('⑭支援員への支援のやり方の手順書（スケジュール');
            // 緊急時対応の行動のアセスメントかどうか
            const isEmergencyAssessment = !selectedTraitForStep4 && isScatterPlot;
            const showAbcTab = (selectedTraitForStep4 === '変化が苦手' || isEmergencyAssessment) && isScatterPlot;
            const showCommunicationTab = selectedTraitForStep4 === 'コミュニケーションが苦手' && isScatterPlot;

            return (
                <div className="space-y-4">
                    {isScatterPlot && (
                        <div className="flex gap-2 border-b-2 border-gray-200 overflow-x-auto">
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(0)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                スキャッタープロット
                            </button>
                            {showAbcTab && (
                                <button 
                                    onClick={() => setBehaviorAssessmentSubTab(1)}
                                    className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                    ABC記録
                                </button>
                            )}
                            {showCommunicationTab && (
                                <button 
                                    onClick={() => setBehaviorAssessmentSubTab(2)}
                                    className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 2 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                    コミュニケーションサンプル
                                </button>
                            )}
                        </div>
                    )}
                    {isAnalysis && (
                        <div className="flex gap-2 border-b-2 border-gray-200 overflow-x-auto">
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(0)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                FAST
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(1)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                観察内容の分析結果
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(2)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 2 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                ストラテジーシート
                            </button>
                        </div>
                    )}
                    {isVerification && selectedTraitForStep4 !== 'コミュニケーションが苦手' && (
                        <div className="flex gap-2 border-b-2 border-gray-200 overflow-x-auto">
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(0)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用スキャッタープロット
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(1)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用ABC記録
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(2)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 2 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                実践の検証
                            </button>
                        </div>
                    )}
                    {isBehaviorChangeVerification && (
                        <div className="flex gap-2 border-b-2 border-gray-200 overflow-x-auto">
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(0)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用スキャッタープロット
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(1)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用ABC記録
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(2)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 2 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                行動の様子
                            </button>
                        </div>
                    )}
                    {isStructurizationVerification && (
                        <div className="flex gap-2 border-b-2 border-gray-200 overflow-x-auto">
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(0)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用スキャッタープロット
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(1)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用ABC記録
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(2)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 2 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                構造化実践の検証
                            </button>
                        </div>
                    )}
                    {isProcedureVerification && (
                        <div className="flex gap-2 border-b-2 border-gray-200 overflow-x-auto">
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(0)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用スキャッタープロット
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(1)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用ABC記録
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(2)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 2 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                実践の検証
                            </button>
                        </div>
                    )}
                    {isStimulusVerification && (
                        <div className="flex gap-2 border-b-2 border-gray-200 overflow-x-auto">
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(0)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用スキャッタープロット
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(1)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用ABC記録
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(2)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 2 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                実践の検証
                            </button>
                        </div>
                    )}
                    {isSensoryTrialVerification && (
                        <div className="flex gap-2 border-b-2 border-gray-200 overflow-x-auto">
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(0)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用スキャッタープロット
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(1)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                検証用ABC記録
                            </button>
                            <button 
                                onClick={() => setBehaviorAssessmentSubTab(2)}
                                className={`px-6 py-3 font-medium whitespace-nowrap ${behaviorAssessmentSubTab === 2 ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                                試行の検証
                            </button>
                        </div>
                    )}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <button onClick={() => { setCurrentStep(3); setStep3SubTab(1); setStep4View('default'); }} className="mb-4 text-sm text-blue-600 hover:underline">← 支援計画の編集に戻る</button>
                        <h3 className="text-lg font-bold">{tabName}</h3>
                        {isScatterPlot ? (
                            behaviorAssessmentSubTab === 0 ? (
                                <ScatterPlotComponent 
                                    actionName={assessmentTargetAction}
                                    data={getScatterPlotData(assessmentTargetAction)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(assessmentTargetAction)}
                                    setInfo={setScatterPlotInfoForAction}
                                    step2ScatterData={getStep2ScatterData(assessmentTargetAction)}
                                    step2ScatterInfo={getStep2ScatterInfo(assessmentTargetAction)}
                                />
                            ) : behaviorAssessmentSubTab === 1 && showAbcTab ? (
                                <AbcRecordComponent 
                                    actionName={assessmentTargetAction}
                                    records={getAbcRecords(assessmentTargetAction)}
                                    setRecords={setAbcRecordsForAction}
                                    step2AbcRecords={getStep2AbcRecords(assessmentTargetAction)}
                                />
                            ) : behaviorAssessmentSubTab === 2 && showCommunicationTab ? (
                                <CommunicationSample 
                                    actionName={assessmentTargetAction}
                                    data={getCommunicationSampleData(assessmentTargetAction)}
                                    setData={setCommunicationSampleDataForAction}
                                />
                            ) : (
                                <ScatterPlotComponent 
                                    actionName={assessmentTargetAction}
                                    data={getScatterPlotData(assessmentTargetAction)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(assessmentTargetAction)}
                                    setInfo={setScatterPlotInfoForAction}
                                    step2ScatterData={getStep2ScatterData(assessmentTargetAction)}
                                    step2ScatterInfo={getStep2ScatterInfo(assessmentTargetAction)}
                                />
                            )
                        ) : isCommunicationSample ? (
                            <CommunicationSample 
                                actionName={assessmentTargetAction}
                                data={getCommunicationSampleData(assessmentTargetAction)}
                                setData={setCommunicationSampleDataForAction}
                            />
                        ) : step4DirectTitle === '⑬アセスメント結果の分析' ? (
                            behaviorAssessmentSubTab === 0 ? (
                                <FastAssessmentComponent 
                                    actionName={assessmentTargetAction}
                                    fastData={getFastData(assessmentTargetAction)}
                                    updateFastData={updateFastData}
                                />
                            ) : behaviorAssessmentSubTab === 1 ? (
                                <BehaviorAnalysisChat 
                                    actionName={assessmentTargetAction}
                                    scatterPlotData={getScatterPlotData(assessmentTargetAction)}
                                    scatterPlotInfo={getScatterPlotInfo(assessmentTargetAction)}
                                    abcRecordData={getAbcRecords(assessmentTargetAction)}
                                    fastData={getFastData(assessmentTargetAction)}
                                />
                            ) : behaviorAssessmentSubTab === 2 ? (
                                <StrategySheet 
                                    strategyData={strategyData} 
                                    updateStrategyData={setStrategyData}
                                    actionName={assessmentTargetAction}
                                />
                            ) : (
                                <FastAssessmentComponent 
                                    actionName={assessmentTargetAction}
                                    fastData={getFastData(assessmentTargetAction)}
                                    updateFastData={updateFastData}
                                />
                            )
                        ) : isRecognitionAssessment ? (
                            <RecognitionAssessmentComponent 
                                data={recognitionAssessment}
                                setData={setRecognitionAssessment}
                                actionName={currentActionName}
                            />
                        ) : isSpatialAssessment ? (
                            <SpaceAssessmentComponent 
                                data={spaceAssessmentData}
                                setData={setSpaceAssessmentData}
                                actionName={currentActionName}
                            />
                        ) : isSpatialAnalysis ? (
                            <SpaceAnalysisComponent 
                                analysisData={spaceAnalysisData}
                                setAnalysisData={setSpaceAnalysisData}
                                assessmentData={spaceAssessmentData}
                                actionName={currentActionName}
                            />
                        ) : isSpaceStructurizationPlan ? (
                            <SpaceStructurizationPlanComponent 
                                data={spaceStructurizationPlanData}
                                setData={setSpaceStructurizationPlanData}
                                actionName={currentActionName}
                            />
                        ) : isSpaceImplementation ? (
                            <SpaceImplementationComponent 
                                data={spaceImplementationData}
                                setData={setSpaceImplementationData}
                                actionName={currentActionName}
                            />
                        ) : isSpaceVerification ? (
                            <SpaceVerificationComponent 
                                data={spaceVerificationData}
                                setData={setSpaceVerificationData}
                                actionName={currentActionName}
                            />
                        ) : isRecognitionAnalysis ? (
                            <RecognitionAnalysisComponent 
                                analysisData={analysisData}
                                setAnalysisData={setAnalysisData}
                                assessmentData={recognitionAssessment}
                                actionName={currentActionName}
                            />
                        ) : isComicConversationTrial ? (
                            <ComicConversationTrialComponent 
                                trialData={comicConversationTrialData}
                                setTrialData={setComicConversationTrialData}
                                actionName={currentActionName}
                            />
                        ) : isComicConversationExplanation ? (
                            <ComicConversationExplanationComponent 
                                trialData={comicConversationExplanationData}
                                setTrialData={setComicConversationExplanationData}
                                actionName={currentActionName}
                            />
                        ) : isBehaviorChangeVerification ? (
                            behaviorAssessmentSubTab === 0 ? (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_verification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_verification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_verification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            ) : behaviorAssessmentSubTab === 1 ? (
                                <AbcRecordComponent 
                                    actionName={`${assessmentTargetAction}_verification`}
                                    records={getAbcRecords(`${assessmentTargetAction}_verification`)}
                                    setRecords={setAbcRecordsForAction}
                                />
                            ) : (
                                <BehaviorChangeObservationComponent 
                                    observationData={behaviorChangeObservationData}
                                    setObservationData={setBehaviorChangeObservationData}
                                    actionName={currentActionName}
                                />
                            )
                        ) : isLifeSkillProcedure ? (
                            <LifeSkillProcedureComponent 
                                procedureData={lifeSkillProcedureData}
                                setProcedureData={setLifeSkillProcedureData}
                                actionName={currentActionName}
                            />
                        ) : isProcedurePractice ? (
                            <ProcedurePracticeComponent 
                                practiceData={procedurePracticeData}
                                setPracticeData={setProcedurePracticeData}
                                actionName={currentActionName}
                            />
                        ) : isPositionCheck ? (
                            <PositionCheckComponent 
                                checkData={positionCheckData}
                                setCheckData={setPositionCheckData}
                                actionName={currentActionName}
                            />
                        ) : isStimulusVerification ? (
                            behaviorAssessmentSubTab === 0 ? (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_stimulusVerification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_stimulusVerification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_stimulusVerification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            ) : behaviorAssessmentSubTab === 1 ? (
                                <AbcRecordComponent 
                                    actionName={`${assessmentTargetAction}_stimulusVerification`}
                                    records={getAbcRecords(`${assessmentTargetAction}_stimulusVerification`)}
                                    setRecords={setAbcRecordsForAction}
                                />
                            ) : behaviorAssessmentSubTab === 2 ? (
                                <StimulusVerificationComponent 
                                    verificationData={stimulusVerificationData}
                                    setVerificationData={setStimulusVerificationData}
                                    positionCheckData={positionCheckData}
                                    actionName={currentActionName}
                                />
                            ) : (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_stimulusVerification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_stimulusVerification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_stimulusVerification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            )
                        ) : isProcedureVerification ? (
                            behaviorAssessmentSubTab === 0 ? (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_procedureVerification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_procedureVerification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_procedureVerification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            ) : behaviorAssessmentSubTab === 1 ? (
                                <AbcRecordComponent 
                                    actionName={`${assessmentTargetAction}_procedureVerification`}
                                    records={getAbcRecords(`${assessmentTargetAction}_procedureVerification`)}
                                    setRecords={setAbcRecordsForAction}
                                />
                            ) : behaviorAssessmentSubTab === 2 ? (
                                <ProcedureVerificationComponent 
                                    verificationData={procedureVerificationData}
                                    setVerificationData={setProcedureVerificationData}
                                    procedureData={lifeSkillProcedureData}
                                    scatterPlotData={getScatterPlotData(`${assessmentTargetAction}_procedureVerification`)}
                                    abcRecordsData={getAbcRecords(`${assessmentTargetAction}_procedureVerification`)}
                                    actionName={currentActionName}
                                />
                            ) : (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_procedureVerification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_procedureVerification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_procedureVerification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            )
                        ) : isMemoryProcedureCreation ? (
                            <SupportProcedureComponent 
                                procedureData={memoryProcedureData}
                                setProcedureData={setMemoryProcedureData}
                            />
                        ) : isScheduleProcedure ? (
                            <SupportProcedureComponent 
                                procedureData={scheduleProcedureData}
                                setProcedureData={setScheduleProcedureData}
                            />
                        ) : isSensoryToolSearch ? (
                            <SensoryToolSearchComponent 
                                searchData={sensoryToolSearchData}
                                setSearchData={setSensoryToolSearchData}
                                actionName={currentActionName}
                            />
                        ) : isSensoryToolTrial ? (
                            <SupportProcedureComponent 
                                procedureData={sensoryProcedureData}
                                setProcedureData={setSensoryProcedureData}
                            />
                        ) : isSensoryTrialVerification ? (
                            behaviorAssessmentSubTab === 0 ? (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_sensoryTrialVerification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_sensoryTrialVerification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_sensoryTrialVerification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            ) : behaviorAssessmentSubTab === 1 ? (
                                <AbcRecordComponent 
                                    actionName={`${assessmentTargetAction}_sensoryTrialVerification`}
                                    records={getAbcRecords(`${assessmentTargetAction}_sensoryTrialVerification`)}
                                    setRecords={setAbcRecordsForAction}
                                />
                            ) : behaviorAssessmentSubTab === 2 ? (
                                <SensoryTrialVerificationComponent 
                                    verificationData={sensoryTrialVerificationData}
                                    setVerificationData={setSensoryTrialVerificationData}
                                    searchData={sensoryToolSearchData}
                                    actionName={currentActionName}
                                />
                            ) : (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_sensoryTrialVerification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_sensoryTrialVerification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_sensoryTrialVerification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            )
                        ) : isEmergencySupportProcedure ? (
                            <SupportProcedureComponent 
                                procedureData={supportProcedureData}
                                setProcedureData={setSupportProcedureData}
                            />
                        ) : isToolCreation ? (
                            isSupportProcedure ? (
                                <SupportProcedureComponent 
                                    procedureData={supportProcedureData}
                                    setProcedureData={setSupportProcedureData}
                                />
                            ) : (
                                <ToolCreationComponent 
                                    toolData={toolData}
                                    setToolData={setToolData}
                                />
                            )
                        ) : isToolImplementation ? (
                            <ToolImplementationComponent 
                                implementationData={step4ImplementationType === 'longTerm' ? longTermImplementationData : shortTermImplementationData}
                                setImplementationData={step4ImplementationType === 'longTerm' ? setLongTermImplementationData : setShortTermImplementationData}
                            />
                        ) : isStructurizationImplementation ? (
                            <ToolImplementationComponent 
                                implementationData={structurizationImplementationData}
                                setImplementationData={setStructurizationImplementationData}
                            />
                        ) : isVerification ? (
                            !selectedTraitForStep4 ? (
                                // 緊急時対応の実践の検証
                                behaviorAssessmentSubTab === 0 ? (
                                    <ScatterPlotComponent 
                                        actionName={`${assessmentTargetAction}_emergencyVerification`}
                                        data={getScatterPlotData(`${assessmentTargetAction}_emergencyVerification`)}
                                        setData={setScatterPlotDataForAction}
                                        info={getScatterPlotInfo(`${assessmentTargetAction}_emergencyVerification`)}
                                        setInfo={setScatterPlotInfoForAction}
                                    />
                                ) : behaviorAssessmentSubTab === 1 ? (
                                    <AbcRecordComponent 
                                        actionName={`${assessmentTargetAction}_emergencyVerification`}
                                        records={getAbcRecords(`${assessmentTargetAction}_emergencyVerification`)}
                                        setRecords={setAbcRecordsForAction}
                                    />
                                ) : behaviorAssessmentSubTab === 2 ? (
                                    <EmergencyVerificationComponent 
                                        verificationData={emergencyVerificationData}
                                        setVerificationData={setEmergencyVerificationData}
                                        scatterPlotData={getScatterPlotInfo(`${assessmentTargetAction}_emergencyVerification`)}
                                        abcRecordsData={getAbcRecords(`${assessmentTargetAction}_emergencyVerification`)}
                                        actionName={assessmentTargetAction}
                                    />
                                ) : (
                                    <ScatterPlotComponent 
                                        actionName={`${assessmentTargetAction}_emergencyVerification`}
                                        data={getScatterPlotData(`${assessmentTargetAction}_emergencyVerification`)}
                                        setData={setScatterPlotDataForAction}
                                        info={getScatterPlotInfo(`${assessmentTargetAction}_emergencyVerification`)}
                                        setInfo={setScatterPlotInfoForAction}
                                    />
                                )
                            ) : selectedTraitForStep4 === 'コミュニケーションが苦手' ? (
                                <CommunicationVerificationComponent 
                                    verificationData={communicationVerificationData} 
                                    setVerificationData={setCommunicationVerificationData}
                                    actionName={assessmentTargetAction}
                                />
                            ) : behaviorAssessmentSubTab === 0 ? (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_timeVerification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_timeVerification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_timeVerification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            ) : behaviorAssessmentSubTab === 1 ? (
                                <AbcRecordComponent 
                                    actionName={`${assessmentTargetAction}_timeVerification`}
                                    records={getAbcRecords(`${assessmentTargetAction}_timeVerification`)}
                                    setRecords={setAbcRecordsForAction}
                                />
                            ) : behaviorAssessmentSubTab === 2 ? (
                                <TimeStructureVerificationComponent 
                                    verificationData={timeStructureVerificationData}
                                    setVerificationData={setTimeStructureVerificationData}
                                    procedureData={lifeSkillProcedureData}
                                    toolPracticeData={structurizationImplementationData}
                                    scatterPlotData={getScatterPlotData(`${assessmentTargetAction}_timeVerification`)}
                                    abcRecordsData={getAbcRecords(`${assessmentTargetAction}_timeVerification`)}
                                    actionName={assessmentTargetAction}
                                />
                            ) : (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_timeVerification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_timeVerification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_timeVerification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            )
                        ) : isStructurizationVerification ? (
                            behaviorAssessmentSubTab === 0 ? (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_structurizationVerification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_structurizationVerification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_structurizationVerification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            ) : behaviorAssessmentSubTab === 1 ? (
                                <AbcRecordComponent 
                                    actionName={`${assessmentTargetAction}_structurizationVerification`}
                                    records={getAbcRecords(`${assessmentTargetAction}_structurizationVerification`)}
                                    setRecords={setAbcRecordsForAction}
                                />
                            ) : behaviorAssessmentSubTab === 2 ? (
                                <SpaceVerificationComponent 
                                    data={spaceVerificationData}
                                    setData={setSpaceVerificationData}
                                    actionName={currentActionName}
                                />
                            ) : (
                                <ScatterPlotComponent 
                                    actionName={`${assessmentTargetAction}_structurizationVerification`}
                                    data={getScatterPlotData(`${assessmentTargetAction}_structurizationVerification`)}
                                    setData={setScatterPlotDataForAction}
                                    info={getScatterPlotInfo(`${assessmentTargetAction}_structurizationVerification`)}
                                    setInfo={setScatterPlotInfoForAction}
                                />
                            )
                        ) : isCommunicationAnalysis ? (
                            <CommunicationAnalysis 
                                actionName={assessmentTargetAction}
                                data={getCommunicationAnalysisData(assessmentTargetAction)}
                                setData={setCommunicationAnalysisDataForAction}
                            />
                        ) : isPecsManual ? (
                            <PecsManualComponent 
                                actionName={assessmentTargetAction}
                                data={getPecsManualData(assessmentTargetAction)}
                                setData={setPecsManualDataForAction}
                            />
                        ) : isCardImplementation ? (
                            <CardImplementationComponent 
                                implementationData={cardImplementationData}
                                setImplementationData={setCardImplementationData}
                            />
                        ) : (
                            <p>（実装予定）</p>
                        )}
                    </div>
                </div>
            );
        }
        
        // Stage 1: Select Plan
        if (step4Stage === 'select_plan') {
            return (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">⑫支援を選ぶ</h3>
                    <p className="text-sm text-gray-600 mb-6">ステップ3で作成した支援計画の中から、実際に支援を行うものを選択してください。</p>
                    {supportPlans.length > 0 ? (
                        <div className="space-y-3">
                            {supportPlans.map(plan => (
                                <div key={plan.id} className="p-4 border rounded-lg flex justify-between items-center">
                                    <p className="font-semibold">{plan.targetConcernContent}</p>
                                    <button
                                        onClick={() => {
                                            setSelectedPlanIdForStep4(plan.id);
                                            setStep4Stage('select_trait');
                                        }}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        この行動を選択
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">支援計画がありません。ステップ3で計画を作成してください。</p>
                    )}
                </div>
            );
        }
        
        const selectedPlan = supportPlans.find(p => p.id === selectedPlanIdForStep4);
        if (!selectedPlan) return <p>計画が見つかりません。ステップ4の最初の画面に戻ってください。</p>;

        // Stage 2: Select Trait
        if (step4Stage === 'select_trait') {
            const uniqueTraits = selectedPlan.supportGroups.flatMap(g => g.traits);
            return (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <button onClick={() => { setStep4Stage('select_plan'); setSelectedPlanIdForStep4(null); }} className="mb-4 text-sm text-blue-600 hover:underline">← 行動の選択に戻る</button>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">支援する「自閉症の視点」を選択</h3>
                    <p className="mb-6">対象の行動: <span className="font-semibold">{selectedPlan.targetConcernContent}</span></p>
                    <div className="space-y-3">
                        {uniqueTraits.map(trait => (
                            <div key={trait} className="p-4 border rounded-lg flex justify-between items-center">
                                <p className="font-semibold">{trait}</p>
                                <button
                                    onClick={() => {
                                        setSelectedTraitForStep4(trait);
                                        setStep4NestedTab(0);
                                        setBehaviorAssessmentSubTab(0);
                                        setStep4Stage('implement');
                                    }}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    この視点で支援を開始
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Stage 3: Implement
        if (step4Stage === 'implement') {
            let nestedTabs = [];
            let tabPrefix = '⑬';

            if (selectedTraitForStep4 === '変化が苦手') {
                nestedTabs = ['認識のアセスメント', '行動のアセスメント', 'アセスメント結果の分析', 'ツールの作成', 'ツールの試用', '試用の検証'];
            } else if (selectedTraitForStep4 === 'コミュニケーションが苦手') {
                nestedTabs = ['コミュニケーションサンプル', 'アセスメント結果の分析', 'ツールの作成', 'ツールの実践', '実践の検証', '支援員への支援のやり方の手順書（絵カードなどの作成）', '絵カードなどの実践'];
            } else if (selectedTraitForStep4 === '特別な空間のとらえ方') {
                nestedTabs = ['アセスメント', 'アセスメント結果の分析', 'ツールの作成', 'ツールの実践', '実践の検証'];
            } else {
                nestedTabs = ['支援の実施'];
            }

            const finalNestedTabs = nestedTabs.map((name, i) => {
                if (nestedTabs.length > 1) {
                    if (selectedTraitForStep4 === '変化が苦手') {
                        const stepTitles = ['⑬-1認識のアセスメント', '⑬-2行動のアセスメント', '⑬-3アセスメント結果の分析', '⑬-4ツールの作成', '⑬-5ツールの試用', '⑬-6試用の検証'];
                        return stepTitles[i];
                    } else if (selectedTraitForStep4 === 'コミュニケーションが苦手') {
                        const stepTitles = ['⑬-1コミュニケーションサンプル', '⑬-2アセスメント結果の分析', '⑬-3ツールの作成', '⑬-4ツールの実践', '⑬-5実践の検証', '⑭支援員への支援のやり方の手順書（絵カードなどの作成）', '⑮絵カードなどの実践'];
                        return stepTitles[i];
                    } else if (selectedTraitForStep4 === '特別な空間のとらえ方') {
                        const stepTitles = ['⑬-1アセスメント', '⑬-2アセスメント結果の分析', '⑬-3ツールの作成', '⑬-4ツールの実践', '⑬-5実践の検証'];
                        return stepTitles[i];
                    }
                    return `${tabPrefix}-${i + 1}${name}`;
                }
                return `${tabPrefix}${name}`;
            });
            
            // デバッグ: 生成されたタブ名を確認
            console.log('selectedTraitForStep4:', selectedTraitForStep4);
            console.log('finalNestedTabs:', finalNestedTabs);
            console.log('current step4NestedTab:', step4NestedTab);
            console.log('current tab name:', finalNestedTabs[step4NestedTab]);
            
            return (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <button onClick={() => { setStep4Stage('select_trait'); setSelectedTraitForStep4(null); }} className="mb-4 text-sm text-blue-600 hover:underline">← 視点の選択に戻る</button>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">{`⑬ ${selectedTraitForStep4}　対象行動：${selectedPlan.targetConcernContent}`}</h3>
                    <div className="flex gap-2 border-b-2 border-gray-100 overflow-x-auto mb-4">
                        {finalNestedTabs.map((nestedTabName, nestedIdx) => (
                            <button
                                key={nestedIdx}
                                onClick={() => setStep4NestedTab(nestedIdx)}
                                className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                                    step4NestedTab === nestedIdx
                                        ? 'text-green-600 border-b-2 border-green-600'
                                        : 'text-gray-500 hover:text-green-500'
                                }`}
                            >
                                {nestedTabName}
                            </button>
                        ))}
                    </div>
                    <div>
                        {/* デバッグ情報（開発時のみ表示） */}
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded text-xs">
                            <strong>デバッグ情報:</strong><br/>
                            特性: {selectedTraitForStep4}<br/>
                            タブインデックス: {step4NestedTab}<br/>
                            タブ名: {finalNestedTabs[step4NestedTab]}<br/>
                            全タブ: {finalNestedTabs.join(' | ')}
                        </div>
                        
                        {finalNestedTabs[step4NestedTab] === '⑬-1コミュニケーションサンプル' && selectedTraitForStep4 === 'コミュニケーションが苦手' ? (
                            <CommunicationSample 
                                actionName={selectedPlan.targetConcernContent}
                                data={getCommunicationSampleData(selectedPlan.targetConcernContent)}
                                setData={setCommunicationSampleDataForAction}
                            />
                        ) : finalNestedTabs[step4NestedTab] === '⑬-1認識のアセスメント' && selectedTraitForStep4 === '変化が苦手' ? (
                            <RecognitionAssessmentComponent 
                                data={recognitionAssessment}
                                setData={setRecognitionAssessment}
                                actionName={selectedPlan.targetConcernContent}
                            />
                        ) : finalNestedTabs[step4NestedTab] === '⑬-1アセスメント' && selectedTraitForStep4 === '特別な空間のとらえ方' ? (
                            <div className="space-y-4">
                                <div className="flex gap-2 border-b border-gray-200 mb-4">
                                    <button 
                                        onClick={() => setBehaviorAssessmentSubTab(0)}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
                                        }`}>
                                        スキャッタープロット
                                    </button>
                                    <button 
                                        onClick={() => setBehaviorAssessmentSubTab(1)}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
                                        }`}>
                                        ABC記録
                                    </button>
                                </div>
                                {behaviorAssessmentSubTab === 0 ? (
                                    <ScatterPlotComponent 
                                        actionName={selectedPlan.targetConcernContent}
                                        data={getScatterPlotData(selectedPlan.targetConcernContent)}
                                        setData={setScatterPlotDataForAction}
                                        info={getScatterPlotInfo(selectedPlan.targetConcernContent)}
                                        setInfo={setScatterPlotInfoForAction}
                                    />
                                ) : (
                                    <AbcRecordComponent 
                                        actionName={selectedPlan.targetConcernContent}
                                        records={getAbcRecords(selectedPlan.targetConcernContent)}
                                        setRecords={setAbcRecordsForAction}
                                    />
                                )}
                            </div>
                        ) : finalNestedTabs[step4NestedTab] === '⑬-2行動のアセスメント' && selectedTraitForStep4 === '変化が苦手' ? (
                            <div className="space-y-4">
                                <div className="flex gap-2 border-b border-gray-200 mb-4">
                                    <button 
                                        onClick={() => setBehaviorAssessmentSubTab(0)}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
                                        }`}>
                                        スキャッタープロット
                                    </button>
                                    <button 
                                        onClick={() => setBehaviorAssessmentSubTab(1)}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
                                        }`}>
                                        ABC記録
                                    </button>
                                </div>
                                {behaviorAssessmentSubTab === 0 ? (
                                    <ScatterPlotComponent 
                                        actionName={selectedPlan.targetConcernContent}
                                        data={getScatterPlotData(selectedPlan.targetConcernContent)}
                                        setData={setScatterPlotDataForAction}
                                        info={getScatterPlotInfo(selectedPlan.targetConcernContent)}
                                        setInfo={setScatterPlotInfoForAction}
                                    />
                                ) : (
                                    <AbcRecordComponent 
                                        actionName={selectedPlan.targetConcernContent}
                                        records={getAbcRecords(selectedPlan.targetConcernContent)}
                                        setRecords={setAbcRecordsForAction}
                                    />
                                )}
                            </div>
                        ) : finalNestedTabs[step4NestedTab] === '⑬-3アセスメント結果の分析' && selectedTraitForStep4 === '変化が苦手' ? (
                            <div className="space-y-4">
                                <div className="flex gap-2 border-b border-gray-200 mb-4">
                                    <button 
                                        onClick={() => setBehaviorAssessmentSubTab(0)}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
                                        }`}>
                                        FAST
                                    </button>
                                </div>
                                {behaviorAssessmentSubTab === 0 && (
                                    <FastAssessmentComponent 
                                        actionName={selectedPlan.targetConcernContent}
                                        fastData={getFastData(selectedPlan.targetConcernContent)}
                                        updateFastData={updateFastData}
                                    />
                                )}
                            </div>
                        ) : finalNestedTabs[step4NestedTab] === '⑬-5実践の検証' && selectedTraitForStep4 === '特別な空間のとらえ方' ? (
                            <div className="space-y-4">
                                <div className="flex gap-2 border-b border-gray-200 mb-4">
                                    <button 
                                        onClick={() => setBehaviorAssessmentSubTab(0)}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            behaviorAssessmentSubTab === 0 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
                                        }`}>
                                        スキャッタープロット
                                    </button>
                                    <button 
                                        onClick={() => setBehaviorAssessmentSubTab(1)}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            behaviorAssessmentSubTab === 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
                                        }`}>
                                        ABC記録
                                    </button>
                                    <button 
                                        onClick={() => setBehaviorAssessmentSubTab(2)}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            behaviorAssessmentSubTab === 2 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
                                        }`}>
                                        検証用ストラテジーシート
                                    </button>
                                </div>
                                {behaviorAssessmentSubTab === 0 ? (
                                    <ScatterPlotComponent 
                                        actionName={selectedPlan.targetConcernContent}
                                        data={getScatterPlotData(selectedPlan.targetConcernContent)}
                                        setData={setScatterPlotDataForAction}
                                        info={getScatterPlotInfo(selectedPlan.targetConcernContent)}
                                        setInfo={setScatterPlotInfoForAction}
                                    />
                                ) : behaviorAssessmentSubTab === 1 ? (
                                    <AbcRecordComponent 
                                        actionName={selectedPlan.targetConcernContent}
                                        records={getAbcRecords(selectedPlan.targetConcernContent)}
                                        setRecords={setAbcRecordsForAction}
                                    />
                                ) : behaviorAssessmentSubTab === 2 ? (
                                    <VerificationStrategySheet 
                                        verificationData={verificationData} 
                                        updateVerificationData={setVerificationData}
                                        actionName={selectedPlan.targetConcernContent}
                                    />
                                ) : (
                                    <ScatterPlotComponent 
                                        actionName={selectedPlan.targetConcernContent}
                                        data={getScatterPlotData(selectedPlan.targetConcernContent)}
                                        setData={setScatterPlotDataForAction}
                                        info={getScatterPlotInfo(selectedPlan.targetConcernContent)}
                                        setInfo={setScatterPlotInfoForAction}
                                    />
                                )}
                            </div>
                        ) : finalNestedTabs[step4NestedTab] === '⑬-2アセスメント結果の分析' && selectedTraitForStep4 === '特別な空間のとらえ方' ? (
                            <StrategySheet 
                                strategyData={strategyData} 
                                updateStrategyData={setStrategyData}
                                actionName={selectedPlan.targetConcernContent}
                            />
                        ) : finalNestedTabs[step4NestedTab] === '⑬-3ツールの作成' && selectedTraitForStep4 === '特別な空間のとらえ方' ? (
                            <ToolCreationComponent 
                                toolData={toolData}
                                setToolData={setToolData}
                            />
                        ) : finalNestedTabs[step4NestedTab] === '⑬-4ツールの実践' && selectedTraitForStep4 === '特別な空間のとらえ方' ? (
                            <ToolImplementationComponent 
                                implementationData={structurizationImplementationData}
                                setImplementationData={setStructurizationImplementationData}
                            />
                        ) : finalNestedTabs[step4NestedTab] === '⑬-2アセスメント結果の分析' && selectedTraitForStep4 === 'コミュニケーションが苦手' ? (
                            <CommunicationAnalysis 
                                actionName={selectedPlan.targetConcernContent}
                                data={getCommunicationAnalysisData(selectedPlan.targetConcernContent)}
                                setData={setCommunicationAnalysisDataForAction}
                            />
                        ) : finalNestedTabs[step4NestedTab] === '⑬-3ツールの作成' && selectedTraitForStep4 === 'コミュニケーションが苦手' ? (
                            <ToolCreationComponent 
                                toolData={toolData}
                                setToolData={setToolData}
                            />
                        ) : finalNestedTabs[step4NestedTab] === '⑬-4ツールの実践' && selectedTraitForStep4 === 'コミュニケーションが苦手' ? (
                            <ToolImplementationComponent 
                                implementationData={shortTermImplementationData}
                                setImplementationData={setShortTermImplementationData}
                            />
                        ) : finalNestedTabs[step4NestedTab] === '⑬-5実践の検証' && selectedTraitForStep4 === 'コミュニケーションが苦手' ? (
                            <CommunicationVerificationComponent 
                                verificationData={communicationVerificationData} 
                                setVerificationData={setCommunicationVerificationData}
                                actionName={selectedPlan.targetConcernContent}
                            />
                        ) : (selectedTraitForStep4 === 'コミュニケーションが苦手' && step4NestedTab === 5) ? (
                            <PecsManualComponent 
                                actionName={selectedPlan.targetConcernContent}
                                data={getPecsManualData(selectedPlan.targetConcernContent)}
                                setData={setPecsManualDataForAction}
                            />
                        ) : (selectedTraitForStep4 === 'コミュニケーションが苦手' && step4NestedTab === 6) ? (
                            <CardImplementationComponent 
                                implementationData={cardImplementationData}
                                setImplementationData={setCardImplementationData}
                            />
                        ) : (selectedTraitForStep4 === 'コミュニケーションが苦手' && finalNestedTabs[step4NestedTab] && finalNestedTabs[step4NestedTab].includes('絵カードなどの作成')) ? (
                            <PecsManualComponent 
                                actionName={selectedPlan.targetConcernContent}
                                data={getPecsManualData(selectedPlan.targetConcernContent)}
                                setData={setPecsManualDataForAction}
                            />
                        ) : finalNestedTabs[step4NestedTab] === '⑭支援員への支援のやり方の手順書（絵カードなどの作成）' && selectedTraitForStep4 === 'コミュニケーションが苦手' ? (
                            <PecsManualComponent 
                                actionName={selectedPlan.targetConcernContent}
                                data={getPecsManualData(selectedPlan.targetConcernContent)}
                                setData={setPecsManualDataForAction}
                            />
                        ) : (selectedTraitForStep4 === 'コミュニケーションが苦手' && finalNestedTabs[step4NestedTab] && finalNestedTabs[step4NestedTab].includes('絵カードなどの実践')) ? (
                            <CardImplementationComponent 
                                implementationData={cardImplementationData}
                                setImplementationData={setCardImplementationData}
                            />
                        ) : (
                            <>
                                <h4 className="text-lg font-bold mb-4">{finalNestedTabs[step4NestedTab]}</h4>
                                <p>（実装予定）</p>
                            </>
                        )}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 print:bg-white print:p-0">
            {/* 印刷用スタイル */}
            <style>{`
                @media print {
                    .print\\:hidden { display: none !important; }
                    .print\\:bg-white { background: white !important; }
                    .print\\:p-0 { padding: 0 !important; }
                    .print\\:mb-4 { margin-bottom: 1rem !important; }
                    .print\\:border-none { border: none !important; }
                    .print\\:text-center { text-align: center !important; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            `}</style>
            <div className="max-w-7xl mx-auto">
                {/* ヘッダー部分 */}
                <div className="mb-8 print:mb-4">
                    <div className="text-center mb-4">
                        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                            ASDの方のための支援アプリ
                        </h1>
                        <div className="h-1 w-64 mx-auto bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mt-2"></div>
                    </div>
                    
                    {/* 対象ご利用者入力（中央）とボタン（右端） */}
                    <div className="relative print:hidden">
                        {/* 対象ご利用者入力欄（中央） */}
                        <div className="flex justify-center">
                            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm py-3 px-6 rounded-2xl shadow-lg border border-white/50">
                                <label className="text-lg font-semibold text-gray-700 whitespace-nowrap">対象ご利用者</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="お名前を入力"
                                    className="w-40 px-4 py-2.5 border-2 border-blue-200 rounded-xl focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400 text-lg font-medium bg-white shadow-inner transition-all"
                                />
                                <span className="text-lg font-semibold text-gray-700 whitespace-nowrap">様</span>
                            </div>
                        </div>
                        
                        {/* 全体保存・印刷・読み込みボタン（右端・絶対位置） */}
                        <div className="absolute right-0 top-0 flex flex-col gap-2">
                            <button
                                onClick={saveAllData}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl hover:from-emerald-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-medium text-sm"
                            >
                                <span>💾</span> すべてのページを保存
                            </button>
                            <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-medium cursor-pointer text-sm">
                                <span>📂</span> データを読み込む
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={loadDataFromFile}
                                    className="hidden"
                                />
                            </label>
                            <button
                                onClick={printAll}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-xl hover:from-violet-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-medium text-sm"
                            >
                                <span>🖨️</span> 全てのページを印刷
                            </button>
                        </div>
                    </div>
                    
                    {/* 印刷用の対象ご利用者表示 */}
                    <div className="hidden print:flex justify-center items-center gap-2">
                        <label className="text-lg font-semibold text-gray-700">対象ご利用者</label>
                        <span className="text-lg font-medium">{userName || 'お名前を入力'}</span>
                        <span className="text-lg font-semibold text-gray-700">様</span>
                    </div>
                </div>

                {/* ステップナビゲーション */}
                <div className="flex flex-wrap gap-3 mb-8 justify-center print:hidden">
                    {[
                        { step: 1, title: ['ステップ1', 'ご利用者の', '生活を知ろう'], icon: '👤', color: 'blue' },
                        { step: 2, title: ['ステップ2', '困った行動と', 'その背景を知ろう'], icon: '🔍', color: 'indigo' },
                        { step: 3, title: ['ステップ3', '支援の計画を', '立てよう'], icon: '📋', color: 'purple' },
                        { step: 4, title: ['ステップ4', '実際に支援を', 'してみよう'], icon: '🤝', color: 'violet' }
                    ].map(({ step, title, icon, color }) => (
                        <button
                            key={step}
                            onClick={() => {
                                setCurrentStep(step);
                                if (step !== 1) setCurrentSubTab(0);
                                if (step !== 2) setStep2SubTab(0);
                                if (step !== 3) setStep3SubTab(0);
                                if (step === 4) {
                                    setStep4View('default');
                                    setStep4Stage('select_plan');
                                    setSelectedPlanIdForStep4(null);
                                    setSelectedTraitForStep4(null);
                                    setStep4NestedTab(0);
                                    setBehaviorAssessmentSubTab(0);
                                }
                            }}
                            className={`w-28 h-28 rounded-2xl p-3 transition-all duration-300 transform hover:scale-105 flex-shrink-0 border-2 ${
                                currentStep === step
                                    ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-xl border-transparent ring-4 ring-blue-300/50'
                                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg border-gray-100 hover:border-blue-200'
                            }`}
                        >
                            <div className="h-full flex flex-col justify-center items-center text-center gap-1">
                                <span className="text-xl mb-0.5">{icon}</span>
                                {title.map((line, idx) => (
                                    <div key={idx} className={`${idx === 0 ? 'font-bold text-xs' : 'text-[10px] font-medium leading-tight'}`}>
                                        {line}
                                    </div>
                                ))}
                            </div>
                        </button>
                    ))}
                </div>

                {/* メインコンテンツエリア */}
                <div id="step-content" className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                    {/* ステップ別保存・印刷ボタン */}
                    <SavePrintButtons 
                        onSave={() => saveStepData(currentStep)}
                        onPrint={printCurrentStep}
                    />
                    
                    {currentStep === 1 && (
                        <Step1Content 
                            currentSubTab={currentSubTab}
                            setCurrentSubTab={setCurrentSubTab}
                            profile={profile}
                            setProfile={setProfile}
                            assessment={assessment}
                            setAssessment={setAssessment}
                            schedule={schedule}
                            setSchedule={setSchedule}
                            scheduleHistory={scheduleHistory}
                            setScheduleHistory={setScheduleHistory}
                            copiedCell={copiedCell}
                            setCopiedCell={setCopiedCell}
                            activeCell={activeCell}
                            setActiveCell={setActiveCell}
                            icfEvaluation={icfEvaluation}
                            setIcfEvaluation={setIcfEvaluation}
                            icfEnvEvaluation={icfEnvEvaluation}
                            setIcfEnvEvaluation={setIcfEnvEvaluation}
                        />
                    )}
                    {currentStep === 2 && (
                        <Step2Content 
                            step2SubTab={step2SubTab}
                            setStep2SubTab={setStep2SubTab}
                            problems={problems}
                            setProblems={setProblems}
                            userConcerns={userConcerns}
                            setUserConcerns={setUserConcerns}
                            icebergWorksheets={icebergWorksheets}
                            setIcebergWorksheets={setIcebergWorksheets}
                            assessment={assessment}
                            step2AssessmentData={step2AssessmentData}
                            setStep2AssessmentData={setStep2AssessmentData}
                        />
                    )}
                    {currentStep === 3 && (
                        <Step3Content 
                            step3SubTab={step3SubTab}
                            setStep3SubTab={setStep3SubTab}
                            supportPlans={supportPlans}
                            setSupportPlans={setSupportPlans}
                            editingPlanId={editingPlanId}
                            setEditingPlanId={setEditingPlanId}
                            userConcerns={userConcerns}
                            icebergWorksheets={icebergWorksheets}
                            navigateToStep4Direct={navigateToStep4Direct}
                            collapsedSections={collapsedSections}
                            toggleCollapse={toggleCollapse}
                        />
                    )}
                    {currentStep === 4 && renderStep4Content()}
                </div>
            </div>
        </div>
    );
};

export default App;
