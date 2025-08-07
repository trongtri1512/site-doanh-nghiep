import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Plus, Eye, MessageSquare } from "lucide-react";

const contactInfoSchema = z.object({
  section_key: z.string().min(1, "Key không được để trống"),
  title: z.string().min(1, "Tiêu đề không được để trống"),
  content: z.string().min(1, "Nội dung không được để trống"),
  display_order: z.number().min(0, "Thứ tự hiển thị phải >= 0"),
});

type ContactInfoData = z.infer<typeof contactInfoSchema>;

interface ContactInfo {
  id: string;
  section_key: string;
  title: string;
  content: string;
  display_order: number;
  is_active: boolean;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const ContactManagement = () => {
  const [activeTab, setActiveTab] = useState("vi");
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [editingItem, setEditingItem] = useState<ContactInfo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactInfoData>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      section_key: "",
      title: "",
      content: "",
      display_order: 0,
    },
  });

  useEffect(() => {
    fetchContactInfo();
    fetchContactMessages();
  }, [activeTab]);

  const fetchContactInfo = async () => {
    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .eq("language_code", activeTab)
      .order("display_order");

    if (error) {
      console.error("Error fetching contact info:", error);
      return;
    }

    setContactInfo(data || []);
  };

  const fetchContactMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contact messages:", error);
      return;
    }

    setContactMessages(data || []);
  };

  const onSubmit = async (data: ContactInfoData) => {
    try {
      if (editingItem) {
        const { error } = await supabase
          .from("contact_info")
          .update(data)
          .eq("id", editingItem.id);

        if (error) throw error;

        toast({
          title: "Cập nhật thành công",
          description: "Thông tin liên hệ đã được cập nhật.",
        });
      } else {
        const { error } = await supabase
          .from("contact_info")
          .insert({
            section_key: data.section_key,
            title: data.title,
            content: data.content,
            display_order: data.display_order,
            language_code: activeTab,
          });

        if (error) throw error;

        toast({
          title: "Thêm thành công",
          description: "Thông tin liên hệ mới đã được thêm.",
        });
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      form.reset();
      fetchContactInfo();
    } catch (error) {
      console.error("Error saving contact info:", error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu thông tin.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: ContactInfo) => {
    setEditingItem(item);
    form.reset({
      section_key: item.section_key,
      title: item.title,
      content: item.content,
      display_order: item.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa thông tin này?")) return;

    try {
      const { error } = await supabase
        .from("contact_info")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Xóa thành công",
        description: "Thông tin liên hệ đã được xóa.",
      });

      fetchContactInfo();
    } catch (error) {
      console.error("Error deleting contact info:", error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xóa thông tin.",
        variant: "destructive",
      });
    }
  };

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ status })
        .eq("id", messageId);

      if (error) throw error;

      toast({
        title: "Cập nhật thành công",
        description: "Trạng thái tin nhắn đã được cập nhật.",
      });

      fetchContactMessages();
      setMessageDialogOpen(false);
    } catch (error) {
      console.error("Error updating message status:", error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi cập nhật trạng thái.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      new: "destructive",
      processing: "secondary",
      resolved: "default",
    };

    const labels: Record<string, string> = {
      new: "Mới",
      processing: "Đang xử lý",
      resolved: "Đã xử lý",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lý liên hệ</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 w-fit">
          <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-6 mt-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Thông tin liên hệ</TabsTrigger>
              <TabsTrigger value="messages">Tin nhắn khách hàng</TabsTrigger>
            </TabsList>

        <TabsContent value="info" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Thông tin liên hệ</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingItem(null);
                  form.reset();
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm thông tin
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Chỉnh sửa thông tin liên hệ" : "Thêm thông tin liên hệ"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="section_key"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key</FormLabel>
                            <FormControl>
                              <Input placeholder="company_info" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="display_order"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Thứ tự hiển thị</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tiêu đề</FormLabel>
                          <FormControl>
                            <Input placeholder="Thông tin công ty" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nội dung</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Nhập nội dung..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Hủy
                      </Button>
                      <Button type="submit">
                        {editingItem ? "Cập nhật" : "Thêm"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Thứ tự</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactInfo.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.section_key}</TableCell>
                      <TableCell>{item.display_order}</TableCell>
                      <TableCell>
                        <Badge variant={item.is_active ? "default" : "secondary"}>
                          {item.is_active ? "Hoạt động" : "Ẩn"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <h2 className="text-xl font-semibold">Tin nhắn từ khách hàng</h2>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Ngày gửi</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.name}</TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell>{message.subject}</TableCell>
                      <TableCell>
                        {new Date(message.created_at).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell>{getStatusBadge(message.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedMessage(message);
                            setMessageDialogOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Xem
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Message Detail Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chi tiết tin nhắn
            </DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tên:</label>
                  <p className="text-sm text-muted-foreground">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email:</label>
                  <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                </div>
              </div>
              
              {selectedMessage.phone && (
                <div>
                  <label className="text-sm font-medium">Số điện thoại:</label>
                  <p className="text-sm text-muted-foreground">{selectedMessage.phone}</p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium">Tiêu đề:</label>
                <p className="text-sm text-muted-foreground">{selectedMessage.subject}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Tin nhắn:</label>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Trạng thái:</label>
                <div className="mt-1">{getStatusBadge(selectedMessage.status)}</div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => updateMessageStatus(selectedMessage.id, "processing")}
                  disabled={selectedMessage.status === "processing"}
                >
                  Đang xử lý
                </Button>
                <Button
                  onClick={() => updateMessageStatus(selectedMessage.id, "resolved")}
                  disabled={selectedMessage.status === "resolved"}
                >
                  Đã xử lý
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactManagement;