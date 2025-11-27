import React, { useState } from 'react';
import { Task, TaskCategory } from '../types';
import TextWithTooltip from './TextWithTooltip';

interface ActionPlanProps {
  tasks: Task[];
  answers: Record<string, string>;
  onRestart: () => void;
}

const ActionPlan: React.FC<ActionPlanProps> = ({ tasks, answers, onRestart }) => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Group tasks by category
  const groupedTasks = {
    [TaskCategory.PREPARATION]: tasks.filter(t => t.category === TaskCategory.PREPARATION),
    [TaskCategory.INPUT]: tasks.filter(t => t.category === TaskCategory.INPUT),
    [TaskCategory.SUBMISSION]: tasks.filter(t => t.category === TaskCategory.SUBMISSION),
  };

  const toggleTask = (taskId: string) => {
    const newSet = new Set(completedTasks);
    if (newSet.has(taskId)) {
      newSet.delete(taskId);
    } else {
      newSet.add(taskId);
    }
    setCompletedTasks(newSet);
  };

  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks.size / totalTasks) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-jp-fix">あなたの確定申告ToDoリスト</h2>
        <p className="text-gray-600 text-jp-fix">以下のステップに沿って進めれば、確定申告は完了します。</p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 sticky top-4 z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-gray-700">進捗状況</span>
          <span className="text-blue-600 font-bold text-xl">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Task List */}
        <div className="lg:col-span-2 space-y-8">
          {(Object.keys(groupedTasks) as TaskCategory[]).map((category) => {
             const categoryTasks = groupedTasks[category];
             if (categoryTasks.length === 0) return null;

             return (
               <div key={category} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                 <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                   <h3 className="text-lg font-bold text-gray-800 flex items-center">
                     {category === TaskCategory.PREPARATION && '🏁'}
                     {category === TaskCategory.INPUT && '✍️'}
                     {category === TaskCategory.SUBMISSION && '📮'}
                     <span className="ml-2">{category}</span>
                   </h3>
                 </div>
                 <div className="divide-y divide-gray-100">
                   {categoryTasks.map((task) => (
                     <div key={task.id} className={`p-5 hover:bg-blue-50 transition-colors ${completedTasks.has(task.id) ? 'bg-gray-50' : ''}`}>
                       <label className="flex items-start cursor-pointer">
                         <div className="flex items-center h-6">
                           <input
                             type="checkbox"
                             checked={completedTasks.has(task.id)}
                             onChange={() => toggleTask(task.id)}
                             className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                           />
                         </div>
                         <div className="ml-4 flex-1 text-jp-fix">
                           <div className={`font-medium text-gray-900 ${completedTasks.has(task.id) ? 'line-through text-gray-400' : ''}`}>
                             <TextWithTooltip text={task.title} />
                           </div>
                           {task.description && (
                             <div className={`text-sm text-gray-500 mt-1 ${completedTasks.has(task.id) ? 'line-through text-gray-300' : ''}`}>
                               {task.description}
                             </div>
                           )}
                           
                           {/* Reference URL Button */}
                           {task.referenceUrl && (
                             <a
                               href={task.referenceUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="mt-3 inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors group"
                               onClick={(e) => e.stopPropagation()}
                             >
                               <svg className="w-3 h-3 mr-1.5 text-blue-500 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                               </svg>
                               {task.referenceLabel || '公式情報を確認する（外部リンク）'}
                             </a>
                           )}
                         </div>
                       </label>
                     </div>
                   ))}
                 </div>
               </div>
             );
          })}
        </div>

        {/* Static Info Column (Latest Trends for 2026) */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-32 text-jp-fix">
             {/* Header */}
             <div className="flex items-start mb-6 border-b border-slate-200 pb-4">
               <span className="text-2xl mr-3" role="img" aria-label="announcement">📢</span>
               <h3 className="font-bold text-slate-800 text-lg leading-snug">
                  令和7年分<br/>
                  <span className="text-sm text-slate-500 font-normal">（2026年3月提出）</span><br/>
                  最新トレンド
               </h3>
             </div>

             <div className="space-y-4">
                {/* Item 1 */}
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                   <h4 className="font-bold text-blue-700 flex items-center mb-2 text-sm">
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                     1. 申告期間と早期提出
                   </h4>
                   <p className="text-sm text-slate-600 leading-relaxed">
                     原則の期間は「2026年2月16日〜3月16日」ですが、e-Tax（電子申告）を利用すれば1月から早期提出が可能です。混雑を避けるためにもe-Taxが推奨されています。
                   </p>
                </div>

                {/* Item 2 */}
                 <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                   <h4 className="font-bold text-blue-700 flex items-center mb-2 text-sm">
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                     2. 「マイナポータル連携」
                   </h4>
                   <p className="text-sm text-slate-600 leading-relaxed">
                     医療費、ふるさと納税、生命保険料などは、マイナポータルと連携することで<strong className="text-blue-800 bg-blue-50 px-1">「証明書の収集・転記」が不要</strong>になります。今のうちに連携設定を済ませておくと、作業時間が大幅に短縮されます。
                   </p>
                </div>

                {/* Item 3 */}
                 <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                   <h4 className="font-bold text-blue-700 flex items-center mb-2 text-sm">
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                     3. スマホ申告の進化
                   </h4>
                   <p className="text-sm text-slate-600 leading-relaxed">
                     給与の源泉徴収票は、スマホのカメラで撮影するだけで自動入力される機能が標準化しています。パソコンがなくても、スマホとマイナンバーカードだけで完結できるケースが増えています。
                   </p>
                </div>
             </div>
             
             <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-400 text-center">
                ※上記は一般的な情報です。詳細は国税庁HPをご確認ください。
             </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onRestart}
          className="text-gray-500 hover:text-gray-800 underline text-sm"
        >
          最初からやり直す
        </button>
      </div>
    </div>
  );
};

export default ActionPlan;