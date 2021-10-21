import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nOptions,
  QueryResolver,
} from 'nestjs-i18n'
import * as path from 'path'

export const i18nOptions: I18nOptions = {
  fallbackLanguage: 'pt-BR',
  parser: I18nJsonParser,
  parserOptions: {
    path: path.join(__dirname, '/i18n/'),
    watch: true,
    object: true,
  },
  resolvers: [
    { use: QueryResolver, options: ['lang', 'locale', 'l'] },
    new HeaderResolver(['x-custom-lang']),
    AcceptLanguageResolver,
    new CookieResolver(['lang', 'locale', 'l']),
  ],
}