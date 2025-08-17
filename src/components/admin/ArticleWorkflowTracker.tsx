import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, FileText, Globe } from 'lucide-react';

interface ArticleWorkflowTrackerProps {
  currentArticle: {
    id: string;
    status: string;
    language_code: string;
    title: string;
  };
  relatedArticle?: {
    id: string;
    status: string;
    language_code: string;
    title: string;
  } | null;
}

const ArticleWorkflowTracker = ({ currentArticle, relatedArticle }: ArticleWorkflowTrackerProps) => {
  const [workflowProgress, setWorkflowProgress] = useState(0);

  useEffect(() => {
    calculateProgress();
  }, [currentArticle, relatedArticle]);

  const calculateProgress = () => {
    let progress = 0;
    
    // Base article created
    if (currentArticle.status === 'draft') progress += 25;
    if (currentArticle.status === 'published') progress += 50;
    
    // Related article exists
    if (relatedArticle) {
      progress += 25;
      if (relatedArticle.status === 'published') progress += 25;
    }
    
    setWorkflowProgress(progress);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'draft': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Đã xuất bản';
      case 'draft': return 'Bản nháp';
      case 'scheduled': return 'Đã lên lịch';
      default: return 'Chưa xác định';
    }
  };

  const getLanguageName = (code: string) => {
    return code === 'vi' ? 'Tiếng Việt' : 'English';
  };

  return (
    <Card className="border-l-4 border-l-primary/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          Tiến trình dịch thuật
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Hoàn thành</span>
            <span className="font-medium">{workflowProgress}%</span>
          </div>
          <Progress value={workflowProgress} className="h-2" />
        </div>

        {/* Article Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Article */}
          <div className="p-3 border rounded-lg bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                {getLanguageName(currentArticle.language_code)}
              </Badge>
              {getStatusIcon(currentArticle.status)}
            </div>
            <p className="font-medium text-sm mb-1">{currentArticle.title}</p>
            <p className="text-xs text-muted-foreground">
              Trạng thái: {getStatusText(currentArticle.status)}
            </p>
          </div>

          {/* Related Article */}
          {relatedArticle ? (
            <div className="p-3 border rounded-lg bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  {getLanguageName(relatedArticle.language_code)}
                </Badge>
                {getStatusIcon(relatedArticle.status)}
              </div>
              <p className="font-medium text-sm mb-1">{relatedArticle.title}</p>
              <p className="text-xs text-muted-foreground">
                Trạng thái: {getStatusText(relatedArticle.status)}
              </p>
            </div>
          ) : (
            <div className="p-3 border-2 border-dashed border-muted rounded-lg bg-muted/30">
              <div className="text-center text-muted-foreground">
                <Globe className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Chưa có bản dịch</p>
                <p className="text-xs">Tạo bài viết cho ngôn ngữ khác</p>
              </div>
            </div>
          )}
        </div>

        {/* Workflow Steps */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Các bước tiếp theo:</h4>
          <div className="space-y-1 text-xs">
            {currentArticle.status === 'draft' && (
              <div className="flex items-center gap-2 text-yellow-700">
                <Clock className="h-3 w-3" />
                <span>Hoàn thiện và xuất bản bài viết gốc</span>
              </div>
            )}
            {!relatedArticle && currentArticle.status === 'published' && (
              <div className="flex items-center gap-2 text-blue-700">
                <AlertCircle className="h-3 w-3" />
                <span>Tạo bản dịch cho ngôn ngữ khác</span>
              </div>
            )}
            {relatedArticle && relatedArticle.status === 'draft' && (
              <div className="flex items-center gap-2 text-yellow-700">
                <Clock className="h-3 w-3" />
                <span>Hoàn thiện bản dịch và xuất bản</span>
              </div>
            )}
            {workflowProgress === 100 && (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-3 w-3" />
                <span>Hoàn thành! Cả hai bản đã được xuất bản</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleWorkflowTracker;