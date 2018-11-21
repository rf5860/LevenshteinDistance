function getEditDistance(source, target) {
    if (source.length === 0) return target.length;
    if (target.length === 0) return source.length;
    
    let m = [];
    for (let j = 0; j <= target.length; j++) m[j] = [j];
    for (let i = 0; i <= source.length; i++) m[0][i] = i;

    for (let j = 1; j <= target.length; j++) {
        for (let i = 1; i <= source.length; i++) {
            if (target.charAt(j - 1) == source.charAt(i - 1)) {
                m[j][i] = m[j - 1][i - 1];
            } else {
                let substitutionCost = m[j - 1][i - 1] + 1;
                let insertionCost    = m[j][i - 1]     + 1;
                let deletionCost     = m[j - 1][i]     + 1;
                m[j][i] = Math.min(substitutionCost, Math.min(insertionCost, deletionCost));
            }
        }
    }

    return m[target.length][source.length];
}


var input = document.createElement('input');
input.setAttribute('type', 'search');
input.type = 'search';
input.id = 'extensionSearch';
input.style = 'margin-bottom: 0.8em; margin-left: 500px; font-size: 16px;';
input.onkeyup = function(event) {
    let extensionManagerContainer = document.getElementsByTagName('extensions-manager')[0].shadowRoot;
    let shortcutContainer = extensionManagerContainer.querySelectorAll('extensions-keyboard-shortcuts')[0].shadowRoot;
    let shortcutCards = shortcutContainer.querySelectorAll('.shortcut-card');
    let filterText = shortcutContainer.getElementById('extensionSearch').value.toUpperCase();
    shortcutCards.forEach(e => e.style.display = e.querySelector('.card-title').textContent.trim().toUpperCase().includes(filterText) ? "" : "none")
};
var extensionManager = document.getElementsByTagName('extensions-manager')[0].shadowRoot;
var extensions = extensionManager.querySelectorAll('extensions-keyboard-shortcuts')[0].shadowRoot.getElementById('container');
extensions.insertBefore(input, extensions.firstChild);