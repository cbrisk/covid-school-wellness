const decodeToken = token => {
  const [, encodedPayload] = token.split('.');
  const jsonPayload = atob(encodedPayload);
  const payload = JSON.parse(jsonPayload);
  return payload;
}

export default decodeToken;
