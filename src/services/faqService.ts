export interface FaqItemData {
  id: number;
  category_id: number;
  question: string;
  answer: string;
  order?: number;
  status?: string;
  link?: { href: string; label: string };
}

export interface FaqCategoryData {
  id: number;
  name: string;
  slug: string;
  description?: string;
  order?: number;
  status?: string;
  faqs: FaqItemData[];
}

export interface FaqApiResponse {
  success: boolean;
  data: FaqCategoryData[];
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000";

export async function fetchPublicFaqs(): Promise<FaqCategoryData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/faqs`);
    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
    }
    const result: FaqApiResponse = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching public FAQs:", error);
    return [];
  }
}
