<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
            {{result}}<span>&nbsp;</span>
        </div>
        <div class="popover-wrapper" v-if="popoverVisible">
            <cascader-items :items="source" class="popover" :height="popoverHeight" :selected="selected"
                            @update:selected="onUpdateSelected"></cascader-items>
        </div>
    </div>
</template>
<script>
    import CascaderItems from './cascader-items.vue'
    export default {
        name: 'GuluCascader',
        components: {CascaderItems},
        props: {
            source: {
                type: Array
            },
            popoverHeight: {
                type: String
            },
            selected: {
                type: Array,
                default: () => {
                    return []
                }
            },
            loadData: {
                type: Function
            }
        },
        data() {
            return {
                popoverVisible: false,
//                level1Selected: null,
//                level2Selected: null
            }
        },
//        computed: {
//            level2Items() {
//                if (this.level1Selected) {
//                    return this.level1Selected.children
//                } else {
//                    return []
//                }
//            },
//            level3Items () {
//                if (this.level2Selected) {
//                    return this.level2Selected.children
//                } else {
//                    return []
//                }
//            }
//        },
        methods: {
            onUpdateSelected(newSelected) {
                this.$emit('update:selected', newSelected)
                let lastItem = newSelected[newSelected.length - 1]
                let simplest = (children, id) => {
                    return children.filter(item => item.id === id)[0]
                }
                let complex = (children, id) => {
                    let noChildren = []
                    let hasChildren = []
                    children.forEach(item => {
                        if (item.children) {
                            hasChildren.push(item)
                        } else {
                            noChildren.push(item)
                        }
                    })
                    let found = simplest(noChildren, id)
                    if (found) {
                        return found
                    } else {
                        found = simplest(hasChildren, id)
                        if (found) {
                            return found
                        }
                        else {
                            for (let i = 0; i < hasChildren.length; i++) {
                                found = complex(hasChildren[i].children, id)
                                if (found) {
                                    return found
                                }
                            }
                            return undefined
                        }
//                        return hasChildren.length > 0 ? complex(hasChildren, id) : undefined
                    }
                }
                let updateSource = (result) => {
                    let copy = JSON.parse(JSON.stringify(this.source))
                    let toUpdate = complex(copy, lastItem.id)//this.source.filter(item => item.id === lastItem.id)[0]
                    toUpdate.children = result
                    this.$emit('update:source', copy)
//                    this.$set(toUpdate, 'children', result)
                }
                this.loadData(lastItem, updateSource) //回调：把别人传给我的函数调用一下
                // 调回调的时候传一个函数，这个函数理论应该被调用
            }
        },
        computed: {
            result() {
                return this.selected.map((item) => item.name).join('/')
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "var.scss";

    .cascader {
        position: relative;
    .trigger {
        height: $input-height;
        display: inline-flex;
        align-items: center;
        padding: 0 1em;
        min-width: 10em;
        border: 1px solid $border-color;
        border-radius: $border-radius;
    }
    .popover-wrapper {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        display: flex;
    @extend .box-shadow;
        margin-top: 8px;
    .label {
        white-space: nowrap;
    }
    }
    }
</style>