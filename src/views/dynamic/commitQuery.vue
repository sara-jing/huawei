<template>
  <div>
    <el-table :data="commit" border>
      <el-table-column prop="users.nickname" label="用户名"></el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="urlPath + scope.row.users.avatar" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="answer" label="评论"></el-table-column>
      <el-table-column label="时间">
            <template slot-scope="scope"> 
                <span>{{ scope.row.times | formatTimeAll }}</span>
            </template>
          </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="danger" @click="handlerDeleteCommitBtn(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>

    <el-dialog title="问答删除" :visible.sync="dialogDeleteCommit" width="30%">
      <span>您确定要删除这条问答么</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDeleteCommit = false">取 消</el-button>
         <el-button type="primary" @click="handlerDeleteCommit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { SUCCESS, URLPATH } from "../../config/config";
import { commitShow,commitDestroy } from "../../http/quscommit";
export default {
  data() {
    return {
      urlPath: URLPATH,
      qid: 0,
      id:0,
      commit: [],
      dialogDeleteCommit: false
    };
  },
  methods: {
    initData() {
      commitShow(this.qid)
        .then((res) => {
          console.log(res);
          let { code, msg, data } = res;
          if (code === SUCCESS) {
            this.$message.success(msg);
            this.commit = data.commit;
          } else {
            this.$message.warning(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlerDeleteCommitBtn(id) {
        this.id = id;
        this.dialogDeleteCommit = true;
    },
    handlerDeleteCommit() {
      commitDestroy(this.id).then(res => {
        let {code,msg} = res;
        if(code === SUCCESS) {
          this.$message.success(msg);
          this.dialogDeleteCommit = false;
          this.initData();
        }else{
          this.$message.warning(msg);
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  mounted() {
    let qid = this.$route.query.qid;
    this.qid = qid;
    this.initData();
  },
};
</script>

<style>
</style>