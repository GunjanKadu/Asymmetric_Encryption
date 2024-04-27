## What does it solves ?

    This repository gives a practical implementation of the question below

## Question -> How Does a public key verify a signature

    public keys encrypt, private keys decrypt" data/message ENCRYPTION.
    For digital signatures, it is the reverse. With a digital signature, you are trying to prove that the document signed by you came from you. To do that, you need to use something that only YOU have: your private key.

Stack Overflow : https://stackoverflow.com/questions/18257185/how-does-a-public-key-verify-a-signature

A digital signature in its simplest description is a hash (SHA1, MD5, etc.) of the data (file, message, etc.) that is subsequently encrypted with the signer's private key. Since that is something only the signer has (or should have) that is where the trust comes from. EVERYONE has (or should have) access to the signer's public key.

So, to validate a digital signature, the recipient

<li>Calculates a hash of the same data (file, message, etc.),</li>
<li>Decrypts the digital signature using the sender's PUBLIC key, and</li>
<li>Compares the 2 hash values.</li>
<li>If they match, the signature is considered valid. If they don't match, it either means that a different key was used to sign it, or that the data has been altered (either intentionally or unintentionally).</li>

## Important Points

<li>A public key can be mathematically generated from a private key</li>
<li>A private key cannot be mathematically generated from a public key (i.e. "trapdoor function")</li>
<li>A private key can be verified by a public key</li>
<li>To most, conditions #1 and #2 make sense, but what about #3?</li>
<br/>
You have two choices here:

<li>You can go down a rabbit-hole and spend hours upon hours learning how elliptic curve cryptography works (here is a great starting point)... OR...</li>
<li>You can accept the properties above--just like you accept Newton's 3 laws of motion without needing to derive them yourself.</li>

In conclusion, a public/private keypair is created using elliptic curve cryptography, which by nature, creates a public and private key that are **mathematically linked in both direction**, but not **mathematically derived in both directions**. This is what makes it possible for you to use someone's public key to verify that they signed a specific message, without them exposing their private key to you.
