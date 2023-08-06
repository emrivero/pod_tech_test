/**
 * User type
 * @typedef {Object} UserBody
 * @param {string} _id - User id
 * @param {string} username - Username
 * @param {string} email - Email
 * @param {string} lastAccess - Last access
 * @param {string} status - Status
 * @param {PermissionsBody[]} [permissions] - Permissions
 * @param {Favorites} favorites - Favorites
 * @param {Profile} profile - Profile
 */
export type UserBody = {
  _id: string;
  username: string;
  email: string;
  lastAccess: string;
  status: string;
  permissions?: PermissionsBody[] | null;
  favorites: Favorites;
  profile: Profile;
};

/**
 * Permissions entity type
 * @typedef {Object} PermissionsBody
 * @param {string} accountId - Account id
 * @param {string[]} [roles] - Roles
 */
export type PermissionsBody = {
  accountId: string;
  roles?: string[] | null;
};

/**
 * Favorites type
 * @typedef {Object} Favorites
 * @param {string[]} [disims] - Disims
 * @param {string[]} [summaries] - Summaries
 * @param {string[]} [billing] - Billing
 * @param {string[]} [users] - Users
 * @param {string[]} [products] - Products
 * @param {string[]} [accounts] - Accounts
 * @param {string[]} [assets] - Assets
 * @param {string[]} [imsis] - Imsis
 * @param {string[]} [device] - Device
 * @param {string[]} [ztp-settings] - Ztp settings
 */
export type Favorites = {
  disims?: string[] | null;
  summaries?: string[] | null;
  billing?: string[] | null;
  users?: string[] | null;
  products?: string[] | null;
  accounts?: string[] | null;
  assets?: string[] | null;
  imsis?: string[] | null;
  device?: string[] | null;
  "ztp-settings"?: string[] | null;
};

/**
 * Profile type
 * @typedef {Object} Profile
 * @param {string} picture - Picture
 * @param {string} language - Language
 * @param {string} timezone - Timezone
 */
export type Profile = {
  picture: string;
  language: string;
  timezone: string;
};
