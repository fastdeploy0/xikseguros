import { useEffect, useState } from 'react';

/**
 * Tracks which of the given section ids is currently in the reading viewport.
 * Progressive enhancement only: anchors remain the primary navigation.
 */
export function useActiveSection(ids: readonly string[], enabled = true): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    if (!enabled || ids.length === 0) return;

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0]?.target.id;
        if (top) setActive(top);
      },
      {
        // Bias toward the band just under the sticky header.
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [enabled, ids]);

  return active;
}
