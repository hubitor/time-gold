<template>
    <div>
        <Header></Header>
        <Sidebar @is-bespread="isBespread"></Sidebar>
        <div class="tpl-content-wrapper" :class="{active}">
            <div class="row-content am-cf">
                <div class="widget am-cf">
                    <div class="widget-head am-cf">
                        <div class="widget-title am-fl">自适应表格</div>
                        <div class="widget-function am-fr">
                            <a href="javascript:;" class="am-icon-cog"></a>
                        </div>
                    </div>
                    <div class="widget-body  widget-body-lg am-fr">
                        <table id="example" width="100%" class="am-table am-table-bordered am-table-radius am-table-striped am-table-compact tpl-table-black am-text-nowrap">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th v-for="day in days">{{day}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(time, val) in times">
                                    <td>{{time}}</td>
                                    <td v-for="day in days">{{contents[day] && contents[day][val] && contents[day][val]['text']}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default {
    name: 'Time',
    components: {
        Header,
        Sidebar
    },
    data() {
        return {
            active: false,
            month: 0,
            date: 0,
            sunday: undefined,
            monday: undefined,
            tuesday: undefined,
            wednesday: undefined,
            thursday: undefined,
            friday: undefined,
            saturday: undefined,
            days: [],
            times: [
                '7:00-7:30',
                '7:30-8:00',
                '8:00-8:30',
                '8:30-9:00',
                '9:00-9:30',
                '9:30-10:00',
                '10:00-10:30',
                '10:30-11:00',
                '11:00-11:30',
                '11:30-12:00',
                '12:00-12:30',
                '12:30-13:00',
                '13:00-13:30',
                '13:30-14:00',
                '14:00-14:30',
                '14:30-15:00',
                '15:00-15:30',
                '15:30-16:00',
                '16:00-16:30',
                '16:30-17:00',
                '17:00-17:30',
                '17:30-18:00',
                '18:00-18:30',
                '18:30-19:00',
                '19:00-19:30',
                '19:30-20:00',
                '20:00-20:30',
                '20:30-21:00',
                '21:00-21:30',
                '21:30-22:00',
                '22:00-22:30',
                '22:30-23:00',
                '23:00-23:30',
                '23:30-24:00',
            ],
            contents: {
                '2018/3/5': {
                    0: {
                        text: 123
                    },
                    1: {
                        text: 'haha'
                    }
                },
                '2018/3/6': {
                    10: {
                        text: 333
                    }
                }
            }
        };
    },
    created() {
        this.init();
    },
    mounted() {
        $('#example').DataTable({
            bInfo: false, //页脚信息
            dom: 'ti',
            responsive: true,
            paging: false,
            searching: false,
            ordering: false
        });
    },
    methods: {
        init() {
            let dayArr = [1, 2, 3, 4, 5, 6, 7];
            let date = new Date();
            let day = date.getDay();
            let newDayArr = dayArr.map(m => m - day);
            newDayArr.forEach(e => {
                let _date = new Date(date);
                _date.setDate(date.getDate() + e);
                let _day = _date.getDay();
                switch (_day) {
                case 0:
                    this.sunday = _date;
                    break;
                case 1:
                    this.monday = _date;
                    break;
                case 2:
                    this.tuesday = _date;
                    break;
                case 3:
                    this.wednesday = _date;
                    break;
                case 4:
                    this.thursday = _date;
                    break;
                case 5:
                    this.friday = _date;
                    break;
                case 6:
                    this.saturday = _date;
                    break;
                }
            });
            this.days = [
                this.monday.toLocaleDateString(),
                this.tuesday.toLocaleDateString(),
                this.wednesday.toLocaleDateString(),
                this.thursday.toLocaleDateString(),
                this.friday.toLocaleDateString(),
                this.saturday.toLocaleDateString(),
                this.sunday.toLocaleDateString()
            ];
        },
        isBespread(bool) {
            this.active = bool;
        }
    }
};
</script>