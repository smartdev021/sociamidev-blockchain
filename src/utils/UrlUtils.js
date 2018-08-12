import * as linkify from 'linkifyjs';
import normalizeUrl from 'normalize-url';
import compareUrls from 'compare-urls';

export function findUrlInText(text) {
  const findUrlResult = linkify.find(text);
  const hasUrl = Object.keys(findUrlResult).length > 0;

  if (!hasUrl) return { hasUrl: false };
  const firstUrl = findUrlResult['0'].href;

  return { hasUrl, firstUrl };
};

export function isSameLink(url1, url2) {
  if (typeof url1 !== 'undefined' && typeof url2 !== 'undefined') {
    const opts = {normalizeHttps: true};
    return compareUrls(
      normalizeUrl(url1, opts),
      normalizeUrl(url2, opts),
    );
  }

  return false;
};
