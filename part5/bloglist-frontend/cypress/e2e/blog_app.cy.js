describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ name: 'david pelo', username: 'david', password: 'pelo' })
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('Login form is shown', function () {
    cy.get('#login-form')
      .should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('david')
      cy.get('#password').type('pelo')
      cy.get('#login-button').click()

      cy.get('.success')
        .should('contain', 'Log in successful')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('logged-in as david pelo')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('david')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'logged-in as david pelo')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'david', password: 'pelo' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.contains('save').click()

      cy.contains('test title')
      cy.contains('test author')
    })

    describe('Displaying blogs', function () {
      it('blogs are ordered by number of likes', function () {
        const blogs = [1, 2, 3]

        blogs.forEach(function (num) {
          cy.createBlog({
            title: `blog ${num}`,
            author: 'test author',
            url: 'test url',
          })
        })

        cy.get('#blog-list>#blog').eq(0).as('blog1')
        cy.get('#blog-list>#blog').eq(1).as('blog2')
        cy.get('#blog-list>#blog').eq(2).as('blog3')

        cy.get('@blog1').contains('view').click()
        cy.get('@blog2').contains('view').click()
        cy.get('@blog3').contains('view').click()

        cy.get('@blog1').find('#like-button').click()
        cy.get('@blog2').find('#like-button').click().click().click()
        cy.get('@blog3').find('#like-button').click().click().click()

        cy.get('@blog1').should('contain', 'likes 3')
        cy.get('@blog2').should('contain', 'likes 2')
        cy.get('@blog3').should('contain', 'likes 1')
      })
    })

    describe('Interacting with a blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test title',
          author: 'test author',
          url: 'test url',
        })

        cy.contains('view').click()
      })

      it('A blog can be liked', function () {
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be deleted by the user who created it', function () {
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'test title test author')
      })

      it('A blog cannot be deleted by a user who did not created it', function () {
        cy.logout()

        const newUser = {
          name: 'hannah nippe',
          username: 'hannah',
          password: 'nippe',
        }

        cy.createUser(newUser)

        cy.login({ username: newUser.username, password: newUser.password })
        cy.contains('view').click()

        cy.get('#blog').should('not.contain', 'remove')
      })
    })
  })
})
