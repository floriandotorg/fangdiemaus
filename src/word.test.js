import word from './word'

describe('word', () => {
  it('toString', () => {
    expect('' + word('test', 'm')).toBe('test')
  })

  it('withArticle (nominative)', () => {
    expect(word('Test', 'm').withArticle()).toBe('ein Test')
    expect(word('Test', 'm', { noArticle: true }).withArticle()).toBe('Test')
    expect(word('Test', 'm', { definiteArticle: true }).withArticle()).toBe('der Test')

    expect(word('Frau', 'f').withArticle()).toBe('eine Frau')
    expect(word('Frau', 'f', { noArticle: true }).withArticle()).toBe('Frau')
    expect(word('Frau', 'f', { definiteArticle: true }).withArticle()).toBe('die Frau')

    expect(word('Auto', 'n').withArticle()).toBe('ein Auto')
    expect(word('Auto', 'n', { noArticle: true }).withArticle()).toBe('Auto')
    expect(word('Auto', 'n', { definiteArticle: true }).withArticle()).toBe('das Auto')
  })

  it('withArticle with adjective (nominative)', () => {
    expect(word('Test', 'm', { adjective: 'nett' }).withArticle()).toBe('ein netter Test')
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett' }).withArticle()).toBe('netter Test')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett' }).withArticle()).toBe('der nette Test')

    expect(word('Frau', 'f', { adjective: 'nett' }).withArticle()).toBe('eine nette Frau')
    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett' }).withArticle()).toBe('nette Frau')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett' }).withArticle()).toBe('die nette Frau')

    expect(word('Auto', 'n', { adjective: 'nett' }).withArticle()).toBe('ein nettes Auto')
    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett' }).withArticle()).toBe('nettes Auto')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett'}).withArticle()).toBe('das nette Auto')
  })

  it('withArticle with adjective (nominative, plural)', () => {
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett', plural: 'Tests' }).withArticle({ plural: true })).toBe('nette Tests')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett', plural: 'Tests' }).withArticle({ plural: true })).toBe('die netten Tests')

    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett', plural: 'Frauen' }).withArticle({ plural: true })).toBe('nette Frauen')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett', plural: 'Frauen' }).withArticle({ plural: true })).toBe('die netten Frauen')

    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett', plural: 'Autos' }).withArticle({ plural: true })).toBe('nette Autos')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett', plural: 'Autos' }).withArticle({ plural: true })).toBe('die netten Autos')
  })

  it('withArticle (genitive)', () => {
    expect(word('Test', 'm').withArticle({ grammaticalCase: 'genitive' })).toBe('eines Tests')
    expect(word('Test', 'm', { noArticle: true }).withArticle({ grammaticalCase: 'genitive' })).toBe('Tests')
    expect(word('Test', 'm', { definiteArticle: true }).withArticle({ grammaticalCase: 'genitive' })).toBe('des Tests')

    expect(word('Frau', 'f').withArticle({ grammaticalCase: 'genitive' })).toBe('einer Frau')
    expect(word('Frau', 'f', { noArticle: true }).withArticle({ grammaticalCase: 'genitive' })).toBe('Frau')
    expect(word('Frau', 'f', { definiteArticle: true }).withArticle({ grammaticalCase: 'genitive' })).toBe('der Frau')

    expect(word('Auto', 'n').withArticle({ grammaticalCase: 'genitive' })).toBe('eines Autos')
    expect(word('Auto', 'n', { noArticle: true }).withArticle({ grammaticalCase: 'genitive' })).toBe('Autos')
    expect(word('Auto', 'n', { definiteArticle: true }).withArticle({ grammaticalCase: 'genitive' })).toBe('des Autos')
  })

  it('withArticle with adjective (genitive)', () => {
    expect(word('Test', 'm', { adjective: 'nett' }).withArticle({ grammaticalCase: 'genitive' })).toBe('eines netten Tests')
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'genitive' })).toBe('netten Tests')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'genitive' })).toBe('des netten Tests')

    expect(word('Frau', 'f', { adjective: 'nett' }).withArticle({ grammaticalCase: 'genitive' })).toBe('einer netten Frau')
    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'genitive' })).toBe('netter Frau')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'genitive' })).toBe('der netten Frau')

    expect(word('Auto', 'n', { adjective: 'nett' }).withArticle({ grammaticalCase: 'genitive' })).toBe('eines netten Autos')
    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'genitive' })).toBe('netten Autos')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'genitive' })).toBe('des netten Autos')
  })

  it('withArticle with adjective (genitive, plural)', () => {
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett', plural: 'Tests' }).withArticle({ grammaticalCase: 'genitive', plural: true })).toBe('netter Tests')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett', plural: 'Tests' }).withArticle({ grammaticalCase: 'genitive', plural: true })).toBe('der netten Tests')

    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett', plural: 'Frauen' }).withArticle({ grammaticalCase: 'genitive', plural: true })).toBe('netter Frauen')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett', plural: 'Frauen' }).withArticle({ grammaticalCase: 'genitive', plural: true })).toBe('der netten Frauen')

    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett', plural: 'Autos' }).withArticle({ grammaticalCase: 'genitive', plural: true })).toBe('netter Autos')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett', plural: 'Autos' }).withArticle({ grammaticalCase: 'genitive', plural: true })).toBe('der netten Autos')
  })

  it('withArticle (dative)', () => {
    expect(word('Test', 'm').withArticle({ grammaticalCase: 'dative' })).toBe('einem Test')
    expect(word('Test', 'm', { noArticle: true }).withArticle({ grammaticalCase: 'dative' })).toBe('Test')
    expect(word('Test', 'm', { definiteArticle: true }).withArticle({ grammaticalCase: 'dative' })).toBe('dem Test')

    expect(word('Frau', 'f').withArticle({ grammaticalCase: 'dative' })).toBe('einer Frau')
    expect(word('Frau', 'f', { noArticle: true }).withArticle({ grammaticalCase: 'dative' })).toBe('Frau')
    expect(word('Frau', 'f', { definiteArticle: true }).withArticle({ grammaticalCase: 'dative' })).toBe('der Frau')

    expect(word('Auto', 'n').withArticle({ grammaticalCase: 'dative' })).toBe('einem Auto')
    expect(word('Auto', 'n', { noArticle: true }).withArticle({ grammaticalCase: 'dative' })).toBe('Auto')
    expect(word('Auto', 'n', { definiteArticle: true }).withArticle({ grammaticalCase: 'dative' })).toBe('dem Auto')
  })

  it('withArticle with adjective (dative)', () => {
    expect(word('Test', 'm', { adjective: 'nett' }).withArticle({ grammaticalCase: 'dative' })).toBe('einem netten Test')
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'dative' })).toBe('nettem Test')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'dative' })).toBe('dem netten Test')

    expect(word('Frau', 'f', { adjective: 'nett' }).withArticle({ grammaticalCase: 'dative' })).toBe('einer netten Frau')
    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'dative' })).toBe('netter Frau')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'dative' })).toBe('der netten Frau')

    expect(word('Auto', 'n', { adjective: 'nett' }).withArticle({ grammaticalCase: 'dative' })).toBe('einem netten Auto')
    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'dative' })).toBe('nettem Auto')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'dative' })).toBe('dem netten Auto')
  })

  it('withArticle with adjective (dative, plural)', () => {
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett', plural: 'Tests' }).withArticle({ grammaticalCase: 'dative', plural: true })).toBe('netten Tests')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett', plural: 'Tests' }).withArticle({ grammaticalCase: 'dative', plural: true })).toBe('den netten Tests')

    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett', plural: 'Frauen' }).withArticle({ grammaticalCase: 'dative', plural: true })).toBe('netten Frauen')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett', plural: 'Frauen' }).withArticle({ grammaticalCase: 'dative', plural: true })).toBe('den netten Frauen')

    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett', plural: 'Autos' }).withArticle({ grammaticalCase: 'dative', plural: true })).toBe('netten Autos')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett', plural: 'Autos' }).withArticle({ grammaticalCase: 'dative', plural: true })).toBe('den netten Autos')
  })

  it('withArticle (accusative)', () => {
    expect(word('Test', 'm').withArticle({ grammaticalCase: 'accusative' })).toBe('einen Test')
    expect(word('Test', 'm', { noArticle: true }).withArticle({ grammaticalCase: 'accusative' })).toBe('Test')
    expect(word('Test', 'm', { definiteArticle: true }).withArticle({ grammaticalCase: 'accusative' })).toBe('den Test')

    expect(word('Frau', 'f').withArticle({ grammaticalCase: 'accusative' })).toBe('eine Frau')
    expect(word('Frau', 'f', { noArticle: true }).withArticle({ grammaticalCase: 'accusative' })).toBe('Frau')
    expect(word('Frau', 'f', { definiteArticle: true }).withArticle({ grammaticalCase: 'accusative' })).toBe('die Frau')

    expect(word('Auto', 'n').withArticle({ grammaticalCase: 'accusative' })).toBe('ein Auto')
    expect(word('Auto', 'n', { noArticle: true }).withArticle({ grammaticalCase: 'accusative' })).toBe('Auto')
    expect(word('Auto', 'n', { definiteArticle: true }).withArticle({ grammaticalCase: 'accusative' })).toBe('das Auto')
  })

  it('withArticle with adjective (accusative)', () => {
    expect(word('Test', 'm', { adjective: 'nett' }).withArticle({ grammaticalCase: 'accusative' })).toBe('einen netten Test')
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'accusative' })).toBe('netten Test')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'accusative' })).toBe('den netten Test')

    expect(word('Frau', 'f', { adjective: 'nett' }).withArticle({ grammaticalCase: 'accusative' })).toBe('eine nette Frau')
    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'accusative' })).toBe('nette Frau')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'accusative' })).toBe('die nette Frau')

    expect(word('Auto', 'n', { adjective: 'nett' }).withArticle({ grammaticalCase: 'accusative' })).toBe('ein nettes Auto')
    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'accusative' })).toBe('nettes Auto')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett' }).withArticle({ grammaticalCase: 'accusative' })).toBe('das nette Auto')
  })

  it('withArticle with adjective (accusative, plural)', () => {
    expect(word('Test', 'm', { noArticle: true, adjective: 'nett', plural: 'Tests' }).withArticle({ grammaticalCase: 'accusative', plural: true })).toBe('nette Tests')
    expect(word('Test', 'm', { definiteArticle: true, adjective: 'nett', plural: 'Tests' }).withArticle({ grammaticalCase: 'accusative', plural: true })).toBe('die netten Tests')

    expect(word('Frau', 'f', { noArticle: true, adjective: 'nett', plural: 'Frauen' }).withArticle({ grammaticalCase: 'accusative', plural: true })).toBe('nette Frauen')
    expect(word('Frau', 'f', { definiteArticle: true, adjective: 'nett', plural: 'Frauen' }).withArticle({ grammaticalCase: 'accusative', plural: true })).toBe('die netten Frauen')

    expect(word('Auto', 'n', { noArticle: true, adjective: 'nett', plural: 'Autos' }).withArticle({ grammaticalCase: 'accusative', plural: true })).toBe('nette Autos')
    expect(word('Auto', 'n', { definiteArticle: true, adjective: 'nett', plural: 'Autos' }).withArticle({ grammaticalCase: 'accusative', plural: true })).toBe('die netten Autos')
  })
})
