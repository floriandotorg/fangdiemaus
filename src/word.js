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

  const withArticle = (grammaticalCase, article, plural) => {
    const result = []

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

    return result.join(' ')
  }

  return {
    toString() {
      return word
    },
    withArticle({ grammaticalCase = 'nominative', plural = false } = {}) {
      if (isDefiniteArticle) {
        return withArticle(grammaticalCase, 'definiteArticle', plural)
      } else if (noArticle) {
        return withArticle(grammaticalCase, 'noArticle', plural)
      } else {
        return withArticle(grammaticalCase, 'indefiniteArticle', plural)
      }
    }
  }
}
