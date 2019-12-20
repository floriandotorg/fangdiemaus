import _ from 'lodash'

export default (word, gender, { adjective, noArticle, definiteArticle: isDefiniteArticle, plural: pluralForm } = {}) => {
  gender = (() => {
    switch (gender) {
      case 'm': return 0
      case 'f': return 1
      default: return 2
    }
  })()

  const pluralArticles = {
    nominative: 'die',
    genitive: 'der',
    dative: 'den',
    accusative: 'die'
  }

  const articles = {
    definiteArticle: {
      nominative: ['der', 'die', 'das'],
      genitive: ['des', 'der', 'des'],
      dative: ['dem', 'der', 'dem'],
      accusative: ['den', 'die', 'das']
    },
    indefiniteArticle: {
      nominative: ['ein', 'eine', 'ein'],
      genitive: ['eines', 'einer', 'eines'],
      dative: ['einem', 'einer', 'einem'],
      accusative: ['einen', 'eine', 'ein']
    }
  }

  const adjectiveEnding = {
    definiteArticle: {
      nominative: ['e', 'e', 'e'],
      genitive: ['en', 'en', 'en'],
      dative: ['en', 'en', 'en'],
      accusative: ['en', 'e', 'e']
    },
    indefiniteArticle: {
      nominative: ['er', 'e', 'es'],
      genitive: ['en', 'en', 'en'],
      dative: ['en', 'en', 'en'],
      accusative: ['en', 'e', 'es']
    },
    noArticle: {
      nominative: ['er', 'e', 'es'],
      genitive: ['en', 'er', 'en'],
      dative: ['em', 'er', 'em'],
      accusative: ['en', 'e', 'es']
    },
  }

  const pluralAdjectiveEnding = {
    definiteArticle: {
      nominative: 'en',
      genitive: 'en',
      dative: 'en',
      accusative: 'en'
    },
    noArticle: {
      nominative: 'e',
      genitive: 'er',
      dative: 'en',
      accusative: 'e'
    },
  }

  const contractions = {
    'an dem': 'am',
    'in dem': 'im',
    'bei dem': 'beim',
    'zu dem': 'zum',
    'hinter dem': 'hinterm',
    'in das': 'ins',
    'unter das': 'unters',
    'von dem': 'vom',
    'vor dem': 'vorm',
    'zu der': 'zur'
  }

  const contract = (text) => {
    for (const contraction in contractions) {
      text = text.replace(contraction, contractions[contraction])
    }

    return text
  }

  const inflect = (grammaticalCase, article, plural, preposition) => {
    const result = []

    if (preposition) {
      result.push(preposition)
    }

    if (article !== 'noArticle') {
      if (plural) {
        result.push(pluralArticles[grammaticalCase])
      } else {
        result.push(articles[article][grammaticalCase][gender])
      }
    }

    if (!_.isEmpty(adjective)) {
      if (plural) {
        result.push(`${adjective}${pluralAdjectiveEnding[article][grammaticalCase]}`)
      } else {
        result.push(`${adjective}${adjectiveEnding[article][grammaticalCase][gender]}`)
      }
    }

    if (plural) {
      result.push(pluralForm)
    } else {
      result.push(`${word}${(grammaticalCase === 'genitive' && gender !== 1) ? 's' : ''}`)
    }

    return contract(result.join(' '))
  }

  return {
    toString() {
      return word
    },
    inflect({ grammaticalCase = 'nominative', plural = false, preposition } = {}) {
      if (isDefiniteArticle) {
        return inflect(grammaticalCase, 'definiteArticle', plural, preposition)
      } else if (noArticle) {
        return inflect(grammaticalCase, 'noArticle', plural, preposition)
      } else {
        return inflect(grammaticalCase, 'indefiniteArticle', plural, preposition)
      }
    }
  }
}
