<template>
  <center>
    <div class="dark notice">
      <p>
        This section is hosted from a static backup of the site, shown for
        illustrative purposes.
      </p>
    </div>
    <iframe src="/projects/tuning/Tuning Academy.html" frameborder="0"></iframe>
  </center>
</template>

<script>
export default {
  name: "TuningAcademy",
};
</script>

<style scoped>
.notice {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  border-bottom-right-radius: 999px;
  border-bottom-left-radius: 999px;
}

.notice p {
  margin: 0px;
}

iframe {
  display: block;
  width: 1000px;
  height: 96vh;
  margin: 0 auto;
}
</style>
