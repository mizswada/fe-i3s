<script setup>
        definePageMeta({
          title: "Asset Inventory Management",
          middleware: ["auth"],
          requiresAuth: true,
        });
      </script>
      <template>
        <div>
          <LayoutsBreadcrumb />
        </div>
      </template>
      