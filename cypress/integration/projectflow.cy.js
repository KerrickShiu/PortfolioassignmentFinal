describe("ProjectFlow", () => {
  it("tests ProjectFlow", () => {
    cy.viewport(737, 680);
    cy.visit("http://localhost:5173/");
    cy.get("#root > div").click();
    cy.get("a:nth-of-type(8)").click();
    cy.get("#_r_0_").click();
    cy.get("#_r_0_").type("F");
    cy.get("#_r_0_").type("Fake Man");
    cy.get("#_r_1_").click();
    cy.get("#_r_1_").type("fakeman@");
    cy.get("#_r_1_").type("fakeman@email.com");
    cy.get("#_r_2_").click();
    cy.get("#_r_2_").type("123123123");
    cy.get("button").click();
  });
});
//# recorderSourceMap=BCBDBEBFBGBHBIAIBJBKBLALBMBNBOB
