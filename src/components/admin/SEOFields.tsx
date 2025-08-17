import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, AlertCircle, CheckCircle } from 'lucide-react';

interface SEOFieldsProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  content: string;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onFocusKeywordChange: (value: string) => void;
}

const SEOFields: React.FC<SEOFieldsProps> = ({
  title,
  metaTitle,
  metaDescription,
  focusKeyword,
  content,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onFocusKeywordChange
}) => {
  // SEO Analysis functions
  const getTitleAnalysis = () => {
    const currentTitle = metaTitle || title;
    const length = currentTitle.length;
    
    if (length === 0) return { status: 'error', message: 'Thiếu meta title' };
    if (length < 30) return { status: 'warning', message: 'Meta title quá ngắn' };
    if (length > 60) return { status: 'warning', message: 'Meta title quá dài' };
    
    const hasKeyword = focusKeyword && currentTitle.toLowerCase().includes(focusKeyword.toLowerCase());
    if (focusKeyword && !hasKeyword) {
      return { status: 'warning', message: 'Meta title không chứa từ khóa chính' };
    }
    
    return { status: 'good', message: 'Meta title tốt' };
  };

  const getDescriptionAnalysis = () => {
    const length = metaDescription.length;
    
    if (length === 0) return { status: 'error', message: 'Thiếu meta description' };
    if (length < 120) return { status: 'warning', message: 'Meta description quá ngắn' };
    if (length > 160) return { status: 'warning', message: 'Meta description quá dài' };
    
    const hasKeyword = focusKeyword && metaDescription.toLowerCase().includes(focusKeyword.toLowerCase());
    if (focusKeyword && !hasKeyword) {
      return { status: 'warning', message: 'Meta description không chứa từ khóa chính' };
    }
    
    return { status: 'good', message: 'Meta description tốt' };
  };

  const getKeywordDensity = () => {
    if (!focusKeyword || !content) return 0;
    
    const contentText = content.toLowerCase().replace(/<[^>]*>/g, '');
    const keywordCount = (contentText.match(new RegExp(focusKeyword.toLowerCase(), 'g')) || []).length;
    const totalWords = contentText.split(/\s+/).length;
    
    return totalWords > 0 ? (keywordCount / totalWords) * 100 : 0;
  };

  const getKeywordAnalysis = () => {
    if (!focusKeyword) return { status: 'error', message: 'Chưa có từ khóa chính' };
    
    const density = getKeywordDensity();
    
    if (density === 0) return { status: 'error', message: 'Từ khóa không xuất hiện trong nội dung' };
    if (density < 0.5) return { status: 'warning', message: 'Mật độ từ khóa quá thấp' };
    if (density > 3) return { status: 'warning', message: 'Mật độ từ khóa quá cao' };
    
    return { status: 'good', message: `Mật độ từ khóa tốt (${density.toFixed(1)}%)` };
  };

  const titleAnalysis = getTitleAnalysis();
  const descriptionAnalysis = getDescriptionAnalysis();
  const keywordAnalysis = getKeywordAnalysis();

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Tối ưu SEO
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Focus Keyword */}
        <div className="space-y-2">
          <Label htmlFor="focus-keyword">Từ khóa chính</Label>
          <Input
            id="focus-keyword"
            value={focusKeyword}
            onChange={(e) => onFocusKeywordChange(e.target.value)}
            placeholder="Nhập từ khóa chính..."
          />
          <div className="flex items-center gap-2 text-sm">
            <StatusIcon status={keywordAnalysis.status} />
            <span className={getStatusColor(keywordAnalysis.status)}>
              {keywordAnalysis.message}
            </span>
          </div>
        </div>

        {/* Meta Title */}
        <div className="space-y-2">
          <Label htmlFor="meta-title">Meta Title</Label>
          <Input
            id="meta-title"
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            placeholder={title || "Nhập meta title..."}
            maxLength={70}
          />
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <StatusIcon status={titleAnalysis.status} />
              <span className={getStatusColor(titleAnalysis.status)}>
                {titleAnalysis.message}
              </span>
            </div>
            <Badge variant="outline">
              {(metaTitle || title).length}/60
            </Badge>
          </div>
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Label htmlFor="meta-description">Meta Description</Label>
          <Textarea
            id="meta-description"
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            placeholder="Nhập meta description..."
            rows={3}
            maxLength={180}
          />
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <StatusIcon status={descriptionAnalysis.status} />
              <span className={getStatusColor(descriptionAnalysis.status)}>
                {descriptionAnalysis.message}
              </span>
            </div>
            <Badge variant="outline">
              {metaDescription.length}/160
            </Badge>
          </div>
        </div>

        {/* SEO Preview */}
        <div className="space-y-2">
          <Label>Xem trước Google</Label>
          <div className="border rounded-lg p-4 bg-background">
            <div className="space-y-1">
              <div className="text-lg text-blue-600 hover:underline cursor-pointer">
                {metaTitle || title || 'Tiêu đề bài viết'}
              </div>
              <div className="text-sm text-green-600">
                example.com › bai-viet › {(title || '').toLowerCase().replace(/\s+/g, '-')}
              </div>
              <div className="text-sm text-muted-foreground">
                {metaDescription || 'Mô tả ngắn gọn về bài viết sẽ hiển thị ở đây...'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOFields;