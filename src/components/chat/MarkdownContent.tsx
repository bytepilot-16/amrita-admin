import React from 'react';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const renderFormatted = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let tableHeader: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    const flushTable = (key: number) => {
      if (tableHeader.length > 0) {
        elements.push(
          <div key={`table-${key}`} className="my-4 overflow-x-auto rounded-xl border border-tuscan-hairline bg-surface/40">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-tuscan-hairline bg-surface font-mono text-xs text-ink-charcoal">
                <tr>
                  {tableHeader.map((th, i) => (
                    <th key={i} className="px-3.5 py-2.5 font-semibold">{th.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-tuscan-hairline/60">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-surface transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2.5 font-mono text-xs text-ink-slate">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      inTable = false;
      tableHeader = [];
      tableRows = [];
    };

    const flushCodeBlock = (key: number) => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <pre
            key={`code-${key}`}
            className="my-3.5 overflow-x-auto rounded-xl bg-surface p-4 font-mono text-xs leading-relaxed text-ink-charcoal border border-tuscan-hairline"
          >
            <code>{codeBlockContent.join('\n')}</code>
          </pre>
        );
      }
      inCodeBlock = false;
      codeBlockContent = [];
    };

    lines.forEach((line, idx) => {
      // Code block start/end
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock(idx);
        } else {
          if (inTable) flushTable(idx);
          inCodeBlock = true;
          codeBlockContent = [];
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Table row
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const parts = line.split('|').slice(1, -1);
        if (line.includes('---')) {
          return;
        }
        if (!inTable) {
          inTable = true;
          tableHeader = parts;
        } else {
          tableRows.push(parts);
        }
        return;
      } else if (inTable) {
        flushTable(idx);
      }

      // Headings
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="font-heading text-lg font-semibold tracking-[-0.02em] text-ink-charcoal mt-5 mb-2">
            {formatInline(line.replace('### ', ''))}
          </h3>
        );
        return;
      }

      if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={idx} className="font-heading text-xs font-semibold uppercase tracking-wider text-tuscan-rust mt-4 mb-1.5">
            {formatInline(line.replace('#### ', ''))}
          </h4>
        );
        return;
      }

      // Horizontal separator
      if (line.trim() === '---') {
        elements.push(<hr key={idx} className="my-4 border-t border-tuscan-hairline" />);
        return;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={idx}
            className="my-3 border-l-2 border-tuscan-rust bg-surface/60 px-4 py-2.5 text-sm text-ink-slate rounded-r-lg leading-[1.65]"
          >
            {formatInline(line.replace('> ', ''))}
          </blockquote>
        );
        return;
      }

      // Unordered list item
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={idx} className="ml-5 list-disc text-base text-ink-slate leading-[1.65] my-1">
            {formatInline(line.replace(/^[-*]\s+/, ''))}
          </li>
        );
        return;
      }

      // Numbered list item
      if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={idx} className="ml-5 list-decimal text-base text-ink-slate leading-[1.65] my-1">
            {formatInline(line.replace(/^\d+\.\s+/, ''))}
          </li>
        );
        return;
      }

      // Empty line
      if (line.trim() === '') {
        return;
      }

      // Normal paragraph
      elements.push(
        <p key={idx} className="text-base text-ink-slate leading-[1.65] my-2">
          {formatInline(line)}
        </p>
      );
    });

    if (inTable) flushTable(lines.length);
    if (inCodeBlock) flushCodeBlock(lines.length);

    return elements;
  };

  const formatInline = (text: string) => {
    // Process markdown links [text](url), **bold**, *italic*, and `code`
    const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

    return parts.map((part, index) => {
      // Check for link [text](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            className="text-tuscan-rust font-semibold underline hover:text-tuscan-terracotta transition-colors"
          >
            {linkMatch[1]}
          </a>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-ink-charcoal">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={index} className="italic text-ink-slate">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={index}
            className="rounded bg-surface border border-tuscan-hairline px-2 py-0.5 font-mono text-xs text-tuscan-rust font-medium"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return <div className="space-y-1.5">{renderFormatted(content)}</div>;
};
