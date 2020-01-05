<template>
    <div class="demo" id="app">
        <div style="padding: 20px;">
            <!--<g-cascader :source="source" popover-height="200px" :selected="selected" @update:selected="selected = $event"></g-cascader>-->
            <g-cascader :source.sync="source" popover-height="200px" :selected.sync="selected" :loadData="loadData"></g-cascader>

        </div>
    </div>
</template>
<script>
    import Cascader from './cascader.vue'
    import db from './db'

    function ajax(parentId = 0) {
        return new Promise((success) => {
            setTimeout(() => {
                let result = db.filter((item) => item.parent_id == parentId)
                success(result)
            })
        })
    }

    export default {
        name: 'demo',
        components: {
            'g-cascader': Cascader
        },
        data() {
            return {
                selected: [],
                source: []
            }
        },
        created() {
            ajax(0).then(result => {
                this.source = result
            })
        },
        methods: {
            loadData(item, updateSource) {
                let id = item.id
                ajax(id).then((result) => {
                    updateSource(result) //回调：把别人传给我的函数调用一下
                })
            },
            xxx () {
                ajax(this.selected[0].id).then(result => {
                    let lastLevelSelected = this.source.filter(item => item.id === this.selected[0].id)[0]
                    this.$set(lastLevelSelected, 'children', result)
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :root {
        --button-height: 32px;
        --font-size: 14px;
        --button-bg: white;
        --button-active-bg: #eee;
        --border-radius: 4px;
        --color: #333;
        --border-color: #999;
        --border-color-hover: #666;
    }
    #app {
        margin: 0px;
    }
    body {
        font-size: var(--font-size);
    }
</style>