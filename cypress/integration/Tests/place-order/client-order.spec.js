import { clientLogins } from '../../../fixtures/001-login'
import { baseUrl } from '../../../fixtures/environment'
import { defaultDevices } from '../../_helpers/default-devices'

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
      cy.get('.text-center.mt-3').click()
    })

    it('should go to candidate pool and add team members', () => {
      cy.get('.MuiTabs-flexContainer > :nth-child(1)').click({ force: true })

      cy.addTeamMember(
        ':nth-child(2) > .MuiPaper-root > .justify-content-between > .col-md-4 > .cPoolATTbtn',
      )
      cy.addTeamMember(
        ':nth-child(4) > .MuiPaper-root > .justify-content-between > .col-md-4 > .cPoolATTbtn',
      )
      cy.addTeamMember(
        ':nth-child(3) > .MuiPaper-root > .justify-content-between > .col-md-4 > .cPoolATTbtn',
      )
    })

//     it('should go to team and place an order', () => {
//       cy.get('.navBarBtn').children().eq(2).click({ force: true })
//       cy.wait(15000)
//       // cy.get("#search").click({force : true})
//     })
   })
 })
