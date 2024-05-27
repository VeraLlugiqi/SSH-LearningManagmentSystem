
import request from 'supertest';
import express, { Response } from 'express';
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from '../../controllers/layout.controller';
import LayoutModel, {
  FaqItem,
  Category,
  BannerImage,
  Review,
} from '../../models/layout.model';

// Mocking dependencies
jest.mock('../../models/layout.model');
jest.mock('cloudinary');

const app = express();
app.use(express.json());

describe('Layout Controller - Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createLayout', () => {
    it('should create banner layout', async () => {
      // Mock req.body for Banner layout
      const req: any = {
        body: {
          type: 'Banner',
          image: 'image-url',
          title: 'Banner Title',
          subTitle: 'Banner Subtitle',
        },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock findOne to return null (layout doesn't exist)
      (LayoutModel as jest.Mocked<any>).findOne.mockResolvedValue(null);

      await createLayout(req, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Layout created successfully',
      });
    });

  });

  describe('Layout Controller - Unit Tests', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('createLayout', () => {
      it('should create banner layout', async () => {
        // Mock req.body for Banner layout
        const req: any = {
          body: {
            type: 'Banner',
            image: 'image-url',
            title: 'Banner Title',
            subTitle: 'Banner Subtitle',
          },
        };
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        // Mock findOne to return null (layout doesn't exist)
        (LayoutModel as jest.Mocked<any>).findOne.mockResolvedValue(null);
  
        await createLayout(req, res as Response, jest.fn());
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: 'Layout created successfully',
        });
      });
  
    });
  
    describe('editLayout', () => {
      it('should edit banner layout', async () => {
        // Mock req.body for Banner layout edit
        const req: any = {
          body: {
            type: 'Banner',
            image: 'new-image-url',
            title: 'New Banner Title',
            subTitle: 'New Banner Subtitle',
          },
        };
        const res: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        // Mock findOne to return layout data
        (LayoutModel as jest.Mocked<any>).findOne.mockResolvedValue({
          _id: 'layout-id',
          banner: {
            image: { public_id: 'old-public-id', url: 'old-image-url' },
          },
        });
  
        await editLayout(req, res as Response, jest.fn());
  
        expect(LayoutModel.findByIdAndUpdate).toHaveBeenCalledWith('layout-id', {
          banner: {
            image: { public_id: 'old-public-id', url: 'old-image-url' },
            title: 'New Banner Title',
            subTitle: 'New Banner Subtitle',
          },
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          message: 'Layout Updated successfully',
        });
      });
      });

    describe('getLayoutByType', () => {
        it('should get layout by type', async () => {
          // Mock req.params for type
          const req: any = {
            params: { type: 'Banner' },
          };
          const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          // Mock findOne to return layout data
          (LayoutModel as jest.Mocked<any>).findOne.mockResolvedValue({
            type: 'Banner',
            banner: {
              image: { public_id: 'banner-public-id', url: 'banner-image-url' },
              title: 'Banner Title',
              subTitle: 'Banner Subtitle',
            },
          });
    
          await getLayoutByType(req, res as Response, jest.fn());
    
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.json).toHaveBeenCalledWith({
            success: true,
            layout: {
              type: 'Banner',
              banner: {
                image: { public_id: 'banner-public-id', url: 'banner-image-url' },
                title: 'Banner Title',
                subTitle: 'Banner Subtitle',
              },
            },
          });
        });
    
      });
    });
});

