import React from 'react';
import { GeneratedResult } from '../types';
import * as Icons from 'lucide-react';

interface CodeResultProps {
  result: GeneratedResult;
  onClose: () => void;
}

export const CodeResult: React.FC<CodeResultProps> = ({ result, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'code' | 'wiring'>('code');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.code);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-arduino-teal rounded-lg flex items-center justify-center text-white">
              <Icons.Code2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-800">生成完成</h2>
              <p className="text-xs text-slate-500">由 Gemini AI 驱动</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <Icons.X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Explanation Sidebar */}
          <div className="w-1/3 bg-slate-50 border-r border-slate-200 p-6 overflow-y-auto hidden md:block">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Icons.Info className="w-4 h-4" />
              逻辑说明
            </h3>
            <div className="prose prose-sm prose-slate text-slate-600">
              <p>{result.explanation}</p>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Icons.Cable className="w-4 h-4" />
                接线指南
              </h3>
              <div className="prose prose-sm prose-slate text-slate-600 bg-white p-4 rounded-lg border border-slate-200 whitespace-pre-wrap">
                {result.wiring}
              </div>
            </div>
          </div>

          {/* Main Code Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
             <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2 border-b border-[#3e3e3e]">
                <div className="flex gap-1">
                   <button 
                    onClick={() => setActiveTab('code')}
                    className={`px-4 py-1.5 text-xs font-medium rounded-t-md transition-colors ${activeTab === 'code' ? 'bg-[#1e1e1e] text-arduino-light' : 'text-gray-400 hover:text-white'}`}
                   >
                     sketch.ino
                   </button>
                   <button 
                    onClick={() => setActiveTab('wiring')}
                    className={`md:hidden px-4 py-1.5 text-xs font-medium rounded-t-md transition-colors ${activeTab === 'wiring' ? 'bg-[#1e1e1e] text-arduino-light' : 'text-gray-400 hover:text-white'}`}
                   >
                     接线 & 说明
                   </button>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <Icons.Copy className="w-4 h-4" />
                  复制
                </button>
             </div>
             
             <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                {activeTab === 'code' ? (
                   <pre className="font-mono text-sm leading-relaxed text-[#d4d4d4]">
                     <code>{result.code}</code>
                   </pre>
                ) : (
                   <div className="text-gray-300 p-4 space-y-6">
                      <div>
                        <h4 className="text-white font-bold mb-2">逻辑说明</h4>
                        <p>{result.explanation}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">接线指南</h4>
                        <pre className="whitespace-pre-wrap font-sans">{result.wiring}</pre>
                      </div>
                   </div>
                )}
             </div>
          </div>
        </div>
        
        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            关闭
          </button>
          <button 
             onClick={copyToClipboard}
             className="px-6 py-2 text-sm font-medium bg-arduino-teal hover:bg-arduino-dark text-white rounded-lg shadow-sm shadow-arduino-teal/30 transition-all flex items-center gap-2"
          >
            <Icons.Check className="w-4 h-4" />
            复制并去 IDE 粘贴
          </button>
        </div>
      </div>
    </div>
  );
};
