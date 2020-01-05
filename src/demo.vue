<template>
    <div class="demo" id="app">
        <div style="padding: 20px;">
            <!--<g-cascader :source="source" popover-height="200px" :selected="selected" @update:selected="selected = $event"></g-cascader>-->
            <g-cascader :source="source" popover-height="200px" :selected.sync="selected"></g-cascader>

        </div>
    </div>
</template>
<script>
    import Cascader from './cascader.vue'
    import db from './db'

    function ajax(parentId = 0) {
        return db.filter((item) => item.parent_id == parentId)
    }

    export default {
        name: 'demo',
        components: {
            'g-cascader': Cascader
        },
        data() {
            return {
                selected: [],
                source: ajax()
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