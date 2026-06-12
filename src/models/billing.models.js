import mongoose, { Schema } from "mongoose";

const billingsSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },

    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
    amount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Billing = mongoose.model("Billing", billingsSchema);
