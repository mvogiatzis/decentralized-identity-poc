const did = 'did:web:mvogiatzis.github.io';

// pass your jwk to be used for DID verification
const jwk = {
  kty: 'EC',
  crv: 'secp256k1',
  x: 'pfAR6TZaDL/iyUBOmdrAIy/1ZmNiis5zrVFuH4805pI=',
  y: '0nGC9a7kn4a6KBausSUKqdaHppbbSmHGR80nk0G4LJQ='
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