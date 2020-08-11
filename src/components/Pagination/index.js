import paginationComponent from "./index.vue";

const pagination = {
    install: function(Vue) {
        Vue.component("pagination", paginationComponent);
    }
};
export default pagination;
