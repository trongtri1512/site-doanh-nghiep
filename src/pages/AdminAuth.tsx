import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Lock, User, AlertCircle } from "lucide-react";

const AdminAuth = () => {
  const { user, signIn, resetPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/admin" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    }
    
    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const { error } = await resetPassword(email);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Email khôi phục mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.");
    }
    
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Admin Panel</CardTitle>
          <CardDescription>
            Đăng nhập để truy cập hệ thống quản lý
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!showResetForm ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@imv.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full" 
                onClick={() => setShowResetForm(true)}
              >
                Quên mật khẩu?
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="admin@imv.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Đang gửi..." : "Gửi email khôi phục"}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full" 
                onClick={() => setShowResetForm(false)}
              >
                Quay lại đăng nhập
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Liên hệ quản trị viên để được cấp tài khoản</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminAuth;