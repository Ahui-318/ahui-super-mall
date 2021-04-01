import BackTop from "@/components/common/backTop/BackTop.vue";
export const backTop = {
  data() {
    return {
      isShow: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  },

}
