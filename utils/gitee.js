async function getDecodedContent(content) {
  const decodedContent = atob(content); // 解码Base64编码的文件内容
  const decoder = new TextDecoder();
  const decodedData = decoder.decode(
    new Uint8Array([...decodedContent].map((char) => char.charCodeAt(0)))
  );
  return JSON.parse(decodedData);
}

async function fetchFileContent(apiUrl, accessToken) {
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: "token " + accessToken,
    },
  });
  const fileData = await response.json();
  return fileData;
}

async function putFileContent(
  apiUrl,
  accessToken,
  encodedContent,
  sha,
  message = ""
) {
  const commitData = {
    access_token: accessToken,
    content: encodedContent,
    message,
    sha: sha,
  };

  const putResponse = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "token " + accessToken,
    },
    body: JSON.stringify(commitData),
  });
  return putResponse.ok;
}
module.exports = {
  getDecodedContent,
  fetchFileContent,
  putFileContent,
};
