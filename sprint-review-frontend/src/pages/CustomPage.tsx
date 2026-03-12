import React from 'react';
import { useParams } from 'react-router-dom';
import { useSprint } from '../context/SprintContext';
import Card from '../components/common/Card';

const CustomPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { state } = useSprint();
  const { pages, styles } = state;

  const page = pages.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="opacity-60">Page introuvable.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1
        className="text-3xl font-bold"
        style={{ fontFamily: styles.headingFontFamily, color: styles.primaryColor }}
      >
        {page.title}
      </h1>

      {page.content.sections.length === 0 ? (
        <Card>
          <p className="text-center py-8 opacity-60">
            Cette page est vide. Ajoutez du contenu depuis l'administration.
          </p>
        </Card>
      ) : (
        page.content.sections
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <Card key={section.id} title={section.title}>
              {section.type === 'text' && (
                <p>{(section.data as { text?: string }).text}</p>
              )}
              {section.type === 'list' && (
                <ul className="list-disc pl-5 space-y-1">
                  {((section.data as { items?: string[] }).items ?? []).map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    )
                  )}
                </ul>
              )}
            </Card>
          ))
      )}
    </div>
  );
};

export default CustomPage;
