(function () {

    drawContactsList(10, 0);

    var addButton = document.getElementById("add-button"),
        removeButton = document.getElementById("remove-button"),
        removeButtonClickEventListener,
        nextPageEventListner,
        prevPageEventListner,
        currentPage = 0,
        contactsPerPage = 10,
        prevSelectedContact;

    addButton.addEventListener("click", function (e) {

        e.preventDefault();

        var nameNode = document.getElementById("new-contact-name"),
            phoneNode = document.getElementById("new-contact-phone"),
            emailNode = document.getElementById("new-contact-email");

        try {
            var newContact = new ContactInfo(
                nameNode.value,
                phoneNode.value,
                emailNode.value
            )
            PhoneBook.add(newContact);
            drawContactsList(contactsPerPage, 0);
            nameNode.value = phoneNode.value = emailNode.value = "";
        }
        catch (e) {
            alert(e);
        }
    });

    removeButton.addEventListener("click", function (e) {
        e.preventDefault();
    });


    function drawContactsList(contactsPerPage, page, nextClicked) {
        var oldContatcsList = document.getElementById("contacts-list"),
            contactListContainer = document.getElementById("contacts-list-container"),
            nextPageButton = document.getElementById("next-page"),
            prevPageButton = document.getElementById("prev-page");

        contacts = PhoneBook.list(contactsPerPage, page),
            newContatcsList = document.createElement("ul");
        newContatcsList.setAttribute("id", "contacts-list");


        if (contacts.length === 0) {
            if (page === 0) {
                contactListContainer.style.visibility = "hidden";
                contactListContainer.style.opacity = "0";
            }
            else if (page > 0 && !nextClicked) drawContactsList(contactsPerPage, page - 1);
            return;
        }

        contactListContainer.style.visibility = "visible";
        contactListContainer.style.opacity = "1";
        contacts.forEach(function (contact, index) {
            var newContactLI = document.createElement("li");
            newContactLI.innerText = contact.name;
            newContatcsList.appendChild(newContactLI);
            newContactLI.addEventListener('click', function (e) {
                selectContact(e, contact);
                if (prevSelectedContact) {
                    prevSelectedContact.style.backgroundColor = "white";
                    prevSelectedContact.style.color = "black";
                }
                newContactLI.style.backgroundColor = "#27496d";
                newContactLI.style.color = "white";
                prevSelectedContact = newContactLI;
            });
        })

        contactListContainer.removeChild(oldContatcsList);
        contactListContainer.appendChild(newContatcsList);

        currentPage = page;
        document.getElementById("current-page").innerText = currentPage + 1;


        nextPageButton.removeEventListener("click", nextPageClicked);

        nextPageButton.addEventListener("click", nextPageClicked)

        prevPageButton.removeEventListener("click", prevPageClicked);

        prevPageButton.addEventListener("click", prevPageClicked)
    }

    function nextPageClicked(e) {
            drawContactsList(contactsPerPage, currentPage + 1, true);
    }

    function prevPageClicked(e) {
            drawContactsList(contactsPerPage, currentPage - 1);
    }

    function selectContact(e, contact) {

        var removeButton = document.getElementById("remove-button"),
            contactDetailsContainer = document.getElementById("contact-details-container");

        contactDetailsContainer.style.visibility = "visible";
        contactDetailsContainer.style.opacity = "1"
        document.getElementById("name").value = contact.name;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("email").value = contact.email;


        if (removeButtonClickEventListener) removeButton.removeEventListener("click", removeButtonClickEventListener);

        removeButtonClickEventListener = function (e) {
            PhoneBook.remove(contact.id);
            contactDetailsContainer.style.visibility = "hidden";
            contactDetailsContainer.style.opacity = "0"
            drawContactsList(contactsPerPage, currentPage);
            alert("Contact removed");
        }

        removeButton.addEventListener("click", removeButtonClickEventListener);
    }

})();