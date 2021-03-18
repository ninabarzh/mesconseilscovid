import Profil from '../profil'
import { createElementFromHTML, hideElement, showElement } from '../affichage'

export default function introduction(element, app) {
    const header = document.querySelector('header section')
    showElement(header.querySelector('#js-profil-empty-header'))
    hideElement(header.querySelector('#js-profil-full-header'))

    const container = element.querySelector('#profils-cards')
    app.stockage.getProfils().then((noms) => {
        if (noms.length) {
            hideElement(element.querySelector('.js-intro'))
        }
        if (noms.indexOf('mes_infos') === -1) {
            const cardClassique = container.appendChild(
                createElementFromHTML(`
                    <li class="profil-empty">
                        <a class="button button-full-width"
                            data-set-profil="mes_infos"
                            data-intention="moi"
                            href="#${app.questionnaire.firstPage}"
                            >Faire pour moi</a>
                    </li>
                `)
            )
            bindCreateProfil(cardClassique.querySelector('[data-set-profil]'), app)
        }
        const cardNewProche = container.appendChild(
            createElementFromHTML(`
                <li class="profil-empty">
                    <a class="button button-full-width button-outline js-profil-new"
                        data-intention="proche"
                        href="#nom"
                        >Faire pour un·e proche</a>
                </li>
            `)
        )
        bindNewProfil(cardNewProche.querySelector('.js-profil-new'))
        renderProfilCards(container, noms, app)
    })
}

function renderProfilCards(container, noms, app) {
    const lastCard = container.firstChild
    noms.forEach((nom) => {
        const profil = new Profil(nom)
        app.stockage.charger(profil).then((profil) => {
            const card = container.insertBefore(
                profil.renderCard(app.questionnaire),
                lastCard
            )

            const conseilsLink = card.querySelector('.conseils-link')
            if (conseilsLink) {
                conseilsLink.setAttribute('href', '#conseils')
            }

            Array.from(card.querySelectorAll('[data-set-profil]')).forEach(
                (profilLink) => {
                    bindChangeProfil(profilLink, app)
                }
            )

            bindSuppression(card.querySelector('[data-delete-profil]'), app)
        })
    })
}

function bindCreateProfil(element, app) {
    return _bindFunc(element, app, app.creerProfil.bind(app))
}

function bindChangeProfil(element, app) {
    return _bindFunc(element, app, app.basculerVersProfil.bind(app))
}

function _bindFunc(element, app, func) {
    element.addEventListener('click', function (event) {
        event.preventDefault()
        addIntentSearchParam(element)
        func(element.dataset.setProfil).then(() => {
            app.router.navigate(event.target.getAttribute('href'))
        })
    })
}

function bindNewProfil(element) {
    element.addEventListener('click', () => {
        addIntentSearchParam(element)
    })
}

function addIntentSearchParam(element) {
    const url = new URL(window.location)
    if (element.dataset.intention) {
        url.searchParams.set('intention', element.dataset.intention)
    }
    window.history.pushState('', '', url.href)
}

function bindSuppression(element, app) {
    element.addEventListener('click', function (event) {
        event.preventDefault()
        app.plausible('Suppression')
        const nom = element.dataset.deleteProfil
        const description = nom === 'mes_infos' ? 'votre profil' : `le profil de ${nom}`
        if (confirm(`Êtes-vous sûr·e de vouloir supprimer ${description} ?`)) {
            app.supprimerProfil(nom).then(() => {
                app.chargerProfilActuel().then(() => {
                    // TODO: find a clever way to re-render the current page.
                    window.location.reload(true)
                })
            })
        }
    })
}
