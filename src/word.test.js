import word from './word'

describe('word', () => {
  it('toString', () => {
    expect('' + word('test', 'm')).toBe('test')
  })

  it('inflect (nominative)', () => {
    expect(word('Test', 'm').inflect()).toBe('ein Test')
    expect(word('Test', 'm', { noArticle: true }).inflect()).toBe('Test')
    expect(word('Test', 'm', { definiteArticle: true }).inflect()).toBe('der Test')

    expect(word('Frau', 'f').inflect()).toBe('eine Frau')
    expect(word('Frau', 'f', { noArticle: true }).inflect()).toBe('Frau')
    expect(word('Frau', 'f', { definiteArticle: true }).inflect()).toBe('die Frau')

    expect(word('Auto', 'n').inflect()).toBe('ein Auto')
    expect(word('Auto', 'n', { noArticle: true }).inflect()).toBe('Auto')
    expect(word('Auto', 'n', { definiteArticle: true }).inflect()).toBe('das Auto')
  })

  it('inflect with adjective (nominative)', () => {
    expect(word('Test', 'm', { adjective: 'nett' }).inflect()).toBe('ein netter Test')
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett' }).inflect()).toBe('netter Test')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett' }).inflect()).toBe('der nette Test')

    expect(word('Frau', 'f', { adjective: 'nett' }).inflect()).toBe('eine nette Frau')
    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett' }).inflect()).toBe('nette Frau')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett' }).inflect()).toBe('die nette Frau')

    expect(word('Auto', 'n', { adjective: 'nett' }).inflect()).toBe('ein nettes Auto')
    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett' }).inflect()).toBe('nettes Auto')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett'}).inflect()).toBe('das nette Auto')
  })

  it('inflect with adjective (nominative, plural)', () => {
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett', plural: 'Tests' }).inflect({ plural: true })).toBe('nette Tests')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett', plural: 'Tests' }).inflect({ plural: true })).toBe('die netten Tests')

    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett', plural: 'Frauen' }).inflect({ plural: true })).toBe('nette Frauen')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett', plural: 'Frauen' }).inflect({ plural: true })).toBe('die netten Frauen')

    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett', plural: 'Autos' }).inflect({ plural: true })).toBe('nette Autos')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett', plural: 'Autos' }).inflect({ plural: true })).toBe('die netten Autos')
  })

  it('inflect (genitive)', () => {
    expect(word('Test', 'm').inflect({ grammaticalCase: 'genitive' })).toBe('eines Tests')
    expect(word('Test', 'm', { noArticle: true }).inflect({ grammaticalCase: 'genitive' })).toBe('Tests')
    expect(word('Test', 'm', { definiteArticle: true }).inflect({ grammaticalCase: 'genitive' })).toBe('des Tests')

    expect(word('Frau', 'f').inflect({ grammaticalCase: 'genitive' })).toBe('einer Frau')
    expect(word('Frau', 'f', { noArticle: true }).inflect({ grammaticalCase: 'genitive' })).toBe('Frau')
    expect(word('Frau', 'f', { definiteArticle: true }).inflect({ grammaticalCase: 'genitive' })).toBe('der Frau')

    expect(word('Auto', 'n').inflect({ grammaticalCase: 'genitive' })).toBe('eines Autos')
    expect(word('Auto', 'n', { noArticle: true }).inflect({ grammaticalCase: 'genitive' })).toBe('Autos')
    expect(word('Auto', 'n', { definiteArticle: true }).inflect({ grammaticalCase: 'genitive' })).toBe('des Autos')
  })

  it('inflect with adjective (genitive)', () => {
    expect(word('Test', 'm', { adjective: 'nett' }).inflect({ grammaticalCase: 'genitive' })).toBe('eines netten Tests')
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'genitive' })).toBe('netten Tests')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'genitive' })).toBe('des netten Tests')

    expect(word('Frau', 'f', { adjective: 'nett' }).inflect({ grammaticalCase: 'genitive' })).toBe('einer netten Frau')
    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'genitive' })).toBe('netter Frau')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'genitive' })).toBe('der netten Frau')

    expect(word('Auto', 'n', { adjective: 'nett' }).inflect({ grammaticalCase: 'genitive' })).toBe('eines netten Autos')
    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'genitive' })).toBe('netten Autos')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'genitive' })).toBe('des netten Autos')
  })

  it('inflect with adjective (genitive, plural)', () => {
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett', plural: 'Tests' }).inflect({ grammaticalCase: 'genitive', plural: true })).toBe('netter Tests')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett', plural: 'Tests' }).inflect({ grammaticalCase: 'genitive', plural: true })).toBe('der netten Tests')

    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett', plural: 'Frauen' }).inflect({ grammaticalCase: 'genitive', plural: true })).toBe('netter Frauen')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett', plural: 'Frauen' }).inflect({ grammaticalCase: 'genitive', plural: true })).toBe('der netten Frauen')

    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett', plural: 'Autos' }).inflect({ grammaticalCase: 'genitive', plural: true })).toBe('netter Autos')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett', plural: 'Autos' }).inflect({ grammaticalCase: 'genitive', plural: true })).toBe('der netten Autos')
  })

  it('inflect (dative)', () => {
    expect(word('Test', 'm').inflect({ grammaticalCase: 'dative' })).toBe('einem Test')
    expect(word('Test', 'm', { noArticle: true }).inflect({ grammaticalCase: 'dative' })).toBe('Test')
    expect(word('Test', 'm', { definiteArticle: true }).inflect({ grammaticalCase: 'dative' })).toBe('dem Test')

    expect(word('Frau', 'f').inflect({ grammaticalCase: 'dative' })).toBe('einer Frau')
    expect(word('Frau', 'f', { noArticle: true }).inflect({ grammaticalCase: 'dative' })).toBe('Frau')
    expect(word('Frau', 'f', { definiteArticle: true }).inflect({ grammaticalCase: 'dative' })).toBe('der Frau')

    expect(word('Auto', 'n').inflect({ grammaticalCase: 'dative' })).toBe('einem Auto')
    expect(word('Auto', 'n', { noArticle: true }).inflect({ grammaticalCase: 'dative' })).toBe('Auto')
    expect(word('Auto', 'n', { definiteArticle: true }).inflect({ grammaticalCase: 'dative' })).toBe('dem Auto')
  })

  it('inflect with adjective (dative)', () => {
    expect(word('Test', 'm', { adjective: 'nett' }).inflect({ grammaticalCase: 'dative' })).toBe('einem netten Test')
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'dative' })).toBe('nettem Test')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'dative' })).toBe('dem netten Test')

    expect(word('Frau', 'f', { adjective: 'nett' }).inflect({ grammaticalCase: 'dative' })).toBe('einer netten Frau')
    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'dative' })).toBe('netter Frau')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'dative' })).toBe('der netten Frau')

    expect(word('Auto', 'n', { adjective: 'nett' }).inflect({ grammaticalCase: 'dative' })).toBe('einem netten Auto')
    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'dative' })).toBe('nettem Auto')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'dative' })).toBe('dem netten Auto')
  })

  it('inflect with adjective (dative, plural)', () => {
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett', plural: 'Tests' }).inflect({ grammaticalCase: 'dative', plural: true })).toBe('netten Tests')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett', plural: 'Tests' }).inflect({ grammaticalCase: 'dative', plural: true })).toBe('den netten Tests')

    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett', plural: 'Frauen' }).inflect({ grammaticalCase: 'dative', plural: true })).toBe('netten Frauen')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett', plural: 'Frauen' }).inflect({ grammaticalCase: 'dative', plural: true })).toBe('den netten Frauen')

    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett', plural: 'Autos' }).inflect({ grammaticalCase: 'dative', plural: true })).toBe('netten Autos')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett', plural: 'Autos' }).inflect({ grammaticalCase: 'dative', plural: true })).toBe('den netten Autos')
  })

  it('inflect (accusative)', () => {
    expect(word('Test', 'm').inflect({ grammaticalCase: 'accusative' })).toBe('einen Test')
    expect(word('Test', 'm', { noArticle: true }).inflect({ grammaticalCase: 'accusative' })).toBe('Test')
    expect(word('Test', 'm', { definiteArticle: true }).inflect({ grammaticalCase: 'accusative' })).toBe('den Test')

    expect(word('Frau', 'f').inflect({ grammaticalCase: 'accusative' })).toBe('eine Frau')
    expect(word('Frau', 'f', { noArticle: true }).inflect({ grammaticalCase: 'accusative' })).toBe('Frau')
    expect(word('Frau', 'f', { definiteArticle: true }).inflect({ grammaticalCase: 'accusative' })).toBe('die Frau')

    expect(word('Auto', 'n').inflect({ grammaticalCase: 'accusative' })).toBe('ein Auto')
    expect(word('Auto', 'n', { noArticle: true }).inflect({ grammaticalCase: 'accusative' })).toBe('Auto')
    expect(word('Auto', 'n', { definiteArticle: true }).inflect({ grammaticalCase: 'accusative' })).toBe('das Auto')
  })

  it('inflect with adjective (accusative)', () => {
    expect(word('Test', 'm', { adjective: 'nett' }).inflect({ grammaticalCase: 'accusative' })).toBe('einen netten Test')
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'accusative' })).toBe('netten Test')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'accusative' })).toBe('den netten Test')

    expect(word('Frau', 'f', { adjective: 'nett' }).inflect({ grammaticalCase: 'accusative' })).toBe('eine nette Frau')
    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'accusative' })).toBe('nette Frau')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'accusative' })).toBe('die nette Frau')

    expect(word('Auto', 'n', { adjective: 'nett' }).inflect({ grammaticalCase: 'accusative' })).toBe('ein nettes Auto')
    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'accusative' })).toBe('nettes Auto')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett' }).inflect({ grammaticalCase: 'accusative' })).toBe('das nette Auto')
  })

  it('inflect with adjective (accusative, plural)', () => {
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett', plural: 'Tests' }).inflect({ grammaticalCase: 'accusative', plural: true })).toBe('nette Tests')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett', plural: 'Tests' }).inflect({ grammaticalCase: 'accusative', plural: true })).toBe('die netten Tests')

    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett', plural: 'Frauen' }).inflect({ grammaticalCase: 'accusative', plural: true })).toBe('nette Frauen')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett', plural: 'Frauen' }).inflect({ grammaticalCase: 'accusative', plural: true })).toBe('die netten Frauen')

    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett', plural: 'Autos' }).inflect({ grammaticalCase: 'accusative', plural: true })).toBe('nette Autos')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett', plural: 'Autos' }).inflect({ grammaticalCase: 'accusative', plural: true })).toBe('die netten Autos')
  })

  it('prepositions', () => {
    expect(word('Frau', 'f').inflect({ grammaticalCase: 'dative', preposition: 'bei' })).toBe('bei einer Frau')

    expect(word('Haus', 'n').inflect({ grammaticalCase: 'dative', preposition: 'in' })).toBe('in einem Haus')
  })

  it('contractions', () => {
    expect(word('Zimmer', 'm', { definiteArticle: true }).inflect({ grammaticalCase: 'dative', preposition: 'in' })).toBe('im Zimmer')

    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'groß' }).inflect({ grammaticalCase: 'dative', preposition: 'in' })).toBe('im großen Auto')
  })
})
