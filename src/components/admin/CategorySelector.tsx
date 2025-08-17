import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  key: string;
  label: string;
  slug: string;
}

interface CategorySelectorProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  languageCode: string;
  multiple?: boolean;
  placeholder?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategories,
  onCategoriesChange,
  languageCode,
  multiple = false,
  placeholder = "Chọn chuyên mục..."
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, [languageCode]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .like('setting_key', `category_${languageCode}_%`)
        .eq('category', 'news_categories')
        .order('display_name', { ascending: true });

      if (error) throw error;
      
      const transformedCategories: Category[] = (data || []).map(item => {
        const settingValue = typeof item.setting_value === 'string' 
          ? JSON.parse(item.setting_value) 
          : item.setting_value;
        
        return {
          key: item.setting_key.replace(`category_${languageCode}_`, ''),
          label: item.display_name,
          slug: settingValue?.slug || item.setting_key.replace(`category_${languageCode}_`, '')
        };
      });
      
      setCategories(transformedCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryLabel: string) => {
    if (multiple) {
      if (!selectedCategories.includes(categoryLabel)) {
        onCategoriesChange([...selectedCategories, categoryLabel]);
      }
    } else {
      onCategoriesChange([categoryLabel]);
    }
  };

  const handleCategoryRemove = (categoryLabel: string) => {
    onCategoriesChange(selectedCategories.filter(cat => cat !== categoryLabel));
  };

  if (loading) {
    return (
      <div>
        <Label>Chuyên mục</Label>
        <div className="text-sm text-muted-foreground">Đang tải chuyên mục...</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Chuyên mục {multiple && "(có thể chọn nhiều)"}</Label>
      
      <Select onValueChange={handleCategorySelect}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem 
              key={category.key} 
              value={category.label}
              disabled={!multiple && selectedCategories.includes(category.label)}
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCategories.map((categoryLabel) => (
            <Badge key={categoryLabel} variant="secondary" className="flex items-center gap-1">
              {categoryLabel}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => handleCategoryRemove(categoryLabel)}
              />
            </Badge>
          ))}
        </div>
      )}

      {categories.length === 0 && (
        <div className="text-sm text-muted-foreground">
          Chưa có chuyên mục nào. Vui lòng tạo chuyên mục trong phần quản lý chuyên mục.
        </div>
      )}
    </div>
  );
};

export default CategorySelector;