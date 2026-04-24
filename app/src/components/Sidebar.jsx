import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';
import '../styles/Sidebar.css';

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
    <div className="sidebar-item">
      <div
        className={`sidebar-item-content ${isSelected ? 'selected' : ''} ${isLeaf ? 'leaf' : ''}`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <span className="expand-icon">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        {isLeaf && <FileText size={16} className="file-icon" />}
        <span className="item-icon">{item.icon}</span>
        <span className="item-title">{item.title}</span>
        {item.level && <span className="item-level">{item.level}</span>}
      </div>
      
      {hasChildren && isExpanded && (
        <div className="sidebar-children">
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
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>📚 Теми</h2>
      </div>
      <nav className="sidebar-nav">
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
