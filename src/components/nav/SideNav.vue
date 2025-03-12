<template>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item prepend-avatar="https://xe.network/logo.svg" title="Edge Dashboard"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-circle" title="Home" to="/"></v-list-item>
          <v-list-item prepend-icon="mdi-account-circle" title="About Me" to="/about"></v-list-item>
        </v-list>
      </v-navigation-drawer>

        <slot></slot>
</template>
