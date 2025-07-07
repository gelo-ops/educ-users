export function isValidEmail(email: string): boolean {
    // This is a simple regex for illustration. You can use a stricter one if needed.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
