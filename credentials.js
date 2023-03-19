import { createVerifiableCredentialJwt, createVerifiablePresentationJwt, verifyCredential, verifyPresentation } from 'did-jwt-vc'
import { ES256KSigner, hexToBytes } from 'did-jwt';
import { Resolver } from 'did-resolver'
import { getResolver } from 'web-did-resolver'

// First create an issuer to use when creating the Verifiable Credentials
const key = '52d0d4779e48db2dfbafca9106357754e1eb77747adaf2ae8258f034a56bcfe9';
const issuer = {
    did: 'did:web:mvogiatzis.github.io',
    signer: ES256KSigner(hexToBytes(key))
}

// create the Verifiable Credentials for subject
const subject = 'did:web:mvogiatzis.github.io';
const credentialsSubject = {
    name: 'Michael Vogiatzis',
    jobTitle: 'DeFi Authorised Trader',
    expiryDate: '2025-01-01'
}
const vcPayload = createVcPayload(subject, credentialsSubject);

// create the VC JWT
const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer)
console.log('Verifiable Credential:\n\n', vcJwt);

// create the Verifiable Presentation
const vpPayload = {
    vp: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      verifiableCredential: [vcJwt]
    }
  }
const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer)
console.log('\nVerifiable Presentation:\n\n', vpJwt);;
console.log('');

// Now let's verify if Michael's Verifiable Presentation and credentials are legit

// verify the credentials
const resolver = new Resolver(getResolver())
const verifiedCredentials = await verifyCredential(vcJwt, resolver)
console.log('Verified Credentials:\n', verifiedCredentials)

// verify the presentation
const verifiedPresentation = await verifyPresentation(vpJwt, resolver)
console.log('\n\nVerified Presentation:\n', verifiedPresentation)

// Function to construct a Verifiable Credentials payload
function createVcPayload(subject, credentialsSubj){
 return {
    sub: subject,
    nbf: 1679226002,
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      credentialSubject: credentialsSubj
    }
  }
}