import { meshToPart } from './meshToPart';
import { slugToLabel } from './slugToLabel';

const excludedSlugs = new Set([
    'light_tire_cap',
    'window_glass',
    'side_mirrors',
    'back_light',
    'tire_rubber'
]);

export const colorPanelParts = Object.entries(meshToPart)
    .filter(([, slug]) => !excludedSlugs.has(slug))
    .map(([mesh, slug]) => ({ mesh, slug, label: slugToLabel(slug) }));
