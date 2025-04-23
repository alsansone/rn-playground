export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const getPasswordStrength = (password: string): string => {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const length = password.length;

  if (length < 6) return "Too short";

  const score = [hasUpper, hasLower, hasNumber, hasSymbol].filter(
    Boolean
  ).length;

  if (score <= 1) return "Weak";
  if (score === 2) return "Moderate";
  if (score >= 3 && length >= 8) return "Strong";

  return "Moderate";
};
