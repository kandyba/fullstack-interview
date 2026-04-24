import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';

const SidebarItem = ({ item, level = 0, selectedId, onSelect, expandedIds, toggleExpand }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedIds.includes(item.id);
  const isSelected = selectedId === item.id;
  const isLeaf = !!item.file;

  const handleClick = () => {
    if (isLeaf) {
      onSelect(item);
    } else if (hasChildren) {
      toggleExpand(item.id);
    }
  };

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center gap-2 border-l-2 px-3 py-2 text-sm transition ${
          isSelected
            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300'
            : 'border-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
        } ${isLeaf ? 'font-medium' : 'font-semibold'}`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <span className="text-slate-500 dark:text-slate-400">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        {isLeaf && <FileText size={15} className="text-slate-400 dark:text-slate-500" />}
        <span>{item.icon}</span>
        <span className="flex-1 truncate">{item.title}</span>
        {item.level && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">{item.level}</span>}
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {item.children.map(child => (
            <SidebarItem
              key={child.id}
              item={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedIds={expandedIds}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ topics, selectedTopic, onSelectTopic }) => {
  const [expandedIds, setExpandedIds] = useState(['frontend', 'javascript', 'react']);

  const toggleExpand = (id) => {
    setExpandedIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <aside className="w-80 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-4 py-4 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">📚 Теми</h2>
      </div>
      <nav className="max-h-[calc(100vh-70px)] overflow-y-auto py-2">
        {topics.map(topic => (
          <SidebarItem
            key={topic.id}
            item={topic}
            selectedId={selectedTopic?.id}
            onSelect={onSelectTopic}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
