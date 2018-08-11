import * as linkify from 'linkifyjs';

export const findUrlInText = text => {
  const findUrlResult = linkify.find(text);
  const hasUrl = Object.keys(findUrlResult).length > 0;

  if (!hasUrl) return { hasUrl: false };
  const firstUrl = findUrlResult['0'].href;

  return { hasUrl, firstUrl };
};

