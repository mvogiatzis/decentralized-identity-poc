# A Digital Identity Prototype

You can

* Create private/public keys
* Generate a Decentralized Identity (DID) document
* Issue Verifiable Claims and Verify them

First create a private and public key using the Ed2559 digital signature algorithm which uses elliptic curve cryptography.

1. To get the private / public key pair, run:

`npm run generate-keys`

You should also get a helper JWK output to be used in the DID generation.

2 Generate a DID document.
--------------------------

Modify the JWK to user your own public key.

Run

`npm run generate-did`


Thanks to the awesome [Decentralized Identity library](https://github.com/decentralized-identity)