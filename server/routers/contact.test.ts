import { describe, expect, it, vi } from 'vitest';
import { contactRouter } from './contact';
import { publicProcedure, router } from '../_core/trpc';
import type { TrpcContext } from '../_core/context';

// Mock the notification module
vi.mock('../_core/notification', () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: 'https',
      headers: {},
    } as TrpcContext['req'],
    res: {} as TrpcContext['res'],
  };
}

describe('contact.submit', () => {
  it('should successfully submit a contact form with valid data', async () => {
    const caller = contactRouter.createCaller(createPublicContext());

    const result = await caller.submit({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Internship Inquiry',
      message: 'I am interested in an internship opportunity at your company.',
    });

    expect(result).toEqual({
      success: true,
      message: 'Message sent successfully!',
      notificationSent: true,
    });
  });

  it('should reject submission with invalid email', async () => {
    const caller = contactRouter.createCaller(createPublicContext());

    try {
      await caller.submit({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Internship Inquiry',
        message: 'I am interested in an internship opportunity at your company.',
      });
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toContain('Invalid email address');
    }
  });

  it('should reject submission with short name', async () => {
    const caller = contactRouter.createCaller(createPublicContext());

    try {
      await caller.submit({
        name: 'J',
        email: 'john@example.com',
        subject: 'Internship Inquiry',
        message: 'I am interested in an internship opportunity at your company.',
      });
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toContain('Name must be at least 2 characters');
    }
  });

  it('should reject submission with short message', async () => {
    const caller = contactRouter.createCaller(createPublicContext());

    try {
      await caller.submit({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Internship Inquiry',
        message: 'Hi',
      });
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toContain('Message must be at least 10 characters');
    }
  });
});
