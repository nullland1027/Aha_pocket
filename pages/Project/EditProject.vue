<template>
	<view class="edit-project">
		<!-- 导航 -->
		<view class="navs">
			<view 
				class="slide-card"
				:style="{
					left: `${pageIndex * 33.3333}vw`
				}">
			</view>
			<view 
				class="nav"
				:class="index === pageIndex ? 'active' : ''"
				v-for="(nav,index) in pages"
				:key="nav"
				@click="pageIndex=index">
				{{nav}}
			</view>
		</view>
		<baseInfo 
			ref="baseInfo"
			v-show="pageIndex === 0"
			:AnonymousLabel="project.isAnonymous">
		</baseInfo>
		<fileInfo 
			ref="fileInfo" 
			v-show="pageIndex === 1" 
			:projectId="project.id"
			:level="project.awardLevel">
		</fileInfo>
		<MemberInfo 
			ref="memberInfo" 
			v-show="pageIndex === 2" 
			:projectId="project.id">
		</MemberInfo>
		<view class="btn">
			<button @click="save">保存</button>
		</view>
        <!-- 加载动画 -->
        <Loading ref="loading"></Loading>
	</view>
</template>

<script>
import { getPublicSignature,getProject,getResources,putProject,putMembers } from "@/static/request/api_project.js"
import baseInfo from "./components/ProjectBase.vue"
import fileInfo from "./components/ProjectFile.vue"
import MemberInfo from "./components/ProjectMember.vue"
export default {
	data() {
		return {
			project: null,
			pages: ["基本信息","附件信息","队员信息"],
			pageIndex: 0
		}
	},
	components: {
		baseInfo,
		fileInfo,
		MemberInfo,
	},
	onLoad(e) {
	    this.gLoading(this,true)
		getProject(e.id)
		.then(res => {
			this.project = res.data
	        this.$nextTick(this.initPageInfo)
		})
	    .catch(err => {
	        this.gLoading(this,false)
	    })
	},
	onShow() {
		if(this.$refs.baseInfo.editMD){
			this.$refs.baseInfo.intro = getApp().globalData.gEditContent
			this.$refs.baseInfo.editMD = false
		}
	},
	methods: {
		/* 
			name: 初始化页面信息
			desc: 将project的信息更新对应的组件页面中
		*/
		initPageInfo()
		{
			console.log(this.project)
			/* 获取获奖等级名称 */
			let awardLevel = getApp().globalData.garr_prizeLevels.find(item => item.value === this.project.awardLevel)
			/* 同步基础信息 */
			const domBaseInfo = this.$refs.baseInfo
			domBaseInfo.isAnonymous = this.project.isAnonymous
			domBaseInfo.name = this.project.name
			domBaseInfo.avatarUrl = this.project.avatarUrl
			domBaseInfo.tags = this.project.tags
			domBaseInfo.compName = this.project.compName
			domBaseInfo.awardLevel = awardLevel || null
			domBaseInfo.awardTime = this.project.awardTime
			domBaseInfo.awardProveUrl = this.project.awardProveUrl
			domBaseInfo.intro = this.project.intro
			/* 请求个人项目的所有附件，同步附件信息 */
			getResources({
				projectId: this.project.id,
				edit: true
			})
			.then(res => {
				this.$refs.fileInfo.files = res.data.map(file => {
					return {
						...file,
						status: 2,
						progress: 100
					}
				})
				this.project.resources = this.$refs.fileInfo.files
			})
			/* 同步成员信息 */
			this.$refs.memberInfo.members = this.project.members.map(item => {
                return {
                    ...item.memberUser,
                    memberUserId: item.memberUser.userId,
                    rank: item.rank,
                    job: item.job,
                    editable: item.editable,
                }
            })
			this.$forceUpdate()
            this.gLoading(this,false)
		},
		/* 
			name: 保存信息
			desc: 根据不同pageIndex触发不同保存方式
		*/
		save()
		{
			switch(this.pageIndex){
				case 0: this.updateBaseInfo();break;
				case 1: this.updateFiles();break;
				case 2: this.updateMembers();break;
			}
		},
		/* 更新基本信息 */
		updateBaseInfo()
		{
			const base = this.$refs.baseInfo
			/* 赛事类型和获奖等级需要转化成数值 */
			let awardLevel = base.awardLevel ? base.awardLevel.value : null
			/* 计算compId */
			let compId = getApp().globalData.Competitions.find(item => item.name === base.compName)
			compId = compId ? compId.id : 0
			
			let data = {
				isAnonymous: base.isAnonymous,
				name: base.name,
				avatarUrl: base.avatarUrl,
				compId,
				tags: base.tags,
				compName: base.compName,
				awardLevel,
				awardTime: base.awardTime,
				awardProveUrl: base.awardProveUrl,
				intro: base.intro
			}
			/* 空值检验 */
			if(data.name === ""){
				this.gToastError("请输入资源标题")
				return
			}
			else if(!data.compName){
				this.gToastError('请输入获奖信息');
				return false;
			}
			else if(!data.awardLevel){
				this.gToastError('请输入获奖等级')
				return false;
			}
			else if(!data.awardTime){
				this.gToastError('请输入获奖时间')
				return false
			}
			else if(!data.isAnonymous && !data.awardProveUrl){
				this.gToastError('请选择证明材料');
				return false;
			}
			this.gLoading(this,true)
			let upImg = Promise.resolve()
			/* 上传头像,先判断是否是新的 */
			if (data.avatarUrl && data.avatarUrl !== this.project.avatarUrl) {
				upImg = upImg.then(() => {
					return getPublicSignature(`${Date.now()}.JPG`)
							.then(sign => sign)
							.catch(err => {
								console.log(err);
								this.gToastError('头像上传失败')
							})
				})
				upImg = upImg.then((sign) => {
					return this.gUploadFile(data.avatarUrl, sign.data)
							.then((res) => {
								console.log("头像上传成功")
								data.avatarUrl = res.header.Location
							})
							.catch(err => {
								console.log(err);
								this.gToastError('头像上传失败')
							})
				})
			}
			/* 上传证明 */
			if (data.awardProveUrl !== this.project.awardProveUrl) {
				upImg = upImg.then(() => {
					return getPublicSignature(`${Date.now()}.JPG`)
							.then(sign => sign)
							.catch(err => {
								this.gToastError('证明上传失败')
							})
				})
				upImg = upImg.then((sign) => {
					return this.gUploadFile(data.awardProveUrl, sign.data)
							.then(res => {
								console.log("证明上传成功");
								data.awardProveUrl = res.header.Location
							})
							.catch(err => {
								this.gToastError('证明上传失败')
							})
				})
			}
			upImg.then(() => {
				putProject(this.project.id,data)
				.then(res => {
					this.gToastSuccess("更新成功")
					this.gLoading(this, false);
				})
				.catch(err => {
					this.gLoading(this, false);
				})
			})
		},
		/* 更新附件 */
		updateFiles()
		{
			/* 全部正确标志位 */
			let correct = true
			this.$refs.fileInfo.files.find(file => {
				if(file.status === 0){
					correct = false
					return true
				}
			})
			/* 含未上传文件 */
			if(correct){
				this.gToastSuccess("更新附件成功")
			}
			else{
				this.$refs.fileInfo.upload()
			}
		},
		/* 更新成员信息 */
		updateMembers()
		{
            this.gLoading(this,true)
			const data = this.$refs.memberInfo.members.map((item,i) => {
				return {
					memberUserId: item.memberUserId,
					rank: i+1,
					job: item.job,
					editable: item.editable
				}
			})
			putMembers(this.project.id,data)
			.then(res => {
                this.gLoading(this,false)
				this.gToastSuccess("更新成员成功!")
			})
            .catch(err => {
                this.gLoading(this,false)
            })
		}
	}
}
</script>

<style lang="stylus">
.edit-project
	position relative
	min-height 96vh
	padding 20rpx 0
	background-color var(--origin4)
	.navs
		z-index 10
		position fixed
		top 0
		width 100%
		border-bottom-left-radius 22px
		border-bottom-right-radius 22px
		background-color #FFFFFF
		box-shadow var(--shadow2)
		display grid
		grid-template-columns repeat(3,1fr)
		overflow hidden
		.nav
			z-index 2
			padding 10px
			text-align center
			color var(--origin1)
			font-size 24rpx
			transition .3s
			&.active
				color #FFFFFF
		.slide-card
			z-index 1
			position absolute
			width calc(100vw / 3)
			height 100%
			background-color var(--origin2)
			opacity 0.8
			transition .3s
	/* 按键 */
	.btn
		position fixed
		bottom 0
		left 0
		right 0
		padding 20rpx
		border-top-left-radius 22px
		border-top-right-radius 22px
		background-color var(--origin2)
		display flex
		justify-content space-around
		button
			margin 0 15%
			padding 0
			flex 1
			background-color #FFFFFF
			color var(--origin2)
			font-size 30rpx
			font-weight 600
	/* 每个模块共同样式 */
	.content
		margin 45px 10px 66px
		padding 20rpx 60rpx
		background-color #FFFFFF
		border-radius 22px
		/* 大标题 */
		.h3
			padding 20rpx 0
			color var(--origin1)
		/* 小标题 */
		.h4
			color var(--origin1)
		/* 输入框 */
		.input-info
			margin 15rpx 0
		/* 备注信息 */
		.remark
			color var(--origin2)
			font-size 20rpx
</style>
