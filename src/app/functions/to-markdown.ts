/**
 * Convert HTML to markdown
 * @param {string} html
 * @returns {any}
 */
import TurndownService from 'turndown';

export function toMarkdown(html: string) {
  console.log('HTML Value', html);
  const turndownService = new TurndownService({
    headingStyle: 'atx',
  });
  // MarkDown to HTML parser https://github.com/domchristie/turndown
  const markdown = turndownService.turndown(html);
  console.log('MARKDOWN Value', markdown);
  return markdown;
}
