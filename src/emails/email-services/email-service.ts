import { InbucketClient } from '@emails/inbucket-client';
import { Email, EmailSummary } from '@emails/email-types';
import axios from 'axios';

export class EmailService {
  private client: InbucketClient;

  constructor() {
    const baseUrl = process.env.EMAIL_CLIENT_BASE_URL;
    this.client = new InbucketClient(baseUrl);
  }

  async getLatestEmailWithSubject(
    emailRecipient: string,
    emailSubject: string,
    timeoutMs = 20000,
    pollIntervalMs = 2000
  ): Promise<any | undefined> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutMs) {
      try {
        const response = await axios.get(`${this.client.getBaseUrl()}/mailbox/${emailRecipient}`);
        const emails = response.data;
        const latestEmail = emails.find((email: any) =>
          email.subject.includes(emailSubject)
        );

        if (latestEmail) {
          return latestEmail;
        }
      } catch (error) {
        console.error("Error while fetching emails:", error);
      }
      /* Retry to fetch email in pollIntervalMs/1000 seconds */
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }
    /* Return undefined if no email found within the timeout */
    return undefined;
  }

  async getEmailDetails(emailSummary: EmailSummary): Promise<Email> {
    const mailbox = emailSummary.to[0].split('@')[0].trim().replace(/^<|>$/g, '');
    return await this.client.getDetails(mailbox, emailSummary.id);
  }

  async getEmailBodyText (emailSummary: EmailSummary): Promise<string> {
    const emailBody = await this.getEmailDetails(emailSummary);
    return emailBody.body.text;
  }
}
