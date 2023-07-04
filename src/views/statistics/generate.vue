<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="Date">
        <el-date-picker v-model="day" type="date" placeholder="Select the dates you want to count" value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-button :disabled="btnDisabled" type="primary" @click="generateData()">generate</el-button>
    </el-form>
  </div>
</template>
<script src="../../api/statistics/generate.js"></script>
