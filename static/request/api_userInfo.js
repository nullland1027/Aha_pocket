import request from "./request.js"


/* 
	name: 绑定手机号
	@params phone: String
	@params code: String
*/
exports.bindPhone = (data) => request("/bind/phone","POST",data)
/* 绑定微信号 */
exports.bindWxchat = (data) => request("/bind/wechat?code="+data.code,"POST",data)

/* 获取个人信息 */
exports.getMe = () => request("/userInfo/me","GET",{})
/* 修改个人基本资料 */
exports.putMe = (data) => request("/userInfo/me","PUT",data)
/* 签署须知协议 */
exports.signNotice = () => request("/sign/notice","POST",{})
/* 获取头像上传签名 */
exports.getAvatarOssSignature = (filename) => request("/userInfo/avatar/sign/upload?filename="+filename,"GET",{})
/* 根据userId获取用户详细信息 */
exports.getUser = (userId) => request("/userInfo/" + userId,"GET",{})

/* 
	desc: 获取简历信息
	@param userId: String,用户标识码
*/
exports.getResume = (userId) => request(`/resume/${userId}`,"GET",{})

/* 
	desc: 更新简历信息
	@params resume: Object,简历的所有字段
*/
exports.putResume = (data) => request("/resume","PUT",data)

/* 获取未读通知数量 */
exports.getUnreadCount = () => request("/message/count/notRead","GET",{})
/* 获取消息通知列表 */
exports.getMessages = (param) => request("/message","GET",param)
/* 
	获取消息通知内容
	@param: messageId: Number
*/
exports.getMessage = (messageId) => request(`/message/${messageId}`,"GET",{})
/* 
    发送通知
    @params: receiverUserId: Number,收件人用户id
    @params: title: String, 信件标题
    @params: content:String, 信件内容
*/
exports.postMessage = (data) => request("/message","POST",data)
/*  删除消息 */
exports.deleteMessage = (messageId) => request(`/message/${messageId}`,"DELETE",{})

/* 获取个人收藏项目 */
exports.getCollectedProjects = () => request("/project/collection","GET",{})
/* 获取个人购买的项目附件 */
exports.getPurchased = () => request("/project/resource/purchased","GET",{})

/* 获取公共文件上次接口 */
exports.getPublicFileSign = (filename) => request("/cos/sign/upload/public?filename="+filename,"GET",{})

/* 获取个人统计数据 */
exports.getSelfStatistice = () => request("/statistics/me","GET",{})
/* 获取指定用户统计数据 */
exports.getUserStatistice = (userId) => request(`/statistics/${userId}`,"GET",{})
/* 获取用户轨迹 */
exports.getUserTracks = (userId,type) => request(`/user/track/${userId}?type=${type}`,"GET",{})

/* 获取实名认证上传签名 */
exports.getAuthenticationSignature = (filename) => request(`/authentication/sign/upload?filename=${filename}`,"GET",{})
/* 提交实名认证信息 */
exports.putAuthentication = (data) => request(`/authentication/updatePersonalAuthentication`,"PUT",data)

/* 判断用户关系 */
exports.getUserRelation = (userId) => request(`/user/relation/${userId}`,"GET",{})
/* 关注用户 */
exports.followUser = (userId) => request(`/user/follow/${userId}`,"POST",{})
/* 取消关注 */
exports.unfollowUser = (userId) => request(`/user/unfollow/${userId}`,"POST",{})