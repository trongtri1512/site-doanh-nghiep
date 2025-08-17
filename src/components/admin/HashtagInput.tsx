import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HashtagInputProps {
  value: string[];
  onChange: (hashtags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

interface Hashtag {
  id: string;
  name: string;
  usage_count: number;
}

const HashtagInput: React.FC<HashtagInputProps> = ({
  value = [],
  onChange,
  placeholder = "Thêm hashtag...",
  maxTags = 10
}) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Hashtag[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (input.length > 1) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  const fetchSuggestions = async (query: string) => {
    try {
      const { data, error } = await supabase
        .from('hashtags')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('usage_count', { ascending: false })
        .limit(5);

      if (error) throw error;
      setSuggestions(data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching hashtags:', error);
    }
  };

  const addHashtag = async (tagName: string) => {
    const cleanTag = tagName.trim().toLowerCase().replace(/^#/, '');
    
    if (!cleanTag) return;
    
    if (value.includes(cleanTag)) {
      toast({
        title: "Hashtag đã tồn tại",
        description: "Hashtag này đã được thêm rồi.",
        variant: "destructive"
      });
      return;
    }

    if (value.length >= maxTags) {
      toast({
        title: "Đã đạt giới hạn",
        description: `Bạn chỉ có thể thêm tối đa ${maxTags} hashtag.`,
        variant: "destructive"
      });
      return;
    }

    // Update usage count in database
    try {
      const { data: existing } = await supabase
        .from('hashtags')
        .select('*')
        .eq('name', cleanTag)
        .single();

      if (existing) {
        await supabase
          .from('hashtags')
          .update({ usage_count: existing.usage_count + 1 })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('hashtags')
          .insert({ name: cleanTag, usage_count: 1 });
      }
    } catch (error) {
      console.error('Error updating hashtag:', error);
    }

    onChange([...value, cleanTag]);
    setInput('');
    setShowSuggestions(false);
  };

  const removeHashtag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addHashtag(input);
    }
  };

  const selectSuggestion = (hashtag: Hashtag) => {
    addHashtag(hashtag.name);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={() => addHashtag(input)}
            size="sm"
            disabled={!input.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10">
            {suggestions.map((hashtag) => (
              <div
                key={hashtag.id}
                className="px-3 py-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                onClick={() => selectSuggestion(hashtag)}
              >
                <span>#{hashtag.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {hashtag.usage_count}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <Badge key={index} variant="secondary" className="px-2 py-1">
              #{tag}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => removeHashtag(tag)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        {value.length}/{maxTags} hashtag. Nhấn Enter hoặc dấu phẩy để thêm.
      </p>
    </div>
  );
};

export default HashtagInput;