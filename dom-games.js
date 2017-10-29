// The event handelers and drawing in the screen
(function () {

    var addButton = document.getElementById("add-button"),
        removeButton = document.getElementById("remove-button"),
        removeButtonClickEventListener,
        nextPageEventListner,
        prevPageEventListner,
        currentPage = 0,
        contactsPerPage = 10,
        prevSelectedContact;


    //First draw
    drawContactsList(contactsPerPage, currentPage);

    //Add new contacts
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
                makeInvisible(contactListContainer);
            }
            //To draw the prev page if the last contact in the page deleted
            else if (page > 0 && !nextClicked) drawContactsList(contactsPerPage, page - 1);
            return;
        }

        makeVisible(contactListContainer);
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

        makeVisible(contactDetailsContainer);
        document.getElementById("name").value = contact.name;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("email").value = contact.email;


        if (removeButtonClickEventListener) removeButton.removeEventListener("click", removeButtonClickEventListener);

        //Remove the selected contact event handler
        removeButtonClickEventListener = function (e) {
            e.preventDefault();
            PhoneBook.remove(contact.id);
            makeInvisible(contactDetailsContainer);
            drawContactsList(contactsPerPage, currentPage);
        }

        removeButton.addEventListener("click", removeButtonClickEventListener);
    }

    function makeVisible(elem) {
        elem.classList.remove("invisible");
        elem.classList.add("visible");
    }

    function makeInvisible(elem) {
        elem.classList.remove("visible");
        elem.classList.add("invisible");
    }

})();