# A Digital Identity Prototype

You can

* Create private/public keys
* Generate a Decentralized Identity (DID) document
* Publish your DID on Github
* Issue Verifiable Claims and Verify them


Create your keys
------------------

First create a private and public key using the Ed2559 digital signature algorithm which uses elliptic curve cryptography.

To get the private / public key pair, run:

`npm run generate-keys`

You should also get a helper JWK output to be used in the DID generation.

Generate a DID document
-----------------------

This generates a `did:web` document.

Modify the JWK in `did-generator.js` to use your own public key.

Run `npm run generate-did`

This will output a DID like this:

```ts
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/jws-2020/v1"
  ],
  "id": "did:web:mvogiatzis.github.io",
  "verificationMethod": [
    {
      "id": "did:web:mvogiatzis.github.io#owner",
      "type": "JsonWebKey2020",
      "controller": "did:web:mvogiatzis.github.io",
      "publicKeyJwk": {
        "kty": "EC",
        "crv": "secp256k1",
        "x": "pfAR6TZaDL/iyUBOmdrAIy/1ZmNiis5zrVFuH4805pI=",
        "y": "0nGC9a7kn4a6KBausSUKqdaHppbbSmHGR80nk0G4LJQ="
      }
    }
  ],
  "authentication": [
    "did:web:mvogiatzis.github.io#owner"
  ],
  "assertionMethod": [
    "did:web:mvogiatzis.github.io#owner"
  ]
}
```

Publish your DID
-------------------

Now publish your DID document so that it can be resolved later.

The [DID web method spec](https://w3c-ccg.github.io/did-method-web/#example-creating-the-did) expects us to have a well-known URI for `did:web` DIDs.

So `did:web:<domain>` resolves to `https://<domain>/.well-known/did.json`.

Using Github pages is easy and free. You can host your did there.

Mine is uploaded here: https://mvogiatzis.github.io/.well-known/did.json


Side note: There's a useful [did-jwt](https://github.com/decentralized-identity/did-jwt) module to create, sign and verify JWTs.

Create Verifiable Credentials
-----------------------------------

TBC






