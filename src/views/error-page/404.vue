<template>
    <div class="not-found">
        404 Not Found
        <a @click="goHome">返回首页</a>
    </div>
</template>

<script>
export default {
    name: "index",
    methods: {
        goHome() {
            this.$router.push({
                name: "index"
            });
        }
    }
};
</script>

<style lang="scss">
.not-found {
    padding: 15px 15px 70px 15px;
    min-height: 100%;
    position: relative;
    font-size: 13px;
    color: $color-info;
    a {
        display: block;
        margin-top: 15px;
        color: $color-link;
    }
}
</style>
