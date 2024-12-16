'use client';

import { useState } from 'react';
import EmailForm from './EmailForm.js';
import SuccessMessage from './SuccessMessage.js';
import TryAgainMessage from './TryAgainMessage.js';
import { subscribe } from '@/app/actions/subscribe';

export default function NotificationForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      const result = await subscribe(formData);

      if (result.error) {
        // Check if the error is due to existing email
        if (result.error.includes('already subscribed')) {
          setErrorType('already-subscribed');
        } else {
          setErrorType('subscription-error');
        }
        throw new Error(result.error);
      }

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
      }, 4000);

    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setIsSubmitting(false);
      setIsExiting(false);
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
        setTimeout(() => {
          setStatus('');
          setErrorType('');
        }, 300);
      }, 4000);
    }
  };

  return (
    <div className="w-full max-w-md relative min-h-[70px]">
      {status === 'success' ? (
        <SuccessMessage show={showSuccess} />
      ) : status === 'error' ? (
        <TryAgainMessage show={showError} errorType={errorType} />
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
