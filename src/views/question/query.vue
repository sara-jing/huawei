<template>
  <div>
    <el-table :data="questionArr" border="">
        <el-table-column prop="users.nickname" label="用户名称" ></el-table-column>
        <el-table-column label="头像">
            <template slot-scope="scope">
                <img :src="urlPath+scope.row.users.avatar" alt="">
            </template>
        </el-table-column>
        <el-table-column prop="questions" label="问题"></el-table-column>
        <el-table-column prop="qviews" label="浏览量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="success" @click="handlerQuestionCommitQuery(scope.row.qid)">查看评论</el-button>
              <el-button type="danger" @click="handlerDeleteQuestionBtn(scope.row.qid)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginate.page"
      :page-sizes="[4,8,10,20]"
      :page-size="paginate.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="问答删除" :visible.sync="dialogDelete" width="30%">
      <span>您确定要删除这条问答么</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDelete = false">取 消</el-button>
         <el-button type="primary" @click="handlerDeleteQuestion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { SUCCESS,URLPATH } from '../../config/config'
import {questionIndex,questionDistroy } from '../../http/question'
export default {
    data() {
      return {
        urlPath:URLPATH,
        paginate: {
          page: 1,
          limit:4
        },
        total: 0,
        questionArr: [],
        deleteIdx: 0,
        dialogDelete:false
      }
    },
    methods: {
      initData() {
        questionIndex(this.paginate).then(res => {
          let {code,msg} = res;
          if(code === SUCCESS) {
            this.$message.success(msg);
            let { count,rows } = res.data;
            this.total = count;
            this.questionArr = rows;
          }else {
            this.$message.warning(msg);
          }
         }).catch(err => {
          console.log(err);
        })
      },
      handleSizeChange(val) {
        this.paginate.page = 1;
        this.paginate.limit = val;
        this.initData();
      },
      handleCurrentChange(val) {
        this.paginate.page = val;
        this.initData();
      },
      handlerDeleteQuestionBtn(idx) {
        this.deleteIdx = idx;
        this.dialogDelete = true;
      },
      handlerDeleteQuestion() {
        questionDistroy(this.deleteIdx).then(res => {
          let {code,msg} = res;
          if(code === SUCCESS) {
            this.$message.success(msg);
            this.dialogDelete = false;
            this.paginate.page = 1;
            this.initData();
          }else{
            this.$message.warning(msg);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handlerQuestionCommitQuery(qid) {
        this.$router.push({name: 'questioncommit',query:{qid}})
      }
    },
    mounted() {
      this.initData();
    }
}
</script>

<style>

</style>