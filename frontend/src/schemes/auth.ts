
export const schemeSignIn = {
  required: "${label} is required!",
  username: {
    range: "${label} must be between ${min} and ${max}",
  },
  password: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export const schemeSignUp = {
  required: "${label} is required!",
  username: {
    range: "${label} must be between ${min} and ${max}",
  },
  types: {
    email: "${label} is not a valid email!",
  },
  password: {
    range: "${label} must be between ${min} and ${max}",
  },
};