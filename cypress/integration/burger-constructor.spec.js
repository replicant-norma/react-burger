describe('app works correctly burgerConstructor', function () {
    before(function () {
        cy.visit('http://localhost:3000');
    })
    it('should open product details', function () {
        cy.get('[class^=product_product_]').each(($el) => {
            cy.wrap($el).click();
            cy.contains('Детали ингредиента');
            cy.get('[class^=modal_close_]').click();
        })
    })

    it('drag-n-drop buns', function () {
        cy.get('[class^=product_product_]').contains('Краторная булка').trigger('dragstart');
        cy.get('[class^=ingredient-list_dnd_]').trigger('drop');
        cy.get('.constructor-element').should('have.length', 2);
    })

    it('drag-n-drop product', function () {
        cy.get('[class^=product_product_]').each(($el) => {
            cy.wrap($el).trigger('dragstart');
            cy.get('[class^=ingredient-list_dnd_]').trigger('drop');
        })
        cy.get('[class^=wrapper-constructor-element]').should('have.length', 13);

    })

    it('delete from constructor', function () {
        cy.get('[class^=wrapper-constructor-element_]').find('[class^=constructor-element__action]').first().click();
        cy.get('[class^=wrapper-constructor-element]').should('have.length', 12);

    })

})