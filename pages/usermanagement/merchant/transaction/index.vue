<script setup>
        definePageMeta({
          title: "Merchant Transaction Management",
          middleware: ["auth"],
          requiresAuth: true,
        });
      </script>
      <template>
        <div>
          <LayoutsBreadcrumb />
        </div>
      </template>
      