<script>
export default {
  data() {
    return {
      state: {}
    };
  },
  mounted() {
    this.getData();
  },
  getData() {
      fetch("http://localhost:3000/", { method: "GET" })
        .then((response) => {
          console.log(response);
        })
       
        .catch((err) => {
          console.log(err);
        });
  }
};
</script>

<template>
  <div>
    <h1>fetch api & json server</h1>
  </div>
  <button @click="getData();">取得資料</button>
  </template>

  <style></style>
