export const stringRequired = {
  type: String,
  required: true,
};

export const numberRequired = {
  type: Number,
  default: 0,
  required: true,
};

export const stringArray = {
  type: [{ uid: { type: String }, timestamp: { type: Number } }],
  default: [],
};
