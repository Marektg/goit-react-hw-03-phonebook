import { nanoid } from "nanoid";
import React from "react";
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';

function getFromLocalStorage(key) {
    try {
        const localData = localStorage.getItem(key);
        let localbazaZadan = JSON.parse(localData);
        return localbazaZadan
    }
    catch (error) {
        console.log(error.name + ": " + error.message);
    }
};
let localContacts = getFromLocalStorage("contacts");
if (localContacts === null) {
    localContacts = [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ] };

class Phonebook extends React.Component {
    state = {
        contacts: localContacts,
        filter: '',
        name: '',
        number: '',
    };
    handleFormSubmit = ev => {
        ev.preventDefault();
        const form = ev.currentTarget;
        const contactName = form.elements.name.value;
        const phoneNumber = form.elements.number.value;
        this.state.contacts.filter((el) => el.name === contactName).length > 0 ? alert(`${contactName} is already in contacts.`) : this.setState({
            ...this.state,
            contacts: [...this.state.contacts, { name: contactName, id: nanoid(), number: phoneNumber }],
            name: "",
        });
        // console.log(this.state.contacts);
        

        let nameField = form.elements.name;
        let numberField = form.elements.number;
        nameField.value = null;
        numberField.value = null;
    };

    filterContacts = event => {
        this.setState({ ...this.state, filter: event.target.value })
    }

    remove = (id) => {
        const newList = this.state.contacts.filter((el) => el.id !== id);
        this.setState({ ...this.state, contacts: newList });
        ;
    }


    renderContact = (filterValue, contactsArray) => {
        if (!filterValue) {
            if (contactsArray === null || contactsArray.length<1) { return <li>You don't have any contacts yet</li> } else
            {return contactsArray.map((contact) => {
                return (
                    <li key={contact.id}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr",
                            columnGap: "20px",
                            alignItems: "center",
                        }
                        }>
                        {contact.name}: {contact.number}
                        <button onClick={() => { this.remove(contact.id) }}
                            style={
                                {
                                    borderRadius: "15px",
                                    letterSpacing: "2px",
                                    backgroundClip: "#f8b4c0",
                                }
                            }>
                            Delete
                        </button></li >)
            });
        }
};
        return (contactsArray.filter((el, id) => el.name.toLowerCase().includes(filterValue.toLowerCase())).map((contact) => {
            return (<li key={contact.id}
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    columnGap: "20px",
                    alignItems: "center",
                }
                }>{contact.name}: {contact.number}
                <button onClick={() => { this.remove(contact.id) }}
                    style={
                        {
                            borderRadius: "15px",
                            letterSpacing: "2px",
                            backgroundClip: "#f8b4c0",
                        }
                    }>Delete</button></li>)
        }));
    };
    saveToLocal = (key, val) => {
        localStorage.setItem(`${key}`, JSON.stringify(val))
    };
    componentDidUpdate() {
        console.log("update");
        this.saveToLocal("contacts", this.state.contacts)
    };

    render() {
        const { filter, contacts } = this.state;
        return (
            <div>
                <h2>Phonebook</h2>
                <div>
                    <ContactForm submitHandler={this.handleFormSubmit} />
                </div>
                <div>
                    <h2>Contacts</h2>
                    <Filter filterHandler={this.filterContacts} />
                    <ContactList renderHandler={this.renderContact(filter, contacts)} />
                </div>
            </div>)
    }
}

export default Phonebook
