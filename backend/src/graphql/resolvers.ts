import { LeadService } from '../services/leadService.js';
import { CreateLeadInput } from '../types/lead.js';

const leadService = new LeadService();

export const resolvers = {
  leads: async () => {
    return await leadService.getAllLeads();
  },
  lead: async ({ id }: { id: string }) => {
    return await leadService.getLeadById(parseInt(id));
  },
  registerLead: async ({ input }: { input: CreateLeadInput }) => {
    return await leadService.createLead(input);
  }
};
