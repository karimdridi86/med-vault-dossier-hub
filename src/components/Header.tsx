
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="border-b px-4 md:px-6 py-3 bg-white flex items-center justify-between">
      <div className="flex items-center w-full max-w-md">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <Input
          type="search"
          placeholder="Search patients, records..."
          className="border-none shadow-none focus-visible:ring-0"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="h-4 w-4 p-0 flex items-center justify-center absolute -top-1 -right-1">
            3
          </Badge>
        </Button>
        
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-medical-blue text-white">DR</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Dr. Sarah Reynolds</p>
            <p className="text-xs text-muted-foreground">Cardiologist</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
