<template>
  <div>
    <el-table :data="orderQueryTable" style="width: 100%" border>
      <el-table-column type="index" width="80"></el-table-column>
      <el-table-column label="订单id" prop="oid"></el-table-column>
      <el-table-column label="用户id" prop="uid"></el-table-column>
      <el-table-column label="服装id" prop="cid"></el-table-column>
      <el-table-column label="订单号" prop="onum"></el-table-column>
      <el-table-column label="价格" prop="oprice"></el-table-column>
      <el-table-column label="订单状态" prop="ostate"></el-table-column>
      <el-table-column label="订单创建时间" prop="created_at"></el-table-column>
      <el-table-column label="支付时间" prop="pay_at"></el-table-column>
      <el-table-column label="数据更新时间" prop="update_at"></el-table-column>

      
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handlerOrderDeleteBtn(scope.row.oid)">删除</el-button>
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

    <el-dialog class="order-delete-dialog"
      :visible.sync="orderDeleteDialog"
      width="400px"
      title="轮播删除">
      <span>您确定要删除么</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handlerOrderDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderIndex,orderDestroy } from "../../http/order";
import { SUCCESS, URLPATH } from "../../config/config";
export default {
  data() {
    return {
      // handlerBeforeImageUpload: HandlerBeforeImageUpload,
      urlPath: URLPATH,
      orderQueryTable: [],
      // orderUpdateDialog: false,
      orderDeleteDialog: false,
      // orderUpdateOne: null,
      // orderUpdateRules: {
      //   sthumb: [{ required: true, message: "请选择轮播图", trigger: "blur" }],
      //   ssort: [
      //     {
      //       type: "number",
      //       min: 0,
      //       max: 128,
      //       message: "排序返回为0-127",
      //       trigger: "blur",
      //     }
      //   ]
      // },
      orderDeleteIdx: 0,
      paginate: {
          page: 1,
          limit:4
        },
        total: 0,
    };
  },
  methods: {
    initOrderTable() {
      orderIndex(this.paginate)
        .then((res) => {
          let { code, msg} = res;
          if (code === SUCCESS) {
            this.$message.success(msg);
            // this.orderQueryTable = data;
            let{count,rows}=res.data;
            this.total=count;
            this.orderQueryTable=rows
          } else {
            this.$message.warning(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    // handlerOrderUpdateSuccess(res) {
    //     if(res.code === SUCCESS) {
    //         this.orderUpdateOne.sthumb = res.url;
    //     }
    // },
    // handlerOrderUpdateSubmit() {
    //     this.$refs.orderUpdateForm.validate((valid) => {
    //       if(valid) {
    //         orderUpdate(this.orderUpdateOne.oid,this.orderUpdateOne).then(res => {
    //           let {code, msg} = res;
    //           if(code === SUCCESS) {
    //             this.$message.success(msg);
    //             this.orderUpdateDialog = false;
    //             this.orderQueryTable.map(ele => {
    //               if(ele.oid === this.orderUpdateOne.oid) {
    //                 Object.assign(ele,this.orderUpdateOne);
    //               }
    //             })
    //           }else {
    //             this.$message.warning(msg);
    //           }
    //         })
    //       }else {
    //         return ;
    //       }
    //     })
    // },
    // handlerOrderEditBtn(oid) {
    //     this.orderUpdateDialog = true;

    //     orderShow(oid).then(res => {
    //       let {code, msg, data} = res;
    //       if(code === SUCCESS) {
    //         this.$message.success(msg);
    //         this.orderUpdateOne = data;
    //       }else{
    //         this.$message.warning(msg);
    //       }
    //     }).catch(err => {
    //       console.log(err);
    //     })     
    // },
    handlerOrderDeleteBtn(oid) {
      this.orderDeleteIdx = oid;
      this.orderDeleteDialog = true;
    },
    handlerOrderDelete() {
        orderDestroy(this.orderDeleteIdx).then(res => {
          let { code,msg } = res;
          this.orderDeleteDialog = false;
          this.paginate.page=1
          if(code === SUCCESS) {
            this.$message.success(msg);
            this.orderQueryTable = this.orderQueryTable.filter(ele => ele.oid !== this.orderDeleteIdx);
          }else {
            this.$message.warning(msg);
          }
        }).catch(err => {
          console.log(err);
        })
    },
    
  },
  mounted() {
    this.initOrderTable();
  },
};
</script>

<style>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}