// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
export class MyDatetime {
    private date: Date;

    constructor() {
        this.date = new Date();
    }

    // 调用：
    // var time1 = new Date().Format("yyyy-MM-dd");
    // var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
    public format(fmt: string): string {
        let o = {
            "M+": this.date.getMonth() + 1, //月份
            "d+": this.date.getDate(),      //日
            "h+": this.date.getHours(),     //小时
            "m+": this.date.getMinutes(),   //分
            "s+": this.date.getSeconds(),   //秒
            "q+": Math.floor((this.date.getMonth() + 3) / 3), //季度
            "S": this.date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    public addMinutes(mins: number) {
        this.date.setMinutes(this.date.getMinutes() + mins);
    }

    public addHours(hours: number) {
        this.date.setHours(this.date.getHours() + hours);
    }

    public addDays(days: number) {
        this.date.setDate(this.date.getDate() + days);
    }

    public addWeeks(weeks: number) {
        this.addDays(weeks * 7);
    }

    public addMonths(months: number) {
        var d = this.date.getDate();
        this.date.setMonth(this.date.getMonth() + months);

        if (this.date.getDate() < d) {
            this.date.setDate(0);
        }
    }

    public addYears(years: number) {
        var m = this.date.getMonth();
        this.date.setFullYear(this.date.getFullYear() + years);

        if (m < this.date.getMonth()) {
            this.date.setDate(0);
        }
    }

}