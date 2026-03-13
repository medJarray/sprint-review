import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { useSprint } from '../../context/SprintContext';

ChartJS.register(ArcElement, Tooltip);

const SlideBacklog: React.FC = () => {
  const { state } = useSprint();
  const { sprint, metrics, enablers, techTasks } = state;

  const totalStoryPoints = enablers.reduce((sum, e) => sum + e.stories.reduce((s, st) => s + st.points, 0), 0);
  const totalTechPoints = techTasks.reduce((sum, t) => sum + t.points, 0);
  const totalPoints = totalStoryPoints + totalTechPoints;

  const techPoints = techTasks.filter((t) => t.type === 'tech').reduce((s, t) => s + t.points, 0);
  const bugPoints = techTasks.filter((t) => t.type === 'bug').reduce((s, t) => s + t.points, 0);

  const capacityPercent = metrics.plannedPoints > 0 ? Math.round((totalPoints / metrics.plannedPoints) * 100) : 0;

  const doughnutData = {
    labels: ['Features', 'Dette Tech', 'Bugs'],
    datasets: [{
      data: [totalStoryPoints, techPoints, bugPoints],
      backgroundColor: ['#36B37E', '#0052CC', '#FF5630'],
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    cutout: '70%',
  };

  const totalEnablers = enablers.length;
  const totalStories = enablers.reduce((sum, e) => sum + e.stories.length, 0);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-12 z-20" style={{ flexShrink: 0 }}>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-list-check text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-atlassian-dark">Backlog &amp; User Stories</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2" />
              Sprint #{sprint.number} : Planning Détaillé
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 text-xs font-bold text-indigo-900">
            <i className="fas fa-stream text-indigo-500 mr-2" />
            {totalEnablers} Enablers · {totalStories} Stories
          </div>
          <div className="flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 text-xs font-bold text-indigo-900">
            <i className="fas fa-users-cog text-indigo-500 mr-2" />
            Capacité : {metrics.plannedPoints} pts
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex bg-atlassian-light overflow-hidden" style={{ minHeight: 0 }}>
        {/* Left: Stories grouped by Enabler */}
        <div style={{ width: '68%' }} className="p-6 overflow-y-auto flex flex-col gap-6">

          {enablers.map((enabler) => (
            <div key={enabler.id} className="flex-shrink-0">
              {/* Enabler Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded ${enabler.bgColor} flex items-center justify-center`}>
                    <i className={`fas fa-stream ${enabler.iconColor} text-sm`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`${enabler.bgColor} ${enabler.textColor} px-2 py-0.5 rounded text-xs font-bold`}>{enabler.epicId}</span>
                      <h2 className="text-base font-bold text-gray-800">{enabler.name}</h2>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-200">
                  {enabler.stories.length} {enabler.stories.length > 1 ? 'Stories' : 'Story'} · {enabler.stories.reduce((s, st) => s + st.points, 0)} pts
                </span>
              </div>

              {/* Stories in this enabler */}
              <div className="space-y-3 ml-4 pl-4" style={{ borderLeft: '2px solid #C1C7D0' }}>
                {enabler.stories.map((story) => (
                  <div key={story.id} className="jira-card bg-white p-5 rounded-lg border-l-4 border-green-500">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="us-tag px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide flex items-center">
                          <i className="fas fa-bookmark mr-1.5" /> {story.storyId}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800">{story.title}</h3>
                      </div>
                      <span className="story-point-badge">{story.points}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border border-gray-100 mb-3">
                      <p className="text-sm text-gray-700 italic">
                        <span className="font-bold text-gray-900 not-italic">En tant que</span> {story.asA},<br />
                        <span className="font-bold text-gray-900 not-italic">je veux</span> {story.iWant},<br />
                        <span className="font-bold text-gray-900 not-italic">afin de</span> {story.soThat}.
                      </p>
                    </div>
                    {story.ac && (
                      <div className="flex items-start space-x-2 mt-2">
                        <i className="fas fa-check-square text-green-500 mt-1 text-xs" />
                        <p className="text-xs text-gray-500 leading-snug">
                          <span className="font-bold">AC:</span> {story.ac}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Technical Tasks & Bugs */}
          {techTasks.length > 0 && (
            <div className="flex-shrink-0">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                    <i className="fas fa-cogs text-gray-500 text-sm" />
                  </div>
                  <h2 className="text-base font-bold text-gray-800">Tâches Techniques &amp; Bugs</h2>
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-200">{techTasks.length} Items · {totalTechPoints} pts</span>
              </div>
              <div className="grid grid-cols-2 gap-4 ml-4 pl-4" style={{ borderLeft: '2px solid #C1C7D0' }}>
                {techTasks.map((task) => (
                  <div key={task.id} className={`jira-card bg-white p-3 rounded border-l-4 ${task.type === 'bug' ? 'border-red-500' : 'border-blue-500'} flex justify-between items-center`}>
                    <div className="flex flex-col">
                      <span className={`${task.type === 'bug' ? 'bug-tag' : 'task-tag'} w-max px-1.5 py-0.5 rounded font-bold uppercase mb-1`} style={{ fontSize: 10 }}>{task.taskId}</span>
                      <p className="text-sm font-semibold text-gray-800">{task.title}</p>
                    </div>
                    <span className="story-point-badge">{task.points}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Sidebar */}
        <div style={{ width: '32%' }} className="bg-white border-l border-gray-200 p-6 flex flex-col h-full">
          {/* Capacity */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-atlassian-dark uppercase mb-3 flex items-center">
              <i className="fas fa-battery-three-quarters text-blue-500 mr-2" />
              Planification Vélocité
            </h3>
            <div className="bg-atlassian-light rounded-xl p-5 relative overflow-hidden">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-3xl font-extrabold text-atlassian-dark">
                    {totalPoints} <span className="text-lg font-medium text-gray-500">pts</span>
                  </p>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Engagés</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-600">sur {metrics.plannedPoints} pts</p>
                  <p className="text-xs text-green-600 font-bold">{capacityPercent}% Capacité</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${Math.min(100, capacityPercent)}%` }} />
              </div>
              <div className="flex justify-between text-gray-400 font-medium uppercase mt-1" style={{ fontSize: 10 }}>
                <span>0</span>
                <span>Moyenne: {Math.round(metrics.plannedPoints * 0.85)}</span>
                <span>Max: {metrics.plannedPoints}</span>
              </div>
            </div>
          </div>

          {/* Work Distribution with Doughnut */}
          <div className="mb-6 flex-1">
            <h3 className="text-sm font-bold text-atlassian-dark uppercase mb-3 flex items-center">
              <i className="fas fa-chart-pie text-indigo-500 mr-2" />
              Répartition du Travail
            </h3>
            <div className="relative w-full flex justify-center" style={{ height: 140 }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2" />Features</div>
                <span className="font-bold text-gray-700">{totalPoints > 0 ? Math.round((totalStoryPoints / totalPoints) * 100) : 0}% ({totalStoryPoints} pts)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />Dette Tech</div>
                <span className="font-bold text-gray-700">{totalPoints > 0 ? Math.round((techPoints / totalPoints) * 100) : 0}% ({techPoints} pts)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2" />Bugs</div>
                <span className="font-bold text-gray-700">{totalPoints > 0 ? Math.round((bugPoints / totalPoints) * 100) : 0}% ({bugPoints} pts)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideBacklog;
