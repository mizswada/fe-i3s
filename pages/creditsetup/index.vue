<script setup>
        definePageMeta({
          title: "Credit Setup",
          middleware: ["auth"],
          requiresAuth: true,
        });
      </script>
      <template>
        <div>
          <LayoutsBreadcrumb />
        </div>
      </template>
      