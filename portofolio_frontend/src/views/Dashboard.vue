<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-lg fixed h-full z-30">
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
    <div class="flex-1 ml-64">
      <!-- Header -->
      <div class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  id="search-input"
                  name="search"
                  type="text"
                  placeholder="Search..."
                  v-model="searchTerm"
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
        <p class="text-2xl font-bold text-gray-900">{{ stats.visitors }}</p>
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
        <p class="text-2xl font-bold text-gray-900">{{ stats.projects }}</p>
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
        <p class="text-2xl font-bold text-gray-900">{{ stats.skills }}</p>
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
        <p class="text-2xl font-bold text-gray-900">{{ stats.experiences }}</p>
      </div>
      <svg class="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V8m8 0V6a2 2 0 00-2-2H10a2 2 0 00-2 2v2m8 0v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8"></path>
      </svg>
    </div>
  </div>
</div>

  <!-- Recent Activity -->
<div class="bg-white rounded-lg shadow-md p-6 mb-8">
  <h3 class="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
    <div class="space-y-3">
      <div class="flex items-center p-3 bg-gray-50 rounded-lg">
        <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
        <span class="text-sm text-gray-700">New project "{{ projects[0]?.title }}" was added</span>
      </div>
      <div class="flex items-center p-3 bg-gray-50 rounded-lg">
        <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
        <span class="text-sm text-gray-700">Skills section updated</span>
      </div>
      <div class="flex items-center p-3 bg-gray-50 rounded-lg">
        <div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
        <span class="text-sm text-gray-700">{{ stats.visitors }} visitors this month</span>
      </div>
    </div>
  </div>
</div>

<!-- Settings Content -->
<div v-else-if="activeTab === 'settings'" class="space-y-8">
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
    <p class="text-gray-600">Manage your account settings and preferences.</p>
    <!-- Add settings form here -->
  </div>
</div>

<!-- Existing content for other tabs -->
<div v-else class="bg-white rounded-lg shadow-md mb-8"></div>

        <!-- Tab Content -->
<!-- Tab Content menjadi Content langsung -->
<div class="bg-white rounded-lg shadow-md mb-8">
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

          <!-- Loading -->
          <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p class="text-gray-600 mt-2">Loading...</p>
          </div>

          <!-- Data Table -->
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    v-for="column in currentColumns"
                    :key="column.key"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ column.header }}
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="filteredData.length === 0">
                  <td :colspan="currentColumns.length + 1" class="px-6 py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
                <tr
                  v-for="(item, index) in filteredData"
                  :key="item.id"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td
                    v-for="column in currentColumns"
                    :key="column.key"
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    <span v-if="column.key === 'status'" :class="[
                      'px-2 py-1 text-xs rounded-full',
                      item[column.key] === 'active' ? 'bg-green-100 text-green-800' :
                      item[column.key] === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    ]">
                      {{ item[column.key] }}
                    </span>
                    <span v-else-if="column.key === 'description'">
                      {{ item[column.key]?.substring(0, 50) }}{{ item[column.key]?.length > 50 ? '...' : '' }}
                    </span>
                    <span v-else>{{ item[column.key] || 'N/A' }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <button
                        @click="handleView(item)"
                        class="text-blue-600 hover:text-blue-900"
                        title="View"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      <button
                        @click="handleEdit(item)"
                        class="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button
                        @click="handleDelete(item)"
                        class="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center p-6 border-b">
          <h3 class="text-lg font-semibold">
            {{ modalTitle }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <!-- Delete Confirmation -->
          <div v-if="modalType === 'delete'" class="text-center">
            <svg class="mx-auto h-12 w-12 text-red-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.19 2.5 1.732 2.5z"></path>
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
  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const activeTab = ref('dashboard')
const searchTerm = ref('')
const showModal = ref(false)
const modalType = ref('')
const selectedItem = ref(null)
const loading = ref(false)
const notification = ref(null)
const handleLogout = () => {
  // Simulate logout
  showNotification('Logged out successfully!', 'success')
  // You can add actual logout logic here
  // For example: window.location.href = '/login'
}


// Form data
const formData = ref({})

// Stats data
const stats = ref({
  visitors: 1234,
  projects: 15,
  skills: 25,
  experiences: 8
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
// Melanjutkan dari bagian skills data
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

// Tab configuration
const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'settings', label: 'Settings' }
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
    default:
      return []
  }
})

const filteredData = computed(() => {
  if (!searchTerm.value) return currentData.value

  return currentData.value.filter(item => {
    return Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.value.toLowerCase())
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

const handleSave = () => {
  loading.value = true

  // Simulate API call
  setTimeout(() => {
    try {
      if (modalType.value === 'create') {
        // Add new item
        const newItem = {
          ...formData.value,
          id: Date.now() // Simple ID generation
        }

        switch (activeTab.value) {
          case 'projects':
            projects.value.push(newItem)
            stats.value.projects++
            break
          case 'skills':
            skills.value.push(newItem)
            stats.value.skills++
            break
          case 'experiences':
            experiences.value.push(newItem)
            stats.value.experiences++
            break
        }

        showNotification(`${tabs.find(t => t.id === activeTab.value)?.label.slice(0, -1)} created successfully!`)
      } else if (modalType.value === 'edit') {
        // Update existing item
        const index = currentData.value.findIndex(item => item.id === selectedItem.value.id)
        if (index !== -1) {
          currentData.value[index] = { ...formData.value, id: selectedItem.value.id }
          showNotification(`${tabs.find(t => t.id === activeTab.value)?.label.slice(0, -1)} updated successfully!`)
        }
      }

      closeModal()
    } catch (error) {
      showNotification('An error occurred. Please try again.', 'error')
    } finally {
      loading.value = false
    }
  }, 1000)
}

const confirmDelete = () => {
  loading.value = true

  // Simulate API call
  setTimeout(() => {
    try {
      const index = currentData.value.findIndex(item => item.id === selectedItem.value.id)
      if (index !== -1) {
        currentData.value.splice(index, 1)

        // Update stats
        switch (activeTab.value) {
          case 'projects':
            stats.value.projects--
            break
          case 'skills':
            stats.value.skills--
            break
          case 'experiences':
            stats.value.experiences--
            break
        }

        showNotification(`${tabs.find(t => t.id === activeTab.value)?.label.slice(0, -1)} deleted successfully!`)
      }

      closeModal()
    } catch (error) {
      showNotification('An error occurred. Please try again.', 'error')
    } finally {
      loading.value = false
    }
  }, 1000)
}

// Lifecycle
onMounted(() => {
  // Simulate initial data loading
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>
