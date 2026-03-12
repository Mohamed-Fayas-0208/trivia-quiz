const htmlEntities = {
  '&quot;': '"',
  '&#039;': "'",
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>'
};

export default function decodeHtml(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text.replace(/&quot;|&#039;|&amp;|&lt;|&gt;/g, (match) => htmlEntities[match] || match);
}

