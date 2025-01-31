<template>
    <div>
        <el-row>
            <el-col :span="11">
                <el-date-picker
                    :type="dateType"
                    :transfer="transfer"
                    placeholder="开始日期"
                    :clearable="clearable"
                    v-model="startTime"
                    :disabled-date="startOption.disabledDate"
                    @change="dateChange"
                />
            </el-col>
            <el-col :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
                <el-date-picker
                    :type="dateType"
                    :transfer="transfer"
                    placeholder="结束日期"
                    :clearable="clearable"
                    :disabled-date="endOption.disabledDate"
                    v-model="endTime"
                    @change="dateChange"
                />
            </el-col>
        </el-row>
    </div>
</template>
<script>
import moment from "moment";
export default {
    props: {
        clearable: {
            type: Boolean,
            default: false,
        },
        dateType: {
            type: String,
            default: "date",
        },
        dateFormat: {
            type: String,
            default: "YYYY-MM-DD",
        },
        transfer: {
            type: Boolean,
            default: true,
        },
        value: {
            type: Array,
            default: () => {
                return [];
            },
        },
        isStartOption: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        value: {
            handler(val, oldVal) {
                this.startTime = val && val.length ? val[0] : "";
                this.endTime = val && val.length ? val[1] : "";
            },
            deep: true,
        },
    },
    data() {
        return {
            startTime: "",
            endTime: "",
            startOption: {
                // 指定开始限制时间
                disabledDate: (date) => {
                    if (this.isStartOption) {
                        let data =
                            this.endTime == ""
                                ? Date.now()
                                : new Date(this.endTime);
                        return date > data;
                    } else {
                        return false;
                    }
                },
            },
            endOption: {
                // 指定终止日期
                disabledDate: (date) => {
                    // 考虑月份的情况
                    let data =
                        this.startTime == ""
                            ? ""
                            : this.dateType == "date"
                            ? new Date(this.startTime)
                            : moment(new Date(this.startTime));
                    return date < data;
                },
            },
        };
    },
    methods: {
        dateChange(val) {
            this.startTime =
                this.startTime != ""
                    ? moment(this.startTime).format(this.dateFormat)
                    : "";
            console.log("🚀 ~ dateChange ~ this.startTime:", this.startTime);

            this.endTime =
                this.endTime != ""
                    ? moment(this.endTime).format(this.dateFormat)
                    : "";
            if (this.startTime.toString() == "Invalid date") this.endTime = "";
            let checkTime = [this.startTime, this.endTime];
            this.$emit("input", checkTime); //更新父级组件的value
            this.$emit("onChange");
        },
    },
};
</script>
<style scoped>
:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
    width: 100%;
}
</style>
