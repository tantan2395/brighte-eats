export interface kLead {
  id: number;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  interests: string[];
  created_at: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  interests: string[];
  createdAt: string;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  interests: string[];
}
