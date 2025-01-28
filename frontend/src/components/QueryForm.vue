<template>
  <div>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="学校代号">
            <el-input v-model="query.schoolId" placeholder="请输入学校代号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学校名称">
            <el-input v-model="query.schoolName" placeholder="请输入学校名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="最高分">
            <el-input v-model="query.highScore" placeholder="请输入最高分"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最低分">
            <el-input v-model="query.lowScore" placeholder="请输入最低分"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="专业名称">
            <el-input v-model="query.majorName" placeholder="请输入专业名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div style="display: flex; align-items: center;">
            <span class="elLabel">考生类型</span>
            <el-select v-model="query.selectedType" placeholder="请选择考生类型">
              <el-option v-for="option in options" :key="option.value" :label="option.label"
                :value="option.value"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-form-item label-width="230">
        <el-button type="primary" @click="findItem" style="line-height: 20px; font-size: 20px;">分数线查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="results" v-if="results.length > 0" style="width: 100%">
      <el-table-column prop="schoolId" label="学校代号"></el-table-column>
      <el-table-column prop="schoolName" label="学校名称"></el-table-column>
      <el-table-column prop="majorName" label="专业名称"></el-table-column>
      <el-table-column prop="planCount" label="计划数"></el-table-column>
      <el-table-column prop="score" label="分数线"></el-table-column>
      <el-table-column prop="rank" label="位次"></el-table-column>
    </el-table>

    <div>
      <el-button type="primary" @click="prevPage">上一页</el-button>
      <span style="margin: 0 10px;">当前页：{{ currentPage }}</span>
      <el-button type="primary" @click="nextPage">下一页</el-button>
      <footer class="chat-action-footer">
        <span data-v-c1ecf022="" class="footer-text">
          仅供参考<br>数据来自于<a href="https://www.zjzs.net/jsearchfront/search.do?searchid=2&websiteid=331200000000000&cateid=2&tpl=8&pos=title&sortType=2&q=%E5%88%86%E6%95%B0%E7%BA%BF" style="color: blue;" target="_blank">浙江考试院</a></span>
        </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      options: [
        { value: "2024zj", label: "普通考生" },
        { value: "2024zjyishu", label: "艺术生" },
        { value: "2024zjtiyu", label: "体育生" },
      ],
      query: {
        selectedType: '2024zj',
        schoolId: '',
        schoolName: '',
        highScore: '',
        lowScore: '',
        majorName: '',
      },
      results: [],
      currentPage: 1, // 当前页码
      pageSize: 20, // 每页显示条数
    };
  },
  methods: {
    async fetchData() {
      try {
        const params = {
          ...this.query,
          page: this.currentPage,
          pageSize: this.pageSize,
        };
        const response = await axios.get('/api/query', { params });
        this.results = response.data;
      } catch (error) {
        console.error('查询失败:', error);
        this.$message.error('查询失败，请检查输入条件');
      }
    },
    findItem() {
      this.currentPage = 1;
      this.fetchData();
    },
    nextPage() {
      this.currentPage += 1;
      this.fetchData();
      window.scrollTo(0, 0);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.fetchData();
        window.scrollTo(0, 0);
      }
    },
  },
  mounted() {
    // 页面加载时自动获取所有数据
    this.fetchData();
  },
};
</script>

<style scoped>
.el-form {
  max-width: 600px;
  margin: 0 auto;
}

.elLabel {
  align-items: flex-start;
  box-sizing: border-box;
  color: var(--el-text-color-regular);
  display: inline-flex;
  flex: 0 0 auto;
  font-size: var(--el-form-label-font-size);
  height: 32px;
  justify-content: flex-end;
  line-height: 32px;
  padding: 0 12px 0 0;
  margin-left: 52px;
}

.chat-action-footer {
    margin: 0 auto;
    position: relative;
    height: 0;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    opacity: .7;
    width: 100%;
    max-width: 780px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    color: var(--footer-text-color);
}
</style>