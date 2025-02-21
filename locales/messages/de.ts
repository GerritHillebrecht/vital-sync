import { create } from "domain";

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
    workspace: {
      roster: "Dienstplan",
      settings: "Einstellungen",
    },
    company: {
      employees: "Mitarbeiter",
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
      headline: "Erstelle ein Unternehmen",
      cta: "Unternehmen erstellen",
      company_name: "Unternehmensname",
      company_name_placeholder: "ACME Inc.",
      short_name: "Kurzname",
      short_name_placeholder: "ACME",
      separator_text: "Adresse",
      street_name: "Straße",
      street_name_placeholder: "Musterstraße",
      street_number: "Hausnummer",
      street_number_placeholder: "42",
      postal_code: "Postleitzahl",
      postal_code_placeholder: "12345",
      city: "Stadt",
      city_placeholder: "Musterstadt",
      country: "Land",
      country_placeholder: "Deutschland",
    },
  },
  employee: {
    create: {
      headline: "Mitarbeiter verwalten",
      cta: "Mitarbeiter erstellen",
      noEmployees: "Keine Mitarbeiter gefunden",
      firstname: "Vorname",
      firstname_placeholder: "Max",
      lastname: "Nachname",
      lastname_placeholder: "Mustermann",
      email: "E-Mail",
      email_placeholder: "E-Mail-Adresse",
      phone_number: "Telefonnummer",
      phone_number_placeholder: "0123456789",
    },
  },
  workspace: {
    create: {
      headline: "Erstelle eine Versorgung",
      cta: "Versorgung erstellen",
      workspace_name: "Versorgungsname",
      workspace_name_placeholder: "ACME Inc.",
      workspace_type: "Vorsorguns-typ",
      workspace_type_placeholder: "eg. Wohngemeinschft",
    },
  },
  shiftService: {
    create: {
      headline: "Erstelle einen neuen Dienst",
      cta: "Dienst erstellen",
      service_name: "Dienstname",
      service_name_placeholder: "Frühschicht",
      weekdays: "Wochentage",
      weekdays_placeholder: "0,1,2,3,4,5,6",
      shift_service_type_id: "Diensttyp",
      shift_service_type_placeholder: "zB. Nachtdienst",
      icon_shape: "Form",
      icon_color: "Farbe",
    },
  },
  hello: "Hallo",
  "hello.world": "Hallo Welt!",
  welcome: "Hallo {name}!",
} as const;
