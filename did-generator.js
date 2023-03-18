
console.log('\n============ Creating the DID document ============\n');

const did = 'did:web:mvogiatzis.github.io';

// pass your jwk to be used for DID verification
const jwk = {
    kty: 'EC',
    crv: 'secp256k1',
    x: 'SaXGNTcN5mo8a8aeWe9z3Q0gnn9vvIbBrRVmamOXVi8=',
    y: '008mwiX2Jpw7TJYspSZR9hnkdOKSeRipSE66UKwUTuI='
  }

var document = createDidDocument(did, jwk);

// print did document
console.log('%s', JSON.stringify(document, null, 2));

export function createDidDocument(did, jwk) {
    return {
        "@context": [
          "https://www.w3.org/ns/did/v1",
          "https://w3id.org/security/suites/jws-2020/v1"
        ],
        "id": did,
        "verificationMethod": [
          {
            "id": `${did}#owner`,
            "type": "JsonWebKey2020",
            "controller": did,
            "publicKeyJwk": jwk
          }
        ],
        "authentication": [
          `${did}#owner`
        ],
        "assertionMethod": [
          `${did}#owner`
        ]
      };
}