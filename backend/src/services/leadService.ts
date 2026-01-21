import knex from '../db/knex.js';
import type { Lead, CreateLeadInput, kLead } from '../types/lead.js'

export class LeadService {
    async getAllLeads(): Promise<Lead[]> {
        try {
            const leads = await knex<kLead>('leads').select('*').orderBy('created_at', 'desc');
            return leads.map(this.mapDbToLead)
        } catch (error) {
            console.error('Error fetching leads: ', error);
            throw new Error('Failed to fetch leads');
        }
    }

    async getLeadById(id: number): Promise<Lead | null> {
        try {
            const lead = await knex<kLead>('leads').where({ id }).first();
            return lead ? this.mapDbToLead(lead) : null;
        } catch (error) {
            console.error(`Error fetching lead ${id}: `, error);
            throw new Error('Failed to fetch lead');
        }
    }

    async createLead(input: CreateLeadInput): Promise<Lead> {
        try {
            const validInterests = ['delivery', 'pick-up', 'payment'];
            const invalidInterests = input.interests.filter(
                (interest: string) => !validInterests.includes(interest)
            );

            if (invalidInterests.length > 0) {
                throw new Error(`Invalid interests: ${invalidInterests.join(', ')}. Valid options are: ${validInterests.join(', ')}`);
            }

            const [lead] = await knex<kLead>('leads').insert({
                name: input.name,
                email: input.email,
                mobile: input.mobile,
                postcode: input.postcode,
                interests: input.interests
            }).returning('*');

            console.log('createLead', lead)

            return this.mapDbToLead(lead);
        } catch (error: any) {
            if (error.code === '23505') {
                throw new Error('A lead with this email already exists');
            }

            console.error('Error creating lead:', error);
            throw new Error('Failed to create lead');
        }
    }


    private mapDbToLead(dbLead: kLead): Lead {
        return {
            id: dbLead.id,
            name: dbLead.name,
            email: dbLead.email,
            mobile: dbLead.mobile,
            postcode: dbLead.postcode,
            interests: dbLead.interests,
            createdAt: dbLead.created_at,

        }
    }
}