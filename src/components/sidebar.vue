<template>
    <!-- 侧边导航栏 -->
    <div class="left-sidebar" :class="{active}">
        <!-- 菜单 -->
        <ul class="sidebar-nav">
            <li class="sidebar-nav-heading">Components <span class="sidebar-nav-heading-info"> 附加组件</span></li>
            <li class="sidebar-nav-link">
                <router-link :to="{name: 'calendar'}" exact-active-class="active">
                    <i class="am-icon-home sidebar-nav-link-logo"></i> 首页
                </router-link>
            </li>
            <li class="sidebar-nav-link">
                <router-link :to="{name: 'time'}" exact-active-class="active">
                    <i class="am-icon-table sidebar-nav-link-logo"></i> 表格
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            active: false,
            screenWidth: document.body.clientWidth
        };
    },
    created() {
        this.autoLeftNav();
        global.bus.$on('is-show', () => {
            this.active = !this.active;

            if (this.screenWidth > 1024) {
                this.$emit('is-bespread', this.active);
            }
        });
    },
    mounted() {
        const that = this;
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                that.screenWidth = window.screenWidth;
            })();
        };
    },
    methods: {
        autoLeftNav() {
            if (this.screenWidth < 1024) this.active = true;
            else this.active = false;
        }
    },
    watch: {
        screenWidth(val) {
            if (!this.timer) {
                this.screenWidth = val;
                this.timer = true;
                let that = this;
                setTimeout(function() {
                    // that.screenWidth = that.$store.state.canvasWidth
                    that.autoLeftNav();
                    that.timer = false;
                }, 200);
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>