<template>
    <div>
        <Header></Header>
        <Sidebar @is-bespread="isBespread"></Sidebar>
        <div class="tpl-content-wrapper" :class="{active}">
            <div class="row-content am-cf">
                <table class="widget am-table am-table-bordered am-table-radius am-table-striped">
                    <thead>
                        <tr>
                            <th>网站名称</th>
                            <th>网址</th>
                            <th>创建时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Amaze UI</td>
                            <td>http://amazeui.org</td>
                            <td>2012-10-01</td>
                        </tr>
                        <tr>
                            <td>Amaze UI</td>
                            <td>http://amazeui.org</td>
                            <td>2012-10-01</td>
                        </tr>
                        <tr class="am-active">
                            <td>Amaze UI(Active)</td>
                            <td>http://amazeui.org</td>
                            <td>2012-10-01</td>
                        </tr>
                        <tr>
                            <td>Amaze UI</td>
                            <td>http://amazeui.org</td>
                            <td>2012-10-01</td>
                        </tr>
                        <tr>
                            <td>Amaze UI</td>
                            <td>http://amazeui.org</td>
                            <td>2012-10-01</td>
                        </tr>
                    </tbody>
                </table>
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
            };
        },
        mounted() {
            this.init();
            console.log(this.fun_date(7));
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
            },
            isBespread(bool) {
                this.active = bool;
            },
            fun_date(aa) {
                let date1 = new Date();
                let date2 = new Date(date1);
                date2.setDate(date1.getDate() + aa);
                let time = date2.getMonth() + 1 + '-' + date2.getDate();
                return time;
            }
        }
    };
</script>