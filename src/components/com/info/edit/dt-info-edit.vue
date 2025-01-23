<template>
    <dt-info-edit-text
        v-if="option.text"
        :value="
            val === null || val === undefined || val === ''
                ? option.placeholder
                : val
        "
        :option="option.text"
    />
    <div v-else-if="option.topTips" class="top-tips-box">
        <span>
            <!-- <Icon
                style="vertical-align: -8px"
                size="30"
                color="#2D61F4"
                type="ios-list-box-outline"
            /> -->
            {{ option.topTips.text }}
        </span>
    </div>
    <div v-else-if="option.input && option.input.type == 'number'">
        <el-input-number
            :precision="option.input.precision"
            :model-value="val != null ? Number(val) : null"
            :min="option.input.min"
            :max="option.input.max"
            :active-change="false"
            :step="0.01"
            :formatter="
                (value) =>
                    option.input.formatter
                        ? option.input.formatter(value)
                        : value
            "
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            :placeholder="option.placeholder"
            :disabled="option.disabled"
            @update:model-value="onChange"
            :style="option.input.error ? 'border-color: #ed4014;' : ''"
            @on-focus="
                option.input.focus ? option.input.focus(val, option) : func
            "
            @on-blur="option.input.blur ? option.input.blur(val, option) : func"
        />
        <div class="tips" v-html="option.tips"></div>
    </div>
    <div v-else-if="option.input">
        <el-input
            :clearable="option.input.clearable"
            :model-value="val"
            :maxlength="option.input.maxlength"
            :type="option.input.type"
            :rows="option.input.rows"
            :autosize="option.input.autosize"
            :placeholder="option.placeholder"
            :show-word-limit="option.input.showWordLimit"
            :disabled="option.disabled"
            :suffix-icon="option.input.suffixIcon"
            :prefix-icon="option.input.prefixIcon"
            :style="
                option.input.error
                    ? 'border:1px solid #ed4014;border-radius: 4px'
                    : ''
            "
            @update:model-value="onChange"
            @focus="option.input.focus ? option.input.focus(val, option) : func"
            @blur="option.input.blur ? option.input.blur(val, option) : func"
            @change="
                option.input.change ? option.input.change(val, option) : func
            "
        >
            <template #prefix v-if="option.input.prependTxt">{{
                option.input.prependTxt
            }}</template>
            <template #suffix v-if="option.input.appendTxt">{{
                option.input.appendTxt
            }}</template>
        </el-input>
        <div
            class="tips"
            :style="{ color: option.tipsColor }"
            v-html="option.tips"
        ></div>
    </div>
    <div v-else-if="option.date">
        <el-date-picker
            style="width: 100%; box-sizing: border-box"
            ref="date"
            :clearable="option.date.clearable"
            v-model="val"
            :type="option.date.type"
            :placeholder="option.placeholder"
            :options="{ disabledDate: option.date.disabled }"
            :disabled="option.disabled"
            :format="option.date.format"
            :value-format="option.date.valueFormat || 'YYYY-MM-DD'"
            @change="onChange"
            :editable="option.editable || false"
            :teleported="
                option.date.teleported != null ? option.date.teleported : false
            "
        />
        <div class="tips" v-html="option.tips"></div>
    </div>
    <div v-else-if="option.TimePicker">
        <el-time-picker
            ref="date"
            style="width: 100%; box-sizing: border-box"
            :clearable="option.TimePicker.clearable"
            v-model="val"
            :is-range="option.TimePicker.type == 'timerange' ? true : false"
            :placeholder="option.placeholder"
            :disabled-hours="option.TimePicker.disabledH"
            :disabled-minutes="option.TimePicker.disabledM"
            :hide-disabled-options="option.TimePicker.hideDisabled"
            :options="{ disabledDate: option.TimePicker.disabled }"
            :disabled="option.disabled"
            :format="option.TimePicker.format"
            @change="onChange"
            :editable="option.editable || false"
            :teleported="
                option.TimePicker.teleported != null
                    ? option.TimePicker.teleported
                    : false
            "
            append-to="body"
            split-panels
        />
        <div class="tips" v-html="option.tips"></div>
    </div>

    <div v-else-if="option.select" style="width: 100%">
        <el-select
            ref="select"
            :teleported="
                option.select.teleported != null
                    ? option.select.teleported
                    : false
            "
            append-to="body"
            :model-value="toString(val)"
            :multiple="option.select.multiple"
            :clearable="option.select.clearable"
            :placeholder="option.placeholder"
            @change="onChange"
            :remote="option.select.remote ? true : false"
            :remote-method="option.select.remote ? onRemote : null"
            :on-query-change="option.select.query"
            :disabled="option.disabled"
            :filterable="option.select.filterable"
            :loading="option.select.loading"
            :multiple-limit="option.select.multipleLimit"
            :collapse-tags="option.select.collapseTags || true"
            :collapse-tags-tooltip="option.select.collapseTagsTooltip || true"
            :max-collapse-tags="option.select.maxTagCount"
            :no-data-text="option.select.noDataText || '暂无数据'"
            :no-match-text="option.select.noMatchText || '无匹配数据'"
        >
            <el-option
                v-for="item in option.select.options ||
                dictInfoKey(option.select.key)"
                :key="item.key"
                :value="toString(item.key)"
                :label="item.value"
                :disabled="item.disabled"
            />
        </el-select>
        <div class="tips" v-html="option.tips"></div>
    </div>

    <div v-else-if="option.treeSelect">
        <el-tree-select
            ref="treeSelect"
            :show-checkbox="option.treeSelect.showCheckbox"
            :model-value="val"
            :multiple="option.treeSelect.multiple"
            :placeholder="option.placeholder"
            @change="onChange"
            :data="option.treeSelect.data"
        ></el-tree-select>
        <div class="tips" v-html="option.tips"></div>
    </div>

    <div v-else-if="option.radio">
        <el-radio-group :model-value="val" @change="onChange">
            <el-radio
                v-for="item in option.radio.options"
                :key="item.key"
                :disabled="item.disabled || option.disabled"
                :value="item.key"
            >
                {{ item.value }}
            </el-radio>
        </el-radio-group>
    </div>
    <div v-else-if="option.checkbox">
        <el-checkbox-group :model-value="val || []" @change="onChange">
            <el-checkbox
                v-for="item in option.checkbox.options"
                :value="item.key"
                :key="item.key"
                :disabled="item.disabled || option.disabled"
            >
                <span style="marginleft: 5px">{{ item.value }}</span>
            </el-checkbox>
        </el-checkbox-group>
    </div>
    <dt-info-edit-button v-else-if="option.button" :option="option" />

    <div v-else-if="option.tag">
        <template v-if="option.tag.type == 'text'">
            <span
                v-for="tag in option.tag.options"
                :key="tag.key"
                @click="option.tag.click ? option.tag.click(tag) : func"
                style="
                    cursor: pointer;
                    color: #3366ff;
                    text-decoration: underline;
                    margin-right: 16px;
                    display: inline-block;
                "
                :style="option.tag.style"
            >
                {{ tag.value }}
            </span>
        </template>
        <template v-else>
            <el-tag
                v-for="tag in option.tag.options"
                :key="tag.key"
                :closable="option.tag.closable"
                :on-close="option.tag.close"
                @click.native="option.tag.click ? option.tag.click(tag) : func"
                :color="option.tag.color"
                style="cursor: pointer"
                :type="option.tag.type || 'info'"
            >
                {{ tag.value }}
            </el-tag>
        </template>
    </div>

    <!-- <div v-else-if="option.uploadImg" class="upload_img">
        <div class="upload_img_line">
            <Upload
                ref="uploadImg"
                v-show="
                    !info[option.key] ||
                    option.showUploadIcon ||
                    info[option.key]?.length < option.uploadImg.maxlength
                "
                :format="option.uploadImg.format"
                :disabled="
                    option.disabled ||
                    (!!option.uploadImg.percent &&
                        option.uploadImg.percent < 100)
                "
                :on-format-error="onFormatError"
                :action="option.uploadImg.api.reqUrl"
                :name="option.uploadImg.api.data.fileName"
                :multiple="option.uploadImg.multiple"
                :headers="option.uploadImg.api.headers"
                :data="option.uploadImg.api.data"
                :default-file-list="option.uploadImg.files"
                :max-size="option.uploadImg.maxSize"
                :accept="option.uploadImg.accept"
                :on-success="onUploadSuccess"
                :on-remove="onUploadRemove"
                :on-preview="onUploadPreview"
                :on-error="onUploadError"
                :show-upload-list="option.uploadImg.show"
                :before-upload="onUploadBefore"
            >
                <div
                    style="
                        width: 100px;
                        height: 100px;
                        line-height: 100px;
                        text-align: center;
                        border: 1px dashed #dadada;
                        cursor: pointer;
                        margin-right: 10px;
                    "
                >
                    <Icon
                        v-if="
                            !option.uploadImg.percent ||
                            option.uploadImg.percent == 100
                        "
                        type="ios-add"
                        :size="30"
                    />
                    <i-circle
                        v-else
                        :percent="option.uploadImg.percent"
                        :size="70"
                        style="margin-top: 13px"
                    >
                        <span style="font-size: 18px"
                            >{{ option.uploadImg.percent }}%</span
                        >
                    </i-circle>
                </div>
            </Upload>

            <div class="list_img_warp" :style="option.uploadImg.style">
                <div
                    v-for="(item, index) in info[option.key]?.filter(
                        (itm) => itm
                    )"
                    :key="index"
                    class="list_img"
                    @dragstart="dragstart(index)"
                    @dragenter="dragenter($event, index, info[option.key])"
                    @dragover="dragover($event, index)"
                    :draggable="option.uploadImg.drag ? true : false"
                >
                    <div class="demo_upload_list">
                        <img
                            style="object-fit: cover"
                            :src="
                                isVideoUrl(item.url)
                                    ? item.url +
                                      '?x-oss-process=video/snapshot,t_0,m_fast'
                                    : item.url +
                                      '?x-oss-process=image/resize,w_350'
                            "
                        />
                        <div
                            class="demo_upload_list_cover"
                            :style="{
                                background: !isVideoUrl(item.url)
                                    ? ''
                                    : 'transparent',
                            }"
                        >
                            <Icon
                                type="ios-eye-outline"
                                v-if="!isVideoUrl(item.url)"
                                @click.native="
                                    preViewImgFun(info[option.key], index)
                                "
                            ></Icon>
                            <Icon
                                type="md-arrow-dropright-circle"
                                v-if="isVideoUrl(item.url)"
                                @click.native="
                                    preViewImgFun(info[option.key], index)
                                "
                            ></Icon>
                            <Icon
                                type="ios-trash-outline"
                                v-if="!option.uploadImg.hideDel"
                                @click.native="
                                    preViewImgRemove(info[option.key], index)
                                "
                            ></Icon>
                        </div>
                    </div>
                    <div
                        class="list-cover-marker"
                        v-if="option.uploadImg.hasCover"
                    >
                        <Radio
                            class="editBtn"
                            v-model="item.cover"
                            true-value="1"
                            false-value="2"
                            @on-change="handleSetCover(info[option.key], index)"
                            :disabled="option.uploadImg.hideDel"
                        >
                            {{
                                item.cover == 1
                                    ? option.uploadImg.trueRadioTxt
                                    : option.uploadImg.falseRadioTxt
                            }}
                        </Radio>
                    </div>
                    <dt-preview
                        :images="preViewImg"
                        :showDownLoad="option.uploadImg.showDownLoad"
                        :showIndex="showIndex"
                        ref="preViewImage"
                    />
                    <p v-if="item.tip">{{ item.tip }}</p>
                </div>
            </div>
        </div>
        <div style="color: #bebebe">
            {{ option.placeholder }}
        </div>
    </div> -->

    <!-- <div v-else-if="option.upload">
        <Upload
            ref="upload"
            v-show="
                !info ||
                !info[option.key] ||
                !option.upload.maxlength ||
                (option.upload.maxlength &&
                    info[option.key].length < option.upload.maxlength)
            "
            :format="option.upload.format"
            :disabled="option.disabled"
            :on-format-error="onFormatError"
            :action="option.upload.api.reqUrl"
            :name="option.upload.api.data.fileName"
            :multiple="option.upload.multiple"
            :headers="option.upload.api.headers"
            :data="option.upload.api.data"
            :default-file-list="option.upload.files"
            :max-size="option.upload.maxSize"
            :accept="option.upload.accept"
            :on-success="onUploadSuccess"
            :on-remove="onUploadRemove"
            :on-preview="onUploadPreview"
            :show-upload-list="option.upload.show"
            :before-upload="onUploadBefore"
        >
            <Button :disabled="option.upload.disabled">{{
                option.upload.title
            }}</Button>
            <div style="color: #bebebe">
                {{ option.placeholder }}
            </div>
        </Upload>
        <div
            v-if="option.upload.showDel"
            style="max-height: 200px; overflow-y: scroll"
        >
            <div
                v-for="(item, index) in info[option.key]?.filter((itm) => itm)"
                :key="index"
                style="display: flex"
            >
                <p>{{ item.name }}</p>
                <p v-if="item.tip" style="margin-left: 20px">{{ item.tip }}</p>
                <Button
                    type="text"
                    style="color: #2d8cf0"
                    @click="removeFileFun(info[option.key], index)"
                >
                    删除
                </Button>
            </div>
        </div>
    </div> -->

    <el-cascader
        v-else-if="option.cascader"
        :model-value="val || []"
        :props="option.cascader"
        :options="option.cascader.options"
        @change="onChange"
    ></el-cascader>

    <div v-else-if="option.switch">
        <el-switch
            :model-value="val"
            :disabled="option.disabled"
            :size="option.switch.size"
            :active-text="option.switch.openText || '开'"
            :inactive-text="option.switch.closeText || '关'"
            :inline-prompt="option.switch.inlinePrompt || true"
            @change="onChange"
        >
        </el-switch>
        <div
            class="tips"
            :class="option.tipsIsBlock"
            v-html="option.tips"
        ></div>
    </div>

    <dt-info-edit-tree-select
        ref="tree"
        v-else-if="option.tree"
        :model-value="val"
        :treeList="option.tree.options"
        @input="onChange"
        :selectPlaceholder="option.tree.selectPlaceholder"
        :searchFun="option.tree.searchFun"
        :maxTagCount="option.tree.maxTagCount"
        :searchBtn="option.tree.searchBtn"
        :saveAll="option.tree.saveAll"
    />

    <dt-info-edit-date
        ref="dtTime"
        v-else-if="option.dtTime"
        :value="val"
        @input="onChange"
        :transfer="option.dtTime.transfer"
        :clearable="option.dtTime.clearable"
        :dateType="option.dtTime.dateType"
        :dateFormat="option.dtTime.dateFormat"
    />

    <div v-else-if="option.image">
        <div v-if="!val || !val.length">-</div>
        <div style="display: flex; width: 100%; overflow: auto">
            <div v-for="(item, index) in val" :key="item.url">
                <div class="demo_upload_list">
                    <!-- <img
                        style="object-fit: cover"
                        :src="item.url + '?x-oss-process=image/resize,w_350'"
                        :alt="item.alt"
                    /> -->
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="item.url + '?x-oss-process=image/resize,w_350'"
                        :zoom-rate="1.2"
                        :max-scale="7"
                        :min-scale="0.2"
                        fit="cover"
                    >
                        <template #error>
                            <div class="image-slot">
                                <el-icon><Picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
                    <div class="demo_upload_list_cover">
                        <el-icon @click="preViewImgFun(val, index)"
                            ><View
                        /></el-icon>
                    </div>
                </div>

                <p v-if="item.tip">{{ item.tip }}</p>
            </div>
        </div>
        <dt-preview
            :images="preViewImg"
            :showIndex="showIndex"
            ref="preViewImage"
        />
    </div>

    <!-- <div v-else-if="option.file">
        <div v-if="!val || !val.length">-</div>
        <div v-for="(item, index) in val" :key="index" style="display: flex">
            <p>{{ item.name }}</p>
            <p v-if="item.tip" style="margin-left: 20px">{{ item.tip }}</p>
            <Button
                type="text"
                style="color: #2d8cf0"
                @click="() => option.file.click(item)"
                >下载</Button
            >
        </div>
    </div> -->

    <div v-else-if="option.line" class="lineClass"></div>
</template>

<script>
import dt from "@/config/dt";
export default {
    props: {
        option: Object,
        info: Object,
    },
    data() {
        return {
            val: null,
            showIndex: 0,
            preViewImg: [],
            dragIndex: null,
            timeout: null,
        };
    },
    mounted() {
        if (this.option.load) {
            this.option.load(this.option);
        }
        this.update(true);
    },
    watch: {
        option: {
            handler(n, o) {
                if (n.load && n.load != o.load) {
                    n.load(n);
                }
            },
            deep: true,
        },
        info: {
            handler(n) {
                this.update();
            },
            deep: true,
        },
    },
    methods: {
        func() {},
        dictInfoKey(key) {
            return dt.dictInfo()[key];
        },
        update(flag = false) {
            if (this.info) {
                if (this.option.data && this.option.data.from) {
                    let val = this.option.data.from(this.info);
                    if (
                        this.option.select &&
                        this.option.select.remote &&
                        this.val != val
                    ) {
                        this.onRemote(
                            this.option.isBuild
                                ? this.info.housesName
                                : this.info[this.option.key]
                        );
                    }
                    this.val = val;
                } else {
                    if (
                        this.option.select &&
                        this.info[this.option.key] &&
                        !Array.isArray(this.info[this.option.key]) &&
                        !this.option.select.multiple
                    ) {
                        this.info[this.option.key] = String(
                            this.info[this.option.key]
                        );
                    }
                    this.val = this.info[this.option.key];
                }
                if (
                    flag &&
                    ((this.option.date &&
                        this.option.date.type == "daterange") ||
                        this.option.dtTime) &&
                    this.val
                ) {
                    this.onChange(this.val);
                }
            }
        },
        clear() {
            this.val = null;
            if (this.option.select) {
                // this.$refs.select.handleClearClick();
            }
            if (this.option.date) {
                // this.$refs.date.handleClear();
            }
            if (this.option.tree) {
                // this.$refs.tree.resetTreeVal();
            }
        },
        text() {
            let txt = this.val || this.option.placeholder || "";
            if (this.option.text) {
                if (this.option.text.type == "number") {
                    txt = txt.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                if (this.option.text.unit) {
                    txt += this.option.text.unit;
                }
            }
            return txt;
        },
        toString(val) {
            let data = null;
            if (Array.isArray(val)) {
                data = val.map((i) =>
                    typeof i === "number" || typeof i === "boolean"
                        ? String(i)
                        : i
                );
            } else if (typeof val === "number" || typeof val === "boolean") {
                data = String(val);
            } else {
                data = val;
            }
            return data;
        },
        isVideoUrl(url) {
            let videoList = [
                "MP4",
                "TS",
                "MOV",
                "MXF",
                "MPG",
                "FLV",
                "WMV",
                "AVI",
                "M4V",
                "F4V",
                "MPEG",
                "3GP",
                "ASF",
                "MKV",
            ];
            if (url) {
                let arr = url.split(".");
                if (
                    videoList.includes(arr[arr.length - 1]) ||
                    videoList.includes(arr[arr.length - 1].toUpperCase())
                ) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        onChange(val, data) {
            console.log("🚀 ~ onChange ~ val, data:", val, data);
            // val 结果数据 data 较全的数据
            let value = val;
            // 编辑数据（数据较全）
            let editValue =
                this.option.cascader || this.option.tree ? data : val;
            // 处理日期
            if (
                (this.option.date &&
                    this.option.date.type == "daterange" &&
                    this.option.date.type != "datetimerange") ||
                (this.option.dtTime && !this.option.dtTime.dateType)
            ) {
                editValue = dt.tool.handleDateRange(editValue);
            }
            // 处理选择框
            if (editValue && (this.option.select || this.option.cascader)) {
                if (Array.isArray(editValue)) {
                    value = editValue.map((item) => {
                        return item;
                    });
                } else {
                    value = editValue;
                }
            }
            let toData = {};
            if (this.info) {
                if (this.option.data && this.option.data.to) {
                    let opt = null;
                    if (this.option.select) {
                        opt = {};
                        let options =
                            this.option.select.options ||
                            dt.dictInfo()[this.option.select.key];
                        options.some((item) => {
                            if (val && item.key == val.value) {
                                opt = item;
                                return true;
                            }
                            return false;
                        });
                    }
                    toData = this.option.data.to(editValue, opt);
                } else {
                    toData[this.option.key] = value;
                }
                Object.keys(toData).forEach((key) => {
                    this.info[key] = toData[key];
                });
            }
            let change = {
                editValue,
                toData,
                value,
                option: this.option,
                info: this.info,
            };
            this.$emit("change", change);
            if (this.option.change) {
                this.option.change(change);
            }
        },
        onUploadSuccess(res, file, list, fileList) {
            console.log(res, file, list, fileList, "upload");
            if (res.code != "200") {
                console.log(res);
                dt.ui.Message.destroy();
                dt.ui.Message.error(res.msg || "上传失败，请重新上传");
                this.$refs.upload.fileList = [];
            } else {
                this.onChange(list);
                setTimeout(() => {
                    dt.ui.Message.destroy();
                }, 1000);
            }
        },
        onUploadBefore(file) {
            let opt = this.option.upload || this.option.uploadImg;
            let maxSize = opt.maxSize || 20480;
            if (file.size / 1024 > maxSize) {
                let tip =
                    maxSize >= 1048576
                        ? `${Math.floor((maxSize / 1048576) * 10) / 10}G`
                        : `${Math.round(maxSize / 1024)}M`;
                dt.ui.Message.error(`文件大小不能超过${tip}`);
                return false;
            }
            if (
                this.option.upload &&
                this.option.upload.maxlength &&
                this.$refs.upload.fileList.length >=
                    this.option.upload.maxlength
            ) {
                dt.ui.Message.error("文件超多最大限制上传个数");
                return false;
            }
            if (opt.checkFilesLength) {
                this.$refs.uploadImg.fileList = [];
            }
            if (this.option.showUploadIcon) {
                this.$refs.uploadImg.fileList = [];
            }
            if (
                this.option.uploadImg &&
                this.option.uploadImg.maxlength &&
                this.$refs.uploadImg.fileList.length >=
                    this.option.uploadImg.maxlength
            ) {
                dt.ui.Message.error("图片超多最大限制上传个数");
                return false;
            }
            if (opt.before) {
                if (opt.format) {
                    let tmp = file.name.split(".");
                    let ext = tmp[tmp.length - 1];
                    if (opt.format.indexOf(ext) < 0) {
                        this.onFormatError();
                        return false;
                    }
                }
                return opt.before(file);
            }

            dt.ui.Message.loading({
                content: "上传中",
                duration: 0,
            });

            return true;
        },
        onUploadError(error, file, list, fileList) {
            dt.ui.Message.destroy();
            dt.ui.Message.error(error.message || "上传失败，请重新上传");
        },
        onFormatError() {
            dt.ui.Message.destroy();
            let opt = this.option.upload || this.option.uploadImg;
            if (opt.formatErr) {
                opt.formatErr();
            } else {
                dt.ui.Message.error("只支持上传格式: " + opt.format.join(" "));
            }
        },
        onUploadRemove(file, list) {
            this.onChange(list);
        },
        onUploadPreview(file) {
            let opt = this.option.upload || this.option.uploadImg;
            if (opt.preview) {
                if (file.response.code == 200) {
                    file.url = file.response.data.imageURL;
                }
                opt.preview(file);
            }
        },
        onRemote(key) {
            if (this.option.select.remote) {
                this.option.select.remote(key).then((options) => {
                    this.option.select.options = options;
                    this.$forceUpdate();
                });
            }
        },
        post(file) {
            this.$refs.upload.post(file);
        },
        removeFileFun(list, index) {
            dt.ui.Modal.confirm({
                title: "确认删除此附件？",
                onOk: () => {
                    this.$refs.upload.fileList.splice(index, 1);
                    list.splice(index, 1);
                    this.onChange(this.$refs.upload.fileList);
                },
            });
        },
        preViewImgFun(images, index) {
            this.preViewImg = images.map((item) => item.url);
            this.showIndex = index;
            Array.isArray(this.$refs.preViewImage)
                ? this.$refs.preViewImage[0].show()
                : this.$refs.preViewImage.show();
        },
        preViewImgRemove(images, index) {
            let isVideo = this.option.uploadImg?.type == "video";
            dt.ui.Modal.confirm({
                title: `确认删除此${isVideo ? "视频" : "图片"}附件？`,
                onOk: () => {
                    this.$refs.uploadImg.fileList.splice(index, 1);
                    images.splice(index, 1);
                    this.onChange(images);
                },
            });
        },
        handleSetCover(images, index) {
            console.log(images, index);
            images.forEach((item, indexL) => {
                item.cover = "2";
                if (indexL == index) {
                    item.cover = "1";
                }
            });
        },
        dragstart(index) {
            console.log("start index ===>>> ", index);
            this.dragIndex = index;
        },

        // dragenter 和 dragover 事件的默认行为是拒绝接受任何被拖放的元素 因此，我们要在这两个拖放事件中使用`preventDefault`来阻止浏览器的默认行为
        dragenter(e, index, filelist) {
            e.preventDefault();
            this.enterIndex = index;
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
            }
            // 拖拽事件的防抖
            this.timeout = setTimeout(() => {
                if (this.dragIndex !== index) {
                    const source = filelist[this.dragIndex];
                    filelist.splice(this.dragIndex, 1);
                    this.$refs.uploadImg.fileList.splice(this.dragIndex, 1);
                    filelist.splice(index, 0, source);
                    this.$refs.uploadImg.fileList.splice(index, 0, source);
                    this.onChange(filelist);
                    this.dragIndex = index;
                }
            }, 100);
        },
        dragover(e, index) {
            e.preventDefault();
        },
    },
};
</script>

<style>
.lineClass {
    width: 100%;
    height: 1px;
    background-color: #ccc;
}
.ivu-input-number,
.ivu-date-picker {
    width: 100%;
}

.list_img_warp {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
}

.upload_img {
    display: flex;
    flex-direction: column;
}

.upload_img_line {
    display: flex;
    flex-direction: row;
}

.demo_upload_list {
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
}

.list_img {
    display: inline-block;
}

.list-cover-marker {
    line-height: 30px;
    height: 30px;
}

.demo_upload_list img {
    width: 100%;
    height: 100%;
    display: block;
}

.demo_upload_list_cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    /* background-color: transparent; */
}

.demo_upload_list:hover .demo_upload_list_cover {
    display: block;
}

.demo_upload_list_cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}

.ivu-input-number-input[disabled],
.ivu-input[disabled] {
    color: #333;
}

.tips span {
    color: red;
}

.ivu-radio-group-button .ivu-radio-wrapper-disabled.ivu-radio-wrapper-checked {
    border-color: #2d8cf0;
    background-color: #2d8cf0;
    box-shadow: -1px 0 0 0 #2d8cf0;
}
.dt_tips_label_warp {
    background-color: rgba(254, 252, 236, 1);
    width: auto;
    line-height: 32px;
    padding: 10px;
}
.dt_tips_label_warp .tips {
    line-height: 20px;
    font-size: 14px;
    display: flex;
}
.dt_tips_label_warp .tips .tips_icon {
    font-size: 20px;
    color: #0f42a7;
    vertical-align: sub;
}
.top-tips-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px #ccc solid;
    background: #f7f4f4;
    padding: 20px 20px;
    line-height: 30px;
    font-size: 16px;
}
</style>
