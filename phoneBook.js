// PhoneBook by Reveal Module design pattern
var PhoneBook = (function () {
    var contactsList = [],
        maxConatctsCount = 10000,

        addContact = function (newContactInfo) {
            if (contactsList.length >= maxConatctsCount) throw new Error("The phone book can hold just up to " + maxConatctsCount + " contacts.")

            // Insert the new contact in the right place (sorted by name)
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

        // Didn't implemented in the UI
        search = function (query) {
            return contactsList.filter(function (contact) {
                return contact.name.indexOf(query) > -1 || contact.phone.indexOf(query) > -1;
            })
        },

        // Pagination list
        list = function (contactsPerPage, page) {
            var start = contactsPerPage * page,
                end = start + contactsPerPage,
                list = contactsList.slice(start, end);

            list.forEach(function (contact, index) {
                contact.id = start + index;
            })

            return list;
        },

        // TO BE ABLE TO LOG THE CONTACTS LIST FROM THE BROWSER CONSOLE BY PhoneBook.log()
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
