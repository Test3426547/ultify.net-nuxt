export interface ServiceDetailsData {
    ServiceDetails: Array<{
      id: number;
      Heading: string;
      Description: string;
      Image?: {
        url: string;
        alternativeText?: string;
        formats?: Record<string, { url: string; width: number }>;
      };
    }>;
  }

export interface HeaderServiceData {
  Title: string;
  Subtitle: string;
  Heading: string;
  Subheading: string;
  Pill: Array<{
    id: number;
    Title: string;
  }>;
}