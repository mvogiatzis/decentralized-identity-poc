import crypto from 'crypto';
import elliptic from 'elliptic';

const ecParam = 'secp256k1';
const randomBytesHex = crypto.randomBytes(32).toString("hex");

// create private-public keys
const ec = new elliptic.ec(ecParam);
const keyPair = ec.keyFromPrivate(randomBytesHex,'hex');
const publicKey = keyPair.getPublic();

console.log('Bytes used to generate key=%s', randomBytesHex);
console.log('Public key=%s', keyPair.getPublic('hex'));

// print to construct DID JWK verification
console.log('x hex=%s', getXBuffer(publicKey, 'hex'));
console.log('y hex=%s', getYBuffer(publicKey, 'hex'));
console.log('x base64=%s', getXBuffer(publicKey, 'base64'));
console.log('y base64=%s', getYBuffer(publicKey, 'base64'));

function getXBuffer(publicKey, encoding) {
    return publicKey.x.toBuffer().toString(encoding);
}

function getYBuffer(publicKey, encoding) {
    return publicKey.y.toBuffer().toString(encoding);
}

