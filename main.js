const UI = {
    validSubmission: [],

    selector() {
        const msgWrapperElm = document.querySelector("#messageWrapper");
        const firstNameElm = document.querySelector("#firstName");
        const firstNameMsgElm = document.querySelector("#firstNameMsg");
        const lastNameElm = document.querySelector("#lastName");
        const lastNameMsgElm = document.querySelector("#lastNameMsg");
        const usernameElm = document.querySelector("#username");
        const usernameMsgElm = document.querySelector("#usernameMsg");
        const emailElm = document.querySelector("#email");
        const emailMsgElm = document.querySelector("#emailMsg");
        const passwordElm = document.querySelector("#password");
        const passwordMsgElm = document.querySelector("#passwordMsg");
        const confirmElm = document.querySelector("#confirm");
        const confirmMsgElm = document.querySelector("#confirmMsg");
        const phoneElm = document.querySelector("#phone");
        const phoneMsgElm = document.querySelector("#phoneMsg");
        const signUpBtnElm = document.querySelector("#signUpBtn");

        return {msgWrapperElm, firstNameElm, firstNameMsgElm, lastNameElm, lastNameMsgElm, usernameElm, usernameMsgElm, emailElm, emailMsgElm, passwordElm, passwordMsgElm, confirmElm, confirmMsgElm, phoneElm, phoneMsgElm, signUpBtnElm};
    },

    hideMessage() {
        setTimeout(() => {
            const msgElm = document.querySelector("#message");
            if(msgElm) {
                msgElm.remove();
            }
        }, 4000);
    },

    showMessage(msg) {
        if(!document.querySelector("#message")) {
            const {msgWrapperElm} = this.selector();
            const msgElm = document.createElement("div");
            msgElm.classList.add("alert", "alert-danger");
            msgElm.id = "message";
            msgElm.textContent = msg;
            msgWrapperElm.insertAdjacentElement("afterbegin", msgElm);

            this.hideMessage();
        }
    },

    successMsg(elm, msg) {
        elm.textContent = msg;
        elm.classList.remove("failure");
        elm.classList.add("success");
        this.validSubmission.push(true);
    },

    failureMsg(elm, msg) {
        elm.textContent = msg;
        elm.classList.remove("success");
        elm.classList.add("failure");
        this.validSubmission.push(false);
    },

    firstNameValidation() {
        const {firstNameElm, firstNameMsgElm} = this.selector();

        if(/^[A-Z][A-z]*-?\.?[A-z]*[\s]*[A-z]*$/.test(firstNameElm.value)) {
            this.successMsg(firstNameMsgElm, "Looks good.");
        } else {
            this.failureMsg(firstNameMsgElm, "First letter should be capital.");
        }
    },

    lastNameValidation() {
        const {lastNameElm, lastNameMsgElm} = this.selector();

        if(/^[A-z]{1,}-?[\s]*[A-z]*$/.test(lastNameElm.value)) {
            this.successMsg(lastNameMsgElm, "Looks good.");
        } else {
            this.failureMsg(lastNameMsgElm, "Cannot be empty.");
        }
    },

    usernameValidation() {
        const {usernameElm, usernameMsgElm} = this.selector();

        if(/^[a-z]{3,}\d*$/.test(usernameElm.value) && usernameElm.value.length <=12) {
            this.successMsg(usernameMsgElm, "Looks good.");
        } else {
            this.failureMsg(usernameMsgElm, "Cannot use any capital letters.");
        }
    },

    emailValidation() {
        const {emailElm, emailMsgElm} = this.selector();

        if(/^[a-z]{1,}\d*\.?[a-z]*\d*\.?[a-z]*\d*[a-z]*@[a-z]{1,}\.?[a-z]*\.[a-z]{1,}$/.test(emailElm.value)) {
            this.successMsg(emailMsgElm, "Looks good.");
        } else {
            this.failureMsg(emailMsgElm, "Invalid email.");
        }
    },

    passwordValidation() {
        const {passwordElm, passwordMsgElm} = this.selector();

        if(/^[A-z]{1,}@?_?\d{1,}$/.test(passwordElm.value)) {
            console.log(passwordElm.value);
            this.successMsg(passwordMsgElm, "Looks good.");
        } else {
            this.failureMsg(passwordMsgElm, "Invalid Password.")
        }
    },

    confirmValidation() {
        const {passwordElm, confirmElm, confirmMsgElm} = this.selector();

        if(passwordElm.value === confirmElm.value) {
            this.successMsg(confirmMsgElm, "Password matched.")
        } else {
            this.failureMsg(confirmMsgElm, "Password doesn't match.")
        }
    },

    phoneValidation() {
        const {phoneElm, phoneMsgElm} = this.selector();

        if(/^(\+88)?(01)\d{9}$/.test(phoneElm.value)) {
            this.successMsg(phoneMsgElm, "Looks good.");
        } else {
            this.failureMsg(phoneMsgElm, "Invalid phone number.")
        }
    },

    init() {
        const {firstNameElm, lastNameElm, usernameElm, emailElm, passwordElm, confirmElm, phoneElm, signUpBtnElm} = this.selector();

        firstNameElm.addEventListener("keyup", () => {
            this.firstNameValidation();
        });

        lastNameElm.addEventListener("keyup", () => {
            this.lastNameValidation();
        });

        usernameElm.addEventListener("keyup", () => {
            this.usernameValidation();
        });

        emailElm.addEventListener("keyup", () => {
            this.emailValidation();
        });

        passwordElm.addEventListener("keyup", () => {
            this.passwordValidation();
        });

        confirmElm.addEventListener("keyup", () => {
            this.confirmValidation();
        });

        phoneElm.addEventListener("keyup", () => {
            this.phoneValidation();
        });

        signUpBtnElm.addEventListener("click", e => {
            if(this.validSubmission.some(i => i === false) || this.validSubmission.length < 7) {
                e.preventDefault();
                this.showMessage("Please fill everything correctly.");
            }
        });
    }
};

UI.init();


