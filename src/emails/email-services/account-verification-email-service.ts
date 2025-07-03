import { EmailService } from '@emails/email-services/email-service';
import { EmailSummary } from '@emails/email-types';

export class AccountVerificationEmailService extends EmailService {
  constructor() {
    super();
  }

  async getAccountVerificationCode(accountVerificationEmail: EmailSummary): Promise<string> {
    const text = await this.getEmailBodyText(accountVerificationEmail);
    const match = text.match(/verification code:\s*(\d+)/i);
    return match[1];
  }

  async getEmailVerificationLink(accountVerificationEmail: EmailSummary): Promise<string> {
    const text = await this.getEmailBodyText(accountVerificationEmail);
    const match = text.match(/https?:\/\/[^\s"]*verifyToken[^\s"]*/);
    return match[0];
  }
}