const inputs = Deno.readTextFileSync('./passphrase.txt')
    .trim()
    .split('\n')

const skip = '"'
const separator = ' '
const punctuations = Deno.readTextFileSync('./punctuations.txt')
    .trim()
    .split('')

const capitalize = (string) => string
    .split('')
    .map((letter, index) => index === 0
        ? letter.toUpperCase()
        : letter)
    .join('')
    
const punctuate = (segment, punctuation) => `${segment}${punctuation}`

const getVariants = (segment) => {
    const mutations = [
        segment,
        capitalize(segment),
        segment.toUpperCase(),
        segment.toLowerCase()
    ]
    
    const punctuated = []
    for (let p of punctuations) {
        punctuated.push(mutations.map(m => punctuate(m, p)))
    }
    
    return [...mutations, ...punctuated.flat()]
}

const getSegments = (stems) => stems
    .split(separator) // break out segments
    .map(segment => segment === skip
        ? ''
        : getVariants(segment))
    
const segments = inputs
    .map(stems => getSegments(stems))
    .reduce((a, b) => {
        const output = []
        
        for (let i = 0; i < a.length; i++) {
            output.push([...a[i], ...b[i]])
        }
        
        return output   
    })
    .map(stems => [...new Set(stems)]
        .filter(stem => stem !== '')
    )

const generateCombos = (targetArr) => targetArr
    .reduce((a, b) => a.flatMap(e => b.map(f => `${e}${f}`)))
    .sort()

const wordList = generateCombos(segments).join('\n')

Deno.writeTextFileSync('./wordlist.txt', wordList)
