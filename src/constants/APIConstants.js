export const envMap = {
  local: "LOCAL",
  ngrok: "NGROK",
  development: "LOCAL",
  production: "PROD"
};

const DODOOH_SERVICE_URLS = {
  [envMap.local]: "http://localhost:8080/api/",
  [envMap.production]: "https://app.signagemonk.com/api/"
};

export const PROJECT_ENV = envMap[process.env.NEXT_APP_URL_ENV] || envMap.local;

const baseURL = DODOOH_SERVICE_URLS[PROJECT_ENV];

const login = `${baseURL}auth/login`;
const refreshToken = `${baseURL}auth/refresh`;
const logout = `${baseURL}auth/logout`;
const schemes = `${baseURL}schemes`;
const groups = `${baseURL}groups`;
const users = `${baseURL}users`;
const cycles = `${baseURL}cycles`;
const payments = `${baseURL}payments`;
const payouts = `${baseURL}payouts`;
const analytics = `${baseURL}analytics/summary`;
const customerMemberships = `${baseURL}customer/memberships`;
const customerBids = `${baseURL}customer/bids`;
const customerClaims = `${baseURL}customer/claims`;
const customerPayments = `${baseURL}customer/payments`;
const kyc = `${baseURL}kyc`;
const kycDocuments = `${baseURL}kyc/documents`;
const financialRisk = `${baseURL}users`;
const customerCycles = `${baseURL}customer/cycles`;
const notifications = `${baseURL}notifications`;
const support = `${baseURL}support/tickets`;
const audit = `${baseURL}superadmin/audit`;
const platformSummary = `${baseURL}superadmin/summary`;
const platformUsers = `${baseURL}superadmin/users`;

const APIConstants = {
  login,
  refreshToken,
  logout,
  schemes,
  groups,
  users,
  cycles,
  payments,
  payouts,
  analytics,
  customerMemberships,
  customerBids,
  customerClaims,
  customerPayments,
  kyc,
  kycDocuments,
  financialRisk,
  customerCycles,
  notifications,
  support,
  audit,
  platformSummary,
  platformUsers
};

export default APIConstants;
