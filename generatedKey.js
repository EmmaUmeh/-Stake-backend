const crypto = require('crypto');

// Generate a secure secret key
function generateSecretKey(length) {
  // Generate a buffer of random bytes
  const buffer = crypto.randomBytes(length);
  
  // Convert the buffer to a hexadecimal string
  const secretKey = buffer.toString('hex');
  
  return secretKey;
}

// Example usage
const secretKeyLength = 64; // Length of the secret key in bytes
const secretKey = generateSecretKey(secretKeyLength);
console.log('Generated Secret Key:', secretKey);
