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