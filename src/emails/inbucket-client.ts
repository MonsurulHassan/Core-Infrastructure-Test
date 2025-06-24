import axios from 'axios';
import { Email, EmailSummary } from './email-types';

export class InbucketClient {
  constructor(private baseUrl: string) { }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  async getMailbox(mailbox: string): Promise<EmailSummary[]> {
    const url = `${this.baseUrl}/mailbox/${mailbox}`;
    const { data } = await axios.get(url);
    return data;
  }

  async getDetails(mailbox: string, id: string): Promise<Email> {
    const emailContentUrl = `${this.baseUrl}/mailbox/${mailbox}/${id}`;
    try {
      const { data } = await axios.get(emailContentUrl);
      return data as Email;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
