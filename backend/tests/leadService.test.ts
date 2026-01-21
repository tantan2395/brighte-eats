import { LeadService } from '../src/services/leadService.js';

jest.mock('../src/db/knex.js', () => {
  const mockQueryBuilder = {
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    returning: jest.fn(),
    first: jest.fn()
  };

  const mockKnex = jest.fn(() => mockQueryBuilder);

  Object.assign(mockKnex, mockQueryBuilder);

  return {
    __esModule: true,
    default: mockKnex
  };
});

describe('LeadService', () => {
  let leadService: LeadService;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockKnex: any;

  beforeEach(() => {
    jest.clearAllMocks();

    //eslint-disable-next-line @typescript-eslint/no-require-imports
    const knexModule = require('../src/db/knex.js');
    mockKnex = knexModule.default;

    mockKnex.select.mockReturnValue(mockKnex);
    mockKnex.where.mockReturnValue(mockKnex);
    mockKnex.orderBy.mockReturnValue(mockKnex);
    mockKnex.insert.mockReturnValue(mockKnex);

    leadService = new LeadService();
  });

  describe('createLead', () => {
    it('should create a lead with valid interests', async () => {
      const mockLead = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '0412345678',
        postcode: '2000',
        interests: ['delivery', 'payment'],
        created_at: new Date().toISOString()
      };

      mockKnex.returning.mockResolvedValue([mockLead]);

      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '0412345678',
        postcode: '2000',
        interests: ['delivery', 'payment']
      };

      const result = await leadService.createLead(input);

      expect(result).toEqual({
        id: mockLead.id,
        name: mockLead.name,
        email: mockLead.email,
        mobile: mockLead.mobile,
        postcode: mockLead.postcode,
        interests: mockLead.interests,
        createdAt: mockLead.created_at
      });

      expect(mockKnex.insert).toHaveBeenCalledWith({
        name: input.name,
        email: input.email,
        mobile: input.mobile,
        postcode: input.postcode,
        interests: input.interests
      });
      expect(mockKnex.returning).toHaveBeenCalledWith('*');
    });

    it('should throw error for invalid interests', async () => {
      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '0412345678',
        postcode: '2000',
        interests: ['invalid-service', 'delivery']
      };

      await expect(leadService.createLead(input)).rejects.toThrow('Failed to create lead');
    });
  });
});
