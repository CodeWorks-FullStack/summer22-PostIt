import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const PictureSchema = new Schema({
  imgUrl: {type: String, required: true, maxlength: 250},
  albumId: {type: ObjectId, required: true},
  creatorId: {type: ObjectId, required: true}
},{
  timestamps: true, toJSON: {virtuals: true}
})

PictureSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

PictureSchema.virtual('Album', {
  localField: 'albumId',
  foreignField: '_id',
  ref: 'Album',
  justOne: true
})
