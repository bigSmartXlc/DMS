<!--
* description: 图片上传
* author: 苏勇
* createdDate: 2020-10-27
-->
<template>
  <section>
    <el-col :span="span">
      <lableName
        :validrule="validrule"
        :cur-label-name="curLabelName"
        :is-show-label="isShowLabel"
        :is-require="isRequire"
      />
      <el-upload
        v-viewer
        :class="{picturecardshow:pictureCardShow}"
        :action="action"
        :accept="accepttype"
        list-type="picture-card"
        :http-request="handleChange"
        :before-upload="beforeAvatarUpload"
        :on-remove="handleRemove"
        :file-list="fileLists"
        :limit="limit"
        :disabled="disabled"
      >
        <i class="el-icon-plus" />
      </el-upload>
    </el-col>
  </section>
</template>
<script>
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: 'MdmUpload',
  components: {
    lableName: () => import('@/components/lableName') // 标题溢出样式组件
  },
  props: {
    code: { type: String, default: '' },
    validrule: { type: Object, default: () => {} },
    isRequire: { type: Boolean, default: false },
    isShowLabel: { type: Boolean, default: true },
    span: { type: Number, default: 6 },
    labelName: { type: String, default: '' },
    // 组件传值字段名称（与code对象绑定的字段名称，即视图中：formField对应的字段名称）
    // 如：视图中配置：code="formField.carBrandCode"，则codeField="carBrandCode"
    codeField: { type: String, default: '' },
    // 上次文件目录
    category: { type: String, default: 'commonUpload' },
    // mp功能url路径 属性:fileUrl
    dataToObject: {
      type: Object,
      default: () => {
        return {
          fileUrl: ''
        }
      }
    },
    action: { type: String, default: '' },
    accepttype: { type: String, default: '.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP' }, // 文件类型限制
    limit: { type: Number, default: 1 }, // 文件个数限制
    disabled: { type: Boolean, default: false }, // 是否禁用
    fileList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      fileLists: [],
      modeCode: this.code,
      pictureCardShow: false,
      curLabelName:
        this.labelName === ''
          ? this.$t('sys.button.selFile') /* 选择文件*/
          : this.labelName
    }
  },
  watch: {
    code(newValue, oldValue) {
      this.modeCode = newValue
      if (this.modeCode && oldValue === '') {
        this.fileLists = [{ url: this.code }]
        this.pictureCardShow = true
      }
    }
  },
  methods: {
    // 处理上传事件
    handleChange(param) {
      const that = this
      // MP上传url
      const url =
        that.dataToObject.fileUrl || '/mp/file/' + that.category + '/upload.do'
      that
        .$requestUpload(url, param)
        .then(response => {
          if (response.result === '1') {
            that.modeCode = ''
            let code = ''
            let text = ''
            let objData = {}
            // 因api管理-导入事件 添加判断逻辑
            if (typeof response.path !== 'undefined') {
              if (
                response.result === '1' &&
                response.path.length > 0 &&
                response.path[0].length > 0 &&
                response.path[0][0].indexOf('|') > -1
              ) {
                // 返回格式：[["xxxx.png|/upload/{category}/{yyyyMMdd}/{guid}/xxxx.jpg","xxx.xx KB"]]
                // 截取出/upload/{category}/{yyyyMMdd}/{guid}/xxxx.jpg返回
                that.modeCode = response.path[0][0].split('|')[1]
                text = response.path[0][0].split('|')[0]
                code = that.modeCode
                objData = {
                  fileId: that.modeCode ? that.modeCode.split('/')[4] : '',
                  fileName: that.modeCode ? that.modeCode.split('/')[5] : ''
                }
              }
            }
            this.$message({
              message: '导入成功',
              type: 'success'
            })
            that.$emit('changeCode', code, text, objData, that.codeField, that.comType)
          } else {
            this.$message({
              message: '导入失败',
              type: 'warning'
            })
            this.pictureCardShow = false
          }
        })
        .catch(err => {
          that.modeCode = ''
          console.info(err)
        })
    },
    handleRemove(file, fileList) {
      this.pictureCardShow = false
      this.fileLists = []
      this.$emit('changeCode', '', '', { fileId: '' })
    },
    beforeAvatarUpload(file) {
      this.pictureCardShow = true
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        this.pictureCardShow = false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        this.pictureCardShow = false
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="css">
  .picturecardshow .el-upload--picture-card {
    display: none;
  }
</style>
