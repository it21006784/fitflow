import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserCheck({ userId }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Check if userId exists
    const hasUserId = !!userId;

    if (!isLoggedIn || !hasUserId) {
      navigate('/login');
    }
  }, [navigate, userId]);

  return null;
}

export default UserCheck;
