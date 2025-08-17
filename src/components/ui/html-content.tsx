import React from 'react';
import { cn } from '@/lib/utils';

interface HTMLContentProps {
  content: string;
  className?: string;
}

const HTMLContent: React.FC<HTMLContentProps> = ({ content, className }) => {
  return (
    <div 
      className={cn(
        "prose prose-lg prose-slate max-w-none",
        "prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground",
        "prose-em:text-foreground prose-blockquote:text-muted-foreground",
        "prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground",
        "prose-ol:text-foreground prose-ul:text-foreground prose-li:text-foreground",
        "prose-table:text-foreground prose-th:text-foreground prose-td:text-foreground",
        "prose-img:rounded-lg prose-img:shadow-md",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HTMLContent;