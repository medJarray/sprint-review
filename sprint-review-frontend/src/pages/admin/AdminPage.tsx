import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSprint } from '../../context/SprintContext';
import SprintAdmin from './SprintAdmin';
import TeamsAdmin from './TeamsAdmin';
import CharacterAdmin from './CharacterAdmin';
import StoriesAdmin from './StoriesAdmin';
import StylesAdmin from './StylesAdmin';

type AdminTab = 'sprint' | 'teams' | 'character' | 'stories' | 'styles';

const tabs: { key: AdminTab; label: string; icon: string }[] = [
  { key: 'sprint', label: 'Sprint', icon: '🏃' },
  { key: 'teams', label: 'Équipes', icon: '👥' },
  { key: 'character', label: 'Personnage', icon: '🎭' },
  { key: 'stories', label: 'User Stories', icon: '📝' },
  { key: 'styles', label: 'Styles', icon: '🎨' },
];

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('sprint');

  const renderContent = (): React.ReactNode => {
    switch (activeTab) {
      case 'sprint': return <SprintAdmin />;
      case 'teams': return <TeamsAdmin />;
      case 'character': return <CharacterAdmin />;
      case 'stories': return <StoriesAdmin />;
      case 'styles': return <StylesAdmin />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F5F7', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl"
            style={{ backgroundColor: '#0052CC' }}
          >
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#172B4D' }}>⚙️ Administration</h1>
            <p className="text-xs text-gray-500">Configurez votre Sprint Review</p>
          </div>
        </div>
        <Link
          to="/"
          className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#0052CC' }}
        >
          🎬 Voir la Présentation
        </Link>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all text-sm ${
                activeTab === tab.key
                  ? 'text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
              style={activeTab === tab.key ? { backgroundColor: '#0052CC' } : undefined}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white shadow-sm rounded-xl p-8 border border-gray-200">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
