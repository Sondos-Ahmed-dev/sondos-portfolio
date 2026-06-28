import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { notifyOwner } from '../_core/notification';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const contactRouter = router({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        // Send notification to owner
        const notificationSent = await notifyOwner({
          title: `New Portfolio Contact: ${input.subject}`,
          content: `From: ${input.name} (${input.email})\n\nMessage:\n${input.message}`,
        });

        return {
          success: true,
          message: 'Message sent successfully!',
          notificationSent,
        };
      } catch (error) {
        console.error('Contact form submission error:', error);
        throw new Error('Failed to send message. Please try again later.');
      }
    }),
});
