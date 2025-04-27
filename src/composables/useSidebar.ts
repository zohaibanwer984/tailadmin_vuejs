import { ref, provide, inject } from 'vue'

// Symbol for providing/injecting the sidebar state
const SidebarKey = Symbol('sidebar')

export function useSidebarProvider() {
  // Create reactive state for the sidebar
  const isOpen = ref(false)
  const isMobileOpen = ref(false)

  // Functions to manipulate the sidebar state
  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const toggleSidebar = () => {
    console.log('Sidebar toggled')
  }

  const toggleMobileSidebar = () => {
    isMobileOpen.value = !isMobileOpen.value
  }

  // Provide the sidebar state and functions to child components
  provide(SidebarKey, {
    isOpen,
    open,
    close,
    toggle,
    toggleSidebar,
    toggleMobileSidebar,
    isMobileOpen,
  })

  return {
    isOpen,
    open,
    close,
    toggle,
    toggleSidebar,
    toggleMobileSidebar,
    isMobileOpen,
  }
}

// Composable for consuming the sidebar state in child components
export function useSidebar() {
  const sidebar = inject(SidebarKey)

  if (!sidebar) {
    throw new Error(
      'useSidebar() must be used within a component that has a parent SidebarProvider',
    )
  }

  return sidebar
}
