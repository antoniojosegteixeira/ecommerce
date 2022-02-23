const loginRequest = async (userData) => {
  return fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(userData),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return res.json;
  });
};

export default loginRequest;
