import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Users, UserPlus, Shield, Settings } from "lucide-react";

interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

interface UserRole {
  role: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch all users with their roles
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles(role)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch all permissions
  const { data: permissions = [] } = useQuery({
    queryKey: ['permissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('permissions')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch role permissions for selected user
  const { data: userPermissions = [] } = useQuery({
    queryKey: ['user-permissions', selectedUser?.id],
    queryFn: async () => {
      if (!selectedUser) return [];
      
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          role,
          role_permissions(
            permission_id,
            permissions(*)
          )
        `)
        .eq('user_id', selectedUser.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedUser
  });

  // Create new user mutation
  const createUserMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Tạo người dùng thành công!");
      setNewUserEmail("");
      setNewUserPassword("");
      setIsCreateDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (error: any) => {
      toast.error(`Lỗi tạo người dùng: ${error.message}`);
    }
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'user' | 'hr_manager' | 'content_editor' | 'moderator' }) => {
      // Delete existing roles
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Insert new role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: role as any });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Cập nhật quyền thành công!");
      setIsRoleDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['user-permissions'] });
    },
    onError: (error: any) => {
      toast.error(`Lỗi cập nhật quyền: ${error.message}`);
    }
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate({ email: newUserEmail, password: newUserPassword });
  };

  const handleUpdateRole = (role: 'admin' | 'user' | 'hr_manager' | 'content_editor' | 'moderator') => {
    if (selectedUser) {
      updateRoleMutation.mutate({ userId: selectedUser.id, role });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'hr_manager': return 'bg-blue-100 text-blue-800';
      case 'content_editor': return 'bg-green-100 text-green-800';
      case 'moderator': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'hr_manager': return 'Quản lý nhân sự';
      case 'content_editor': return 'Biên tập nội dung';
      case 'moderator': return 'Kiểm duyệt viên';
      default: return 'Người dùng';
    }
  };

  if (usersLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
          <p className="text-muted-foreground">Quản lý tài khoản và phân quyền người dùng</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Tạo người dùng
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo tài khoản mới</DialogTitle>
              <DialogDescription>
                Tạo tài khoản mới cho nhân viên
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="user@company.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu tạm thời</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  required
                  minLength={6}
                />
              </div>
              <Alert>
                <AlertDescription>
                  Người dùng sẽ nhận được email xác nhận và cần đổi mật khẩu khi đăng nhập lần đầu.
                </AlertDescription>
              </Alert>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={createUserMutation.isPending}
              >
                {createUserMutation.isPending ? "Đang tạo..." : "Tạo tài khoản"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Danh sách người dùng
          </CardTitle>
          <CardDescription>
            Quản lý tài khoản và quyền hạn của người dùng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.full_name || 'Chưa cập nhật'}</TableCell>
                  <TableCell>
                    {user.user_roles?.map((ur: UserRole) => (
                      <Badge key={ur.role} className={getRoleColor(ur.role)}>
                        {getRoleName(ur.role)}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsRoleDialogOpen(true);
                      }}
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Phân quyền
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Management Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Phân quyền cho {selectedUser?.email}
            </DialogTitle>
            <DialogDescription>
              Chọn vai trò phù hợp cho người dùng này
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Chọn vai trò:</Label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'admin', label: 'Quản trị viên', desc: 'Toàn quyền hệ thống' },
                  { value: 'hr_manager', label: 'Quản lý nhân sự', desc: 'Quản lý tuyển dụng' },
                  { value: 'content_editor', label: 'Biên tập nội dung', desc: 'Quản lý tin tức, thương hiệu' },
                  { value: 'moderator', label: 'Kiểm duyệt viên', desc: 'Kiểm duyệt nội dung' }
                ].map((role) => (
                  <Card 
                    key={role.value}
                    className="cursor-pointer hover:border-primary"
                    onClick={() => handleUpdateRole(role.value as 'admin' | 'user' | 'hr_manager' | 'content_editor' | 'moderator')}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-medium">{role.label}</h4>
                      <p className="text-sm text-muted-foreground">{role.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {userPermissions.length > 0 && (
              <div className="space-y-4">
                <Label>Quyền hiện tại:</Label>
                <div className="grid grid-cols-1 gap-2">
                  {userPermissions.flatMap((ur: any) => 
                    ur.role_permissions.map((rp: any) => (
                      <div key={rp.permission_id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div>
                          <span className="font-medium">{rp.permissions.description}</span>
                          <span className="text-sm text-muted-foreground ml-2">({rp.permissions.category})</span>
                        </div>
                        <Badge variant="secondary">{getRoleName(ur.role)}</Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;