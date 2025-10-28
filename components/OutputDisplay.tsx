import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, DownloadIcon } from './Icons';

declare global {
  interface Window {
    marked: {
      parse: (markdown: string) => string;
    };
    DOMPurify: {
      sanitize: (html: string) => string;
    };
    html2pdf: any;
  }
}

interface OutputDisplayProps {
  isLoading: boolean;
  output: string;
  serviceTitle: string;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ isLoading, output, serviceTitle }) => {
  const [copied, setCopied] = useState(false);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (output && window.marked && window.DOMPurify) {
      const rawHtml = window.marked.parse(output);
      const sanitizedHtml = window.DOMPurify.sanitize(rawHtml);
      setHtmlOutput(sanitizedHtml);
    } else {
      setHtmlOutput('');
    }
  }, [output]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const element = document.getElementById('pdf-content');
    if (!element || !window.html2pdf) return;

    setIsDownloading(true);

    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const formattedTitle = serviceTitle.replace(/\s+/g, '_');
    const filename = `Marine_AI_Pro_${formattedTitle}_${dateString}.pdf`;

    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5], // inches
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (document: Document) => {
            // In the cloned document, remove the 'prose-invert' class 
            // to switch to light-mode typography for the PDF.
            const content = document.getElementById('pdf-content');
            if (content) {
                content.classList.remove('prose-invert');
            }
        }
      },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    window.html2pdf().from(element).set(opt).save()
    .catch((err: Error) => {
        console.error("PDF generation failed:", err);
    })
    .finally(() => {
        setIsDownloading(false);
    });
  };

  if (isLoading) {
    return (
      <div className="mt-8 bg-slate-800/50 p-6 rounded-lg border border-slate-700 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-700 rounded w-full"></div>
          <div className="h-3 bg-slate-700 rounded w-5/6"></div>
          <div className="h-3 bg-slate-700 rounded w-full"></div>
          <div className="h-3 bg-slate-700 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!output) {
    return null;
  }

  return (
    <div className="mt-8 bg-slate-800/50 rounded-lg border border-slate-700 relative group">
       <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">AI Generated Result</h3>
         <div 
          id="pdf-content" 
          className="prose prose-invert prose-slate max-w-none prose-p:text-slate-300 prose-headings:text-white prose-strong:text-slate-100 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-600 prose-code:text-cyan-300"
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
       </div>
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="p-2 rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-wait"
          title="Download as PDF"
        >
          {isDownloading ? (
            <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <DownloadIcon className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
          title="Copy Markdown"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};