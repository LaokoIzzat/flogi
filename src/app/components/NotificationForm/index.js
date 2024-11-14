'use client';

import { useState } from 'react';
import EmailForm from './EmailForm.js';
import SuccessMessage from './SucessMessage.js';

export default function NotificationForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsExiting(true);
    
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setIsSubmitting(false);
      setIsExiting(false);
      setShowSuccess(true);
    }, 300);
    
    setTimeout(() => {
      setShowSuccess(false);
      setTimeout(() => {
        setStatus('');
      }, 300);
    }, 9000);
  };

  return (
    <div className="w-full max-w-md relative min-h-[70px]">
      {status === 'success' ? (
        <SuccessMessage show={showSuccess} />
      ) : (
        <EmailForm
          email={email}
          onEmailChange={(e) => setEmail(e.target.value)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isExiting={isExiting}
        />
      )}
    </div>
  );
}
