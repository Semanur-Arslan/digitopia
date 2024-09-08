'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from '@/features/toast/toastSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.toast.messages);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length) {
        dispatch(removeToast(messages[0].id));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [messages, dispatch]);

  return (
    <div className="fixed top-4 right-4 space-y-2 flex justify-center w-full">
      {messages.map(({ id, message, type }) => (
        <div
          key={id}
          className={`p-4 rounded-lg shadow-lg transition-transform transform ${type === 'success' ? 'bg-success text-white' :
            type === 'error' ? 'bg-error text-white' :
              type === 'info' ? 'bg-info text-white' : 'bg-gray-500 text-white'}`}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
