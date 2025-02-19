export default {
  localeName: "Deutsch",
  localeSelectorDescription: "Wähle deine Sprache",
  sidebar: {
    companySelector: {
      company: "Unternehmen",
      ctaAddCompany: "Unternehmen hinzufügen",
    },
    account: {
      upgrade: "Account upgraden",
      settings: "Account",
      billing: "Abrechnungen",
      notifications: "Benachrichtigungen",
      logout: "Abmelden",
    },
    inset: {
      workspace: "Versorgung",
      overview: "Übersicht",
    },
  },
  auth: {
    login: {
      headline: "Willkommen zurück",
      descriptionOAuth: "Verwende deinen Apple oder Google account",
      separator: "Oder verwende",
      forgotPassword: "Passwort vergessen?",
      cta: "Anmelden",
    },
  },
  account: {
    create: {
      headline: "Erstelle einen neuen Account",
      cta: "Account erstellen",
      firstname: "Vorname",
      firstname_placeholder: "Max",
      lastname: "Nachname",
      lastname_placeholder: "Mustermann",
      avatar: "Avatar",
    },
  },
  company: {
    create: {
      headline: "Erstelle einen Unternehmen",
      cta: "Unternehmen erstellen",
      company_name: "Unternehmensname",
      company_name_placeholder: "ACME Inc.",
      short_name: "Kurzname",
      short_name_placeholder: "ACME",
    },
  },
  hello: "Hallo",
  "hello.world": "Hallo Welt!",
  welcome: "Hallo {name}!",
} as const;
