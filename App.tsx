import React, { useState } from 'react';
import { ComponentLibrary } from './components/ComponentLibrary';
import { CircuitBoard } from './components/CircuitBoard';
import { CodeResult } from './components/CodeResult';
import { ActiveComponent, ComponentDef, GeneratedResult } from './types';
import { generateArduinoCode } from './services/gemini';
import * as Icons from 'lucide-react';

function App() {
  const [activeComponents, setActiveComponents] = useState<ActiveComponent[]>([]);
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddComponent = (def: ComponentDef) => {
    // Determine next component index for naming (e.g., LED 1, LED 2)
    const count = activeComponents.filter(c => c.defId === def.id).length;
    
    // Create pins map with empty values
    const pins: Record<string, string> = {};
    def.defaultPins.forEach(p => pins[p] = '');

    const newComponent: ActiveComponent = {
      id: Math.random().toString(36).substr(2, 9),
      defId: def.id,
      name: `${def.name.split(' (')[0]} ${count + 1}`,
      pins: pins
    };

    setActiveComponents([...activeComponents, newComponent]);
  };

  const handleRemoveComponent = (id: string) => {
    setActiveComponents(activeComponents.filter(c => c.id !== id));
  };

  const handleUpdatePin = (id: string, pinLabel: string, pinValue: string) => {
    setActiveComponents(activeComponents.map(c => 
      c.id === id ? { ...c, pins: { ...c.pins, [pinLabel]: pinValue } } : c
    ));
  };

  const handleGenerate = async () => {
    if (activeComponents.length === 0) {
      setError("请至少添加一个组件");
      return;
    }
    if (!description.trim()) {
      setError("请描述您想要的交互功能");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const genResult = await generateArduinoCode(activeComponents, description);
      setResult(genResult);
    } catch (e) {
      setError("生成失败，请检查 API Key 或重试。");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 justify-between flex-shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-gradient-to-br from-arduino-teal to-arduino-dark rounded-md flex items-center justify-center text-white shadow-lg shadow-arduino-teal/30">
             <Icons.Cpu className="w-5 h-5" />
           </div>
           <h1 className="font-bold text-xl text-slate-800 tracking-tight">Arduino <span className="text-arduino-teal">AI</span> Studio</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://docs.arduino.cc/" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-500 hover:text-arduino-teal transition-colors flex items-center gap-1">
            <Icons.BookOpen className="w-4 h-4" />
            文档
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors">
            <Icons.Github className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        <ComponentLibrary onAdd={handleAddComponent} />
        
        <main className="flex-1 flex flex-col min-w-0">
          <CircuitBoard 
            components={activeComponents}
            onRemove={handleRemoveComponent}
            onUpdatePin={handleUpdatePin}
          />
          
          {/* Bottom Interaction Panel */}
          <div className="bg-white border-t border-slate-200 p-6 flex-shrink-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
             <div className="max-w-4xl mx-auto w-full">
               <div className="flex flex-col md:flex-row gap-4">
                 <div className="flex-1">
                   <label className="block text-sm font-medium text-slate-700 mb-2">
                     交互逻辑描述
                   </label>
                   <div className="relative">
                    <textarea 
                      className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-arduino-teal focus:border-arduino-teal resize-none text-sm transition-shadow shadow-sm"
                      placeholder="例如：当按下按钮时，让 LED 灯闪烁3次，蜂鸣器响一声。如果距离传感器检测到物体小于10cm，舵机转动到90度..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <div className="absolute bottom-2 right-2 text-xs text-slate-400 pointer-events-none">
                      AI 驱动
                    </div>
                   </div>
                   {error && (
                     <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                       <Icons.AlertCircle className="w-3 h-3" />
                       {error}
                     </p>
                   )}
                 </div>
                 
                 <div className="flex items-end">
                   <button
                     onClick={handleGenerate}
                     disabled={isGenerating}
                     className={`
                       h-12 px-8 rounded-lg font-bold text-white shadow-lg transition-all flex items-center gap-2 whitespace-nowrap
                       ${isGenerating 
                         ? 'bg-slate-400 cursor-not-allowed' 
                         : 'bg-gradient-to-r from-arduino-teal to-arduino-dark hover:shadow-arduino-teal/40 hover:-translate-y-0.5 active:translate-y-0'
                       }
                     `}
                   >
                     {isGenerating ? (
                       <>
                         <Icons.Loader2 className="w-5 h-5 animate-spin" />
                         思考中...
                       </>
                     ) : (
                       <>
                         <Icons.Zap className="w-5 h-5" />
                         生成代码
                       </>
                     )}
                   </button>
                 </div>
               </div>
             </div>
          </div>
        </main>
      </div>

      {result && (
        <CodeResult 
          result={result} 
          onClose={() => setResult(null)} 
        />
      )}
    </div>
  );
}

export default App;
