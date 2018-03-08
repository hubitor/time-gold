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
            time: '24:00:00',
            startTime: 0,
            endTime: 0,
        };
    },
    created() {},
    mounted() {
        let that = this;
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'agendaDay,agendaWeek,month'
            },
            firstDay: 1,
            // businessHours: [{
            //     dow: [1, 2, 3, 4, 5],
            //     start: '09:30',
            //     end: '18:00'
            // }],
            timeFormat: 'HH:mm',
            slotLabelFormat: 'HH:mm',
            slotLabelInterval: '00:30:00',
            defaultTimedEventDuration: '00:30:00',
            forceEventDuration: true,
            nowIndicator: true,
            allDaySlot: false,
            defaultView: 'agendaDay', // 默认视图,
            minTime: '07:00:00',
            maxTime: '24:00:00',
            height: 'auto',
            fixedWeekCount: false,
            showNonCurrentDates: false,
            slotEventOverlap: false,
            locale: 'zh-cn',
            navLinks: true,
            views: {
                agendaDay: {
                    // titleFormat: 'MMMM D YYYY'
                    selectable: true,
                    selectHelper: true,
                    selectLongPressDelay: 500
                }
            },

            selectOverlap: false,
            select: function(start, end) {
                // var title = prompt('填写你的记录的:');
                // var eventData;
                // if (title) {
                //     eventData = {
                //         title: title,
                //         start: start,
                //         end: end
                //     };
                //     $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                // }
                // $('#calendar').fullCalendar('unselect');
            },

            editable: true,
            eventOverlap: false,
            eventDragStart: function(event) {
                that.startTime = event.start.unix();
                that.endTime = event.end.unix();
            },
            eventDrop: function(event, delta, revertFunc) {
                let start = event.start.unix();
                let end = event.end.unix();
                if ((start > that.startTime && start < that.endTime) || (end > that.startTime && end < that.endTime)) {
                    that.startTime = event.start.unix();
                    that.endTime = event.end.unix();
                } else {
                    revertFunc();
                    $('#calendar').fullCalendar('renderEvent', event, true);
                }

                let events = $('#calendar').fullCalendar('getEventSources');
                console.log(events);
            },

            displayEventTime: true,
            displayEventEnd: true,
            eventLimit: 3,
            events: [
                {
                    title: 'hello',
                    start: '2018-03-08T17:30:00',
                    end: '2018-03-08T18:00:00',
                    editable: true
                },
                {
                    title: '工作',
                    start: '2018-03-08T09:30:00',
                    end: '2018-03-08T12:00:00',
                },
                {
                    title: '吃饭',
                    start: '2018-03-08T12:00:00',
                    end: '2018-03-08T12:30:00',
                },
                {
                    title: '休息',
                    start: '2018-03-08T12:30:00',
                    end: '2018-03-08T13:30:00',
                }
            ],

            windowResize: function(view) {
                console.log(view);
            }

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