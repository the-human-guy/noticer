export const encrypt = async ({
  input: secretData,
  publicKeyArmored,
  passphrase,
  signingPrivateKeyArmored,
}) => {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  //const privateKey = await openpgp.decryptKey({
  //  privateKey: await openpgp.readPrivateKey({
  //    armoredKey: signingPrivateKeyArmored,
  //  }),
  //  passphrase,
  //});

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ binary: new Uint8Array(secretData) }),
    encryptionKeys: publicKey,
    // signingKeys: privateKey // optional
  });
  console.log(encrypted);

  return encrypted
}

/*
  encryptedData: ArrayBuffer,
  passphrase: plaintext,
*/
export const decrypt = async ({
  passphrase,
  privateKeyArmored,
  input: encryptedData,
  verificationPublicKey,
}) => {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  });

  const { data: decrypted, signatures } = await openpgp.decrypt({
    message: await openpgp.createMessage({ binary: new Uint8Array(encryptedData) }),
    decryptionKeys: privateKey,
    verificationKeys: verificationPublicKey, // optional
  });

  console.log(decrypted);
  // check signature validity (signed messages only)
  if (verificationPublicKey) {
    try {
      await signatures[0].verified; // throws on invalid signature
      console.log('Signature is valid');
    } catch (e) {
      throw new Error('Signature could not be verified: ' + e.message);
    }
  }

  return decrypted
}

export const generateKeys = async ({
  passphrase,
  type = 'ecc',
  curve = 'curve25519',
  format = 'armored',
}) => {
  const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
    type,
    curve, // ECC curve name, defaults to curve25519
    userIDs: [{ name: 'Jon Smith', email: 'jon@example.com' }],
    passphrase, // protects the private key
    format, // 'armored', 'binary', 'object'
  });

  return { privateKey, publicKey, revocationCertificate }
}
