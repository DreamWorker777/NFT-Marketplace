<template>
<div class="loading">
    <img :src="loadImg" class="loading__img">
</div>
</template>

<script>
export default {
    name: 'Loading',
    data: () => ({
        loadImg: require('@/assets/img/loading.png')
    })
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0%   {transform: rotate(0deg);}
  100%  {transform: rotate(360deg);}
}

.loading {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100vw);
    height: calc(100vh);
    background-color: #2d262eda;
    z-index: 9999;

    &__img {
        position: absolute;
        width: 100px;
        height: 100px;
        transform: translate3d(-50%, -50%, 0);
        left: 50%;
        top: 50%;
        animation-name: rotate;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        transition: transform 0.5s;
        transition-timing-function: linear;
    }
}
</style>