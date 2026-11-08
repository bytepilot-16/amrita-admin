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
          <div key={`table-${key}`} className="my-3 overflow-x-auto rounded-xl border border-[#E2DCD0] bg-white">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E2DCD0] bg-[#FAF8F5] font-mono text-[11px] text-[#141413]">
                <tr>
                  {tableHeader.map((th, i) => (
                    <th key={i} className="px-3 py-2 font-semibold">{th.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE4D9]">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#FAF8F5] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-2 font-mono text-xs text-[#57534E]">
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
            className="my-3 overflow-x-auto rounded-xl bg-[#FAF8F5] p-3 font-mono text-xs leading-relaxed text-[#141413] border border-[#E2DCD0]"
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
          <h3 key={idx} className="font-serif text-lg font-bold text-[#141413] mt-4 mb-2">
            {formatInline(line.replace('### ', ''))}
          </h3>
        );
        return;
      }

      if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={idx} className="text-xs font-semibold uppercase tracking-wider text-[#9E1B34] mt-3 mb-1.5">
            {formatInline(line.replace('#### ', ''))}
          </h4>
        );
        return;
      }

      // Horizontal separator
      if (line.trim() === '---') {
        elements.push(<hr key={idx} className="my-3 border-t border-[#E2DCD0]" />);
        return;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={idx}
            className="my-2 border-l-2 border-[#9E1B34] bg-[#FAF8F5] px-3.5 py-2 text-xs text-[#57534E] rounded-r-lg"
          >
            {formatInline(line.replace('> ', ''))}
          </blockquote>
        );
        return;
      }

      // Unordered list item
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={idx} className="ml-4 list-disc text-xs text-[#57534E] leading-relaxed my-0.5">
            {formatInline(line.replace(/^[-*]\s+/, ''))}
          </li>
        );
        return;
      }

      // Numbered list item
      if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={idx} className="ml-4 list-decimal text-xs text-[#57534E] leading-relaxed my-0.5">
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
        <p key={idx} className="text-xs text-[#57534E] leading-relaxed my-1.5">
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
            className="text-[#9E1B34] font-semibold underline hover:text-[#7D1529] transition-colors"
          >
            {linkMatch[1]}
          </a>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-[#141413]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={index} className="italic text-[#57534E]">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={index}
            className="rounded bg-[#FAF8F5] border border-[#E2DCD0] px-1.5 py-0.5 font-mono text-[11px] text-[#9E1B34] font-medium"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return <div className="space-y-1">{renderFormatted(content)}</div>;
};
