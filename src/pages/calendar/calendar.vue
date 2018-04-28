<template>
    <div>
        <div class="row-content am-cf">
            <div class="tpl-calendar-box">
                <div id="calendar"></div>
            </div>
        </div>
        <am-modal :is-show.sync="promptVisbile" :width="width" :close-via-dimmer=false @visible-change="visibleChange" class="modal" :style="{'margin-top': '-' + (clientY) + 'px'}">
            <am-modal-header :closeable="eventClick">你都做了什么？</am-modal-header>
            <am-modal-body>
                <am-radio-group v-model="event.backgroundColor">
                    <am-radio style="margin-right: 5px;padding-left: 20px;" :inline=false v-for="(state, index) in states" :key="state.color" :label="state.color">
                        <am-icon type="square" :style="{color: state.color}"></am-icon> {{state.text}} </am-radio>
                    <!-- <am-radio style="margin-right: 5px;padding-left: 20px;" :inline=false v-for="(state, index) in states" :key="state.color" :label="state.color">
                                    <am-animation type="spin">
                                        <am-icon type="square" :style="{color: state.color}"></am-icon>
                                    </am-animation>
                                    {{state.text}}
                                </am-radio> -->
                </am-radio-group>
                <am-input v-model="event.title" v-focus="!_isMobile()"></am-input>
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
import uuid from '@/assets/utils/uuid';
export default {
    name: 'Calendar',
    directives: {
        focus: {
            // 指令的定义
            inserted: function(el, binding) {
                if (binding.value) el.focus();
            }
        }
    },
    data() {
        return {
            clientY: 0,
            eventClick: false,
            promptVisbile: false,
            time: '24:00:00',
            startTime: 0,
            endTime: 0,
            dropId: '',
            title: '',
            event: {
                title: '',
                backgroundColor: ''
            },
            newEvents: [],
            events: [
                {
                    title: 'hello',
                    start: '2018-03-08T17:30:00',
                    end: '2018-03-08T18:00:00'
                },
                {
                    title: '工作',
                    start: '2018-03-15T09:30:00',
                    end: '2018-03-15T12:00:00',
                    backgroundColor: '#E1E100'
                },
                {
                    title: '吃饭',
                    start: '2018-03-08T12:00:00',
                    end: '2018-03-08T12:30:00'
                },
                {
                    title: '休息',
                    start: '2018-03-08T12:30:00',
                    end: '2018-03-08T13:30:00'
                }
            ],
            states: [
                {
                    color: '#FF2D2D',
                    text: '浪费'
                },
                {
                    color: '#FF9224',
                    text: '强迫'
                },
                {
                    color: '#9D9D9D',
                    text: '低效'
                },
                {
                    color: '#E1E100',
                    text: '高效'
                },
                {
                    color: '#2894FF',
                    text: '娱乐'
                },
                {
                    color: '#64A600',
                    text: '休闲'
                }
            ],
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
                },
                month: {
                    editable: false
                }
            },
            selectOverlap: false,
            editable: true,
            select: function(start, end) {
                let e = {
                    _id: uuid(),
                    start: start.format(),
                    end: end.format(),
                    title: ''
                };
                $('#calendar').fullCalendar('renderEvent', e, true);
                e.backgroundColor = that.states[0].color;
                that.event = e;
                that.promptVisbile = true;
            },
            eventClick: function(event, jsEvent, view) {
                if (view.name === 'month') return;
                that.eventClick = true;
                that.event = {
                    _id: event._id,
                    start: event.start.format(),
                    end: event.end.format(),
                    title: event.title,
                    backgroundColor: event.backgroundColor
                };
                that.promptVisbile = true;
                that.clientY = jsEvent.screenY;
            },
            eventOverlap: false,
            eventDragStart: function(event, jsEvent, ui, view) {
                that.startTime = event.start.unix();
                that.endTime = event.end.unix();
                that.dropId = event._id;
            },
            eventDrop: function(event, delta, revertFunc) {
                let start = event.start.unix();
                let end = event.end.unix();
                if ((start > that.startTime && start < that.endTime) || (end > that.startTime && end < that.endTime)) {
                    let e = {
                        _id: that.dropId,
                        start: event.start.format(),
                        end: event.end.format()
                    };
                    that.operate(true, e, false, revertFunc);
                } else {
                    revertFunc();
                    let e = {
                        _id: uuid(),
                        start: event.start.format(),
                        end: event.end.format(),
                        title: event.title,
                        backgroundColor: event.backgroundColor
                    };
                    that.operate(false, e, true);
                }
            },
            eventResize: function(event, delta, revertFunc) {
                let e = {
                    _id: event._id,
                    start: event.start.format(),
                    end: event.end.format()
                };
                that.operate(true, e, false, revertFunc);
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
            // events: that.events,
            events: {
                url: 'http://39.106.220.86:7001/time/list',
                type: 'GET'
            },
            eventTextColor: '#000000',
            eventBorderColor: '#8E8E8E'
            // windowResize: function(view) {
            //     console.log(view);
            // }
        });
    },
    methods: {
        init() {
            let screenWidth = document.body.clientWidth;
            this.width = screenWidth > 512 ? 420 : 230;
        },
        showPrompt() {
            this.promptVisbile = true;
        },
        sucess(event) {
            $('#calendar').fullCalendar('removeEvents', event._id);
            this.operate(this.eventClick, event, true);
            this.promptVisbile = false;
        },
        cancel(event) {
            $('#calendar').fullCalendar('removeEvents', event._id);
            this.promptVisbile = false;
        },
        remove(event) {
            this.$http
                .post(`time/remove/${event._id}`)
                .then(message => {
                    $('#calendar').fullCalendar('removeEvents', event._id);
                    this.$notify({
                        message,
                        type: 'success'
                    });
                })
                .catch(() => {
                    this.$notify({
                        message: '信息删除失败！',
                        type: 'error'
                    });
                });
            this.promptVisbile = false;
        },
        visibleChange(isShow) {
            if (!isShow && this.eventClick) this.eventClick = false;
        },
        operate(eventClick, event, refresh, cb) {
            let url = 'time/create';
            if (eventClick) url = `time/modify/${event._id}`;
            this.$http
                .post(url, event)
                .then(message => {
                    console.log(message);
                    if (refresh) $('#calendar').fullCalendar('renderEvent', event, true);
                    this.$notify({
                        message,
                        type: 'success'
                    });
                })
                .catch(() => {
                    if (cb) cb();
                    this.$notify({
                        message: `${this.eventClick ? '信息修改失败！' : '信息录入失败！'}`,
                        type: 'error'
                    });
                });
        },
        _isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
            return flag || false;
        }
    }
};
</script>