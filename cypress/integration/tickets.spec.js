describe("Tickets", () => {
    beforeEach(() => cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html'));

    it("Preenchendo campos digitáveis", () => {
        const firstName = 'Rafael'
        const lastName = 'Coelho'
        const email = 'teste@teste.com'

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type(email);
        cy.get("#requests").type('Teste');
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    it("Selecionando uma opção de Quantidade", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("Interagindo com Radio Buttons", () => {
        cy.get("#vip").check();
    });

    it("Interagindo com Checkboxes", () => {
        cy.get("#social-media").check();
    });

    it("Selects 'friend' and 'publication', then uncheck 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
        
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("Alerts on invalid email", () => {
        cy.get("#email")
        .as("email")
        .type("Teste-teste.com");
        
        cy.get("#email.invalid").should("exist");

        cy.get("@email")
          .clear()
          .type("teste@teste.com");
    
        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset form", () => {
        const firstName = 'Rafael'
        const lastName = 'Coelho'
        const fullName = `${firstName} ${lastName}`
        const email = 'teste@teste.com'

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type(email);
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#social-media").check();
        cy.get("#requests").type('Teste');
        
        cy.get(".agreement p").should(
            "contain", `I, ${fullName}, wish to buy 2 VIP tickets. `
        );

        cy.get("#agree").click();
        cy.get("#signature").type(`${fullName}`);

        cy.get("button[type='submit']")
          .as("submitButton")
          .should("not.be.disabled");
        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });

    it("fills mandatory fields using support command", () => {
        const customer = {
            firstName: "Rafael",
            lastName: "Coelho",
            email: "teste@teste.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
          .as("submitButton")
          .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled")
    })
})