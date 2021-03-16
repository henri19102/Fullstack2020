describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
        name: 'henkka',
        username: 'henuli',
        password: 'secret',
        likes: 3
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("henuli");
      cy.get("#password").type("secret");
      cy.get("#login-button").click();
      cy.contains('henuli logged in')
    });

     it("fails with wrong credentials", function () {
        cy.contains("login").click();
        cy.get("#username").type("hhhhh");
        cy.get("#password").type("sssss");
        cy.get("#login-button").click();
        cy.contains('wrong username or password!')
     });
  });
  describe.only('When logged in', function() {
    beforeEach(function() {
        cy.contains("login").click();
        cy.get("#username").type("henuli");
        cy.get("#password").type("secret");
        cy.get("#login-button").click();
        
    })

    it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('huhhuh')
        cy.get('#url').type('https://www.google.fi/')
        cy.contains('submit').click()
        cy.contains('view').click()
        cy.contains('a blog created by cypress')
        cy.contains('henuli')
        cy.contains('https://www.google.fi/')
    })
    it('a like button can be pressed', function(){
        cy.contains('new blog').click()
        cy.get('#title').type('testing')
        cy.get('#author').type('pekka')
        cy.get('#url').type('https://www.google.fi/')
        cy.contains('submit').click()
        cy.contains('view').click()
        cy.contains('like').click()
    })
    it('a delete button can be pressed', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('testing')
      cy.get('#author').type('pekka')
      cy.get('#url').type('https://www.google.fi/')
      cy.contains('submit').click()
      cy.contains('view').click()
      cy.contains('delete').click()
  })
  })
});
