export const ROLE_CONFIG_KEYS = {
  DASHBOARD: "DASHBOARD",
  MEDIA: "MEDIA",
  CUSTOM_APP: "CUSTOM-APPLICATION",
  DEVICE: "DEVICE",
  PLAYLIST: "PLAYLIST",
  LAYOUT: "LAYOUT",
  POLICY: "GROUP-POLICY",
  SCHEDULE: "SCHEDULE",
  SUBSCRIPTION: "SUBSCRIPTION",
  LOCATION: "LOCATION",
  USER: "USER",
  PROFILE: "PROFILE",
  REPORT: "REPORT",
  ROLE: "ROLE",
  PLAYER: "PLAYER",
  SCREENSHOTS: "SCREENSHOTS",
  GROUP: "GROUP",
  TAG: "TAG",
  APPROVAL: "APPROVAL",
  LIVE: "LIVE"
};

export const CUSTOMER_FEATURES = [
  "DASHBOARD",
  "PLAYER",
  "MEDIA",
  "CUSTOM-APPLICATION",
  "DEVICE",
  "PLAYLIST",
  "LAYOUT",
  "GROUP-POLICY",
  "SCHEDULE",
  "LOCATION",
  "PROFILE",
  "REPORT",
  "REMOTE-SCREEN",
  "SCREENSHOTS",
  "GROUP",
  "TAG",
  "LIVE"
];

export const PERMISSIONS = {
  read: "Read",
  create: "Create",
  delete: "Delete",
  update: "Update"
};

export const PERMISSIONS_CODE = [
  { type: "READ", code: 1 },
  { type: "CREATE", code: 2 },
  { type: "EDIT/DELETE", code: 4 }
];

export const CUSTOMER_FEATURES_WITH_POSITION = [
  { code: "DASHBOARD", position: 1 },
  { code: "PROFILE", position: 2 },
  { code: "LOCATION", position: 3 },
  { code: "GROUP-POLICY", position: 4 },
  { code: "MEDIA", position: 5 },
  { code: "PLAYLIST", position: 6 },
  { code: "SCHEDULE", position: 7 },
  { code: "DEVICE", position: 8 },
  { code: "REPORT", position: 9 },
  { code: "CUSTOM-APPLICATION", position: 10 },
  { code: "LAYOUT", position: 11 },
  { code: "REMOTE-SCREEN", position: 12 },
  { code: "PLAYER", position: 17 },
  { code: "SCREENSHOTS", position: 18 },
  { code: "LIVE", position: 23 }
];

export const FEATURE_GROUPS = {
  Admin: ["USER", "ROLE"],
  Basic: ["DASHBOARD", "PROFILE", "PLAYER", "GROUP", "TAG", "LIVE"],
  "Device Management": [
    "GROUP-POLICY",
    "LOCATION",
    "DEVICE",
    "REPORT",
    "SCREENSHOTS"
  ],
  "Scheduling & Layout": ["MEDIA", "PLAYLIST", "SCHEDULE", "LAYOUT"],
  "Custom Apps": ["CUSTOM-APPLICATION"]
};

export const FEATURE_GRAPH = {
  "GROUP-POLICY": ["SCHEDULE", "DEVICE"],
  LOCATION: ["DEVICE"],
  PLAYLIST: ["LAYOUT", "SCHEDULE"],
  DEVICE: ["REPORT", "SCREENSHOTS"],
  MEDIA: ["PLAYLIST", "SCHEDULE"]
};

export const DEFAULT_PAGINATION = {
  page: 0,
  pageSize: 10
};

export const DEVCICE_STATUSES = {
  ONLINE: "Online",
  OFFLINE: "Offline",
  DELETION_REQUESTED: "Deletion Requested",
  DELETION_IN_PROGRESS: "Deletion In Progress"
};

export const ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ORGANISATION_ADMIN",
  SUB_ADMIN: "SUB_ADMIN",
  STANDARD: "STANDARD",
  AUDIO_CUSTOMER: "AUDIO_CUSTOMER"
};

export const PAGINATION_OPTIONS = [10, 20, 30];

export const MESSAGE_TYPE = {
  info: "info",
  success: "success",
  error: "error"
};

export const pptMimeTypes = [
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/octet-stream",
  "application/x-mspowerpoint",
  "application/powerpoint",
  "ppt",
  "pptx",
  "application/ppt",
  "application/pptx"
];

export const DEVICE_STATUS = {
  ONLINE: {
    label: "Online",
    styles: {
      backgroundColor: "#f6ffed",
      color: "#389e0d"
    }
  },

  OFFLINE: {
    label: "Offline",
    styles: {
      backgroundColor: "#fff1f0",
      color: "#cf1322"
    }
  },

  DELETION_REQUESTED: {
    label: "Deletion Requested",
    styles: {
      backgroundColor: "#feffe6",
      color: "#d4b106"
    }
  },

  DELETION_IN_PROGRESS: {
    label: "Deletion In Progress",
    styles: {
      backgroundColor: "#fff7e6",
      color: "#d46b08"
    }
  },

  UNDER_VERIFICATION: {
    label: "Under Verification",
    styles: {
      backgroundColor: "#e6f4ff",
      color: "#0958d9"
    }
  }
};

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
