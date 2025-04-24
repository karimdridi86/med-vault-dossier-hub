
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle authentication here
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-medical-blue/5">
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-medical-blue mb-4">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">MedVault Dossier Hub</h1>
            <p className="text-muted-foreground mt-2">
              Secure access to patient medical records
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 border">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-sm text-medical-blue hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full bg-medical-blue hover:bg-medical-blue/90">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>For security purposes, this system is restricted to authorized healthcare professionals only.</p>
              <p className="mt-2">Need access? <a href="#" className="text-medical-blue hover:underline">Contact your administrator</a></p>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-sm text-muted-foreground border-t bg-white">
        <p>© 2025 MedVault Health Systems. All rights reserved.</p>
        <div className="mt-1 space-x-4">
          <a href="#" className="text-xs hover:underline">Privacy Policy</a>
          <a href="#" className="text-xs hover:underline">Terms of Use</a>
          <a href="#" className="text-xs hover:underline">HIPAA Compliance</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
