import { clientLogins } from '../../../fixtures/001-login'
import { baseUrl } from '../../../fixtures/environment'
import { defaultDevices } from '../../_helpers/default-devices'
import {clientOrderDetails} from '../../../fixtures/client-order-details'

defaultDevices.forEach((device) => {
  const [w, h] = device.viewport
  describe(` Client order - ${device.name}`, () => {
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
      cy.get('.text-center.mt-3 > .MuiButtonBase-root').click()
    })

    it(' Add team members and place order', () => {
      cy.get('.MuiTabs-flexContainer > :nth-child(1)').click({ force: true })

      cy.addTeamMember(':nth-child(11) > .col-md-3 > .MuiButtonBase-root')
      cy.addTeamMember(':nth-child(7) > .col-md-3 > .MuiButtonBase-root')
      cy.addTeamMember(':nth-child(19) > .col-md-3 > .MuiButtonBase-root')
      cy.get('.navBarBtn > :nth-child(3)').click({ force: true }).wait(2000)
      cy.get('#search')
        .click({ force: true })
        .type(clientOrderDetails.teamName)
        .get('.col-md-2 > .MuiButtonBase-root')
        .click({ force: true })
      cy.window()
        .scrollTo('bottom')
        .get('.MuiDialogContent-root > :nth-child(1) > .mb-5 > .MuiButtonBase-root')
        .click({ force: true })
    })
  })
})
