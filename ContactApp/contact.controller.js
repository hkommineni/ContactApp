(function() {
        var app = angular.module("ContactApp");
        app.controller("ContactCtrl", ContactCtrl);


        function ContactCtrl(ContactDataSvc) {
            var self = this;
            self.editMode = false;
            self.addMode = false;
            ContactDataSvc.getContacts()
                .then(function(data) {
                    self.contacts = data;
                })


            this.selectContact = function(index) {
                this.selectedContact = this.contacts[index];
                self.successMessage = undefined;
                self.errorMessage = undefined;
            }

            this.toggleEditMode = function() {
                this.editMode = !this.editMode;
            }

            this.saveUser = function() {
                this.toggleEditMode();
                var userData = this.selectedContact;

                if (self.addMode) {
                    ContactDataSvc.createUser(userData)
                        .then(function() {
                                self.successMessage = "User Details saved succefffully";
                            },
                            function() {
                                self.errorMessage = "There was an error";
                            }

                        );
                    self.addMode = false;
                } else {
                    ContactDataSvc.saveUser(userData)
                        .then(function() {
                                self.successMessage = "User Details saved succefffully";
                            },
                            function() {
                                self.errorMessage = "There was an error";
                            }
                        );
                }
            }


        this.addContact = function() {
            self.addMode = true;
            this.selectedContact = {

                "id": new Date().toTimeString()
            };
            this.editMode = true;
        }
    }
})();
