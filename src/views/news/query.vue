<template>
  <div>
      <el-table :data="newsTable" style="width: 800px" :row-class-name="tableRowClassName" border="">
          <el-table-column
            type="index"
            width="100">
          </el-table-column>
          <el-table-column label="咨询内容" prop="content"></el-table-column>
          <el-table-column label="发布时间">
            <template slot-scope="scope"> 
                <span>{{ scope.row.times | formatTimeAll }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="warning" @click="handlerNewsEditBtn(scope.row.nid)">编辑</el-button>
                <el-button type="danger" @click="handlerNewsDeleteBtn(scope.row.nid)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-dialog :visible.sync="editNewsDialog" title="咨询编辑" width="30%">
          <el-form :model="newsOne" :rules="newsRules" ref="editNewsForm" v-if="newsOne">
            <el-form-item label="咨询内容" prop="content">
              <el-input v-model="newsOne.content"></el-input>
            </el-form-item>
            <el-button @click="handlerUpdateNewsSubmit" type="primary">提交</el-button>
          </el-form>
      </el-dialog>
      <el-dialog :visible.sync="deleteNewsDialog" title="咨询删除" width="30%">
          <span>您确定要删除这条咨询么</span>
           <span slot="footer" class="dialog-footer">
            <el-button @click="deleteNewsDialog = false">取 消</el-button>
            <el-button type="primary" @click="handlerDeleteNews">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
import { SUCCESS } from '../../config/config'
import { newsIndex,newsShow,newsUpdate,newsDestroy } from '../../http/news'
export default {
    data() {
      return {
        newsTable: [],
        newsOne:null,
        editNewsDialog: false,
        deleteNewsDialog: false,
        newsDeleteIdx:0,
        newsRules: {
              content: [{required:true,message: '必填',trigger: 'blur'}]
        }
      }
    },
    methods: {
      tableRowClassName({ rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      initData() {
        newsIndex().then(res => {
          let {code,msg,data} = res;
          if(code === SUCCESS) {
            this.newsTable = data;
          }else {
            this.$message.warning(msg);
          }
        }).catch(err => {
          console.log(err);
        })
      },
     handlerNewsEditBtn(nid) {
       this.editNewsDialog = true;
       newsShow(nid).then(res => {
         let {code,msg,data} = res;
         if(code === SUCCESS) {
           console.log(data);
            this.newsOne = data;  
         }else{
           this.$message.warning(msg);
         }
       }).catch(err=> {
         console.log(err);
       })
     },
     handlerNewsDeleteBtn(nid) {
        this.newsDeleteIdx = nid;
        this.deleteNewsDialog = true;

     },
     handlerUpdateNewsSubmit() {
       this.$refs.editNewsForm.validate((valid) => {
         if(!valid) return;
         newsUpdate(this.newsOne.nid,this.newsOne).then(res => {
            let { code,msg } = res;
            if(code === SUCCESS) {
              this.$message.success(msg);
              this.newsTable.map(ele => {
                if(ele.nid === this.newsOne.nid) {
                  Object.assign(ele,this.newsOne);
                  return ele;
                }
              })
              this.editNewsDialog = false;
            }else{
              this.$message.warning(msg);
            }  
         }).catch(err => {
           console.log(err);
         })
       })
     },
     handlerDeleteNews() {
       newsDestroy(this.newsDeleteIdx).then(res => {
          let { code,msg } = res;
          if(code === SUCCESS) {
            this.$message.success(msg);
            let table = this.newsTable.filter(ele => ele.nid !== this.newsDeleteIdx);
            this.newsTable = table;
            this.deleteNewsDialog = false;
          }else{
            this.$message.warning(msg);
          }
       }).catch(err => {
         console.log(err);
       })
     }
    },
    mounted() {
      this.initData();
    }
}
</script>

<style>
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>