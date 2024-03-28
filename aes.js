const aes = require("js-crypto-aes");

const toUint8Array = (text) => {
  const uint8Array = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) {
    uint8Array[i] = text.charCodeAt(i);
  }
  return uint8Array;
};

const decodeUint8Array = (uint8Array) => {
  let text = "";
  for (let i = 0; i < uint8Array.length; i++) {
    text += String.fromCharCode(uint8Array[i]);
  }
  return text;
};

const uint8Array = new Uint8Array([
  72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33,
]);
let text = "";
for (let i = 0; i < uint8Array.length; i++) {
  text += String.fromCharCode(uint8Array[i]);
}

const msg = toUint8Array("hello"); // arbitrary length of message in Uint8Array
const key = new Uint8Array([
  21, 31, 21, 31, 21, 31, 21, 31, 21, 31, 21, 31, 21, 31, 21, 31,
]); // 16 bytes or 32 bytes key in Uint8Array
const iv = new Uint8Array([21, 31, 21, 31, 21, 31, 21, 31, 21, 31, 21, 31]); // 12 bytes IV in Uint8Array for AES-GCM mode
const additionalData = "1233"; // optional AAD
aes
  .encrypt(msg, key, { name: "AES-GCM", iv, additionalData, tagLength: 16 })
  .then((encrypted) => {
    console.log(encrypted);
    aes
      .decrypt(encrypted, key, {
        name: "AES-GCM",
        iv,
        additionalData,
        tagLength: 16,
      })
      .then((decrypted) => {
        console.log(decodeUint8Array(decrypted));
        // now you get an Uint8Array of decrypted message
      });
    // now you get an Uint8Array of encrypted message
  })
  .catch((e) => {
    console.log(e?.message);
  });
