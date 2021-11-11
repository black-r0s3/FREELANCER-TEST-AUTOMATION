import { jobDetails } from '../../../fixtures/post-job-details'
import { clientLogins } from '../../../fixtures/001-login'
import { baseUrl } from '../../../fixtures/environment'
import { defaultDevices } from '../../_helpers/default-devices'

defaultDevices.forEach((device) => {
  const [w, h] = device.viewport
  describe(` Client post job - ${device.name}`, () => {
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
        .type(clientLogins.email)
        .get('#password')
        .type(clientLogins.password)
      cy.get('.text-center.mt-3').click()
    })

    it('should post job', () => {
      cy.get('.navBarBtn > .MuiButton-root > .MuiButton-label').click({ force: true })
      cy.get(':nth-child(4) > .MuiPaper-root')
        .click({ force: true })
        .get('#jobTitle')
        .click({ force: true })
        .type(jobDetails.title)
        .get('#description')
        .click({ force: true })
        .type(jobDetails.description)
        .get('#type')
        .click()
      cy.window().contains(jobDetails.category).click()
      cy.get('#startDate')
        .click()
        .type(jobDetails.date)
        .get('.MuiDialogActions-root > .MuiButton-contained')
        .click()
    })
  })
})
