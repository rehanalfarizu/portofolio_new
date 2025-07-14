<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <div class="nav-logo">
        <router-link to="/" class="logo-link">
          <span class="logo-text">Portfolio</span>
        </router-link>
      </div>

      <!-- Navigation Links -->
      <div class="nav-menu" :class="{ 'active': isMenuOpen }">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          @click="closeMenu"
        >
          {{ t(item.label) }}
        </router-link>
      </div>

      <!-- Controls -->
      <div class="nav-controls">
        <!-- Language Switcher -->
        <div class="language-switcher">
          <button
            @click="toggleLanguageMenu"
            class="language-btn"
            :class="{ 'active': isLanguageMenuOpen }"
          >
            <span class="language-icon">🌐</span>
            {{ currentLang.locale.toUpperCase() }}
          </button>

          <div class="language-menu" :class="{ 'show': isLanguageMenuOpen }">
            <button
              @click="switchLanguage('en')"
              class="language-option"
              :class="{ 'active': currentLang.locale === 'en' }"
            >
              🇺🇸 English
            </button>
            <button
              @click="switchLanguage('id')"
              class="language-option"
              :class="{ 'active': currentLang.locale === 'id' }"
            >
              🇮🇩 Indonesia
            </button>
          </div>
        </div>

        <!-- Theme Switcher -->
        <button @click="toggleTheme" class="theme-btn">
          <span v-if="theme.current === 'dark'" class="theme-icon">🌙</span>
          <span v-else class="theme-icon">☀️</span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button
          @click="toggleMenu"
          class="menu-toggle"
          :class="{ 'active': isMenuOpen }"
        >
          <span class="hamburger"></span>
          <span class="hamburger"></span>
          <span class="hamburger"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { currentLang, t, changeLang } from '@/lang'
import { theme, toggleTheme, initTheme } from '@/composables/useTheme'

export default {
  name: 'Navbar',
  setup() {
    const isMenuOpen = ref(false)
    const isLanguageMenuOpen = ref(false)
    const scrolled = ref(false)

    const navItems = [
      { path: '/', label: 'home' },
      { path: '/about', label: 'about' },
      { path: '/projects', label: 'projects' },
      { path: '/contact', label: 'contact' }
    ]

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
      isMenuOpen.value = false
    }

    const toggleLanguageMenu = () => {
      isLanguageMenuOpen.value = !isLanguageMenuOpen.value
    }

    const switchLanguage = (locale) => {
      changeLang(locale)
      isLanguageMenuOpen.value = false
    }

    const handleScroll = () => {
      scrolled.value = window.scrollY > 50
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-switcher')) {
        isLanguageMenuOpen.value = false
      }
      if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle')) {
        isMenuOpen.value = false
      }
    }

    onMounted(() => {
      initTheme()
      window.addEventListener('scroll', handleScroll)
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isMenuOpen,
      isLanguageMenuOpen,
      scrolled,
      navItems,
      currentLang,
      theme,
      t,
      toggleMenu,
      closeMenu,
      toggleLanguageMenu,
      switchLanguage,
      toggleTheme
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  z-index: 1000;
  padding: 0 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Tambahkan baris ini untuk menghilangkan garis putih */
  border-top: none;
  margin-top: 0;
  box-shadow: none;
}

[data-theme="light"] .navbar {
  background: rgba(248, 250, 252, 0.9);
  border-bottom: 1px solid rgba(59, 130, 246, 0.15);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.nav-logo .logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

[data-theme="light"] .nav-link {
  color: #334155;
}

.nav-link:hover {
  color: #3b82f6;
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: #3b82f6;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.language-switcher {
  position: relative;
}

.language-btn {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

[data-theme="light"] .language-btn {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08));
  border-color: rgba(59, 130, 246, 0.2);
  color: #334155;
}

.language-btn:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.language-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.75rem;
  padding: 0.5rem;
  min-width: 160px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

[data-theme="light"] .language-menu {
  background: rgba(248, 250, 252, 0.95);
  border-color: rgba(59, 130, 246, 0.2);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.language-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.language-option {
  width: 100%;
  background: none;
  border: none;
  color: #e2e8f0;
  padding: 0.75rem 1rem;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

[data-theme="light"] .language-option {
  color: #334155;
}

.language-option:hover {
  background: rgba(59, 130, 246, 0.15);
  transform: translateX(4px);
}

.language-option.active {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.theme-btn {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #e2e8f0;
  padding: 0.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

[data-theme="light"] .theme-btn {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08));
  border-color: rgba(59, 130, 246, 0.2);
  color: #334155;
}

.theme-btn:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.theme-icon {
  font-size: 1.2rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 4px;
}

.hamburger {
  width: 25px;
  height: 3px;
  background: #e2e8f0;
  transition: all 0.3s ease;
  border-radius: 2px;
}

[data-theme="light"] .hamburger {
  background: #334155;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 2rem;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-right: 1px solid rgba(59, 130, 246, 0.2);
  }

  [data-theme="light"] .nav-menu {
    background: rgba(248, 250, 252, 0.95);
    border-right: 1px solid rgba(59, 130, 246, 0.15);
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-link {
    font-size: 1.2rem;
    margin: 1rem 0;
    padding: 1rem 2rem;
    width: 100%;
    text-align: center;
    border-radius: 0.5rem;
  }

  .nav-link:hover {
    background: rgba(59, 130, 246, 0.1);
  }

  .menu-toggle {
    display: flex;
  }

  .menu-toggle.active .hamburger:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .menu-toggle.active .hamburger:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.active .hamburger:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  .nav-controls {
    gap: 0.5rem;
  }

  .language-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .theme-btn {
    padding: 0.4rem;
  }
}

/* Smooth transitions */
* {
  transition: color 0.3s ease, background-color 0.3s ease;
}


</style>
