<template>
    <!--大图-->
    <el-dialog
        v-model="showModal"
        title=""
        :footer-hide="true"
        class="preview-modal"
        width="100%"
        top="0vh"
        :show-close="false"
    >
        <div class="box" @click="hide">
            <div
                class="large-img"
                ref="largeImg"
                :style="{
                    transform:
                        'rotate(' + imgDeg + 'deg) scale(' + zoomNum + ')',
                }"
                v-if="imgData && imgData[curIndex] && showModal"
                @click.stop="returnFun"
            >
                <video
                    v-if="isVideoUrl(imgData[curIndex].src)"
                    style="width: 100%"
                    :src="imgData[curIndex].src"
                    autoplay
                    controls
                />
                <div v-else>
                    <img
                        :key="curIndex"
                        :src="imgData[curIndex].src"
                        loading="eager"
                        alt="加载中"
                    />
                    <div
                        style="
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            top: 0;
                        "
                    />
                </div>
            </div>
            <div class="operate-icon" @click.stop="returnFun">
                <el-icon
                    color="#fff"
                    :size="34"
                    @click="preImg"
                    class="hand"
                    v-if="!preNextFlag"
                    ><Back
                /></el-icon>
                <!-- <Icon
                    type="ios-arrow-back"
                    color="#fff"
                    :size="34"
                    @click="preImg"
                    class="hand"
                    v-if="!preNextFlag"
                /> -->
                <!-- <Icon
                    type="md-remove-circle"
                    color="#fff"
                    :size="34"
                    @click="rollSmall"
                    class="hand"
                />
                <Icon
                    type="md-refresh"
                    color="#fff"
                    :size="34"
                    @click="rotateLeftImg"
                    class="hand left-icon"
                />
                <Icon
                    type="md-cloud-download"
                    color="#fff"
                    :size="34"
                    @click="downLoadImg"
                    class="hand"
                    v-show="showDownLoad"
                />
                <Icon
                    type="md-refresh"
                    color="#fff"
                    :size="34"
                    @click="rotateRightImg"
                    class="hand"
                />
                <Icon
                    type="md-add-circle"
                    color="#fff"
                    :size="34"
                    @click="rollLarge"
                    class="hand"
                />
                <Icon
                    type="ios-arrow-forward"
                    color="#fff"
                    :size="34"
                    @click="nextImg"
                    class="hand"
                    v-if="!preNextFlag"
                /> -->
            </div>
        </div>
    </el-dialog>
</template>
<script>
import dt from "@/config/dt";

export default {
    name: "previewImage",
    props: {
        images: {
            // 图片
            type: Array,
            default: function () {
                return [];
            },
        },
        showDownLoad: {
            // 是否展示下载
            type: Boolean,
            default: false,
        },
        showIndex: {
            // 是否展示
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            showModal: false,
            curIndex: 0,
            imgDeg: 0,
            zoomNum: 0.2,
            style: null, //
            imgSize: "90%",
            imgData: [],
            preNextFlag: false,
        };
    },
    watch: {
        images(val) {
            this.imgData = [];
            val.forEach((item, idx) => {
                let img = new Image();
                img.src = item;
                img.isLoad = false;
                img.onload = () => {
                    img.isLoad = true;
                    if (idx == this.curIndex) {
                        this.$forceUpdate();
                    }
                };
                this.imgData.push(img);
            });
        },
        showIndex(val, oldVal) {
            this.curIndex = val;
        },
        zoomNum(val, oldVal) {
            this.$nextTick(function () {
                if (val <= 1 && this.$refs.largeImg) {
                    this.$refs.largeImg.style.left = null;
                    this.$refs.largeImg.style.top = null;
                }
            });
        },
    },
    mounted() {
        let browserType = dt.tool.getBrowserType();
        if (browserType === "Chrome" || browserType.includes("IE")) {
            // chrome and ie
            window.addEventListener("mousewheel", this.rollImg, false);
        } else {
            // firefox
            window.addEventListener("DOMMouseScroll", this.rollImg, false);
        }
    },
    beforeDestroy() {
        let browserType = dt.tool.getBrowserType();
        if (browserType === "Chrome" || browserType.includes("IE")) {
            // chrome and ie
            window.removeEventListener("mousewheel", this.rollImg, false);
        } else {
            // firefox
            window.removeEventListener("DOMMouseScroll", this.rollImg, false);
        }
    },
    methods: {
        returnFun() {
            return false;
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
        show(val) {
            console.log(this.images, this.showIndex, "1122");
            this.preNextFlag = val;
            this.showModal = true;
            this.imgDeg = 0;
            this.curIndex = this.showIndex;
            this.imgSize = "90%";
            this.zoomNum = 0.2;
            let timer = null;
            let width = 0;
            let height = 0;
            this.$nextTick(function () {
                this.mouseFun();
                timer = setInterval(() => {
                    let img = this.imgData[this.curIndex];
                    // （1）如果值为0说明还没加载回来,不执行任何操作,让定时器再次执行
                    // （2）如果值不为0说明已经加载回来了,清除定时器,然后执行接下来的操作
                    if (img.height) {
                        clearInterval(timer);
                        timer = null;
                        width = img.width;
                        height = img.height;
                        this.zoomNum =
                            width > 2000 || height > 2000
                                ? this.zoomNum
                                : this.zoomNum + 0.3;
                    }
                }, 1);
            });
        },
        mouseFun() {
            let _this = this;
            var boxer = this.$refs.largeImg; // 当前图片
            if (boxer) {
                boxer.style.left = null;
                boxer.style.top = null;

                if (this.isVideoUrl(this.imgData[this.curIndex].src)) {
                    this.zoomNum = 0.5;
                }

                var box = document.querySelector(".box"); // 拖动容器
                //绑定按下事件
                boxer.onmousedown = function (event) {
                    var event = event || window.event; //event的兼容,同时得到clientX,的值
                    event.preventDefault();

                    var x = event.clientX - boxer.offsetLeft;
                    var y = event.clientY - boxer.offsetTop; //偏移量

                    // 将移动事件绑定到 document 上
                    document.onmousemove = function (event) {
                        var xx = event.clientX - x; //当移动的时候，用它的鼠标值减去偏移量
                        var yy = event.clientY - y;

                        boxer.style.left = xx + "px";
                        boxer.style.top = yy + "px";
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null; //鼠标抬起时，清空
                        boxer.onmouseup = null;
                    };
                };
            }
        },
        hide() {
            this.showModal = false;
        },
        preImg() {
            this.imgSize = "90%";
            if (this.curIndex > 0) {
                this.zoomNum = 0.2;
                this.imgDeg = 0;
            }
            this.curIndex <= 0
                ? dt.ui.Message.info("已是第一张图片")
                : this.curIndex--;

            this.$nextTick(function () {
                this.mouseFun();
            });
        },
        nextImg() {
            this.imgSize = "90%";
            if (this.curIndex < this.images.length - 1) {
                this.zoomNum = 0.2;
                this.imgDeg = 0;
            }
            this.curIndex >= this.images.length - 1
                ? dt.ui.Message.info("已是最后一张图片")
                : this.curIndex++;

            this.$nextTick(function () {
                this.mouseFun();
            });
        },
        /**
         * 下载图片
         */
        downLoadImg() {
            let url = this.imgData[this.curIndex].src;
            let name = url.split("/").pop();
            var link = document.createElement("a");
            if (name.indexOf(".") < 0) {
                name += ".png";
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "blob";
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        link.href = window.URL.createObjectURL(xhr.response);
                        link.download = name;
                        link.click();
                        this.$nextTick(() => {
                            dt.ui.Message.destroy();
                            dt.ui.Message.info("下载完成");
                        });
                    } else {
                        dt.ui.Message.destroy();
                        dt.ui.Message.error("下载失败");
                    }
                };
                xhr.send();
                dt.ui.Message.loading("下载中");
            } else {
                link.href = `${url}?response-content-type=application/octet-stream`;
                link.download = "";
                link.click();
            }
        },
        // 旋转图片
        rotateRightImg() {
            this.imgDeg += 90;
        },
        rotateLeftImg() {
            this.imgDeg -= 90;
        },
        // 放大
        rollLarge() {
            this.imgSize = "none";
            if (this.zoomNum >= 2) {
                this.zoomNum = 2;
                return false;
            }
            this.zoomNum = dt.tool.floatRound((this.zoomNum += 0.1), 1);
        },
        // 缩小
        rollSmall() {
            this.imgSize = "none";
            if (this.zoomNum <= 0.1) {
                this.zoomNum = 0.1;
                return false;
            }
            this.zoomNum = dt.tool.floatRound((this.zoomNum -= 0.1), 1);
        },
        // 缩放图片
        rollImg(event) {
            if (!this.showModal) return false;
            // 阻止冒泡,避免缩放时触发移动事件
            event.stopPropagation();
            this.imgSize = "none";
            /* event.wheelDelta 其中正数表示为向上滚动，负数表示向下滚动 */
            console.log(event.wheelDelta, "event");
            console.log(event.deltaY, "event");
            console.log(event.detail, "event");

            let wheelDeltaNum = event.wheelDelta
                ? event.wheelDelta
                : event.detail;

            if (wheelDeltaNum < 0) {
                if (this.zoomNum <= 0.1) {
                    this.zoomNum = 0.1;
                    return false;
                }
                this.zoomNum = dt.tool.floatRound((this.zoomNum -= 0.1), 1);
            } else {
                if (this.zoomNum >= 2) {
                    this.zoomNum = 2;
                    return false;
                }
                this.zoomNum = dt.tool.floatRound((this.zoomNum += 0.1), 1);
            }

            return false;
        },
    },
};
</script>
<style lang="scss">
.preview-modal {
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    background: transparent;
}

.preview-modal {
    position: fixed;

    .ivu-modal-content {
        width: 100%;
        height: 100%;
        background: rgba(51, 51, 51, 0);
        box-shadow: 0 0 0 rgb(0, 0, 0);
    }

    .el-dialog__body {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ivu-modal-close {
        z-index: 99999;

        .ivu-icon-ios-close {
            font-size: 50px;
            font-weight: bolder;
            color: #fff;
        }
    }
}

.box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.large-img {
    z-index: 999;
    cursor: pointer;
    position: absolute;
    margin: auto;
    transition: all 0.25s ease-in-out;
}

.operate-icon {
    z-index: 999;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 100px;
    width: 400px;
    border-radius: 10px;
    text-align: center;
    background-color: rgba(51, 51, 51, 0.6);
}

.left-icon {
    transform: rotateY(180deg);
}
</style>
