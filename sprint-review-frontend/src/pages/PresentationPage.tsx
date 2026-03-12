import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SlideCover from './slides/SlideCover';
import SlideObjectifs from './slides/SlideObjectifs';
import SlideBacklog from './slides/SlideBacklog';
import SlideBacklog2 from './slides/SlideBacklog2';
import SlideRealisations from './slides/SlideRealisations';
import SlideDemo from './slides/SlideDemo';
import SlideMetriques from './slides/SlideMetriques';
import SlideBacklogEvolution from './slides/SlideBacklogEvolution';
import SlideNextSteps from './slides/SlideNextSteps';
import { useSprint } from '../context/SprintContext';

const SLIDE_W = 1400;
const SLIDE_H = 750;

const slides = [
  { id: 'cover', label: 'Couverture', icon: 'fa-film', agendaIndex: -1 },
  { id: 'objectifs', label: 'Objectifs', icon: 'fa-bullseye', agendaIndex: 0 },
  { id: 'backlog', label: 'Backlog', icon: 'fa-list-check', agendaIndex: 1 },
  { id: 'backlog2', label: 'Board', icon: 'fa-columns', agendaIndex: 1 },
  { id: 'realisations', label: 'Réalisations', icon: 'fa-check-circle', agendaIndex: 2 },
  { id: 'demo', label: 'Démo', icon: 'fa-desktop', agendaIndex: 3 },
  { id: 'metriques', label: 'Métriques', icon: 'fa-chart-line', agendaIndex: 4 },
  { id: 'backlog-evolution', label: 'Backlog Évol.', icon: 'fa-stream', agendaIndex: 4 },
  { id: 'next', label: 'Prochaines Étapes', icon: 'fa-step-forward', agendaIndex: 5 },
];

const PresentationPage: React.FC = () => {
  const { state } = useSprint();
  const { transitionDuration } = state;

  // Detect if the sprint has meaningful data
  const isSprintEmpty =
    state.objectives.length === 0 &&
    state.enablers.length === 0 &&
    state.featureCards.length === 0 &&
    state.smallCards.length === 0 &&
    state.kpiCards.length === 0 &&
    state.nextSprintCandidates.length === 0 &&
    state.demoConfig.steps.length === 0 &&
    !state.sprint.goal;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [displaySlide, setDisplaySlide] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const slideContainerRef = React.useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      slideContainerRef.current?.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      if (e.key === 'F11' || (e.key === 'f' && !e.ctrlKey && !e.metaKey)) {
        e.preventDefault(); toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, toggleFullscreen]);

  useEffect(() => {
    // Always show cover transition on every slide change
    setShowContent(false);
    setDisplaySlide(currentSlide);
    setTransitionKey((k) => k + 1);

    if (currentSlide === 0) {
      // Stay on cover, no auto-transition
      return;
    }

    const timer = setTimeout(() => {
      setShowContent(true);
    }, transitionDuration);

    return () => clearTimeout(timer);
  }, [currentSlide, transitionDuration]);

  const renderActualSlide = (): React.ReactNode => {
    if (isSprintEmpty) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-database text-4xl text-blue-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-400 tracking-wide mb-3">Add Data PLZ</h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Ce sprint n'a pas encore de données. Rendez-vous dans l'<b>Administration</b> pour ajouter du contenu.
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg"
            >
              <i className="fas fa-cog" /> Ouvrir l'Admin
            </Link>
          </div>
        </div>
      );
    }
    switch (displaySlide) {
      case 1: return <SlideObjectifs />;
      case 2: return <SlideBacklog />;
      case 3: return <SlideBacklog2 />;
      case 4: return <SlideRealisations />;
      case 5: return <SlideDemo />;
      case 6: return <SlideMetriques />;
      case 7: return <SlideBacklogEvolution />;
      case 8: return <SlideNextSteps />;
      default: return null;
    }
  };

  const currentAgendaIndex = slides[currentSlide]?.agendaIndex ?? -1;

  // Compute scale factor for fullscreen mode
  const [fsScale, setFsScale] = useState(1);
  useEffect(() => {
    const computeScale = () => {
      if (isFullscreen) {
        const scaleX = window.innerWidth / SLIDE_W;
        const scaleY = window.innerHeight / SLIDE_H;
        setFsScale(Math.min(scaleX, scaleY));
      } else {
        setFsScale(1);
      }
    };
    computeScale();
    window.addEventListener('resize', computeScale);
    return () => window.removeEventListener('resize', computeScale);
  }, [isFullscreen]);

  return (
    <div ref={slideContainerRef} className={`bg-gray-100 flex flex-col items-center justify-center min-h-screen m-0 ${isFullscreen ? 'py-0 bg-black' : 'py-6'}`}>
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          transform: isFullscreen ? `scale(${fsScale})` : undefined,
          transformOrigin: 'center center',
        }}
        className={`bg-white overflow-hidden relative flex-shrink-0 ${isFullscreen ? '' : 'shadow-2xl'}`}
      >
        {isSprintEmpty ? (
          /* Empty sprint placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-28 h-28 mx-auto bg-blue-100 rounded-3xl flex items-center justify-center shadow-inner">
                  <i className="fas fa-folder-open text-5xl text-blue-300" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  <i className="fas fa-exclamation text-white text-sm" />
                </div>
              </div>
              <h2 className="text-4xl font-black text-gray-300 tracking-wider mb-2">Add Data PLZ</h2>
              <p className="text-gray-400 text-base mb-2">Sprint {state.sprint.number} — {state.sprint.name || 'Sans nom'}</p>
              <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
                Aucune donnée n'a été ajoutée pour ce sprint.<br />
                Configurez le contenu depuis le panneau d'administration.
              </p>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <i className="fas fa-plus-circle" /> Ajouter des données
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Cover with agenda highlight (always rendered underneath) */}
            <div
              key={`cover-${transitionKey}`}
              className="absolute inset-0"
              style={{ opacity: showContent ? 0 : 1, transition: 'opacity 0.4s ease', pointerEvents: showContent ? 'none' : 'auto' }}
            >
              <SlideCover activeAgendaIndex={currentAgendaIndex} />
            </div>
            {/* Actual content slide (fades in after delay) */}
            {displaySlide > 0 && (
              <div
                className="absolute inset-0"
                style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: showContent ? 'auto' : 'none' }}
              >
                {renderActualSlide()}
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation */}
      <div
        style={isFullscreen ? { width: '100vw' } : { width: SLIDE_W }}
        className={`flex items-center justify-between flex-shrink-0 transition-opacity duration-300 ${
          isFullscreen
            ? 'absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-6 py-3 opacity-0 hover:opacity-100 z-50'
            : 'mt-4'
        }`}
      >
        <div className="flex items-center gap-1">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                currentSlide === index
                  ? isFullscreen ? 'bg-white text-gray-800 shadow-md' : 'bg-atlassian-blue text-white shadow-md'
                  : isFullscreen ? 'bg-white/20 text-white hover:bg-white/30 border border-white/20' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <i className={`fas ${slide.icon}`} />
              {currentSlide === index && <span>{slide.label}</span>}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium ${isFullscreen ? 'text-white/60' : 'text-gray-400'}`}>
            {currentSlide + 1} / {slides.length}
          </span>
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className={`w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-30 transition-all ${
              isFullscreen ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <i className="fas fa-chevron-left text-sm" />
          </button>
          <button
            onClick={goNext}
            disabled={currentSlide === slides.length - 1}
            className="w-9 h-9 rounded-full bg-atlassian-blue text-white flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-all"
          >
            <i className="fas fa-chevron-right text-sm" />
          </button>
          <button
            onClick={toggleFullscreen}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              isFullscreen
                ? 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
            }`}
            title={isFullscreen ? 'Quitter le plein écran (F)' : 'Plein écran (F)'}
          >
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} mr-1`} />
            {isFullscreen ? 'Quitter' : 'Diapo'}
          </button>
          <Link
            to="/admin"
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              isFullscreen
                ? 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <i className="fas fa-cog mr-1" /> Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PresentationPage;
