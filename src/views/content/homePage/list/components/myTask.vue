<!-- 我的任务 -->
<template>
	<div class="banner-right">
		<h3 class="sub-title">我的任务</h3>
		<el-row :gutter="10">
			<el-col class="banner-task" :span="8">
				<div class="banner-task-inner">
					<div class="banner-task-detail">
						<h4 class="sub-title2">
							未处理<span class="flag-icon"><i class="iconfont claim-icon-time"></i></span>
						</h4>
						<div v-for="(item, i) in staticTask" :key="i">
							<a class="opera" v-if="i <= 2"
								>{{ item.curtTaskName }}<span class="num">{{ item.total }}</span></a
							>
							<template v-if="undoState">
								<a class="opera" v-if="i > 2"
									>{{ item.curtTaskName }}<span class="num">{{ item.total }}</span></a
								>
							</template>
						</div>
						<p class="more-item">
							共{{ staticTaskNum }}
							<a class="more" @click="toggleState('undoState')" v-if="moreState">更多</a>
							<a class="more" @click="toggleState('undoState')" v-if="takeState">收回</a>
						</p>
					</div>
				</div>
			</el-col>
			<el-col class="banner-task" :span="8">
				<div class="banner-task-inner">
					<div class="banner-task-detail">
						<h4 class="sub-title2">
							处理中<span class="flag-icon"><i class="iconfont claim-icon-loading"></i></span>
						</h4>
						<div v-for="(item, i) in staticHandle" :key="i">
							<a class="opera" v-if="i <= 2"
								>{{ item.curtTaskName }}<span class="num">{{ item.total }}</span></a
							>
							<template v-if="doingState">
								<a class="opera" v-if="i > 2"
									>{{ item.curtTaskName }}<span class="num">{{ item.total }}</span></a
								>
							</template>
						</div>
						<p class="more-item">
							共{{ staticHandleNum }}
							<a class="more" @click="toggleState('doingState')" v-if="doingMoreState">更多</a>
							<a class="more" @click="toggleState('doingState')" v-if="doingTakeState">收回</a>
						</p>
					</div>
				</div>
			</el-col>
			<el-col class="banner-task" :span="8">
				<div class="banner-task-inner">
					<div class="banner-task-detail">
						<h4 class="sub-title2">
							已处理<span class="flag-icon"><i class="iconfont claim-icon-success"></i></span>
						</h4>
						<div v-for="(item, i) in staticComplete" :key="i">
							<a class="opera" v-if="i <= 2"
								>{{ item.curtTaskName }}<span class="num">{{ item.total }}</span></a
							>
							<template v-if="completeState">
								<a class="opera" v-if="i > 2"
									>{{ item.curtTaskName }}<span class="num">{{ item.total }}</span></a
								>
							</template>
						</div>
						<p class="more-item">
							共{{ staticCompleteNum }}
							<a class="more" @click="toggleState('completeState')" v-if="completeMoreState">更多</a>
							<a class="more" @click="toggleState('completeState')" v-if="completeTakeState">收回</a>
						</p>
					</div>
				</div>
			</el-col>
		</el-row>
		<div class="index-search">
			<h3 class="sub-title">赔案查询</h3>
			<p class="ipt">
				<input v-model="processValue" placeholder="请输入查询条件" />
			</p>
			<el-button type="primary" size="large" @click="toQuery">赔案查询</el-button>
		</div>
	</div>
</template>

<script setup>
	const undoState = ref(false);
	const moreState = ref(true);
	const takeState = ref(false);
	const completeState = ref(false);
	const completeMoreState = ref(true);
	const completeTakeState = ref(false);
	const doingState = ref(false);
	const doingMoreState = ref(true);
	const doingTakeState = ref(false);
	const locationUrl = ref("");
	const routerId = ref(1);
	const staticTask = ref([]);
	const staticTaskNum = ref(0);
	const processValue = ref("");
	const staticHandle = ref([]);
	const staticHandleNum = ref(0);
	const staticComplete = ref([]);
	const staticCompleteNum = ref(0);
	const toggleState = st => {
		if (st === "undoState") {
			const state = undoState.value;
			if (state === false) {
				undoState.value = true;
				moreState.value = false;
				takeState.value = true;
			} else {
				undoState.value = false;
				moreState.value = true;
				takeState.value = false;
			}
		} else if (st === "doingState") {
			const state = doingState.value;
			if (state === false) {
				doingState.value = true;
				doingMoreState.value = false;
				doingTakeState.value = true;
			} else {
				doingState.value = false;
				doingMoreState.value = true;
				doingTakeState.value = false;
			}
		} else {
			const state = completeState.value;
			if (state === false) {
				completeState.value = true;
				completeMoreState.value = false;
				completeTakeState.value = true;
			} else {
				completeState.value = false;
				completeMoreState.value = true;
				completeTakeState.value = false;
			}
		}
	};
	const toQuery = () => {
		// router.push({ path: '/index/claim-query', query: { inputParam: processValue.value } })
	};
</script>
<style scoped lang="scss">
	@use "../opt/subbanner.scss";
</style>
