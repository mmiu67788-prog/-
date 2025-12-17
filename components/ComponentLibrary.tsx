import React from 'react';
import { COMPONENT_LIBRARY } from '../constants';
import { ComponentDef } from '../types';
import * as Icons from 'lucide-react';

interface ComponentLibraryProps {
  onAdd: (def: ComponentDef) => void;
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ onAdd }) => {
  const categories = Array.from(new Set(COMPONENT_LIBRARY.map(c => c.category)));

  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200 overflow-y-auto w-64 md:w-72 flex-shrink-0">
      <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Icons.Box className="w-5 h-5 text-arduino-teal" />
          组件库
        </h2>
        <p className="text-xs text-slate-500 mt-1">点击添加组件到开发板</p>
      </div>
      
      <div className="p-4 space-y-6">
        {categories.map(cat => (
          <div key={cat}>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{cat}</h3>
            <div className="grid grid-cols-1 gap-2">
              {COMPONENT_LIBRARY.filter(c => c.category === cat).map(comp => {
                const Icon = (Icons as any)[comp.icon] || Icons.Box;
                return (
                  <button
                    key={comp.id}
                    onClick={() => onAdd(comp)}
                    className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-arduino-teal hover:shadow-sm transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-arduino-teal/10 group-hover:text-arduino-teal transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-700 text-sm">{comp.name}</div>
                    </div>
                    <Icons.Plus className="w-4 h-4 ml-auto text-slate-300 group-hover:text-arduino-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
