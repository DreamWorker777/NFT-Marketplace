<template>
<div class="loading">
    <div class="loading__container">
        <div class="loading__container__yellow"></div>
        <div class="loading__container__red"></div>
        <div class="loading__container__blue"></div>
        <div class="loading__container__violet"></div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Loading',
}
</script>

<style lang="scss" scoped>
:root {
	--yellow: #feb60a;
	--red: #ff0062;
	--blue: #00dbf9;
	--violet: #da00f7;
}

@keyframes bounce {
	0%, 50%, 100% {
		transform: scale(1);
		filter: blur(0px);
	}
	25% {
		transform: scale(0.6);
		filter: blur(3px);
	}
	75% {
		filter: blur(3px);
		transform: scale(1.4);
	}
}

.loading {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100vw);
    height: calc(100vh);
    z-index: 9999;
    background-color: #1a1940eb;
    background-image: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,153,212,0) calc(15% + 100px), rgba(0,99,138,0) calc(85% + 100px), rgba(0,0,0,0.15) 100%);
    display: flex;
    justify-content: center;
    align-items: center;

    &__container {
        display: flex;
        justify-content: center;
        align-items: center;

        div {
            width: 2vw;
            height: 2vw;
            border-radius: 100%;
            margin: 2vw;
            background-image: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 100%);
            animation: bounce 1.5s 0.5s linear infinite;
        }

        &__yellow {
            background-color: #feb60a;
        }

        &__red {
            background-color: #ff0062;
            animation-delay: 0.1s !important;
        }

        &__blue {
            background-color: #00dbf9;
            animation-delay: 0.2s !important;
        }

        &__violet {
            background-color: #da00f7;
            animation-delay: 0.3s !important;
        }
    }
}
</style>