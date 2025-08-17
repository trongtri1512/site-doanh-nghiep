import React, { useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TinyMCEEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({
  value,
  onChange,
  placeholder = "Nhập nội dung...",
  height = 400
}) => {
  const { toast } = useToast();

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Lỗi upload ảnh",
        description: "Không thể upload ảnh. Vui lòng thử lại.",
        variant: "destructive"
      });
      throw error;
    }
  }, [toast]);

  const handleImageUpload = useCallback(async (blobInfo: any, progress: (percent: number) => void): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const file = blobInfo.blob();
        progress(0);
        
        const url = await uploadImage(file);
        progress(100);
        resolve(url);
      } catch (error) {
        reject(error);
      }
    });
  }, [uploadImage]);

  const editorConfig = {
    apiKey: 'ndar70rcuod4hyvd2zee9vxxb4txsd83alog2gepr2snatzd',
    height,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons', 'paste'
    ],
    toolbar: 'undo redo | formatselect | ' +
      'bold italic forecolor backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | link image media table | code preview fullscreen | help',
    content_style: `
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        font-size: 14px;
        line-height: 1.6;
        color: #333;
      }
      img { max-width: 100%; height: auto; }
      table { border-collapse: collapse; width: 100%; }
      table, th, td { border: 1px solid #ddd; }
      th, td { padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
    `,
    placeholder,
    paste_data_images: true,
    images_upload_handler: handleImageUpload,
    automatic_uploads: true,
    file_picker_types: 'image',
    image_advtab: true,
    image_caption: true,
    image_title: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    quickbars_insert_toolbar: 'quickimage quicktable',
    contextmenu: 'link image table',
    table_use_colgroups: true,
    resize: 'both' as const,
    branding: false,
    promotion: false,
    setup: (editor: any) => {
      editor.on('change', () => {
        onChange(editor.getContent());
      });
      editor.on('input', () => {
        onChange(editor.getContent());
      });
      editor.on('undo', () => {
        onChange(editor.getContent());
      });
      editor.on('redo', () => {
        onChange(editor.getContent());
      });
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Editor
        value={value}
        init={editorConfig}
        onEditorChange={onChange}
      />
    </div>
  );
};

export default TinyMCEEditor;