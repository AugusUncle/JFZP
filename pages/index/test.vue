<template>
  <view>
    <view class="input-wrapper">
      <input type="text" v-model="inputValue" @focus="showPicker" placeholder="请选择或输入">
    </view>
    <picker v-if="pickerVisible" mode="selector" :range="options" @change="handleSelect">
      <view class="picker">
        {{ inputValue || '请选择或输入' }}
      </view>
    </picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '', // 输入的值
      pickerVisible: false, // picker是否显示
      options: ['选项1', '选项2', '选项3'] // 下拉选项数组
    };
  },
  methods: {
    showPicker() {
      this.pickerVisible = true;
    },
    handleSelect(event) {
      const index = event.detail.value;
      this.inputValue = this.options[index]; // 更新输入值
      this.pickerVisible = false; // 隐藏picker
    }
  }
};
</script>

<style scoped>
.input-wrapper {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

input {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border: none;
  outline: none;
  background-color: transparent;
}

.picker {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-top: 1px solid #ccc;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
}
</style>
