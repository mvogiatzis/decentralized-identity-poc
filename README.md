# A Digital Identity Prototype

This is a proof of concept that allows anyone to create a Decentralised Identity (DID) and issue Verifiable Credentials.

For example, a company can issue a DID document and Verifiable Credentials to an authorised DeFi trader.

The trader can then present them to a trading platform to get access. The trading platform can verify the trader's credentials and presentation to allow trading access.

In this project you can:

* Create private/public keys
* Generate a Decentralized Identity (DID) document
* Publish your DID document on Github
* Issue Verifiable Credentials (VC) and Verifiable Presentations (VP)
* Verify VC and VPs

Create your keys
------------------

First create a private and public key using the Ed2559 digital signature algorithm.

To get the private / public key pair, run:

`npm run generate-keys`

Copy your private key.

You should also get a helper JWK output to be used in the DID generation. Copy that too.

Generate a DID document
-----------------------

This generates a `did:web` document.

Modify the JWK in `did-generator.js` to use your own public key.

Run `npm run generate-did`

This will output a DID like this:

```json
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

Publish your DID document
-------------------------

For your DID to be available, you need to publish it.

This is needed so that people can verify it.

For the sake of simplicity, I used a `web` type of DID.

The [DID web method spec](https://w3c-ccg.github.io/did-method-web/#example-creating-the-did) expects us to have a well-known URI for `did:web` DIDs.

So `did:web:<domain>` resolves to `https://<domain>/.well-known/did.json`.

You can host your DID on Github Pages. It's easy and free.

Mine is uploaded here: https://mvogiatzis.github.io/.well-known/did.json

 Optional: You can sign and verify your DID using the web resolver from the [did-jwt](https://github.com/decentralized-identity/did-jwt) lib.

Create Verifiable Credentials and Presentation
---------------------------------------------

Create your `Verifiable Credentials` and `Verifiable Presentation` by running:

`npm run issue-vc`

This will create your `Verifiable Credential` and sign it using your private key (from the previous keys step. 

You will get a `Verifiable Credentials` JWT.

For example:

```
eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Im5hbWUiOiJNaWNoYWVsIFZvZ2lhdHppcyIsImpvYlRpdGxlIjoiRGVGaSBBdXRob3Jpc2VkIFRyYWRlciIsImV4cGlyeURhdGUiOiIyMDI1LTAxLTAxIn19LCJzdWIiOiJkaWQ6d2ViOm12b2dpYXR6aXMuZ2l0aHViLmlvIiwibmJmIjoxNjc5MjI2MDAyLCJpc3MiOiJkaWQ6d2ViOm12b2dpYXR6aXMuZ2l0aHViLmlvIn0.aZjl4s_mt58hUgr5sMBxB0hHjYSINa1IZ9RUQ0PVDJvnJLj_TNmYMhIk1SxWzZt6tzKhyjxbi9YcdbqxGx5WYw
```

You can enter your VC JWT on JWT.io to decode it.

Here's my example payload:

```json
{
  "vc": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "type": [
      "VerifiableCredential"
    ],
    "credentialSubject": {
      "name": "Michael Vogiatzis",
      "jobTitle": "DeFi Authorised Trader",
      "expiryDate": "2025-01-01"
    }
  },
  "sub": "did:web:mvogiatzis.github.io",
  "nbf": 1679226002,
  "iss": "did:web:mvogiatzis.github.io"
}
```

The module will also create your Verifiable Presentation, signed again by an issuer (in my case, it's me).

You can again, decode the Verifiable Presentation JWT and get something like: 

```json
{
  "vp": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "type": [
      "VerifiablePresentation"
    ],
    "verifiableCredential": [
      "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Im5hbWUiOiJNaWNoYWVsIFZvZ2lhdHppcyIsImpvYlRpdGxlIjoiRGVGaSBBdXRob3Jpc2VkIFRyYWRlciIsImV4cGlyeURhdGUiOiIyMDI1LTAxLTAxIn19LCJzdWIiOiJkaWQ6d2ViOm12b2dpYXR6aXMuZ2l0aHViLmlvIiwibmJmIjoxNjc5MjI2MDAyLCJpc3MiOiJkaWQ6d2ViOm12b2dpYXR6aXMuZ2l0aHViLmlvIn0.aZjl4s_mt58hUgr5sMBxB0hHjYSINa1IZ9RUQ0PVDJvnJLj_TNmYMhIk1SxWzZt6tzKhyjxbi9YcdbqxGx5WYw"
    ]
  },
  "iss": "did:web:mvogiatzis.github.io"
}
```

### Testing

For testing purposes, the module issuing the credentials will also verify the Verifiable Credentials and Verifiable Presentation.

It will print out `verified: true` together with the DID resolution. 

For this step I'm using the [did-jwt-vc](https://github.com/decentralized-identity/did-jwt-vc) library which allows you to create and verify W3C Verifiable Credentials and Presentations in JWT format.


Notes
-------

1. I used the same issuer to issue and sign the Verifiable Credentials and the Verifiable Presentation. In reality, the issuer - holder - verifier might be different. See [trust triangle](https://en.wikipedia.org/wiki/Verifiable_credentials#/media/File:VC_triangle_of_Trust.svg.).

2. I used JSON Web tokens and Web DIDs. But you can change the `DID` document to be stored in a blockchain (i.e. `did:ethr`) and use an eth resolver instead.

Resources
----------

1. [Decentralized Identity JS libraries](https://github.com/decentralized-identity/)
2. [Wiki verifiable credentials](https://en.wikipedia.org/wiki/Verifiable_credentials)
3. [did:web method spec](https://w3c-ccg.github.io/did-method-web/)


