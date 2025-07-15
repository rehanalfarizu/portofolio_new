<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Mobile menu button -->
    <button
      @click="sidebarOpen = !sidebarOpen"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Mobile sidebar overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="lg:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
    ></div>

    <!-- Sidebar -->
    <div :class="[
      'w-64 bg-white shadow-lg fixed h-full z-30 transition-transform duration-300 ease-in-out',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <div class="p-6">
        <h1 class="text-xl font-bold text-gray-900">Admin Panel</h1>
      </div>

      <nav class="mt-6">
        <div class="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Main Navigation
        </div>

        <div class="mt-3 space-y-1">
          <button @click="activeTab = 'dashboard'" :class="[ 'flex items-center w-full px-6 py-3 text-left', activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900']">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4l2 2 4-4"></path>
            </svg>
            Dashboard
          </button>

          <button
            @click="activeTab = 'projects'"
            :class="[
              'flex items-center w-full px-6 py-3 text-left',
              activeTab === 'projects' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            Projects
          </button>

          <button
            @click="activeTab = 'skills'"
            :class="[
              'flex items-center w-full px-6 py-3 text-left',
              activeTab === 'skills' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            Skills
          </button>

          <button
            @click="activeTab = 'contacts'"
            :class="[
              'flex items-center w-full px-6 py-3 text-left',
              activeTab === 'contacts' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Messages
          </button>

          <button
            @click="activeTab = 'experiences'"
            :class="[
              'flex items-center w-full px-6 py-3 text-left',
              activeTab === 'experiences' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2H10a2 2 0 00-2 2v2m8 0v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8"></path>
            </svg>
            Experiences
          </button>

          <button
            @click="activeTab = 'about'"
            :class="[
              'flex items-center w-full px-6 py-3 text-left',
              activeTab === 'about' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            About
          </button>
        </div>

        <div class="px-6 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Settings
        </div>

        <div class="mt-3 space-y-1">
          <button @click="activeTab = 'Settings'" :class="[ 'flex items-center w-full px-6 py-3 text-left', activeTab === 'Settings' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900']">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Settings
          </button>

          <button @click="activeTab = 'Logout'" :class="[ 'flex items-center w-full px-6 py-3 text-left', activeTab === 'Logout' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900']">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 lg:ml-64">
      <!-- Header -->
      <div class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <h1 class="text-xl lg:text-2xl font-bold text-gray-900 ml-16 lg:ml-0">Admin Dashboard</h1>
            <div class="flex items-center space-x-4">
              <div class="relative hidden sm:block">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  id="search-input"
                  name="search"
                  type="text"
                  placeholder="Search..."
                  v-model="searchTerm"
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-48 lg:w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notification -->
      <div v-if="notification" :class="[
        'fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300',
        notification.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
      ]">
        <div class="flex items-center">
          <svg v-if="notification.type === 'error'" class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ notification.message }}
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Dashboard Content -->
        <div v-if="activeTab === 'dashboard'" class="space-y-8">
          <!-- Welcome Section -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-2">Welcome to Admin Dashboard</h2>
            <p class="text-gray-600">Here's an overview of your portfolio statistics and recent activities.</p>
          </div>

          <!-- Statistics Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Total Visitors</p>
                  <p class="text-2xl font-bold text-gray-900">{{ stats.visitors || 0 }}</p>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ dashboardStats.visitors?.thisMonth || 0 }} this month
                  </p>
                </div>
                <svg class="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Projects</p>
                  <p class="text-2xl font-bold text-gray-900">{{ stats.projects || 0 }}</p>
                  <p class="text-xs text-gray-500 mt-1">Portfolio projects</p>
                </div>
                <svg class="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Skills</p>
                  <p class="text-2xl font-bold text-gray-900">{{ stats.skills || 0 }}</p>
                  <p class="text-xs text-gray-500 mt-1">Technical skills</p>
                </div>
                <svg class="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Experience</p>
                  <p class="text-2xl font-bold text-gray-900">{{ stats.experiences || 0 }}</p>
                  <p class="text-xs text-gray-500 mt-1">Work experience</p>
                </div>
                <svg class="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2H10a2 2 0 00-2 2v2m8 0v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Visitor Analytics Section -->
          <VisitorStats />

          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div class="space-y-3">
              <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span class="text-sm text-gray-700">{{ projects.length }} projects in portfolio</span>
              </div>
              <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span class="text-sm text-gray-700">{{ skills.length }} technical skills added</span>
              </div>
              <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span class="text-sm text-gray-700">{{ experiences.length }} work experiences recorded</span>
              </div>
              <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <div class="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <span class="text-sm text-gray-700">{{ stats.contacts?.total || 0 }} contact messages received</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CRUD Management Content for Projects, Skills, Experiences, About -->
        <div v-else-if="['projects', 'skills', 'experiences', 'about'].includes(activeTab)" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold text-gray-900">
                  Manage {{ tabs.find(t => t.id === activeTab)?.label }}
                </h2>
                <button
                  @click="handleCreate"
                  class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>Add New</span>
                </button>
              </div>

              <!-- Search and Filter -->
              <div class="mb-4 flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                  <input
                    v-model="crudSearchTerm"
                    type="text"
                    placeholder="Search..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @input="loadTabData"
                  />
                </div>
                <button
                  @click="loadTabData"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Refresh
                </button>
              </div>

              <!-- Loading -->
              <div v-if="loading" class="text-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p class="text-gray-600 mt-2">Loading...</p>
              </div>

              <!-- Data Table -->
              <div v-else class="overflow-x-auto shadow rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th v-for="column in currentColumns" :key="column.key" class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {{ column.header }}
                      </th>
                      <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="currentData.length === 0">
                      <td :colspan="currentColumns.length + 1" class="px-3 sm:px-6 py-12 text-center text-gray-500">
                        No data available
                      </td>
                    </tr>
                    <tr v-else v-for="item in filteredData" :key="item.id" class="hover:bg-gray-50">
                      <td v-for="column in currentColumns" :key="column.key" class="px-3 sm:px-6 py-4 text-sm text-gray-900">
                        <div class="truncate max-w-xs">
                          <span v-if="column.key === 'technologies'">{{ Array.isArray(item[column.key]) ? item[column.key].join(', ') : item[column.key] }}</span>
                          <span v-else-if="column.key.includes('Date')">{{ formatDate(item[column.key]) }}</span>
                          <span v-else-if="column.key === 'status'" :class="[
                            'px-2 py-1 text-xs rounded-full',
                            item[column.key] === 'active' ? 'bg-green-100 text-green-800' :
                            item[column.key] === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          ]">{{ item[column.key] || 'N/A' }}</span>
                          <span v-else>{{ item[column.key] || 'N/A' }}</span>
                        </div>
                      </td>
                      <td class="px-3 sm:px-6 py-4 text-sm font-medium">
                        <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0">
                          <button @click="handleView(item)" class="text-blue-600 hover:text-blue-900 text-xs sm:text-sm">View</button>
                          <button @click="handleEdit(item)" class="text-indigo-600 hover:text-indigo-900 text-xs sm:text-sm">Edit</button>
                          <button @click="handleDelete(item)" class="text-red-600 hover:text-red-900 text-xs sm:text-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Contacts/Messages Tab -->
        <div v-else-if="activeTab === 'contacts'" class="space-y-6">
          <!-- Contact Search -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-900">Contact Messages</h2>
              <div class="flex items-center space-x-4">
                <input
                  v-model="contactSearchTerm"
                  type="text"
                  placeholder="Search messages..."
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @input="loadContacts"
                />
                <button
                  @click="loadContacts"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Refresh
                </button>
              </div>
            </div>

            <!-- Contact Statistics -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm font-medium text-gray-600">Total Messages</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.contacts?.total || 0 }}</p>
              </div>
              <div class="bg-red-50 p-4 rounded-lg">
                <p class="text-sm font-medium text-red-600">Unread</p>
                <p class="text-2xl font-bold text-red-900">{{ stats.contacts?.unread || 0 }}</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <p class="text-sm font-medium text-green-600">Recent (7 days)</p>
                <p class="text-2xl font-bold text-green-900">{{ stats.contacts?.recent || 0 }}</p>
              </div>
            </div>

            <!-- Contact Messages Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-if="contacts.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                      No messages found
                    </td>
                  </tr>
                  <tr v-else v-for="contact in contacts" :key="contact.id" :class="{ 'bg-blue-50': !contact.is_read }">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ contact.name }}</div>
                        <div class="text-sm text-gray-500">{{ contact.email }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-900">{{ contact.subject }}</div>
                      <div class="text-sm text-gray-500 truncate max-w-xs">{{ contact.message }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(contact.created_at) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span v-if="!contact.is_read" class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Unread</span>
                      <span v-else class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Read</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button @click="handleView(contact)" class="text-blue-600 hover:text-blue-900">View</button>
                      <button v-if="!contact.is_read" @click="markAsRead(contact.id)" class="text-green-600 hover:text-green-900">Mark Read</button>
                      <button @click="handleDelete(contact)" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Settings Tab -->
        <!-- Contacts Messages -->
        <div v-else-if="activeTab === 'contacts'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Contact Messages</h2>
            <div class="space-y-4">
              <div v-for="contact in contacts" :key="contact.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-medium text-gray-900">{{ contact.name }}</h3>
                    <p class="text-sm text-gray-600">{{ contact.email }}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span :class="[
                      'px-2 py-1 text-xs rounded-full',
                      contact.isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    ]">
                      {{ contact.isRead ? 'Read' : 'Unread' }}
                    </span>
                    <button @click="markAsRead(contact.id)" v-if="!contact.isRead" class="text-blue-600 hover:text-blue-800">
                      Mark as Read
                    </button>
                  </div>
                </div>
                <p class="text-gray-700 mb-2">{{ contact.message }}</p>
                <p class="text-sm text-gray-500">{{ new Date(contact.createdAt).toLocaleDateString() }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings -->
        <div v-else-if="activeTab === 'settings'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
            <p class="text-gray-600 mb-6">Manage your account settings and preferences.</p>

            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Profile Settings</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your full name">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your.email@example.com">
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Dashboard Preferences</h3>
                <div class="space-y-4">
                  <div class="flex items-center">
                    <input type="checkbox" id="email-notifications" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <label for="email-notifications" class="ml-2 text-sm text-gray-700">Receive email notifications for new messages</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="auto-backup" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <label for="auto-backup" class="ml-2 text-sm text-gray-700">Enable automatic data backup</label>
                  </div>
                </div>
              </div>

              <div class="pt-6 border-t">
                <button class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ...existing code... -->
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center p-4 sm:p-6 border-b">
        <h3 class="text-lg font-semibold">
          {{ modalTitle }}
        </h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="p-4 sm:p-6">
        <!-- Delete Confirmation -->
        <div v-if="modalType === 'delete'" class="text-center">
          <svg class="mx-auto h-12 w-12 text-red-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-gray-700 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
          <div class="flex justify-center space-x-4">
            <button
              @click="closeModal"
              class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        <!-- View Mode -->
        <div v-else-if="modalType === 'view'" class="space-y-4">
          <div v-for="column in currentColumns" :key="column.key" class="border-b pb-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ column.header }}</label>
            <p class="text-gray-900">{{ selectedItem[column.key] || 'N/A' }}</p>
          </div>
        </div>

        <!-- Form Mode -->
        <form v-else @submit.prevent="handleSave" class="space-y-4">
          <div v-if="activeTab === 'projects'">
            <div>
              <label for="project-title" class="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                id="project-title"
                name="title"
                type="text"
                required
                v-model="formData.title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="project-description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                id="project-description"
                name="description"
                v-model="formData.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              ></textarea>
            </div>
            <div>
              <label for="project-technologies" class="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
              <input
                id="project-technologies"
                name="technologies"
                type="text"
                v-model="formData.technologies"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="project-status" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                id="project-status"
                name="status"
                v-model="formData.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label for="project-github" class="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
              <input
                id="project-github"
                name="githubUrl"
                type="url"
                v-model="formData.githubUrl"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="project-demo" class="block text-sm font-medium text-gray-700 mb-2">Demo URL</label>
              <input
                id="project-demo"
                name="demoUrl"
                type="url"
                v-model="formData.demoUrl"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          <div v-if="activeTab === 'skills'">
            <div>
              <label for="skill-name" class="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
              <input
                id="skill-name"
                name="name"
                type="text"
                required
                v-model="formData.name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="skill-level" class="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                id="skill-level"
                name="level"
                v-model="formData.level"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div>
              <label for="skill-category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                id="skill-category"
                name="category"
                type="text"
                v-model="formData.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="skill-years" class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <input
                id="skill-years"
                name="years"
                type="number"
                v-model="formData.years"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          <div v-if="activeTab === 'experiences'">
            <div>
              <label for="experience-company" class="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                id="experience-company"
                name="company"
                type="text"
                required
                v-model="formData.company"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="experience-position" class="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                id="experience-position"
                name="position"
                type="text"
                required
                v-model="formData.position"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="experience-start" class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                id="experience-start"
                name="startDate"
                type="date"
                v-model="formData.startDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="experience-end" class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                id="experience-end"
                name="endDate"
                type="date"
                v-model="formData.endDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="experience-description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                id="experience-description"
                name="description"
                v-model="formData.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black "
              ></textarea>
            </div>
          </div>

          <div v-if="activeTab === 'about'">
            <div>
              <label for="about-name" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                id="about-name"
                name="name"
                type="text"
                required
                v-model="formData.name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="about-title" class="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
              <input
                id="about-title"
                name="title"
                type="text"
                required
                v-model="formData.title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="about-bio" class="block text-sm font-medium text-gray-700 mb-2">Biography</label>
              <textarea
                id="about-bio"
                name="bio"
                v-model="formData.bio"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              ></textarea>
            </div>
            <div>
              <label for="about-email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                id="about-email"
                name="email"
                type="email"
                v-model="formData.email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="about-phone" class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                id="about-phone"
                name="phone"
                type="tel"
                v-model="formData.phone"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="about-location" class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                id="about-location"
                name="location"
                type="text"
                v-model="formData.location"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label for="about-website" class="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input
                id="about-website"
                name="website"
                type="url"
                v-model="formData.website"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dashboardService from '../services/dashboardService.js'
import crudService from '../services/crudService.js'
import api from '../services/api.js'
import VisitorStats from '../components/VisitorStats.vue'

// Reactive data
const activeTab = ref('dashboard')
const sidebarOpen = ref(false)
const searchTerm = ref('')
const crudSearchTerm = ref('')
const contactSearchTerm = ref('')
const showModal = ref(false)
const modalType = ref('')
const selectedItem = ref(null)
const loading = ref(false)
const notification = ref(null)

// Dashboard data
const dashboardStats = ref({})
const contacts = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    message: 'Hello! I am interested in your portfolio and would like to discuss potential collaboration opportunities.',
    isRead: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    message: 'Great work on your recent projects! I would love to connect and discuss your experience with Vue.js.',
    isRead: true,
    createdAt: '2024-01-14T15:45:00Z'
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol@example.com',
    message: 'I found your portfolio through GitHub. Are you available for freelance projects?',
    isRead: false,
    createdAt: '2024-01-13T09:20:00Z'
  }
])
const contactsPagination = ref({})
const projectsPagination = ref({})
const skillsPagination = ref({})
const experiencesPagination = ref({})
const visitorAnalytics = ref([])

const handleLogout = () => {
  // Simulate logout
  showNotification('Logged out successfully!', 'success')
  // You can add actual logout logic here
  // For example: window.location.href = '/login'
}

// Form data
const formData = ref({})

// Stats data - will be populated from API
const stats = ref({
  visitors: 0,
  projects: 0,
  skills: 0,
  experiences: 0,
  contacts: {
    total: 0,
    unread: 0,
    recent: 0
  }
})

// Data arrays dengan mock data langsung
const projects = ref([
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with React and Node.js',
    technologies: 'React, Node.js, MongoDB',
    status: 'completed',
    githubUrl: 'https://github.com/user/ecommerce',
    demoUrl: 'https://demo.ecommerce.com'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time features',
    technologies: 'Vue.js, Express, PostgreSQL',
    status: 'active',
    githubUrl: 'https://github.com/user/taskapp',
    demoUrl: 'https://demo.taskapp.com'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather monitoring dashboard',
    technologies: 'JavaScript, Chart.js, OpenWeatherAPI',
    status: 'completed',
    githubUrl: 'https://github.com/user/weather',
    demoUrl: 'https://demo.weather.com'
  }
])

const skills = ref([
  {
    id: 1,
    name: 'JavaScript',
    level: 'Expert',
    category: 'Programming',
    years: 5
  },
  {
    id: 2,
    name: 'Vue.js',
    level: 'Advanced',
    category: 'Frontend',
    years: 3
  },
  {
    id: 3,
    name: 'Node.js',
    level: 'Advanced',
    category: 'Backend',
    years: 4
  },
  {
    id: 4,
    name: 'Python',
    level: 'Intermediate',
    category: 'Programming',
    years: 2
  },
  {
    id: 5,
    name: 'MongoDB',
    level: 'Intermediate',
    category: 'Database',
    years: 3
  }
])

const experiences = ref([
  {
    id: 1,
    company: 'Tech Solutions Inc',
    position: 'Senior Frontend Developer',
    startDate: '2022-01-15',
    endDate: '2024-12-31',
    description: 'Led frontend development team, implemented modern UI/UX practices, and mentored junior developers.'
  },
  {
    id: 2,
    company: 'Digital Innovations LLC',
    position: 'Full Stack Developer',
    startDate: '2020-06-01',
    endDate: '2021-12-31',
    description: 'Developed full-stack applications using MERN stack, collaborated with cross-functional teams.'
  },
  {
    id: 3,
    company: 'StartupXYZ',
    position: 'Junior Developer',
    startDate: '2019-03-01',
    endDate: '2020-05-31',
    description: 'Built responsive web applications, participated in agile development process.'
  }
])

const biodata = ref([
  {
    id: 1,
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with 5+ years of experience in creating modern web applications.',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev'
  }
])

// Tab configuration
const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'about', label: 'About' },
  { id: 'contacts', label: 'Contacts' }
]

// Table columns configuration
const columns = {
  projects: [
    { key: 'title', header: 'Title' },
    { key: 'description', header: 'Description' },
    { key: 'technologies', header: 'Technologies' },
    { key: 'status', header: 'Status' }
  ],
  skills: [
    { key: 'name', header: 'Skill Name' },
    { key: 'level', header: 'Level' },
    { key: 'category', header: 'Category' },
    { key: 'years', header: 'Years' }
  ],
  experiences: [
    { key: 'company', header: 'Company' },
    { key: 'position', header: 'Position' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' }
  ],
  about: [
    { key: 'name', header: 'Full Name' },
    { key: 'title', header: 'Title' },
    { key: 'email', header: 'Email' },
    { key: 'location', header: 'Location' }
  ]
}

// Computed properties
const currentColumns = computed(() => {
  return columns[activeTab.value] || []
})

const currentData = computed(() => {
  switch (activeTab.value) {
    case 'projects':
      return projects.value
    case 'skills':
      return skills.value
    case 'experiences':
      return experiences.value
    case 'about':
      return biodata.value
    default:
      return []
  }
})

const filteredData = computed(() => {
  const searchValue = activeTab.value === 'contacts' ? contactSearchTerm.value : crudSearchTerm.value

  if (!searchValue) return currentData.value

  return currentData.value.filter(item => {
    return Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  })
})

const modalTitle = computed(() => {
  switch (modalType.value) {
    case 'create':
      return `Add New ${tabs.find(t => t.id === activeTab.value)?.label.slice(0, -1)}`
    case 'edit':
      return `Edit ${tabs.find(t => t.id === activeTab.value)?.label.slice(0, -1)}`
    case 'view':
      return `View ${tabs.find(t => t.id === activeTab.value)?.label.slice(0, -1)}`
    case 'delete':
      return 'Confirm Delete'
    default:
      return ''
  }
})

// Methods
const showNotification = (message, type = 'success') => {
  notification.value = { message, type }
  setTimeout(() => {
    notification.value = null
  }, 3000)
}

const handleCreate = () => {
  formData.value = {}
  modalType.value = 'create'
  showModal.value = true
}

const handleEdit = (item) => {
  formData.value = { ...item }
  selectedItem.value = item
  modalType.value = 'edit'
  showModal.value = true
}

const handleView = (item) => {
  selectedItem.value = item
  modalType.value = 'view'
  showModal.value = true
}

const handleDelete = (item) => {
  selectedItem.value = item
  modalType.value = 'delete'
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  modalType.value = ''
  selectedItem.value = null
  formData.value = {}
}

const loadProjects = async (options = {}) => {
  try {
    loading.value = true
    const response = await crudService.projects.getProjects({
      page: 1,
      limit: 10,
      search: crudSearchTerm.value,
      ...options
    })

    if (response.success) {
      projects.value = response.data
      projectsPagination.value = response.pagination
    }
  } catch (error) {
    console.error('Error loading projects:', error)
    showNotification('Failed to load projects', 'error')
  } finally {
    loading.value = false
  }
}

// Load skills from API
const loadSkills = async (options = {}) => {
  try {
    loading.value = true
    const response = await crudService.skills.getSkills({
      page: 1,
      limit: 10,
      search: crudSearchTerm.value,
      ...options
    })

    if (response.success) {
      skills.value = response.data
      skillsPagination.value = response.pagination
    }
  } catch (error) {
    console.error('Error loading skills:', error)
    showNotification('Failed to load skills', 'error')
  } finally {
    loading.value = false
  }
}

// Load experiences from API
const loadExperiences = async (options = {}) => {
  try {
    loading.value = true
    const response = await crudService.experiences.getExperiences({
      page: 1,
      limit: 10,
      search: crudSearchTerm.value,
      ...options
    })

    if (response.success) {
      experiences.value = response.data
      experiencesPagination.value = response.pagination
    }
  } catch (error) {
    console.error('Error loading experiences:', error)
    showNotification('Failed to load experiences', 'error')
  } finally {
    loading.value = false
  }
}

// Load contacts from API
const loadContacts = async (options = {}) => {
  try {
    loading.value = true
    const response = await dashboardService.getContacts({
      page: 1,
      limit: 10,
      search: contactSearchTerm.value,
      ...options
    })

    if (response.success) {
      contacts.value = response.data
      contactsPagination.value = response.pagination
    }
  } catch (error) {
    console.error('Error loading contacts:', error)
    showNotification('Failed to load contacts', 'error')
  } finally {
    loading.value = false
  }
}

// Load dashboard statistics
const loadDashboardStats = async () => {
  try {
    loading.value = true
    const response = await dashboardService.getDashboardStats()

    if (response.success) {
      dashboardStats.value = response.data
      // Update stats ref for template binding
      stats.value = {
        visitors: response.data.visitors?.total || 0,
        projects: response.data.projects || 0,
        skills: response.data.skills || 0,
        experiences: response.data.experiences || 0,
        contacts: response.data.contacts || {
          total: 0,
          unread: 0,
          recent: 0
        }
      }
    }
  } catch (error) {
    console.error('Error loading dashboard stats:', error)
    showNotification('Failed to load dashboard statistics', 'error')
  } finally {
    loading.value = false
  }
}

// Load visitor analytics
const loadVisitorAnalytics = async () => {
  try {
    loading.value = true
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    const response = await dashboardService.getVisitorAnalytics({
      startDate,
      endDate,
      groupBy: 'day'
    })

    if (response.success) {
      visitorAnalytics.value = response.data
    }
  } catch (error) {
    console.error('Error loading visitor analytics:', error)
    showNotification('Failed to load visitor analytics', 'error')
  } finally {
    loading.value = false
  }
}

// Load data based on active tab
const loadTabData = async () => {
  switch (activeTab.value) {
    case 'projects':
      await loadProjects()
      break
    case 'skills':
      await loadSkills()
      break
    case 'experiences':
      await loadExperiences()
      break
    case 'contacts':
      await loadContacts()
      break
  }
}

// Handle save operation
const handleSave = async () => {
  loading.value = true

  try {
    let response

    if (modalType.value === 'create') {
      // Create new item
      switch (activeTab.value) {
        case 'projects':
          response = await crudService.projects.createProject(formData.value)
          break
        case 'skills':
          response = await crudService.skills.createSkill(formData.value)
          break
        case 'experiences':
          // Format dates for experience
          const experienceData = {
            ...formData.value,
            start_date: formData.value.startDate,
            end_date: formData.value.endDate
          }
          delete experienceData.startDate
          delete experienceData.endDate
          response = await crudService.experiences.createExperience(experienceData)
          break
        case 'about':
          response = await crudService.biodata.createBiodata(formData.value)
          break
      }

      if (response.success) {
        showNotification(`${tabs.find(t => t.id === activeTab.value)?.label.slice(0, -1)} created successfully!`)
        await loadTabData() // Reload data
      }
    } else if (modalType.value === 'edit') {
      // Update existing item
      switch (activeTab.value) {
        case 'projects':
          response = await crudService.projects.updateProject(selectedItem.value.id, formData.value)
          break
        case 'skills':
          response = await crudService.skills.updateSkill(selectedItem.value.id, formData.value)
          break
        case 'experiences':
          // Format dates for experience
          const experienceData = {
            ...formData.value,
            start_date: formData.value.startDate,
            end_date: formData.value.endDate
          }
          delete experienceData.startDate
          delete experienceData.endDate
          response = await crudService.experiences.updateExperience(selectedItem.value.id, experienceData)
          break
        case 'about':
          response = await crudService.biodata.updateBiodata(selectedItem.value.id, formData.value)
          break
      }

      if (response.success) {
        showNotification(`${tabs.find(t => t.id === activeTab.value)?.label.slice(0, -1)} updated successfully!`)
        await loadTabData() // Reload data
      }
    }

    closeModal()
  } catch (error) {
    console.error('Error saving data:', error)
    showNotification('An error occurred. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}

// Handle delete operation
const confirmDelete = async () => {
  console.log('🗑️ Starting delete operation...')
  console.log('🗑️ Active tab:', activeTab.value)
  console.log('🗑️ Selected item:', selectedItem.value)
  
  loading.value = true

  try {
    let response

    switch (activeTab.value) {
      case 'projects':
        response = await crudService.projects.deleteProject(selectedItem.value.id)
        break
      case 'skills':
        response = await crudService.skills.deleteSkill(selectedItem.value.id)
        break
      case 'experiences':
        response = await crudService.experiences.deleteExperience(selectedItem.value.id)
        break
      case 'about':
        response = await crudService.biodata.deleteBiodata(selectedItem.value.id)
        break
      case 'contacts':
        console.log('🗑️ Deleting contact ID:', selectedItem.value.id)
        response = await api.delete(`/api/contact/admin/contacts/${selectedItem.value.id}`)
        console.log('🗑️ API response:', response)
        break
    }

    // Handle different response formats
    console.log('🔍 Processing response...')
    let isSuccess = false
    if (activeTab.value === 'contacts') {
      // For API calls using axios, check response.data.success
      isSuccess = response?.data?.success
      console.log('🔍 Contacts - response.data:', response?.data)
      console.log('🔍 Contacts - isSuccess:', isSuccess)
    } else {
      // For crudService calls, check response.success or response.data.success
      isSuccess = response?.success || response?.data?.success
      console.log('🔍 Other tabs - isSuccess:', isSuccess)
    }

    console.log('🔍 Final success result:', isSuccess)

    if (isSuccess) {
      showNotification(`${tabs.find(t => t.id === activeTab.value)?.label.slice(0, -1)} deleted successfully!`)
      await loadTabData() // Reload data
    }

    closeModal()
  } catch (error) {
    console.error('Error deleting data:', error)
    showNotification('An error occurred. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}

// Mark contact as read
const markAsRead = async (contactId) => {
  try {
    loading.value = true

    // Call API to mark as read
    const response = await api.put(`/api/contact/admin/contacts/${contactId}/read`)
    
    if (response.data.success) {
      // Update local data
      const contact = contacts.value.find(c => c.id === contactId)
      if (contact) {
        contact.is_read = true
      }
      showNotification('Message marked as read')
      
      // Reload contacts to get updated data
      await loadContacts()
    }

  } catch (error) {
    console.error('Error marking contact as read:', error)
    showNotification('Failed to mark message as read', 'error')
  } finally {
    loading.value = false
  }
}

// Add this test function after other functions
const testAuth = async () => {
  try {
    console.log('🔍 Testing auth with token:', localStorage.getItem('token'))
    const response = await api.get('/api/contact/admin/contacts')
    console.log('🔍 Auth test successful:', response.data)
  } catch (error) {
    console.error('🔍 Auth test failed:', error.response?.data || error.message)
  }
}

// Call test on mounted
onMounted(async () => {
  // Track visit when dashboard is accessed
  await dashboardService.trackVisit({ pageVisited: '/dashboard' })

  // Load initial data
  await loadDashboardStats()

  // Load initial data for all tabs
  await loadProjects()
  await loadSkills()
  await loadExperiences()

  // Load contacts if we're on contacts tab
  if (activeTab.value === 'contacts') {
    await loadContacts()
  }

  // Load analytics for dashboard
  await loadVisitorAnalytics()

  // Test auth
  await testAuth()
})

// Utility functions
const formatDate = (dateString) => {
  if (!dateString) return '-'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}
</script>
