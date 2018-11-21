const substitutionCost = (m, i, j) => m[j - 1][i - 1] + 1
const insertionCost = (m, i, j) => m[j][i - 1] + 1
const deletionCost = (m, i, j) => m[j - 1][i] + 1
const editCost = (m, i, j) => Math.min(substitutionCost(m, i, j), Math.min(insertionCost(m, i, j), deletionCost(m, i, j)))

export default function getEditDistance(source, target) {
    if (source.length === 0) return target.length;
    if (target.length === 0) return source.length;
    
    let m = [];
    for (let j = 0; j <= target.length; j++) m[j] = [j];
    for (let i = 0; i <= source.length; i++) m[0][i] = i;

    for (let j = 1; j <= target.length; j++) {
        for (let i = 1; i <= source.length; i++) {
            m[j][i] = target.charAt(j - 1) == source.charAt(i - 1) ? m[j - 1][i - 1] : editCost(m, i, j)
        }
    }

    return m[target.length][source.length];
}