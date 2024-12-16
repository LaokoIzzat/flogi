'use server';

import { neon } from '@neondatabase/serverless';

export async function subscribe(formData) {
  const sql = neon(process.env.DATABASE_URL);
  const email = formData.get('email');

  try {
    // Check if email already exists
    const existingEmail = await sql`
      SELECT comment FROM comments 
      WHERE comment = ${email}
    `;

    if (existingEmail.length > 0) {
      return {
        error: 'This email is already subscribed'
      };
    }

    // Insert new subscriber
    await sql`
      INSERT INTO comments (comment) 
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