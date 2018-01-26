<template>
  <div class="modal-warpper" v-if="modalShow" @touchmove=function(e){e.preventDefault}>
    <Modal v-if="promptModal">
      <div slot="body">
        用户可以每天领取50元的提额锦囊，每天只能领取1次
      </div>
      <div slot="footer" class="snnu-hairline-top">
        <button class="snnu-modal-btn snnu-modal-btn-blue" @click="promptModal=false">取消</button>
      </div>
    </Modal>
    <!-- bottom mask -->
    <transition name="modal-mask" appear>
    <div class="modal-mask" v-if="modalShow"></div>
    </transition>
  </div>
</template>

<script>
import Modal from '>/components/modal/source.vue'

export default {
  data: function() {
    return {
      promptModal: false,
      ruleModal: false,
    }
  },
  computed: {
    modalShow: function() {
      return this.promptModal || this.ruleModal
    }
  }, 
  components: {
    Modal
  },
  mounted: function() {
    window.bus.$on('showPromprtModal', () => {
      this.promptModal = true
    })
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}

.modal-mask-enter-active {
  transition: opacity .2s;
}

.modal-mask-enter {
  opacity: 0;
}
</style>
