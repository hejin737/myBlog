<template>
    <div class="page">
        这是{{page}}页面
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                page: 'about'
            }
        }
    }
</script>
<style media="screen">
  .page {
    background-color: red;
  }
</style>
