export default [
  {
    path: '/login',
    name: 'auth.index',
    component: () => import('@/pages/Auth/Index'),
    meta: {
      guest: true
    }
  },

  {
    path: '/profile',
    name: 'profile.index',
    component: () => import('@/pages/Profile/Index'),
    meta: {
      guest: false
    }
  },

  {
    path: '/profile/edit',
    name: 'profile.edit',
    component: () => import('@/pages/Profile/EditProfile'),
    meta: {
      guest: false
    }
  },

  {
    path: '/',
    redirect: '/login',
  },

  {
    path: '/*',
    redirect: '/'
  }
];