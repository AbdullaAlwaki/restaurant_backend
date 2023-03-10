import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: {type : String, required: true},
    email: {type : String, required: true},
    message: {type : String, required: true},
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
