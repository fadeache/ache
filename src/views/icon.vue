<script setup>
import { ref, reactive, nextTick, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import qs from "qs";

const state = reactive({
  showDialog: false,
  mode: "",
});
const props = defineProps({
  smallScreen: Boolean,
});
const filter = ref({
  name: "",
  code: "",
});
const iconList = ref([]);
const form = ref(null);
const upload = ref(null);
const formData = ref({
  name: "",
  code: "",
  color: null,
  icon: "",
  xml: "",
});
const imageUrl = ref("");

const rules = reactive({
  name: [
    { required: true, message: "名称不能为空", trigger: ["blur", "change"] },
  ],
  code: [
    { required: true, message: "编码不能为空", trigger: ["blur", "change"] },
    {
      pattern: /[a-zA-Z]/,
      message: "编码只支持英文",
      trigger: ["blur", "change"],
    },
  ],
  xml: [
    { required: true, message: "svg不能为空", trigger: ["blur", "change"] },
  ],
  icon: [
    { required: true, message: "图标不能为空", trigger: ["blur", "change"] },
  ],
});

onMounted(() => {
  getIcons();
});
watch(
  () => filter.value,
  () => {
    getIcons();
  },
  { deep: true }
);
const getIcons = async () => {
  let res = await axios.get("/ache/icon/get", { params: filter.value });
  iconList.value = res.data;
};
const editIcon = (icon) => {
  formData.value = icon;
  state.showDialog = true;
  state.mode = "edit";
};
const changeColor = () => {
  if (formData.value.xml.indexOf("fill") !== -1) {
    let index = formData.value.xml.indexOf("fill") + 6;
    formData.value.xml =
      formData.value.xml.substring(0, index) +
      formData.value.color +
      '" ' +
      formData.value.xml.substring(index + 9);
  } else {
    let index = formData.value.xml.indexOf("<svg") + 5;
    formData.value.xml =
      formData.value.xml.substring(0, index) +
      'fill="' +
      formData.value.color +
      '" ' +
      formData.value.xml.substring(index);
  }
};
const addIcon = () => {
  state.showDialog = true;
  state.mode = "add";
  nextTick(() => {
    imageUrl.value = "";
    form.value.resetFields();
  });
};
const deleteIcon = async (id) => {
  await axios.delete("/ache/icon/delete", { params: { id: id } });
  ElMessage.success("删除成功！");
  getIcons();
};
const handleChange = (file) => {
  if (file.size / 1024 / 1024 > 1) {
    ElMessage.error("图标大小不能超过1MB!");
    return false;
  }
  imageUrl.value = URL.createObjectURL(file.raw);
  formData.value.icon = file.name;
};
const save = () => {
  form.value.validate((valid, fields) => {
    if (valid) {
      if (state.mode === "add") {
        upload.value.submit();
      } else {
        let params = {
          id: formData.value.id,
          name: formData.value.name,
          code: formData.value.code,
          xml: formData.value.xml,
        };
        axios.put("/ache/icon/edit", qs.stringify(params));
        ElMessage.success("编辑成功！");
      }
      state.showDialog = false;
    }
  });
};
</script>

<template>
  <h1>图标中心</h1>
  <div class="filter">
    <div class="item">
      <span>名称</span><el-input v-model="filter.name"></el-input>
    </div>
    <div class="item">
      <span>编码</span><el-input v-model="filter.code"></el-input>
    </div>
    <el-button title="添加" type="primary" plain @click="addIcon"
      ><el-icon><Plus /></el-icon
    ></el-button>
  </div>
  <div class="icons">
    <div class="icon" v-for="icon in iconList">
      <div class="svg"><div v-html="icon.xml"></div></div>
      <div class="title">
        <div>{{ icon.name }}</div>
        <div>{{ icon.code }}</div>
      </div>
      <div class="operation">
        <div>
          <el-icon :size="24" color="#fff" @click="editIcon(icon)"
            ><edit
          /></el-icon>
          <el-icon :size="24" color="#fff" @click="deleteIcon(icon.id)"
            ><delete
          /></el-icon>
          <el-icon :size="24" color="#fff"><CopyDocument /></el-icon>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="state.showDialog">
    <template #title>
      <span>{{ state.mode === "add" ? "添加" : "编辑" }}图标</span>
    </template>
    <el-form :model="formData" ref="form" :label-width="52" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="formData.name"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input
          v-model="formData.code"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon" v-if="state.mode === 'add'">
        <el-upload
          ref="upload"
          action="/ache/icon/add"
          accept=".svg"
          :auto-upload="false"
          :show-file-list="false"
          :data="{ name: formData.name, code: formData.code }"
          :on-change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" />
          <el-icon v-else><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="色彩" prop="color" v-if="state.mode === 'edit'">
        <el-color-picker
          @change="changeColor"
          v-model="formData.color"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="svg" prop="xml" v-if="state.mode === 'edit'">
        <el-input type="textarea" :rows="5" v-model="formData.xml"></el-input>
      </el-form-item>
    </el-form>
    <template #footer><el-button plain @click="save">确定</el-button></template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.filter {
  margin: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 29px;
  .item {
    height: 32px;
    width: 320px;
    .el-input {
      width: calc(100% - 40px);
      margin-left: 8px;
      --el-input-focus-border: grey;
      --el-input-focus-border-color: grey;
    }
  }
  .el-button {
    padding: 8px;
  }
  .el-button--primary.is-plain {
    background: transparent;
    border-color: #dcdfe6;
    color: grey;
  }

  .el-button--primary.is-plain:hover {
    color: grey;
    border-color: #c0c4cc;
  }

  .el-button--primary.is-plain:focus {
    color: grey;
    border-color: grey;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  .icon {
    width: 148px;
    height: 148px;
    font-size: 14px;
    border-radius: 4px;
    position: relative;
    .svg {
      margin: 20px auto;
      width: 40px;
      height: 40px;
      div {
        width: 100%;
        height: 100%;
        :deep(svg) {
          width: 100%;
          height: 100%;
        }
      }
    }
    .title {
      height: 68px;
      div {
        margin: 8px auto;
        &:nth-child(1) {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:nth-child(2) {
          overflow: hidden; // 超过两行显示省略号
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    .operation {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background-color: rgb(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      &:hover {
        opacity: 1;
        transition: opacity 0.3s;
      }
      div {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 24px;
        width: 100%;
        transform: translate(-50%, -50%);
        i {
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
        i + i {
          margin-left: 12px;
        }
      }
    }
  }
}
.el-form {
  max-width: 400px;
  margin: auto;
  :deep(.el-upload) {
    border: 1px dashed #dcdfe6;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    &:hover {
      border-color: #c0c4cc;
    }
    .el-icon {
      font-size: 28px;
      color: #8c939d;
      width: 148px;
      height: 148px;
    }
    img {
      width: 148px;
      height: 148px;
    }
  }
}
</style>
