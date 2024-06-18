let storedToken = ""; // Variable pour stocker le token

function setToken(token) {
  storedToken = token;
  console.log("storedToken", storedToken);
}

function getToken() {
  return storedToken;
}

module.exports = {
  setToken,
  getToken
};