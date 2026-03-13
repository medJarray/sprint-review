import React from 'react';
import { useSprint } from '../../context/SprintContext';

const fontOptions = [
  "'Inter', sans-serif",
  "'Poppins', sans-serif",
  "'Roboto', sans-serif",
  "'Open Sans', sans-serif",
  "'Lato', sans-serif",
  "'Montserrat', sans-serif",
  "'Nunito', sans-serif",
  "'Raleway', sans-serif",
  "'Source Sans Pro', sans-serif",
  "system-ui, sans-serif",
  "'Georgia', serif",
  "'Courier New', monospace",
];

const StylesAdmin: React.FC = () => {
  const { state, updateStyles } = useSprint();
  const { styles } = state;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">🎨 Personnalisation des styles</h2>

      {/* Polices */}
      <section className="space-y-3">
        <h3 className="font-medium">Polices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Police du texte</label>
            <select
              value={styles.fontFamily}
              onChange={(e) => updateStyles({ fontFamily: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              style={{ fontFamily: styles.fontFamily }}
            >
              {fontOptions.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font.split("'")[1] || font.split(',')[0]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Police des titres</label>
            <select
              value={styles.headingFontFamily}
              onChange={(e) => updateStyles({ headingFontFamily: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              style={{ fontFamily: styles.headingFontFamily }}
            >
              {fontOptions.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font.split("'")[1] || font.split(',')[0]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Couleurs */}
      <section className="space-y-3">
        <h3 className="font-medium">Couleurs</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {([
            { key: 'primaryColor' as const, label: 'Couleur principale' },
            { key: 'secondaryColor' as const, label: 'Couleur secondaire' },
            { key: 'accentColor' as const, label: 'Couleur d\'accent' },
            { key: 'backgroundColor' as const, label: 'Arrière-plan' },
            { key: 'textColor' as const, label: 'Couleur du texte' },
          ]).map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={styles[key]}
                  onChange={(e) => updateStyles({ [key]: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={styles[key]}
                  onChange={(e) => updateStyles({ [key]: e.target.value })}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Taille et arrondi */}
      <section className="space-y-3">
        <h3 className="font-medium">Mise en forme</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Taille de police : {styles.fontSize}px
            </label>
            <input
              type="range"
              min={12}
              max={24}
              value={styles.fontSize}
              onChange={(e) => updateStyles({ fontSize: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Arrondi des bords : {styles.borderRadius}px
            </label>
            <input
              type="range"
              min={0}
              max={24}
              value={styles.borderRadius}
              onChange={(e) => updateStyles({ borderRadius: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Prévisualisation */}
      <section className="space-y-3">
        <h3 className="font-medium">Prévisualisation</h3>
        <div
          className="p-6 shadow-md"
          style={{
            fontFamily: styles.fontFamily,
            fontSize: `${styles.fontSize}px`,
            backgroundColor: styles.backgroundColor,
            color: styles.textColor,
            borderRadius: `${styles.borderRadius}px`,
          }}
        >
          <h4
            className="text-xl font-bold mb-2"
            style={{
              fontFamily: styles.headingFontFamily,
              color: styles.primaryColor,
            }}
          >
            Titre d'exemple
          </h4>
          <p>Ceci est un paragraphe d'exemple pour prévisualiser vos styles.</p>
          <div className="flex gap-2 mt-3">
            <button
              className="px-4 py-2 text-white rounded"
              style={{
                backgroundColor: styles.primaryColor,
                borderRadius: `${styles.borderRadius}px`,
              }}
            >
              Bouton principal
            </button>
            <button
              className="px-4 py-2 text-white rounded"
              style={{
                backgroundColor: styles.secondaryColor,
                borderRadius: `${styles.borderRadius}px`,
              }}
            >
              Bouton secondaire
            </button>
            <button
              className="px-4 py-2 text-white rounded"
              style={{
                backgroundColor: styles.accentColor,
                borderRadius: `${styles.borderRadius}px`,
              }}
            >
              Accent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StylesAdmin;
