import React from 'react';
import { ActiveComponent } from '../types';
import { COMPONENT_LIBRARY, AVAILABLE_PINS } from '../constants';
import * as Icons from 'lucide-react';

interface CircuitBoardProps {
  components: ActiveComponent[];
  onRemove: (id: string) => void;
  onUpdatePin: (id: string, pinLabel: string, pinValue: string) => void;
}

export const CircuitBoard: React.FC<CircuitBoardProps> = ({ components, onRemove, onUpdatePin }) => {
  return (
    <div className="flex-1 bg-slate-100 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Icons.Cpu className="w-6 h-6 text-arduino-dark" />
            当前硬件配置
          </h2>
          <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
            {components.length} 个组件
          </span>
        </div>

        {components.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 bg-slate-50/50">
            <Icons.CircuitBoard className="w-12 h-12 mb-4 opacity-50" />
            <p>暂无组件，请从左侧库中添加</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((comp) => {
              const def = COMPONENT_LIBRARY.find(c => c.id === comp.defId);
              if (!def) return null;
              const Icon = (Icons as any)[def.icon] || Icons.Box;

              return (
                <div key={comp.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 relative group hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => onRemove(comp.id)}
                    className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Icons.X className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-arduino-teal/10 flex items-center justify-center text-arduino-dark">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm truncate pr-4">{comp.name}</h3>
                      <p className="text-xs text-slate-500">{def.category}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {Object.keys(comp.pins).map(pinLabel => (
                      <div key={pinLabel} className="flex items-center justify-between text-sm">
                        <label className="text-slate-500 text-xs font-medium">{pinLabel}:</label>
                        <select
                          value={comp.pins[pinLabel]}
                          onChange={(e) => onUpdatePin(comp.id, pinLabel, e.target.value)}
                          className="block w-24 pl-2 pr-6 py-1 text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-arduino-teal focus:border-arduino-teal sm:text-sm rounded-md bg-slate-50"
                        >
                          <option value="">未连接</option>
                          {AVAILABLE_PINS.map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
