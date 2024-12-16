'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(formData) {
  const email = formData.get('email')?.trim().toLowerCase();

  try {
    if (!email) {
      return {
        error: 'Email is required'
      };
    }

    if (!EMAIL_REGEX.test(email)) {
      return {
        error: 'Please provide a valid email address'
      };
    }

    const existingEmail = await sql`
      SELECT EXISTS(
        SELECT 1 FROM email_subscriptions 
        WHERE email = ${email}
      );
    `;

    if (existingEmail[0].exists) {
      return {
        error: 'This email is already subscribed'
      };
    }

    await sql`
      INSERT INTO email_subscriptions (email) 
      VALUES (${email})
    `;

    return {
      success: true,
      message: 'Successfully subscribed!'
    };

  } catch (error) {
    console.error('Subscription error:', error);
    return {
      error: 'Failed to subscribe. Please try again later.'
    };
  }
}
