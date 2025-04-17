
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goHome = () => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user?.role === 'student') {
      navigate('/student/chat');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-9xl font-bold text-accent mb-4">403</div>
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        You don't have permission to access this page. Please contact an administrator if you believe this is an error.
      </p>
      <Button onClick={goHome}>
        Go back to home
      </Button>
    </div>
  );
};

export default Unauthorized;
