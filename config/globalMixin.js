// globalMixin.js

export default {
  beforeCreate() {
    const data = this.$options.data; // 获取组件的 data

    if (data) {
      for (const key in data()) {
        if (data()[key] === null || data()[key] === undefined) {
          // 设置默认值
          this.$set(this.$data, key, '');
        }
      }
    }
  }
};
