import { Schema } from "mongoose"
const ObjectId = Schema.Types.ObjectId


export const AlbumSchema = new Schema({
  title: {type: String, required: true, minlength: 1, maxlength: 20 },
  coverImg: {type: String, required: true, maxlength: 250},
  creatorId: {type: ObjectId, required: true, ref: 'Account'},
  archived: {type: Boolean, required: true, default: false},
  category: {type: String, enum: ['animals', 'food', 'games', 'nature', 'misc'], required: true,  default: 'misc', lowercase: true}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AlbumSchema.virtual('creator',{
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
