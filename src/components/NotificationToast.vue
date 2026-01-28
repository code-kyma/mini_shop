<template>
  <transition name="fade">
    <div v-if="notification" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NotificationToast',
  props: {
    notification: Object
  }
}
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  z-index: 400;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.notification.success {
  background: #51cf66;
  color: white;
}

.notification.info {
  background: #4dabf7;
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
