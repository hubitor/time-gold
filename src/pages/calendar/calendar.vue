<template>
    <div>
        <Header></Header>
        <Sidebar @is-bespread="isBespread"></Sidebar>
        <div class="tpl-content-wrapper" :class="{active}">
            <div class="row-content am-cf">
                <div class="tpl-calendar-box">
                    <div id="calendar"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default {
    name: 'Calendar',
    components: {
        Header,
        Sidebar
    },
    data() {
        return {
            active: false,
        };
    },
    created() {},
    mounted() {
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            firstDay: 1,
            allDaySlot: false,
            defaultView: 'agendaDay', // 默认视图,
            minTime: '07:00:00',
            maxTime: '24:00:00',
  
            views: {
                agendaDay: {
                    // titleFormat: 'MMMM D YYYY'
                }
            },

            // navLinks: true, // can click day/week names to navigate views
            // selectable: true,
            // selectHelper: true,
        });
    },
    methods: {
        isBespread(bool) {
            this.active = bool;
        }
    }
};
</script>