

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authAPI';
import { setUser } from '../../features/auth/authSlice';

export default function LoginPage() {
//   const dispatch = useDispatch();
//   const authStatus = useSelector((state) => state.auth.status);

  const handleLogin = async (credentials) => {
    try {
      const resultAction = await dispatch(login(credentials));
      if (login.fulfilled.match(resultAction)) {
        dispatch(setUser(resultAction.payload));
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
   
      {/* {authStatus === 'loading' && <p>Loading...</p>}
      {authStatus === 'failed' && <p>Login failed</p>} */}
    </div>
  );
}
