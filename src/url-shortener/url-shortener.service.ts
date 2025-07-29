import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema';
import { CreateUrlDto } from './dto/create-url.dto';
import { calculateExpiryFromDuration } from './utils/duration.util';

@Injectable()
export class UrlShortenerService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async createShortUrl(dto: CreateUrlDto, req: Request & any) {
    const { nanoid } = await import('nanoid');
    const shortCode = dto.customCode || nanoid(7);

    const maxClicks = dto.maxClicks || Infinity;

    // Check if shortCode already exists
    const existing = await this.urlModel.findOne({ shortCode });
    if (existing) {
      throw new ConflictException('Short code already in use');
    }

    // Calculate expiration date
    const expireAt = dto.validityDuration
      ? calculateExpiryFromDuration(dto.validityDuration)
      : null;

    // Save to DB
    const newUrl = await this.urlModel.create({
      originalUrl: dto.url,
      shortCode,
      expireAt,
      maxClicks,
      active: true,
      userId: req.user.userId,
    });

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    return {
      originalUrl: newUrl.originalUrl,
      shortUrl: `${baseUrl}/r/${newUrl.shortCode}`,
      maxClicks:
        newUrl.maxClicks === Infinity || newUrl.maxClicks === null
          ? 'Infinity'
          : newUrl.maxClicks,
      expireAt: newUrl.expireAt,
    };
  }

  async getStats(shortCode: string, req: Request & any) {
    const url = await this.urlModel.findOne({ shortCode });

    if (!url) {
      throw new NotFoundException('Short code not found');
    }

    if (url.userId.toString() !== req.user.userId) {
      throw new ForbiddenException('You are not authorized to access this URL');
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    return {
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `${baseUrl}/r/${url.shortCode}`,
      clicks: url.clicks,
      maxClicks:
        url.maxClicks === Infinity || url.maxClicks === null
          ? 'Infinity'
          : url.maxClicks,
      expireAt: url.expireAt,
      active: url.active,
    };
  }
}
