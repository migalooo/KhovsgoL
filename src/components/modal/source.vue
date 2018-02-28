<template>
  <transition name="snnu-modal-bounce">
  <div>
    <div class="snnu-modal">
      <div class="snnu-modal-header" v-if="title !== ''">
        <div class="snnu-modal-title">
          <slot name="header"></slot>
        </div>
      </div>
      <div class="snnu-modal-body" v-if="message !== ''">
        <slot name="body"></slot>
      </div>
      <div class="snnu-modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="snnu-modal-mask"></div>
  </div>
  </transition>
</template>

<style lang="less">
.snnu-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 70%;
  border-radius: 5px;
  -webkit-user-select: none;
  overflow: hidden;
  backface-visibility: hidden;
  z-index: 100;
  font-family: Arial;
  color: #333;
  box-shadow: 0 0 30px;
  transition: all .2s ease-in;
}

.snnu-modal-header {
  padding: 30px 0 0;
}

.snnu-modal-title {
  text-align: center;
  padding-left: 0;
  margin-bottom: -20px;
  font-size: 34px;
  font-weight: bold;
}

.snnu-modal-body {
  padding: 35px 30px;
  line-height: 45px;
  min-height: 36px;
  position: relative;
  font-size: 28px;
}

.snnu-modal-footer {
  display: flex;
  >div {
    width: 100%;
  }
}

.snnu-modal-mask {
  position: fixed;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: .6;
  background-color: #000;
  transition: opacity .2s ease-in;
}

.snnu-modal-btn {
  line-height: 85px;
  display: block;
  background-color: #fff;
  flex: 1;
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  font-size: 34px;
  &:focus {
    outline: none;
  }
  &:active {
    background-color: #fff;
  }
}

.snnu-modal-btn-blue {
  color: #3399FF;
}

.snnu-modal-bounce-enter .snnu-modal{
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}

.snnu-modal-bounce-enter .snnu-modal-mask{
  opacity: 0;
}
</style>
