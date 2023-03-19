import crypto from 'crypto';
import elliptic from 'elliptic';

const ecParam = 'secp256k1';
const privateKeyBytesHex = crypto.randomBytes(32).toString("hex");

// create private-public keys
const ec = new elliptic.ec(ecParam);
const keyPair = ec.keyFromPrivate(privateKeyBytesHex,'hex');
const publicKey = keyPair.getPublic();

// print key details
console.log('Private key=%s', privateKeyBytesHex);
console.log('Public key=%s', keyPair.getPublic('hex'));

// print jwk
console.log('publicKeyJwk: %s', {
    "kty": "EC",
    "crv": "secp256k1",
    "x": getXBuffer(publicKey, 'base64'),
    "y": getYBuffer(publicKey, 'base64')
  });

function getXBuffer(publicKey, encoding) {
    return publicKey.x.toBuffer().toString(encoding);
}

function getYBuffer(publicKey, encoding) {
    return publicKey.y.toBuffer().toString(encoding);
}

