<script setup>
        definePageMeta({
          title: "Completed Transactions",
          middleware: ["auth"],
          requiresAuth: true,
        });
      </script>
      <template>
        <div>
          <LayoutsBreadcrumb />
        </div>
      </template>
      