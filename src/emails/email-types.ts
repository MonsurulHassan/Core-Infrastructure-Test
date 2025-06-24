export interface Email {
  id: string;
  body: EmailBody;
  attachments: any[];
  headers: Record<string, string[]>;
}

export interface EmailSummary {
  id: string;
  from: string;
  to: string[];
  subject: string;
  date: string;
}

export interface EmailBody {
  text: string;
  html: string;
}


