import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSprint } from '../../context/SprintContext';

const Header: React.FC = () => {
  const { state, dispatch, multiSprintState } = useSprint();
  const location = useLocation();
  const { sprint, pages, styles } = state;
  const [sprintMenuOpen, setSprintMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const visiblePages = pages
    .filter((p) => p.visible)
    .sort((a, b) => a.order - b.order);

  const isActive = (slug: string): boolean => {
    const path = slug === '' ? '/' : `/${slug}`;
    return location.pathname === path;
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setSprintMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header
      style={{
        backgroundColor: styles.primaryColor,
        fontFamily: styles.headingFontFamily,
      }}
      className="text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">
              🏃 Sprint {sprint.number} — {sprint.name}
            </Link>

            {/* Sprint Switcher */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setSprintMenuOpen(!sprintMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
              >
                <i className="fas fa-exchange-alt" />
                <span>Changer de Sprint</span>
                <i className={`fas fa-chevron-down text-xs transition-transform ${sprintMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {sprintMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sprints disponibles</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {multiSprintState.sprints.map((entry) => (
                      <button
                        key={entry.id}
                        onClick={() => {
                          dispatch({ type: 'SWITCH_SPRINT', payload: { sprintId: entry.id } });
                          setSprintMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                          entry.id === multiSprintState.activeSprintId
                            ? 'bg-blue-50 border-l-4 border-blue-600'
                            : 'hover:bg-gray-50 border-l-4 border-transparent'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          entry.id === multiSprintState.activeSprintId
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {entry.data.sprint.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${
                            entry.id === multiSprintState.activeSprintId ? 'text-blue-700' : 'text-gray-800'
                          }`}>
                            Sprint {entry.data.sprint.number}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{entry.data.sprint.name}</p>
                        </div>
                        {entry.id === multiSprintState.activeSprintId && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Actif</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 px-4 py-2">
                    <Link
                      to="/admin"
                      onClick={() => setSprintMenuOpen(false)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      <i className="fas fa-cog" /> Gérer les sprints
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Link
            to="/admin"
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
          >
            ⚙️ Administration
          </Link>
        </div>
        <nav className="mt-3 flex gap-1 flex-wrap">
          {visiblePages.map((page) => (
            <Link
              key={page.id}
              to={page.slug === '' ? '/' : `/${page.slug}`}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                isActive(page.slug)
                  ? 'bg-white text-gray-800'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
