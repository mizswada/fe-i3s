export default [
  {
    "header": "",
    "description": "",
    "child": [
      {
        "title": "Dashboard",
        "path": "/dashboard",
        "icon": "ic:outline-dashboard",
        "child": [],
        "meta": {}
      },
      {
        "title": "School",
        "path": "/school",
        "icon": "ic:round-home-work",
        "child": [
          {
            "title": "List of School",
            "path": "/school/school",
            "icon": "",
            "child": []
          },
        ],
        "meta": {}
      },
      {
        "title": "User Management",
        "path": "/usermanagement",
        "icon": "fa6-solid:users",
        "child": [
          {
            "title": "Merchant",
            "path": "/usermanagement/merchant",
            "icon": "",
            "child": []
          },
          {
            "title": "Parent",
            "path": "/usermanagement/parent",
            "icon": "",
            "child": []
          },
          {
            "title": "Staff",
            "path": "/usermanagement/staff",
            "icon": "",
            "child": []
          },
          {
            "title": "Student",
            "path": "/usermanagement/student",
            "icon": "",
            "child": []
          }
        ],
        "meta": {}
      },
      {
        "title": "Settings",
        "path": "/settings",
        "icon": "mdi:cog",
        "child": [
          // {
          //   "title": "User Management",
          //   "path": "/settings/user-management/user-list",
          //   "icon": "",
          //   "child": []
          // },
          // {
          //   "title": "Role Management",
          //   "path": "/settings/user-management/role-list",
          //   "icon": "",
          //   "child": []
          // },
          {
            "title": "Public Holiday",
            "path": "/settings/public-holiday",
            "icon": "",
            "child": []
          },
          {
            "title": "School Holiday",
            "path": "/settings/school-holiday",
            "icon": "",
            "child": []
          }
        ],
        "meta": {}
      },
      
    ]
  },
  {
    "header": "Administration",
    "description": "Manage your application",
    "child": [
      {
        "title": "Configuration",
        "icon": "ic:outline-settings",
        "child": [
          {
            "title": "Environment",
            "path": "/devtool/config/environment"
          }
        ]
      },
      {
        "title": "Menu Editor",
        "icon": "ci:menu-alt-03",
        "path": "/devtool/menu-editor",
        "child": []
      },
      {
        "title": "Manage Users",
        "path": "/devtool/user-management",
        "icon": "ph:user-circle-gear",
        "child": [
          {
            "title": "User List",
            "path": "/devtool/user-management/user",
            "icon": "",
            "child": []
          },
          {
            "title": "Role List",
            "path": "/devtool/user-management/role",
            "icon": "",
            "child": []
          }
        ]
      },
      {
        "title": "Content",
        "icon": "mdi:pencil-ruler",
        "child": [
          {
            "title": "Editor",
            "path": "/devtool/content-editor"
          },
          {
            "title": "Template",
            "path": "/devtool/content-editor/template"
          }
        ]
      },
      {
        "title": "API Editor",
        "path": "/devtool/api-editor",
        "icon": "material-symbols:api-rounded",
        "child": []
      },
      {
        "title": "Code Playground",
        "path": "/devtool/code-playground",
        "icon": "mdi:code-braces",
        "child": []
      }
    ],
    "meta": {
      "auth": {
        "role": [
          "Developer"
        ]
      }
    }
  },
  {
    "header": "Help",
    "description": "Help and documentation",
    "child": [
      {
        "title": "Documentation",
        "icon": "solar:book-bookmark-minimalistic-bold",
        "path": "https://manual.corrad.ai",
        "external": true
      },
      {
        "title": "UI Components",
        "icon": "material-symbols:settings-input-component-outline-rounded",
        "path": "https://ui.corrad.ai",
        "external": true
      }
    ],
    "meta": {
      "auth": {
        "role": [
          "Developer"
        ]
      }
    }
  }
];