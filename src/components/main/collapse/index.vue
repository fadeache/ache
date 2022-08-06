<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { ElMessage,ElMessageBox } from "element-plus";

const store = useStore();

const state = reactive({
  activeName: "1",
  activeId: null,
  showDialog: false
});

onMounted(() => {
  getWords()
})

const words = ref([])
const getWords = async () => {
  let res = await axios.get('ache/words/get')
  words.value = res.data
  state.activeId = res.data[0].id
}

const deleteWord = async (id) => {
  ElMessageBox.confirm("确定要删除这句话吗？", "删除提示", {
    distinguishCancelAndClose: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(async () => {
    await axios.delete("/ache/words/delete", { params: { id: parseInt(id) } });
    getWords()
  });
}

const formInfo = ref({
  zhcn: "",
  enus: "",
});
const formKey = ref(0)

const rules = reactive({
  zhcn: [
    { required: true, message: "请输入中文句子", trigger: ["blur", "change"] },
  ],
  enus: [{ required: true, message: "请输入英文句子", trigger: ["blur", "change"] }],
});

const form = ref(null)

const addWord = () => {
  form.value.validate(async (valid, fields) => {
    if (valid) {
      await axios.post("/ache/words/add", formInfo.value);
      ElMessage({
      type: "success",
      message: "句子添加成功！",
    });
    }
  });
  formKey.value++
  state.showDialog = false
}
</script>

<template>
  <el-collapse v-model="state.activeName" accordion v-for="(item, index) in words" :key="item"
    @change="state.activeId = item.id">
    <el-collapse-item :title="item.zhcn" :name="(index + 1).toString()">
      <div>
        {{ item.enus }}
      </div>
      <div class="btn" v-if="store.state.user.info.role === 'admin' && state.activeId === item.id"
        @click="deleteWord(item.id)">
        <ICON code="minus" />
      </div>
    </el-collapse-item>
  </el-collapse>
  <div class="btn" v-if="store.state.user.info.role === 'admin'" @click="state.showDialog = true">
    <ICON code="plus" />
  </div>

  <el-dialog v-model="state.showDialog" custom-class="my-dialog login">
    <template #title>
      添加句子
    </template>
    <el-form :model="formInfo" ref="form" :rules="rules" :key="formKey">
      <el-form-item label="中文" prop="zhcn">
        <el-input v-model="formInfo.zhcn" clearable v-on:keyup.enter="addWord"></el-input>
      </el-form-item>
      <el-form-item label="英文" prop="enus">
        <el-input v-model="formInfo.enus" clearable v-on:keyup.enter="addWord"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="success" @click="addWord">添加</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-collapse {
  border: none;

  :deep(.el-collapse-item__header) {
    line-height: normal;
    text-align: left;
    border: none;
  }

  :deep(.el-collapse-item__wrap) {
    border: none;

    .el-collapse-item__content {
      color: #677383;
      font-family: "Times New Roman", Times, serif;
      font-style: italic;
    }
  }
}

i {
  &:hover {
    color: orangered;
    cursor: pointer;
  }
}

.btn {
  margin-top: 8px;
}
</style>
