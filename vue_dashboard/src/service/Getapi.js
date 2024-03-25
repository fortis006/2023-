export const getApi = () => {
const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://localhost:3000", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}