import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from 'src/url-shortener/schemas/url.schema';

@Injectable()
export class RedirectService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async resolveShortCode(shortCode: string): Promise<string> {
    const url = await this.urlModel.findOne({ shortCode });

    if (!url || !url.active) {
      throw new NotFoundException('Short URL not found or inactive');
    }

    if (url.expireAt && new Date() > url.expireAt) {
      url.active = false;
      await url.save();
      throw new GoneException('URL has expired');
    }

    if (url.maxClicks !== Infinity && url.clicks >= url.maxClicks) {
      url.active = false;
      await url.save();
      throw new GoneException('Click limit reached');
    }

    url.clicks += 1;
    await url.save();

    return url.originalUrl;
  }
}
