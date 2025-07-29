import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Url extends Document {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ default: 0 })
  clicks: number;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: Infinity })
  maxClicks: number;

  @Prop({ default: null })
  expireAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export type UrlDocument = Url & Document;

export const UrlSchema = SchemaFactory.createForClass(Url);
