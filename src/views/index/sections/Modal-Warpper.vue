<template>
  <div class="modal-warpper" @touchmove.prevent>
    <Modal v-show="promptModal">
      <div slot="body">
        用户可以每天领取50元的提额锦囊，每天只能领取1次
      </div>
      <div slot="footer" class="snnu-hairline-top">
        <button class="snnu-modal-btn snnu-modal-btn-white" @click.prevent="promptModal=false">知道了</button>
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
        <button class="snnu-modal-btn snnu-modal-btn-white" @click.prevent="introduceModal=false">知道了</button>
      </div>
    </Modal>
    <Modal v-show="successModal">
      <div slot="body" class="success">
        <p>恭喜您！</p>
        <p>转到银行卡的剩余额度</p>
        <p>提升{{ increasedValue }}元</p>
      </div>
      <div slot="footer">
        <button class="snnu-modal-btn snnu-modal-btn-blue" @click.prevent="successModalClose">知道了</button>
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
      successModal: false,
      account: 0,
      increasedValue: 0,
    }
  },
  methods: {
    successModalClose: function() {
      this.successModal = false
      window.bus.$emit('startAnimation', this.account)
    }
  },
  mounted: function() {
    window.bus.$on('showPromprtModal', () => {
      this.promptModal = true
    })
    window.bus.$on('showIntroduceModal', () => {
      this.introduceModal = true
    })
    window.bus.$on('showSuccessModal', (data) => {
      this.increasedValue = data.increasedValue
      this.account = data.account
      this.successModal= true
    })
  },
  beforeDestroy: function() {
    window.bus.$off('showPromprtModal')
    window.bus.$off('showIntroduceModal')
    window.bus.$off('showSuccessModal')
  }
}
</script>

<style>
.introduce>p{
  margin-bottom: 20px;
  line-height: 35px;
}
.success::before{
  content: '';
  width: 100%;
  height: 2.2rem;
  margin-bottom: .15rem;
  display: inline-block;
  background: url(/images/alert-img.svg) center no-repeat;
}
.success>p{
  text-align: center;
  margin-bottom: 20px;
  line-height: 20px;
  color: #999;
}
.success>p:first-child{
  text-indent: 20px;
}
.success>p:last-child{
  font-size: 30px;
  color: #39f;
}
</style>
