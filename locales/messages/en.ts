export default {
  localeName: "English",
  localeSelectorDescription: "Choose your language",
  sidebar: {
    companySelector: {
      company: "Company",
      ctaAddCompany: "Add company",
    },
    account: {
      upgrade: "Upgrade to Pro",
      settings: "Account",
      billing: "Billing",
      notifications: "Notifications",
      logout: "Log out",
    },
    inset: {
      workspace: "Workspace",
      overview: "Overview",
    },
  },
  auth: {
    login: {
      headline: "Welcome back",
      descriptionOAuth: "Login with your Apple or Google account",
      separator: "Or continue with",
      forgotPassword: "Forgot your password?",
      cta: "Login",
    },
  },
  account: {
    create: {
      headline: "Create your account",
      cta: "Create account",
      firstname: "Firstname",
      firstname_placeholder: "John",
      lastname: "Lastname",
      lastname_placeholder: "Doe",
      avatar: "Avatar",
    },
  },
  company: {
    create: {
      headline: "Create a company",
      cta: "Create company",
      company_name: "Company name",
      company_name_placeholder: "ACME Inc.",
      short_name: "Company short name",
      short_name_placeholder: "ACME",
    },
  },
  hello: "Hello",
  "hello.world": "Hello world!",
  welcome: "Hello {name}!",
} as const;
