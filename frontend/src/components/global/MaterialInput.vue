<script setup lang="ts">
import Text from './MaterialInput/Text.vue';
import Date from './MaterialInput/Date.vue';

const v = defineModel<string | number | undefined>({
  required: true,
});

withDefaults(defineProps<{
  name?: string;
  placeholder?: string;
  avalablePaste?: boolean;
} & ({
  type?: 'text' | 'email' | 'password' | 'url' | 'number' | 'date';
  list?: string;
})>(), {
  type: 'text',
  avalablePaste: false,
});
</script>

<template>
  <Text v-if="     type == 'text'"     :type="type" v-model="v" :name="name" :placeholder="placeholder" :avalablePaste="avalablePaste"><slot></slot></Text>
  <Text v-else-if="type == 'number'"   :type="type" v-model="v" :name="name" :placeholder="placeholder" :avalablePaste="avalablePaste"><slot></slot></Text>
  <Text v-else-if="type == 'email'"    :type="type" v-model="v" :name="name" :placeholder="placeholder" :avalablePaste="avalablePaste">e-mail<M-Icon name="mail"/></Text>
  <Text v-else-if="type == 'password'" :type="type" v-model="v" :name="name" :placeholder="placeholder" :avalablePaste="avalablePaste">password<M-Icon name="key"/></Text>
  <Text v-else-if="type == 'url'"      :type="type" v-model="v" :name="name" :placeholder="placeholder" :avalablePaste="avalablePaste">url<M-Icon name="link"/></Text>
  <Date v-else-if="type == 'date'"                  v-model="v" :name="name" :placeholder="placeholder" :avalablePaste="avalablePaste"><slot></slot></Date>
</template>
