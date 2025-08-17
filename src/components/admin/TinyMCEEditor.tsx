import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

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
  return (
    <Editor
      apiKey="no-api-key" // You can get a free API key from TinyMCE
      value={value}
      onEditorChange={onChange}
      init={{
        height,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
          'template', 'codesample', 'hr', 'pagebreak', 'nonbreaking',
          'toc', 'imagetools', 'textpattern', 'noneditable', 'quickbars'
        ],
        toolbar: [
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | fontcolor backcolor',
          'alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist',
          'forecolor backcolor | permanentpen formatpainter | charmap emoticons | fullscreen preview save print',
          'insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment code'
        ].join(' | '),
        font_family_formats:
          'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
        font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 28pt 30pt 32pt 34pt 36pt',
        content_css: 'default',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        placeholder,
        branding: false,
        promotion: false,
        setup: (editor) => {
          editor.on('init', () => {
            console.log('TinyMCE editor initialized');
          });
        },
        // Advanced features
        image_advtab: true,
        image_caption: true,
        image_list: false,
        link_list: false,
        image_class_list: [
          { title: 'None', value: '' },
          { title: 'Responsive', value: 'img-responsive' },
          { title: 'Border', value: 'img-border' }
        ],
        link_class_list: [
          { title: 'None', value: '' },
          { title: 'External Link', value: 'external-link' }
        ],
        target_list: [
          { title: 'None', value: '' },
          { title: 'Same page', value: '_self' },
          { title: 'New page', value: '_blank' }
        ],
        // Table settings
        table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
        table_class_list: [
          { title: 'None', value: '' },
          { title: 'Table with borders', value: 'table-bordered' },
          { title: 'Striped table', value: 'table-striped' }
        ],
        // Code sample settings
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'CSS', value: 'css' },
          { text: 'PHP', value: 'php' },
          { text: 'Ruby', value: 'ruby' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'C', value: 'c' },
          { text: 'C#', value: 'csharp' },
          { text: 'C++', value: 'cpp' }
        ],
        // Template settings
        templates: [
          {
            title: 'New Table',
            description: 'creates a new table',
            content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
          },
          {
            title: 'Starting my story',
            description: 'A cure for writers block',
            content: 'Once upon a time...'
          },
          {
            title: 'New list with dates',
            description: 'New List with dates',
            content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
          }
        ]
      }}
    />
  );
};

export default TinyMCEEditor;