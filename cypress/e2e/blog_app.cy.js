describe("Note app: Log in", function () {
  beforeEach(function () {
    //   Reset all
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Pikachu",
      username: "pikachu",
      password: "password",
    };
    //   Create user
    cy.request("POST", "http://localhost:3001/api/users/", user);

    //   Log in

    cy.login({ username: "pikachu", password: "password" });
  });

  // cy.get(".btn[name='intro log in']").click();
  // cy.get("input[name='Username']").type("pikachu");
  // cy.get("input[name='Password']").type("password");
  // cy.get(".btn[name='Log in']").click();

  it("front page can be opened", function () {
    cy.contains("Blog App");
  });

  it("login form can be opened", function () {
    cy.get(".btn[name='intro log in']").click();
  });

  it("a new blog can be created", function () {
    //   Add post
    cy.contains("Add Blog Post").click();
    cy.get("input[name='Title']").type("Thunder Bolt");
    cy.get("input[name='Author']").type("pikachu");
    cy.get("input[name='Body']").type("Powerful electric blast");
    cy.get("input[name='Likes']").type("546");
    cy.get("#Submit").click();
  });

  it("login fails with wrong password", function () {
    //   Add post
    cy.contains("Add Blog Post").click();
    cy.get("input[name='Title']").type("Thunder Bolt");
    cy.get("input[name='Author']").type("pikachu");
    cy.get("input[name='Body']").type("Powerful electric blast");
    cy.get("input[name='Likes']").type("546");
    cy.get("#Submit").click();
  });

  describe.only("and a blog exists", function () {
    beforeEach(function () {
      cy.createBlog({
        title: "Quick Attack",
        author: "Pikachu",
        url: "abc",
        likes: "34",
      });
    });

    it.skip("has a note", function () {
      cy.contains("Quick Attack");
    });
    it.skip("can delete", function () {
      cy.contains("Delete").click({ force: true });
      cy.contains("Quick Attack").should("not.exist");
    });
  });
});

describe.skip("Note app : Incorrect Log in ", function () {
  beforeEach(function () {
    //   Reset all
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Pikachu",
      username: "pikachu",
      password: "password",
    };
    //   Create user
    cy.request("POST", "http://localhost:3001/api/users/", user);
  });
  it("login fails with wrong password", function () {
    cy.visit("http://localhost:3000/Full-Stack-Open/#/blog");

    //   cy.login({ username: "pikachu", password: "wrong" });

    cy.get(".btn[name='intro log in']").click();
    cy.get("input[name='Username']").type("pikachu");
    cy.get("input[name='Password']").type("wrong");
    cy.get(".btn[name='Log in']").click();

    cy.contains("Incorrect Log in");
  });
});
