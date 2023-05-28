const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (e) {
    console.warn(e.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.filter(({ id }) => id === contactId);
  } catch (e) {
    console.warn(e.message);
  }
}
async function updateDataFile(instance) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
  } catch (e) {
    console.warn(e.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedList = contacts.filter(({ id }) => id !== contactId);
    updateDataFile(updatedList);
    return updatedList;
  } catch (e) {
    console.warn(e.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: v4(), name, email, phone };
    const allContacts = await listContacts();
    const changedCollection = [...allContacts, newContact];
    updateDataFile(changedCollection);
    return newContact;
  } catch (e) {
    console.warn(e.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
