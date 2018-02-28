<template>
  <div class="modal-warpper" @touchmove.prevent>
    <Modal v-show="promptModal">
      <div slot="body">
        用户可以每天领取50元的提额锦囊，每天只能领取1次
      </div>
      <div slot="footer" class="snnu-hairline-top">
        <button class="snnu-modal-btn snnu-modal-btn-blue" @click.prevent="promptModal=false">知道了</button>
      </div>
    </Modal>
    <Modal v-show="introduceModal">
      <div slot="body" class="introduce">
        <p>活动期间</p>
        <p>1. 当用户充话费支付成功后，可获得一个100元的提额锦囊，每个自然月最多可获得5个。</p>
        <p>2. 当用户使用扫码付，转账成功后，可获得一个100元的提额锦囊，每个自然月最多可获得5个。</p>
        <p>3. 当用户使用定期转，创建任务成功后，可获得一个100元的提额锦囊，每个自然月最多可获得5个。</p>
        <p>锦囊领取后立即生效，金额可以累加使用</p>
      </div>
      <div slot="footer" class="snnu-hairline-top">
        <button class="snnu-modal-btn snnu-modal-btn-blue" @click.prevent="introduceModal=false">知道了</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '>/components/modal/source.vue'

export default {
  components: {
    Modal
  },
  data: function() {
    return {
      promptModal: false,
      introduceModal: false,
    }
  },
  mounted: function() {
    window.bus.$on('showPromprtModal', () => {
      this.promptModal = true
    })
    window.bus.$on('showIntroduceModal', () => {
      this.introduceModal = true
    })
  }
}
</script>

<style>
.introduce>p{
  margin-bottom: 20px;
  line-height: .35rem;
}
</style>
