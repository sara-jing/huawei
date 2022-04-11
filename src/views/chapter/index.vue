<template>
    <div>
        <div class="chapter-nav">
             <router-link :to="{name: 'chapterquery',query: {cid: $route.query.cid}}"><el-button type="primary">章节查看</el-button></router-link>
            <router-link :to="{name: 'chapterinsert',query: {cid: $route.query.cid}}"><el-button type="success">章节添加</el-button></router-link>
        </div>
     
       <router-view></router-view>
    </div>    
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        let cid = this.$route.query.cid;
        this.$router.push({name: 'chapterquery', query: {cid}});
    }
}
</script>
<style>
    .chapter-nav {
        margin: 20px 0 30px 0;
    }
</style>