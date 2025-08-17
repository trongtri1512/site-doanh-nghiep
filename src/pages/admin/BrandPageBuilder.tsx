import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const BrandPageBuilder = () => {
  const { brandSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("vi");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: sections = [] } = useQuery({
    queryKey: ['brand-page-content', brandSlug, activeTab],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brand_page_content')
        .select('*')
        .eq('brand_slug', brandSlug)
        .eq('language_code', activeTab)
        .order('display_order');
      if (error) throw error;
      return data || [];
    },
    enabled: !!brandSlug
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('brand_page_content').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brand-page-content'] });
      toast({ title: "Section created successfully" });
      setIsDialogOpen(false);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createMutation.mutate({
      brand_slug: brandSlug,
      language_code: activeTab,
      section_type: formData.get('section_type'),
      section_key: formData.get('section_key'),
      title: formData.get('title'),
      content: JSON.parse(formData.get('content') as string || '{}'),
      display_order: sections.length
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/brands')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Brands
        </Button>
        <h1 className="text-3xl font-bold">{brandSlug} - Page Builder</h1>
        <Button onClick={() => window.open(`/brands/${brandSlug}`, '_blank')}>
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                Content Sections
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button><Plus className="h-4 w-4 mr-2" />Add Section</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Section</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label>Section Type</Label>
                        <Input name="section_type" placeholder="hero, about, products..." required />
                      </div>
                      <div>
                        <Label>Section Key</Label>
                        <Input name="section_key" placeholder="unique_key" required />
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input name="title" placeholder="Section title" />
                      </div>
                      <div>
                        <Label>Content (JSON)</Label>
                        <Textarea name="content" placeholder='{"title": "Hello"}' rows={5} />
                      </div>
                      <Button type="submit">Create Section</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sections.length === 0 ? (
                <p>No sections found. Add your first section to get started.</p>
              ) : (
                <div className="space-y-4">
                  {sections.map((section) => (
                    <div key={section.id} className="border p-4 rounded">
                      <h3 className="font-semibold">{section.title || section.section_key}</h3>
                      <p className="text-sm text-muted-foreground">{section.section_type}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandPageBuilder;