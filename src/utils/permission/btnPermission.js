import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding

  if (value && typeof value === 'object') {
    const AllowRolesList = binding.value.allowRoles
    // 按钮权限数据 authList
    const currentRole = store.getters.roles // admin client
    // store.getters && store.getters.authList?.map(auth => auth.path)
    if (currentRole) {
      if (AllowRolesList.indexOf(currentRole) === -1) {
        // 不具备权限
        const type = binding.value.effect
        if (type === 'disabled') {
          // 禁用按钮
          el.disabled = true
          el.classList.add('is-disabled')
        } else {
          // 删除按钮
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
      // if (authList.indexOf(action) === -1) {
      //   // 不具备权限
      //   const type = binding.value.effect
      //   if (type === 'disabled') {
      //     // 禁用按钮
      //     el.disabled = true
      //     el.classList.add('is-disabled')
      //   } else {
      //     // 删除按钮
      //     el.parentNode && el.parentNode.removeChild(el)
      //   }
      // }
    }
  } else {
    // 指令使用方式  v-permission="{ action: 'shipment.application:detail',effect:'disabled' }"
    // 格式错误，抛出异常
    throw new Error(
      `need permission! Like v-permission="{ action: 'shipment.application:detail',effect:'disabled' }"`
    )
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}

