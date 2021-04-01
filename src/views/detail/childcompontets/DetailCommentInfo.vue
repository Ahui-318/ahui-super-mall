<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
        <img
          v-for="(item, index) in commentInfo.images"
          :key="index"
          :src="item"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/common/utils";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // 服务器返回的是一个事件戳，需要转为日期格式，，使用过滤器
  filters: {
    showDate: function (value) {
      let date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header {
  font-weight: 800;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f2f5f8;
}
.header-title {
  float: left;
  font-size: 15px;
  /* line-height: 50px; */
}
.header-more {
  float: right;
  font-size: 13px;
  margin-right: 10px;
}
.info-user {
  height: 50px;
  /* line-height: 50px; */
  padding: 4px 0;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.info-user span {
  position: relative;
  top: -14px;
  left: 15px;
  font-size: 15px;
  font-weight: 800;
}
.info-detail{
  padding: 0 5px 15px;

}
.info-detail p{
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.info-other .date{
  margin-right: 8px;
}
.info-imgs {
  margin-top: 10px

}
.info-imgs img{
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>