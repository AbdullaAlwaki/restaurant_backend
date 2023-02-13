import  Contact  from "../models/contact.model.js";

export async function contact(req, res) {
  try {
    const { name, email, message } = req.body;
    const contact = await Contact.create({
      name,
      email,
      message,
    });
    if(!contact) return res.status(404).json({ error: "Message not sent!" });
    if(!name || !email || !message) return res.status(404).json({ error: "Please fill all the fields!" });
    if(!name.match(/^[a-zA-Z ]*$/)) return res.status(404).json({ error: "Name should contain only alphabets!" });
    if(!email.includes("@")) return res.status(404).json({ error: "Please enter a valid email!" });
    if(message.length < 10) return res.status(404).json({ error: "Message should be atleast 10 characters long!" });
    if(name.length < 3) return res.status(404).json({ error: "Name should be atleast 3 characters long!" });
    if(name.length > 20) return res.status(404).json({ error: "Name should be less than 20 characters long!" });
    if(message.length > 100) return res.status(404).json({ error: "Message should be less than 100 characters long!" });
    if(email.length > 30) return res.status(404).json({ error: "Email should be less than 30 characters long!" });
    if(email.length < 10) return res.status(404).json({ error: "Email should be atleast 10 characters long!" });

    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function allContact(req, res) {
  try {
    const contact = await Contact.find({});
    if(contact === null) return res.status(404).json({ error: "No messages found!" });
    if(!contact) return res.status(404).json({ error: "No messages found!" });
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
    if(!id) return res.status(404).json({ error: "Please enter a valid id!" });
    return res.status(404).send({ error: "Massage not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateContact(req, res) {
  try {
    const { id } = req.params;
    if(!id) return res.status(404).json({ error: "Please enter a valid id!" });
    const { name, email, message } = req.body;
    if(!name || !email || !message) return res.status(404).json({ error: "Please fill all the fields!" });
    if(!email.includes("@")) return res.status(404).json({ error: "Please enter a valid email!" });
    if(message.length < 10) return res.status(404).json({ error: "Message should be atleast 10 characters long!" });
    if(name.length < 3) return res.status(404).json({ error: "Name should be atleast 3 characters long!" });
    if(name.length > 20) return res.status(404).json({ error: "Name should be less than 20 characters long!" });
    if(message.length > 100) return res.status(404).json({ error: "Message should be less than 100 characters long!" });
    if(email.length > 30) return res.status(404).json({ error: "Email should be less than 30 characters long!" });
    if(email.length < 10) return res.status(404).json({ error: "Email should be atleast 10 characters long!" });
    if(!name.match(/^[a-zA-Z ]*$/)) return res.status(404).json({ error: "Name should contain only alphabets!" });



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
      return res.status(200).send({ message: "Contact updated" , updated});
    }
    return res.status(404).send({ error: "Contact not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getContact(req, res) {
    try {
        const { id } = req.params;
        if(!id) return res.status(404).json({ error: "Please enter a valid id!" });
        const contact = await Contact.findById(id);
        if (contact) {
        return res.status(200).send({ massage : "Contact found", contact });
        }
        return res.status(404).send({ error: "Contact not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }


