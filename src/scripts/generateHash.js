const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
    console.error('Please provide a password: node generate-hash.js "your-password"');
    process.exit(1);
}

const saltRounds = 12;
const hash = bcrypt.hashSync(password, saltRounds);
console.log('Bcrypt hash for your password:');
console.log(hash);
console.log('\nAdd this to your .env file as REBUILD_PASSWORD_HASH');