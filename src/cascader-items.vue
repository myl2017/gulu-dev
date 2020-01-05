<template>
    <div class="cascaderItem" :style="{height: height}">
        <div>
            <!--selected: {{selected && selected[level] && selected[level].name}}-->
            <!--level: {{level}}-->
            <!--rightItems : {{rightItems}}-->
        </div>
        <div class="left">
            <div class="label" v-for="(item, index) in items" @click="onClickLabel(item)" :key="index">
                {{item.name}}
                <!--<span v-if="item.children"> > </span>-->
                <icon class="icon" v-if="item.children" name="right"></icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-items :items="rightItems" :height="height" :level="level+1" :selected="selected"
                                 @update:selected="onUpdateSelected"></gulu-cascader-items>
        </div>
    </div>
</template>
<script>
    import Icon from './icon.vue'
    export default {
        name: 'GuluCascaderItems',
        components: {Icon},
        props: {
            items: {
                type: Array
            },
            height: {
                type: String
            },
            selected: {
                type: Array,
                default: () => []
            },
            level: {
                type: Number,
                default: 0
            }
        },
//        data () {
//            return {
//                leftSelected: null
//            }
//        },
        computed: {
            rightItems () {
                let currentSelected = this.selected[this.level]
                if (currentSelected && currentSelected.children) {
                    return currentSelected.children
                } else {
                    return null
                }
            }
        },
        methods: {
            onClickLabel(item) {
                //this.selected = [] this.selected[0]
                //this.selected[this.level] = item
                let copy = JSON.parse(JSON.stringify(this.selected)) // 深拷贝
                copy[this.level] = item
                copy.splice(this.level + 1) // 一句话
                this.$emit('update:selected', copy)
                //精髓
//                console.log(this.selected[this.level])
            },
            onUpdateSelected(newSelected) {
                this.$emit('update:selected', newSelected)
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "var";
    .cascaderItem {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        height: 100px;
    /*@include box-shadow2;*/
    .left {
        height: 100%;
        /*padding: .3em 0;*/
        /*@include box-shadow2;*/
        @extend .box-shadow;
        border-radius: $border-radius;
        overflow: auto;
    }
    .right {
        height: 100%;
        border-left: 1px solid $border-color-light;
        /*@include box-shadow2;*/
        /*@extend .box-shadow;*/
    }
    .label {
        padding: .3em 1em;
        white-space: nowrap;
        /*@include box-shadow2;*/
        /*@extend .box-shadow;*/
        display: flex;
        align-items: center;
    .icon {
        margin-left: 1em;
        transform: scale(0.5);
    }
    }
    }
</style>