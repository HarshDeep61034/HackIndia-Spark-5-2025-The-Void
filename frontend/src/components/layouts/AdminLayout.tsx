
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Database, MessageSquare, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Knowledge Base', href: '/admin/knowledge', icon: Database },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Students', href: '/admin/students', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-sidebar shadow-lg z-20 transform transition-transform duration-200 ease-in-out",
          {
            "-translate-x-full": isMobile && !sidebarOpen,
            "translate-x-0": !isMobile || sidebarOpen,
          }
        )}
      >
        {isMobile && (
          <button onClick={toggleSidebar} className="absolute right-4 top-4 text-sidebar-foreground">
            <X size={24} />
          </button>
        )}

        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold gradient-heading">Athena </h1>
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
          <nav className="px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn("w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", {
                  "bg-sidebar-accent text-sidebar-accent-foreground": window.location.pathname === item.href,
                })}
                onClick={() => navigate(item.href)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={user?.avatar} alt={user?.name || ''} />
                <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-sidebar-foreground/70">{user?.email}</div>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("flex-1 flex flex-col min-w-0", {
        "ml-0": isMobile,
        "ml-64": !isMobile,
      })}>
        {/* Header */}
        <header className="h-16 bg-card flex items-center shadow-sm px-4 sticky top-0 z-10">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <Menu size={24} />
            </Button>
          )}
          <h1 className="text-xl font-semibold">{title}</h1>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-10"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AdminLayout;
