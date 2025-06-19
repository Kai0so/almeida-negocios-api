import mongoose from 'mongoose';

const ImovelSchema = new mongoose.Schema({
  id: String,
  banner: String,
  rentPrice: Number,
  area: Number,
  bedrooms: Number,
  totalCost: Number,
  forSale: Boolean,
  forRent: Boolean,
  isPrimaryMarket: Boolean,
  salePrice: Number,
  parkingSpots: Number,
  condoIptu: Number,
  address: {
    address: String,
    city: String
  },
  regionName: String,
  neighbourhood: String,
  type: String,
  photos: [
    {
      url: String,
      subtitle: String
    }
  ],
  visitsUnavailable: Boolean,
  listingTags: [String],
  yield: Number,
  yieldStrategy: String,
  categories: [String],
  bathrooms: Number,
  isFurnished: Boolean,
  installations: [String],
  amenities: [String],
  shortRentDescription: String,
  shortSaleDescription: String
});

export default mongoose.model('imoveis', ImovelSchema);
