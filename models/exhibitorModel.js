const mongoose = require("mongoose");
const validator = require("validator");

const exhibitorSchema = new mongoose.Schema({
  exhibitorId: { type: String, required: true },
  isActive: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: [true, "Organisation Name is required"],
  },
  slug: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: [true, "Org Address is required"],
  },
  city: {
    type: String,
    // required: [true, "City is required"],
  },
  country: {
    type: String,
    required: [true, "Country is needed"],
  },
  latitude: String,
  longitude: String,
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  website: String,
  logo: {
    type: String,
    default: "logo.jpg",
  },
  logoUrl: {
    type: String,
    // default: function() {
    //   return `/images/organisations/${this.slug}/logo.jpg`;
    // },
  },
  brands: {
    type: Array,
  },
  profile: {
    type: String,
    default: function() {
      return `We are ${this.name} from ${this.country} and we specialise in${this.category}. We are located at ${this.booth}.`;
    },
  },
  category: Array,
  booth: {
    type: String,
    required: true,
  },
  potential: Array,
  orgEmployee: Array,
});

// exhibitorSchema.index({ category: 1 });
// exhibitorSchema.index({ name: 1 });
// exhibitorSchema.index({ slug: 1 });
// exhibitorSchema.index({ visitorId: 1 });
// exhibitorSchema.index({ potential: 1 });

const Exhibitor = mongoose.model("Exhibitor", exhibitorSchema);

module.exports = Exhibitor;
