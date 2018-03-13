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
        <am-modal :is-show.sync="promptVisbile" :width="width" :close-via-dimmer=false @visible-change="visibleChange">
            <am-modal-header :closeable="eventClick">你都做了什么？</am-modal-header>
            <am-modal-body>
                <am-radio-group v-model="event.backgroundColor">
                    <am-radio style="margin-right: 5px;padding-left: 20px;" :inline=false v-for="(state, index) in states" :key="state.color" :label="state.color"><am-icon type="bell" :style="{color: state.color}"></am-icon> {{state.text}} </am-radio>
                </am-radio-group>
                <am-input v-model="event.title"></am-input>
            </am-modal-body>
            <am-modal-footer>
                <span v-if="eventClick" class="am-modal-btn" @click="remove(event)" style="color: red">删除</span>
                <span v-else class="am-modal-btn" @click="cancel(event)">取消</span>
                <span class="am-modal-btn" @click="sucess(event)">确定</span>
            </am-modal-footer>
        </am-modal>
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
            eventClick: false,
            promptVisbile: false,
            active: false,
            time: '24:00:00',
            startTime: 0,
            endTime: 0,
            title: '',
            event: {
                title: '',
                backgroundColor: ''
            },
            newEvents: [],
            events: [{
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
            states: [{
                color: '#FF2D2D',
                text: '浪费'
            },{
                color: '#FF9224',
                text: '强迫'
            },{
                color: '#9D9D9D',
                text: '低效'
            },{
                color: '#E1E100',
                text: '高效'
            },{
                color: '#2894FF',
                text: '娱乐'
            },{
                color: '#64A600',
                text: '休闲'
            },],
            width: 420
        };
    },
    created() {
        this.init();
    },
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
                let e = {
                    id: new Date().getTime(),
                    start: start.format(),
                    end: end.format(),
                    title: ''
                };
                $('#calendar').fullCalendar('renderEvent', e, true);
                that.event = e;
                that.promptVisbile = true;
            },
            eventClick: function(event, jsEvent, view) {
                that.eventClick = true;
                that.event = event;
                that.promptVisbile = true;
            },
            editable: true,
            eventOverlap: false,
            eventDragStart: function(event, jsEvent, ui, view) {
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
                    let e = {
                        id: new Date().getTime(),
                        start: event.start.format(),
                        end: event.end.format(),
                        title: event.title,
                        backgroundColor: event.backgroundColor
                    };
                    $('#calendar').fullCalendar('renderEvent', e, true);
                }
                // let events = $('#calendar').fullCalendar('getEventSources');
                console.log(event);
            },
            // eventAllow: function(dropInfo, draggedEvent) {
            //     console.log(dropInfo);
            //     console.log(draggedEvent);
            // },
            // eventRender: function(event, element) {
            //     console.log(event);
            //     console.log(element);
            // },
            displayEventTime: true,
            displayEventEnd: true,
            eventLimit: 3,
            events: that.events,
            eventTextColor: '#000000',
            eventBorderColor: '#8E8E8E',
            windowResize: function(view) {
                console.log(view);
            }
        });
    },
    methods: {
        init () {
            let screenWidth = document.body.clientWidth;
            this.width = screenWidth > 512 ? 420 : 230;

            this.event.backgroundColor = this.states[0];
        },
        isBespread(bool) {
            this.active = bool;
        },
        showPrompt() {
            this.promptVisbile = true;
        },
        submitHandle(msg) {
            this.$notify({
                message: '您输入了' + msg
            });
        },
        cancelHandle() {
            this.$notify({
                message: '您点击了取消'
            });
        },
        sucess(event) {
            //this.newEvents.push(event);
            $('#calendar').fullCalendar('removeEvents', event.id);
            $('#calendar').fullCalendar('renderEvent', event, true);
            this.promptVisbile = false;
        },
        cancel(event) {
            $('#calendar').fullCalendar('removeEvents', event.id);
            this.promptVisbile = false;
        },
        remove(event) {
            $('#calendar').fullCalendar('removeEvents', event.id);
            this.promptVisbile = false;
        },
        visibleChange(isShow) {
            if (!isShow && this.eventClick) this.eventClick = false;
        }
    }
};
</script>