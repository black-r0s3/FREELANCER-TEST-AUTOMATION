import { recruiterLogins } from '../../../fixtures/001-login'
import { baseUrl } from '../../../fixtures/environment'
import { defaultDevices } from '../../_helpers/default-devices'

defaultDevices.forEach((device) => {
  const [w, h] = device.viewport
  describe(` Recruiter login - ${device.name}`, () => {
    before(() => {
      cy.visitWithDevice(baseUrl, device)
    })

    beforeEach(() => {
      cy.viewport(w, h)
    })

    it('visit page', () => {
      if (device.isMobile) {
        cy.get('.menuButton').click()
      }
      cy.contains('Login').first().click({ force: true })
      cy.get('#email')
        .click()
        .type(recruiterLogins.email)
        .get('#password')
        .type(recruiterLogins.password)
      cy.get('.text-center.mt-3').click()
    })
    it('should check whether the user has logged in successfully', () => {
      cy.wait(500)
      cy.url().should('include', '/recruiter')
    })
  })
})
