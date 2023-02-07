import  Contact  from "../models/contact.model.js";

export async function contact(req, res) {
  try {
    const { name, email, message } = req.body;
    const contact = await Contact.create({
      name,
      email,
      message,
    });
    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function allContact(req, res) {
  try {
    const contact = await Contact.find({});
    res.status(200).json({ contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteContact(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send({ message: "Contact deleted" });
    }
    return res.status(404).send({ error: "Contact not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateContact(req, res) {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;
    const updated = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        email,
        message,
        changAt: new Date(),
      },
      { new: true }
    );
    if (updated) {
      return res.status(200).send({ message: "Contact updated" });
    }
    return res.status(404).send({ error: "Contact not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getContact(req, res) {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (contact) {
        return res.status(200).send({ contact });
        }
        return res.status(404).send({ error: "Contact not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }


