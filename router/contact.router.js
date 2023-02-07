import { Router } from "express";
import { allContact, contact, deleteContact, getContact, updateContact } from "../controller/contact.controller.js";

const router = Router();

// Order routes
router.route("/contact").post(contact).get(allContact);
router.route("/contact/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;