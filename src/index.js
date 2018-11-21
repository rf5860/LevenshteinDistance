import getEditDistance from './LevenshteinDistance'

const upperTrim = (str: string) => str.trim().toUpperCase()
const uniqueChars = (source: string) => upperTrim(source).split('').filter((v, i, a) => a.indexOf(v) === i)
const isSubset = (as: Object[], bs: Object[]) => as.every(a => bs.includes(a))
const textMatches = (search: string, str: string) => isSubset(uniqueChars(search), uniqueChars(str))
const highlightChars = (chars: string[], str: string) => str.split('').map(c => chars.some(char => c.toUpperCase() == char) ? newSpan(c) : c).join('')
const getTitle = card => card.querySelector('.card-title > span')

function filterCard(filterText: string, card: Object) {
    let cardTitle = getTitle(card)
    if (!filterText) {
        card.style.display = ''
        cardTitle.innerHTML = cardTitle.innerText
    } else if (textMatches(filterText, cardTitle.innerText)) {
        card.style.display = ''
        cardTitle.innerHTML = highlightChars(uniqueChars(filterText), cardTitle.innerText)
    } else {
        card.style.display = 'none'
    } 
}

function newSpan(text: string): HTMLSpanElement {
    let span = document.createElement('span')
    span.style.color = 'red'
    span.style['font-size'] = 'large'
    span.textContent = text

    return span.outerHTML
}

function compareEditDistance(a: Elemenet, b: Element, search: string): number {
    let distanceA = getEditDistance(search, getTitle(a).innerText)
    let distanceB = getEditDistance(search, getTitle(b).innerText)
    return distanceA < distanceB ? -1 : (distanceA == distanceB ? 0 : 1)
} 

function createNewContainer(shortcutCards: NodeListOf<Element>, search: string): HTMLDivElement {
    let div = document.createElement('div')
    div.id = 'container'
    shortcutCards.sort((a, b) => compareEditDistance(a, b, search)).forEach(card => div.appendChild(card))
    
    return div
}

function sortExtenionCards(): void {
    let extensionManagerContainer = document.getElementsByTagName('extensions-manager')[0].shadowRoot
    let shortcutContainerRoot = extensionManagerContainer.querySelector('extensions-keyboard-shortcuts').shadowRoot
    let shortcutContainer = shortcutContainerRoot.querySelector('#container')
    let shortcutCards = [...shortcutContainer.querySelectorAll('.shortcut-card')].map(card => card.cloneNode(true))
    let filterText = shortcutContainerRoot.getElementById('extensionSearch').value
    shortcutCards.forEach(e => filterCard(filterText, e))
    shortcutContainer.replaceWith(createNewContainer(shortcutCards, filterText))
}

function createInput(): HTMLInputElement {
    var input = document.createElement('input')
    input.setAttribute('type', 'search')
    input.type = 'search'
    input.id = 'extensionSearch'
    input.style = 'margin-top: 1em; margin-left: 500px; font-size: 16px'
    input.onkeyup = sortExtenionCards
    return input
}

var extensionsManager = document.getElementsByTagName('extensions-manager')[0].shadowRoot
var extensions = extensionsManager.querySelector('extensions-keyboard-shortcuts').shadowRoot.getElementById('container')
extensions.insertAdjacentElement('beforebegin', createInput())