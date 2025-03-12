<!-- 险种已核、未核案件数 -->
<template>
	<div class="banner-right">
		<h3 class="sub-title">险种已核、未核案件数</h3>
		<el-row :gutter="10">
			<el-col class="banner-task" :span="12">
				<div class="banner-task-inner">
					<div class="banner-task-detail">
						<h4 class="sub-title2">
							已核案件数<span class="flag-icon"><i class="iconfont time"></i></span>
						</h4>
						<div v-for="(item, i) in staticChk" :key="i">
							<a class="opera" v-if="i <= 2">
								<span class="overflow-text">{{ item.CProdNme }}</span>
								<span class="num">{{ item.total }}</span>
							</a>
							<template v-if="prodCaseChkState">
								<a class="opera" v-if="i > 2">
									{{ item.CProdNme }}<span class="num">{{ item.total }}</span>
								</a>
							</template>
						</div>
						<p class="more-item">
							共{{ staticChkNum }}
							<a class="more" @click="toggleState('prodCasesChk')" v-if="prodCaseChkMoreState"> 更多 </a>
							<a class="more" @click="toggleState('prodCasesChk')" v-if="prodCaseChkTakeState"> 收回 </a>
						</p>
					</div>
				</div>
			</el-col>
			<el-col class="banner-task" :span="12">
				<div class="banner-task-inner">
					<div class="banner-task-detail">
						<h4 class="sub-title2">
							未核案件数<span class="flag-icon"><i class="iconfont loading"></i></span>
						</h4>
						<div v-for="(item, i) in staticNotChk" :key="i">
							<a class="opera" v-if="i <= 2"
								>{{ item.CProdNme }}<span class="num">{{ item.total }}</span></a
							>
							<template v-if="prodCaseNotChkState">
								<a class="opera" v-if="i > 2"
									>{{ item.CProdNme }}<span class="num">{{ item.total }}</span></a
								>
							</template>
						</div>
						<p class="more-item">
							共{{ staticNotChkNum }}
							<a class="more" @click="toggleState('prodCasesNotChk')" v-if="prodCaseNotChkMoreState">更多</a>
							<a class="more" @click="toggleState('prodCasesNotChk')" v-if="prodCaseNotChkTakeState">收回</a>
						</p>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	let staticChk = ref([]);
	const staticChkNum = ref(0);
	const prodCaseChkMoreState = ref(true);
	const prodCaseChkState = ref(false);
	const prodCaseChkTakeState = ref(false);
	const staticNotChk = ref([]);
	const staticNotChkNum = ref(0);
	const prodCaseNotChkState = ref(false);
	const prodCaseNotChkMoreState = ref(true);
	const prodCaseNotChkTakeState = ref(false);
	// mock
	staticChk.value = [
		{
			CProdNme: "财产综合险",
			total: 20
		},
		{
			CProdNme: "工程机械设备险",
			total: 20
		}
	];
	const toggleState = st => {
		if (st === "prodCasesChk") {
			const state = prodCaseChkState.value;
			if (state === false) {
				prodCaseChkState.value = true;
				prodCaseChkMoreState.value = false;
				prodCaseChkTakeState.value = true;
			} else {
				prodCaseChkState.value = false;
				prodCaseChkMoreState.value = true;
				prodCaseChkTakeState.value = false;
			}
		} else if (st === "prodCasesNotChk") {
			const state = prodCaseNotChkState.value;
			if (state === false) {
				prodCaseNotChkState.value = true;
				prodCaseNotChkMoreState.value = false;
				prodCaseNotChkTakeState.value = true;
			} else {
				prodCaseNotChkState.value = false;
				prodCaseNotChkMoreState.value = true;
				prodCaseNotChkTakeState.value = false;
			}
		}
	};
</script>
<style scoped lang="scss">
	@use "../opt/subbanner.scss";
</style>
