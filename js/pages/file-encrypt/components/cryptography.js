import { CryptographyAES } from './cryptography-aes.js'
import { CryptographyPGP } from './cryptography-pgp.js'
const { useEffect, useState } = React

const CRYPTO_ALGO = {
  GCM: {
    label: 'AES256-GCM',
    Component: (props) => <CryptographyAES mode='gcm' {...props} />,
  },
  CBC: {
    label: 'AES256-CBC',
    Component: (props) => <CryptographyAES mode='cbc' {...props} />,
  },
  PGP: {
    label: 'OpenPGP.js',
    Component: CryptographyPGP,
  },
}

export const Cryptography = (props) => {
  const {
    file,
    onFileEncrypt: onFileEncryptProp,
    onFileDecrypt: onFileDecryptProp,
  } = props
  const [selectedAlgo, selectAlgo] = useState('PGP')
  //const [selectedAlgo, selectAlgo] = useState(GCM);
  const [fileArrayBuffer, setFileArrayBuffer] = useState(null)

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = async function () {
      setFileArrayBuffer(reader.result)
    }
    reader.readAsArrayBuffer(file)
  }, [file])

  const onFileEncrypt = (buffer, ...args) => {
    const newFile = new File([new Blob([buffer])], `enc-${file.name}`, {
      type: file.type,
    })
    onFileEncryptProp(newFile, ...args)
  }

  const onFileDecrypt = (buffer, ...args) => {
    const newFile = new File([new Blob([buffer])], `dec-${file.name}`, {
      type: file.type,
    })
    onFileEncryptProp(newFile, ...args)
  }

  const CryptoComponent = CRYPTO_ALGO[selectedAlgo].Component || 'div'

  return (
    <div className='card info' style={{ minWidth: 0 }}>
      <p>Cryptography</p>

      <select onChange={(e) => selectAlgo(e.target.value)} value={selectedAlgo}>
        {Object.entries(CRYPTO_ALGO).map(([key, algo]) => (
          <option value={key}>{algo.label}</option>
        ))}
      </select>

      {!!fileArrayBuffer && (
        <CryptoComponent arrayBuffer={fileArrayBuffer}>
          {({ onEncrypt, onDecrypt }) => (
            <div>
              <button type='button' onClick={() => onEncrypt(onFileEncrypt)}>
                Encrypt
              </button>
              <button type='button' onClick={() => onDecrypt(onFileDecrypt)}>
                Decrypt
              </button>
            </div>
          )}
        </CryptoComponent>
      )}
    </div>
  )
}