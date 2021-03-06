import playwright from 'playwright'

let browser
let context

before(async function () {
    // Lance un navigateur « headless » (définir la variable
    // d’environnement PWDEBUG=1 pour afficher le navigateur)
    browser = await playwright[process.env.BROWSER].launch()
})

after(async function () {
    await browser.close()
})

beforeEach(async function () {
    // Chaque test tourne dans un nouvel onglet.
    context = await browser.newContext({
        locale: 'fr-FR',
        timezoneId: 'Europe/Paris',
    })
    this.currentTest.page = await context.newPage()
})

afterEach(async function () {
    await context.close()
})
