import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const contactFormSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
  message: z.string().min(10, "Tin nhắn phải có ít nhất 10 ký tự"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactInfo {
  id: string;
  section_key: string;
  title: string;
  content: string;
  display_order: number;
}

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [pageContent, setPageContent] = useState<Record<string, ContactInfo>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { currentLanguage, t } = useLanguage();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      // First try to get data for current language
      const { data: currentLangData, error: currentError } = await supabase
        .from("contact_info")
        .select("*")
        .eq("is_active", true)
        .eq("language_code", currentLanguage)
        .order("display_order");

      if (currentError) {
        console.error("Error fetching contact info:", currentError);
        return;
      }

      let allData = currentLangData || [];

      // If current language is English and no contact info sections found, fallback to Vietnamese
      if (currentLanguage === 'en') {
        const hasContactInfo = allData.some(item => 
          ['company_info', 'business_hours', 'support'].includes(item.section_key)
        );

        if (!hasContactInfo) {
          const { data: viData, error: viError } = await supabase
            .from("contact_info")
            .select("*")
            .eq("is_active", true)
            .eq("language_code", 'vi')
            .in("section_key", ['company_info', 'business_hours', 'support'])
            .order("display_order");

          if (!viError && viData) {
            // Add Vietnamese contact info as fallback
            allData = [...allData, ...viData];
          }
        }
      }
      
      // Separate contact info and page content
      const contactInfoData = allData.filter(item => 
        ['company_info', 'business_hours', 'support'].includes(item.section_key)
      );
      
      const pageContentData = allData.reduce((acc, item) => {
        acc[item.section_key] = item;
        return acc;
      }, {} as Record<string, ContactInfo>);

      setContactInfo(contactInfoData);
      setPageContent(pageContentData);
    };

    fetchContactInfo();
  }, [currentLanguage]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          subject: data.subject,
          message: data.message,
        });

      if (error) throw error;

      toast({
        title: pageContent[`success_title_${currentLanguage}`]?.content || pageContent['success_title_en']?.content || "Gửi thành công",
        description: pageContent[`success_message_${currentLanguage}`]?.content || pageContent['success_message_en']?.content || "Tin nhắn của bạn đã được gửi. Chúng tôi sẽ liên hệ lại sớm nhất có thể.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: pageContent[`error_title_${currentLanguage}`]?.content || pageContent['error_title_en']?.content || "Lỗi",
        description: pageContent[`error_message_${currentLanguage}`]?.content || pageContent['error_message_en']?.content || "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (sectionKey: string) => {
    switch (sectionKey) {
      case "company_info":
        return <MapPin className="w-6 h-6 text-primary" />;
      case "business_hours":
        return <Clock className="w-6 h-6 text-primary" />;
      case "support":
        return <Phone className="w-6 h-6 text-primary" />;
      default:
        return <Mail className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {pageContent[`page_title_${currentLanguage}`]?.content || pageContent['page_title_en']?.content || "Liên hệ với chúng tôi"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {pageContent[`page_description_${currentLanguage}`]?.content || pageContent['page_description_en']?.content || "Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến của bạn"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                {pageContent[`contact_info_title_${currentLanguage}`]?.content || pageContent['contact_info_title_en']?.content || "Thông tin liên hệ"}
              </h2>
              
              {contactInfo.map((info) => (
                <Card key={info.id} className="border-border">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      {getIcon(info.section_key)}
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-muted-foreground whitespace-pre-wrap font-sans">
                      {info.content}
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {pageContent[`form_title_${currentLanguage}`]?.content || pageContent['form_title_en']?.content || "Gửi tin nhắn cho chúng tôi"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {pageContent[`form_name_label_${currentLanguage}`]?.content || pageContent['form_name_label_en']?.content || "Họ và tên *"}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={pageContent[`form_name_placeholder_${currentLanguage}`]?.content || pageContent['form_name_placeholder_en']?.content || "Nhập họ và tên"} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {pageContent[`form_email_label_${currentLanguage}`]?.content || pageContent['form_email_label_en']?.content || "Email *"}
                              </FormLabel>
                              <FormControl>
                                <Input type="email" placeholder={pageContent[`form_email_placeholder_${currentLanguage}`]?.content || pageContent['form_email_placeholder_en']?.content || "Nhập email"} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {pageContent[`form_phone_label_${currentLanguage}`]?.content || pageContent['form_phone_label_en']?.content || "Số điện thoại"}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={pageContent[`form_phone_placeholder_${currentLanguage}`]?.content || pageContent['form_phone_placeholder_en']?.content || "Nhập số điện thoại"} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {pageContent[`form_subject_label_${currentLanguage}`]?.content || pageContent['form_subject_label_en']?.content || "Tiêu đề *"}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={pageContent[`form_subject_placeholder_${currentLanguage}`]?.content || pageContent['form_subject_placeholder_en']?.content || "Nhập tiêu đề"} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {pageContent[`form_message_label_${currentLanguage}`]?.content || pageContent['form_message_label_en']?.content || "Tin nhắn *"}
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={pageContent[`form_message_placeholder_${currentLanguage}`]?.content || pageContent['form_message_placeholder_en']?.content || "Nhập tin nhắn của bạn"}
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 
                          (pageContent[`form_submitting_button_${currentLanguage}`]?.content || pageContent['form_submitting_button_en']?.content || "Đang gửi...") : 
                          (pageContent[`form_submit_button_${currentLanguage}`]?.content || pageContent['form_submit_button_en']?.content || "Gửi tin nhắn")
                        }
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;