<template>
    <div v-if="websiteInfoQuery" style="padding: 40px">
        <el-descriptions class="margin-top" title="网站信息查看" :column="3"  border>
            <template slot="extra">
                <el-button @click="websiteInfoEditBtn">编辑</el-button>
            </template>
            <el-descriptions-item>
                <template slot="label">网站名称</template>
                <div style="height: 80px">{{ websiteInfoQuery.wname }}</div>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">网站关键字</template>
                 {{ websiteInfoQuery.wkeywords }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">网站描述</template>
                {{ websiteInfoQuery.wdesc }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">网站logo</template>
                <img height="100" :src="urlPath + websiteInfoQuery.wlogo " alt="">
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">wx码</template>
                <img height="100" :src="urlPath + websiteInfoQuery.wwx " alt="">
            </el-descriptions-item>
             <el-descriptions-item>
                <template slot="label">地址</template>
                {{ websiteInfoQuery.waddress }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">联系方式</template>
                <div style="height: 80px">{{ websiteInfoQuery.wtel }}</div>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">版权信息</template>
                {{ websiteInfoQuery.wcopy }}
            </el-descriptions-item>

        </el-descriptions>
    </div>
</template>
<script>
import { websiteInfoIndex } from '../../http/websiteinfo';
import { SUCCESS,URLPATH } from '../../config/config'; 
export default {
    data() {
        return {
            websiteInfoQuery: null,
            urlPath: URLPATH
        }
    },
    methods: {
        initWebsiteInfo() {
            websiteInfoIndex().then(res => {
                let { code,msg,data } = res;
                if(code === SUCCESS && data){
                    this.$message.success(msg);
                    this.websiteInfoQuery = data;
                }else {
                    this.$message.warning(msg);
                }
            }).catch(err => {
                console.log(err);
            }) 
        },
        websiteInfoEditBtn() {
            this.$router.push({name: 'websiteupdate'});
        }
    },
    mounted() {
        this.initWebsiteInfo();
    }    
}
</script>
<style scoped>

</style>