var ContactInfo = function (name, phone, email) {

    var nameMinLength = 0,
        nameMaxLength = 100,
        phoneNumberRegex = /^\d{2}-\d{3}-\d{4}$/g,
        emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (name.length <= nameMinLength || name.length >= nameMaxLength) {
        throw new Error("contact name length must be greater than 0 and less than 100 characters");
    }

    if (!phoneNumberRegex.test(phone)) {
        throw new Error("the phone number should be in this phormat (xx-xxx-xxxx) where x is a number.");
    }

    if (!emailRegex.test(email)) {
        throw new Error("you should enter a valid email address");
    }

    this.name = name;
    this.phone = phone;
    this.email = email;

}

// PhoneBook by Reveal Module design pattern
var PhoneBook = (function () {
    var contactsList = [],
        maxConatctsCount = 10000,

        addContact = function (newContactInfo) {
            if (contactsList.length >= maxConatctsCount) throw new Error("The phone book can hold just up to " + maxConatctsCount + " contacts.")

            if (!contactsList.length) contactsList.push(newContactInfo);
            else {
                var pushed = false;
                contactsList.some(function (contact, index) {
                    if (newContactInfo.name.toLowerCase() < contact.name.toLowerCase()) {
                        contactsList.splice(index, 0, newContactInfo);
                        return pushed = true;
                    }
                });

                if (!pushed) contactsList.push(newContactInfo);
            }

        },

        removeContact = function (index) {
            contactsList.splice(index, 1);
        },

        search = function (query) {
            return contactsList.filter(function (contact) {
                return contact.name.indexOf(query) > -1 || contact.phone.indexOf(query) > -1;
            })
        },

        list = function (contactsPerPage, page) {
            var start = contactsPerPage * page,
                end = start + contactsPerPage,
                list = contactsList.slice(start, end);

            list.forEach(function (contact, index) {
                contact.id = start + index;
            })

            return list;
        },

        log = function () {
            console.log(contactsList);
        }

    return {
        add: addContact,
        remove: removeContact,
        search: search,
        list: list,
        log: log
    }

})();

var contact1 = new ContactInfo("MIM1", "01-109-2111", "mib1.kamel@gmail.com");
var contact2 = new ContactInfo("MIM2", "01-109-2112", "mib2.kamel@gmail.com");
var contact3 = new ContactInfo("MIM3", "01-109-2113", "mib3.kamel@gmail.com");
var contact4 = new ContactInfo("MIM4", "01-109-2114", "mib4.kamel@gmail.com");
var contact5 = new ContactInfo("MIM5", "01-109-2115", "mib5.kamel@gmail.com");
var contact6 = new ContactInfo("MIM6", "01-109-2116", "mib6.kamel@gmail.com");
var contact7 = new ContactInfo("MIM7", "01-109-2111", "mib1.kamel@gmail.com");
var contact8 = new ContactInfo("MIM8", "01-109-2111", "mib1.kamel@gmail.com");
var contact9 = new ContactInfo("MIM9", "01-109-2111", "mib1.kamel@gmail.com");
var contact10 = new ContactInfo("MIM10", "01-109-2111", "mib1.kamel@gmail.com");
var contact11 = new ContactInfo("MIM11", "01-109-2111", "mib1.kamel@gmail.com");
var contact12 = new ContactInfo("MIM12", "01-109-2111", "mib1.kamel@gmail.com");
var contact13 = new ContactInfo("MIM13", "01-109-2111", "mib1.kamel@gmail.com");
var contact14 = new ContactInfo("MIM14", "01-109-2111", "mib1.kamel@gmail.com");
var contact15 = new ContactInfo("MIM15", "01-109-2111", "mib1.kamel@gmail.com");
var contact16 = new ContactInfo("MIM16", "01-109-2111", "mib1.kamel@gmail.com");
var contact17 = new ContactInfo("MIM17", "01-109-2111", "mib1.kamel@gmail.com");
var contact18 = new ContactInfo("MIM18", "01-109-2111", "mib1.kamel@gmail.com");
var contact19 = new ContactInfo("MIM19", "01-109-2111", "mib1.kamel@gmail.com");
var contact20 = new ContactInfo("MIM20", "01-109-2111", "mib1.kamel@gmail.com");
var contact21 = new ContactInfo("MIM21", "01-109-2111", "mib1.kamel@gmail.com");

PhoneBook.add(contact1);
PhoneBook.add(contact2);
PhoneBook.add(contact3);
PhoneBook.add(contact4);
PhoneBook.add(contact5);
PhoneBook.add(contact6);
PhoneBook.add(contact7);
PhoneBook.add(contact8);
PhoneBook.add(contact9);
PhoneBook.add(contact10);
PhoneBook.add(contact11);
PhoneBook.add(contact12);
PhoneBook.add(contact13);
PhoneBook.add(contact14);
PhoneBook.add(contact15);
PhoneBook.add(contact16);
PhoneBook.add(contact17);
PhoneBook.add(contact18);
PhoneBook.add(contact19);
PhoneBook.add(contact20);
PhoneBook.add(contact21);

// PhoneBook.log();

// PhoneBook.remove(2);

// PhoneBook.log();

// console.log(PhoneBook.list(10, 0));
