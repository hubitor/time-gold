<template>
    <div>
        <Header></Header>
        <Sidebar @is-bespread="isBespread"></Sidebar>
        <router-view class="tpl-content-wrapper" :class="{active}"></router-view>
    </div>
</template>

<script>
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default {
    name: 'Home',
    components: {
        Header,
        Sidebar
    },
    data() {
        return {
            active: false,
        };
    },
    methods: {
        isBespread(bool) {
            this.active = bool;
        }
    }
};
</script>